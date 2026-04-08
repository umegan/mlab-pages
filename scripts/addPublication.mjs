import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const PUBS_FILE_PATH = path.join(process.cwd(), 'features', 'achievements', 'data', 'publicationsData.ts');

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log('📚 研究業績追加ツール (Publications Addition Tool) 📚');
  console.log('--------------------------------------------------');

  const title = await question('論文タイトルを入力してください (Title): ');
  const authors = await question('著者を入力してください (Authors): ');
  const conference = await question('会議/ジャーナル名を入力してください (Conference/Journal): ');
  const year = await question('発表年を入力してください (Year) [YYYY]: ');
  const tagsStr = await question('タグをカンマ区切りで入力してください (Tags) [Robot Vision, ROS, etc.]: ');
  const link = await question('リンクURLを入力してください (Link URL) [None]: ');
  const doi = await question('DOIを入力してください (DOI) [None]: ');

  // タグの配列化
  const tags = tagsStr ? tagsStr.split(',').map(tag => tag.trim()) : [];
  const tagsFormatted = tags.map(tag => `'${tag}'`).join(', ');

  // 既存のファイル内容を読み込む
  let content = '';
  try {
    content = fs.readFileSync(PUBS_FILE_PATH, 'utf-8');
  } catch (error) {
    console.error('❌ publicationsData.ts が見つかりませんでした。', error);
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
    `    title: "${title.replace(/"/g, '\\"')}",`,
    `    authors: "${authors.replace(/"/g, '\\"')}",`,
    `    conference: "${conference.replace(/"/g, '\\"')}",`,
    `    year: ${year || new Date().getFullYear()},`,
    `    tags: [${tagsFormatted}],`
  ];

  if (link.trim()) {
    newEntryLines.push(`    link: "${link}",`);
  }
  if (doi.trim()) {
    newEntryLines.push(`    doi: "${doi}",`);
  }

  newEntryLines.push(`  },`);
  const newEntryString = newEntryLines.join('\n');

  // 配列の先頭に挿入
  const arrayStartRegex = /export const publications: Publication\[\] = \[\s*/;
  
  if (arrayStartRegex.test(content)) {
    const updatedContent = content.replace(
      arrayStartRegex,
      `export const publications: Publication[] = [\n${newEntryString}\n`
    );

    fs.writeFileSync(PUBS_FILE_PATH, updatedContent, 'utf-8');
    console.log('\n✅ 業績を追加しました！ (Publication added successfully!)');
    console.log(newEntryString);
  } else {
    console.error('\n❌ publications の配列が見つかりませんでした。');
  }

  rl.close();
}

main();