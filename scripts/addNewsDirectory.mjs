#!/usr/bin/env node

/**
 * ニュースアイテム追加スクリプト（ディレクトリベース）
 * Add News Item Script (Directory-based)
 * 
 * 使い方 / Usage:
 *   node scripts/addNews.mjs
 */

import { createInterface } from 'readline';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const CATEGORIES = ['Publication', 'Event', 'Award', 'Press', 'Recruit', 'Other'];
const LANGUAGES = ['ja', 'en'];

async function main() {
  console.log('\n🎉 ニュースアイテム追加ツール / Add News Item Tool\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // IDの入力
    const id = await question('ID (例: news-007): ');
    if (!id || !id.trim()) {
      throw new Error('IDは必須です / ID is required');
    }

    // タイトルの入力
    const title = await question('タイトル / Title: ');
    if (!title || !title.trim()) {
      throw new Error('タイトルは必須です / Title is required');
    }

    // 日付の入力
    const date = await question('日付 / Date (YYYY.MM.DD, 例: 2024.04.01): ');
    if (!date || !date.trim()) {
      throw new Error('日付は必須です / Date is required');
    }

    // カテゴリーの選択
    console.log('\nカテゴリー / Category:');
    CATEGORIES.forEach((cat, index) => {
      console.log(`  ${index + 1}. ${cat}`);
    });
    const categoryIndex = await question('番号を選択 / Select number (1-6): ');
    const category = CATEGORIES[parseInt(categoryIndex) - 1];
    if (!category) {
      throw new Error('無効なカテゴリー / Invalid category');
    }

    // 概要の入力（オプション）
    const summary = await question('概要 / Summary (オプション / optional): ');

    // リンクの入力（オプション）
    const link = await question('リンク / Link (オプション / optional): ');

    // タグの入力（オプション）
    const tagsInput = await question('タグ / Tags (カンマ区切り / comma-separated, オプション / optional): ');
    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : undefined;

    // 関連メンバー（オプション）
    const membersInput = await question('関連メンバー / Related Members (カンマ区切り, オプション): ');
    const related_members = membersInput ? membersInput.split(',').map(m => m.trim()).filter(Boolean) : undefined;

    // 言語の選択（オプション）
    console.log('\n言語 / Language (オプション / optional):');
    console.log('  1. ja (日本語)');
    console.log('  2. en (English)');
    console.log('  3. スキップ / Skip');
    const langChoice = await question('選択 / Select (1-3): ');
    const lang = langChoice === '1' ? 'ja' : langChoice === '2' ? 'en' : undefined;

    // 下書きフラグ（オプション）
    const draftInput = await question('下書きとして保存? / Save as draft? (y/N): ');
    const draft = draftInput.toLowerCase() === 'y' || draftInput.toLowerCase() === 'yes' ? true : undefined;

    // メタデータオブジェクトの作成
    const metadata = {
      title,
      date,
      category,
      ...(summary && { summary }),
      ...(link && { link }),
      ...(tags && tags.length > 0 && { tags }),
      ...(related_members && related_members.length > 0 && { related_members }),
      ...(lang && { lang }),
      ...(draft && { draft }),
    };

    // ディレクトリパスの設定
    const itemDir = join(__dirname, '..', 'features', 'news', 'data', 'items', id.trim());
    
    // ディレクトリの作成
    await fs.mkdir(itemDir, { recursive: true });

    // metadata.json の保存
    const metadataPath = join(itemDir, 'metadata.json');
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');

    // README.md の作成
    const readmePath = join(itemDir, 'README.md');
    const readme = `# ${title}

## メタデータ / Metadata

このディレクトリには以下のファイルを配置できます：
You can place the following files in this directory:

- \`metadata.json\` - 必須のメタデータ / Required metadata
- \`image.jpg\` / \`image.png\` - ニュース画像 / News image (optional)
- \`thumbnail.jpg\` - サムネイル画像 / Thumbnail image (optional)

## 使い方 / Usage

\`metadata.json\` を編集して、ニュースの内容を更新できます。
画像ファイルを追加する場合は、このディレクトリに配置してください。

You can edit \`metadata.json\` to update the news content.
If you want to add images, place them in this directory.
`;
    await fs.writeFile(readmePath, readme, 'utf8');

    // loaderファイルの更新通知
    console.log('\n✅ ニュースアイテムが正常に作成されました！ / News item created successfully!\n');
    console.log(`📁 ディレクトリ / Directory: ${itemDir}`);
    console.log(`📄 メタデータ / Metadata: ${metadataPath}\n`);
    console.log('⚠️  次のステップ / Next Step:');
    console.log('   /features/news/data/loader.ts を開いて、');
    console.log('   newsDataMap に新しいエントリを追加してください。\n');
    console.log('   Open /features/news/data/loader.ts and');
    console.log('   add a new entry to newsDataMap.\n');

  } catch (error) {
    console.error('\n❌ エラー / Error:', error.message);
  } finally {
    rl.close();
  }
}

main();