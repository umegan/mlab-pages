/**
 * 研究業績データローダー
 * Publications Data Loader
 * 
 * 【重要】データの追加方法
 * /features/achievements/data/publications/[ID]/metadata.json を作成したら、
 * このファイルの publicationsDataMap に同じ内容を追加してください。
 * 
 * 【追加手順】
 * 1. CLIスクリプトで metadata.json を作成
 * 2. このファイルの publicationsDataMap に以下の形式で追加：
 *    'pub-XXX': { ...metadata.json の内容 }
 */

import { Publication, PublicationMetadata } from '../types';

/**
 * 研究業績データマップ
 * 新しい業績を追加する場合は、ここに追加してください
 */
const publicationsDataMap: Record<string, PublicationMetadata> = {
  'pub-001': {
    title: 'Development of Automated People Counting System using Line Detection',
    authors: 'Taro Yamada, Hanako Suzuki, Prof. Matsuoka',
    venue: 'IEEE International Conference on Robotics and Automation (ICRA)',
    year: 2024,
    type: 'conference',
    tags: ['Robot Vision', 'Image Processing'],
    abstract: 'This paper presents an automated system for counting people using advanced line detection algorithms.',
    code_url: 'https://github.com/example/people-counting',
  },
  'pub-002': {
    title: 'Sim2Real Transfer for Industrial Robot Assembly Tasks via Digital Twins',
    authors: 'Kenji Sato, Prof. Matsuoka',
    venue: 'IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)',
    year: 2024,
    type: 'conference',
    tags: ['ROS', 'Digital Twin'],
    abstract: 'We propose a novel approach for transferring simulation-trained models to real robots using digital twin technology.',
  },
  'pub-003': {
    title: 'Real-time Point Cloud Segmentation for Autonomous Mobile Robots',
    authors: 'Yuki Tanaka, John Smith, Prof. Matsuoka',
    venue: 'Computer Vision and Pattern Recognition (CVPR)',
    year: 2023,
    type: 'conference',
    tags: ['Point Cloud', 'Spatial AI'],
    abstract: 'A real-time point cloud segmentation method for autonomous navigation in complex environments.',
    award: 'Best Paper Award',
  },
  'pub-004': {
    title: 'Human-Robot Collaboration in Shared Workspaces using Behavior Prediction',
    authors: 'Emi Kato, Prof. Matsuoka',
    venue: 'International Conference on Human-Robot Interaction (HRI)',
    year: 2023,
    type: 'conference',
    tags: ['Robot Vision', 'ROS'],
    abstract: 'This work explores safe human-robot collaboration through predictive behavior modeling.',
  },
  'pub-005': {
    title: 'Efficient 3D Object Detection in Cluttered Environments',
    authors: 'Hiroshi Yamamoto, Prof. Matsuoka',
    venue: 'European Conference on Computer Vision (ECCV)',
    year: 2022,
    type: 'conference',
    tags: ['Image Processing', 'Point Cloud'],
    abstract: 'An efficient approach to 3D object detection in challenging cluttered scenarios.',
  },
  'pub-006': {
    title: 'Navigation Strategies for Mobile Manipulators in Dynamic Warehouses',
    authors: 'Sakura Ito, Prof. Matsuoka',
    venue: 'International Conference on Automated Planning and Scheduling (ICAPS)',
    year: 2022,
    type: 'conference',
    tags: ['ROS', 'Spatial AI'],
    abstract: 'Novel navigation strategies for mobile manipulators operating in dynamic warehouse environments.',
  },
  'pub-007': {
    title: 'Generative Models for Synthetic Data Creation in Industrial Settings',
    authors: 'Takumi Watanabe, Prof. Matsuoka',
    venue: 'NeurIPS Workshop on Generative AI',
    year: 2021,
    type: 'workshop',
    tags: ['Image Processing', 'Digital Twin'],
    abstract: 'We present generative models for creating high-quality synthetic training data for industrial applications.',
  },
  'pub-008': {
    title: 'Survey on Visual SLAM Techniques for Indoor Environments',
    authors: 'Prof. Matsuoka, Taro Yamada',
    venue: 'Journal of Robotics and Mechatronics',
    year: 2020,
    type: 'journal',
    tags: ['Spatial AI', 'Robot Vision', 'SLAM'],
    abstract: 'A comprehensive survey of visual SLAM methods for indoor robot navigation.',
  },
};

/**
 * 全研究業績を取得
 * Get all publications
 */
export function getAllPublications(): Publication[] {
  const publications: Publication[] = [];
  
  for (const [id, metadata] of Object.entries(publicationsDataMap)) {
    // 下書きは除外 / Exclude drafts
    if (metadata.draft) continue;
    
    publications.push({
      id,
      ...metadata,
    });
  }
  
  // 年の新しい順にソート / Sort by year (newest first)
  return publications.sort((a, b) => b.year - a.year);
}

/**
 * IDで研究業績を取得
 * Get publication by ID
 */
export function getPublicationById(id: string): Publication | null {
  const metadata = publicationsDataMap[id];
  if (!metadata) return null;
  
  return {
    id,
    ...metadata,
  };
}

/**
 * 年でフィルタリング
 * Filter by year
 */
export function filterByYear(pubs: Publication[], selectedYear: string): Publication[] {
  if (selectedYear === 'All') return pubs;
  if (selectedYear === 'Prior to 2021') {
    return pubs.filter(pub => pub.year <= 2021);
  }
  return pubs.filter(pub => pub.year.toString() === selectedYear);
}

/**
 * タグでフィルタリング
 * Filter by tags
 */
export function filterByTags(pubs: Publication[], selectedTags: string[]): Publication[] {
  if (selectedTags.length === 0) return pubs;
  return pubs.filter(pub => 
    pub.tags && selectedTags.some(tag => pub.tags!.includes(tag))
  );
}

/**
 * タイプでフィルタリング
 * Filter by type
 */
export function filterByType(pubs: Publication[], type: Publication['type']): Publication[] {
  return pubs.filter(pub => pub.type === type);
}

/**
 * 受賞論文のみ取得
 * Get award-winning publications only
 */
export function getAwardPublications(): Publication[] {
  return getAllPublications().filter(pub => pub.award);
}
