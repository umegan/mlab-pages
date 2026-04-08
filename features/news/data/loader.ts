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
  'news-001': {
    title: 'New paper on Large Language Models accepted at NeurIPS 2024.',
    date: '2024.03.15',
    category: 'Publication',
    link: 'https://neurips.cc/',
    summary: 'Our latest research on large language models has been accepted for presentation at NeurIPS 2024.',
    tags: ['Deep Learning', 'NeurIPS'],
    lang: 'en',
  },
  'news-002': {
    title: 'Spring Seminar Series: Dr. Tanaka from U-Tokyo discusses Ethics in AI.',
    date: '2024.03.10',
    category: 'Event',
    link: 'https://example.com/event',
    summary: 'Join us for an engaging seminar on ethics in artificial intelligence.',
    tags: ['Seminar', 'AI Ethics'],
    lang: 'en',
  },
  'news-003': {
    title: 'Lab member Yuki Sato receives the Outstanding Researcher Award.',
    date: '2024.02.28',
    category: 'Award',
    summary: 'Congratulations to Yuki Sato for receiving this prestigious award.',
    tags: ['Award'],
    related_members: ['Yuki Sato'],
    lang: 'en',
  },
  'news-004': {
    title: 'Featured in Tech Weekly: "The Organic Approach to Machine Learning".',
    date: '2024.02.15',
    category: 'Press',
    link: 'https://example.com/press',
    summary: "Our lab's research approach was featured in Tech Weekly magazine.",
    tags: ['Press', 'Media'],
    lang: 'en',
  },
  'news-005': {
    title: 'We are looking for Ph.D. students for the 2025 academic year.',
    date: '2024.01.20',
    category: 'Recruit',
    summary: 'Applications are now open for Ph.D. positions starting in 2025.',
    tags: ['Recruitment', 'PhD'],
    lang: 'en',
  },
  'news-006': {
    title: 'Research on Reinforcement Learning published in Nature Machine Intelligence.',
    date: '2023.12.10',
    category: 'Publication',
    link: 'https://www.nature.com/natmachintell/',
    summary: 'Our reinforcement learning research has been published in a top-tier journal.',
    tags: ['Reinforcement Learning', 'Journal'],
    lang: 'en',
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
