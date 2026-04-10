import { useState, useMemo, useEffect, useRef } from 'react';
import { Filter, Check, ChevronLeft, ChevronRight, ChevronDown, X, Award } from 'lucide-react';
import { getAllPublications, getYearFilterOptions, filterByYear, filterByTags } from './data/loader';
import { TECH_TAGS, Publication, PublicationClass } from './types';

const DEFAULT_PAGE_SIZE = 20;
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
const LIST_DENSITY_OPTIONS = [
  { value: 'comfortable', label: '標準' },
  { value: 'compact', label: 'コンパクト' },
] as const;
const JAPANESE_CHARACTER_REGEX = /[\u3040-\u30ff\u3400-\u9fff]/;
const PUBLICATION_CLASS_OPTIONS = [
  { value: 'all', label: 'すべて (All)' },
  { value: 'international_journal', label: '国際論文 (International Journal)' },
  { value: 'international_conference', label: '国際学会 (International Conference)' },
  { value: 'international_workshop', label: '国際ワークショップ (International Workshop)' },
  { value: 'domestic_journal', label: '国内論文 (Domestic Journal)' },
  { value: 'domestic_conference', label: '国内学会 (Domestic Conference)' },
  { value: 'domestic_workshop', label: '国内ワークショップ (Domestic Workshop)' },
  { value: 'other', label: 'その他 (Other)' },
] as const;
type PublicationClassFilter = typeof PUBLICATION_CLASS_OPTIONS[number]['value'];
type ListDensity = typeof LIST_DENSITY_OPTIONS[number]['value'];
const PUBLICATION_CLASS_LABELS: Record<PublicationClass, string> = {
  international_conference: '国際学会 (International Conference)',
  domestic_conference: '国内学会 (Domestic Conference)',
  international_workshop: '国際ワークショップ (International Workshop)',
  domestic_workshop: '国内ワークショップ (Domestic Workshop)',
  international_journal: '国際論文 (International Journal)',
  domestic_journal: '国内論文 (Domestic Journal)',
  other: 'その他 (Other)',
};
const PUBLICATION_CLASS_BADGE: Record<PublicationClass, string> = {
  international_conference: 'Intl Conf.',
  domestic_conference: 'Domestic Conf.',
  international_workshop: 'Intl Workshop',
  domestic_workshop: 'Domestic Workshop',
  international_journal: 'Intl Journal',
  domestic_journal: 'Domestic Journal',
  other: 'Other',
};
const DATE_REGEX_JA = /((?:19|20)\d{2})年(\d{1,2})月(?:\s*(\d{1,2})日)?/;
const DATE_REGEX_FULL = /((?:19|20)\d{2})[./-](\d{1,2})[./-](\d{1,2})(?:-(\d{1,2}))?/;
const DATE_REGEX_YEAR_MONTH = /((?:19|20)\d{2})[./-](\d{1,2})/;
const DATE_REGEX_YEAR = /((?:19|20)\d{2})/;

interface ParsedDateInfo {
  year: number;
  month?: number;
  dayStart?: number;
  dayEnd?: number;
}

function parseDateInfo(rawValue?: string): ParsedDateInfo | null {
  const raw = rawValue?.trim();
  if (!raw) return null;

  const jaMatch = raw.match(DATE_REGEX_JA);
  if (jaMatch) {
    return {
      year: Number.parseInt(jaMatch[1], 10),
      month: Number.parseInt(jaMatch[2], 10),
      dayStart: jaMatch[3] ? Number.parseInt(jaMatch[3], 10) : undefined,
    };
  }

  const fullMatch = raw.match(DATE_REGEX_FULL);
  if (fullMatch) {
    return {
      year: Number.parseInt(fullMatch[1], 10),
      month: Number.parseInt(fullMatch[2], 10),
      dayStart: Number.parseInt(fullMatch[3], 10),
      dayEnd: fullMatch[4] ? Number.parseInt(fullMatch[4], 10) : undefined,
    };
  }

  const yearMonthMatch = raw.match(DATE_REGEX_YEAR_MONTH);
  if (yearMonthMatch) {
    return {
      year: Number.parseInt(yearMonthMatch[1], 10),
      month: Number.parseInt(yearMonthMatch[2], 10),
    };
  }

  const yearMatch = raw.match(DATE_REGEX_YEAR);
  if (yearMatch) {
    return {
      year: Number.parseInt(yearMatch[1], 10),
    };
  }

  return null;
}

function formatParsedDate(info: ParsedDateInfo): string {
  if (!info.month) return `${info.year}年`;
  if (!info.dayStart) return `${info.year}年${info.month}月`;
  if (info.dayEnd && info.dayEnd !== info.dayStart) {
    return `${info.year}年${info.month}月${info.dayStart}日-${info.dayEnd}日`;
  }
  return `${info.year}年${info.month}月${info.dayStart}日`;
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  for (const value of values) {
    const normalized = value?.trim();
    if (normalized) return normalized;
  }
  return undefined;
}

function hasJapaneseText(value: string): boolean {
  return JAPANESE_CHARACTER_REGEX.test(value);
}

function getPublicationClass(publication: Publication): PublicationClass {
  if (publication.publication_class) {
    return publication.publication_class;
  }

  const sourceCategory = publication.source_category?.trim().toLowerCase();
  if (sourceCategory === 'international') {
    if (publication.type === 'workshop') return 'international_workshop';
    if (publication.type === 'journal') return 'international_journal';
    return 'international_conference';
  }
  if (sourceCategory === 'domestic') {
    if (publication.type === 'workshop') return 'domestic_workshop';
    if (publication.type === 'journal') return 'domestic_journal';
    return 'domestic_conference';
  }
  if (sourceCategory === 'other') {
    return publication.type === 'workshop' ? 'domestic_workshop' : 'other';
  }

  const languageReference = `${publication.venue} ${publication.title}`;
  if (sourceCategory === 'paper' || publication.type === 'journal') {
    return hasJapaneseText(languageReference) ? 'domestic_journal' : 'international_journal';
  }

  if (publication.type === 'conference' || publication.type === 'workshop') {
    if (publication.type === 'workshop') {
      return hasJapaneseText(languageReference) ? 'domestic_workshop' : 'international_workshop';
    }
    return hasJapaneseText(languageReference) ? 'domestic_conference' : 'international_conference';
  }

  return 'other';
}

function getDateRaw(publication: Publication): string {
  return firstNonEmpty(publication.published_at, publication.year_raw) ?? '';
}

function getListDateLabel(publication: Publication): string {
  const parsedDate = parseDateInfo(getDateRaw(publication));
  if (!parsedDate) return `${publication.year}`;
  if (!parsedDate.month) return `${parsedDate.year}`;
  return `${parsedDate.year}.${String(parsedDate.month).padStart(2, '0')}`;
}

export const AchievementsPage = () => {
  const allPublications = useMemo(() => getAllPublications(), []);
  const yearFilterOptions = useMemo(() => getYearFilterOptions(allPublications), [allPublications]);
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedPublicationClass, setSelectedPublicationClass] = useState<PublicationClassFilter>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagFilterOpen, setIsTagFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [listDensity, setListDensity] = useState<ListDensity>('comfortable');
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const hasMountedRef = useRef(false);

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
    if (selectedPublicationClass !== 'all') {
      filtered = filtered.filter((publication) => getPublicationClass(publication) === selectedPublicationClass);
    }
    filtered = filterByTags(filtered, selectedTags);
    return filtered;
  }, [allPublications, selectedYear, selectedPublicationClass, selectedTags]);

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
  }, [selectedYear, selectedPublicationClass, selectedTags, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const closeDetailModal = () => {
    setSelectedPublication(null);
  };

  const selectedDateRaw = useMemo(() => {
    if (!selectedPublication) return '';
    return getDateRaw(selectedPublication);
  }, [selectedPublication]);

  const selectedDateParsed = useMemo(() => parseDateInfo(selectedDateRaw), [selectedDateRaw]);
  const selectedPages = useMemo(
    () => firstNonEmpty(selectedPublication?.pages),
    [selectedPublication],
  );
  const selectedNote = useMemo(
    () => firstNonEmpty(selectedPublication?.note),
    [selectedPublication],
  );
  const selectedLink = useMemo(
    () => firstNonEmpty(selectedPublication?.link),
    [selectedPublication],
  );
  const selectedDateDisplay = useMemo(() => {
    if (!selectedPublication) return '';
    if (selectedDateParsed) return formatParsedDate(selectedDateParsed);
    return selectedDateRaw || `${selectedPublication.year}年`;
  }, [selectedPublication, selectedDateParsed, selectedDateRaw]);
  const selectedPublicationClassValue = useMemo<PublicationClass | null>(() => {
    if (!selectedPublication) return null;
    return getPublicationClass(selectedPublication);
  }, [selectedPublication]);
  const selectedOtherFields = useMemo(() => {
    if (!selectedPublication) return [] as Array<{ label: string; value: string }>;
    const candidates: Array<{ label: string; value?: string }> = [
      { label: 'DOI', value: selectedPublication.doi },
      { label: 'arXiv', value: selectedPublication.arxiv },
      { label: 'Code URL', value: selectedPublication.code_url },
      { label: 'Data URL', value: selectedPublication.data_url },
      { label: 'Video', value: selectedPublication.video },
      { label: 'Project', value: selectedPublication.project },
      { label: 'BibTeX', value: selectedPublication.bibtex },
      { label: 'PDF', value: selectedPublication.pdf },
      { label: 'Slides', value: selectedPublication.slides },
      { label: 'Poster', value: selectedPublication.poster },
    ];
    return candidates
      .filter((field): field is { label: string; value: string } => Boolean(field.value?.trim()))
      .map((field) => ({ label: field.label, value: field.value.trim() }));
  }, [selectedPublication]);

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
                業績区分 (Publication Class)
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {PUBLICATION_CLASS_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedPublicationClass(option.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors text-left
                      ${selectedPublicationClass === option.value
                        ? 'bg-[#F4991A] text-white'
                        : 'bg-[#F2EAD3] text-[#344F1F] hover:bg-[#E0D5B5]'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Technology Type Filter */}
            <div>
              <button
                type="button"
                className="lg:hidden w-full flex items-center justify-between text-lg font-bold text-[#344F1F] mb-3 bg-[#F2EAD3] rounded-md px-3 py-2"
                onClick={() => setIsTagFilterOpen(prev => !prev)}
              >
                <span>技術分野 (Technology)</span>
                <span className="flex items-center gap-2 text-sm font-medium text-[#344F1F]/70">
                  {selectedTags.length > 0 ? `${selectedTags.length} selected` : 'filter'}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isTagFilterOpen ? 'rotate-180' : ''}`} />
                </span>
              </button>
              <h3 className="hidden lg:block text-lg font-bold text-[#344F1F] mb-4">
                技術分野 (Technology)
              </h3>
              <div className={`${isTagFilterOpen ? 'space-y-3' : 'hidden'} lg:block lg:space-y-3`}>
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
                <div className="flex items-center gap-2">
                  <label htmlFor="list-density-select" className="text-[#344F1F]/70">表示:</label>
                  <select
                    id="list-density-select"
                    value={listDensity}
                    onChange={(e) => setListDensity(e.target.value as ListDensity)}
                    className="bg-white border border-[#344F1F]/20 rounded-md px-2 py-1 text-[#344F1F] focus:outline-none focus:ring-2 focus:ring-[#F4991A]/40"
                  >
                    {LIST_DENSITY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
            </div>

            <div className={listDensity === 'compact' ? 'space-y-3' : 'space-y-6'}>
              {filteredPublications.length > 0 ? (
                paginatedPublications.map(pub => (
                  <button
                    key={pub.id}
                    type="button"
                    onClick={() => setSelectedPublication(pub)}
                    className={`w-full text-left bg-white border-b border-[#344F1F]/20 hover:border-[#F4991A] transition-colors group cursor-pointer ${
                      listDensity === 'compact' ? 'p-3 md:p-4' : 'p-6 md:p-8'
                    }`}
                  >
                    <div>
                        <h3 className={`font-bold text-[#344F1F] leading-tight group-hover:text-[#F4991A] transition-colors ${
                          listDensity === 'compact' ? 'text-lg mb-1' : 'text-xl mb-2'
                        }`}>
                            {pub.title}
                        </h3>
                        <p className={`text-[#344F1F]/80 ${listDensity === 'compact' ? 'mb-1 text-sm' : 'mb-2'}`}>{pub.authors}</p>
                        <p className={`text-[#344F1F]/60 italic text-sm ${listDensity === 'compact' ? 'mb-2' : 'mb-4'}`}>{pub.venue}</p>
                        
                        <div className={`flex flex-wrap items-center ${listDensity === 'compact' ? 'gap-2' : 'gap-3'}`}>
                            <span className="font-mono font-bold text-[#344F1F]">{getListDateLabel(pub)}</span>
                            <div className="h-4 w-px bg-[#344F1F]/20"></div>
                            <span className="bg-white border border-[#344F1F]/20 text-[#344F1F] text-xs px-2 py-1 rounded-full font-medium">
                              {PUBLICATION_CLASS_BADGE[getPublicationClass(pub)]}
                            </span>
                            {pub.award?.trim() && (
                                <span
                                  title={pub.award}
                                  className="inline-flex items-center gap-1 bg-[#FFF3D6] text-[#A76200] border border-[#F4991A]/40 text-xs px-2 py-1 rounded-full font-semibold"
                                >
                                  <Award className="w-3.5 h-3.5" />
                                  受賞
                                </span>
                            )}
                            {(pub.tags ?? []).map(tag => (
                                <span key={tag} className="bg-[#F2EAD3] text-[#344F1F] text-xs px-2 py-1 rounded-full font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                  </button>
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

      {selectedPublication && (
        <div
          className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center px-4"
          onClick={closeDetailModal}
        >
          <div
            className="relative w-[94vw] max-w-6xl max-h-[88vh] overflow-y-auto bg-white rounded-xl border border-[#344F1F]/20 shadow-xl p-6 md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeDetailModal}
              className="absolute top-4 right-4 p-2 rounded-full text-[#344F1F]/60 hover:text-[#344F1F] hover:bg-[#F2EAD3] transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl md:text-3xl font-bold text-[#344F1F] mb-3 pr-10">
              {selectedPublication.title}
            </h3>
            <p className="text-[#344F1F]/85 mb-6">{selectedPublication.authors}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-[#F9F5F0] rounded-md px-3 py-2 md:col-span-2 break-all">
                <span className="font-semibold text-[#344F1F]">発行元:</span> {selectedPublication.venue}
              </div>
              {selectedPages && (
                <div className="bg-[#F9F5F0] rounded-md px-3 py-2 md:col-span-2 break-all">
                  <span className="font-semibold text-[#344F1F]">ページ等:</span> {selectedPages}
                </div>
              )}
              {selectedDateDisplay && (
                <div className="bg-[#F9F5F0] rounded-md px-3 py-2 md:col-span-2">
                  <span className="font-semibold text-[#344F1F]">発行・発表日:</span> {selectedDateDisplay}
                </div>
              )}
              <div className="bg-[#F9F5F0] rounded-md px-3 py-2 md:col-span-2 break-all">
                <span className="font-semibold text-[#344F1F]">業績区分:</span>{' '}
                {selectedPublicationClassValue
                  ? PUBLICATION_CLASS_LABELS[selectedPublicationClassValue]
                  : ''}
              </div>
              {selectedNote && (
                <div className="bg-[#F9F5F0] rounded-md px-3 py-2 md:col-span-2 break-all">
                  <span className="font-semibold text-[#344F1F]">備考:</span> {selectedNote}
                </div>
              )}
              {selectedPublication.award && (
                <div className="bg-[#F9F5F0] rounded-md px-3 py-2 md:col-span-2">
                  <span className="font-semibold text-[#344F1F]">受賞:</span> {selectedPublication.award}
                </div>
              )}
              {selectedLink && (
                <div className="bg-[#F9F5F0] rounded-md px-3 py-2 md:col-span-2 break-all">
                  <span className="font-semibold text-[#344F1F]">リンク:</span>{' '}
                  {isHttpUrl(selectedLink) ? (
                    <a
                      href={selectedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1f5aa6] underline underline-offset-2 hover:text-[#16427d]"
                    >
                      {selectedLink}
                    </a>
                  ) : (
                    selectedLink
                  )}
                </div>
              )}
              {selectedPublication.tags && selectedPublication.tags.length > 0 && (
                <div className="bg-[#F9F5F0] rounded-md px-3 py-2 md:col-span-2">
                  <span className="font-semibold text-[#344F1F]">キーワード:</span> {selectedPublication.tags.join(', ')}
                </div>
              )}
            </div>

            {selectedOtherFields.length > 0 && (
              <div className="mt-6">
                <h4 className="text-[#344F1F] font-semibold mb-2">その他</h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {selectedOtherFields.map((field) => {
                    const clickable = isHttpUrl(field.value);
                    return (
                      <div key={field.label} className="bg-[#F9F5F0] rounded-md px-3 py-2 break-all">
                        <span className="font-semibold text-[#344F1F]">{field.label}:</span>{' '}
                        {clickable ? (
                          <a
                            href={field.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1f5aa6] underline underline-offset-2 hover:text-[#16427d]"
                          >
                            {field.value}
                          </a>
                        ) : (
                          <span>{field.value}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedPublication.abstract && (
              <div className="mt-6">
                <h4 className="text-[#344F1F] font-semibold mb-2">Abstract</h4>
                <p className="text-[#344F1F]/80 leading-relaxed whitespace-pre-line">
                  {selectedPublication.abstract}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
