export interface PartnerStatement {
  badge: string;
  name: string;
  level: string;
  description: string;
}

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  detail: string;
  requiresVerification: boolean;
  sourceNote?: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  description: string;
  capabilities: string[];
  businessImpact: string;
  ctaText: string;
  ctaTarget: string;
  highlight?: boolean;
}

export interface ExpertiseArea {
  id: string;
  title: string;
  category: string;
  iconName: string;
  deliverables: string[];
  impactItems: string[];
}

export interface IndustryItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  painPoints: string;
  deliveredSolution: string;
  keyOutcomes: string[];
}

export interface ProcessStepItem {
  step: string;
  title: string;
  timeframe: string;
  description: string;
  deliverables: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  authorRole: string;
  companyContext: string;
  verifiedClaim: boolean;
  claimNote?: string;
  rating?: number;
}

export interface CaseStudyItem {
  id: string;
  sector: string;
  timeframeOrSpeed: string;
  headlineMetric: string;
  summary: string;
  requiresVerification: boolean;
}

export interface ContactFormData {
  fullName: string;
  companyName: string;
  workEmail: string;
  phoneNumber: string;
  areaOfInterest: string;
  message: string;
}
