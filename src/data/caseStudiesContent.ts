export interface CaseStudyItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  fallbackCrop?: string;
  accentColor: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  iconName: 'boxes' | 'truck' | 'shopping-cart' | 'cpu' | 'factory';
  techUsed: string;
  verifiedKpis: string[];
  challengeDetail?: string;
  solutionDetail?: string;
}

export interface ApproachStepItem {
  stepNumber: string;
  title: string;
  color: string;
  iconName: 'message-square' | 'file-check' | 'lightbulb' | 'settings' | 'shield-check';
  summary: string;
}

export interface TechnologyItem {
  id: string;
  name: string;
  role: string;
  description: string;
  type: 'sap' | 'boyum' | 'uipath' | 'atlas';
}

export const CASE_STUDIES_HERO_DATA = {
  eyebrow: 'CUSTOMER SUCCESS STORIES —',
  titleStart: 'Turning Business Challenges into',
  titleHighlight: 'Measurable Progress',
  description:
    'Explore how enterprise technology and intelligent automation can help businesses improve their operations and work more efficiently.',
  primaryCtaText: 'Explore Case Studies',
  secondaryCtaText: 'Talk to Our Experts',
  heroImage: '/images/case_studies/cs_hero_team.jpg',
  floatingBadges: [
    { label: 'Real Solutions', color: '#16a879', icon: 'check-circle' as const },
    { label: 'Industry Expertise', color: '#ed861d', icon: 'cog' as const },
    { label: 'Long-Term Partnerships', color: '#963ee8', icon: 'users' as const }
  ]
};

export const FEATURED_CASE_STUDY_DATA = {
  eyebrow: 'FEATURED CASE STUDY —',
  mainHeading: 'Manufacturing Company Streamlines Operations with SAP Business One',
  industryLabel: 'Manufacturing',
  industryColor: '#ed861d',
  image: '/images/case_studies/cs_featured_manufacturing.jpg',
  title: 'Integrated ERP Solution for End-to-End Visibility',
  challenge: {
    title: 'Business Challenge',
    description:
      'Disconnected systems, manual processes and limited visibility across production, inventory and finance operations.',
    color: '#ef4444'
  },
  solution: {
    title: 'Solution Implemented',
    description:
      'Implemented SAP Business One with industry-specific add-ons to integrate core business processes and improve data visibility.',
    color: '#16a879'
  },
  technology: {
    title: 'Technology Used',
    description: 'SAP Business One, Boyum IT Solutions',
    color: '#963ee8'
  },
  outcomes: {
    title: 'Key Outcomes',
    description:
      'Improved operational efficiency, better inventory control and real-time business insights.',
    color: '#0878f9'
  },
  ctaText: 'Read Full Case Study',
  fullDetails: {
    clientType: 'Precision Industrial Components Manufacturer (India)',
    timeToDeploy: 'Fast-track deployment in 58 days',
    verifiedKpis: [
      '40% faster month-end financial closing cycle',
      '28% improvement in Overall Equipment Effectiveness (OEE)',
      '42% reduction in shop-floor scrap & material waste',
      'Real-time automated Gantt capacity planning with Netronic & Beas'
    ],
    verifiedOutcomeNote:
      'Verified client engagement KPI documented in ATPL technical audit (2024). Client corporate identity protected per mutual Non-Disclosure Agreement.'
  }
};

export const MORE_CASE_STUDIES_DATA: CaseStudyItem[] = [
  {
    id: 'warehouse-logistics',
    category: 'Warehouse & Logistics',
    title: 'Warehouse Management for Better Control',
    description:
      'Implemented advanced warehouse management with real-time inventory tracking and streamlined operations.',
    image: '/images/case_studies/cs_warehouse.jpg',
    fallbackCrop: '/images/case_studies/cs_warehouse_crop.jpg',
    accentColor: '#16a879',
    borderColor: 'border-[#16a879]',
    badgeBg: 'bg-[#16a879]/10',
    badgeText: 'text-[#16a879]',
    iconName: 'boxes',
    techUsed: 'Produmex WMS + SAP Business One',
    verifiedKpis: [
      'Inventory picking accuracy reached 99.9%',
      '3× faster receiving with automated RF barcode scanning',
      'Touchless GRPO creation from vendor advance shipping notices'
    ],
    challengeDetail:
      'Manual warehouse paper picking caused high discrepancy rates, delayed truck turnarounds, and untracked stock in multi-bay facilities.',
    solutionDetail:
      'Deployed Produmex WMS connected directly to SAP B1 HANA with handheld wireless RF barcode terminals and automated bin allocation.'
  },
  {
    id: 'trading-distribution',
    category: 'Trading & Distribution',
    title: 'Unified System for Trading Operations',
    description:
      'Integrated procurement, sales, inventory and finance to improve operational efficiency and support business growth.',
    image: '/images/case_studies/cs_trading.jpg',
    fallbackCrop: '/images/case_studies/cs_trading_crop.jpg',
    accentColor: '#963ee8',
    borderColor: 'border-[#963ee8]',
    badgeBg: 'bg-[#963ee8]/10',
    badgeText: 'text-[#963ee8]',
    iconName: 'truck',
    techUsed: 'SAP Business One + ATLAS Freight Suite',
    verifiedKpis: [
      '85% reduction in shipping documentation preparation time',
      '90% error reduction in multi-currency international order processing',
      'Automated customer portal for real-time order tracking & invoices'
    ],
    challengeDetail:
      'Disjointed freight tracking, multiple currencies, and manual documentation in spreadsheets delayed international dispatch cycles.',
    solutionDetail:
      'Implemented ATLAS Freight & Trading add-on integrated with SAP B1 to automate Bill of Lading, custom filings, and automated freight costing.'
  },
  {
    id: 'retail-wholesale',
    category: 'Retail & Wholesale',
    title: 'Improved Inventory Visibility Across Multiple Channels',
    description:
      'Implemented a connected business system to manage multi-location inventory and streamline sales processes.',
    image: '/images/case_studies/cs_retail.jpg',
    fallbackCrop: '/images/case_studies/cs_retail_crop.jpg',
    accentColor: '#ef4444',
    borderColor: 'border-[#ef4444]',
    badgeBg: 'bg-[#ef4444]/10',
    badgeText: 'text-[#ef4444]',
    iconName: 'shopping-cart',
    techUsed: 'SAP Business One + B1UP Usability Package',
    verifiedKpis: [
      'Multi-branch real-time stock balance synchronization',
      'Automated reorder alerts 7 days prior to projected stock-outs',
      'Single consolidated view of retail store and wholesale inventory'
    ],
    challengeDetail:
      'Disconnected retail outlets led to frequent out-of-stock situations, delayed replenishments, and inconsistent cross-branch pricing.',
    solutionDetail:
      'Configured SAP Business One centralized inventory with automated replenishment rules and 300+ UI/alert workflows via B1UP.'
  },
  {
    id: 'automation-rpa',
    category: 'Automation & RPA',
    title: 'Automating Manual Business Processes',
    description:
      'Used UiPath RPA to automate repetitive tasks, reduce manual effort and improve process efficiency.',
    image: '/images/case_studies/cs_automation.jpg',
    fallbackCrop: '/images/case_studies/cs_automation_crop.jpg',
    accentColor: '#ed861d',
    borderColor: 'border-[#ed861d]',
    badgeBg: 'bg-[#ed861d]/10',
    badgeText: 'text-[#ed861d]',
    iconName: 'cpu',
    techUsed: 'UiPath Studio & Orchestrator + AI Document Understanding',
    verifiedKpis: [
      '70% reduction in manual finance and accounting data entry',
      '1,000+ vendor invoices processed and posted daily with 98% accuracy',
      'Full project investment ROI achieved within 4–6 months'
    ],
    challengeDetail:
      'Finance teams spent over 25 hours per week manually typing PDF vendor invoices, performing 3-way PO matching, and fixing keying typos.',
    solutionDetail:
      'Engineered an unattended UiPath software bot with AI Document Understanding to extract line items, validate POs, and post directly into SAP B1.'
  }
];

export const OUR_APPROACH_DATA = {
  titleStart: 'Our Approach to',
  titleHighlight: 'Success',
  description:
    'We follow a structured approach to understand business challenges and deliver the right solution.',
  steps: [
    {
      stepNumber: '01',
      title: 'Understand Business Needs',
      color: '#ed861d',
      iconName: 'message-square' as const,
      summary: 'Discovery assessment to analyze operations and identify high-impact automation areas.'
    },
    {
      stepNumber: '02',
      title: 'Analyze Requirements',
      color: '#16a879',
      iconName: 'file-check' as const,
      summary: 'Deep-dive process mapping, technical feasibility review, and measurable ROI roadmap.'
    },
    {
      stepNumber: '03',
      title: 'Design Solution',
      color: '#963ee8',
      iconName: 'lightbulb' as const,
      summary: 'Tailored architecture blueprint combining SAP B1, Boyum modules, and UiPath automations.'
    },
    {
      stepNumber: '04',
      title: 'Implement & Configure',
      color: '#0878f9',
      iconName: 'settings' as const,
      summary: 'Fast-track deployment with verified templates, data validation, and hands-on user training.'
    },
    {
      stepNumber: '05',
      title: 'Support & Optimize',
      color: '#ef4444',
      iconName: 'shield-check' as const,
      summary: 'Continuous monitoring, ongoing enhancement sprints, and dedicated consultative support.'
    }
  ]
};

export const TECHNOLOGY_SHOWCASE_DATA = {
  titleStart: 'Technologies Used in Our',
  titleHighlight: 'Case Studies',
  description:
    'We leverage industry-leading technologies to deliver reliable and scalable solutions.',
  items: [
    {
      id: 'sap-b1',
      name: 'SAP Business One',
      role: 'ERP Solution',
      description: 'The proven enterprise core connecting finance, inventory, and operations.',
      type: 'sap' as const
    },
    {
      id: 'boyum-it',
      name: 'Boyum IT Solutions',
      role: 'Add-ons for Manufacturing, Warehouse and Usability',
      description: 'Beas Manufacturing, Produmex WMS, and B1UP for industrial execution.',
      type: 'boyum' as const
    },
    {
      id: 'uipath',
      name: 'UiPath',
      role: 'RPA & AI Automation',
      description: 'End-to-end hyperautomation platform for eliminating manual data tasks.',
      type: 'uipath' as const
    },
    {
      id: 'atlas-addons',
      name: 'ATLAS',
      role: 'Proprietary Solutions',
      description: 'Custom modules for Freight, Gate Entry, Weighment, and Vendor Portals.',
      type: 'atlas' as const
    }
  ]
};

export const CASE_STUDIES_CTA_DATA = {
  titleStart: 'Have a Similar',
  titleHighlight: 'Business Challenge?',
  description:
    "Let's discuss how the right technology solutions can support your business.",
  primaryCtaText: 'Book a Consultation',
  email: 'sales@atlastechnosoft.com',
  phone: '+91-9372329599',
  locations: ['Borivali, Mumbai', 'Marine Lines, Mumbai']
};
