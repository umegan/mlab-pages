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

const publicationsDataMap: Record<string, PublicationMetadata> = Object.fromEntries(
  Object.entries(publicationMetadataModules).map(([path, moduleValue]) => [
    extractPublicationId(path),
    unwrapMetadata(moduleValue),
  ]),
);

/**
 * Get all publications
 */
export function getAllPublications(): Publication[] {
  const publications: Publication[] = [];

  for (const [id, metadata] of Object.entries(publicationsDataMap)) {
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
 * Get publication by ID
 */
export function getPublicationById(id: string): Publication | null {
  const metadata = publicationsDataMap[id];
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
  if (selectedYear === 'Prior to 2021') {
    return pubs.filter(pub => pub.year <= 2021);
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
