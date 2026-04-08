# Development of Automated People Counting System using Line Detection

## メタデータ / Metadata

このディレクトリには以下のファイルを配置できます：
You can place the following files in this directory:

- `metadata.json` - 必須のメタデータ / Required metadata (✅ Created)
- `paper.pdf` - 論文PDF / Paper PDF (optional)
- `slides.pdf` / `slides.pptx` - スライド / Slides (optional)
- `poster.pdf` / `poster.jpg` - ポスター / Poster (optional)
- `bibtex.bib` - BibTeX ファイル / BibTeX file (optional)
- `thumbnail.jpg` - サムネイル画像 / Thumbnail image (optional)

## ファイル構成例 / Example File Structure

```
pub-001/
├── metadata.json
├── paper.pdf
├── slides.pdf
├── poster.jpg
├── bibtex.bib
└── README.md
```

## 使い方 / Usage

`metadata.json` を編集して、論文の情報を更新できます。
PDF、スライド、ポスターなどのファイルを追加する場合は、このディレクトリに配置してください。

You can edit `metadata.json` to update the publication information.
If you want to add PDF, slides, poster, etc., place them in this directory.

## メタデータの更新方法 / How to Update Metadata

1. `metadata.json` を開く / Open `metadata.json`
2. 必要なフィールドを編集 / Edit the required fields
3. 保存して、ウェブサイトをリロード / Save and reload the website

利用可能なフィールド / Available fields:
- `title` - 論文タイトル（必須）
- `authors` - 著者名（必須）
- `venue` - 会議名・論文誌名（必須）
- `year` - 発表年（必須）
- `type` - タイプ：`journal`, `conference`, `workshop`, `thesis`（必須）
- `doi` - DOI（オプション）
- `arxiv` - arXiv ID（オプション）
- `abstract` - 概要（オプション）
- `tags` - 技術タグ（オプション）
- `project` - プロジェクト名（オプション）
- `code_url` - コードURL（オプション）
- `data_url` - データURL（オプション）
- `video` - 動画URL（オプション）
- `award` - 受賞（オプション）
- `pdf` - PDFファイル名（オプション）
- `slides` - スライドファイル名（オプション）
- `poster` - ポスターファイル名（オプション）
- `bibtex` - BibTeXファイル名（オプション）
- `draft` - 下書きフラグ（オプション）
