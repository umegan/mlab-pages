/**
 * 研究業績の型定義
 * Publication Type Definitions
 */

export type PublicationType = 'journal' | 'conference' | 'workshop' | 'thesis';

export interface Publication {
  id: string; // ディレクトリ名として使用 / Used as directory name
  title: string;
  authors: string;
  venue: string; // 学会名・論文誌名 / Conference or journal name
  year: number;
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
  draft?: boolean; // 下書きフラグ / Draft flag
}

/**
 * 研究業績のメタデータ（JSONファイルに保存）
 * Publication Metadata (stored in JSON file)
 */
export interface PublicationMetadata {
  title: string;
  authors: string;
  venue: string;
  year: number;
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
