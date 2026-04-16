import type { ResearchProject } from '../../../types';

const atFactoryProject: ResearchProject = {
  id: 'at-factory',
  title: '@factory',
  sortOrder: 20,
  description:
    'フィジカルAI検証のために、プラグイン構造で要素交換可能な仮想工場シミュレーション基盤を提供するプロジェクトです。',
  image:
    'https://momoi.org/wp-content/uploads/2025/07/Screenshot_from_2025-07-15_20-33-33-1-1024x648.png',
  detail: {
    subtitle: 'フィジカルAI検証のための、プラグイン構造による仮想工場の構築',
    keywords: [
      'フィジカルAI',
      '仮想工場',
      'デジタルツイン',
      'NVIDIA Isaac Sim',
      'Omniverse',
      'ROS 2',
      'Docker',
      'プラグイン構造',
      'at_factory_base',
      '製造業',
      'CNC旋盤',
    ],
    overview:
      '@factory は、汎用的なフィジカルAI技術を工場・製造業に適用して有効性を検討するためのオープンソース研究基盤です。個別アルゴリズムの開発だけでなく、社会課題へ適用して効果を確認するワークフローを重視し、NVIDIA Isaac Sim 上で仮想工場・ロボット・制御系を少ない労力で差し替え可能な統合環境を提供します。',
    progress:
      '今回の公開では、@factory を構成するサンプルシステム一式をリリースしました。中核の at_factory と、仮想工場・加工機械定義、モバイルアームロボット定義（melon_ros2）を組み合わせることで、AIロボットが作業できる仮想工場を構築できます。\n\n@factory の中核である at_factory_base は、Docker 上で動作するプラットフォームとして、Isaac Sim + ROS 2 の実行環境を統一し、プラグイン機構により仮想工場・工作機械USD・ロボットUSD・制御サンプルを交換可能にします。これにより、条件変更や再利用時の工数を削減し、フィジカルAIの比較検証を効率化します。\n\nまた、現地工場調査に基づいて小規模工場モデルとCNC旋盤モデルを整備し、ワークのローディング／アンローディングを含む工程シミュレーションを可能にしました。今後は、自律移動する双腕ロボットなどを対象に、入荷から出荷までの全自動操業シナリオへ拡張を進めます。',
    references: [
      {
        label: '@factoryプロジェクト紹介ページ',
        url: 'https://momoi.org/?page_id=527',
      },
      {
        label: 'Application Sample for @factory',
        url: 'https://github.com/momoiorg-repository/factory_app_1',
      },
    ],
  },
  relatedPublicationIds: ['dc-202603-ipsj-04', 'dc-202603-ipsj-02'],
  relatedPublicationKeywords: [
    '@factory',
    'at_factory_base',
    'フィジカルAI',
    '仮想工場',
    'Isaac Sim',
    'ROS 2',
    'プラグイン',
    'デジタルツイン',
  ],
};

export default atFactoryProject;
