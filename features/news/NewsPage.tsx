import { useState, useMemo } from 'react';
import { ArrowRight, ExternalLink, Search, Filter } from 'lucide-react';
import { getAllNews } from './data/loader';
import { categoryColors } from './types';
import { Button } from '../../components/ui/button';

interface NewsPageProps {
  onSelectNews?: (id: string) => void;
}

export const NewsPage = ({ onSelectNews }: NewsPageProps) => {
  const allNews = getAllNews();
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique categories and years
  const categories = useMemo(() => {
    const cats = Array.from(new Set(allNews.map(item => item.category)));
    return ['All', ...cats];
  }, [allNews]);

  const years = useMemo(() => {
    const yrs = Array.from(new Set(allNews.map(item => parseInt(item.date.split('.')[0]))));
    return ['All', ...yrs.sort((a, b) => b - a)];
  }, [allNews]);

  // Filter logic
  const filteredNews = useMemo(() => {
    return allNews.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const itemYear = parseInt(item.date.split('.')[0]);
      const matchesYear = selectedYear === 'All' || itemYear === parseInt(selectedYear);
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.summary?.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesYear && matchesSearch;
    });
  }, [allNews, selectedCategory, selectedYear, searchQuery]);

  const handleNewsClick = (id: string, fallbackLink?: string) => {
    if (onSelectNews) {
      onSelectNews(id);
      return;
    }
    if (fallbackLink) {
      window.open(fallbackLink, '_blank', 'noopener,noreferrer');
    }
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedYear('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen pt-28 bg-[#F9F5F0]">
      {/* Header */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 border-b border-[#344F1F]/10 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#344F1F] mb-4">News & Topics</h1>
          <p className="text-lg text-[#344F1F]/70">研究室の最新情報をお届けします</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-[#344F1F]/10 sticky top-20 z-30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 border-[#344F1F]/20 hover:border-[#F4991A] hover:text-[#F4991A] focus:ring-2 focus:ring-[#F4991A]"
            >
              <Filter className="w-4 h-4" />
              <span>フィルター {selectedCategory !== 'All' || selectedYear !== 'All' ? '(適用中)' : ''}</span>
            </Button>
          </div>

          {/* Filter Controls */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-4 lg:space-y-0`}>
            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#344F1F]/50" />
                <input
                  type="text"
                  placeholder="ニュースを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#344F1F]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4991A] focus:border-transparent"
                />
              </div>
            </div>

            {/* Category and Year Filters */}
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Category Filter */}
                <div className="flex-1">
                  <label className="block text-sm font-bold text-[#344F1F] mb-2">カテゴリー</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all focus:ring-2 focus:ring-[#F4991A] focus:ring-offset-1 ${
                          selectedCategory === cat
                            ? 'bg-[#F4991A] text-white'
                            : 'bg-[#F2EAD3] text-[#344F1F] hover:bg-[#F4991A]/20'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year Filter */}
                <div className="lg:w-48">
                  <label className="block text-sm font-bold text-[#344F1F] mb-2">年度</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-4 py-2 border border-[#344F1F]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4991A] focus:border-transparent bg-white"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year === 'All' ? 'すべて' : `${year}年`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reset Button */}
              {(selectedCategory !== 'All' || selectedYear !== 'All' || searchQuery !== '') && (
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="border-[#344F1F]/20 hover:border-[#F4991A] hover:text-[#F4991A] focus:ring-2 focus:ring-[#F4991A]"
                >
                  リセット
                </Button>
              )}
            </div>

            {/* Results Count */}
            <div className="text-sm text-[#344F1F]/70 pt-2">
              {filteredNews.length}件のニュース
            </div>
          </div>
        </div>
      </div>

      {/* News List */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredNews.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-[#344F1F]/70">該当するニュースが見つかりませんでした</p>
            <Button
              onClick={resetFilters}
              className="mt-6 bg-[#F4991A] hover:bg-[#D88615] text-white focus:ring-2 focus:ring-[#F4991A]"
            >
              フィルターをリセット
            </Button>
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredNews.map((item, index) => {
              const isClickable = Boolean(onSelectNews || item.link);
              return (
                <div key={item.id}>
                <div 
                  className={`group flex flex-col md:flex-row items-start md:items-center py-8 hover:bg-[#F2EAD3]/30 transition-colors px-4 -mx-4 rounded-lg ${
                    isClickable ? 'cursor-pointer' : 'cursor-default'
                  } focus-within:ring-2 focus-within:ring-[#F4991A] focus-within:ring-offset-2`}
                  onClick={() => isClickable && handleNewsClick(item.id, item.link)}
                  tabIndex={isClickable ? 0 : undefined}
                  onKeyDown={(event) => {
                    if (!isClickable) return;
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleNewsClick(item.id, item.link);
                    }
                  }}
                >
                  {/* Date */}
                  <div className="w-32 flex-shrink-0 mb-2 md:mb-0">
                    <span className="text-[#344F1F] font-bold font-mono text-lg">{item.date}</span>
                  </div>
                  
                  {/* Category Tag */}
                  <div className="w-32 flex-shrink-0 mb-3 md:mb-0">
                    <span className={`inline-block px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider ${
                      categoryColors[item.category]
                    }`}>
                      {item.category}
                    </span>
                  </div>

                  {/* Title and Summary */}
                  <div className="flex-grow">
                    <h3 className={`text-[#344F1F] font-medium text-xl transition-colors leading-tight mb-1 ${
                      isClickable ? 'group-hover:text-[#F4991A]' : ''
                    }`}>
                      {item.title}
                    </h3>
                    {item.summary && (
                      <p className="text-sm text-[#344F1F]/70 mt-2">{item.summary}</p>
                    )}
                  </div>

                  {/* Arrow - Only show if link exists */}
                  {isClickable && (
                    <div className="hidden md:flex w-8 items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-[#F4991A]">
                      <ArrowRight className="w-5 h-5" />
                      {item.link && <ExternalLink className="w-4 h-4" />}
                    </div>
                  )}
                </div>
                {item.link && (
                  <div className="mt-2 flex justify-end">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[#344F1F]/70 hover:text-[#F4991A] transition-colors"
                      onClick={(event) => event.stopPropagation()}
                    >
                      外部リンク
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
                {/* Divider */}
                {index < filteredNews.length - 1 && (
                  <div className="h-px w-full bg-[#344F1F]/10"></div>
                )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
