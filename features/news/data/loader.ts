/**
 * ニュースデータローダー
 * News Data Loader
 * 
 * 【重要】データの追加方法
 * /features/news/data/items/[ID]/metadata.json を作成したら、
 * このファイルの newsDataMap に同じ内容を追加してください。
 * 
 * 【追加手順】
 * 1. CLIスクリプトで metadata.json を作成
 * 2. このファイルの newsDataMap に以下の形式で追加：
 *    'news-XXX': { ...metadata.json の内容 }
 */

import { NewsItem, NewsMetadata } from '../types';

/**
 * ニュースデータマップ
 * 新しいニュースを追加する場合は、ここに追加してください
 */
const newsDataMap: Record<string, NewsMetadata> = {
  // 'news-001': {
  //   title: 'New paper on Large Language Models accepted at NeurIPS 2024.',
  //   date: '2024.03.15',
  //   category: 'Publication',
  //   link: 'https://neurips.cc/',
  //   summary: 'Our latest research on large language models has been accepted for presentation at NeurIPS 2024.',
  //   tags: ['Deep Learning', 'NeurIPS'],
  //   lang: 'en',
  // },
  // 'news-002': {
  //   title: 'Spring Seminar Series: Dr. Tanaka from U-Tokyo discusses Ethics in AI.',
  //   date: '2024.03.10',
  //   category: 'Event',
  //   link: 'https://example.com/event',
  //   summary: 'Join us for an engaging seminar on ethics in artificial intelligence.',
  //   tags: ['Seminar', 'AI Ethics'],
  //   lang: 'en',
  // },
  // 'news-003': {
  //   title: 'Lab member Yuki Sato receives the Outstanding Researcher Award.',
  //   date: '2024.02.28',
  //   category: 'Award',
  //   summary: 'Congratulations to Yuki Sato for receiving this prestigious award.',
  //   tags: ['Award'],
  //   related_members: ['Yuki Sato'],
  //   lang: 'en',
  // },
  // 'news-004': {
  //   title: 'Featured in Tech Weekly: "The Organic Approach to Machine Learning".',
  //   date: '2024.02.15',
  //   category: 'Press',
  //   link: 'https://example.com/press',
  //   summary: "Our lab's research approach was featured in Tech Weekly magazine.",
  //   tags: ['Press', 'Media'],
  //   lang: 'en',
  // },
  // 'news-005': {
  //   title: 'We are looking for Ph.D. students for the 2025 academic year.',
  //   date: '2024.01.20',
  //   category: 'Recruit',
  //   summary: 'Applications are now open for Ph.D. positions starting in 2025.',
  //   tags: ['Recruitment', 'PhD'],
  //   lang: 'en',
  // },
  // 'news-006': {
  //   title: 'Research on Reinforcement Learning published in Nature Machine Intelligence.',
  //   date: '2023.12.10',
  //   category: 'Publication',
  //   link: 'https://www.nature.com/natmachinteel/',
  //   summary: 'Our reinforcement learning research has been published in a top-tier journal.',
  //   tags: ['Reinforcement Learning', 'Journal'],
  //   lang: 'en',
  // },
  'news-007': {
    title: '川崎重工 × JSK × 松岡研究室 合同交流会を開催',
    date: '2026.03.23',
    category: 'Event',
    image: '/images/news-007/kawasaki-exchange-1.jpg',
    images: ['/images/news-007/kawasaki-exchange-2.jpg'],
    summary: `2026年3月23日、東京工科大学 松岡研究室にて、川崎重工業株式会社・東京大学 情報システム工学研究室（JSK）・松岡研究室の三者による合同交流会を開催しました。

本交流会では、Physical AI の最前線に関する技術討論をはじめ、東京工科大学における AI・ロボット教育の取り組み紹介、そして松岡研究室の学生による研究発表が行われました。

学生2名がそれぞれの研究テーマ――ロボットビジョンを用いた物体認識システムと、Spatial AI による三次元環境マッピング――について発表し、川崎重工・JSKの研究者・エンジニアから具体的なフィードバックをいただきました。

産学連携の視点から実課題を議論する貴重な機会となり、今後の共同研究の可能性についても意見交換が行われました。`,
    tags: ['産学連携', 'Physical AI', 'ロボットビジョン', 'Spatial AI'],
    related_members: ['松岡研究室 学生'],
    lang: 'ja',
  },
  'news-008': {
    title: 'NVIDIA 学生アンバサダー合同ワークショップに2名が参加',
    date: '2026.02.28',
    category: 'Event',
    image: '/images/news-008/nvidia-workshop.jpg',
    summary: `2026年2月28日、大阪を代表する繁華街に位置する大阪工業大学梅田キャンパスにて、「～GPUを用いた技術の深層と応用の最前線～ AI・デジタルツイン・ロボティクス 学生アンバサダー合同ワークショップ」が開催され、現地の会場とオンラインをあわせて約80名が参加しました。

松岡研究室からは NVIDIA 学生アンバサダーである2名が参加し、GPU を活用したロボットビジョン・Spatial AI 研究の最新成果を発表しました。

本ワークショップでは、全国の NVIDIA 学生アンバサダーが一堂に会し、AI・デジタルツイン・ロボティクス分野における最先端の技術とその応用事例を共有。参加者同士が活発に意見交換を行い、次世代の AI・ロボット研究を担う学生ネットワークのさらなる強化につながりました。`,
    tags: ['NVIDIA', 'GPU', 'AI', 'ロボティクス', 'デジタルツイン'],
    related_members: ['NVIDIA 学生アンバサダー 2名'],
    lang: 'ja',
  },
  'news-009': {
    title: 'CEATEC 2025 に松岡研究室が出展',
    date: '2025.10.15',
    category: 'Event',
    image: '/images/news-009/ceatec-booth.jpg',
    images: ['/images/news-009/ceatec-group.jpg'],
    pdf: '/images/news-009/CEATEC2025-overview.pdf',
    summary: `2025年10月14日〜18日、幕張メッセにて開催された「CEATEC 2025」に、松岡研究室が出展しました。

本展示会は、アジア最大級の IT・エレクトロニクス総合展示会であり、国内外から多数の来場者が訪れます。松岡研究室のブースでは、ロボットビジョンと Spatial AI を組み合わせたリアルタイム三次元環境認識システムのデモを実施し、多くの企業・研究者・学生の方々に研究成果を体感していただきました。

展示を通じて、産業応用や共同研究に向けた具体的な問い合わせも多数いただき、研究の社会実装に向けた新たなつながりが生まれました。`,
    tags: ['CEATEC', '展示会', 'ロボットビジョン', 'Spatial AI'],
    lang: 'ja',
  },
};

/**
 * 全ニュースアイテムを取得
 * Get all news items
 */
export function getAllNews(): NewsItem[] {
  const newsItems: NewsItem[] = [];
  
  for (const [id, metadata] of Object.entries(newsDataMap)) {
    // 下書きは除外 / Exclude drafts
    if (metadata.draft) continue;
    
    newsItems.push({
      id,
      ...metadata,
    });
  }
  
  // 日付の新しい順にソート / Sort by date (newest first)
  return newsItems.sort((a, b) => {
    const dateA = new Date(a.date.replace(/\./g, '-'));
    const dateB = new Date(b.date.replace(/\./g, '-'));
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * IDでニュースアイテムを取得
 * Get news item by ID
 */
export function getNewsById(id: string): NewsItem | null {
  const metadata = newsDataMap[id];
  if (!metadata) return null;
  
  return {
    id,
    ...metadata,
  };
}

/**
 * カテゴリーでフィルタリング
 * Filter by category
 */
export function getNewsByCategory(category: NewsItem['category']): NewsItem[] {
  return getAllNews().filter(item => item.category === category);
}

/**
 * タグでフィルタリング
 * Filter by tags
 */
export function getNewsByTag(tag: string): NewsItem[] {
  return getAllNews().filter(item => item.tags?.includes(tag));
}

/**
 * 年でフィルタリング
 * Filter by year
 */
export function getNewsByYear(year: number): NewsItem[] {
  return getAllNews().filter(item => {
    const itemYear = parseInt(item.date.split('.')[0]);
    return itemYear === year;
  });
}
