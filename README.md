# ロボットビジョン・Spatial AI（松岡）研究室 ウェブサイト

研究室の公式ウェブサイトのソースコードです。React + TypeScript + Tailwind CSS v4で構築されています。

---

## 🎯 プロジェクト概要

このウェブサイトは、研究室の情報発信・広報活動を目的として開発されました。

### 主な機能

- ✅ **ホームページ**: 研究室の紹介とハイライト
- ✅ **ニュース**: 最新情報の発信（フィルタリング・検索機能付き）
- ✅ **研究内容**: 研究プロジェクトの紹介
- ✅ **業績**: 論文・発表の一覧（フィルタリング機能付き）
- ✅ **メンバー**: 教員・学生の紹介
- ✅ **概要**: 研究室の詳細情報
- ✅ **お問い合わせ**: 目的別の問い合わせ先とフォーム

---

## 🚀 クイックスタート

### 1. 環境構築

```bash
# リポジトリのクローン
git clone <repository-url>
cd matsuoka-lab-website

# 依存関係のインストール
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173/` を開きます。

### 3. ニュースや業績の追加

#### ニュースの追加

```bash
node scripts/addNewsDirectory.mjs
```

対話形式で情報を入力し、`/features/news/data/loader.ts` を更新してください。

#### 研究業績の追加

```bash
node scripts/addPublicationDirectory.mjs
```

対話形式で情報を入力すると、`features/achievements/data/publications/` にディレクトリと `metadata.json` が作成され、ページには自動反映されます。

詳細は [QUICK_START.md](./QUICK_START.md) を参照してください。

---

## 📚 ドキュメント一覧

プロジェクトには以下のドキュメントが用意されています：

| ドキュメント | 内容 | 対象者 |
|------------|------|--------|
| **[QUICK_START.md](./QUICK_START.md)** | データ管理の基本操作（5分で理解） | 全員 |
| **[DEVELOPMENT.md](./DEVELOPMENT.md)** | 開発環境のセットアップ手順 | 開発者 |
| **[DATA_MANAGEMENT_GUIDE_V2.md](./DATA_MANAGEMENT_GUIDE_V2.md)** | データ管理の詳細ガイド | データ更新担当者 |
| **[DIRECTORY_BASED_DATA_SYSTEM.md](./DIRECTORY_BASED_DATA_SYSTEM.md)** | システムアーキテクチャの説明 | 技術担当者 |

### どのドキュメントから読むべきか？

- **初めて触る人** → `QUICK_START.md`
- **開発環境を構築したい** → `DEVELOPMENT.md`
- **ニュース・業績を追加したい** → `QUICK_START.md` → `DATA_MANAGEMENT_GUIDE_V2.md`
- **システムの仕組みを理解したい** → `DIRECTORY_BASED_DATA_SYSTEM.md`

---

## 🛠️ 技術スタック

- **フレームワーク**: React 18
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **アニメーション**: Motion (旧Framer Motion)
- **ビルドツール**: Vite
- **UIコンポーネント**: shadcn/ui
- **アイコン**: Lucide React

---

## 📁 プロジェクト構造

```
matsuoka-lab-website/
├── src/
│   ├── App.tsx                    # メインアプリケーション
│   ├── features/                  # 機能別ディレクトリ
│   │   ├── home/                  # ホームページ
│   │   │   └── components/        # ホームページのコンポーネント
│   │   ├── news/                  # ニュース
│   │   │   ├── data/              # ニュースデータ
│   │   │   │   ├── items/         # 各ニュース（1件=1ディレクトリ）
│   │   │   │   └── loader.ts      # データローダー
│   │   │   ├── types.ts           # 型定義
│   │   │   └── NewsPage.tsx       # ニュースページ
│   │   ├── achievements/          # 研究業績
│   │   │   ├── data/              # 業績データ
│   │   │   │   ├── publications/  # 各論文（1件=1ディレクトリ）
│   │   │   │   └── loader.ts      # データローダー
│   │   │   └── AchievementsPage.tsx
│   │   ├── members/               # メンバー
│   │   │   ├── data/              # メンバーデータ
│   │   │   └── MembersPage.tsx
│   │   ├── research/              # 研究内容
│   │   ├── about/                 # 概要
│   │   └── contact/               # お問い合わせ
│   ├── components/                # 共通コンポーネント
│   │   ├── layout/                # ナビゲーション、フッター
│   │   └── ui/                    # UIコンポーネント
│   └── styles/                    # グローバルスタイル
├── scripts/                       # CLIスクリプト
│   ├── addNewsDirectory.mjs       # ニュース追加スクリプト
│   └── addPublicationDirectory.mjs # 論文追加スクリプト
└── public/                        # 静的ファイル
```

---

## 🎨 デザインコンセプト

### カラーパレット

- **クリーム色** `#F9F5F0` - ベース背景
- **ベージュ** `#F2EAD3` - サブ背景
- **深緑** `#344F1F` - メインカラー
- **オレンジ** `#F4991A` - アクセントカラー

### デザイン方針

- 学術機関としての信頼性と堅実さ
- モダンでダイナミックなUI
- 情報の見やすさと可読性を最優先
- アクセシビリティへの配慮

---

## 💡 主な改善点（2024年12月版）

### アニメーション最適化
- 過剰なアニメーション（回転、パーティクル、スキャンライン）を削減
- 控えめで洗練されたアニメーションに統一
- モバイルでのパフォーマンス向上

### データ管理の改善
- ホームページのニュースセクションをデータローダーと統合
- 最新ニュースが自動的に表示される仕組み
- 「1件 = 1ディレクトリ」アーキテクチャの徹底

### 必須ページの追加
- **メンバーページ**: 教員・学生のプロフィール表示
- **改善されたContactページ**: 目的別問い合わせ先、FAQ、詳細な研究室情報
- **拡充されたAboutページ**: 研究室の基本情報、研究分野、実績

### フィルタリング・検索機能
- ニュースページ: カテゴリー、年度、キーワード検索
- 業績ページ: 年度、技術分野でのフィルタリング

### UX改善
- HeroセクションのCTAボタンに機能実装
- フォーカススタイルの追加（アクセシビリティ向上）
- モバイル最適化（FutureLabのギャラリー等）
- 研究軸の動的グリッド対応

---

## 📝 日常的な更新作業

### ニュースの追加

1. CLIスクリプトを実行:
   ```bash
   node scripts/addNewsDirectory.mjs
   ```

2. 必要な情報を入力（ID、タイトル、日付、カテゴリー等）

3. `/features/news/data/loader.ts`を開き、`newsDataMap`に新しいエントリを追加

4. ローカルサーバーで確認

### メンバー情報の更新

`/features/members/data/membersData.ts` を直接編集します：

```typescript
{
  id: 'member-new',
  name: '新メンバー 太郎',
  role: 'master',
  year: 'M1',
  research: '研究テーマ',
  // ...
}
```

詳細は [QUICK_START.md](./QUICK_START.md) を参照してください。

---

## 🚢 デプロイ / Deployment

### 本番ビルド

```bash
npm run build
```

`dist/` ディレクトリに本番用のファイルが生成されます。

### 推奨デプロイ先

- **Netlify**: 自動デプロイ、無料枠あり
- **Vercel**: React/Viteに最適化
- **GitHub Pages**: Gitリポジトリから直接公開

デプロイ手順の詳細は今後 `DEPLOYMENT.md` に記載予定です。

---

## 🤝 貢献 / Contributing

### ブランチ戦略

- `main`: 本番環境
- `develop`: 開発環境
- `feature/*`: 新機能開発用

### プルリクエスト

1. `develop`ブランチから新しいブランチを作成
2. 変更をコミット
3. プルリクエストを作成
4. レビュー後にマージ

---

## 📞 お問い合わせ

技術的な質問や問題が発生した場合：

1. まず各種ドキュメントを確認
2. 先輩や担当者に相談
3. GitHubのIssuesで報告

---

## 📄 ライセンス

このプロジェクトは研究室内での使用を目的としています。

---

**Maintained by ロボットビジョン・Spatial AI（松岡）研究室**

Last Updated: 2024年12月
