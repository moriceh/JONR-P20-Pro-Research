#!/usr/bin/env python3
import os
import sys
import re
import shutil
import subprocess
import zlib
from pathlib import Path

def run_cmd(cmd, check=True):
    """Execute a shell command and capture its output."""
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if check and res.returncode != 0:
        print(f"[!] Error running: {cmd}\n{res.stderr.strip()}")
    return res

def scan_with_binwalk(firmware_path):
    """Parse binwalk table output to extract partition offsets."""
    print(f"[*] Scanning {firmware_path} with binwalk...")
    output = run_cmd(f"binwalk '{firmware_path}'").stdout
    
    entries = []
    line_pattern = re.compile(r"^\s*(\d+)\s+0x[0-9a-fA-F]+\s+(.+)$")
    for line in output.splitlines():
        match = line_pattern.match(line)
        if match:
            offset = int(match.group(1))
            desc = match.group(2)
            entries.append((offset, desc))
            
    return entries

def unpack(firmware_file, out_dir="firmware_extracted"):
    firmware_path = Path(firmware_file).resolve()
    if not firmware_path.is_file():
        sys.exit(f"[!] File not found: {firmware_path}")

    base_out = Path(out_dir).resolve()
    boot_dir = base_out / "01_bootloader"
    kernel_dir = base_out / "02_kernel"
    rootfs_dir = base_out / "03_rootfs"

    for d in [boot_dir, kernel_dir, rootfs_dir]:
        d.mkdir(parents=True, exist_ok=True)

    entries = scan_with_binwalk(firmware_path)
    file_size = firmware_path.stat().st_size

    # Locate key components by signature
    uboot_dtb_offset = None
    uboot_dtb_size = None
    zimage_offset = None
    gzip_kernel_offset = None
    kernel_dtb_offset = None
    kernel_dtb_size = None
    ubi_offset = None

    for offset, desc in entries:
        desc_l = desc.lower()
        if "flattened device tree" in desc_l and 5000 < offset < 300000:
            uboot_dtb_offset = offset
            size_m = re.search(r"size:\s*(\d+)", desc)
            if size_m:
                uboot_dtb_size = int(size_m.group(1))
        elif "zimage" in desc_l:
            zimage_offset = offset
        elif "gzip compressed data" in desc_l and gzip_kernel_offset is None and offset < 1000000:
            gzip_kernel_offset = offset
        elif "flattened device tree" in desc_l and offset > 3000000:
            kernel_dtb_offset = offset
            size_m = re.search(r"size:\s*(\d+)", desc)
            if size_m:
                kernel_dtb_size = int(size_m.group(1))
        elif "ubi erase count header" in desc_l:
            ubi_offset = offset

    print("\n--- Identified Offsets ---")
    print(f"U-Boot DTB   : {uboot_dtb_offset} (size: {uboot_dtb_size})")
    print(f"Kernel zImage: {zimage_offset}")
    print(f"Kernel DTB   : {kernel_dtb_offset} (size: {kernel_dtb_size})")
    print(f"UBI Volume   : {ubi_offset}")
    print("---------------------------\n")

    with open(firmware_path, "rb") as f:
        # 1. Extract U-Boot & U-Boot DTB
        if uboot_dtb_offset:
            print("[+] Extracting U-Boot bootloader and DTB...")
            f.seek(0)
            (boot_dir / "u-boot.bin").write_bytes(f.read(uboot_dtb_offset))
            
            if uboot_dtb_size:
                f.seek(uboot_dtb_offset)
                dtb_bytes = f.read(uboot_dtb_size)
                dtb_path = boot_dir / "u-boot.dtb"
                dtb_path.write_bytes(dtb_bytes)
                run_cmd(f"dtc -I dtb -O dts -o '{boot_dir}/u-boot.dts' '{dtb_path}'", check=False)

        # 2. Extract Linux Kernel & Kernel DTB
        if zimage_offset and kernel_dtb_offset:
            print("[+] Extracting Kernel (zImage, vmlinux, and Device Tree)...")
            zimage_size = kernel_dtb_offset - zimage_offset
            f.seek(zimage_offset)
            (kernel_dir / "zImage").write_bytes(f.read(zimage_size))

            # Decompress raw kernel image (vmlinux) from internal gzip stream
            if gzip_kernel_offset:
                f.seek(gzip_kernel_offset)
                raw_gz = f.read(kernel_dtb_offset - gzip_kernel_offset)
                try:
                    decomp = zlib.decompress(raw_gz, 16 + zlib.MAX_WBITS)
                    (kernel_dir / "vmlinux").write_bytes(decomp)
                except Exception:
                    # Fallback to gunzip CLI in case of trailing bytes
                    gz_tmp = kernel_dir / "vmlinux.gz"
                    gz_tmp.write_bytes(raw_gz)
                    run_cmd(f"gunzip -f -c '{gz_tmp}' > '{kernel_dir}/vmlinux'", check=False)
                    gz_tmp.unlink(missing_ok=True)

            if kernel_dtb_size:
                f.seek(kernel_dtb_offset)
                kdtb_bytes = f.read(kernel_dtb_size)
                kdtb_path = kernel_dir / "kernel.dtb"
                kdtb_path.write_bytes(kdtb_bytes)
                run_cmd(f"dtc -I dtb -O dts -o '{kernel_dir}/kernel.dts' '{kdtb_path}'", check=False)

        # 3. Extract UBI & Rootfs
        if ubi_offset:
            print("[+] Extracting UBI image...")
            f.seek(ubi_offset)
            ubi_path = rootfs_dir / "rootfs.ubi"
            ubi_path.write_bytes(f.read(file_size - ubi_offset))

            print("[+] Extracting internal UBI volumes via ubi_reader...")
            vols_tmp = rootfs_dir / "_ubi_vols"
            run_cmd(f"ubireader_extract_images '{ubi_path}' -o '{vols_tmp}'", check=False)

            # Locate extracted SquashFS image
            squashfs_files = list(vols_tmp.glob("**/*.ubifs")) + list(vols_tmp.glob("**/*.raw"))
            if squashfs_files:
                img_squash = squashfs_files[0]
                final_squash = rootfs_dir / "rootfs.squashfs"
                shutil.move(str(img_squash), str(final_squash))
                shutil.rmtree(vols_tmp, ignore_errors=True)

                print("[+] Unpacking SquashFS root filesystem (unsquashfs -f)...")
                rootfs_tree = rootfs_dir / "rootfs_tree"
                run_cmd(f"unsquashfs -f -d '{rootfs_tree}' '{final_squash}'")

    print(f"\n[✓] Extraction completed in: {base_out}/")

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "xtl.vacuum.xm2216_4.5.6_0805.bin"
    unpack(target)