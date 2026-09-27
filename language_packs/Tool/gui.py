"""Voice Pack Studio — Tkinter GUI (stdlib only).

Run:      python gui.py        (Windows: pythonw gui.py for no console)
          python3 gui.py       (macOS / Linux)
Check:    python gui.py --selfcheck

Chain: download official pack (md5 verified) -> extract -> pick replacement
files per sound (copied into Tool/custom_sounds by the right name) ->
convert + normalize loudness -> conf + flat tar + HTTP serve + ready-to-paste
Home Assistant YAML. The tool NEVER fires the HA service itself.
"""

import shutil
import subprocess
import sys
import threading
from pathlib import Path

import packlib

# tkinter is imported late so --selfcheck works even without python3-tk.


def _platform_warning() -> str:
    base = "The PC must be on the SAME local network as the robot."
    if sys.platform == "win32":
        return base + " Allow “Python” through Windows Defender Firewall at first launch."
    if sys.platform == "darwin":
        return base + " Accept the “Python wants to receive incoming connections” prompt."
    return base + " Check ufw/firewalld if the robot cannot fetch the file."


def run_gui() -> None:
    import tkinter as tk
    from tkinter import filedialog
    from tkinter import ttk
    from tkinter.scrolledtext import ScrolledText

    AUDIO_TYPES = [("Audio", "*.mp3 *.ogg *.wav *.m4a *.flac"), ("All files", "*.*")]

    class App(tk.Tk):
        def __init__(self):
            super().__init__()
            self.title("Voice Pack Studio — JONR P20 Pro (xtl.vacuum.xm2216)")
            self.minsize(760, 640)

            self._busy = False
            self._serveur = packlib.Serveur(self.log)
            self.music_dir = None
            self.target_mean = None
            self.last_archive = None
            self.last_md5 = None
            self._url = None
            self._play_proc = None
            self._play_item = None
            self._action_buttons = []

            cfg = packlib._load_config()
            packlib.CUSTOM_DIR.mkdir(parents=True, exist_ok=True)
            self.lang = tk.StringVar(value="fr — French (Id 6)")
            self.force_dl = tk.BooleanVar(value=False)
            self.sample_rate = tk.IntVar(value=24000)
            self.port = tk.StringVar(value=str(cfg.get("port", "8000")))
            self.entity = tk.StringVar(value=cfg.get("entity_id", "vacuum.aspirateur"))
            self.trans_choice = tk.StringVar(value="auto")

            self._build()
            self.protocol("WM_DELETE_WINDOW", self._on_close)
            self.after(50, self._refresh_tools)

        # ------------------------------------------------------------ utilities
        def log(self, msg):
            def append():
                self._log.configure(state="normal")
                self._log.insert("end", msg + "\n")
                self._log.see("end")
                self._log.configure(state="disabled")
            self.after(0, append)

        def worker(self, fn):
            if self._busy:
                return
            self._busy = True
            for b in self._action_buttons:
                b.configure(state="disabled")

            def run():
                try:
                    fn()
                except Exception as exc:  # noqa: BLE001 — everything hits the log
                    self.log(f"ERROR: {exc}")
                finally:
                    self._busy = False
                    self.after(0, lambda: [b.configure(state="normal")
                                           for b in self._action_buttons])
            threading.Thread(target=run, daemon=True).start()

        def _btn(self, parent, text, cmd):
            b = ttk.Button(parent, text=text, command=cmd)
            self._action_buttons.append(b)
            return b

        def _lang_code(self):
            return self.lang.get().split(" —")[0].strip()

        # ------------------------------------------------------------ build
        def _build(self):
            pad = {"padx": 8, "pady": 4}
            main = ttk.Frame(self)
            main.pack(fill="both", expand=True)

            # 1 — Dependencies -------------------------------------------------
            f1 = ttk.LabelFrame(main, text=" 1. Dependencies ")
            f1.pack(fill="x", **pad)
            self.lbl_ffmpeg = ttk.Label(f1, text="ffmpeg: …")
            self.lbl_ffprobe = ttk.Label(f1, text="ffprobe: …")
            self.lbl_ffmpeg.grid(row=0, column=0, sticky="w", padx=6, pady=2)
            self._btn(f1, "Browse…", lambda: self._pick_tool("ffmpeg")).grid(row=0, column=1, padx=4)
            self.lbl_ffprobe.grid(row=1, column=0, sticky="w", padx=6, pady=2)
            self._btn(f1, "Browse…", lambda: self._pick_tool("ffprobe")).grid(row=1, column=1, padx=4)

            # 2 — Language & download ------------------------------------------
            f2 = ttk.LabelFrame(main, text=" 2. Language & download ")
            f2.pack(fill="x", **pad)
            codes = [f"{c} — {lab} (Id {i})" for c, (i, lab) in packlib.LANGUAGES.items()]
            ttk.Combobox(f2, textvariable=self.lang, values=codes,
                         state="readonly", width=30).grid(row=0, column=0, padx=6, pady=4)
            ttk.Checkbutton(f2, text="Force re-download",
                            variable=self.force_dl).grid(row=0, column=1, padx=6)
            self._btn(f2, "Download & extract", self._download_extract).grid(row=0, column=2, padx=4)

            # 3 — Custom sounds --------------------------------------------------
            f3 = ttk.LabelFrame(main, text=" 3. Custom sounds ")
            f3.pack(fill="both", expand=True, **pad)
            bar = ttk.Frame(f3)
            bar.pack(fill="x")
            ttk.Label(bar, text=f"Replacement files live in Tool/custom_sounds — "
                               f"use “Choose…” on a row, or drop files there named "
                               f"like the originals (107.mp3 replaces 107.ogg).").pack(
                side="left", padx=6, pady=4)
            rowb = ttk.Frame(f3)
            rowb.pack(fill="x")
            ttk.Label(rowb, text="Transcriptions:").pack(side="left", padx=(8, 2))
            ttk.Combobox(rowb, textvariable=self.trans_choice, width=9,
                         values=["auto", "none", "fr", "en"],
                         state="readonly").pack(side="left")
            self._btn(rowb, "Refresh", self._scan_custom).pack(side="left", padx=8)
            tree_frame = ttk.Frame(f3)
            tree_frame.pack(fill="both", expand=True, padx=8, pady=4)
            self.tree = ttk.Treeview(tree_frame, columns=("nom", "etat", "txt", "choose", "play"), height=8)
            self.tree.heading("#0", text="")
            self.tree.column("#0", width=1, stretch=False)
            self.tree.heading("nom", text="sound")
            self.tree.column("nom", width=100, anchor="w")
            self.tree.heading("etat", text="status")
            self.tree.column("etat", width=170, anchor="w")
            self.tree.heading("txt", text="original wording (transcription)")
            self.tree.column("txt", width=380, anchor="w")
            self.tree.heading("choose", text="replace with…")
            self.tree.column("choose", width=100, anchor="center")
            self.tree.heading("play", text="play")
            self.tree.column("play", width=60, anchor="center")
            vsb = ttk.Scrollbar(tree_frame, orient="vertical", command=self.tree.yview)
            self.tree.configure(yscrollcommand=vsb.set)
            self.tree.pack(side="left", fill="both", expand=True)
            vsb.pack(side="right", fill="y")
            for tag, colour in (("ok", "#0a7a0a"), ("conv", "#0a3fa0"),
                                ("missing", "#b26a00"), ("bad", "#b00000")):
                self.tree.tag_configure(tag, foreground=colour)
            self.tree.bind("<Button-1>", self._on_tree_click)

            # 4 — Conversion & volume ---------------------------------------------
            f4 = ttk.LabelFrame(main, text=" 4. Conversion & volume normalisation ")
            f4.pack(fill="x", **pad)
            ttk.Radiobutton(f4, text="24 000 Hz (robot standard)", value=24000,
                            variable=self.sample_rate).grid(row=0, column=0, padx=8, pady=4)
            ttk.Radiobutton(f4, text="48 000 Hz (full bandwidth)", value=48000,
                            variable=self.sample_rate).grid(row=0, column=1, padx=4)
            self._btn(f4, "Convert + Normalize", self._convert_normalize).grid(row=0, column=2, padx=8)

            # 5 — Package & install --------------------------------------------------
            f5 = ttk.LabelFrame(main, text=" 5. Package & install in Home Assistant ")
            f5.pack(fill="both", expand=True, **pad)
            row = ttk.Frame(f5)
            row.pack(fill="x", pady=2)
            ttk.Label(row, text="entity_id:").pack(side="left", padx=(8, 2))
            ttk.Entry(row, textvariable=self.entity, width=24).pack(side="left")
            ttk.Label(row, text="port:").pack(side="left", padx=(12, 2))
            ttk.Entry(row, textvariable=self.port, width=6).pack(side="left")
            self._btn(row, "Generate conf, pack & serve", self._generate).pack(side="left", padx=10)
            self.btn_stop = self._btn(row, "Stop server", self._stop_serve)
            row2 = ttk.Frame(f5)
            row2.pack(fill="x", pady=(0, 4))
            self.txt_yaml = ScrolledText(f5, height=6, width=88)
            self.txt_yaml.pack(fill="x", padx=8, pady=4)
            self._btn(row2, "Copy YAML",
                      lambda: self._copy(self.txt_yaml.get("1.0", "end").strip())).pack(side="left", padx=8)
            ttk.Label(f5, text=_platform_warning(), foreground="#b00000",
                      wraplength=700, justify="left").pack(fill="x", padx=8, pady=(0, 6))

            # Log -------------------------------------------------------------------
            logf = ttk.LabelFrame(main, text=" Log ")
            logf.pack(fill="both", expand=False, **pad)
            self._log = ScrolledText(logf, height=8, state="disabled", width=90)
            self._log.pack(fill="x", padx=6, pady=4)

        # ------------------------------------------------------------ actions
        def _refresh_tools(self):
            tools = packlib.autodetect(force=True)
            for name, lbl in (("ffmpeg", self.lbl_ffmpeg), ("ffprobe", self.lbl_ffprobe)):
                path = tools.get(name)
                lbl.configure(text=f"{name}: {path or 'NOT FOUND'}",
                              foreground="#0a7a0a" if path else "#b00000")

        def _pick_tool(self, name):
            path = filedialog.askopenfilename(title=f"Choose {name}")
            if path:
                packlib.set_override(name, path)
                self._refresh_tools()

        def _download_extract(self):
            lang = self._lang_code()
            def work():
                packlib.download_pack(lang, self.log, force=self.force_dl.get())
                music = packlib.extract_pack(lang, self.log)
                self.music_dir = music
                self.target_mean = packlib.save_target_mean(music, self.log)
                self.after(0, self._scan_custom)
            self.worker(work)

        # ----------------------------------------------------- custom_sounds tree
        def _scan_custom(self):
            for row in self.tree.get_children():
                self.tree.delete(row)
            if not self.music_dir or not self.music_dir.is_dir():
                self.log("Download & extract the pack first (step 2).")
                return
            originals = sorted({f.stem for f in self.music_dir.glob("*.ogg")},
                               key=lambda s: (0, int(s)) if s.isdigit() else (1, s))
            trans = self._transcriptions()
            customs = {}
            for f in sorted(packlib.CUSTOM_DIR.iterdir()):
                if f.is_file() and f.suffix.lower() in packlib.CUSTOM_EXTS:
                    customs.setdefault(f.stem, []).append(f)
            sr = self.sample_rate.get()
            for stem in originals:
                name = stem + ".ogg"
                files = customs.pop(stem, None)
                if not files:
                    self.tree.insert("", "end",
                                     values=(name, "missing (original kept)",
                                             (trans or {}).get(name, ""), "Choose…", "▶"),
                                     tags=("missing",))
                    continue
                f = files[0]
                if f.suffix.lower() == ".ogg" and packlib.is_ready(f, sr):
                    etat, tag = f"ready — {f.name}", "ok"
                elif f.suffix.lower() in packlib.CUSTOM_EXTS:
                    etat, tag = f"needs conversion — {f.name}", "conv"
                else:
                    etat, tag = f"unreadable — {f.name}", "bad"
                self.tree.insert("", "end",
                                 values=(name, etat, (trans or {}).get(name, ""), "Choose…", "▶"),
                                 tags=(tag,))
            for stem, files in customs.items():
                for f in files:
                    self.tree.insert("", "end",
                                     values=(f.name, "UNKNOWN name — ignored", "", "", "▶"),
                                     tags=("bad",))

        def _on_tree_click(self, event):
            if self.tree.identify_region(event.x, event.y) != "cell":
                return
            col = self.tree.identify_column(event.x)
            if col not in ("#4", "#5"):
                return
            item = self.tree.identify_row(event.y)
            if not item:
                return
            if col == "#5":
                self._play_row(item)
                return
            name = self.tree.item(item, "values")[0]
            if not name.endswith(".ogg"):
                return  # unknown-name row: nothing to replace
            self._pick_replacement(name[: -len(".ogg")])

        # ------------------------------------------------------------ playback
        def _play_row(self, item):
            """▶ column: audition the replacement (if any) or the original.

            Clicking ▶ while something is already playing stops it first;
            clicking the same row again just stops.
            """
            if self._play_proc and self._play_proc.poll() is None:
                try:
                    self._play_proc.terminate()
                except OSError:
                    pass
                if self._play_item == item:
                    self._play_item = None
                    return
            name = self.tree.item(item, "values")[0]
            if name.endswith(".ogg"):
                stem = name[: -len(".ogg")]
                customs = sorted(packlib.CUSTOM_DIR.glob(f"{stem}.*"))
                src = customs[0] if customs else (
                    self.music_dir / name if self.music_dir else None)
            else:
                src = packlib.CUSTOM_DIR / name  # unknown-name stray file
            if not src or not src.is_file():
                self.log(f"Nothing to play for {name}.")
                return
            self._play_item = item

            def run():
                try:
                    wav = self._ensure_wav(src)
                    kw = {"creationflags": 0x08000000} if sys.platform == "win32" else {}
                    self.log(f"▶ Playing {src.name}")
                    self._play_proc = subprocess.Popen(
                        self._play_cmd(wav),
                        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, **kw)
                    self._play_proc.wait()
                except Exception as exc:  # noqa: BLE001 — everything hits the log
                    self.log(f"ERROR: {exc}")
                finally:
                    self._play_proc = None
                    self._play_item = None
            threading.Thread(target=run, daemon=True).start()

        def _ensure_wav(self, src):
            """Convert to a playable WAV once (cached by name+mtime)."""
            play_dir = packlib.WORK_DIR / "_play"
            play_dir.mkdir(parents=True, exist_ok=True)
            out = play_dir / f"{src.stem}-{int(src.stat().st_mtime)}.wav"
            if not out.is_file():
                packlib._run([packlib._tool("ffmpeg"), "-hide_banner", "-loglevel",
                              "error", "-y", "-i", str(src), "-ar", "48000",
                              "-ac", "2", "-c:a", "pcm_s16le", str(out)])
                if not out.is_file():
                    raise RuntimeError(f"ffmpeg produced no audio for {src.name}")
            return out

        @staticmethod
        def _play_cmd(wav):
            wav = str(wav)
            if sys.platform == "win32":
                safe = wav.replace("'", "''")
                return ["powershell", "-NoProfile", "-NonInteractive", "-Command",
                        f"(New-Object Media.SoundPlayer '{safe}').PlaySync()"]
            if sys.platform == "darwin":
                return ["afplay", wav]
            for player in ("paplay", "aplay"):
                if shutil.which(player):
                    return [player, wav]
            raise RuntimeError("No audio player found (install paplay or aplay) — "
                               "or open the file in Tool/custom_sounds manually.")

        def _pick_replacement(self, stem):
            src = filedialog.askopenfilename(
                title=f"Replacement file for {stem}.ogg",
                initialdir=packlib.CUSTOM_DIR, filetypes=AUDIO_TYPES)
            if not src:
                return
            src = Path(src)
            for old in packlib.CUSTOM_DIR.glob(f"{stem}.*"):
                old.unlink()  # only one replacement per sound
            dst = packlib.CUSTOM_DIR / f"{stem}{src.suffix.lower()}"
            shutil.copy2(src, dst)
            self.log(f"Copied {src.name} -> custom_sounds/{dst.name}")
            self._scan_custom()

        def _transcriptions(self):
            choice = self.trans_choice.get()
            if choice == "none":
                return None
            if choice == "auto":
                for cand in (self._lang_code(), "en", "fr"):
                    table = packlib.load_transcriptions(cand)
                    if table:
                        return table
                return None
            return packlib.load_transcriptions(choice)

        # ------------------------------------------------------------ pipeline
        def _convert_normalize(self):
            if not self.music_dir or not self.music_dir.is_dir():
                self.log("Download & extract the pack first (step 2).")
                return
            sr = self.sample_rate.get()
            music = self.music_dir
            target = self.target_mean

            def work():
                nonlocal target
                if target is None:
                    target = packlib.load_target_mean(self._lang_code())
                if target is None:
                    target = packlib.save_target_mean(music, self.log)
                    self.target_mean = target
                originals = {f.stem for f in music.glob("*.ogg")}
                n = 0
                for f in sorted(packlib.CUSTOM_DIR.iterdir()):
                    if not (f.is_file() and f.suffix.lower() in packlib.CUSTOM_EXTS):
                        continue
                    if f.stem not in originals:
                        continue  # unknown name: never overwrites anything
                    dst = music / (f.stem + ".ogg")
                    if f.suffix.lower() == ".ogg" and packlib.is_ready(f, sr):
                        shutil.copy2(f, dst)
                        self.log(f"[COPIED]   {f.name} (already compliant)")
                    else:
                        packlib.convert_to_ogg(f, dst, sr)
                        self.log(f"[CONVERTED] {f.name} -> {dst.name} "
                                 f"(vorbis mono {sr} Hz)")
                    n += 1
                if n == 0:
                    self.log("No replacement file in custom_sounds — "
                             "the original pack is repacked as is.")
                packlib.normalize_volume(music, sr, target, self.log)
            self.worker(work)

        def _generate(self):
            lang = self._lang_code()
            def work():
                music = packlib.WORK_DIR / lang / "media" / "music"
                if not music.is_dir():
                    raise RuntimeError("Pack not extracted — run step 2 first.")
                ver = packlib.default_ver()  # auto: unique timestamp
                packlib.make_conf(music, lang, ver, self.log)
                archive, digest = packlib.pack(lang, self.log)
                self.last_archive, self.last_md5 = archive, digest
                if self._serveur.running:
                    self._serveur.stop()
                ip, port = self._serveur.start(int(self.port.get()))
                url = f"http://{ip}:{port}/{lang}.tar.gz"
                self._url = url
                yaml = packlib.ha_yaml(self.entity.get().strip(), url, digest, lang)
                self.log(f"Robot URL: {url}")
                self.after(0, lambda: (
                    self.txt_yaml.delete("1.0", "end"),
                    self.txt_yaml.insert("1.0", yaml)))
            self.worker(work)

        def _stop_serve(self):
            if not self._serveur.running:
                return
            def stop():
                self._serveur.stop()
            self.worker(stop)

        def _copy(self, text):
            if not text:
                self.log("Nothing to copy yet.")
                return
            self.clipboard_clear()
            self.clipboard_append(text)
            self.log("Copied to clipboard.")

        def _on_close(self):
            try:
                cfg = packlib._load_config()
                cfg["port"] = self.port.get()
                cfg["entity_id"] = self.entity.get()
                packlib._save_config(cfg)
            except Exception:  # noqa: BLE001
                pass
            if self._play_proc and self._play_proc.poll() is None:
                try:
                    self._play_proc.terminate()
                except OSError:
                    pass
            if self._serveur.running:
                self._serveur.stop()
            self.destroy()

    App().mainloop()


if __name__ == "__main__":
    if "--selfcheck" in sys.argv:
        sys.exit(0 if packlib.selfcheck() else 1)
    run_gui()
