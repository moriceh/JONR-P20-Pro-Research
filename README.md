# JONR P20 Pro — Research Repository

Reverse-engineering material for the **JONR P20 Pro** robot vacuum (MiOT
`xtl.vacuum.xm2216`): the stock firmware, the vendor's voice packs and the
Mi Home plugin bundle. Everything in here was pulled from public/vendor
sources or extracted from them; it is the raw material behind the
[jonr-vac](https://github.com/moriceh/jonr-vac) Home Assistant integration —
the formats for the OTA container, the map/behavior tree, the voice-pack
layout and the plugin's command table were all studied from these files.

Nothing here is needed at runtime; the integration never ships any of it.

## `firmware/`

The stock OTA/factory image and the tools to take it apart.

| Item | What it is |
|---|---|
| `xtl.vacuum.xm2216_4.5.6_0805.bin` | Full 28 MB firmware image (SDK 4.5.6, build 0805). sha256 `4493abf3…b72e343` |
| `extract.py` | Binwalk-based splitter: carves the image into `firmware_extracted/01_bootloader`, `02_kernel`, `03_rootfs` |
| `fetch_jonr_firmware.py` | Live fetcher for the re-fetch recipe below (reuses the [jonr_vac](https://github.com/moriceh/jonr-vac) cloud session; same rules as `fetch_jonr_plugin.py`) |
| `firmware_extracted/01_bootloader/` | `u-boot.bin` + its DTB/DTS |
| `firmware_extracted/02_kernel/` | `vmlinux`, `zImage`, kernel DTB/DTS |
| `firmware_extracted/03_rootfs/` | `rootfs.ubi` / `rootfs.squashfs` (the unsquashed `rootfs_tree/` is kept locally only — its BusyBox symlink farm does not survive Windows git; run `unsquashfs` on the blob to rebuild it) |

The rootfs is the interesting part: a BusyBox ARMv7 system where the whole
robot stack lives — `ezros` (supervisor + BehaviorTree.CPP running
`/etc/ezros/ez-tree-2407.xml`), the SLAM/navi libraries, the MIoT cloud
client, the A/B `ab_ota` updater and the serial console boot scripts.

### Root console

The stock firmware keeps a lab door on the serial console. `/etc/inittab`
seeds the root password at every boot:

```
::sysinit:/bin/echo root:`/usr/bin/random_passwd_a` | chpasswd
```

`usr/bin/random_passwd_a` (9 KB ARM, stripped) is not what its name
suggests, and it is not a plain digest either. Decompiling it (angr,
BinaryNinja, Ghidra and Hex-Rays all agree) gives:

```c
snprintf(buf, "%d%d%d%d%d%s%s", 1991, 2, 28, 22, 22, hostname,
         "w3h0ry7*g01ktiq9@/#7z5.4D@1p7]eA");   // fixed ints + 32-char salt
SHA256(buf, strlen(buf), md);                    // OpenSSL one-shot
for (i = 0; i < 16; i++)                         // only md[0..15] is used
    pw[i] = md[i] % 26 + (i % 5 == 0 ? 'a'       // four buckets:
                         : (i & 7) == 0 ? '1'    //   a-z at 0,5,10,15
                         : '%' });               //   1-z / %-z elsewhere
    if (pw[i] in { '\'', '"', '\\' }) pw[i] = '*';  // chpasswd quoting guard
```

so the password is a **16-character** string from three alphabets, not the
hex digest (the escape branch is not theoretical — index 14 lands on `'`
for the shipped hostname and does become `*`). The `gethostname()` input
is a build-time constant: `etc/hostname` ships as `Ezbot` on every unit
(`::sysinit:/bin/hostname -F /etc/hostname` runs just before, and `-F`
strips the trailing newline). The password is therefore identical on every
robot running this firmware:

```
hashed input : 19912282222Ezbotw3h0ry7*g01ktiq9@/#7z5.4D@1p7]eA
SHA-256      : b72834f9c7f2d42f61c4cee15d3336d5cd89e55e…
root password: b3%46i):D3y64>*f
```

The binary also takes the hostname as `argv[1]`
(`random_passwd_a SomeHost`), so you can print — or force — the password of
any hostname straight from the robot's own binary rather than reimplementing
the loop.

A `getty` respawns on the console (`console::respawn:/sbin/getty -L console
0 vt100`, physical UART `ttyS1`, 115200 8N1): log in as `root` with that
16-character password. From there the usual lab reads: `/dev/factory`
(JSON: did/key/mac/country), `config.db`, logs, `ab_dboot print`. Adjacent
doors: USB ADB gadget (vendor `3094:8868`, `adbd` gated by `ez-secure`),
JTAG unlock when `/data/.__debug__` exists (`unlock_jlink.sh`), ymodem
recovery via `burn_bin.sh` on `/dev/ttyGS0`. The squashfs root is read-only
— nothing typed persists unless you deliberately re-flash a volume, which
can brick the unit.

> **Not tested on hardware.** Everything above is read off the firmware
> image; no UART login has actually been performed on a robot. A 16-pin
> header (Dreame-style footprint) is present on the mainboard — whether it
> brings out `ttyS1` (and at what pinout / logic level) is unverified;
> expect to have to find TX/RX yourself. The password derivation itself is
> solid (decompiled from the shipped binary, four decompilers agreeing),
> but treat the physical login as "expected to work", not "confirmed".

## `language_packs/`

The robot's built-in voice announcements.

| Item | What it is |
|---|---|
| `original/*.tar.gz` | The 10 official packs served by the vendor CDN (`en ru de it fr pl es kr tw vt`) — flat tar despite the `.gz` extension |
| `URLs.txt` | CDN base URL (`xtl-data-sg.ks3-sgp.ksyuncs.com/Jonr/xm2216/sounds/v2/<lang>.tar.gz`) |
| `transcript.py` | faster-whisper pass that transcribes every `.ogg` of a folder (used to build the announcement table) |
| `Tool/` | **Voice Pack Studio** — Tkinter GUI to build custom packs (see its own [README](language_packs/Tool/README.md)) |

Pack layout: `media/*.ogg` + `audio.conf` (`Language` / `Ver` headers); the
robot installs one over HTTP (`jonr_vac.install_voice_pack` validates md5,
tar and `audio.conf` before triggering the download).

## `mihome_plugin/`

The Mi Home app plugin for this model — the source of truth for the cloud
commands, map protocol and error strings the integration speaks.

| Item | What it is |
|---|---|
| `original/1730143/` | Plugin package: `main.bundle` (RAM bundle) + `bundle.cert`/`bundle.sign`, `project.json`, `model_list.json` (`xtl.vacuum.xm2216`, v272) |
| `original/1730143/android/` | Native resources shipped with the plugin (drawables, sounds) |
| `original/data/1152219162/` | Plugin data (config + UI images: station icons, consumables, cleaning-record art) |
| `unpack_bundle.py` | Unpacker for Xiaomi's RAM-bundle format (magic `0xFB0BD1E5`) |
| `fetch_jonr_plugin.py` | Live fetcher for the two-step download below — see its usage block |
| `extracted_bundle/` | Result: `combined_bundle.js` (+ beautified/clean copies, `startup.js`) and the `modules/` chunk set |

The beautified JS is where the integration's MiOT property maps, station
error codes, i18n tables and voice-pack install flow were reverse-read.

## Where the binaries come from (how to re-fetch, not to mirror)

The blobs in here were pulled from the vendor's own servers; the method is
the deliverable — prefer re-fetching over mirroring, and keep any signed
URL response out of git (they carry account-bound tokens).

**Voice packs** — plain CDN, stable: the 10 official packs sit at
`https://xtl-data-sg.ks3-sgp.ksyuncs.com/Jonr/xm2216/sounds/v2/<lang>.tar.gz`
for `lang` in `en ru de it fr pl es kr tw vt` (full list: `language_packs/URLs.txt`).
Despite the extension they are flat tars. Verify against the md5 table the
Mi Home plugin embeds (the VoiceList in `extracted_bundle/combined_beautified.js`).

**Firmware** — the URL is minted per request, so it is never committed
here. The native OTA flow was reverse-read from the decompiled Mi Home app
(`_m_j/bz7.java` + `framework/update/*`): the read-only endpoint
**`POST https://api.io.mi.com/app/home/latest_version` with body
`{model: "xtl.vacuum.xm2216"}`** (Mi cloud signed-request auth; never touch the write-side
`/home/devupgrade`) returns the current build's signed download URL on
`fk-res-abroad-cdn.home.mi.com/<md5>_upd_<model>.bin?GalaxyAccessKeyId=…&Signature=…`.
The robot itself fetches that URL when the cloud pushes `miIO.ota`. The
archived `xtl.vacuum.xm2216_4.5.6_0805.bin` is exactly one such download —
check any copy against it: **29 885 952 bytes, md5
`06d9a31b74d2c987fd42c2defbe2b337`** (the cloud's own md5 for 4.5.6_0805).

**`fetch_jonr_firmware.py` runs the two steps for you** — the same shape as
`fetch_jonr_plugin.py`: it asks for the HA `config` folder path (or `--config`),
reuses the Mi cloud session the jonr_vac integration stores there (read-only,
renewed via passToken; `--login` for a machine without HA), signs the
`latest_version` call with the integration's `cloud/connector.py`, **GETs only
the read-only signed URL it returns** (the write-side `/home/devupgrade` is
never touched), and stores the blob **verbatim** (nothing unpacked — that is
`extract.py`'s job), pin-checking it against the archived `4.5.6_0805` md5.
`--list` stops before the download and saves the raw response; `--dry` is an
offline self-test. No secret is ever printed (signed-URL queries stripped) —
and the minted URL carries `GalaxyAccessKeyId`/`Signature`, so keep it and the
`--list` dump out of git like every other signed response.

**Mi Home plugin** — two ways to get the package:

*From a phone you already own it on.* The Mi Home app unpacks every plugin
under `/data/data/com.xiaomi.smarthome/files/plugin/<server>/<developer>/1730143/`
(`adb pull` on a rooted/debuggable phone, or a full-app backup). This is the
simplest path and how the copy in `mihome_plugin/original/` was taken.

*From the servers, app-free.* Reverse-read from the decompiled app
(`DeviceRenderer`/`CoreApiStub` → `_m_j/cwb`, `_m_j/qm9`, `_m_j/om9`): the
app never stores plugin URLs — it mints them per request, exactly like the
firmware flow above. Two endpoints on the same Mi cloud host, both plain
signed-request calls (`POST https://api.io.mi.com/app/...`, Mi cloud
signed-request auth — the same client already used for `latest_version`):

1. **Mint the download URL** — `POST /app/v2/plugin/fetch_plugin`, body
   `data={"latest_req": {"api_version": 10117, "app_platform": "android",
   "region": "<server>", "package_type": "",
   "plugins": [{"model": "xtl.vacuum.xm2216", "package_id": 0,
   "type": "rn"}]},
   "backup_req": {"plugins": [...same...], "api_level": 111,
   "app_platform": "phone"}}`.
   `package_id: 0` asks for the latest; the response carries one entry per
   model with `plugin_id`/`package_id`/`version` and a **signed download URL**
   (the app also accepts a `safe_url`, preferring it when served). Live run
   (2026-09-27, via `fetch_jonr_plugin.py`): `code: 0`, entry
   `plugin_id: 1018764, version: 272` for `xtl.vacuum.xm2216` — the server-side
   package id, distinct from the app's on-disk folder id **1730143** — and a
   4 627 232-byte zip off `cdn.alsgp0.fds.api.mi-img.com/rn-plugins/<date>/`
   whose `main.bundle` carries the RAM magic and whose `model_list.json`
   reports v272. (Siblings of the same family, for reference:
   `/v2/plugin/fetch_sdk` answers `download_url` for the RN runtime,
   `/v2/plugin/get_config_info_new` returns the model→plugin table.)
2. **Fetch the bundle** — plain unauthenticated `GET` of that signed URL
   (OkHttp in the app, cookies only). It delivers the RN package:
   `main.bundle` (RAM bundle, magic `0xFB0BD1E5`) + `bundle.cert` +
   `bundle.sign` + `project.json` + `conf.json` + `model_list.json`.
   The app unzips it into the plugin dir, then verifies the cert chain and a
   SHA-256 / SHA256-with-ECDSA signature over the bundle
   (`PluginPackageConstant.RN_*`) — `unpack_bundle.py` works on the raw
   bundle whether or not you keep the cert/sign.

Check any copy against the shipped one: plugin id **1730143**, model list
`["xtl.vacuum.xm2216"]`, plugin version 272 (`model_list.json`).

**`fetch_jonr_plugin.py` runs the two steps for you.** It asks for the path of
your Home Assistant `config` folder at launch (or takes `--config`), reads the
Mi cloud session the [jonr_vac integration](https://github.com/moriceh/jonr-vac)
already stores there (read-only; renewed through its long-lived passToken — no
password), signs the `fetch_plugin` call with the integration's own
`cloud/connector.py`, and stores the archive **verbatim, never unzipped**
(magic + `model_list.json` are verified in memory). Anyone with the
integration installed can run it; `--login <email>` works instead when there is
no HA to read (interactive password/captcha/2FA). `--list` stops at step 1 and
saves the raw response; `--dry` is an offline self-test. No secret is ever
printed (signed-URL queries are stripped from all output) — but the saved raw
response and the bundle filename come from an account-bound signed URL, so
keep them out of git like everything else signed.

These remain JONR/Xiaomi's property — use them for understanding the
device, not as a firmware redistribution source. If you are the rights
holder and want the archived copies gone, open an issue and they come down.
