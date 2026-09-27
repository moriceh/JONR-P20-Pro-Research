# Small python script that uses Whisper to make a transcription of all .ogg files in a folder
import json
from pathlib import Path
from faster_whisper import WhisperModel

AUDIO_DIR = Path(".")
OUTPUT_JSON = "transcriptions.json"

print("Loading Whisper model...")
model = WhisperModel("small", device="cpu", compute_type="int8", cpu_threads=8)

fichiers = sorted(list(AUDIO_DIR.glob("*.ogg")))
total = len(fichiers)

if total == 0:
    print("No .ogg files found.")
    raise SystemExit

print(f"{total} files found. Starting transcription :\n")

transcriptions = {}

for index, audio_path in enumerate(fichiers, start=1):
    segments, _ = model.transcribe(
        str(audio_path),
        language="fr",
        beam_size=5,
        vad_filter=True
    )
    
    texte = " ".join(s.text.strip() for s in segments)
    transcriptions[audio_path.name] = texte

    # Live display
    pct = (index / total) * 100
    print(f"[{index:02d}/{total:02d}] ({pct:5.1f} %) {audio_path.name} : {texte}")

# Final save
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(transcriptions, f, ensure_ascii=False, indent=2)

print(f"\nDone ! Data saved in {OUTPUT_JSON}")