export interface IndustryCardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  fallbackCrop?: string;
  accentColor: string;
  borderColor: string;
  hoverBorderColor: string;
  badgeBg: string;
  badgeText: string;
  iconName: 'factory' | 'truck' | 'boxes' | 'shopping-cart' | 'cog' | 'utensils' | 'pill' | 'flask';
  features: string[];
}

export interface IndustryValueItem {
  id: string;
  title: string;
  description: string;
  iconName: 'cog' | 'trending-up' | 'eye' | 'bar-chart';
  color: string;
}

export interface EngagementStepItem {
  number: number;
  title: string;
  iconName: 'message-square' | 'line-chart' | 'lightbulb' | 'settings' | 'user-check' | 'trending-up';
  color: string;
}

export const INDUSTRIES_HERO_DATA = {
  eyebrow: 'INDUSTRIES WE SERVE —',
  titleStart: 'Industry-Focused Solutions for',
  titleHighlight: 'Real Business Impact',
  description:
    'We understand that every industry has unique challenges. Our solutions are designed to address industry-specific requirements and help businesses achieve greater efficiency, visibility and sustainable growth.',
  primaryCtaText: 'Book a Consultation',
  secondaryCtaText: 'Talk to Our Experts',
  heroImage: '/images/industries/industries_hero_engineer.jpg',
  floatingTitle: 'Technology Solutions for Every Industry',
  floatingBadges: [
    { label: 'Greater Efficiency', color: '#ed861d' },
    { label: 'Better Visibility', color: '#13a9a0' },
    { label: 'Sustainable Growth', color: '#963ee8' }
  ]
};

export const INDUSTRIES_SECTION_HEADER = {
  eyebrow: 'OUR INDUSTRIES —',
  titleStart: 'Solutions Designed Around',
  titleHighlight: 'Your Industry',
  description:
    'We deliver industry-specific solutions using SAP Business One, Boyum IT, UiPath and our proprietary add-ons to help you streamline operations and drive business growth.'
};

export const INDUSTRIES_CARDS_DATA: IndustryCardItem[] = [
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description:
      'Simplify production, inventory and operations with integrated ERP and industry-specific add-ons.',
    image: '/images/industries/ind_manufacturing.jpg',
    fallbackCrop: '/images/industries/ind_manufacturing_crop.jpg',
    accentColor: '#ed861d',
    borderColor: 'border-[#ed861d]',
    hoverBorderColor: 'hover:border-[#ed861d]',
    badgeBg: 'bg-[#ed861d]/10',
    badgeText: 'text-[#ed861d]',
    iconName: 'factory',
    features: ['Production Planning & MRP', 'Shop-Floor Control', 'Bill of Materials (BOM)', 'Machine Maintenance']
  },
  {
    id: 'trading-distribution',
    title: 'Trading & Distribution',
    description:
      'Improve procurement, sales, inventory and supply chain operations.',
    image: '/images/industries/ind_trading.jpg',
    fallbackCrop: '/images/industries/ind_trading_crop.jpg',
    accentColor: '#16a879',
    borderColor: 'border-[#16a879]',
    hoverBorderColor: 'hover:border-[#16a879]',
    badgeBg: 'bg-[#16a879]/10',
    badgeText: 'text-[#16a879]',
    iconName: 'truck',
    features: ['Multi-Warehouse Tracking', 'Sales Order Management', 'Vendor Portal Integration', 'Demand Forecasting']
  },
  {
    id: 'logistics-supply-chain',
    title: 'Logistics & Supply Chain',
    description:
      'Enhance transportation, warehouse and shipment management.',
    image: '/images/industries/ind_logistics.jpg',
    fallbackCrop: '/images/industries/ind_logistics_crop.jpg',
    accentColor: '#963ee8',
    borderColor: 'border-[#963ee8]',
    hoverBorderColor: 'hover:border-[#963ee8]',
    badgeBg: 'bg-[#963ee8]/10',
    badgeText: 'text-[#963ee8]',
    iconName: 'boxes',
    features: ['Fleet & Gate Entry Automation', 'Weighment System Sync', 'Barcode & RFID Handling', 'Freight Optimization']
  },
  {
    id: 'retail-wholesale',
    title: 'Retail & Wholesale',
    description:
      'Get real-time stock visibility and seamless multi-channel sales management.',
    image: '/images/industries/ind_retail.jpg',
    fallbackCrop: '/images/industries/ind_retail_crop.jpg',
    accentColor: '#ef4444',
    borderColor: 'border-[#ef4444]',
    hoverBorderColor: 'hover:border-[#ef4444]',
    badgeBg: 'bg-[#ef4444]/10',
    badgeText: 'text-[#ef4444]',
    iconName: 'shopping-cart',
    features: ['POS Integration', 'Omnichannel Fulfillment', 'Automated Reordering', 'Customer Loyalty Management']
  },
  {
    id: 'engineering-projects',
    title: 'Engineering & Projects',
    description:
      'Manage projects, resources, costing and procurement efficiently.',
    image: '/images/industries/ind_engineering.jpg',
    fallbackCrop: '/images/industries/ind_engineering_crop.jpg',
    accentColor: '#13a9a0',
    borderColor: 'border-[#13a9a0]',
    hoverBorderColor: 'hover:border-[#13a9a0]',
    badgeBg: 'bg-[#13a9a0]/10',
    badgeText: 'text-[#13a9a0]',
    iconName: 'cog',
    features: ['Milestone Project Costing', 'Resource & Manpower Allocation', 'Procurement Control', 'Subcontracting Management']
  },
  {
    id: 'food-beverages',
    title: 'Food & Beverages',
    description:
      'Ensure quality, compliance and end-to-end traceability across the supply chain.',
    image: '/images/industries/ind_food_beverages.jpg',
    fallbackCrop: '/images/industries/ind_food_beverages_crop.jpg',
    accentColor: '#0891b2',
    borderColor: 'border-[#0891b2]',
    hoverBorderColor: 'hover:border-[#0891b2]',
    badgeBg: 'bg-[#0891b2]/10',
    badgeText: 'text-[#0891b2]',
    iconName: 'utensils',
    features: ['Batch & Expiry Traceability', 'Recipe Formulation Management', 'Quality Inspection (QC)', 'Food Safety Compliance']
  },
  {
    id: 'pharmaceuticals',
    title: 'Pharmaceuticals',
    description:
      'Maintain compliance and process efficiency with integrated systems.',
    image: '/images/industries/ind_pharma.jpg',
    fallbackCrop: '/images/industries/ind_pharma_crop.jpg',
    accentColor: '#963ee8',
    borderColor: 'border-[#963ee8]',
    hoverBorderColor: 'hover:border-[#963ee8]',
    badgeBg: 'bg-[#963ee8]/10',
    badgeText: 'text-[#963ee8]',
    iconName: 'pill',
    features: ['cGMP & 21 CFR Part 11 Audit Trail', 'Sample Testing & COA', 'Formula & Batch Release', 'Cold Chain Verification']
  },
  {
    id: 'chemicals-process',
    title: 'Chemicals & Process',
    description:
      'Optimize batch production, inventory and regulatory compliance.',
    image: '/images/industries/ind_chemicals.jpg',
    fallbackCrop: '/images/industries/ind_chemicals_crop.jpg',
    accentColor: '#16a879',
    borderColor: 'border-[#16a879]',
    hoverBorderColor: 'hover:border-[#16a879]',
    badgeBg: 'bg-[#16a879]/10',
    badgeText: 'text-[#16a879]',
    iconName: 'flask',
    features: ['Hazardous Goods Tracking', 'Batch Yield Optimization', 'MSDS & Safety Sheets', 'Regulatory Reporting']
  }
];

export const INDUSTRY_VALUE_DATA = {
  titleStart: 'Industry Value We',
  titleHighlight: 'Deliver',
  description:
    'Our industry-focused approach helps businesses achieve measurable operational improvements.',
  items: [
    {
      id: 'best-practices',
      title: 'Industry Best Practices',
      description: 'Proven solutions aligned with industry processes.',
      iconName: 'cog' as const,
      color: '#ed861d'
    },
    {
      id: 'operational-efficiency',
      title: 'Operational Efficiency',
      description: 'Streamline operations and reduce manual work.',
      iconName: 'trending-up' as const,
      color: '#16a879'
    },
    {
      id: 'end-to-end-visibility',
      title: 'End-to-End Visibility',
      description: 'Real-time insights across the business.',
      iconName: 'eye' as const,
      color: '#963ee8'
    },
    {
      id: 'scalable-growth',
      title: 'Scalable Growth',
      description: 'Flexible solutions to support future expansion.',
      iconName: 'bar-chart' as const,
      color: '#ef4444'
    }
  ]
};

export const INDUSTRY_ENGAGEMENT_DATA = {
  titleStart: 'Our Industry Engagement',
  titleHighlight: 'Model',
  description:
    'We work closely with your team to understand industry requirements and deliver the right solution.',
  steps: [
    {
      number: 1,
      title: 'Understand Industry Needs',
      iconName: 'message-square' as const,
      color: '#10264b'
    },
    {
      number: 2,
      title: 'Analyze Requirements',
      iconName: 'line-chart' as const,
      color: '#ed861d'
    },
    {
      number: 3,
      title: 'Design Tailored Solution',
      iconName: 'lightbulb' as const,
      color: '#13a9a0'
    },
    {
      number: 4,
      title: 'Implement & Configure',
      iconName: 'settings' as const,
      color: '#963ee8'
    },
    {
      number: 5,
      title: 'Train & Support',
      iconName: 'user-check' as const,
      color: '#0878f9'
    },
    {
      number: 6,
      title: 'Drive Business Growth',
      iconName: 'trending-up' as const,
      color: '#d99120'
    }
  ]
};

export const INDUSTRIES_CONTACT_CTA_DATA = {
  eyebrow: "LET'S BUILD YOUR INDUSTRY SOLUTION",
  titleStart: 'Ready to Discuss',
  titleHighlight: 'Your Requirements?',
  description:
    'Talk to our experts to understand how our industry solutions can help your business grow.',
  primaryCtaText: 'Book a Consultation',
  email: 'sales@atlastechnosoft.com',
  phone: '+91-9372329599',
  locations: ['Borivali, Mumbai', 'Marine Lines, Mumbai']
};
