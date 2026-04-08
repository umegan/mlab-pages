import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const NEWS_FILE_PATH = path.join(process.cwd(), 'features', 'news', 'data', 'newsData.ts');

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log('📰 ニュース追加ツール (News Addition Tool) 📰');
  console.log('--------------------------------------------------');

  const date = await question('日付を入力してください (Date) [YYYY.MM.DD]: ');
  const category = await question('カテゴリを入力してください (Category) [Publication/Event/Award/Press/Recruit/Other]: ');
  const title = await question('タイトルを入力してください (Title): ');
  const link = await question('リンクURLを入力してください (Link URL) [None]: ');

  // 既存のファイル内容を読み込む
  let content = '';
  try {
    content = fs.readFileSync(NEWS_FILE_PATH, 'utf-8');
  } catch (error) {
    console.error('❌ newsData.ts が見つかりませんでした。', error);
    rl.close();
    return;
  }

  // 最新のIDを取得
  const idMatch = content.match(/id:\s*(\d+)/g);
  let nextId = 1;
  if (idMatch && idMatch.length > 0) {
    const ids = idMatch.map(match => parseInt(match.replace(/id:\s*/, '')));
    nextId = Math.max(...ids) + 1;
  }

  // 新しいエントリの文字列を生成
  const newEntryLines = [
    `  {`,
    `    id: ${nextId},`,
    `    date: '${date}',`,
    `    category: '${category || 'Other'}',`,
    `    title: '${title.replace(/'/g, "\\'")}',`
  ];

  if (link.trim()) {
    newEntryLines.push(`    link: '${link}',`);
  }

  newEntryLines.push(`  },`);
  const newEntryString = newEntryLines.join('\n');

  // 配列の先頭に挿入
  const arrayStartRegex = /export const newsItems: NewsItem\[\] = \[\s*/;
  
  if (arrayStartRegex.test(content)) {
    const updatedContent = content.replace(
      arrayStartRegex,
      `export const newsItems: NewsItem[] = [\n${newEntryString}\n`
    );

    fs.writeFileSync(NEWS_FILE_PATH, updatedContent, 'utf-8');
    console.log('\n✅ ニュースを追加しました！ (News added successfully!)');
    console.log(newEntryString);
  } else {
    console.error('\n❌ newsItems の配列が見つかりませんでした。');
  }

  rl.close();
}

main();