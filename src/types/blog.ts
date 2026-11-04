export type BlogCategory =
  | 'SAP Business One'
  | 'ERP & Digital Transformation'
  | 'Boyum IT Solutions'
  | 'UiPath & Intelligent Automation'
  | 'Manufacturing'
  | 'Warehouse & Logistics'
  | 'Trading & Shipping'
  | 'Business Technology';

export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface BlogTableOfContentItem {
  id: string;
  title: string;
}

export interface BlogContentSection {
  id: string;
  title: string;
  paragraphs: string[];
  keyTakeaway?: string;
  bullets?: string[];
  callout?: {
    type: 'tip' | 'info' | 'highlight';
    title: string;
    text: string;
  };
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  coverImage: string;
  publishDate: string;
  readTime: string;
  author: BlogAuthor;
  isFeatured?: boolean;
  tableOfContents: BlogTableOfContentItem[];
  sections: BlogContentSection[];
  relatedSlugs: string[];
  tags: string[];
}

