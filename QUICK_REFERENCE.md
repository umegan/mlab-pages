# 🚀 クイックリファレンス / Quick Reference

## 📍 よく使うパス / Common Paths

### Import Paths Cheat Sheet

```tsx
// ✅ From App.tsx
import { HeroNew } from './features/home/components/HeroNew';
import { AboutPage } from './features/about/AboutPage';
import { Navbar } from './components/layout/Navbar';
import { Button } from './components/ui/button';

// ✅ From /features/home/components/HeroNew.tsx
import { Button } from '../../../components/ui/button';
import heroImg from '../images/hero.jpg';

// ✅ From /features/about/AboutPage.tsx
import { Button } from '../../components/ui/button';
import profileImg from './images/profile.jpg';
```

---

## 📂 どこに何を置くか / Where to Put What

| 種類 | 場所 | 例 |
|------|------|-----|
| **新しいページ** | `/features/[name]/[Name]Page.tsx` | `/features/blog/BlogPage.tsx` |
| **ページ専用コンポーネント** | `/features/[page]/components/` | `/features/home/components/HeroNew.tsx` |
| **共有コンポーネント** | `/components/common/` | `/components/common/LoadingSpinner.tsx` |
| **UI要素** | `/components/ui/` | `/components/ui/button.tsx` |
| **レイアウト** | `/components/layout/` | `/components/layout/Sidebar.tsx` |
| **画像** | `/features/[page]/images/` | `/features/home/images/hero.jpg` |
| **スタイル** | `/styles/` | `/styles/animations.css` |

---

## 🎨 デザイントークン / Design Tokens

```css
/* カラーパレット */
--cream: #F9F5F0;        /* 背景 */
--beige: #F2EAD3;        /* セカンダリ面 */
--dark-green: #344F1F;   /* テキスト/ボーダー */
--orange: #F4991A;       /* アクセント */
```

```tsx
// Tailwind クラス
bg-[#F9F5F0]     // クリーム背景
bg-[#F2EAD3]     // ベージュ背景
text-[#344F1F]   // ダークグリーンテキスト
text-[#F4991A]   // オレンジアクセント
border-[#344F1F] // グリーンボーダー
```

---

## 🔧 よく使うコマンド / Common Commands

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# Lintチェック
npm run lint

# 型チェック
npm run type-check
```

---

## 📋 ページ構成リスト / Page Composition List

| ページ | パス | 主なコンポーネント |
|--------|------|------------------|
| **ホーム** | `/` | HeroNew, ResearchAxes, FutureLab, NewsModern |
| **概要** | `/about` | AboutPage |
| **ニュース** | `/news` | NewsPage |
| **研究** | `/research` | ResearchPage |
| **業績** | `/achievements` | AchievementsPage |
| **お問い合わせ** | `/contact` | ContactPage |

---

## 🎭 アニメーションライブラリ / Animation Library

```tsx
import { motion } from 'motion/react';

// 基本的なフェードイン
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  コンテンツ
</motion.div>

// ホバーエフェクト
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  クリック可能
</motion.div>

// スクロールアニメーション
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  スクロールで表示
</motion.div>
```

---

## 🖼️ 画像の使い方 / Image Usage

### Unsplash URL (現在)
```tsx
<img src="https://images.unsplash.com/photo-..." alt="説明" />
```

### ローカル画像 (推奨)
```tsx
// 1. 画像を配置
// /features/home/images/hero-bg.jpg

// 2. Import
import heroBg from './images/hero-bg.jpg';

// 3. 使用
<img src={heroBg} alt="Hero Background" />
```

### ImageWithFallback
```tsx
import { ImageWithFallback } from '../../components/common/ImageWithFallback';

<ImageWithFallback 
  src={imageUrl} 
  alt="説明"
  className="w-full h-64 object-cover"
/>
```

---

## 🧩 UIコンポーネント / UI Components

```tsx
// Button
import { Button } from '../../components/ui/button';
<Button variant="outline">クリック</Button>

// Card
import { Card } from '../../components/ui/card';
<Card>内容</Card>

// Badge
import { Badge } from '../../components/ui/badge';
<Badge className="bg-[#F4991A]">新着</Badge>
```

---

## 🔍 よくあるエラーと解決方法 / Common Errors

### Import エラー
```
Error: Cannot find module './components/sections/HeroNew'
```
**解決:** 新しいパスに更新
```tsx
// ❌ 古い
import { HeroNew } from './components/sections/HeroNew';

// ✅ 新しい
import { HeroNew } from './features/home/components/HeroNew';
```

### 相対パスの間違い
```
Error: Module not found: Can't resolve '../../../ui/button'
```
**解決:** 正しい階層を確認
```tsx
// From /features/home/components/HeroNew.tsx
import { Button } from '../../../components/ui/button'; // ✅
```

---

## 📝 新機能追加の手順 / Adding New Features

### ステップ 1: フォルダ作成
```bash
mkdir -p /features/blog/components
mkdir -p /features/blog/images
```

### ステップ 2: ページコンポーネント作成
```tsx
// /features/blog/BlogPage.tsx
import React from 'react';
import { Button } from '../../components/ui/button';

export const BlogPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-[#F9F5F0]">
      <h1 className="text-4xl font-bold text-[#344F1F]">Blog</h1>
    </div>
  );
};
```

### ステップ 3: App.tsx に追加
```tsx
// Import
import { BlogPage } from './features/blog/BlogPage';

// renderPage() 内
case 'blog':
  return <BlogPage />;
```

### ステップ 4: ナビゲーションに追加
```tsx
// Navbar.tsx
const menuItems = [
  // ... existing items
  { label: 'ブログ', route: 'blog' },
];
```

---

## 🎯 ベストプラクティス / Best Practices

✅ **DO:**
- 機能ごとにフォルダを分ける
- 相対パスを使って画像をimport
- TypeScriptの型を定義する
- コンポーネントを小さく保つ
- アニメーションを適切に使う

❌ **DON'T:**
- すべてを一つのファイルに書かない
- 深すぎるネストを避ける
- 保護されたファイルを編集しない
- グローバルスタイルを乱用しない

---

## 📞 サポート / Support

### ドキュメント
- `DIRECTORY_STRUCTURE.md` - 詳細な構造説明
- `RESTRUCTURING_SUMMARY.md` - 再編成サマリー
- `VISUAL_GUIDE.md` - ビジュアルガイド
- `FILES_TO_DELETE.md` - 削除可能ファイル

### 困ったときは
1. まずエラーメッセージを確認
2. Import パスをチェック
3. 型エラーを確認
4. ドキュメントを参照

---

**Last Updated:** 2026-04-08
**Quick Reference Version:** 1.0
