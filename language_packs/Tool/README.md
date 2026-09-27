# Voice Pack Studio

Small Tkinter tool to build and install **custom voice packs** for the JONR
P20 Pro vacuum (`xtl.vacuum.xm2216`) used with the `xiaomi_vac` Home
Assistant integration. What this does :

1. Download the **original** language pack from the vendor CDN (md5 verified
   against the official plugin table).
2. Replace any sound with your own file — one click per row, everything is
   kept inside the tool (`Tool/custom_sounds/`), named like the original.
3. Convert what needs converting (mono Vorbis via SoX resampler, 24 kHz or
   48 kHz) and **normalize every file to the loudness of the original
   `1.ogg`** (measured live, never hardcoded; anti-clipping ceiling −0.5 dB,
   files within ±0.3 dB are left untouched).
4. Regenerate `audio.conf` (unique `Ver`!), repack as the vendor's **flat
   tar** (yes, the `.tar.gz` extension is a lie — it is an uncompressed tar).
5. One click regenerates `audio.conf` (with an automatically unique `Ver`),
   packs the archive and starts the built-in HTTP server — the
   ready-to-paste Home Assistant YAML for `xiaomi_vac.install_voice_pack`
   appears immediately.

The tool **never fires the HA service itself**: you copy the YAML and run it
from Home Assistant, so the install always stays your explicit decision.

## Requirements

| OS | Python | ffmpeg |
|----|--------|--------|
| Windows | Python ≥ 3.9 (`python gui.py`, or `pythonw gui.py` for no console) | `winget install Gyan.FFmpeg` |
| macOS | Python ≥ 3.9 (`python3 gui.py`) | `brew install ffmpeg` (system Python ships Tk; else `brew install python-tk`) |
| Linux | Python ≥ 3.9 (`python3 gui.py`) | `sudo apt install ffmpeg python3-tk` |

Nothing else — the GUI is pure standard library (`tkinter`, `urllib`,
`tarfile`, `http.server`). If ffmpeg is not on `PATH`, the first frame
(“Dependencies”) turns red and lets you point at the binaries manually.

## Workflow

1. **Pick the language** (10 downloadable codes, e.g. `fr` = Id 6) and hit
   **Download & extract**. *(Chinese `zh` is deliberately absent from the
   list: the plugin advertises `zh.tar.gz` on the Beijing bucket but the file
   is gone — 404 verified 2026-09-25, and it is absent from the bucket
   listing; zh only exists preloaded on the robot.)* The archive lands in
   `cache/`, its md5 is checked
   against the official vendor md5, then it is unpacked into `work/<lang>/`.
   The tool measures the loudness of the original `1.ogg` right away — this
   becomes the target for everything else.
2. **Replace sounds** in the tree. Every row shows the original wording (from
   `transcriptions/`) so you can record or synthesize the right sentence, a
   **Choose…** button on the right (click it, pick any audio file, and the
   tool copies it into `Tool/custom_sounds/` under the right name —
   `whatever-you-picked.mp3` → `107.mp3`), and a **▶** button: click it to
   audition that sound — it plays your replacement if there is one, otherwise
   the original (converted on the fly and cached, so repeat clicks are
   instant). Click **▶** again to stop, or start another row. Row statuses:
   - `missing (original kept)` (orange) — no replacement yet;
   - `needs conversion` (blue) — will be transcoded to mono Vorbis;
   - `ready` (green) — already vorbis mono at the chosen rate, copied as is;
   - `UNKNOWN name — ignored` (red) — a file in `custom_sounds/` matches no
     original sound: **never packed**.
   You can also drop files into `Tool/custom_sounds/` yourself and hit
   **Refresh**.
3. **Pick 24 000 Hz (recommended) or 48 000 Hz**, then
   **Convert + Normalize**. Watch the log: `[CONVERTED]`, `[ADJUST]`,
   `[CAPPED anti-clip]`, `[AS-IS]`.
4. **Generate conf, pack & serve** — one click does everything left:
   writes `audio.conf` with an **automatically unique `Ver`** (current unix
   timestamp; the robot ignores packs whose `Ver` equals the installed one),
   builds `out/<lang>.tar.gz` (its md5 is computed right after the final
   write and goes straight into the YAML), and starts the HTTP server on
   `0.0.0.0:<port>` (falls back to the next free port up to +10). The YAML
   box fills itself:

   ```yaml
   service: jonr_vac.install_voice_pack
   data:
     url: http://192.168.1.20:8000/fr.tar.gz
     md5: 4a1b…
     lang: "6"
   target:
     entity_id: vacuum.aspirateur
   ```

   Copy it into HA's Actions developer tool and run it. The robot downloads
   the pack from your PC, so **the PC must be on the same LAN as the robot**:
   - Windows: allow “Python” through Defender Firewall when prompted.
   - macOS: accept “Python wants to receive incoming connections”.
   - Linux: check `ufw`/`firewalld` if the robot stalls at the download step.

   Keep the window open (server running) until HA reports success — the
   integration verifies the file itself, then the robot confirms over ~2 min,
   mirroring the official plugin behaviour. Full details: `../PACKS_VOIX.md`.

## Notes & gotchas

- **TTS is out of scope on purpose**: generate the custom `.mp3`/`.ogg` files
  however you like, then attach them through the **Choose…** buttons (step 2).
- **`Tool/custom_sounds/` is the single source of truth** for your
  replacements: it survives re-extractions and re-packs, and survives between
  sessions. Re-running **Download & extract** only wipes `work/<lang>/`; your
  replacements are re-applied from `custom_sounds/` at every
  **Convert + Normalize**.
- The loudness target is always taken from the **pristine** `1.ogg` (saved at
  extraction time), even if you replaced `1.ogg` with a custom voice.
- Only the `out/` directory is ever served; nothing else on your machine is
  exposed.
- If a download fails the md5 check, do **not** hand-edit the tables in
  `packlib.py` unless the vendor genuinely re-released a pack.

## Self-check

```
python gui.py --selfcheck
```

Runs the whole chain headless against the cached pack (extraction, reference
measurement ≈ −9.6 dB, conf, packaging, tar readback, stable md5) and exits
0 on success. Handy to sanity-check a fresh install of Python/ffmpeg.
