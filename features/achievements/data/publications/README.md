# 研究業績ディレクトリ / Publications Directory

このディレクトリには、研究室の研究業績（論文、発表など）が格納されています。

## 構造 / Structure

各サブディレクトリは1つの研究業績を表します：

```
publications/
├── pub-001/
│   ├── metadata.json      ← メタデータ（必須）
│   ├── paper.pdf          ← 論文PDF（オプション）
│   ├── slides.pdf         ← スライド（オプション）
│   ├── poster.jpg         ← ポスター（オプション）
│   ├── bibtex.bib         ← BibTeX（オプション）
│   └── README.md
├── pub-002/
│   └── ...
└── ...
```

## データの追加 / Adding Data

### 方法1: CLIスクリプト（推奨）

```bash
node scripts/addPublicationDirectory.mjs
```

### 方法2: 手動作成

1. 新しいディレクトリを作成（例: `pub-009/`）
2. `metadata.json` を作成
3. PDF、スライド、ポスターなどを配置（オプション）
4. `/features/achievements/data/loader.ts` を更新

## メタデータの構造 / Metadata Structure

**必須フィールド:**
- `title` - 論文タイトル
- `authors` - 著者名
- `venue` - 会議名・論文誌名
- `year` - 発表年
- `type` - タイプ（journal, conference, workshop, thesis）

**オプションフィールド:**
- `doi` - DOI
- `arxiv` - arXiv ID
- `abstract` - 概要
- `tags` - 技術タグ
- `pdf` - PDFファイル名
- `slides` - スライドファイル名
- `poster` - ポスターファイル名
- `bibtex` - BibTeXファイル名
- その他（詳細は [DATA_MANAGEMENT_GUIDE_V2.md](../../../../DATA_MANAGEMENT_GUIDE_V2.md) を参照）

## ファイルの配置 / File Placement

各ディレクトリに以下のファイルを配置できます：

- `paper.pdf` - 論文のPDFファイル
- `slides.pdf` / `slides.pptx` - プレゼンテーションスライド
- `poster.pdf` / `poster.jpg` - ポスター
- `bibtex.bib` - BibTeX引用情報
- `thumbnail.jpg` - サムネイル画像

ファイルを配置したら、`metadata.json` の対応するフィールドにファイル名を記述してください。

## 詳細情報 / More Information

詳細な使い方は以下を参照：
- [DATA_MANAGEMENT_GUIDE_V2.md](../../../../DATA_MANAGEMENT_GUIDE_V2.md)
- [DIRECTORY_BASED_DATA_SYSTEM.md](../../../../DIRECTORY_BASED_DATA_SYSTEM.md)
