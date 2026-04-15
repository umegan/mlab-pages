# Research Feature

研究ページ（`/research`）とプロジェクト詳細ページ（`/research/:projectId`）の実装をまとめたディレクトリです。

## ディレクトリ構成

- `ResearchPage.tsx`
  - 研究プロジェクト一覧ページ
  - カード全体クリックで詳細ページへ遷移
- `ResearchProjectDetailPage.tsx`
  - プロジェクト詳細ページ
  - プロジェクト情報と関連業績を表示
- `types.ts`
  - `ResearchProject` などの型定義
- `projects/`
  - プロジェクト定義データ
  - 詳細は `projects/published/README.md` と `projects/archive/README.md` を参照
- `images/`
  - 研究ページ用画像

## プロジェクトデータの読み込み仕様

- 読み込み対象は `projects/published/*/index.ts` のみ
- `projects/index.ts` で `import.meta.glob(..., { eager: true })` により自動読込
- 各プロジェクトファイルは `ResearchProject` の `default export` が必要

## 一時非公開（アーカイブ）運用

- 一時非公開にしたい場合は、対象ディレクトリを `projects/published/` から `projects/archive/` へ移動
- `archive` 配下は自動読込対象外のため、公開ページには表示されません

## 新規プロジェクト追加手順

1. `projects/published/<project-id>/index.ts` を作成
2. `ResearchProject` 型に沿ってデータを定義して `default export`
3. 必要に応じて `images/` に画像を追加し、`import` して `image` に設定
4. 表示順を指定したい場合は `sortOrder` を設定（小さい順で表示）

