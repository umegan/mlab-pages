import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../../components/ui/button';
import { MapPin, Mail, Phone, Clock, HelpCircle, ChevronDown, ChevronUp, Users, Briefcase, GraduationCap } from 'lucide-react';

const faqs = [
  {
    question: '研究室への配属を希望する学生です。どうすれば良いですか？',
    answer: '研究室配属を希望する学生の方は、まず下記の「学生志望者向け」のメールアドレスにお問い合わせください。研究室見学も随時受け付けています。',
  },
  {
    question: '共同研究や技術相談を検討しています。',
    answer: '企業・研究機関の方からの共同研究のご相談は、「共同研究・産学連携」のメールアドレスまでお問い合わせください。',
  },
  {
    question: 'セミナーや講演の依頼は可能ですか？',
    answer: 'はい、可能です。一般問い合わせのメールアドレスまたは教員の直接のメールアドレスにご連絡ください。',
  },
  {
    question: '研究室見学は可能ですか？',
    answer: 'はい、事前予約制で研究室見学を受け付けています。学生志望者向けのメールアドレスにご希望日時を記載の上、お問い合わせください。',
  },
];

const contactPurposes = [
  {
    icon: GraduationCap,
    title: '学生志望者向け',
    description: '研究室配属・進学を希望する学生の方',
    email: 'admission@matsuoka-lab.example.ac.jp',
  },
  {
    icon: Briefcase,
    title: '共同研究・産学連携',
    description: '企業・研究機関からのお問い合わせ',
    email: 'collaboration@matsuoka-lab.example.ac.jp',
  },
  {
    icon: Users,
    title: '一般問い合わせ',
    description: 'その他のお問い合わせ',
    email: 'contact@matsuoka-lab.example.ac.jp',
  },
];

export const ContactPage = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'general',
    message: '',
  });

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    alert('お問い合わせフォームの送信機能は実装中です。直接メールアドレスにご連絡ください。');
  };

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
            <p className="text-lg text-[#344F1F]/70">
              Contact Us / 研究室へのお問い合わせはこちら
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Purpose-based Contact */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#344F1F] mb-8"
          >
            目的別お問い合わせ先
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactPurposes.map((purpose, index) => {
              const Icon = purpose.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-[#344F1F]/10 group"
                >
                  <div className="w-12 h-12 bg-[#F4991A]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#F4991A]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#F4991A]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#344F1F] mb-2 group-hover:text-[#F4991A] transition-colors">
                    {purpose.title}
                  </h3>
                  <p className="text-[#344F1F]/70 text-sm mb-4">{purpose.description}</p>
                  <a
                    href={`mailto:${purpose.email}`}
                    className="text-[#F4991A] font-medium hover:underline break-all focus:outline-none focus:ring-2 focus:ring-[#F4991A] rounded px-1"
                  >
                    {purpose.email}
                  </a>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Lab Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Contact Info */}
          <section>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-[#344F1F] mb-8"
            >
              研究室情報
            </motion.h2>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 p-4 bg-white rounded-lg"
              >
                <MapPin className="w-6 h-6 text-[#F4991A] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-[#344F1F] mb-1">所在地</h3>
                  <p className="text-[#344F1F]/80">
                    〒100-0001<br />
                    東京都○○区△△ 1-2-3<br />
                    ○○大学 工学部 3号館 5階 503号室
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-start space-x-4 p-4 bg-white rounded-lg"
              >
                <Phone className="w-6 h-6 text-[#F4991A] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-[#344F1F] mb-1">電話番号</h3>
                  <p className="text-[#344F1F]/80">+81 3-1234-5678</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start space-x-4 p-4 bg-white rounded-lg"
              >
                <Clock className="w-6 h-6 text-[#F4991A] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-[#344F1F] mb-1">アクセス可能時間</h3>
                  <p className="text-[#344F1F]/80">
                    平日 9:00 - 18:00<br />
                    （祝日・夏季休暇・年末年始を除く）
                  </p>
                  <p className="text-sm text-[#F4991A] mt-2">
                    ※ 研究室見学は事前予約制です
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 w-full h-64 bg-[#F2EAD3] border border-[#344F1F]/20 rounded-lg flex items-center justify-center"
            >
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#344F1F]/30 mx-auto mb-2" />
                <span className="text-[#344F1F]/50 font-medium">Google Maps連携エリア</span>
              </div>
            </motion.div>
          </section>

          {/* Right: FAQ */}
          <section>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-[#344F1F] mb-8"
            >
              よくある質問
            </motion.h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg border border-[#344F1F]/10 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F2EAD3]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F4991A]"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <HelpCircle className="w-5 h-5 text-[#F4991A] mt-0.5 flex-shrink-0" />
                      <span className="font-medium text-[#344F1F]">{faq.question}</span>
                    </div>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#344F1F]/70 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#344F1F]/70 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4 pl-12 text-[#344F1F]/80">
                      {faq.answer}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Contact Form */}
        <section className="bg-white p-8 md:p-12 rounded-2xl shadow-md border border-[#344F1F]/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#344F1F] mb-4">
              お問い合わせフォーム
            </h2>
            <p className="text-[#344F1F]/70 mb-8">
              以下のフォームからもお問い合わせいただけます。
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-[#344F1F] mb-2">
                  お名前 *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-[#344F1F]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4991A] focus:border-transparent"
                  placeholder="山田 太郎"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#344F1F] mb-2">
                  メールアドレス *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-[#344F1F]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4991A] focus:border-transparent"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="purpose" className="block text-sm font-bold text-[#344F1F] mb-2">
                  お問い合わせの種類 *
                </label>
                <select
                  id="purpose"
                  required
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-4 py-3 border border-[#344F1F]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4991A] focus:border-transparent bg-white"
                >
                  <option value="general">一般問い合わせ</option>
                  <option value="admission">研究室配属・進学希望</option>
                  <option value="collaboration">共同研究・産学連携</option>
                  <option value="seminar">セミナー・講演依頼</option>
                  <option value="visit">研究室見学</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-[#344F1F] mb-2">
                  お問い合わせ内容 *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-[#344F1F]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4991A] focus:border-transparent resize-none"
                  placeholder="お問い合わせ内容をご記入ください"
                ></textarea>
              </div>

              <Button
                type="submit"
                className="w-full md:w-auto bg-[#F4991A] hover:bg-[#D88615] text-white px-8 py-4 text-lg font-bold rounded-full focus:ring-2 focus:ring-[#F4991A] focus:ring-offset-2"
              >
                送信する
              </Button>

              <p className="text-sm text-[#344F1F]/60 mt-4">
                ※ 送信いただいた内容は、数日以内に確認の上、ご返信いたします。
              </p>
            </form>
          </motion.div>
        </section>
      </div>
    </div>
  );
};
