# データ管理ガイド / Data Management Guide

このドキュメントでは、ニュースと研究業績のデータを管理・更新する方法を説明します。

## 🏗️ 新しいアーキテクチャ / New Architecture

**1件 = 1ディレクトリ**の構造を採用しています。各ニュースや論文は独立したディレクトリに保存され、メタデータ、画像、PDFなどのファイルを一箇所で管理できます。

We use a **1 item = 1 directory** structure. Each news item or publication is stored in its own directory, allowing you to manage metadata, images, PDFs, and other files in one place.

---

## 📁 ディレクトリ構造 / Directory Structure

```
features/
├── news/
│   ├── types.ts                  ← ニュースの型定義
│   ├── data/
│   │   ├── loader.ts             ← データローダー
│   │   └── items/                ← ニュースアイテム（1件 = 1ディレクトリ）
│   │       ├── news-001/
│   │       │   ├── metadata.json ← メタデータ（必須）
│   │       │   ├── image.jpg     ← 画像（オプション）
│   │       │   └── README.md     ← 説明
│   │       ├── news-002/
│   │       └── ...
│   └── NewsPage.tsx
│
└── achievements/
    ├── types.ts                  ← 研究業績の型定義
    ├── data/
    │   ├── loader.ts             ← データローダー
    │   └── publications/         ← 研究業績（1件 = 1ディレクトリ）
    │       ├── pub-001/
    │       │   ├── metadata.json ← メタデータ（必須）
    │       │   ├── paper.pdf     ← 論文PDF（オプション）
    │       │   ├── slides.pdf    ← スライド（オプション）
    │       │   ├── poster.jpg    ← ポスター（オプション）
    │       │   ├── bibtex.bib    ← BibTeX（オプション）
    │       │   └── README.md     ← 説明
    │       ├── pub-002/
    │       └── ...
    └── AchievementsPage.tsx
```

---

## 🚀 クイックスタート / Quick Start

### 方法1: CLIスクリプトを使用（推奨）

```bash
# ニュースを追加
node scripts/addNewsDirectory.mjs

# 研究業績を追加
node scripts/addPublicationDirectory.mjs
```

対話形式で必要な情報を入力すると、自動的にディレクトリとメタデータファイルが作成されます。

### 方法2: 手動でディレクトリを作成

1. 新しいディレクトリを作成
2. `metadata.json` を作成してメタデータを記述
3. 必要に応じて画像やPDFファイルを配置

---

## 📰 ニュースの管理 / News Management

### ニュースのメタデータ構造

**必須フィールド / Required Fields:**
- `title` (string) - ニュースのタイトル
- `date` (string) - 日付（YYYY.MM.DD形式）
- `category` (string) - カテゴリー（Publication | Event | Award | Press | Recruit | Other）

**オプションフィールド / Optional Fields:**
- `summary` (string) - 概要
- `tags` (string[]) - タグのリスト
- `related_members` (string[]) - 関連メンバー
- `related_projects` (string[]) - 関連プロジェクト
- `related_publications` (string[]) - 関連論文
- `lang` ('ja' | 'en') - 言語
- `image` (string) - 画像ファイル名
- `link` (string) - 外部リンクURL
- `draft` (boolean) - 下書きフラグ

### メタデータ例 / Metadata Example

```json
{
  "title": "New paper on Large Language Models accepted at NeurIPS 2024.",
  "date": "2024.03.15",
  "category": "Publication",
  "link": "https://neurips.cc/",
  "summary": "Our latest research on large language models has been accepted.",
  "tags": ["Deep Learning", "NeurIPS"],
  "related_members": ["Taro Yamada"],
  "lang": "en",
  "image": "thumbnail.jpg"
}
```

### ニュースを追加する手順

1. **スクリプトを実行:**
   ```bash
   node scripts/addNewsDirectory.mjs
   ```

2. **情報を入力:** 対話形式で必要な情報を入力

3. **画像を追加（オプション）:** 作成されたディレクトリに画像ファイルを配置し、`metadata.json` の `image` フィールドにファイル名を記述

4. **データローダーを更新:** `/features/news/data/loader.ts` の `newsDataMap` に新しいエントリを追加

   ```typescript
   'news-007': {
     title: "New News Title",
     date: "2024.04.01",
     category: "Event",
     // ... その他のフィールド
   },
   ```

---

## 📚 研究業績の管理 / Publications Management

### 研究業績のメタデータ構造

**必須フィールド / Required Fields:**
- `title` (string) - 論文タイトル
- `authors` (string) - 著者名
- `venue` (string) - 会議名・論文誌名
- `year` (number) - 発表年
- `type` (string) - タイプ（journal | conference | workshop | thesis）

**オプションフィールド / Optional Fields:**
- `doi` (string) - DOI
- `arxiv` (string) - arXiv ID
- `project` (string) - プロジェクト名
- `code_url` (string) - コードのURL
- `data_url` (string) - データのURL
- `award` (string) - 受賞名
- `bibtex` (string) - BibTeXファイル名
- `pdf` (string) - PDFファイル名
- `slides` (string) - スライドファイル名
- `poster` (string) - ポスターファイル名
- `video` (string) - 動画URL
- `tags` (string[]) - 技術タグ
- `abstract` (string) - 概要
- `draft` (boolean) - 下書きフラグ

### メタデータ例 / Metadata Example

```json
{
  "title": "Development of Automated People Counting System using Line Detection",
  "authors": "Taro Yamada, Hanako Suzuki, Prof. Matsuoka",
  "venue": "IEEE International Conference on Robotics and Automation (ICRA)",
  "year": 2024,
  "type": "conference",
  "doi": "10.1109/ICRA.2024.1234567",
  "tags": ["Robot Vision", "Image Processing"],
  "abstract": "This paper presents an automated system...",
  "code_url": "https://github.com/example/people-counting",
  "pdf": "paper.pdf",
  "slides": "slides.pdf",
  "award": "Best Paper Award"
}
```

### 研究業績を追加する手順

1. **スクリプトを実行:**
   ```bash
   node scripts/addPublicationDirectory.mjs
   ```

2. **情報を入力:** 対話形式で必要な情報を入力

3. **ファイルを追加（オプション）:** 作成されたディレクトリにPDF、スライド、ポスターなどを配置し、`metadata.json` の対応するフィールドにファイル名を記述

4. **データローダーの手動更新は不要:** `features/achievements/data/publications/` 配下に `metadata.json` を追加すると、`loader.ts` が自動で読み込みます。

---

## ✏️ データの編集・削除 / Edit or Delete Data

### 編集 / Edit

1. 対象のディレクトリに移動
2. `metadata.json` を編集
3. ウェブサイトをリロード

### 削除 / Delete

対象のディレクトリ全体を削除し、loader.ts からエントリを削除します。

---

## 🎨 カスタマイズ / Customization

### ニュースカテゴリーの色を変更

`/features/news/types.ts` の `categoryColors` を編集：

```typescript
export const categoryColors: Record<NewsCategory, string> = {
  Publication: 'bg-[#F4991A] text-white',
  Event: 'bg-[#344F1F] text-white',
  Award: 'bg-[#F2EAD3] text-[#344F1F]',
  // ... 他のカテゴリー
};
```

### 技術タグの追加

`/features/achievements/types.ts` の `TECH_TAGS` に追加：

```typescript
export const TECH_TAGS = [
  'Robot Vision',
  'Spatial AI',
  'New Tag', // ← 追加
  // ...
] as const;
```

---

## 💡 ベストプラクティス / Best Practices

1. **IDは意味のある名前に**
   - ❌ `item1`, `item2`
   - ✅ `news-2024-neurips`, `pub-2024-icra-people-counting`

2. **日付フォーマット統一**
   - `YYYY.MM.DD` 形式を使用（例: `2024.04.01`）

3. **ファイル名は小文字とハイフンを使用**
   - ❌ `MyPaper.pdf`, `Slide_Final.pptx`
   - ✅ `paper.pdf`, `slides.pdf`

4. **メタデータは最小限に**
   - 必須フィールドのみ記述し、オプションは必要に応じて追加

5. **画像は適切なサイズに**
   - サムネイル: 600x400px 程度
   - 詳細画像: 1200x800px 程度
   - フォーマット: JPG（写真）、PNG（図表）

6. **BibTeXファイルを活用**
   - 論文の引用情報を `bibtex.bib` に保存すると便利

---

## 🚧 今後の拡張 / Future Enhancements

### 計画中の機能 / Planned Features

- ✅ ディレクトリベースのデータ管理
- ⬜ ファイルシステムからの自動読み込み
- ⬜ Markdownベースのコンテンツ
- ⬜ 画像の自動最適化
- ⬜ 全文検索機能
- ⬜ CMSとの統合

---

## ❓ トラブルシューティング / Troubleshooting

### Q: 新しいニュース/論文が表示されない

A: ニュースは `loader.ts` の `newsDataMap` にエントリを追加したか確認してください。研究業績は `features/achievements/data/publications/` 配下の `metadata.json` の配置とJSON形式を確認してください。

### Q: 画像が表示されない

A: 
1. 画像ファイルがディレクトリに存在するか確認
2. `metadata.json` の `image` フィールドにファイル名が正しく記述されているか確認
3. ファイル名の大文字・小文字が一致しているか確認

### Q: メタデータの形式が間違っている

A: JSONの構文エラーがないか確認してください。以下のツールで検証できます：
- [JSONLint](https://jsonlint.com/)
- VSCodeのJSON検証機能

---

## 📞 サポート / Support

データの追加・編集で問題が発生した場合：

1. TypeScriptのエラーメッセージを確認
2. `metadata.json` のJSON構文を確認
3. このドキュメントの例を参照
4. GitHubのIssuesで報告

---

## 📝 変更履歴 / Changelog

### v2.0 (2024.04.08)
- ✨ ディレクトリベースのデータ管理システムを導入
- ✨ 新しい型定義（`types.ts`）を作成
- ✨ データローダー（`loader.ts`）を実装
- ✨ CLIスクリプト（`addNewsDirectory.mjs`, `addPublicationDirectory.mjs`）を作成
- 📚 ドキュメントを全面刷新

### v1.0 (2024.03.15)
- 🎉 初版リリース
- 単一ファイルベースのデータ管理
