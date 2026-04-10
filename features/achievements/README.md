# 研究業績ページ (`features/achievements`)

このディレクトリは、研究室サイトの「研究業績 (Achievements)」ページを構成する実装とデータをまとめたものです。  
業績データは `metadata.json` 単位で管理し、`AchievementsPage.tsx` がそれを読み込んで一覧表示・詳細表示します。

## 1. 何を表示するページか

研究業績ページでは、論文・学会発表・ワークショップなどの業績を以下の機能付きで表示します。

- 年フィルタ
- 業績区分フィルタ (Publication Class)
- 技術分野タグフィルタ
- ページネーション
- 一覧クリックで詳細ポップアップ表示

## 2. 各業績で表示される情報

表示は「`metadata.json` に定義されている項目のみ」です。未定義の項目は表示しません。

### 一覧表示

- タイトル
- 著者
- 発行元
- 発表日（`YYYY.MM` 形式。月がない場合は `YYYY`）
- 業績区分（略称バッジ）
- キーワード（`tags`）

### ポップアップ表示

- タイトル
- 著者
- 発行元
- ページ等
- 発行・発表日（`年月日 > 年月 > 年` の優先順）
- 業績区分（正式ラベル）
- 備考
- 受賞
- リンク（URLならクリック可能）
- キーワード
- その他（DOI / arXiv / Code URL / Data URL / Video / Project / BibTeX / PDF / Slides / Poster）
- Abstract

ポップアップは以下で閉じます。

- 右上の `×` ボタン
- ポップアップ外領域のクリック

## 3. 主要ファイルの仕組み

### `AchievementsPage.tsx`

- UI本体（フィルタ、一覧、ページング、詳細モーダル）を実装。
- `getAllPublications()` で読み込んだ業績を `useMemo` で絞り込み。
- `publication_class` を基準に区分フィルタを適用。
- ページ切り替え時に `window.scrollTo({ top: 0, behavior: 'smooth' })` を実行してページ上部へ移動。
- 日付文字列 (`published_at` / `year_raw`) を正規表現で解釈し、一覧・詳細それぞれの表示形式に整形。
- URL文字列は `http/https` 判定してリンク化。

### `types.ts`

- 業績データの型を定義。
- 主要型:
  - `PublicationType`: `journal | conference | workshop | thesis`
  - `PublicationClass`: `international_journal` などの区分
  - `Publication` / `PublicationMetadata`: 表示項目とメタデータ項目
- `TECH_TAGS` で技術分野フィルタ候補を定義。

### `data/loader.ts`

- `import.meta.glob('./publications/**/metadata.json', { eager: true })` で全業績を収集。
- `draft: true` のデータは除外。
- 並び順は「新しい順」:
  - 年降順
  - 月降順（年月不明は 0 月扱い）
  - 同点時は `id` 降順
- 年フィルタ、タグフィルタなどのユーティリティ関数を提供。

## 4. ディレクトリ構造

```text
features/achievements/
├── AchievementsPage.tsx
├── types.ts
├── data/
│   ├── loader.ts
│   └── publications/
│       ├── 2026/
│       │   └── <publication-id>/
│       │       └── metadata.json
│       ├── 2025/
│       │   └── <publication-id>/
│       │       └── metadata.json
│       └── others/
│           └── <publication-id>/
│               └── metadata.json
└── images/
    └── README.md
```

- `publications/<年>/<業績ID>/metadata.json` が基本構造です。
- 年を抽出できないデータは `others/` に入れます。

## 5. `metadata.json` 構造

主なキー（必要なものだけを入れればよい）:

- 識別:
  - `id`
  - `slug_base`
  - `slug_sequence`
- 基本情報:
  - `title`
  - `authors`
  - `venue`
  - `year`
  - `published_at`
  - `pages`
  - `note`
  - `link`
  - `publication_class`
  - `type`
- 追加情報:
  - `award`
  - `tags`
  - `abstract`
  - `doi`, `arxiv`, `code_url`, `data_url`, `project`, `video`, `pdf`, `slides`, `poster`, `bibtex`
- 取込トレース（CSV取込時）:
  - `source_file`
  - `source_category`
  - `source_row_number`
  - `source_record`

### `publication_class` の値

- `international_journal`
- `international_conference`
- `international_workshop`
- `domestic_journal`
- `domestic_conference`
- `domestic_workshop`
- `other`

## 6. 業績ID（slug）ルール

CSV取込スクリプトでは次の形式でIDを作成します。

`<class-abbr>-<YYYYMM or YYYY00>-<venue-short>-<seq>`

例:

- `ij-202510-springer-01`
- `dc-202509-rsj-01`

補足:

- `class-abbr` は業績区分の略号（例: `ij`, `ic`, `dc` など）
- 月が取れないときは `00`
- 同じ `slug_base` が重複したら `seq` を `01`, `02`, ... と採番

## 7. 業績の追加手順

運用は「手動追加」または「CSV一括再生成」の2通りです。

### A. 手動で1件追加する

1. 年フォルダを決める（例: `2026`、不明なら `others`）。
2. `features/achievements/data/publications/<year>/<publication-id>/` を作成。
3. その中に `metadata.json` を作成。
4. 最低限、`title`, `authors`, `venue`, `year`, `type`, `publication_class` を入れる。
5. 必要に応じて `published_at`, `pages`, `link`, `tags`, `abstract` などを追記。
6. 開発サーバで一覧・詳細表示を確認。

### B. CSVから一括再生成する（既存データを全削除して再作成）

対象CSV:

- `tmp/論文.csv`
- `tmp/国内学会.csv`
- `tmp/国際学会.csv`
- `tmp/その他.csv`

実行:

```bash
python3 tmp/import_publications_from_tmp_csv.py
```

注意:

- このスクリプトは `features/achievements/data/publications` 配下を一度空にしてから再生成します。
- 既存の手修正データがある場合は、実行前にバックアップしてください。
- 年月から年が抽出できない行は `others/` バケットに出力されます。
