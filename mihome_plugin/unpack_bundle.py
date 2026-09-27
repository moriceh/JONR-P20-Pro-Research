#!/usr/bin/env python3
import struct
import sys
from pathlib import Path

RAM_BUNDLE_MAGIC = 0xFB0BD1E5

def unpack_ram_bundle(bundle_path, output_dir="extracted_bundle"):
    bundle_file = Path(bundle_path).resolve()
    if not bundle_file.is_file():
        sys.exit(f"[!] File not found: {bundle_file}")

    out_path = Path(output_dir).resolve()
    modules_dir = out_path / "modules"
    modules_dir.mkdir(parents=True, exist_ok=True)

    with open(bundle_file, "rb") as f:
        # Read 12-byte header
        header_data = f.read(12)
        if len(header_data) < 12:
            sys.exit("[!] File too small to be a valid RAM bundle.")

        magic, num_entries, startup_size = struct.unpack("<III", header_data)

        if magic != RAM_BUNDLE_MAGIC:
            sys.exit(f"[!] Invalid magic number: {hex(magic)} (expected {hex(RAM_BUNDLE_MAGIC)})")

        print(f"[*] Valid Metro RAM Bundle detected")
        print(f"    - Number of module slots : {num_entries}")
        print(f"    - Startup code size      : {startup_size} bytes")

        # Read TOC (num_entries * 8 bytes)
        toc_bytes = f.read(num_entries * 8)
        expected_toc_len = num_entries * 8
        if len(toc_bytes) < expected_toc_len:
            sys.exit("[!] Unexpected end of file while reading TOC.")

        toc = []
        for i in range(num_entries):
            offset, length = struct.unpack_from("<II", toc_bytes, i * 8)
            if length > 0:
                toc.append((i, offset, length))

        print(f"[*] Active modules found in TOC: {len(toc)}")

        # Extract startup bootstrap code (located right after TOC)
        startup_code = f.read(startup_size)
        startup_file = out_path / "startup.js"
        startup_file.write_bytes(startup_code)
        print(f"[+] Saved startup code -> {startup_file.name}")

        # Extract individual modules and prepare a concatenated plain JS bundle
        combined_js_file = out_path / "combined_bundle.js"
        with open(combined_js_file, "wb") as combined_f:
            combined_f.write(startup_code + b"\n\n")

            for mod_id, offset, length in toc:
                f.seek(offset)
                mod_data = f.read(length)
                
                # Save individual module file
                mod_file = modules_dir / f"{mod_id}.js"
                mod_file.write_bytes(mod_data)

                # Append to concatenated bundle
                combined_f.write(f"// --- Module ID: {mod_id} ---\n".encode("utf-8"))
                combined_f.write(mod_data + b"\n\n")

        print(f"[+] Extracted {len(toc)} modules into: {modules_dir}/")
        print(f"[+] Consolidated readable bundle: {combined_js_file}")

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "main.bundle"
    unpack_ram_bundle(target)