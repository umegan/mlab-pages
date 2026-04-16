import type { ResearchProject } from '../../../types';
import tomatoDetectionImage from '../../../images/tomato-detection.svg';

const tomatoDetectionProject: ResearchProject = {
  id: 'tomato-detection',
  title: 'トマト検知',
  sortOrder: 30,
  description:
    '農業現場の画像データからトマトを高精度に検出し、収穫支援や品質管理へ応用する研究です。',
  image: tomatoDetectionImage,
  detail: {
    subtitle: 'ロボットビジョンを用いた果実検出と計測のためのトマト検知技術',
    keywords: [
      'トマト検知',
      '果実検出',
      '農業ロボティクス',
      '物体検出',
      'Semantic Segmentation',
      'データ拡張',
      '収穫支援',
      '品質評価',
      'RGB画像',
      '深層学習',
    ],
    overview:
      '本プロジェクトでは、農業現場におけるトマトの自動検知を目指し、ロボットカメラ映像から果実の位置と形状を高精度に抽出する技術を研究しています。収穫ロボットや品質検査システムへの連携を想定し、茎や葉の重なり、照明変化、背景雑音への頑健性を重視します。',
    progress:
      '現在はトマトの検出精度向上に注力しており、RGB画像を入力とした物体検出モデルと、検出結果を補正する前処理パイプラインを開発しています。非成熟トマトと成熟トマトの識別、陰影の強い環境での検出安定化、同一果実の重複検出抑制などを評価し、現地農園データを用いた実装検証を進めています。今後は、実際の収穫ロボットとの連携実装や、IoU ベースの品質評価指標の導入を予定しています。',
    references: [
      {
        label: '農業向け果実検出の研究概要',
        url: 'https://example.com/tomato-detection',
      },
    ],
  },
  relatedPublicationKeywords: [
    'tomato detection',
    'fruit detection',
    'agricultural robotics',
    'deep learning',
    'object detection',
    'semantic segmentation',
  ],
};

export default tomatoDetectionProject;
