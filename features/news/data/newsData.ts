export type NewsCategory = 'Publication' | 'Event' | 'Award' | 'Press' | 'Recruit' | 'Other';

export interface NewsItem {
  id: number;
  date: string;
  category: NewsCategory;
  title: string;
  link?: string;
}

/*=============================================================================
 * データ追加用テンプレート / Template for new entries
 * コピー＆ペーストして、配列の先頭に追加してください。
 * Copy and paste this template at the beginning of the `newsItems` array.
 *=============================================================================
 *
 * {
 *   id: 999, // 重複しない一意の番号 (Unique ID)
 *   date: '2024.MM.DD',
 *   category: 'Publication', // 'Publication', 'Event', 'Award', 'Press', 'Recruit', 'Other' から選択
 *   title: 'ニュースのタイトル (News title)',
 *   link: 'https://...', // リンクが不要な場合はこの行を削除 (Delete this line if no link is needed)
 * },
 *
 *=============================================================================*/

/**
 * ニュース一覧
 * 新しいニュースは配列の先頭に追加してください
 * Add new news items at the beginning of the array
 */
export const newsItems: NewsItem[] = [
  {
    id: 1,
    date: '2024.03.15',
    category: 'Publication',
    title: 'New paper on Large Language Models accepted at NeurIPS 2024.',
    link: 'https://neurips.cc/', // リンク付き / With link
  },
  {
    id: 2,
    date: '2024.03.10',
    category: 'Event',
    title: 'Spring Seminar Series: Dr. Tanaka from U-Tokyo discusses Ethics in AI.',
    link: 'https://example.com/event', // リンク付き / With link
  },
  {
    id: 3,
    date: '2024.02.28',
    category: 'Award',
    title: 'Lab member Yuki Sato receives the Outstanding Researcher Award.',
    // リンクなし - クリックできない / No link - not clickable
  },
  {
    id: 4,
    date: '2024.02.15',
    category: 'Press',
    title: 'Featured in Tech Weekly: "The Organic Approach to Machine Learning".',
    link: 'https://example.com/press', // リンク付き / With link
  },
  {
    id: 5,
    date: '2024.01.20',
    category: 'Recruit',
    title: 'We are looking for Ph.D. students for the 2025 academic year.',
    // リンクなし - クリックできない / No link - not clickable
  },
  {
    id: 6,
    date: '2023.12.10',
    category: 'Publication',
    title: 'Research on Reinforcement Learning published in Nature Machine Intelligence.',
    link: 'https://www.nature.com/natmachintell/', // リンク付き / With link
  },
];

/**
 * カテゴリーの表示色を定義
 * Define display colors for categories
 */
export const categoryColors: Record<NewsItem['category'], string> = {
  Publication: 'bg-[#F4991A] text-white',
  Event: 'bg-[#344F1F] text-white',
  Award: 'bg-[#F2EAD3] text-[#344F1F]',
  Press: 'bg-[#344F1F]/80 text-white',
  Recruit: 'bg-[#F4991A]/80 text-white',
  Other: 'bg-[#F2EAD3] text-[#344F1F]',
};