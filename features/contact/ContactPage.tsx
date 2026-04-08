import { motion } from 'motion/react';
import { ExternalLink, Building2, GraduationCap } from 'lucide-react';

export const ContactPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-[#F9F5F0]">
      {/* Header */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 border-b border-[#344F1F]/10 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-[#344F1F] mb-4">
              お問い合わせ
            </h1>
            <p className="text-lg text-[#344F1F]/70">Contact</p>
          </motion.div>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#344F1F]/70 text-base sm:text-lg mb-14 text-center max-w-xl"
        >
          ご質問やご意見は、以下をご確認のうえ、お問い合わせください。
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* 学外の方 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col bg-white rounded-2xl shadow-md border border-[#344F1F]/10 overflow-hidden"
          >
            <div className="h-1.5 bg-[#344F1F]" />
            <div className="flex flex-col flex-1 p-8">
              <div className="w-12 h-12 rounded-full bg-[#344F1F]/10 flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6 text-[#344F1F]" />
              </div>
              <h2 className="text-xl font-bold text-[#344F1F] mb-3">学外の方</h2>
              <p className="text-[#344F1F]/65 text-sm leading-relaxed flex-1 mb-8">
                企業の方、報道関係の方、その他学外からのご質問・ご意見は、東京工科大学の代表お問い合わせ窓口よりご連絡ください。
              </p>
              <a
                href="https://www.teu.ac.jp/gaiyou/006493.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#344F1F] hover:bg-[#2a3f18] text-white text-sm font-bold px-6 py-3 rounded-full transition-colors"
              >
                代表お問い合わせ窓口
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* 学内の方 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col bg-white rounded-2xl shadow-md border border-[#344F1F]/10 overflow-hidden"
          >
            <div className="h-1.5 bg-[#F4991A]" />
            <div className="flex flex-col flex-1 p-8">
              <div className="w-12 h-12 rounded-full bg-[#F4991A]/10 flex items-center justify-center mb-5">
                <GraduationCap className="w-6 h-6 text-[#F4991A]" />
              </div>
              <h2 className="text-xl font-bold text-[#344F1F] mb-3">学内の方</h2>
              <p className="text-[#344F1F]/65 text-sm leading-relaxed flex-1 mb-8">
                研究室見学をご希望の方、または研究内容についてご質問のある方は、以下のGoogleフォームよりお問い合わせください。
              </p>
              <a
                href="https://forms.gle/aA6TUJNW3J6BV7Aa8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#F4991A] hover:bg-[#D88615] text-white text-sm font-bold px-6 py-3 rounded-full transition-colors"
              >
                Googleフォーム
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
