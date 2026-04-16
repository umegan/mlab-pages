import type { ResearchProject } from '../../../types';
import columnDetectionImage from '../../../images/column-detection.png';

const columnDetectionProject: ResearchProject = {
  id: 'column-detection',
  title: '列検知',
  sortOrder: 10,
  description:
    '監視カメラ映像から待機列を自動検出し、蛇行列にも対応した人数計測で混雑回避を支援する研究です。',
  image: columnDetectionImage,
  detail: {
    subtitle: '人の密集回避のための導入が容易な利用者数自動計測システムの開発',
    grantTitle: '人の密集回避のための導入が容易な利用者数自動計測システムの開発',
    grantNumber: '23K11659',
    grantCategory: '基盤研究(C)',
    keywords: [
      '人数計測',
      '待機列検出',
      '蛇行列対応',
      'Flow-Intensity',
      '行動空間認識',
      '混雑回避支援',
      '人流計測',
      '列検知',
      '曲線形状',
      '時間変化',
      'ドローン',
      'ロボットビジョン',
      '列検出',
      '画像認識',
    ],
    overview:
      '本研究では、待ち行列の人数を簡単に計測するためのシステムを提案する。本システムは、監視カメラや小型カメラを利用でき、イベントでの利用も可能である。従来システムではゲート設置が必要であり、一時的なイベントや小規模施設での利用が困難であったが、本システムは導入が容易で、待ち行列の形状や範囲に依存しないため、より多くの場面で計測が可能である。サービス利用者の始点を設定し、そこから伸びる線を検出することで列内の待ち人数を計測する。機械学習を用いたクラスタリングと追跡技術により誤加算を低減する。',
    progress:
      '令和6年度は、直線的でない蛇行列（Winding Queue）に対する既存手法の精度低下に対応することを主眼に、新たな列領域推定手法の提案と検証を進めた。人物移動のオプティカルフローを時系列に積算する Flow Intensity Map を新たに提案し、曲率と密度勾配に基づく曲線近似推定アルゴリズムを構築した。これにより曲線状の列の連続性を考慮した領域抽出が可能となり、単純な密度ベース手法と比較して高い空間的整合性を達成した。公共施設の混雑時待機列を模した独自映像データセットによる比較実験では、F1値で従来手法を大きく上回る精度を確認した。さらに、推定結果の照合・編集用GUI、記録用データベース、クラウド型自動蓄積基盤のプロトタイプを実装し、利用可能性検証を開始した。今後は、列の分類（直線・蛇行・並列）、複数列の同時分離、列の一時的崩壊や再構成など非定常現象への対応を進める。',
    references: [
      {
        label: '科研費プロジェクトページ',
        url: 'https://kaken.nii.ac.jp/ja/grant/KAKENHI-PROJECT-23K11659/',
      },
    ],
  },
  relatedPublicationIds: [
    'dc-202603-ipsj-08',
    'dc-202310-ieice-sis-01',
    'dc-202000-ieice-01',
  ],
  relatedPublicationKeywords: ['待機列', '列検知', 'Queue-flow', 'Flow Intensity', '人数計測'],
};

export default columnDetectionProject;
