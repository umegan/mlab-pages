# ニュースアイテムディレクトリ / News Items Directory

このディレクトリには、ウェブサイトに表示されるニュースアイテムが格納されています。

## 構造 / Structure

各サブディレクトリは1つのニュースアイテムを表します：

```
items/
├── news-001/
│   ├── metadata.json      ← メタデータ（必須）
│   ├── image.jpg          ← 画像（オプション）
│   └── README.md
├── news-002/
│   └── ...
└── ...
```

## データの追加 / Adding Data

### 方法1: CLIスクリプト（推奨）

```bash
node scripts/addNewsDirectory.mjs
```

### 方法2: 手動作成

1. 新しいディレクトリを作成（例: `news-007/`）
2. `metadata.json` を作成
3. 画像ファイルを配置（オプション）
4. `/features/news/data/loader.ts` を更新

## メタデータの構造 / Metadata Structure

**必須フィールド:**
- `title` - タイトル
- `date` - 日付（YYYY.MM.DD形式）
- `category` - カテゴリー（Publication, Event, Award, Press, Recruit, Other）

**オプションフィールド:**
- `summary` - 概要
- `tags` - タグのリスト
- `link` - 外部リンク
- `image` - 画像ファイル名
- その他（詳細は [DATA_MANAGEMENT_GUIDE_V2.md](../../../DATA_MANAGEMENT_GUIDE_V2.md) を参照）

## 詳細情報 / More Information

詳細な使い方は以下を参照：
- [DATA_MANAGEMENT_GUIDE_V2.md](../../../DATA_MANAGEMENT_GUIDE_V2.md)
- [DIRECTORY_BASED_DATA_SYSTEM.md](../../../DIRECTORY_BASED_DATA_SYSTEM.md)
