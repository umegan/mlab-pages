# Published Projects

このディレクトリ配下の `*/index.ts` は、研究ページで自動的に読み込まれ公開されます。

## 公開対象にする方法

1. プロジェクト用ディレクトリを作成（例: `new-project`）
2. `index.ts` を作成し、`ResearchProject` の `default export` を定義
3. 必要なら `sortOrder` を設定

`sortOrder` が小さい順に表示され、同値の場合はタイトル順になります。

