import { Publication, PublicationMetadata } from '../types';

type PublicationMetadataModule = PublicationMetadata | { default: PublicationMetadata };

function extractPublicationId(filePath: string): string {
  const match = filePath.match(/^\.\/publications\/([^/]+)\/metadata\.json$/);
  if (!match) {
    throw new Error(`Invalid publication metadata path: ${filePath}`);
  }
  return match[1];
}

function unwrapMetadata(moduleValue: PublicationMetadataModule): PublicationMetadata {
  if ('default' in moduleValue) {
    return moduleValue.default;
  }
  return moduleValue;
}

const publicationMetadataModules = import.meta.glob('./publications/*/metadata.json', {
  eager: true,
}) as Record<string, PublicationMetadataModule>;

const publicationMetadataById: Record<string, PublicationMetadata> = Object.fromEntries(
  Object.entries(publicationMetadataModules).map(([path, moduleValue]) => [
    extractPublicationId(path),
    unwrapMetadata(moduleValue),
  ]),
);

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

  // Sort by year (newest first), then by ID for stable order
  return publications.sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year;
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
