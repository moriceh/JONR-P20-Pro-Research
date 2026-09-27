#!/usr/bin/env python3
"""Local research test: fetch the stock OTA firmware for the JONR P20 Pro
(MiOT xtl.vacuum.xm2216) from the Mi cloud.

Flow reverse-read from the decompiled Mi Home app (`_m_j/bz7.java` +
framework/update, see this repository's README): the read-only endpoint
POST {region}.api.io.mi.com/app/home/latest_version with body
{"model": "<model>"} returns the current build's signed download URL on
fk-res-abroad-cdn.home.mi.com — never the write-side /home/devupgrade.
The robot itself fetches that same URL when the cloud pushes miIO.ota.

This script mirrors fetch_jonr_plugin.py (same session model, same privacy
rules):
  1. gets a cloud session either from the Home Assistant config entry of a
     jonr_vac install (read-only; the user_id / ssecurity / service_token /
     pass_token / server keys the integration already persists) or from an
     interactive --login (password via getpass, captcha/2FA prompts),
  2. renews a restored session through the long-lived passToken
     (connector.refresh() — no password involved),
  3. POSTs latest_version for the model (--model, default xtl.vacuum.xm2216),
  4. downloads the minted URL and stores the blob VERBATIM (nothing is
     unpacked — use extract.py for that), then verifies it against the
     pinned archived build when it matches (29 885 952 bytes, md5
     06d9a31b74d2c987fd42c2defbe2b337 = 4.5.6_0805).
Use --list to stop at step 3 and save the raw server response instead.

Privacy rules baked in: NO secret value is ever printed (signed-URL queries
are stripped, candidate dicts are printed with every http value redacted),
nothing credential-bearing is written to disk. NOTE: the --list dump carries
an account-bound signed URL — keep it out of git (research-repository rule).

The HA `config` folder is asked at launch (Enter keeps the default, or pass
--config PATH to skip the prompt). From it the script reads
.storage/core.config_entries (the session) and custom_components/jonr_vac
(the cloud connector code it drives).

Usage:
    python fetch_jonr_firmware.py                      # HA session, download
    python fetch_jonr_firmware.py --list               # raw response, no download
    python fetch_jonr_firmware.py --dry                # offline self-test
    python fetch_jonr_firmware.py --login me@mail.com  # interactive login
    options: --model X --server de --config PATH --out DIR
"""
from __future__ import annotations

import argparse
import getpass
import hashlib
import importlib.util
import json
import os
import sys
from pathlib import Path

DEFAULT_MODEL = "xtl.vacuum.xm2216"
DEFAULT_CONFIG_DIR = "\\\\192.168.1.2\\config"  # research lab share
# The archived build shipped in this folder — a matching download means the
# cloud still serves the same version; a mismatch just means a newer build.
PINNED = {"size": 29_885_952, "md5": "06d9a31b74d2c987fd42c2defbe2b337",
          "build": "4.5.6_0805"}
HERE = Path(__file__).resolve().parent


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
    candidates = [integration_dir, HERE.parents[1] / "jonr-vac" / "custom_components" / "jonr_vac"]
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


def _http_values(d: dict) -> list[tuple[str, str]]:
    """(key, value) for every plain string value of d starting with http."""
    return [(k, v) for k, v in d.items()
            if isinstance(v, str) and v.startswith("http")]


def find_url_candidates(obj):
    """Walk a (possibly double-encoded) response and return dicts holding a
    plain http(s) string value, best-match first.

    The app-side OTA parser (bz7.java) never named the response key path in
    the dump — match structurally, like fetch_jonr_plugin.py does.
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
        blob = json.dumps(d, ensure_ascii=False).lower()
        return ("firmware" in blob) * 8 + ("bin" in blob) * 4 + ("version" in blob) * 2

    found.sort(key=score, reverse=True)
    return found


def pick_url(cand: dict) -> str:
    """The download URL of one candidate dict, key-name agnostic."""
    pairs = _http_values(cand)
    if not pairs:
        return ""
    fw = next((v for k, v in pairs if "firmware" in k.lower() or ".bin" in v.split("?", 1)[0]), "")
    return fw or pairs[0][1]


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


def save_and_verify(blob: bytes, out_dir: Path, suggested: str) -> list[str]:
    """Store the blob VERBATIM (never unpacked — extract.py does that), pin-check."""
    out_dir.mkdir(parents=True, exist_ok=True)
    name = (suggested or "firmware.bin").split("/")[-1]
    name = "".join(c for c in name if c.isalnum() or c in "._-") or "firmware.bin"
    target = out_dir / (name if name.endswith(".bin") else name + ".bin")
    target.write_bytes(blob)
    notes = [f"stored verbatim → {target}"]
    digest = hashlib.md5(blob).hexdigest()
    notes.append(f"size {len(blob)} bytes, md5 {digest}")
    if len(blob) == PINNED["size"] and digest == PINNED["md5"]:
        notes.append(f"MATCHES the archived {PINNED['build']} blob exactly")
    else:
        notes.append(f"different from the archived {PINNED['build']} "
                     f"(newer/other build — compare, then consider extract.py)")
    return notes


def dry_run() -> None:
    """Offline check of the URL-extraction + save/verify logic."""
    fake = {"code": 0, "result": {
        "version": "4.5.6_0805",
        "url": "https://fk-res-abroad-cdn.home.mi.com/06d9a31b74d2c987fd42c2defbe2b337_upd_xtl.vacuum.xm2216.bin?GalaxyAccessKeyId=K&Signature=S",
    }}
    cands = find_url_candidates(fake)
    assert cands, "no candidates"
    url = pick_url(cands[0])
    assert url.startswith("https://fk-res-abroad-cdn"), url
    shown = show_url(url)
    assert not shown.startswith(url) and "Signature=S" not in shown
    assert "<url>" in json.dumps(scrub(cands[0]))
    print("[dry] url extraction + query-hiding + scrub: PASS")
    tmp = Path(os.environ.get("TMP", ".")) / "jonr_fw_dryrun"
    notes = save_and_verify(b"\x00" * 16, tmp, "x_upd_x.bin")
    assert any("md5" in n for n in notes) and any("different" in n for n in notes), notes
    import shutil
    shutil.rmtree(tmp, ignore_errors=True)
    print("[dry] verbatim save + pin check: PASS")
    print("[dry] no credential or network access was used")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0],
                                 formatter_class=argparse.RawDescriptionHelpFormatter,
                                 epilog=__doc__)
    ap.add_argument("--dry", action="store_true", help="offline self-test, no creds/network")
    ap.add_argument("--list", action="store_true",
                    help="fetch only the version info: save the raw latest_version "
                         "response JSON and print it, no download")
    ap.add_argument("--model", default=DEFAULT_MODEL)
    ap.add_argument("--server", default=None, help="Mi cloud region (cn/de/ru/us/sg/…)")
    ap.add_argument("--config", default=None,
                    help="Home Assistant config folder (skips the launch prompt)")
    ap.add_argument("--out", default=str(HERE / "fetched_firmware"))
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

    # READ-ONLY endpoint only — never the write-side /home/devupgrade.
    url = cloud._api_url(server) + "/home/latest_version"
    resp = cloud._call(url, {"data": json.dumps({"model": args.model})})
    if resp is None:
        sys.exit("[!] latest_version got no response (non-200 or network)")
    print("[*] latest_version response top-level keys:", sorted(resp.keys()))
    if resp.get("code") not in (0, None):
        # Xiaomi's error envelope — code+message carry no secrets.
        sys.exit(f"[!] latest_version rejected: code={resp.get('code')} "
                 f"message={resp.get('message')!r}")

    if args.list:
        out_dir.mkdir(parents=True, exist_ok=True)
        target = out_dir / "latest_version_response.json"
        target.write_text(json.dumps(resp, ensure_ascii=False, indent=2),
                          encoding="utf-8")
        print(f"[*] raw response saved → {target}")
        print("    (contains an account-bound signed URL — keep it out of git)")
        for c in find_url_candidates(resp)[:10]:
            print("   ", json.dumps(scrub(c), ensure_ascii=False)[:300])
        return

    cands = find_url_candidates(resp)
    if not cands:
        sys.exit("[!] response carried no recognisable download URL; keys: "
                 + json.dumps({k: type(v).__name__ for k, v in resp.items()}))
    best = cands[0]
    meta = {k: v for k, v in best.items()
            if k in ("version", "size", "md5", "length")}
    print("[*] version info:", json.dumps(meta, ensure_ascii=False))
    fetch_url = pick_url(best)
    if not fetch_url:
        for cand in cands:
            fetch_url = pick_url(cand)
            if fetch_url:
                print(f"[*] url taken from a sibling dict (keys: "
                      f"{sorted(cand.keys())})")
                break
    if not fetch_url:
        sys.exit("[!] no http value found; top candidate keys/types: "
                 + json.dumps({k: type(v).__name__ for k, v in best.items()}))
    print("[*] fetching:", show_url(fetch_url))

    r = cloud._s.get(fetch_url, timeout=120)
    if r.status_code != 200:
        sys.exit(f"[!] download failed: HTTP {r.status_code}")
    blob = r.content
    print(f"[*] downloaded {len(blob)} bytes")
    suggested = fetch_url.split("?", 1)[0].rsplit("/", 1)[-1]
    for note in save_and_verify(blob, out_dir, suggested):
        print("   ", note)
    print(f"[*] done — inspect {out_dir}")


if __name__ == "__main__":
    main()
