# News Item: news-001

## Structure

このディレクトリは1つのニュースアイテムを表します。
This directory represents a single news item.

## Files

- `metadata.json` - ニュースのメタデータ（必須）/ News metadata (required)
- `image.jpg` / `image.png` - ニュース画像（オプション）/ News image (optional)
- `thumbnail.jpg` - サムネイル画像（オプション）/ Thumbnail (optional)

## How to Add Images

画像を追加する場合は、このディレクトリに配置し、`metadata.json` の `image` フィールドにファイル名を指定してください。

例 / Example:
```json
{
  "image": "image.jpg"
}
```

## Editing

`metadata.json` を直接編集するか、`scripts/addNewsDirectory.mjs` スクリプトを使用して新しいニュースを追加できます。

Edit `metadata.json` directly or use the `scripts/addNewsDirectory.mjs` script to add new news items.
