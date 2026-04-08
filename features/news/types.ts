/**
 * ニュースアイテムの型定義
 * News Item Type Definitions
 */

import { FileText, Calendar, Award, Newspaper, Users, HelpCircle } from 'lucide-react';

export type NewsCategory = 'Publication' | 'Event' | 'Award' | 'Press' | 'Recruit' | 'Other';

export interface NewsItem {
  id: string; // ディレクトリ名として使用 / Used as directory name
  title: string;
  date: string; // YYYY.MM.DD 形式
  summary?: string;
  tags?: string[];
  related_members?: string[];
  related_projects?: string[];
  related_publications?: string[];
  lang?: 'ja' | 'en';
  category: NewsCategory;
  image?: string; // 画像ファイル名 / Image filename
  link?: string; // 外部リンク / External link
  draft?: boolean; // 下書きフラグ / Draft flag
}

/**
 * ニュースアイテムのメタデータ（JSONファイルに保存）
 * News Item Metadata (stored in JSON file)
 */
export interface NewsMetadata {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  related_members?: string[];
  related_projects?: string[];
  related_publications?: string[];
  lang?: 'ja' | 'en';
  category: NewsCategory;
  image?: string;
  link?: string;
  draft?: boolean;
}

/**
 * カテゴリーの表示色を定義
 * Define display colors for categories
 */
export const categoryColors: Record<NewsCategory, string> = {
  Publication: 'bg-[#F4991A] text-white',
  Event: 'bg-[#344F1F] text-white',
  Award: 'bg-[#F2EAD3] text-[#344F1F]',
  Press: 'bg-[#344F1F]/80 text-white',
  Recruit: 'bg-[#F4991A]/80 text-white',
  Other: 'bg-[#F2EAD3] text-[#344F1F]',
};

/**
 * カテゴリーごとのアイコンを返す
 * Return icon component for each category
 */
export const getCategoryIcon = (category: NewsCategory) => {
  switch (category) {
    case 'Publication':
      return FileText;
    case 'Event':
      return Calendar;
    case 'Award':
      return Award;
    case 'Press':
      return Newspaper;
    case 'Recruit':
      return Users;
    case 'Other':
    default:
      return HelpCircle;
  }
};