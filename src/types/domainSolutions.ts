export interface DomainChallenge {
  title: string;
  description: string;
  impact: string;
}

export interface DomainArchitecturePoint {
  title: string;
  description: string;
  technologies: string[];
}

export interface DomainFeature {
  title: string;
  description: string;
  icon: string;
}

export interface DomainProcessStep {
  step: number;
  title: string;
  description: string;
  output: string;
}

export interface DomainMetric {
  value: string;
  label: string;
  detail: string;
}

export interface RelatedItem {
  title: string;
  description: string;
  href: string;
  tag: string;
}

export interface DomainSolutionData {
  slug: string;
  route: string;
  eyebrow: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  partnerBadges: string[];
  metrics: DomainMetric[];
  challenges: DomainChallenge[];
  architectureOverview: {
    heading: string;
    description: string;
    points: DomainArchitecturePoint[];
    diagramNote?: string;
  };
  features: DomainFeature[];
  workflowSteps: DomainProcessStep[];
  relatedSolutions: RelatedItem[];
  caseStudy?: {
    category: string;
    title: string;
    quote: string;
    designation: string;
    href: string;
  };
}

