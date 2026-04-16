#!/usr/bin/env python3

from __future__ import annotations

import argparse
import csv
import sys
from pathlib import Path

OUTPUT_CSV = Path(__file__).resolve().parent / "情報処理学会88.csv"
SECTIONS = ("タイトル", "著者", "アブストラクト")
FIELDNAMES = ["著者", "タイトル", "アブストラクト", "発行元、大会", "年月", "区分"]

COMMON_DATE = "2026年3月"
COMMON_VENUE = "情報処理学会 第88回全国大会"
COMMON_CATEGORY = "国内発表"


def trim_blank_edges(lines: list[str]) -> list[str]:
    start = 0
    end = len(lines)
    while start < end and not lines[start].strip():
        start += 1
    while end > start and not lines[end - 1].strip():
        end -= 1
    return lines[start:end]


def normalize_authors(raw_authors: str) -> str:
    text = raw_authors.replace("○", "")
    text = text.replace("（", "(").replace("）", ")")
    cleaned_chars: list[str] = []
    depth = 0
    for ch in text:
        if ch == "(":
            depth += 1
            continue
        if ch == ")" and depth > 0:
            depth -= 1
            continue
        if depth == 0:
            cleaned_chars.append(ch)

    text = "".join(cleaned_chars)
    text = text.replace("，", ",")
    text = text.replace(" ,", ",").replace(", ", ", ")
    text = " ".join(text.split())
    return text.strip(" ,")


def build_record(title: str, authors_raw: str, abstract: str) -> dict[str, str]:
    return {
        "著者": normalize_authors(authors_raw),
        "タイトル": title,
        "アブストラクト": abstract,
        "発行元、大会": COMMON_VENUE,
        "年月": COMMON_DATE,
        "区分": COMMON_CATEGORY,
    }


def has_section_markers(lines: list[str]) -> bool:
    for line in lines:
        stripped = line.strip()
        for section in SECTIONS:
            if stripped == section:
                return True
            if stripped.startswith(section + ":") or stripped.startswith(section + "："):
                return True
    return False


def parse_records_with_markers(lines: list[str]) -> list[dict[str, str]]:
    records: list[dict[str, str]] = []
    current = {section: [] for section in SECTIONS}
    current_section: str | None = None
    seen_any = False

    def flush_record() -> None:
        nonlocal current, seen_any
        if not seen_any:
            return

        title = "\n".join(trim_blank_edges(current["タイトル"])).strip()
        authors_raw = " ".join(line.strip() for line in current["著者"] if line.strip())
        abstract = "\n".join(trim_blank_edges(current["アブストラクト"]))

        if title:
            records.append(build_record(title, authors_raw, abstract))

        current = {section: [] for section in SECTIONS}
        seen_any = False

    for line in lines:
        stripped = line.strip()

        matched_section = None
        section_value = ""
        for section in SECTIONS:
            if stripped == section:
                matched_section = section
                break
            if stripped.startswith(section + ":") or stripped.startswith(section + "："):
                matched_section = section
                section_value = stripped[len(section) + 1 :].lstrip()
                break

        if matched_section is not None:
            if matched_section == "タイトル" and seen_any:
                flush_record()

            current_section = matched_section
            if section_value:
                current[current_section].append(section_value)
                seen_any = True
            continue

        if current_section is None:
            continue

        current[current_section].append(line)
        seen_any = True

    flush_record()
    return records


def split_non_empty_blocks(lines: list[str]) -> list[list[str]]:
    blocks: list[list[str]] = []
    current: list[str] = []
    for line in lines:
        if line.strip():
            current.append(line)
            continue
        if current:
            blocks.append(current)
            current = []
    if current:
        blocks.append(current)
    return blocks


def parse_records_without_markers(lines: list[str]) -> list[dict[str, str]]:
    records: list[dict[str, str]] = []
    for block in split_non_empty_blocks(lines):
        if len(block) < 2:
            continue
        title = block[0].strip()
        authors_raw = block[1].strip()
        abstract = "\n".join(trim_blank_edges(block[2:]))
        if not title:
            continue
        records.append(build_record(title, authors_raw, abstract))
    return records


def parse_records(raw_text: str) -> list[dict[str, str]]:
    lines = raw_text.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    if has_section_markers(lines):
        return parse_records_with_markers(lines)
    return parse_records_without_markers(lines)


def load_input_text(input_path: Path | None) -> str:
    if input_path is None:
        if sys.stdin.isatty():
            print("業績データを貼り付けてください。")
            print("終了するには単独行で EOF と入力するか、Ctrl-D を押してください。")
            lines: list[str] = []
            while True:
                try:
                    line = input()
                except EOFError:
                    break
                if line.strip() == "EOF":
                    break
                lines.append(line)
            return "\n".join(lines)
        return sys.stdin.read()
    return input_path.read_text(encoding="utf-8")


def append_rows(output_csv: Path, rows: list[dict[str, str]]) -> None:
    output_csv.parent.mkdir(parents=True, exist_ok=True)
    file_exists = output_csv.exists() and output_csv.stat().st_size > 0
    with output_csv.open("a", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
        if not file_exists:
            writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="情報処理学会第88回全国大会の業績CSVを生成・追記します。"
    )
    parser.add_argument(
        "--input",
        type=Path,
        help="入力テキストファイル。未指定時は標準入力を使用します。",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=OUTPUT_CSV,
        help=f"出力先CSV（既定: {OUTPUT_CSV}）",
    )
    args = parser.parse_args()

    raw_text = load_input_text(args.input)
    records = parse_records(raw_text)
    if not records:
        raise ValueError(
            "業績を1件も解析できませんでした。"
            "`タイトル/著者/アブストラクト`見出し付き形式か、"
            "空行区切りの `タイトル1行 + 著者1行 + アブストラクト` 形式を確認してください。"
        )

    append_rows(args.output, records)
    print(f"{len(records)}件を {args.output} に追記しました。")


if __name__ == "__main__":
    main()
