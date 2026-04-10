/**
 * 研究業績の型定義
 * Publication Type Definitions
 */

export type PublicationType = 'journal' | 'conference' | 'workshop' | 'thesis';
export type PublicationClass =
  | 'international_conference'
  | 'domestic_conference'
  | 'international_journal'
  | 'domestic_journal'
  | 'international_workshop'
  | 'domestic_workshop'
  | 'other';

export interface PublicationSourceRecord {
  [key: string]: string;
}

export interface Publication {
  id: string; // ディレクトリ名として使用 / Used as directory name
  slug_base?: string;
  slug_sequence?: number;
  title: string;
  authors: string;
  venue: string; // 学会名・論文誌名 / Conference or journal name
  year: number;
  published_at?: string; // 発行・発表日（年月日/年月/年）
  pages?: string; // ページ情報
  note?: string; // 備考
  link?: string; // 代表リンク
  year_raw?: string;
  year_detected?: boolean;
  publication_class?: PublicationClass;
  type: PublicationType;
  doi?: string;
  arxiv?: string;
  project?: string;
  code_url?: string;
  data_url?: string;
  award?: string;
  bibtex?: string; // BibTeXファイル名 / BibTeX filename
  pdf?: string; // PDFファイル名 / PDF filename
  slides?: string; // スライドファイル名 / Slides filename
  poster?: string; // ポスターファイル名 / Poster filename
  video?: string; // 動画URL / Video URL
  tags?: string[]; // 技術タグ / Tech tags
  abstract?: string;
  source_file?: string;
  source_category?: string;
  source_row_number?: number;
  source_record?: PublicationSourceRecord;
  draft?: boolean; // 下書きフラグ / Draft flag
}

/**
 * 研究業績のメタデータ（JSONファイルに保存）
 * Publication Metadata (stored in JSON file)
 */
export interface PublicationMetadata {
  id?: string;
  slug_base?: string;
  slug_sequence?: number;
  title: string;
  authors: string;
  venue: string;
  year: number;
  published_at?: string;
  pages?: string;
  note?: string;
  link?: string;
  year_raw?: string;
  year_detected?: boolean;
  publication_class?: PublicationClass;
  type: PublicationType;
  doi?: string;
  arxiv?: string;
  project?: string;
  code_url?: string;
  data_url?: string;
  award?: string;
  bibtex?: string;
  pdf?: string;
  slides?: string;
  poster?: string;
  video?: string;
  tags?: string[];
  abstract?: string;
  source_file?: string;
  source_category?: string;
  source_row_number?: number;
  source_record?: PublicationSourceRecord;
  draft?: boolean;
}

/**
 * 技術タグの定義
 * Tech Tags Definition
 */
export const TECH_TAGS = [
  'Robot Vision',
  'Spatial AI',
  'Image Processing',
  'ROS',
  'Point Cloud',
  'Digital Twin',
  'Deep Learning',
  'SLAM',
  'Object Detection',
  'Segmentation'
] as const;

export type TechTag = typeof TECH_TAGS[number];
