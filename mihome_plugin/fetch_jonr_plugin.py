#!/usr/bin/env python3
"""Local research test: fetch the JONR Mi Home plugin (xtl.vacuum.xm2216)
from the Mi cloud.

Flow reverse-read from the decompiled Mi Home app (see this repository's
README): the app never stores plugin URLs — it mints them per request with
a signed Mi-cloud call (POST /v2/plugin/fetch_plugin, same RC4/signed-request
transport as /home/device_list), then plain-GETs the returned signed URL.

This script:
  1. gets a cloud session either from the Home Assistant config entry of a
     jonr_vac install (read-only; the user_id / ssecurity / service_token /
     pass_token / server keys the integration already persists) or from an
     interactive --login (password via getpass, captcha/2FA prompts),
  2. renews a restored session through the long-lived passToken
     (connector.refresh() — no password involved),
  3. POSTs fetch_plugin for the model (--model, default xtl.vacuum.xm2216,
     package_id 0 = latest),
  4. downloads the minted URL (safe-URL preferred, like the app) and stores
     it VERBATIM — the archive is never unzipped; only an in-memory peek
     verifies the RAM-bundle magic (0xFB0BD1E5) and model_list.json.
Use --list to stop at step 3 and save the raw server response instead.

Privacy rules baked in: NO secret value is ever printed (signed-URL queries
are stripped, candidate dicts are printed with every http value redacted),
nothing credential-bearing is written to disk. NOTE: the --list dump and the
downloaded archive name come from a server response that carries an
account-bound signed URL — keep both out of git (research-repository rule).

The HA `config` folder is asked at launch (Enter keeps the default, or pass
--config PATH to skip the prompt). From it the script reads
.storage/core.config_entries (the session) and custom_components/jonr_vac
(the cloud connector code it drives).

Usage:
    python fetch_jonr_plugin.py                      # HA session, download
    python fetch_jonr_plugin.py --list               # raw response, no download
    python fetch_jonr_plugin.py --dry                # offline self-test
    python fetch_jonr_plugin.py --login me@mail.com  # interactive login
    options: --model X --server de --config PATH --out DIR
"""
from __future__ import annotations

import argparse
import getpass
import importlib.util
import io
import json
import os
import struct
import sys
import zipfile
from pathlib import Path

DEFAULT_MODEL = "xtl.vacuum.xm2216"
RAM_BUNDLE_MAGIC = 0xFB0BD1E5
HERE = Path(__file__).resolve().parent

DEFAULT_CONFIG_DIR = "\\\\192.168.1.2\\config"  # research lab share


def ask_config_dir(cli_value: str | None, required: bool = True) -> Path:
    """Where HA's `config` folder lives — asked once at launch.

    Everything is derived from it: .storage/core.config_entries for the
    session, custom_components/jonr_vac for the cloud connector. With
    required=False (--login) a missing folder is tolerated — the connector
    then falls back to the local jonr-vac/ checkout.
    """
    default = cli_value or os.environ.get("JONR_VAC_CONFIG") or DEFAULT_CONFIG_DIR
    prompt = "Home Assistant config folder" + ("" if required else " [Enter to skip]")
    answer = input(f"{prompt} [{default}]: ").strip()
    raw = answer or default
    p = Path(os.path.expandvars(os.path.expanduser(raw.strip('"'))))
    if not p.is_dir():
        if required:
            sys.exit(f"[!] not a directory: {p}")
        print(f"[=] {p} not reachable — continuing without the HA session")
    return p


def load_connector(integration_dir: Path):
    """Import cloud/connector.py straight from the integration tree.

    Loaded by file path on purpose: importing it as jonr_vac.cloud would drag
    jonr_vac/__init__.py (and Home Assistant) into a plain-python process.
    Falls back to the local sibling jonr-vac/ checkout (covers
    --login on a machine without an HA config folder to read).
    """
    candidates = [integration_dir,
                  HERE.parents[1] / "jonr-vac" / "custom_components" / "jonr_vac"]
    for cand in candidates:
        path = cand / "cloud" / "connector.py"
        if path.is_file():
            break
    else:
        sys.exit("[!] cloud/connector.py not found under "
                 + " or ".join(str(c) for c in candidates))
    spec = importlib.util.spec_from_file_location("jonr_research_connector", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod.XiaomiCloud


def session_from_ha(storage: Path) -> dict:
    """Pull the session keys of the first map-capable jonr_vac entry.

    Returns plain strings for the caller's process only; they are never
    printed, logged or written. The file is opened read-only.
    """
    with open(storage, "r", encoding="utf-8") as fh:
        store = json.load(fh)
    for e in store.get("data", {}).get("entries", []):
        d = e.get("data") or {}
        if e.get("domain") != "jonr_vac":
            continue
        if d.get("service_token") and d.get("ssecurity") and d.get("user_id"):
            return {
                "user_id": str(d["user_id"]),
                "ssecurity": d["ssecurity"],
                "service_token": d["service_token"],
                "pass_token": d.get("pass_token") or "",
                "server": d.get("server") or "de",
            }
    sys.exit("[!] no jonr_vac entry with a classic cloud session (service_token/"
             "ssecurity) — an OAuth-only setup cannot sign api.io.mi.com calls; "
             "use --login instead")


def build_body(model: str, server: str) -> str:
    plugins = [{"model": model, "package_id": 0, "type": "rn"}]
    return json.dumps({
        "latest_req": {
            "api_version": 10117, "app_platform": "android",
            "region": server, "package_type": "", "plugins": plugins,
        },
        "backup_req": {
            "plugins": plugins, "api_level": 111, "app_platform": "phone",
        },
    })


def _http_values(d: dict) -> list[tuple[str, str]]:
    """(key, value) for every plain string value of d starting with http."""
    return [(k, v) for k, v in d.items()
            if isinstance(v, str) and v.startswith("http")]


def find_plugin_candidates(obj):
    """Walk a (possibly double-encoded) response and return the dicts that
    carry a download URL, best-match first.

    The app-side parser (om9.onSuccess) was 'Method dump skipped' in the
    JADX pass — not even the URL *key names* are verified — so match
    structurally: any dict holding a plain http(s) string value.
    """
    found: list[dict] = []

    def walk(node, depth=0):
        if depth > 40:
            return
        if isinstance(node, str):
            s = node.strip()
            if s[:1] in "{[" and len(s) > 2:
                try:
                    walk(json.loads(s), depth + 1)
                except ValueError:
                    pass
            return
        if isinstance(node, dict):
            if _http_values(node):
                found.append(node)
            for v in node.values():
                walk(v, depth + 1)
        elif isinstance(node, list):
            for v in node:
                walk(v, depth + 1)

    walk(obj)

    def score(d):
        blob = json.dumps(d, ensure_ascii=False)
        return (blob.count(DEFAULT_MODEL) > 0) * 8 + ("version" in blob) * 2 \
            + ("plugin" in blob.lower())

    found.sort(key=score, reverse=True)
    return found


def pick_url(cand: dict) -> tuple[str, str]:
    """Return (url, safe_url) from one candidate dict, key-name agnostic.

    App logic (qj9): prefer the 'safe' URL when present, else the plain one.
    """
    pairs = _http_values(cand)
    if not pairs:
        return "", ""
    safe = next((v for k, v in pairs if "safe" in k.lower()), "")
    url = next((v for k, v in pairs if "safe" not in k.lower()), pairs[0][1])
    return (safe or url, safe)


def scrub(d):
    """Copy of d with every http string replaced — safe to print."""
    if isinstance(d, dict):
        return {k: ("<url>" if isinstance(v, str) and v.startswith("http")
                    else scrub(v)) for k, v in d.items()}
    if isinstance(d, list):
        return [scrub(v) for v in d]
    return d


def show_url(url: str) -> str:
    """Displayable form of a signed URL: everything BEFORE the query."""
    return url.split("?", 1)[0] + ("?…(query hidden)" if "?" in url else "")


def save_and_inspect(blob: bytes, out_dir: Path, suggested_name: str) -> list[str]:
    """Store the payload VERBATIM (never unzipped), then peek in memory."""
    out_dir.mkdir(parents=True, exist_ok=True)
    name = (suggested_name or "plugin_payload").split("/")[-1]
    name = "".join(c for c in name if c.isalnum() or c in "._-") or "plugin_payload"
    ext = ".zip" if blob[:4] == b"PK\x03\x04" else ".bundle"
    target = out_dir / (name if name.endswith((".zip", ".bundle")) else name + ext)
    target.write_bytes(blob)
    notes = [f"stored verbatim (not extracted) → {target}"]
    if blob[:4] != b"PK\x03\x04":
        magic = struct.unpack("<I", blob[:4])[0] if len(blob) >= 4 else 0
        notes.append(f"raw bundle magic {hex(magic)} "
                     + ("OK (RAM bundle)" if magic == RAM_BUNDLE_MAGIC else "[!] NOT a RAM bundle"))
        return notes
    with zipfile.ZipFile(io.BytesIO(blob)) as zf:
        names = zf.namelist()
        notes.append(f"zip contains {len(names)} entries: {', '.join(names[:12])}"
                     + ("…" if len(names) > 12 else ""))
        entry = next((n for n in names if n.replace("\\", "/").endswith("main.bundle")), None)
        if entry is None:
            notes.append("[!] main.bundle not in zip")
            return notes
        with zf.open(entry) as fh:
            magic = struct.unpack("<I", fh.read(4))[0]
        notes.append(f"main.bundle magic {hex(magic)} "
                     + ("OK (RAM bundle)" if magic == RAM_BUNDLE_MAGIC else "[!] NOT a RAM bundle"))
        ml = next((n for n in names if n.endswith("model_list.json")), None)
        if ml:
            try:
                notes.append("model_list.json: " + json.dumps(
                    json.loads(zf.read(ml)), ensure_ascii=False)[:200])
            except ValueError:
                notes.append("[!] model_list.json unreadable")
    return notes


def interactive_login(XiaomiCloud, username: str, password: str | None,
                      out_dir: Path):
    cloud = XiaomiCloud(username, password or getpass.getpass("Mi password: "))

    def captcha_cb(png: bytes) -> str:
        out_dir.mkdir(parents=True, exist_ok=True)
        p = out_dir / "captcha.png"
        p.write_bytes(png)
        print(f"[*] captcha image → {p}")
        return input("captcha code: ").strip()

    def twofa_cb() -> str:
        return input("email 2FA code: ").strip()

    if not cloud.login(captcha_cb=captcha_cb, twofa_cb=twofa_cb):
        sys.exit(f"[!] login failed: {cloud.login_error or 'no serviceToken'}")
    print("[+] logged in interactively")
    return cloud


def dry_run() -> None:
    """Offline check of the URL-extraction + save/inspect logic."""
    fake_nested = {"code": 0, "result": {"plugins": [
        {"model": "some.other", "url": "https://x/other.zip?Sig=SECRET"},
        {"model": DEFAULT_MODEL, "plugin_id": 1018764, "package_id": 900, "version": 272,
         "url": "https://cdn.example/a.zip?GalaxyAccessKeyId=K&Signature=S",
         "safe_url": "https://cdn.example/a.zip?token=T", "length": 123},
    ]}}
    fake_double = {"result": json.dumps([{"url": "https://d/main.zip?q=1",
                                          "model": DEFAULT_MODEL}], ensure_ascii=False)}
    for name, payload, expect_host in (
        ("nested", fake_nested, "cdn.example"),
        ("double-encoded", fake_double, "d"),
    ):
        cands = find_plugin_candidates(payload)
        assert cands, f"{name}: no candidates"
        url, _safe = pick_url(cands[0])
        assert url.startswith("http") and expect_host in url, f"{name}: {url!r}"
        shown = show_url(url)
        assert not shown.startswith(url), f"{name}: query not hidden"
        assert "SECRET" not in shown and "token=T" not in shown and "Signature=S" not in shown
        assert "<url>" in json.dumps(scrub(cands[0])), f"{name}: scrub failed"
    print("[dry] url extraction + query-hiding + scrub: PASS")
    assert build_body(DEFAULT_MODEL, "de").count(DEFAULT_MODEL) == 2
    print("[dry] request body shape: PASS")
    # in-memory zip with a fake RAM bundle + model_list, then save_and_inspect
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as zf:
        zf.writestr("main.bundle", struct.pack("<I", RAM_BUNDLE_MAGIC) + b"\0" * 64)
        zf.writestr("model_list.json", json.dumps(
            [{"model": DEFAULT_MODEL, "version": 272}]))
    tmp = Path(os.environ.get("TMP", ".")) / "jonr_fetch_dryrun"
    notes = save_and_inspect(buf.getvalue(), tmp, "fake.zip")
    assert any("OK (RAM bundle)" in n for n in notes), notes
    assert any(DEFAULT_MODEL in n for n in notes), notes
    import shutil
    shutil.rmtree(tmp, ignore_errors=True)
    print("[dry] verbatim save + in-memory verify: PASS")
    print("[dry] no credential or network access was used")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0],
                                 formatter_class=argparse.RawDescriptionHelpFormatter,
                                 epilog=__doc__)
    ap.add_argument("--dry", action="store_true", help="offline self-test, no creds/network")
    ap.add_argument("--list", action="store_true",
                    help="fetch only the plugin list: save the raw fetch_plugin "
                         "response JSON and print a table, no download")
    ap.add_argument("--model", default=DEFAULT_MODEL)
    ap.add_argument("--server", default=None, help="Mi cloud region (cn/de/ru/us/sg/…)")
    ap.add_argument("--config", default=None,
                    help="Home Assistant config folder (skips the launch prompt)")
    ap.add_argument("--out", default=str(HERE / "fetched_plugin"))
    ap.add_argument("--login", metavar="USERNAME", default=None,
                    help="interactive Mi login instead of reusing the HA session")
    ap.add_argument("--password", default=None,
                    help="with --login (omit to be prompted; avoids shell history)")
    args = ap.parse_args()

    out_dir = Path(args.out)
    if args.dry:
        dry_run()
        return

    config_dir = ask_config_dir(args.config, required=not args.login)
    XiaomiCloud = load_connector(config_dir / "custom_components" / "jonr_vac")

    if args.login:
        cloud = interactive_login(XiaomiCloud, args.login, args.password, out_dir)
        server = args.server or "de"
    else:
        sess = session_from_ha(config_dir / ".storage" / "core.config_entries")
        cloud = XiaomiCloud(username="")          # password never needed here
        cloud.restore_session(sess["user_id"], sess["ssecurity"],
                              sess["service_token"], sess["pass_token"] or None)
        if sess["pass_token"]:
            if cloud.refresh():
                print("[+] session renewed via passToken")
            else:
                print("[=] passToken renewal failed, trying stored session as-is")
        server = args.server or sess["server"]

    url = cloud._api_url(server) + "/v2/plugin/fetch_plugin"
    resp = cloud._call(url, {"data": build_body(args.model, server)})
    if resp is None:
        sys.exit("[!] fetch_plugin got no response (non-200 or network)")
    print("[*] fetch_plugin response top-level keys:", sorted(resp.keys()))
    if resp.get("code") not in (0, None):
        # Xiaomi's error envelope — code+message carry no secrets.
        sys.exit(f"[!] fetch_plugin rejected: code={resp.get('code')} "
                 f"message={resp.get('message')!r}")

    if args.list:
        out_dir.mkdir(parents=True, exist_ok=True)
        target = out_dir / "fetch_plugin_response.json"
        target.write_text(json.dumps(resp, ensure_ascii=False, indent=2),
                          encoding="utf-8")
        print(f"[*] raw response saved → {target}")
        print("    (contains an account-bound signed URL — keep it out of git)")
        cands = find_plugin_candidates(resp)
        print(f"[*] {len(cands)} plugin candidate(s):")
        for c in cands[:20]:
            print("   ", json.dumps(scrub(c), ensure_ascii=False)[:300])
        return

    cands = find_plugin_candidates(resp)
    if not cands:
        # Shape inference (om9.onSuccess dump skipped) missed — ask the user to
        # inspect; dumping the response here could leak a signed URL.
        sys.exit("[!] response carried no recognisable download URL; keys: "
                 + json.dumps({k: type(v).__name__ for k, v in resp.items()}))
    # Best candidate for METADATA is the one mentioning the model; its URL
    # may sit in a nested dict, so fall back to the first descendant holding
    # an http value (key-name agnostic — om9.onSuccess was never dumped).
    best = cands[0]
    meta = {k: v for k, v in best.items()
            if k in ("plugin_id", "package_id", "model", "version", "length")}
    print("[*] best candidate:", json.dumps(meta, ensure_ascii=False))
    fetch_url, safe = pick_url(best)
    if not fetch_url:
        for cand in cands:
            fetch_url, safe = pick_url(cand)
            if fetch_url:
                print(f"[*] url taken from a sibling dict (keys: "
                      f"{sorted(cand.keys())})")
                break
    if not fetch_url:
        sys.exit("[!] no http value found; top candidate keys/types: "
                 + json.dumps({k: type(v).__name__ for k, v in best.items()}))
    print("[*] fetching:", show_url(fetch_url), "(safe preferred)" if safe else "(plain url)")

    r = cloud._s.get(fetch_url, timeout=60)
    if r.status_code != 200:
        sys.exit(f"[!] download failed: HTTP {r.status_code}")
    blob = r.content
    print(f"[*] downloaded {len(blob)} bytes "
          f"(declared length {meta.get('length', 'n/a')})")
    suggested = fetch_url.split("?", 1)[0].rsplit("/", 1)[-1]
    for note in save_and_inspect(blob, out_dir, suggested):
        print("   ", note)
    print(f"[*] done — inspect {out_dir}")


if __name__ == "__main__":
    main()
