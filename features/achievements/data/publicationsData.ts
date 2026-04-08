/**
 * 研究業績データ管理ファイル
 * Publications/Achievements Data Management File
 * 
 * このファイルで論文・発表の追加・編集・削除を行います
 * Add, edit, or delete publications in this file
 */

export type TechTag = 'Robot Vision' | 'Spatial AI' | 'Image Processing' | 'ROS' | 'Point Cloud' | 'Digital Twin';

export interface Publication {
  id: number;
  title: string;
  authors: string;
  conference: string; // Conference name or journal name
  year: number;
  tags: TechTag[];
  link?: string; // Optional link to PDF or DOI
  doi?: string; // Optional DOI
  abstract?: string; // Optional abstract
}

/*=============================================================================
 * データ追加用テンプレート / Template for new entries
 * コピー＆ペーストして、配列の先頭に追加してください。
 * Copy and paste this template at the beginning of the `publications` array.
 *=============================================================================
 *
 * {
 *   id: 999, // 重複しない一意の番号 (Unique ID)
 *   title: "論文のタイトル (Paper Title)",
 *   authors: "著者名1, 著者名2, Prof. Matsuoka",
 *   conference: "会議名またはジャーナル名 (Conference or Journal)",
 *   year: 2024,
 *   tags: ["Robot Vision", "ROS"], // 使用可能なタグ (TechTag) から選択
 *   link: "https://...", // 省略可能 (Optional link)
 *   doi: "10.1234/...", // 省略可能 (Optional DOI)
 *   abstract: "論文の概要...", // 省略可能 (Optional abstract)
 * },
 *
 *=============================================================================*/

/**
 * 研究業績一覧
 * 新しい業績は配列の先頭に追加してください
 * Add new publications at the beginning of the array
 */
export const publications: Publication[] = [
  {
    id: 1,
    title: "Development of Automated People Counting System using Line Detection",
    authors: "Taro Yamada, Hanako Suzuki, Prof. Matsuoka",
    conference: "IEEE International Conference on Robotics and Automation (ICRA)",
    year: 2024,
    tags: ["Robot Vision", "Image Processing"],
    link: "#"
  },
  {
    id: 2,
    title: "Sim2Real Transfer for Industrial Robot Assembly Tasks via Digital Twins",
    authors: "Kenji Sato, Prof. Matsuoka",
    conference: "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)",
    year: 2024,
    tags: ["ROS", "Digital Twin"],
    link: "#"
  },
  {
    id: 3,
    title: "Real-time Point Cloud Segmentation for Autonomous Mobile Robots",
    authors: "Yuki Tanaka, John Smith, Prof. Matsuoka",
    conference: "Computer Vision and Pattern Recognition (CVPR)",
    year: 2023,
    tags: ["Point Cloud", "Spatial AI"],
    link: "#"
  },
  {
    id: 4,
    title: "Human-Robot Collaboration in Shared Workspaces using Behavior Prediction",
    authors: "Emi Kato, Prof. Matsuoka",
    conference: "International Conference on Human-Robot Interaction (HRI)",
    year: 2023,
    tags: ["Robot Vision", "ROS"],
    link: "#"
  },
  {
    id: 5,
    title: "Efficient 3D Object Detection in Cluttered Environments",
    authors: "Hiroshi Yamamoto, Prof. Matsuoka",
    conference: "European Conference on Computer Vision (ECCV)",
    year: 2022,
    tags: ["Image Processing", "Point Cloud"],
    link: "#"
  },
  {
    id: 6,
    title: "Navigation Strategies for Mobile Manipulators in Dynamic Warehouses",
    authors: "Sakura Ito, Prof. Matsuoka",
    conference: "International Conference on Automated Planning and Scheduling (ICAPS)",
    year: 2022,
    tags: ["ROS", "Spatial AI"],
    link: "#"
  },
  {
    id: 7,
    title: "Generative Models for Synthetic Data Creation in Industrial Settings",
    authors: "Takumi Watanabe, Prof. Matsuoka",
    conference: "NeurIPS Workshop on Generative AI",
    year: 2021,
    tags: ["Image Processing", "Digital Twin"],
    link: "#"
  },
  {
    id: 8,
    title: "Survey on Visual SLAM Techniques for Indoor Environments",
    authors: "Prof. Matsuoka, Taro Yamada",
    conference: "Journal of Robotics and Mechatronics",
    year: 2020,
    tags: ["Spatial AI", "Robot Vision"],
    link: "#"
  }
];

/**
 * フィルタリング用の年リスト
 * Years list for filtering
 */
export const YEARS = ['All', '2025', '2024', '2023', '2022', 'Prior to 2021'] as const;

/**
 * フィルタリング用の技術タグリスト
 * Tech tags list for filtering
 */
export const TECH_TAGS: TechTag[] = [
  'Robot Vision',
  'Spatial AI',
  'Image Processing',
  'ROS',
  'Point Cloud',
  'Digital Twin'
];

/**
 * ユーティリティ関数: 年でフィルタリング
 * Utility function: Filter by year
 */
export const filterByYear = (pubs: Publication[], selectedYear: string): Publication[] => {
  if (selectedYear === 'All') return pubs;
  if (selectedYear === 'Prior to 2021') {
    return pubs.filter(pub => pub.year <= 2021);
  }
  return pubs.filter(pub => pub.year.toString() === selectedYear);
};

/**
 * ユーティリティ関数: タグでフィルタリング
 * Utility function: Filter by tags
 */
export const filterByTags = (pubs: Publication[], selectedTags: TechTag[]): Publication[] => {
  if (selectedTags.length === 0) return pubs;
  return pubs.filter(pub => selectedTags.some(tag => pub.tags.includes(tag)));
};
