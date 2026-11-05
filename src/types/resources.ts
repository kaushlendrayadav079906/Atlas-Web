export interface SapGuideItem {
  id: string;
  slug: string;
  title: string;
  category: 'Fundamentals' | 'Implementation' | 'HANA Migration' | 'Inventory & Logistics' | 'Finance & Tax' | 'Integrations';
  summary: string;
  readTime: string;
  targetAudience: string;
  documentType: 'Interactive Architecture Blueprint' | 'Implementation Methodology' | 'Migration Checklist' | 'Workflow Standard';
  isOfficialWhitepaperAvailable: boolean;
  whitepaperNote: string;
  topicsCovered: string[];
  keyHighlights: {
    title: string;
    description: string;
  }[];
  prerequisites?: string[];
  implementationSteps?: string[];
  recommendedSolutions: {
    name: string;
    href: string;
  }[];
}

export interface IndustryInsightItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  sector: 'Manufacturing' | 'Warehouse & Logistics' | 'Finance & Compliance' | 'Trading & Shipping';
  icon: string;
  readTime: string;
  heroImage: string;
  challengeSummary: string;
  solutionArchitecture: string;
  keyBenefits: string[];
  operationalMetrics: {
    value: string;
    label: string;
  }[];
  relatedServices: {
    name: string;
    href: string;
    description: string;
  }[];
  caseStudyRef?: {
    title: string;
    href: string;
  };
}

export type FaqCategory =
  | 'SAP Business One'
  | 'Implementation & Migration'
  | 'Boyum IT'
  | 'UiPath RPA & AI'
  | 'Support & Maintenance'
  | 'Consultation & Contact';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  tags?: string[];
  relatedLink?: {
    text: string;
    href: string;
  };
}

