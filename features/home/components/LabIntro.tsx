import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const researchAreas = [
  'ロボットビジョン',
  'Spatial AI',
  '3Dオブジェクト化',
  '環境マップ拡張',
  'サービス利用者計測',
  '機械学習',
  'ロボット制御・通信',
  'デジタルツイン',
];

interface LabIntroProps {
  onNavigate: (page: string) => void;
}

export const LabIntro = ({ onNavigate }: LabIntroProps) => {
  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#F4991A] font-bold tracking-widest text-sm uppercase mb-4">
              About Us
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#344F1F] mb-8 leading-tight">
              私たちに<br />ついて
            </h2>
            <div className="space-y-5 text-[#344F1F]/80 text-lg leading-relaxed">
              <p>
                映像を解析・処理することで、ロボットが現実世界を理解し、人と共存する。
                そんなワクワクするような未来を目指して研究しています。
              </p>
              <p>
                人間が物を見たとき、詳細を完全に覚えているわけではなく、色や形、大きさ、
                用途などの特徴を無意識に認識しています。このように物事を抽象的にとらえる
                認識プロセスをロボットに応用することで、より効率的な処理が可能になると
                考えています。
              </p>
              <p>
                現在は、サービス利用者数を自動計測する技術・ナビゲーション用の環境マップ
                拡張・実世界の物体の3Dオブジェクト化などの研究を進めています。
                また、ロボット制御・通信・機械学習・ロボットビジョン・Spatial AI など、
                ロボットエンジニアに必要な技術の習得にも積極的に取り組んでいます。
              </p>
            </div>

            <motion.button
              onClick={() => onNavigate('research')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 inline-flex items-center gap-2 bg-[#344F1F] hover:bg-[#2a3f18] text-white font-bold px-8 py-4 rounded-full transition-colors group"
            >
              研究内容を詳しく見る
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right: Research areas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Area tags */}
            <div className="bg-[#F9F5F0] rounded-3xl p-8">
              <p className="text-sm font-bold text-[#344F1F]/50 uppercase tracking-widest mb-5">
                Research Areas
              </p>
              <div className="flex flex-wrap gap-3">
                {researchAreas.map((area, i) => (
                  <motion.span
                    key={area}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="bg-white border border-[#344F1F]/15 text-[#344F1F] font-bold px-4 py-2 rounded-full text-sm shadow-sm"
                  >
                    {area}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '15+', label: 'メンバー' },
                { value: '50+', label: '論文発表' },
                { value: '10+', label: '受賞実績' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="bg-[#344F1F] rounded-2xl p-5 text-center"
                >
                  <p className="text-3xl font-bold text-[#F4991A]">{stat.value}</p>
                  <p className="text-white/80 text-sm mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
