import { motion } from 'motion/react';
import { Calendar, ArrowLeft, ExternalLink, Tag, FileDown } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { getNewsById } from './data/loader';
import { categoryColors, getCategoryIcon } from './types';

interface NewsDetailPageProps {
  newsId: string;
  onNavigate: (page: string) => void;
}

export const NewsDetailPage = ({ newsId, onNavigate }: NewsDetailPageProps) => {
  const item = getNewsById(newsId);

  if (!item) {
    return (
      <div className="min-h-screen pt-28 bg-[#F9F5F0] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#344F1F]/70 text-lg mb-4">記事が見つかりませんでした。</p>
          <button
            onClick={() => onNavigate('news')}
            className="inline-flex items-center gap-2 text-[#F4991A] font-bold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            ニュース一覧に戻る
          </button>
        </div>
      </div>
    );
  }

  const Icon = getCategoryIcon(item.category);
  const allImages = [
    ...(item.image ? [item.image] : []),
    ...(item.images ?? []),
  ];

  return (
    <div className="min-h-screen pt-28 bg-[#F9F5F0]">
      {/* Back navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => onNavigate('news')}
          className="inline-flex items-center gap-2 text-[#344F1F]/70 hover:text-[#F4991A] transition-colors font-bold mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          ニュース一覧に戻る
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Single image */}
          {allImages.length === 1 && (
            <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-8 shadow-md">
              <img src={allImages[0]} alt={item.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* No image fallback */}
          {allImages.length === 0 && (
            <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-8 shadow-md bg-gradient-to-br from-[#344F1F] to-[#4A6B2E] flex items-center justify-center">
              <Icon className="w-24 h-24 text-[#F4991A]" />
            </div>
          )}

          {/* Gallery (2+ images) */}
          {allImages.length >= 2 && (
            <div className="grid grid-cols-2 gap-3 mb-8">
              {allImages.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl overflow-hidden shadow-md ${allImages.length === 2 ? 'h-64 sm:h-80' : 'h-48'}`}
                >
                  <img src={src} alt={`${item.title} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className={`${categoryColors[item.category]} border-0 px-3 py-1 font-bold`}>
              {item.category}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-[#344F1F]/60">
              <Calendar className="w-4 h-4" />
              {item.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-[#344F1F] mb-6 leading-tight">
            {item.title}
          </h1>

          {/* Summary / body */}
          {item.summary && (
            <p className="text-lg text-[#344F1F]/80 leading-relaxed mb-8 border-l-4 border-[#F4991A] pl-5 whitespace-pre-line">
              {item.summary}
            </p>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Tag className="w-4 h-4 text-[#344F1F]/50" />
              {item.tags.map((tag) => (
                <span key={tag} className="text-sm bg-[#F2EAD3] text-[#344F1F] px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Related members */}
          {item.related_members && item.related_members.length > 0 && (
            <div className="mb-8 p-5 bg-white rounded-xl border border-[#344F1F]/10">
              <p className="text-sm font-bold text-[#344F1F]/60 mb-2">関連メンバー</p>
              <p className="text-[#344F1F]">{item.related_members.join('、')}</p>
            </div>
          )}

          {/* PDF download */}
          {item.pdf && (
            <a
              href={item.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#344F1F] hover:bg-[#2a3f18] text-white font-bold px-8 py-4 rounded-full transition-colors mr-4 mb-4"
            >
              <FileDown className="w-5 h-5" />
              概要資料をダウンロード
            </a>
          )}

          {/* External link */}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F4991A] hover:bg-[#D88615] text-white font-bold px-8 py-4 rounded-full transition-colors mb-4"
            >
              詳細・外部リンク
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </motion.article>
      </div>
    </div>
  );
};
