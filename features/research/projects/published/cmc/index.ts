import type { ResearchProject } from '../../../types';
import cmc_clack_image from '../../../images/cmc_crack.png';

const cmcProject: ResearchProject = {
  id: 'cmc',
  title: 'CMC (Ceramic Matrix Composites)',
  sortOrder: 40,
  description:
    'セラミックス基複合材料（CMC）の損傷・き裂を画像解析で高精度に検出し、劣化評価と材料設計に活用する研究です。',
  image: cmc_clack_image,
  detail: {
    subtitle: 'CMC材料評価のための画像解析・AI基盤',
    keywords: [
      'CMC',
      'Ceramic Matrix Composites',
      'SiC/SiC',
      'セラミックス基複合材料',
      '損傷検出',
      'き裂検出',
      '劣化評価',
      'SAXS',
      '画像解析',
      '深層学習',
    ],
    overview:
      'CMC（Ceramic Matrix Composites）は、セラミックスを母材に繊維などを組み合わせて、耐熱性・軽量性・損傷許容性を高めた複合材料です。SiC/SiC は、炭化ケイ素（SiC）繊維をSiC母材で包む代表的なCMCで、高温環境での構造材料として注目されています。\n\n本プロジェクトでは、SiC/SiC を含むCMCを対象に、SAXS画像や振動モード情報などを用いた損傷・微細き裂の自動検出、合体き裂の再識別、劣化度評価支援を行い、材料評価の高効率化と再現性向上を目指しています。',
    progress:
      '業績データに基づくこれまでの取り組みとして、(1) セラミックス基複合材料に対する段階的き裂検出、(2) 劣化度評価のための教師データ作成支援ツール開発、(3) SiC/SiC複合材料における合体き裂再識別手法、(4) 低データ条件でのマイクロクラック検出、(5) 振動モードと深層学習を用いた自動損傷検出を進めてきました。\n\n特に近年は、合体・成長するき裂の追跡や再識別など、単純な閾値処理では難しい課題に対して画像処理と学習手法を組み合わせ、評価精度の改善を図っています。',
    references: [
      {
        label: '東京工科大学 セラミックス複合材料センター',
        url: 'https://www.teu.ac.jp/karl/cmc/',
      },
    ],
  },
  relatedPublicationIds: [
    'dc-202603-ipsj-05',
    'ic-202510-engineering-01',
    'dc-202405-analchem-01',
    'dc-202405-analchem-02',
    'ij-202105-jcs-01',
  ],
  relatedPublicationKeywords: [
    'CMC',
    'Ceramic Matrix Composites',
    'セラミックス基複合材料',
    'SiC/SiC',
    'SAXS',
    'き裂',
    'microcrack',
    'damage detection',
  ],
};

export default cmcProject;
