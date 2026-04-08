/**
 * メンバーデータ
 * Member Data
 * 
 * このファイルを編集してメンバー情報を更新してください
 * Edit this file to update member information
 */

import { Member } from '../types';

export const membersData: Member[] = [
  // 教員 / Faculty
  {
    id: 'prof-matsuoka',
    name: '松岡 太郎',
    nameEn: 'Taro Matsuoka',
    role: 'professor',
    email: 'matsuoka@example.ac.jp',
    research: 'ロボットビジョン、Spatial AI、自律移動システム',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    links: {
      website: 'https://example.com',
      scholar: 'https://scholar.google.com',
    },
  },

  // 博士課程 / Ph.D. Students
  {
    id: 'phd-tanaka',
    name: '田中 花子',
    nameEn: 'Hanako Tanaka',
    role: 'doctor',
    year: 'D3',
    email: 'tanaka@example.ac.jp',
    research: '3D物体認識とロボットマニピュレーション',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    links: {
      github: 'https://github.com',
      scholar: 'https://scholar.google.com',
    },
  },
  {
    id: 'phd-sato',
    name: '佐藤 健',
    nameEn: 'Ken Sato',
    role: 'doctor',
    year: 'D2',
    research: 'デジタルツインとSim2Real転移学習',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },

  // 修士課程 / Master Students
  {
    id: 'master-yamada',
    name: '山田 美咲',
    nameEn: 'Misaki Yamada',
    role: 'master',
    year: 'M2',
    research: 'LiDARを用いた自律走行ナビゲーション',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
  {
    id: 'master-suzuki',
    name: '鈴木 誠',
    nameEn: 'Makoto Suzuki',
    role: 'master',
    year: 'M2',
    research: 'ポイントクラウドセグメンテーション',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
  {
    id: 'master-kato',
    name: '加藤 愛',
    nameEn: 'Ai Kato',
    role: 'master',
    year: 'M1',
    research: '人間ロボット協働作業の行動予測',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
  },
  {
    id: 'master-ito',
    name: '伊藤 大輔',
    nameEn: 'Daisuke Ito',
    role: 'master',
    year: 'M1',
    research: 'Spatial AIによる環境認識',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
  },

  // 学部生 / Undergraduate Students
  {
    id: 'bachelor-watanabe',
    name: '渡辺 さくら',
    nameEn: 'Sakura Watanabe',
    role: 'bachelor',
    year: 'B4',
    research: '画像処理を用いた物体検出',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
  },
  {
    id: 'bachelor-nakamura',
    name: '中村 拓海',
    nameEn: 'Takumi Nakamura',
    role: 'bachelor',
    year: 'B4',
    research: 'ROSを用いたロボット制御',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
  },

  // 卒業生 / Alumni (例として数名)
  {
    id: 'alumni-kobayashi',
    name: '小林 優',
    nameEn: 'Yu Kobayashi',
    role: 'alumni',
    research: 'Visual SLAM',
    graduation: {
      year: 2023,
      nextPosition: '○○大学 博士課程進学',
    },
  },
  {
    id: 'alumni-yoshida',
    name: '吉田 恵',
    nameEn: 'Megumi Yoshida',
    role: 'alumni',
    research: '強化学習',
    graduation: {
      year: 2023,
      nextPosition: '株式会社△△ ソフトウェアエンジニア',
    },
  },
  {
    id: 'alumni-kimura',
    name: '木村 翔太',
    nameEn: 'Shota Kimura',
    role: 'alumni',
    research: '自動運転',
    graduation: {
      year: 2022,
      nextPosition: '□□自動車 研究開発部',
    },
  },
];
