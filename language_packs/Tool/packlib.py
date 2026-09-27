"""Voice Pack Studio — core logic (stdlib only, no tkinter).

Shared by gui.py (the Tkinter GUI) and `python gui.py --selfcheck`.
Runs on Windows / macOS / Linux: the only external dependency is
ffmpeg + ffprobe (auto-detected, manual override possible).

 - volumedetect measurement, target = original 1.ogg,
   -0.5 dB anti-clipping ceiling, 0.3 dB tolerance — with one fix: the
   normalisation transcode honours the CHOSEN sample rate (the original
   script forced 24 kHz).
 - pan=mono|c0=c0 + SoX aresample, libvorbis q4, mono.
 - flat GNU tar (the .tar.gz extension is a vendor
   lie), directory entries then sorted files, md5 in 64 KB chunks.
"""

import hashlib
import json
import os
import re
import shutil
import socket
import subprocess
import sys
import tarfile
import threading
import time
from datetime import date, datetime
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.request import Request, urlopen

# ---------------------------------------------------------------------------
# Tool paths (always relative to this file, never hardcoded per-OS)
# ---------------------------------------------------------------------------

TOOL_DIR = Path(__file__).resolve().parent
CACHE_DIR = TOOL_DIR / "cache"
WORK_DIR = TOOL_DIR / "work"
OUT_DIR = TOOL_DIR / "out"
TRANS_DIR = TOOL_DIR / "transcriptions"
CUSTOM_DIR = TOOL_DIR / "custom_sounds"
CONFIG_FILE = TOOL_DIR / "config.json"

REF_FILE = "1.ogg"        # master file everybody aligns to
PLAFOND_MAX_DB = -0.5     # anti-saturation ceiling (cf. ajuster_volume.py)
TOLERANCE_DB = 0.3        # below this gain, file is left untouched (ibid.)

CUSTOM_EXTS = {".mp3", ".ogg", ".wav", ".m4a", ".flac"}

# ---------------------------------------------------------------------------
# Language tables (extracted from the official plugin bundle)
# ---------------------------------------------------------------------------

CDN_SGP = "https://xtl-data-sg.ks3-sgp.ksyuncs.com/Jonr/xm2216/sounds/v2/{}.tar.gz"

# zh (Id 1) was dropped on 2026-09-25: the plugin still advertises
# zh.tar.gz on the Beijing bucket, but the file is gone (404 + absent from
# the bucket listing) — zh only exists preloaded on the robot itself.
LANGUAGES = {  # code -> (audio.conf Id, English label)
    "en": (2, "English"),
    "ru": (3, "Russian"),
    "de": (4, "German"),
    "it": (5, "Italian"),
    "fr": (6, "French"),
    "pl": (7, "Polish"),
    "es": (8, "Spanish"),
    "kr": (9, "Korean"),
    "tw": (10, "Chinese (Taiwan)"),
    "vt": (11, "Vietnamese"),
}

OFFICIAL_MD5 = {  # md5 of the official CDN archives (verified against the plugin)
    "en": "b29036e0bf84045581cba6406b7441d2",
    "ru": "1c9bce3b424dbb982b06036180db0d6a",
    "de": "9a5c576b163db43aac0961e630f284bf",
    "it": "4ca235130cac6d933bf286f602702ff3",
    "fr": "76650eb08655d4019c1e3a37f9d2d723",
    "pl": "f881099f29ee73f466871fb895157238",
    "es": "740f2787a5a683aae0690177f4ab394a",
    "kr": "55a7c522152fd7c7d6e6eb161c7caddc",
    "tw": "af9e474c2daff03d334af6d7d361de00",
    "vt": "ae5788aca08a6a25198a3a95e5ab9edd",
}


# ---------------------------------------------------------------------------
# Persisted config (ffmpeg/ffprobe overrides, last GUI choices)
# ---------------------------------------------------------------------------

def _load_config() -> dict:
    try:
        return json.loads(CONFIG_FILE.read_text(encoding="utf-8-sig"))
    except (OSError, ValueError):
        return {}


def _save_config(cfg: dict) -> None:
    try:
        CONFIG_FILE.write_text(
            json.dumps(cfg, indent=2, ensure_ascii=False), encoding="utf-8"
        )
    except OSError:
        pass  # non-blocking: the tool stays usable without persistence


# ---------------------------------------------------------------------------
# ffmpeg / ffprobe — multi-OS detection
# ---------------------------------------------------------------------------

_TOOLS: dict = {}


def _candidate_dirs() -> list:
    if sys.platform == "win32":
        la = os.environ.get("LOCALAPPDATA", str(Path.home() / "AppData" / "Local"))
        return [
            Path(la) / "Microsoft" / "WinGet" / "Links",
            Path("C:/Program Files/ffmpeg/bin"),
        ]
    if sys.platform == "darwin":
        return [Path("/opt/homebrew/bin"), Path("/usr/local/bin")]
    return [Path("/usr/bin"), Path("/snap/bin")]


def _which(name: str):
    found = shutil.which(name)
    if found:
        return found
    suffixes = ("", ".exe") if sys.platform == "win32" else ("",)
    for d in _candidate_dirs():
        for suffix in suffixes:
            cand = d / f"{name}{suffix}"
            if cand.is_file():
                return str(cand)
    return None


def autodetect(force: bool = False) -> dict:
    """Resolve ffmpeg/ffprobe: config.json override -> PATH -> usual dirs."""
    global _TOOLS
    if _TOOLS and not force:
        return _TOOLS
    cfg = _load_config()
    _TOOLS = {}
    for name in ("ffmpeg", "ffprobe"):
        override = cfg.get(name)
        if override and Path(override).is_file():
            _TOOLS[name] = override
        else:
            _TOOLS[name] = _which(name)
    return _TOOLS


def set_override(name: str, path: str) -> None:
    cfg = _load_config()
    cfg[name] = path
    _save_config(cfg)
    autodetect(force=True)


def _tool(name: str) -> str:
    path = autodetect().get(name)
    if not path:
        raise RuntimeError(
            f"{name} not found. Install ffmpeg "
            f"(winget install Gyan.FFmpeg / brew install ffmpeg / apt install ffmpeg) "
            f"or point to it in the “Dependencies” section."
        )
    return path


def _run(cmd: list) -> subprocess.CompletedProcess:
    kwargs = {}
    if sys.platform == "win32":
        kwargs["creationflags"] = 0x08000000  # CREATE_NO_WINDOW
    return subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        check=False,
        **kwargs,
    )


# ---------------------------------------------------------------------------
# Generic helpers
# ---------------------------------------------------------------------------

def md5_file(path: Path) -> str:
    """md5 in 64 KB chunks (from creer_pack.py)."""
    hasher = hashlib.md5()
    with open(path, "rb") as f:
        while chunk := f.read(65536):
            hasher.update(chunk)
    return hasher.hexdigest()


def default_ver() -> str:
    """Unique custom Ver, generated automatically: unix timestamp (fits 32-bit)."""
    return str(int(time.time()))


def ver_label(ver: str) -> str:
    try:
        return datetime.fromtimestamp(int(ver)).strftime("%Y-%m-%d %H:%M:%S")
    except (ValueError, OSError):
        return ""


def default_date() -> str:
    """audio.conf Date field, vendor style: '2026.9.25'."""
    today = date.today()
    return f"{today.year}.{today.month}.{today.day}"


def lan_ip() -> str:
    """Machine LAN IP (UDP socket trick, no packet sent — works on all 3 OS)."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        return s.getsockname()[0]
    except OSError:
        return "127.0.0.1"
    finally:
        s.close()


# ---------------------------------------------------------------------------
# Official pack download + extraction
# ---------------------------------------------------------------------------

def download_pack(lang: str, log, force: bool = False) -> Path:
    """Fetch (or reuse) cache/<lang>.tar.gz and verify its official md5."""
    if lang not in LANGUAGES:
        raise RuntimeError(f"Unknown language “{lang}” (see packlib.LANGUAGES).")
    dest = CACHE_DIR / f"{lang}.tar.gz"
    if dest.exists() and not force:
        digest = md5_file(dest)
        if digest == OFFICIAL_MD5[lang]:
            log(f"Cache reused: {dest.name} (md5 matches).")
            return dest
        log("Cached copy is corrupt: re-downloading…")
        dest.unlink()
    url = CDN_SGP.format(lang)
    log(f"Downloading: {url}")
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    part = dest.with_suffix(".tar.gz.part")
    req = Request(url, headers={"User-Agent": "Mozilla/5.0 (VoicePackStudio)"})
    hasher = hashlib.md5()
    with urlopen(req, timeout=60) as resp:  # noqa: S310 (fixed https URLs)
        total = int(resp.headers.get("Content-Length") or 0)
        done = 0
        next_mark = 512 * 1024
        with open(part, "wb") as out:
            while True:
                chunk = resp.read(65536)
                if not chunk:
                    break
                out.write(chunk)
                hasher.update(chunk)
                done += len(chunk)
                if done >= next_mark:
                    pct = f" ({done * 100 // total} %)" if total else ""
                    log(f"  … {done // 1024} KiB{pct}")
                    next_mark += 512 * 1024
    digest = hasher.hexdigest()
    if digest != OFFICIAL_MD5[lang]:
        part.unlink(missing_ok=True)
        raise RuntimeError(
            f"Unexpected md5 for {lang}: {digest}\n"
            f"Expected:        {OFFICIAL_MD5[lang]}\n"
            "The CDN changed or the file got corrupted — do NOT ship this pack, "
            "check the OFFICIAL_MD5 table."
        )
    os.replace(part, dest)
    log(f"Downloaded and verified: {dest.name} ({done // 1024} KiB, md5 OK).")
    return dest


def extract_pack(lang: str, log) -> Path:
    """Extract cache/<lang>.tar.gz (a FLAT tar despite the extension) to work/<lang>/."""
    src = CACHE_DIR / f"{lang}.tar.gz"
    if not src.exists():
        raise RuntimeError(f"Pack missing from cache — download “{lang}” first.")
    dest = WORK_DIR / lang
    shutil.rmtree(dest, ignore_errors=True)
    dest.mkdir(parents=True)
    with tarfile.open(src, "r:*") as tar:  # r:* accepts the uncompressed tar
        members = tar.getmembers()
        try:
            tar.extractall(path=dest, members=members, filter="data")
        except TypeError:  # Python without the filter argument
            tar.extractall(path=dest, members=members)
    music = dest / "media" / "music"
    if not (music / REF_FILE).exists():
        raise RuntimeError(f"Unexpected extraction: {REF_FILE} missing from {music}.")
    n_ogg = sum(1 for f in music.glob("*.ogg"))
    log(f"Extracted: {n_ogg} .ogg files into work/{lang}/media/music.")
    return music


def save_target_mean(music: Path, log) -> float:
    """Measure the ORIGINAL 1.ogg loudness (before any replacement)."""
    stats = measure(music / REF_FILE)
    if not stats:
        raise RuntimeError(f"Could not measure {REF_FILE} (ffmpeg went silent?).")
    (music.parent.parent / ".target_mean").write_text(
        f"{stats['mean']:.4f}\n{stats['max']:.4f}\n", encoding="utf-8"
    )
    log(f"Loudness target (original 1.ogg): {stats['mean']:.2f} dB "
        f"(peak {stats['max']:.2f} dB).")
    return stats["mean"]


def load_target_mean(lang: str):
    try:
        return float(
            (WORK_DIR / lang / ".target_mean").read_text(encoding="utf-8").split()[0]
        )
    except (OSError, ValueError, IndexError):
        return None


# ---------------------------------------------------------------------------
# Audio analysis / conversion (from convert_custom.py + ajuster_volume.py)
# ---------------------------------------------------------------------------

def measure(path: Path):
    """mean_volume / max_volume via the volumedetect filter (same regexes)."""
    res = _run([_tool("ffmpeg"), "-i", str(path),
                "-filter:a", "volumedetect", "-f", "null", "-"])
    m_mean = re.search(r"mean_volume:\s*(-?[\d\.]+)\s*dB", res.stderr)
    m_max = re.search(r"max_volume:\s*(-?[\d\.]+)\s*dB", res.stderr)
    if m_mean and m_max:
        return {"mean": float(m_mean.group(1)), "max": float(m_max.group(1))}
    return None


def probe(path: Path) -> dict:
    """Codec / sample rate / channels via ffprobe (from convert_custom.py)."""
    res = _run([_tool("ffprobe"), "-v", "error",
                "-select_streams", "a:0",
                "-show_entries", "stream=codec_name,sample_rate,channels",
                "-of", "json", str(path)])
    if res.returncode != 0:
        raise RuntimeError(f"ffprobe failed on {path.name}: {res.stderr.strip()[-200:]}")
    infos = json.loads(res.stdout or "{}")
    if not infos.get("streams"):
        raise RuntimeError(f"No audio stream detected in {path.name}.")
    stream = infos["streams"][0]
    return {
        "codec": stream.get("codec_name"),
        "sample_rate": int(stream.get("sample_rate", 24000)),
        "channels": int(stream.get("channels", 1)),
    }


def is_ready(path: Path, sample_rate: int) -> bool:
    """Already robot-ready (vorbis, mono, right sample rate)?"""
    try:
        prof = probe(path)
    except RuntimeError:
        return False
    return (prof["codec"] == "vorbis" and prof["channels"] == 1
            and prof["sample_rate"] == sample_rate)


def convert_to_ogg(src: Path, dst: Path, sample_rate: int) -> None:
    """Convert any audio to ogg/vorbis mono with the hi-fi filter chain
    from convert_custom.py (left-channel pan + SoX resampler)."""
    filtre = (f"pan=mono|c0=c0,"
              f"aresample=resampler=soxr:osr={sample_rate}:cutoff=0.98")
    res = _run([_tool("ffmpeg"), "-y", "-i", str(src),
                "-af", filtre,
                "-c:a", "libvorbis", "-q:a", "4",
                "-ar", str(sample_rate), "-ac", "1", str(dst)])
    if res.returncode != 0:
        raise RuntimeError(
            f"Could not convert {src.name}: "
            f"{res.stderr.strip()[-300:] or 'file locked by a player?'}")
    if not is_ready(dst, sample_rate):
        raise RuntimeError(f"{dst.name} produced but non-compliant "
                           f"(expected vorbis mono {sample_rate} Hz).")


def normalize_volume(music: Path, sample_rate: int, target_mean: float, log) -> dict:
    """Align every .ogg to target_mean — exact ajuster_volume.py logic
    (-0.5 dB ceiling except 1.ogg, skip < 0.3 dB) except the transcode
    honours the CHOSEN sample rate (the original forced 24 kHz)."""
    tally = {"adjusted": 0, "as_is": 0, "capped": 0, "skipped": 0}
    fichiers = sorted(music.glob("*.ogg"))
    if not fichiers:
        raise RuntimeError(f"No .ogg in {music}.")
    for f in fichiers:
        stats = measure(f)
        if not stats:
            log(f"[SKIP]   {f.name} (silent or unreadable)")
            tally["skipped"] += 1
            continue
        gain = target_mean - stats["mean"]
        capped = False
        est_ref = f.name == REF_FILE
        if not est_ref and (stats["max"] + gain) > PLAFOND_MAX_DB:
            gain = PLAFOND_MAX_DB - stats["max"]
            capped = True
            tally["capped"] += 1
        if abs(gain) < TOLERANCE_DB:
            log(f"[AS-IS]  {f.name:<12} (mean {stats['mean']:5.1f} dB, "
                f"peak {stats['max']:5.1f} dB)")
            tally["as_is"] += 1
            continue
        temp = f.with_suffix(".temp.ogg")
        res = _run([_tool("ffmpeg"), "-y", "-i", str(f),
                    "-filter:a", f"volume={gain:+.2f}dB",
                    "-c:a", "libvorbis",
                    "-ar", str(sample_rate), "-ac", "1",
                    "-q:a", "2", str(temp)])
        if res.returncode != 0 or not temp.exists():
            temp.unlink(missing_ok=True)
            log(f"[SKIP]   {f.name} (normalisation transcode failed)")
            tally["skipped"] += 1
            continue
        temp.replace(f)
        tally["adjusted"] += 1
        tag = " [UNCAPPED REF]" if est_ref else (" [CAPPED anti-clip]" if capped else "")
        log(f"[ADJUST] {f.name:<12} {stats['mean']:5.1f} dB -> gain {gain:+.1f} dB{tag}")
    log(f"Volume: {tally['adjusted']} adjusted, {tally['as_is']} as-is, "
        f"{tally['skipped']} skipped, {tally['capped']} capped.")
    return tally


# ---------------------------------------------------------------------------
# audio.conf + packaging (from creer_pack.py)
# ---------------------------------------------------------------------------

_DEFAULT_CONF = {
    "Path": "/data/media/music",
    "Language": "EN",
    "Format": "ogg",
    "Volume": 100,
    "Control": "DAC LINEOUT Left",
    "Softvolume": 1,
    "Id": 2,
    "Ver": 2,
    "Date": "2024.9.19",
}


def make_conf(music: Path, lang: str, ver: str, log) -> dict:
    """Rewrite audio.conf: base = downloaded conf, key fields forced.
    Ver must be UNIQUE (the robot compares versions — see PACKS_VOIX.md)."""
    conf = dict(_DEFAULT_CONF)
    conf_path = music / "audio.conf"
    if conf_path.exists():
        try:
            conf.update(json.loads(conf_path.read_text(encoding="utf-8-sig")))
        except ValueError as exc:
            log(f"Original conf unreadable ({exc}) — defaults used.")
    conf["Language"] = lang.upper()
    conf["Id"] = LANGUAGES[lang][0]
    conf["Ver"] = int(ver)
    conf["Date"] = default_date()
    conf_path.write_text(json.dumps(conf, indent=2) + "\n", encoding="utf-8")
    log(f"audio.conf written: Language={conf['Language']} Id={conf['Id']} "
        f"Ver={conf['Ver']} ({ver_label(ver)}) Date={conf['Date']}.")
    return conf


def pack(lang: str, log):
    """Pack work/<lang>/media as a FLAT GNU tar (vendor style) into
    out/<lang>.tar.gz. Returns (archive, md5) — the md5 goes in the HA YAML."""
    media = WORK_DIR / lang / "media"
    music = media / "music"
    if not music.is_dir():
        raise RuntimeError(f"music folder missing: {music} (extract first).")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    archive = OUT_DIR / f"{lang}.tar.gz"
    with tarfile.open(archive, "w", format=tarfile.GNU_FORMAT) as tar:
        tar.add(str(media), arcname="media", recursive=False)
        tar.add(str(music), arcname="media/music", recursive=False)
        fichiers = sorted(
            f for f in music.iterdir()
            if f.is_file() and f.suffix.lower() in (".ogg", ".conf")
        )
        for f in fichiers:
            tar.add(str(f), arcname=f"media/music/{f.name}", recursive=False)
    log(f"Archive created: out/{archive.name} ({len(fichiers)} files, flat tar).")
    digest = md5_file(archive)
    log(f"MD5: {digest}")
    return archive, digest


# ---------------------------------------------------------------------------
# HTTP server + Home Assistant YAML
# ---------------------------------------------------------------------------

class _QuietHandler(SimpleHTTPRequestHandler):
    """Serves out/ only, logs into the GUI instead of stderr."""
    def __init__(self, *args, log_func=None, **kwargs):
        self._log_func = log_func
        super().__init__(*args, **kwargs)

    def log_message(self, fmt, *args):
        if self._log_func:
            self._log_func("HTTP " + (fmt % args))


class Serveur:
    """Small multi-threaded 0.0.0.0 server, restricted to the out/ folder."""

    def __init__(self, log):
        self._log = log
        self._httpd = None
        self._thread = None
        self.ip = None
        self.port = None

    @property
    def running(self):
        return self._httpd is not None

    def start(self, port: int):
        if self._httpd:
            raise RuntimeError("Server already running.")
        handler = partial(_QuietHandler, directory=str(OUT_DIR), log_func=self._log)
        last_err = None
        for p in range(port, port + 11):
            try:
                self._httpd = ThreadingHTTPServer(("0.0.0.0", p), handler)
            except OSError as exc:
                last_err = exc
                continue
            self._thread = threading.Thread(target=self._httpd.serve_forever, daemon=True)
            self._thread.start()
            self.ip, self.port = lan_ip(), p
            self._log(f"Server up on port {p} — the robot will fetch "
                      f"http://{self.ip}:{p}/<archive>.")
            return self.ip, p
        raise RuntimeError(f"No free port between {port} and {port + 10} ({last_err}).")

    def stop(self):
        if self._httpd:
            self._httpd.shutdown()
            self._httpd.server_close()
            self._thread.join(timeout=3)
            self._httpd = None
            self._thread = None
            self.ip = self.port = None
            self._log("Server stopped.")


def ha_yaml(entity_id: str, url: str, md5: str, lang: str) -> str:
    """Service-call text to paste into HA. Canonical form for this service
    (its schema declares target: entity), cf. PACKS_VOIX.md. The tool never
    fires the service itself."""
    return (
        "service: jonr_vac.install_voice_pack\n"
        "data:\n"
        f"  url: {url}\n"
        f"  md5: {md5}\n"
        f'  lang: "{LANGUAGES[lang][0]}"\n'
        "target:\n"
        f"  entity_id: {entity_id}\n"
    )


# ---------------------------------------------------------------------------
# Bundled transcriptions
# ---------------------------------------------------------------------------

def load_transcriptions(code: str):
    """Load transcriptions/<code>.json ({file.ogg: text}) or None."""
    path = TRANS_DIR / f"{code}.json"
    if not path.exists():
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8-sig"))
    except ValueError:
        return None


# ---------------------------------------------------------------------------
# Headless self-check (`python gui.py --selfcheck`)
# ---------------------------------------------------------------------------

def selfcheck(log=print, lang: str = "fr") -> bool:
    """Full chain without the GUI: cache -> extract -> reference -> conf ->
    pack. Returns True when everything is coherent."""
    ok = True

    def check(label, cond, detail=""):
        nonlocal ok
        mark = "PASS" if cond else "FAIL"
        log(f"[{mark}] {label}" + (f" — {detail}" if detail else ""))
        ok = ok and cond
        return cond

    src = CACHE_DIR / f"{lang}.tar.gz"
    if not check("Pack present in cache", src.exists(), str(src)):
        return False
    digest = md5_file(src)
    check("cache md5 == official md5", digest == OFFICIAL_MD5[lang],
          f"got {digest}")

    music = extract_pack(lang, log)
    n_ogg = sum(1 for f in music.glob("*.ogg"))
    check("Extraction: at least 100 .ogg", n_ogg >= 100, f"{n_ogg} files")

    stats = measure(music / REF_FILE)
    if check("Reference 1.ogg measured", stats is not None):
        check("reference loudness ≈ -9.6 dB (±1.5)",
              abs(stats["mean"] - (-9.60)) <= 1.5,
              f"got {stats['mean']:.2f} dB")

    conf = make_conf(music, lang, default_ver(), log)
    check("conf: Language/Id correct",
          conf["Language"] == lang.upper() and conf["Id"] == LANGUAGES[lang][0])

    archive, archive_md5 = pack(lang, log)
    check("archive readable (tar)", tarfile.is_tarfile(archive), str(archive))
    with tarfile.open(archive, "r:*") as tar:
        names = set(tar.getnames())
    check("content: media/music/1.ogg", "media/music/1.ogg" in names)
    check("content: media/music/audio.conf", "media/music/audio.conf" in names)

    check("md5 stable on re-read", md5_file(archive) == archive_md5, archive_md5)
    log("SELF-CHECK " + ("OK" if ok else "FAILED") + ": "
        + ("packlib chain is sound." if ok else "fix what is marked FAIL."))
    return ok
