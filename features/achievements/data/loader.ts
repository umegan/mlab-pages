import { Publication, PublicationMetadata } from '../types';

type PublicationMetadataModule = PublicationMetadata | { default: PublicationMetadata };
const YEAR_MONTH_REGEX = /((?:19|20)\d{2})[./-](\d{1,2})/;
const YEAR_MONTH_JA_REGEX = /((?:19|20)\d{2})年(\d{1,2})月/;
const YEAR_REGEX = /((?:19|20)\d{2})/;

function extractPublicationId(filePath: string): string {
  const normalizedPath = filePath.replace(/\\/g, '/');

  if (!normalizedPath.startsWith('./publications/') || !normalizedPath.endsWith('/metadata.json')) {
    throw new Error(`Invalid publication metadata path: ${filePath}`);
  }

  const pathSegments = normalizedPath.split('/');
  if (pathSegments.length < 4) {
    throw new Error(`Invalid publication metadata path: ${filePath}`);
  }

  // Support both:
  // - ./publications/<id>/metadata.json
  // - ./publications/<year>/<id>/metadata.json
  const publicationId = pathSegments[pathSegments.length - 2];
  if (!publicationId) {
    throw new Error(`Invalid publication metadata path: ${filePath}`);
  }

  return publicationId;
}

function unwrapMetadata(moduleValue: PublicationMetadataModule): PublicationMetadata {
  if ('default' in moduleValue) {
    return moduleValue.default;
  }
  return moduleValue;
}

function extractPublishedYearMonth(metadata: PublicationMetadata): { year: number; month: number } {
  const dateRaw = metadata.published_at?.trim() || metadata.year_raw?.trim() || '';

  const yearMonthMatch = dateRaw.match(YEAR_MONTH_REGEX);
  if (yearMonthMatch) {
    const year = Number.parseInt(yearMonthMatch[1], 10);
    const month = Number.parseInt(yearMonthMatch[2], 10);
    if (month >= 1 && month <= 12) {
      return { year, month };
    }
    return { year, month: 0 };
  }

  const yearMonthJaMatch = dateRaw.match(YEAR_MONTH_JA_REGEX);
  if (yearMonthJaMatch) {
    const year = Number.parseInt(yearMonthJaMatch[1], 10);
    const month = Number.parseInt(yearMonthJaMatch[2], 10);
    if (month >= 1 && month <= 12) {
      return { year, month };
    }
    return { year, month: 0 };
  }

  const yearMatch = dateRaw.match(YEAR_REGEX);
  if (yearMatch) {
    return { year: Number.parseInt(yearMatch[1], 10), month: 0 };
  }

  return { year: metadata.year, month: 0 };
}

const publicationMetadataModules = import.meta.glob('./publications/**/metadata.json', {
  eager: true,
}) as Record<string, PublicationMetadataModule>;

const publicationMetadataById: Record<string, PublicationMetadata> = {};

for (const [path, moduleValue] of Object.entries(publicationMetadataModules)) {
  const publicationId = extractPublicationId(path);
  if (publicationMetadataById[publicationId]) {
    throw new Error(
      `Duplicate publication ID detected: '${publicationId}'. Please ensure IDs are unique.`,
    );
  }
  publicationMetadataById[publicationId] = unwrapMetadata(moduleValue);
}

const RECENT_YEAR_COUNT = 4;

/**
 * Get all publications
 */
export function getAllPublications(): Publication[] {
  const publications: Publication[] = [];

  for (const [id, metadata] of Object.entries(publicationMetadataById)) {
    // Exclude drafts
    if (metadata.draft) continue;

    publications.push({
      id,
      ...metadata,
    });
  }

  // Sort by published date (newest first). If month is unknown, treat as month 0.
  // Then sort by ID for stable order.
  return publications.sort((a, b) => {
    const aDate = extractPublishedYearMonth(a);
    const bDate = extractPublishedYearMonth(b);

    if (bDate.year !== aDate.year) {
      return bDate.year - aDate.year;
    }
    if (bDate.month !== aDate.month) {
      return bDate.month - aDate.month;
    }
    return b.id.localeCompare(a.id);
  });
}

/**
 * Build year filter options based on the latest publication year.
 * Result format: ['All', latest, latest-1, latest-2, latest-3, `Prior to ${latest-3}`]
 */
export function getYearFilterOptions(pubs: Publication[]): string[] {
  if (pubs.length === 0) {
    return ['All'];
  }

  const latestYear = Math.max(...pubs.map(pub => pub.year));
  const recentYears = Array.from(
    { length: RECENT_YEAR_COUNT },
    (_, index) => (latestYear - index).toString(),
  );
  const priorBoundaryYear = latestYear - (RECENT_YEAR_COUNT - 1);

  return ['All', ...recentYears, `Prior to ${priorBoundaryYear}`];
}

/**
 * Get publication by ID
 */
export function getPublicationById(id: string): Publication | null {
  const metadata = publicationMetadataById[id];
  if (!metadata) return null;

  return {
    id,
    ...metadata,
  };
}

/**
 * Filter by year
 */
export function filterByYear(pubs: Publication[], selectedYear: string): Publication[] {
  if (selectedYear === 'All') return pubs;

  const priorMatch = selectedYear.match(/^Prior to (\d{4})$/);
  if (priorMatch) {
    const boundaryYear = Number.parseInt(priorMatch[1], 10);
    return pubs.filter(pub => pub.year < boundaryYear);
  }

  return pubs.filter(pub => pub.year.toString() === selectedYear);
}

/**
 * Filter by tags
 */
export function filterByTags(pubs: Publication[], selectedTags: string[]): Publication[] {
  if (selectedTags.length === 0) return pubs;
  return pubs.filter(pub => pub.tags && selectedTags.some(tag => pub.tags!.includes(tag)));
}

/**
 * Filter by type
 */
export function filterByType(pubs: Publication[], type: Publication['type']): Publication[] {
  return pubs.filter(pub => pub.type === type);
}

/**
 * Get award-winning publications only
 */
export function getAwardPublications(): Publication[] {
  return getAllPublications().filter(pub => pub.award);
}
