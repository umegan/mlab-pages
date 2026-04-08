import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../../components/ui/button';
import { MapPin, Mail, GraduationCap, Award, Users } from 'lucide-react';

const labStats = [
  { icon: Users, label: '研究室メンバー', value: '15名' },
  { icon: GraduationCap, label: '論文発表数', value: '50+' },
  { icon: Award, label: '受賞実績', value: '10+' },
];

export const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-[#F9F5F0] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#344F1F]/10">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-[#344F1F]">研究室概要</h1>
            <p className="text-lg text-[#344F1F]/70 mt-2">About Our Laboratory</p>
          </motion.div>
        </div>
      </div>

      {/* Lab Stats */}
      <section className="bg-[#344F1F] py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {labStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F4991A]/20 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-[#F4991A]" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-[#F9F5F0]/80">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lab Information */}
      <section className="bg-[#F9F5F0] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Basic Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-[#344F1F] mb-6">研究室情報</h2>
              <div className="space-y-6 bg-white p-6 rounded-2xl border border-[#344F1F]/10">
                <div>
                  <h3 className="font-bold text-[#344F1F] mb-2">所属</h3>
                  <p className="text-[#344F1F]/80">
                    ○○大学 工学部 情報工学科<br />
                    大学院 工学研究科 情報工学専攻
                  </p>
                </div>

                <div className="h-px bg-[#344F1F]/10"></div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#F4991A] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[#344F1F] mb-2">所在地</h3>
                    <p className="text-[#344F1F]/80">
                      〒100-0001<br />
                      東京都○○区△△ 1-2-3<br />
                      ○○大学 工学部 3号館 5階 503号室
                    </p>
                  </div>
                </div>

                <div className="h-px bg-[#344F1F]/10"></div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#F4991A] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[#344F1F] mb-2">連絡先</h3>
                    <a
                      href="mailto:contact@matsuoka-lab.example.ac.jp"
                      className="text-[#F4991A] hover:underline"
                    >
                      contact@matsuoka-lab.example.ac.jp
                    </a>
                  </div>
                </div>

                <div className="h-px bg-[#344F1F]/10"></div>

                <div>
                  <h3 className="font-bold text-[#344F1F] mb-2">設立</h3>
                  <p className="text-[#344F1F]/80">2015年4月</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Research Areas */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-[#344F1F] mb-6">研究分野</h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'ロボットビジョン',
                    description: 'カメラやLiDARを用いた3次元環境認識、物体検出・認識技術',
                  },
                  {
                    title: 'Spatial AI',
                    description: '空間情報を理解・活用する人工知能システムの研究開発',
                  },
                  {
                    title: '自律移動システム',
                    description: '自律走行車両、移動ロボットのナビゲーション・制御技術',
                  },
                  {
                    title: 'ロボットマニピュレーション',
                    description: 'ロボットアームによる把持・操作技術、Sim2Real転移学習',
                  },
                  {
                    title: 'デジタルツイン',
                    description: '実環境とシミュレーション環境の連携による研究開発',
                  },
                ].map((area, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-xl border border-[#344F1F]/10 hover:border-[#F4991A] transition-colors"
                  >
                    <h3 className="font-bold text-[#344F1F] mb-2">{area.title}</h3>
                    <p className="text-sm text-[#344F1F]/70">{area.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#344F1F] leading-tight mb-8">
                未来のロボティクスを創造し<br />
                <span className="text-[#F4991A]">社会に貢献する</span>
              </h2>
              <p className="text-lg text-[#344F1F]/80 leading-relaxed mb-6">
                私たちの研究室では、ロボットビジョンとSpatial AIの技術を核として、
                自律的に環境を認識し、適切に行動できるロボットシステムの実現を目指しています。
              </p>
              <p className="text-lg text-[#344F1F]/80 leading-relaxed">
                理論研究から実装・実証実験まで一貫して取り組み、
                産業界や社会への実用化を見据えた研究開発を行っています。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Message from Director */}
      <section className="bg-[#F2EAD3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left: Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute top-4 -left-4 w-full h-full border-2 border-[#344F1F] z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80"
                alt="松岡教授のプロフィール写真"
                className="relative z-10 w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-500 rounded-lg"
              />
            </motion.div>

            {/* Right: Message */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#F4991A] font-bold tracking-widest uppercase text-sm mb-4 block">
                Message from the Director
              </span>
              <h3 className="text-3xl font-bold text-[#344F1F] mb-6">
                研究室主宰者からのメッセージ
              </h3>
              <div className="space-y-6 text-[#344F1F]/90 text-lg leading-relaxed">
                <p>
                  ロボティクスとAIの技術は、今や私たちの社会に不可欠なものとなっています。
                  本研究室では、単なる技術開発にとどまらず、実社会で本当に役立つシステムの実現を目指しています。
                </p>
                <p>
                  学生の皆さんには、失敗を恐れずチャレンジする姿勢と、
                  基礎理論をしっかり学ぶことの両方を大切にしてほしいと考えています。
                  共に未来を創造しましょう。
                </p>
                <div className="pt-6 border-t border-[#344F1F]/20">
                  <p className="font-bold text-[#344F1F] text-xl mb-1">松岡 太郎</p>
                  <p className="text-[#344F1F]/70">教授 / Professor</p>
                  <p className="text-sm text-[#344F1F]/60 mt-2">
                    博士（工学） / Ph.D. in Engineering<br />
                    専門：ロボットビジョン、Spatial AI、自律システム
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research Achievements Highlight */}
      <section className="bg-[#F9F5F0] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#344F1F] mb-6">
              主な研究実績
            </h2>
            <p className="text-lg text-[#344F1F]/70 mb-12 max-w-2xl mx-auto">
              国際会議での論文発表、産学連携プロジェクト、競争的資金の獲得など、
              多数の研究成果を上げています。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: '国際会議論文', value: '30+', unit: '件' },
                { label: '共同研究', value: '8', unit: '社' },
                { label: '科研費採択', value: '5', unit: '件' },
                { label: '学生受賞', value: '15+', unit: '件' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-[#344F1F]/10"
                >
                  <div className="text-4xl font-bold text-[#F4991A] mb-2">
                    {item.value}
                    <span className="text-2xl text-[#344F1F]/70 ml-1">{item.unit}</span>
                  </div>
                  <div className="text-[#344F1F]/70">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
