/**
 * メンバー型定義
 * Member Type Definitions
 */

export type MemberRole = 'professor' | 'postdoc' | 'doctor' | 'master' | 'bachelor' | 'alumni';

export interface Member {
  id: string;
  name: string;
  nameEn?: string;
  role: MemberRole;
  year?: string; // 学年 (e.g., "M2", "B4")
  email?: string;
  research?: string; // 研究テーマ
  photo?: string;
  links?: {
    website?: string;
    github?: string;
    scholar?: string;
    linkedin?: string;
  };
  graduation?: {
    year: number;
    nextPosition?: string; // 進学先・就職先
  };
}

export const roleLabels: Record<MemberRole, { ja: string; en: string }> = {
  professor: { ja: '教員', en: 'Professor' },
  postdoc: { ja: 'ポスドク', en: 'Postdoc' },
  doctor: { ja: '博士課程', en: 'Ph.D. Student' },
  master: { ja: '修士課程', en: 'Master Student' },
  bachelor: { ja: '学部生', en: 'Undergraduate' },
  alumni: { ja: '卒業生', en: 'Alumni' },
};
