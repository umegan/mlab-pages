import { useState, useMemo, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { FileText, Filter, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllPublications, getYearFilterOptions, filterByYear, filterByTags } from './data/loader';
import { TECH_TAGS } from './types';

const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export const AchievementsPage = () => {
  const allPublications = useMemo(() => getAllPublications(), []);
  const yearFilterOptions = useMemo(() => getYearFilterOptions(allPublications), [allPublications]);
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const filteredPublications = useMemo(() => {
    let filtered = allPublications;
    filtered = filterByYear(filtered, selectedYear);
    filtered = filterByTags(filtered, selectedTags);
    return filtered;
  }, [allPublications, selectedYear, selectedTags]);

  const totalPages = Math.max(1, Math.ceil(filteredPublications.length / pageSize));
  const pageStartIndex = (currentPage - 1) * pageSize;
  const pageEndIndex = pageStartIndex + pageSize;

  const paginatedPublications = useMemo(() => {
    return filteredPublications.slice(pageStartIndex, pageEndIndex);
  }, [filteredPublications, pageStartIndex, pageEndIndex]);

  const visiblePageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages: number[] = [1];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) pages.push(-1);
    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }
    if (end < totalPages - 1) pages.push(-2);

    pages.push(totalPages);
    return pages;
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedYear, selectedTags, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen pt-20 bg-[#F9F5F0]">
      {/* Page Title Section */}
      <div className="bg-[#F9F5F0] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#344F1F]/10">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#344F1F] mb-4">研究業績 (Achievements)</h1>
          <p className="text-[#344F1F]/70 text-lg">学生による発表論文・著書・受賞などの一覧です。</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4 flex-shrink-0 space-y-8">
            {/* Year Filter */}
            <div>
              <h3 className="flex items-center text-lg font-bold text-[#344F1F] mb-4">
                <Filter className="w-5 h-5 mr-2" />
                発表年 (Year)
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {yearFilterOptions.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors text-left
                      ${selectedYear === year 
                        ? 'bg-[#F4991A] text-white' 
                        : 'bg-[#F2EAD3] text-[#344F1F] hover:bg-[#E0D5B5]'
                      }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Technology Type Filter */}
            <div>
              <h3 className="text-lg font-bold text-[#344F1F] mb-4">
                技術分野 (Technology)
              </h3>
              <div className="space-y-3">
                {TECH_TAGS.map(tag => (
                  <label key={tag} className="flex items-center space-x-3 cursor-pointer group">
                    <div 
                      className={`w-5 h-5 border rounded flex items-center justify-center transition-colors
                        ${selectedTags.includes(tag)
                          ? 'bg-[#F4991A] border-[#F4991A]'
                          : 'bg-white border-[#344F1F]/30 group-hover:border-[#F4991A]'
                        }`}
                      onClick={(e) => {
                          e.preventDefault();
                          toggleTag(tag);
                      }}
                    >
                      {selectedTags.includes(tag) && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span 
                        className={`text-[#344F1F] group-hover:text-[#F4991A] transition-colors ${selectedTags.includes(tag) ? 'font-bold' : ''}`}
                        onClick={() => toggleTag(tag)}
                    >
                        {tag}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Publications List */}
          <div className="w-full lg:w-3/4">
            <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-[#344F1F]/60 text-sm">
                <span>
                  {filteredPublications.length > 0
                    ? `Showing ${pageStartIndex + 1}-${Math.min(pageEndIndex, filteredPublications.length)} of ${filteredPublications.length} results`
                    : 'Showing 0 results'}
                </span>
                <div className="flex items-center gap-2">
                  <label htmlFor="page-size-select" className="text-[#344F1F]/70">Per page:</label>
                  <select
                    id="page-size-select"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number.parseInt(e.target.value, 10))}
                    className="bg-white border border-[#344F1F]/20 rounded-md px-2 py-1 text-[#344F1F] focus:outline-none focus:ring-2 focus:ring-[#F4991A]/40"
                  >
                    {PAGE_SIZE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
            </div>

            <div className="space-y-6">
              {filteredPublications.length > 0 ? (
                paginatedPublications.map(pub => (
                  <div key={pub.id} className="bg-white p-6 md:p-8 border-b border-[#344F1F]/20 hover:border-[#F4991A] transition-colors group">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="flex-grow">
                            <h3 className="text-xl font-bold text-[#344F1F] mb-2 leading-tight group-hover:text-[#F4991A] transition-colors">
                                {pub.title}
                            </h3>
                            <p className="text-[#344F1F]/80 mb-2">{pub.authors}</p>
                            <p className="text-[#344F1F]/60 italic mb-4 text-sm">{pub.venue}</p>
                            
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="font-mono font-bold text-[#344F1F]">{pub.year}</span>
                                <div className="h-4 w-px bg-[#344F1F]/20"></div>
                                {(pub.tags ?? []).map(tag => (
                                    <span key={tag} className="bg-[#F2EAD3] text-[#344F1F] text-xs px-2 py-1 rounded-full font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex-shrink-0 mt-4 md:mt-0">
                             <Button 
                                variant="ghost" 
                                className="text-[#F4991A] hover:text-[#D88615] hover:bg-[#F2EAD3]/30 font-bold p-0 h-auto flex items-center gap-2"
                            >
                                <FileText className="w-5 h-5" />
                                <span className="underline decoration-2 underline-offset-4">View Paper</span>
                            </Button>
                        </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-[#F2EAD3]/30 border border-dashed border-[#344F1F]/20 rounded-lg">
                    <p className="text-[#344F1F]/60">No publications found matching your filters.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-16 flex justify-center items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="p-2 text-[#344F1F] hover:text-[#F4991A] disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    {visiblePageNumbers.map((num, index) => (
                        num < 0 ? (
                          <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-[#344F1F]/60">
                            ...
                          </span>
                        ) : (
                          <button
                            key={num}
                            onClick={() => setCurrentPage(num)}
                            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-colors ${
                                num === currentPage
                                ? 'bg-[#F4991A] text-white'
                                : 'text-[#344F1F] hover:bg-[#F2EAD3]'
                            }`}
                          >
                            {num}
                          </button>
                        )
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 text-[#344F1F] hover:text-[#F4991A] disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
