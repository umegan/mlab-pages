import { ExternalLink, Mail, Info } from 'lucide-react';

export const ContactPage = () => {
  // TODO: 実際のメールアドレスに差し替えてください。
  const matsuokaEmail = 'matsuokajh@stf.teu.ac.jp';

  return (
    <div className="min-h-screen pt-28 bg-[#F9F5F0]">
      <div className="py-12 px-4 sm:px-6 lg:px-8 border-b border-[#344F1F]/10 bg-white">
        <div className="max-w-[960px] mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#344F1F] mb-4">お問い合わせ</h1>
          <p className="text-lg text-[#344F1F]/70">Contact (Temporary)</p>
        </div>
      </div>

      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <section className="bg-white border border-[#344F1F]/15 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-[#344F1F]" />
            <h2 className="text-2xl font-bold text-[#344F1F]">研究室へのお問い合わせ</h2>
          </div>
          <p className="text-[#344F1F]/80 leading-relaxed mb-3">
            研究室へのお問い合わせは、松岡先生にご連絡ください。
          </p>
          <p className="text-[#344F1F] font-semibold break-all">
            メールアドレス: {matsuokaEmail}
          </p>
        </section>

        <section className="bg-white border border-[#344F1F]/15 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-[#344F1F]" />
            <h2 className="text-2xl font-bold text-[#344F1F]">東京工科大学へのお問い合わせ</h2>
          </div>
          <p className="text-[#344F1F]/80 leading-relaxed mb-6">
            大学全体に関するお問い合わせは、東京工科大学の公式お問い合わせ窓口をご利用ください。
          </p>
          <a
            href="https://www.teu.ac.jp/gaiyou/006493.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#344F1F] hover:bg-[#2a3f18] text-white font-bold px-6 py-3 rounded-full transition-colors"
          >
            東京工科大学 お問い合わせ窓口
            <ExternalLink className="w-4 h-4" />
          </a>
        </section>
      </div>
    </div>
  );
};
