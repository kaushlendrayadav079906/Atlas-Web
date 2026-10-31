export interface FloatingBadgeItem {
  label: string;
  color: string;
  iconName: 'Settings' | 'TrendingUp' | 'Users' | 'Handshake';
}

export interface TechnologyPartnerOverviewItem {
  id: string;
  name: string;
  title: string;
  description: string;
  linkText: string;
  linkTarget: string;
  route: string;
  image: string;
  borderColor: string;
  arrowColor: string;
  badgeType: 'sap' | 'boyum' | 'uipath' | 'atlas';
}

export interface CapabilityItem {
  title: string;
  iconName: 'Building2' | 'ShoppingCart' | 'Boxes' | 'TrendingUp';
  description: string;
}

export interface BoyumProductCardItem {
  id: string;
  productLogo: 'beas' | 'produmex' | 'b1up';
  title: string;
  description: string;
  image: string;
  borderColor: string;
  linkText: string;
  route: string;
  fullDetails: {
    kpis: string[];
    features: string[];
  };
}

export interface UiPathBenefitItem {
  title: string;
  iconName: 'Cog' | 'Cpu' | 'FileCheck' | 'TrendingUp';
  color: string;
  description: string;
}

export interface EcosystemStepItem {
  id: string;
  title: string;
  role: string;
  badgeType: 'sap' | 'boyum' | 'uipath' | 'atlas' | 'operations';
}

export interface WhyChooseItem {
  title: string;
  description: string;
  color: string;
  iconName: 'ShieldCheck' | 'Building2' | 'Settings' | 'Headphones';
}

export const PARTNERS_HERO_DATA = {
  eyebrow: 'OUR TECHNOLOGY PARTNERS —',
  titleStart: 'Building Better Business Solutions Through',
  titleHighlight: 'Technology Partnerships',
  description:
    'We work with leading enterprise technology platforms to help businesses streamline operations, improve visibility and adopt intelligent automation.',
  primaryCtaText: 'Explore Our Partners',
  secondaryCtaText: 'Talk to Our Experts',
  heroImage: '/images/partners/partners_hero.jpg',
  floatingBadges: [
    { label: 'Stronger Solutions', color: '#0066CC', iconName: 'Settings' as const },
    { label: 'Greater Efficiency', color: '#16a879', iconName: 'TrendingUp' as const },
    { label: 'Long-Term Partnership', color: '#0066CC', iconName: 'Users' as const },
    { label: 'Mutual Growth', color: '#0ea5e9', iconName: 'Handshake' as const }
  ]
};

export const TECHNOLOGY_PARTNERS_OVERVIEW_DATA = {
  eyebrow: 'OUR PARTNERS —',
  titleStart: 'Working with Global',
  titleHighlight: 'Technology Leaders',
  description:
    'We partner with best-in-class technology providers to deliver comprehensive business solutions.',
  partners: [
    {
      id: 'sap-business-one',
      name: 'SAP Business One',
      title: 'SAP Business One',
      description:
        'A complete ERP solution to manage finance, sales, purchasing, inventory and operations with live in-memory analytics.',
      linkText: 'Explore SAP Solutions',
      linkTarget: '/partners/sap-business-one',
      route: '/partners/sap-business-one',
      image: '/images/partners/partners_sap_laptop.jpg',
      borderColor: '#0066CC',
      arrowColor: '#0066CC',
      badgeType: 'sap' as const
    },
    {
      id: 'boyum-it',
      name: 'Boyum IT',
      title: 'Boyum IT Solutions',
      description:
        'Certified extensions for manufacturing execution, paperless warehousing, and interface usability on SAP Business One.',
      linkText: 'Explore Boyum Solutions',
      linkTarget: '/partners/boyum-it',
      route: '/partners/boyum-it',
      image: '/images/partners/partners_boyum_warehouse.jpg',
      borderColor: '#16a879',
      arrowColor: '#16a879',
      badgeType: 'boyum' as const
    },
    {
      id: 'uipath',
      name: 'UiPath',
      title: 'UiPath Hyperautomation',
      description:
        'Robotic Process Automation and Document AI solutions to eliminate repetitive manual data entry and streamline reconciliations.',
      linkText: 'Explore Automation',
      linkTarget: '/partners/uipath',
      route: '/partners/uipath',
      image: '/images/partners/partners_uipath_ai.jpg',
      borderColor: '#0066CC',
      arrowColor: '#0066CC',
      badgeType: 'uipath' as const
    },
    {
      id: 'atlas-solutions',
      name: 'ATLAS Technology & Add-ons',
      title: 'ATLAS Technology & Add-ons',
      description:
        'Proprietary SAP Business One add-on modules engineered for freight trading, weighbridge gate entry, and statutory compliance.',
      linkText: 'Explore ATLAS Add-ons',
      linkTarget: '/partners/atlas-solutions',
      route: '/partners/atlas-solutions',
      image: '/images/solutions/solutions_integrated_ecosystem.jpg',
      borderColor: '#1B72E8',
      arrowColor: '#1B72E8',
      badgeType: 'atlas' as const
    }
  ]
};

export const SAP_PARTNERSHIP_DATA = {
  id: 'sap-partnership',
  titleStart: 'SAP Business One —',
  titleHighlight: 'Intelligent Business Management',
  description:
    'SAP Business One helps small and mid-sized businesses manage their entire operations with a single, integrated solution. It provides real-time visibility, better decision-making and improved operational efficiency.',
  ctaText: 'Learn More About SAP',
  image: '/images/partners/partners_sap_monitor.jpg',
  capabilitiesTitle: 'Key Capabilities',
  capabilities: [
    {
      title: 'Financial Management',
      iconName: 'Building2' as const,
      description: 'Automate accounting, bank reconciliations, tax reporting and month-end closes.'
    },
    {
      title: 'Sales & Purchasing',
      iconName: 'ShoppingCart' as const,
      description: 'Manage full sales pipelines, PO cycles, vendor agreements and price lists.'
    },
    {
      title: 'Inventory Management',
      iconName: 'Boxes' as const,
      description: 'Real-time stock tracking across multi-bin warehouses and production lines.'
    },
    {
      title: 'Reporting & Business Intelligence',
      iconName: 'TrendingUp' as const,
      description: 'Interactive dashboards and HANA analytics for fast executive decision-making.'
    }
  ]
};

export const BOYUM_PARTNERSHIP_DATA = {
  id: 'boyum-partnership',
  titleStart: 'Boyum IT —',
  titleHighlight: 'Extending SAP Business One Capabilities',
  description:
    'Boyum IT provides powerful add-ons that enhance the functionality of SAP Business One and help businesses meet industry-specific requirements.',
  products: [
    {
      id: 'beas-manufacturing',
      productLogo: 'beas' as const,
      title: 'Beas Manufacturing',
      description:
        'Complete manufacturing solution for SAP Business One with production planning, shop floor control and more.',
      image: '/images/partners/partners_beas.jpg',
      borderColor: '#0066CC',
      linkText: 'Learn More',
      route: '/partners/boyum-it',
      fullDetails: {
        kpis: [
          '28% improvement in Overall Equipment Effectiveness (OEE)',
          '42% reduction in material scrap and rework',
          'Automated Netronic Gantt capacity scheduling'
        ],
        features: [
          'Bill of Materials (BOM) & Multi-Level Routing',
          'Advanced Planning & Scheduling (APS)',
          'Mobile Shop Floor Data Collection (SFDC)',
          'Quality Control & Batch/Lot Traceability'
        ]
      }
    },
    {
      id: 'produmex-wms',
      productLogo: 'produmex' as const,
      title: 'Produmex WMS',
      description:
        'Advanced warehouse management solution for SAP Business One to optimize inventory and logistics.',
      image: '/images/partners/partners_produmex.jpg',
      borderColor: '#16a879',
      linkText: 'Learn More',
      route: '/partners/boyum-it',
      fullDetails: {
        kpis: [
          '99.9% inventory picking accuracy',
          '3× faster receiving cycle with RF barcode terminals',
          'Touchless GRPO creation from vendor invoices'
        ],
        features: [
          'Wireless RF Barcode Scanning (1D/2D)',
          'Automated Directed Putaway & Zone Allocation',
          'Batch, Serial & Expiry Date Management',
          '3PL Multi-Client Billing & Cross-Docking'
        ]
      }
    },
    {
      id: 'b1-usability-package',
      productLogo: 'b1up' as const,
      title: 'B1 Usability Package',
      description:
        'Productivity tools and user-friendly enhancements to simplify and accelerate daily operations.',
      image: '/images/partners/partners_b1up.jpg',
      borderColor: '#0066CC',
      linkText: 'Learn More',
      route: '/partners/boyum-it',
      fullDetails: {
        kpis: [
          '300+ out-of-the-box UI workflows & automations',
          '150+ approval & automated alert workflows',
          'Up to 35% time saved on daily routine ERP tasks'
        ],
        features: [
          'Custom Screen Layouts & Mandatory Field Validations',
          'Dynamic Tabs, Function Buttons & Quick Search',
          'Automated Email & Document Delivery System',
          'Seamless Microsoft Outlook Integration'
        ]
      }
    }
  ]
};

export const UIPATH_PARTNERSHIP_DATA = {
  id: 'uipath-partnership',
  titleStart: 'UiPath — Transforming Work',
  titleHighlight: 'Through Automation',
  description:
    'UiPath helps businesses automate repetitive tasks, streamline workflows and enable intelligent automation across departments.',
  ctaText: 'Learn More About UiPath',
  image: '/images/partners/partners_uipath_robot.jpg',
  benefits: [
    {
      title: 'RPA and Process Automation',
      iconName: 'Cog' as const,
      color: '#0066CC',
      description: 'Automate repetitive data entry, AP/AR posting, and reconciliation.'
    },
    {
      title: 'AI-Powered Workflows',
      iconName: 'Cpu' as const,
      color: '#0066CC',
      description: 'Machine learning document understanding for invoices and shipping documents.'
    },
    {
      title: 'Reduced Manual Effort',
      iconName: 'FileCheck' as const,
      color: '#0d9488',
      description: 'Eliminate up to 70% of manual entry errors and repetitive keying tasks.'
    },
    {
      title: 'Improved Operational Efficiency',
      iconName: 'TrendingUp' as const,
      color: '#0878f9',
      description: 'Accelerate transaction turnarounds with reliable 24/7 software bot execution.'
    }
  ]
};

export const TECHNOLOGY_ECOSYSTEM_DATA = {
  titleStart: 'One Connected',
  titleHighlight: 'Technology Ecosystem',
  description:
    'Our technology partnerships work together to deliver end-to-end business solutions.',
  steps: [
    {
      id: 'step-sap',
      title: 'SAP Business One',
      role: 'Core ERP Platform',
      badgeType: 'sap' as const
    },
    {
      id: 'step-boyum',
      title: 'Boyum IT',
      role: 'Add-ons for Manufacturing, Warehouse and Usability',
      badgeType: 'boyum' as const
    },
    {
      id: 'step-uipath',
      title: 'UiPath',
      role: 'RPA & AI Automation',
      badgeType: 'uipath' as const
    },
    {
      id: 'step-atlas',
      title: 'ATLAS Technosoft',
      role: 'Industry-Focused Solutions',
      badgeType: 'atlas' as const
    },
    {
      id: 'step-ops',
      title: 'Connected Business Operations',
      role: 'Unified Enterprise Performance',
      badgeType: 'operations' as const
    }
  ],
  illustrativeNote:
    'Illustrative technology ecosystem; specific solution architecture configured according to each client’s verified operational requirements.'
};

export const WHY_CHOOSE_PARTNERSHIP_DATA = {
  titleStart: 'Why Choose ATLAS',
  titleHighlight: 'Technosoft',
  description:
    'We combine leading technology partnerships with deep industry understanding to deliver the right solutions for your business.',
  pillars: [
    {
      title: 'Technology Expertise',
      description: 'Deep knowledge of SAP, Boyum IT, UiPath and industry solutions.',
      color: '#1B72E8',
      iconName: 'ShieldCheck' as const
    },
    {
      title: 'Industry Understanding',
      description: 'Experience across manufacturing, trading, logistics and more.',
      color: '#16a879',
      iconName: 'Building2' as const
    },
    {
      title: 'Integrated Solutions',
      description: 'End-to-end business solutions tailored to your requirements.',
      color: '#0066CC',
      iconName: 'Settings' as const
    },
    {
      title: 'Ongoing Support',
      description: 'Continuous support and guidance to ensure long-term success.',
      color: '#0878f9',
      iconName: 'Headphones' as const
    }
  ]
};

export const PARTNERS_CTA_DATA = {
  titleStart: "Let's Build Better",
  titleHighlight: 'Business Solutions Together',
  description:
    'Talk to our experts to understand how our technology partnerships can support your business.',
  buttonText: 'Book a Consultation',
  email: 'sales@atlastechnosoft.com',
  phone: '+91-9372329599',
  locations: ['Borivali, Mumbai', 'Marine Lines, Mumbai']
};

