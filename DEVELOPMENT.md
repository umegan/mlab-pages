# 開発環境セットアップガイド / Development Setup Guide

このドキュメントでは、研究室ホームページの開発環境をセットアップする手順を説明します。

---

## 📋 必要な環境 / Prerequisites

以下のソフトウェアがインストールされている必要があります：

- **Node.js**: v18.0.0以上（推奨: v20.x LTS）
- **npm**: v9.0.0以上（Node.jsに同梱）
- **Git**: バージョン管理用

### Node.jsのインストール確認

```bash
node --version
npm --version
```

インストールされていない場合は、[公式サイト](https://nodejs.org/)からダウンロードしてください。

---

## 🚀 初期セットアップ / Initial Setup

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd matsuoka-lab-website
```

### 2. 依存関係のインストール

プロジェクトのルートディレクトリで以下のコマンドを実行：

```bash
npm install
```

このコマンドで、`package.json`に記載されているすべての依存パッケージがインストールされます。

---

## 💻 開発サーバーの起動 / Start Development Server

### ローカルサーバーの起動

```bash
npm run dev
```

実行すると、以下のような出力が表示されます：

```
> dev
> vite

VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

ブラウザで `http://localhost:5173/` を開くと、サイトが表示されます。

### ホットリロード

開発サーバー起動中は、ファイルを編集すると自動的にブラウザがリロードされます（ホットリロード機能）。

---

## 📁 プロジェクト構造 / Project Structure

```
matsuoka-lab-website/
├── src/                      # ソースコード
│   ├── App.tsx               # メインアプリケーション
│   ├── features/             # 機能別ディレクトリ
│   │   ├── home/             # ホームページ
│   │   ├── news/             # ニュースページ
│   │   ├── achievements/     # 業績ページ
│   │   ├── members/          # メンバーページ
│   │   ├── research/         # 研究ページ
│   │   ├── about/            # 概要ページ
│   │   └── contact/          # お問い合わせページ
│   ├── components/           # 共通コンポーネント
│   │   ├── layout/           # レイアウトコンポーネント
│   │   └── ui/               # UIコンポーネント
│   └── styles/               # グローバルスタイル
├── public/                   # 静的ファイル
├── scripts/                  # CLIスクリプト
├── package.json              # プロジェクト設定
└── vite.config.ts            # Vite設定
```

---

## 🛠️ よく使うコマンド / Common Commands

### 開発サーバー起動
```bash
npm run dev
```

### ビルド（本番用）
```bash
npm run build
```

ビルドされたファイルは `dist/` ディレクトリに出力されます。

### ビルドのプレビュー
```bash
npm run preview
```

本番ビルドをローカルで確認できます。

### リント（コード品質チェック）
```bash
npm run lint
```

---

## 📝 開発時の注意点 / Development Notes

### 1. Tailwind CSS

このプロジェクトはTailwind CSS v4を使用しています。スタイルは主にTailwindのユーティリティクラスで記述します。

### 2. TypeScript

すべてのファイルは `.tsx` または `.ts` 形式です。型安全性を保つため、型定義を適切に行ってください。

### 3. Motion (旧Framer Motion)

アニメーションには `motion/react` パッケージを使用しています。

```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  コンテンツ
</motion.div>
```

---

## 🔧 トラブルシューティング / Troubleshooting

### 依存関係のエラー

```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

### ポート番号の変更

デフォルトの5173番ポートが使用中の場合：

```bash
npm run dev -- --port 3000
```

### キャッシュのクリア

```bash
# Viteのキャッシュをクリア
rm -rf node_modules/.vite
npm run dev
```

---

## 🎨 コーディング規約 / Coding Conventions

### コンポーネント命名

- コンポーネント名はPascalCase: `NewsPage.tsx`, `HeroSection.tsx`
- exportは名前付きexportを使用: `export const NewsPage = () => {}`

### ディレクトリ構造

- 各機能は `/features/[feature-name]/` 配下に配置
- データファイルは `/features/[feature-name]/data/` に配置
- 型定義は `/features/[feature-name]/types.ts` に配置

### スタイリング

- Tailwindのユーティリティクラスを優先使用
- カスタムCSSは最小限に
- カラーパレット:
  - ベース: `#F9F5F0` (クリーム)
  - サブ: `#F2EAD3` (ベージュ)
  - メイン: `#344F1F` (深緑)
  - アクセント: `#F4991A` (オレンジ)

---

## 📚 参考リソース / References

- [React公式ドキュメント](https://react.dev/)
- [TypeScript公式ドキュメント](https://www.typescriptlang.org/)
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/)
- [Motion公式ドキュメント](https://motion.dev/)
- [Vite公式ドキュメント](https://vitejs.dev/)

---

## ❓ サポート / Support

問題が発生した場合：

1. このドキュメントのトラブルシューティングセクションを確認
2. `QUICK_START.md` や `DATA_MANAGEMENT_GUIDE_V2.md` を確認
3. 先輩や担当者に相談

---

**Happy Coding! 🎉**
