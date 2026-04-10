#!/usr/bin/env python3

from __future__ import annotations

import csv
import hashlib
import json
import re
import shutil
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
PUBLICATIONS_DIR = ROOT_DIR / "features" / "achievements" / "data" / "publications"

CSV_SOURCES = [
    {"path": ROOT_DIR / "tmp" / "論文.csv", "category": "paper", "type": "journal"},
    {"path": ROOT_DIR / "tmp" / "国内学会.csv", "category": "domestic", "type": "conference"},
    {"path": ROOT_DIR / "tmp" / "国際学会.csv", "category": "international", "type": "conference"},
    {"path": ROOT_DIR / "tmp" / "その他.csv", "category": "other", "type": "workshop"},
]

YEAR_PATTERN = re.compile(r"(19|20)\d{2}")
TOKEN_PATTERN = re.compile(r"[a-z0-9]+")
ACRONYM_PATTERN = re.compile(r"[A-Za-z][A-Za-z0-9-]{1,}")
JP_CHAR_PATTERN = re.compile(r"[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]")

STOPWORDS = {
    "the",
    "and",
    "for",
    "with",
    "using",
    "use",
    "based",
    "study",
    "method",
    "methods",
    "approach",
    "approaches",
    "analysis",
    "proposal",
    "proposed",
    "evaluation",
    "toward",
    "towards",
    "from",
    "into",
    "through",
    "between",
    "among",
    "using",
    "control",
    "controls",
    "learning",
    "deep",
    "reinforcement",
    "system",
    "systems",
    "vehicle",
    "vehicles",
    "autonomous",
    "driving",
}

MAX_SLUG_TOKEN_COUNT = 2
MAX_SLUG_TOKEN_LENGTH = 12
MAX_SLUG_BASE_LENGTH = 40

VENUE_JA_SLUG_MAP = [
    ("情報処理学会", "ipsj"),
    ("電子情報通信学会", "ieice"),
    ("日本ロボット学会", "rsj"),
    ("計測自動制御学会", "sice"),
    ("大学コンソーシアム八王子", "hachioji"),
    ("分析化学討論会", "analchem"),
]


def normalize_text(value: str) -> str:
    return unicodedata.normalize("NFKC", value or "").strip()


def detect_year(year_text: str) -> tuple[int, bool]:
    match = YEAR_PATTERN.search(normalize_text(year_text))
    if not match:
        return 0, False
    return int(match.group(0)), True


def extract_tokens(*values: str) -> list[str]:
    tokens: list[str] = []
    for value in values:
        normalized = normalize_text(value).lower()
        tokens.extend(TOKEN_PATTERN.findall(normalized))
    return [
        token
        for token in tokens
        if len(token) > 1 and token not in STOPWORDS and not token.isdigit()
    ]

def contains_japanese(value: str) -> bool:
    return bool(JP_CHAR_PATTERN.search(normalize_text(value)))


def pick_short_tokens(tokens: list[str], max_count: int = MAX_SLUG_TOKEN_COUNT) -> list[str]:
    picked: list[str] = []
    for token in tokens:
        if token in picked:
            continue
        picked.append(token[:MAX_SLUG_TOKEN_LENGTH])
        if len(picked) >= max_count:
            break
    return picked


def extract_venue_acronym(venue: str) -> str:
    normalized = normalize_text(venue)
    candidates = ACRONYM_PATTERN.findall(normalized)
    for candidate in candidates:
        lowered = candidate.lower()
        if lowered in STOPWORDS:
            continue
        if candidate.isdigit():
            continue
        # Keep acronyms compact and stable.
        compact = candidate.lower().strip("-")
        if compact:
            return compact[:14]
    return ""

def map_japanese_venue_slug(venue: str) -> str:
    normalized = normalize_text(venue)
    for keyword, slug in VENUE_JA_SLUG_MAP:
        if keyword in normalized:
            return slug
    return ""


def short_hash(*values: str, length: int = 6) -> str:
    text = "|".join(normalize_text(v) for v in values if normalize_text(v))
    digest = hashlib.sha1(text.encode("utf-8")).hexdigest()
    return digest[:length]


def truncate_slug_base(slug_base: str) -> str:
    return slug_base[:MAX_SLUG_BASE_LENGTH].rstrip("-")


def make_slug_base(category: str, row: dict[str, str]) -> str:
    title = row.get("タイトル", "")
    venue = row.get("発行元、大会", "")
    authors = row.get("著者", "")

    title_tokens = pick_short_tokens(extract_tokens(title))
    if title_tokens:
        return truncate_slug_base(f"{category}-{'-'.join(title_tokens)}")

    is_japanese = contains_japanese(title) or contains_japanese(venue) or contains_japanese(authors)
    if is_japanese:
        acronym = extract_venue_acronym(venue)
        if acronym:
            return truncate_slug_base(f"{category}-{acronym}")
        mapped_venue_slug = map_japanese_venue_slug(venue)
        if mapped_venue_slug:
            return truncate_slug_base(f"{category}-{mapped_venue_slug}")
        return f"{category}-ja-{short_hash(title, venue, authors)}"

    venue_tokens = pick_short_tokens(extract_tokens(venue), max_count=1)
    if venue_tokens:
        return truncate_slug_base(f"{category}-{'-'.join(venue_tokens)}")

    author_tokens = pick_short_tokens(extract_tokens(authors), max_count=1)
    if author_tokens:
        return truncate_slug_base(f"{category}-{'-'.join(author_tokens)}")

    return f"{category}-entry-{short_hash(title, venue, authors)}"


def clean_row(row: dict[str, str | None]) -> dict[str, str]:
    cleaned: dict[str, str] = {}
    for key, value in row.items():
        normalized_key = normalize_text(key)
        cleaned[normalized_key] = normalize_text(value or "")
    return cleaned


def load_rows(csv_path: Path) -> list[tuple[int, dict[str, str]]]:
    rows: list[tuple[int, dict[str, str]]] = []
    with csv_path.open("r", encoding="utf-8-sig", newline="") as file:
        reader = csv.DictReader(file)
        for row_number, raw_row in enumerate(reader, start=2):
            row = clean_row(raw_row)
            if all(not value for value in row.values()):
                continue
            rows.append((row_number, row))
    return rows


def reset_publications_dir(target_dir: Path) -> None:
    target_dir.mkdir(parents=True, exist_ok=True)
    for child in target_dir.iterdir():
        if child.is_dir():
            shutil.rmtree(child)
        else:
            child.unlink()


def write_metadata_file(target_dir: Path, metadata: dict) -> None:
    target_dir.mkdir(parents=True, exist_ok=False)
    output_path = target_dir / "metadata.json"
    output_path.write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def main() -> None:
    missing_sources = [source["path"] for source in CSV_SOURCES if not source["path"].exists()]
    if missing_sources:
        missing_text = ", ".join(str(path) for path in missing_sources)
        raise FileNotFoundError(f"CSV file not found: {missing_text}")

    reset_publications_dir(PUBLICATIONS_DIR)

    slug_counters: defaultdict[str, int] = defaultdict(int)
    count_by_bucket: Counter[str] = Counter()
    count_by_source: Counter[str] = Counter()

    total_rows = 0
    for source in CSV_SOURCES:
        source_rows = load_rows(source["path"])
        for row_number, row in source_rows:
            year_raw = row.get("年月", "")
            year, year_detected = detect_year(year_raw)
            year_bucket = str(year) if year_detected else "others"

            slug_base = make_slug_base(source["category"], row)
            slug_counters[slug_base] += 1
            slug_sequence = slug_counters[slug_base]
            publication_id = f"{slug_base}-{slug_sequence:02d}"

            metadata = {
                "id": publication_id,
                "slug_base": slug_base,
                "slug_sequence": slug_sequence,
                "title": row.get("タイトル", ""),
                "authors": row.get("著者", ""),
                "venue": row.get("発行元、大会", ""),
                "year": year,
                "type": source["type"],
                "year_raw": year_raw,
                "year_detected": year_detected,
                "source_file": source["path"].name,
                "source_category": source["category"],
                "source_row_number": row_number,
                "source_record": row,
            }

            target_dir = PUBLICATIONS_DIR / year_bucket / publication_id
            write_metadata_file(target_dir, metadata)

            total_rows += 1
            count_by_bucket[year_bucket] += 1
            count_by_source[source["path"].name] += 1

    print(f"Imported {total_rows} records.")
    print("By source file:")
    for source_name in sorted(count_by_source):
        print(f"  {source_name}: {count_by_source[source_name]}")
    print("By year bucket:")
    for bucket_name in sorted(count_by_bucket):
        print(f"  {bucket_name}: {count_by_bucket[bucket_name]}")
    print(f"Output directory: {PUBLICATIONS_DIR}")


if __name__ == "__main__":
    main()
