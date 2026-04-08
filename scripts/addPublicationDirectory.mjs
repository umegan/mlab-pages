#!/usr/bin/env node

/**
 * 研究業績追加スクリプト（ディレクトリベース）
 * Add Publication Script (Directory-based)
 * 
 * 使い方 / Usage:
 *   node scripts/addPublicationDirectory.mjs
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

const PUBLICATION_TYPES = ['journal', 'conference', 'workshop', 'thesis'];

async function main() {
  console.log('\n📚 研究業績追加ツール / Add Publication Tool\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // IDの入力
    const id = await question('ID (例: pub-009): ');
    if (!id || !id.trim()) {
      throw new Error('IDは必須です / ID is required');
    }

    // タイトルの入力
    const title = await question('論文タイトル / Paper Title: ');
    if (!title || !title.trim()) {
      throw new Error('タイトルは必須です / Title is required');
    }

    // 著者の入力
    const authors = await question('著者 / Authors (カンマ区切り): ');
    if (!authors || !authors.trim()) {
      throw new Error('著者は必須です / Authors are required');
    }

    // 会議名/論文誌名の入力
    const venue = await question('会議名・論文誌名 / Venue: ');
    if (!venue || !venue.trim()) {
      throw new Error('会議名・論文誌名は必須です / Venue is required');
    }

    // 年の入力
    const yearInput = await question('発表年 / Year (例: 2024): ');
    const year = parseInt(yearInput);
    if (isNaN(year) || year < 1900 || year > 2100) {
      throw new Error('無効な年 / Invalid year');
    }

    // タイプの選択
    console.log('\n発表タイプ / Publication Type:');
    PUBLICATION_TYPES.forEach((type, index) => {
      console.log(`  ${index + 1}. ${type}`);
    });
    const typeIndex = await question('番号を選択 / Select number (1-4): ');
    const type = PUBLICATION_TYPES[parseInt(typeIndex) - 1];
    if (!type) {
      throw new Error('無効なタイプ / Invalid type');
    }

    // DOI（オプション）
    const doi = await question('DOI (オプション / optional): ');

    // arXiv（オプション）
    const arxiv = await question('arXiv ID (オプション / optional): ');

    // Abstract（オプション）
    const abstract = await question('概要 / Abstract (オプション / optional): ');

    // タグの入力（オプション）
    const tagsInput = await question('技術タグ / Tech Tags (カンマ区切り, オプション): ');
    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : undefined;

    // プロジェクト（オプション）
    const project = await question('プロジェクト / Project (オプション): ');

    // Code URL（オプション）
    const code_url = await question('コードURL / Code URL (オプション): ');

    // Data URL（オプション）
    const data_url = await question('データURL / Data URL (オプション): ');

    // Video URL（オプション）
    const video = await question('動画URL / Video URL (オプション): ');

    // Award（オプション）
    const award = await question('受賞 / Award (オプション): ');

    // 下書きフラグ（オプション）
    const draftInput = await question('下書きとして保存? / Save as draft? (y/N): ');
    const draft = draftInput.toLowerCase() === 'y' || draftInput.toLowerCase() === 'yes' ? true : undefined;

    // メタデータオブジェクトの作成
    const metadata = {
      title,
      authors,
      venue,
      year,
      type,
      ...(doi && { doi }),
      ...(arxiv && { arxiv }),
      ...(abstract && { abstract }),
      ...(tags && tags.length > 0 && { tags }),
      ...(project && { project }),
      ...(code_url && { code_url }),
      ...(data_url && { data_url }),
      ...(video && { video }),
      ...(award && { award }),
      ...(draft && { draft }),
    };

    // ディレクトリパスの設定
    const pubDir = join(__dirname, '..', 'features', 'achievements', 'data', 'publications', id.trim());
    
    // ディレクトリの作成
    await fs.mkdir(pubDir, { recursive: true });

    // metadata.json の保存
    const metadataPath = join(pubDir, 'metadata.json');
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');

    // README.md の作成
    const readmePath = join(pubDir, 'README.md');
    const readme = `# ${title}

## メタデータ / Metadata

このディレクトリには以下のファイルを配置できます：
You can place the following files in this directory:

- \`metadata.json\` - 必須のメタデータ / Required metadata (✅ Created)
- \`paper.pdf\` - 論文PDF / Paper PDF (optional)
- \`slides.pdf\` / \`slides.pptx\` - スライド / Slides (optional)
- \`poster.pdf\` / \`poster.jpg\` - ポスター / Poster (optional)
- \`bibtex.bib\` - BibTeX ファイル / BibTeX file (optional)
- \`thumbnail.jpg\` - サムネイル画像 / Thumbnail image (optional)

## ファイル構成例 / Example File Structure

\`\`\`
${id}/
├── metadata.json
├── paper.pdf
├── slides.pdf
├── poster.jpg
├── bibtex.bib
└── README.md
\`\`\`

## 使い方 / Usage

\`metadata.json\` を編集して、論文の情報を更新できます。
PDF、スライド、ポスターなどのファイルを追加する場合は、このディレクトリに配置してください。

You can edit \`metadata.json\` to update the publication information.
If you want to add PDF, slides, poster, etc., place them in this directory.
`;
    await fs.writeFile(readmePath, readme, 'utf8');

    // loaderファイルの更新通知
    console.log('\n✅ 研究業績が正常に作成されました！ / Publication created successfully!\n');
    console.log(`📁 ディレクトリ / Directory: ${pubDir}`);
    console.log(`📄 メタデータ / Metadata: ${metadataPath}\n`);
    console.log('⚠️  次のステップ / Next Step:');
    console.log('   /features/achievements/data/loader.ts を開いて、');
    console.log('   publicationsDataMap に新しいエントリを追加してください。\n');
    console.log('   Open /features/achievements/data/loader.ts and');
    console.log('   add a new entry to publicationsDataMap.\n');

  } catch (error) {
    console.error('\n❌ エラー / Error:', error.message);
  } finally {
    rl.close();
  }
}

main();