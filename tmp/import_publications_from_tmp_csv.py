#!/usr/bin/env python3

from __future__ import annotations

import csv
import hashlib
import json
import re
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
PUBLICATIONS_DIR = ROOT_DIR / "features" / "achievements" / "data" / "publications"

CSV_SOURCES = [
    {"path": ROOT_DIR / "tmp" / "論文.csv", "category": "paper", "type": "journal"},
    {"path": ROOT_DIR / "tmp" / "国内学会.csv", "category": "domestic", "type": "conference"},
    {"path": ROOT_DIR / "tmp" / "国際学会.csv", "category": "international", "type": "conference"},
    {"path": ROOT_DIR / "tmp" / "情報処理学会88.csv", "category": "domestic", "type": "conference"},
    {"path": ROOT_DIR / "tmp" / "その他.csv", "category": "other", "type": "workshop"},
]

YEAR_PATTERN = re.compile(r"(19|20)\d{2}")
TOKEN_PATTERN = re.compile(r"[a-z0-9]+")
ACRONYM_PATTERN = re.compile(r"[A-Za-z][A-Za-z0-9-]{1,}")
JP_CHAR_PATTERN = re.compile(r"[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]")
YEAR_MONTH_PATTERN = re.compile(r"((?:19|20)\d{2})[./-](\d{1,2})")
YEAR_MONTH_JA_PATTERN = re.compile(r"((?:19|20)\d{2})年(\d{1,2})月")

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
MAX_SLUG_BASE_LENGTH = 48

PUBLICATION_CLASS_ABBR = {
    "international_conference": "ic",
    "domestic_conference": "dc",
    "international_journal": "ij",
    "domestic_journal": "dj",
    "international_workshop": "iw",
    "domestic_workshop": "dw",
    "thesis": "th",
    "other": "ot",
}

VENUE_SHORT_MAP = [
    ("情報処理学会", "ipsj"),
    ("電子情報通信学会", "ieice"),
    ("日本ロボット学会", "rsj"),
    ("計測自動制御学会", "sice"),
    ("大学コンソーシアム八王子", "hachioji"),
    ("分析化学討論会", "analchem"),
    ("roscon", "roscon"),
    ("springer", "springer"),
    ("ieee", "ieee"),
    ("swarm", "swarm"),
    ("arob", "arob"),
    ("sisa", "sisa"),
    ("jrm", "jrm"),
    ("jaciii", "jaciii"),
    ("journal of robotics and mechatronics", "jrm"),
    ("artificial life and robotics", "alr"),
    ("journal of composites science", "jcs"),
]


def normalize_text(value: str) -> str:
    return unicodedata.normalize("NFKC", value or "").strip()


def detect_year_month(date_text: str) -> tuple[int, int, bool]:
    normalized = normalize_text(date_text)
    year_month_match = YEAR_MONTH_PATTERN.search(normalized)
    if year_month_match:
        year = int(year_month_match.group(1))
        month = int(year_month_match.group(2))
        if 1 <= month <= 12:
            return year, month, True

    year_month_ja_match = YEAR_MONTH_JA_PATTERN.search(normalized)
    if year_month_ja_match:
        year = int(year_month_ja_match.group(1))
        month = int(year_month_ja_match.group(2))
        if 1 <= month <= 12:
            return year, month, True

    year_match = YEAR_PATTERN.search(normalized)
    if year_match:
        return int(year_match.group(0)), 0, True

    return 0, 0, False


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

def infer_scope(source_category: str, row: dict[str, str]) -> str:
    if source_category == "international":
        return "international"
    if source_category in {"domestic", "other"}:
        return "domestic"

    language_reference = f"{row.get('タイトル', '')} {row.get('発行元、大会', '')}"
    return "domestic" if contains_japanese(language_reference) else "international"


def infer_event_kind(publication_type: str, row: dict[str, str]) -> str:
    if publication_type == "thesis":
        return "thesis"
    if publication_type == "workshop":
        return "workshop"

    text = f"{row.get('タイトル', '')} {row.get('発行元、大会', '')}".lower()
    if "workshop" in text or "ワークショップ" in text:
        return "workshop"
    if publication_type == "journal":
        return "journal"
    if publication_type == "conference":
        return "conference"
    return "other"


def resolve_publication_class(source_category: str, publication_type: str, row: dict[str, str]) -> str:
    scope = infer_scope(source_category, row)
    event_kind = infer_event_kind(publication_type, row)

    if event_kind == "thesis":
        return "thesis"
    if event_kind == "journal":
        return "domestic_journal" if scope == "domestic" else "international_journal"
    if event_kind == "workshop":
        return "domestic_workshop" if scope == "domestic" else "international_workshop"
    if event_kind == "conference":
        return "domestic_conference" if scope == "domestic" else "international_conference"
    return "other"


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

def map_venue_slug(venue: str) -> str:
    normalized = normalize_text(venue)
    lower = normalized.lower()
    for keyword, slug in VENUE_SHORT_MAP:
        if keyword in normalized or keyword in lower:
            return slug
    return ""


def short_hash(*values: str, length: int = 6) -> str:
    text = "|".join(normalize_text(v) for v in values if normalize_text(v))
    digest = hashlib.sha1(text.encode("utf-8")).hexdigest()
    return digest[:length]


def truncate_slug_base(slug_base: str) -> str:
    return slug_base[:MAX_SLUG_BASE_LENGTH].rstrip("-")


def build_date_tag(year: int, month: int, year_detected: bool) -> str:
    if not year_detected:
        return "000000"
    if 1 <= month <= 12:
        return f"{year}{month:02d}"
    return f"{year}00"


def make_slug_base(publication_class: str, date_tag: str, row: dict[str, str]) -> str:
    venue = row.get("発行元、大会", "")
    title = row.get("タイトル", "")
    class_abbr = PUBLICATION_CLASS_ABBR.get(publication_class, "ot")

    mapped_venue_slug = map_venue_slug(venue)
    if mapped_venue_slug:
        venue_part = mapped_venue_slug
    else:
        acronym = extract_venue_acronym(venue)
        if acronym:
            venue_part = acronym[:12]
        else:
            venue_tokens = pick_short_tokens(extract_tokens(venue), max_count=1)
            if venue_tokens:
                venue_part = venue_tokens[0]
            else:
                venue_part = f"v{short_hash(venue, title)}"

    return truncate_slug_base(f"{class_abbr}-{date_tag}-{venue_part}")


def clean_row(row: dict[str, str | None]) -> dict[str, str]:
    cleaned: dict[str, str] = {}
    for key, value in row.items():
        normalized_key = normalize_text(key)
        cleaned[normalized_key] = normalize_text(value or "")
    return cleaned


def parse_tags(row: dict[str, str]) -> list[str]:
    raw_tags = row.get("タグ", "")
    if not raw_tags:
        return []

    normalized = raw_tags.replace("、", ",").replace(";", ",")
    tags = [normalize_text(tag) for tag in normalized.split(",")]
    return [tag for tag in tags if tag]


def build_metadata(
    publication_id: str,
    slug_base: str,
    slug_sequence: int,
    row: dict[str, str],
    source: dict[str, str | Path],
    year: int,
    year_raw: str,
    year_detected: bool,
    publication_class: str,
    row_number: int,
) -> dict:
    return {
        "id": publication_id,
        "slug_base": slug_base,
        "slug_sequence": slug_sequence,
        "title": row.get("タイトル", ""),
        "authors": row.get("著者", ""),
        "venue": row.get("発行元、大会", ""),
        "year": year,
        "published_at": row.get("年月", ""),
        "pages": row.get("ページ等", ""),
        "note": row.get("備考", ""),
        "link": row.get("リンク", ""),
        "year_raw": year_raw,
        "year_detected": year_detected,
        "publication_class": publication_class,
        "type": str(source["type"]),
        "doi": row.get("DOI", ""),
        "arxiv": row.get("arXiv", ""),
        "project": row.get("Project", ""),
        "code_url": row.get("Code URL", ""),
        "data_url": row.get("Data URL", ""),
        "award": row.get("受賞", ""),
        "bibtex": row.get("BibTeX", ""),
        "pdf": row.get("PDF", ""),
        "slides": row.get("Slides", ""),
        "poster": row.get("Poster", ""),
        "video": row.get("Video", ""),
        "tags": parse_tags(row),
        "abstract": row.get("アブストラクト", ""),
        "source_file": Path(str(source["path"])).name,
        "source_category": str(source["category"]),
        "source_row_number": row_number,
        "source_record": row,
        "draft": False,
    }


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


def ensure_publications_dir(target_dir: Path) -> None:
    target_dir.mkdir(parents=True, exist_ok=True)


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

    ensure_publications_dir(PUBLICATIONS_DIR)

    slug_counters: defaultdict[str, int] = defaultdict(int)
    count_by_bucket: Counter[str] = Counter()
    count_by_source: Counter[str] = Counter()
    skipped_existing = 0

    total_rows = 0
    for source in CSV_SOURCES:
        source_rows = load_rows(source["path"])
        for row_number, row in source_rows:
            year_raw = row.get("年月", "")
            year, month, year_detected = detect_year_month(year_raw)
            year_bucket = str(year) if year_detected else "others"
            publication_class = resolve_publication_class(
                source["category"],
                source["type"],
                row,
            )
            date_tag = build_date_tag(year, month, year_detected)

            slug_base = make_slug_base(publication_class, date_tag, row)
            slug_counters[slug_base] += 1
            slug_sequence = slug_counters[slug_base]
            publication_id = f"{slug_base}-{slug_sequence:02d}"

            metadata = build_metadata(
                publication_id=publication_id,
                slug_base=slug_base,
                slug_sequence=slug_sequence,
                row=row,
                source=source,
                year=year,
                year_raw=year_raw,
                year_detected=year_detected,
                publication_class=publication_class,
                row_number=row_number,
            )

            target_dir = PUBLICATIONS_DIR / year_bucket / publication_id
            if target_dir.exists():
                skipped_existing += 1
                continue
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
    print(f"Skipped (existing id): {skipped_existing}")
    print(f"Output directory: {PUBLICATIONS_DIR}")


if __name__ == "__main__":
    main()
