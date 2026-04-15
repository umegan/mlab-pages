import type { ResearchProject } from '../../../types';

const autonomousDrivingProject: ResearchProject = {
  id: 'autonomous-driving',
  title: '自動運転',
  sortOrder: 50,
  description:
    '深層強化学習とマルチエージェント制御を用いて、協調型自動運転の安全性・効率性を高める研究です。',
  image:
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  detail: {
    subtitle: '協調型自動運転のための強化学習ベース制御',
    keywords: [
      '自動運転',
      '協調制御',
      '深層強化学習',
      'マルチエージェント',
      'ラウンドアバウト',
      'lane-free',
      'V2V通信',
      '報酬設計',
      '異車格協調',
    ],
    overview:
      '本プロジェクトでは、複数車両が相互に協調しながら安全かつ効率的に走行するための制御手法を研究しています。主なアプローチは深層強化学習で、車両サイズが異なる条件、ラウンドアバウトやレーンレス環境、接続車両間通信（V2V）を考慮した協調行動の獲得を目指しています。',
    progress:
      '過去の業績では、2023年頃から「車両サイズ差を考慮した協調制御」「ラウンドアバウトでの協調行動創発」の検討を開始し、国際会議・国内会議で基礎成果を報告しました。その後、報酬設計（階層型報酬モデル）や入力設計（車格情報の扱い）を改善し、国際ジャーナルで成果を展開しています。\n\n2025年以降は、レーンレス環境での道路利用効率向上、ラウンドアバウト形状の違いへの適応性、接続自動運転車の協調制御などへ対象を拡張しました。直近では、V2V通信情報に基づくローカル共通報酬を用いた協調学習へ発展しており、より実運用に近い条件での頑健性と汎化性の評価を進めています。',
  },
  relatedPublicationIds: [
    'ic-202601-arob-01',
    'ij-202510-springer-02',
    'ij-202506-sice-01',
    'ij-202504-alr-01',
    'ij-202400-jaciii-01',
    'ic-202400-ieee-01',
    'ic-202300-ieee-01',
    'dc-202300-sice-01',
  ],
  relatedPublicationKeywords: [
    'autonomous driving',
    'automated driving',
    '自動運転',
    'cooperative',
    '深層強化学習',
    'roundabout',
    'lane-free',
    'V2V',
    'vehicle size',
  ],
};

export default autonomousDrivingProject;
