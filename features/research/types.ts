export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  image: string;
  sortOrder?: number;
  ctaLabel?: string;
  detail?: ResearchProjectDetail;
  relatedPublicationIds?: string[];
  relatedPublicationKeywords?: string[];
}

export interface ResearchProjectReferenceLink {
  label: string;
  url: string;
}

export interface ResearchProjectDetail {
  subtitle?: string;
  grantTitle?: string;
  grantNumber?: string;
  grantCategory?: string;
  keywords?: string[];
  overview?: string;
  progress?: string;
  references?: ResearchProjectReferenceLink[];
}
