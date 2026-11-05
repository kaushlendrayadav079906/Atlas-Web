export interface SubmenuItem {
  name: string;
  href: string;
}

export interface MegaMenuCategory {
  id: string;
  name: string;
  icon: string; // Lucide icon identifier
  href: string; // Dedicated page link for this category
  description: string;
  subItems: SubmenuItem[];
}

export interface NavItem {
  name: string;
  href: string;
  hasDropdown: boolean;
  categories?: MegaMenuCategory[];
}

export const TOP_BAR_INFO = {
  location: "Mumbai, India",
  email: "sales@atlastechnosoft.com",
  phone: "+91 93723 29599",
  phoneTel: "tel:+919372329599",
  emailMailto: "mailto:sales@atlastechnosoft.com",
  social: {
    linkedin: "https://www.linkedin.com/company/atlas-technosoft-pvt-ltd/",
    twitter: "https://x.com/atlastechnosoft",
    whatsapp: "https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20book%20a%20consultation."
  }
};

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    name: 'Home',
    href: '/',
    hasDropdown: false,
  },
  {
    name: 'About',
    href: '/about',
    hasDropdown: true,
    categories: [
      {
        id: 'company-profile',
        name: 'Company Profile',
        icon: 'Building2',
        href: '/about',
        description: 'Mumbai’s trusted SAP Business One and hyperautomation partner with deep enterprise engineering roots.',
        subItems: [
          { name: 'Our Story & Vision', href: '/about' },
          { name: 'Mission & Values', href: '/about#values' },
          { name: '15+ Years Track Record', href: '/about#timeline' },
          { name: 'Office Locations (Borivali & Marine Lines)', href: '/contact' }
        ]
      },
      {
        id: 'approach-values',
        name: 'Our Approach & Values',
        icon: 'ShieldCheck',
        href: '/about#values',
        description: 'Delivering sustainable business value through zero-manual-touch automation and resilient ERP foundations.',
        subItems: [
          { name: 'Client-Centric SLA Focus', href: '/about#values' },
          { name: 'Proven 4-Step Methodology', href: '/#approach' },
          { name: 'Enterprise Security & Compliance', href: '/about' },
          { name: 'Continuous AMS Optimization', href: '/services' }
        ]
      },
      {
        id: 'journey-milestones',
        name: 'Journey & Milestones',
        icon: 'Clock',
        href: '/about#timeline',
        description: 'Explore our evolution across 80+ successful ERP implementations since 2008.',
        subItems: [
          { name: 'Foundational Milestones', href: '/about#timeline' },
          { name: 'SAP Channel Partnership', href: '/partners/sap-business-one' },
          { name: 'Boyum IT & UiPath Alliances', href: '/partners' },
          { name: 'Enterprise Customer Stories', href: '/case-studies' }
        ]
      },
      {
        id: 'leadership-team',
        name: 'Leadership & Team',
        icon: 'Users',
        href: '/about#team',
        description: '32 certified consultants across SAP HANA, Beas Manufacturing, Produmex WMS, and UiPath RPA.',
        subItems: [
          { name: 'Executive Leadership', href: '/about#team' },
          { name: 'SAP Functional & Technical Leads', href: '/about#team' },
          { name: 'RPA & Automation Architects', href: '/about#team' },
          { name: 'Dedicated AMS Account Managers', href: '/contact' }
        ]
      }
    ]
  },
  {
    name: 'Services',
    href: '/services',
    hasDropdown: true,
    categories: [
      {
        id: 'erp-services',
        name: 'ERP Services',
        icon: 'Settings',
        href: '/services/sap-business-one',
        description: 'End-to-end ERP services to streamline, automate and grow your business.',
        subItems: [
          { name: 'SAP Business One Implementation', href: '/services/sap-business-one' },
          { name: 'Process Consulting', href: '/services/sap-business-one' },
          { name: 'System Integration', href: '/services/atlas-addons' },
          { name: 'Ongoing Support (AMS)', href: '/services/sap-business-one' }
        ]
      },
      {
        id: 'implementation',
        name: 'Implementation',
        icon: 'Layers',
        href: '/services/sap-business-one',
        description: 'Structured, proven implementation methodology for Cloud and On-Premise SAP Business One architectures.',
        subItems: [
          { name: 'Cloud & On-Premise Deployments', href: '/services/sap-business-one' },
          { name: 'Multi-Company Template Setup', href: '/services/sap-business-one' },
          { name: 'Data Migration & Validation', href: '/services/sap-business-one' },
          { name: 'Go-Live & Cutover Support', href: '/services/sap-business-one' }
        ]
      },
      {
        id: 'support-ams',
        name: 'Support & AMS',
        icon: 'Headphones',
        href: '/services/support-maintenance',
        description: 'Dedicated Application Management Services (AMS) backed by guaranteed SLAs and certified specialists.',
        subItems: [
          { name: '24/7 SLA-Backed Support', href: '/services/support-maintenance#sla-matrix' },
          { name: 'Incident & Defect Resolution', href: '/services/support-maintenance#sla-matrix' },
          { name: 'System Health Checks & Tuning', href: '/services/support-maintenance' },
          { name: 'End-User Knowledge Transfer', href: '/services/support-maintenance' }
        ]
      },
      {
        id: 'upgrades-migration',
        name: 'Upgrades & Migration',
        icon: 'RefreshCw',
        href: '/services/sap-business-one',
        description: 'Seamless upgrades to the latest SAP Business One versions and zero-downtime SAP HANA database migrations.',
        subItems: [
          { name: 'SAP HANA In-Memory Migration', href: '/services/sap-business-one' },
          { name: 'SQL to SAP HANA Conversion', href: '/services/sap-business-one' },
          { name: 'Version & Patch Upgrades', href: '/services/sap-business-one' },
          { name: 'Add-on Compatibility Audits', href: '/services/sap-business-one' }
        ]
      },
      {
        id: 'integration-services',
        name: 'Integration Services',
        icon: 'Link2',
        href: '/services/atlas-addons',
        description: 'Connecting SAP Business One seamlessly with e-commerce, third-party logistics, machinery, and external APIs.',
        subItems: [
          { name: 'Boyum IT (Beas & Produmex)', href: '/services/boyum-it' },
          { name: 'UiPath RPA Bot Connectors', href: '/services/uipath-automation' },
          { name: 'ATLAS Proprietary Add-on Bridges', href: '/services/atlas-addons' },
          { name: 'Custom REST APIs & EDI Bridges', href: '/services/atlas-addons' }
        ]
      },
      {
        id: 'consulting-advisory',
        name: 'Consulting & Advisory',
        icon: 'Users',
        href: '/services',
        description: 'Strategic ERP consulting, statutory compliance checks, and business process re-engineering for high-growth SMEs.',
        subItems: [
          { name: 'ERP Audit & Architecture Review', href: '/services' },
          { name: 'Business Process Optimization', href: '/services' },
          { name: 'GST & E-Invoicing Compliance', href: '/services' },
          { name: 'Digital Transformation Roadmap', href: '/services' }
        ]
      }
    ]
  },
  {
    name: 'Solutions',
    href: '/solutions',
    hasDropdown: true,
    categories: [
      {
        id: 'manufacturing-solutions',
        name: 'Manufacturing Solutions',
        icon: 'Factory',
        href: '/solutions/manufacturing',
        description: 'Closed-loop discrete and process manufacturing ERP with Beas APS, MRP II, and touch terminals.',
        subItems: [
          { name: 'Beas Manufacturing (APS / MRP)', href: '/solutions/manufacturing' },
          { name: 'Multi-Level BOM & Cost Estimation', href: '/solutions/manufacturing' },
          { name: 'Shop-Floor Data Collection (Terminal)', href: '/solutions/manufacturing' },
          { name: 'Quality Control & Batch Traceability', href: '/solutions/manufacturing' }
        ]
      },
      {
        id: 'warehouse-solutions',
        name: 'Warehouse Management (WMS)',
        icon: 'Truck',
        href: '/solutions/warehouse-management',
        description: 'Multi-bin storage hierarchy, RF handheld barcode scanning, automated e-way billing, and lot control.',
        subItems: [
          { name: 'Produmex WMS Integration', href: '/solutions/warehouse-management' },
          { name: 'Handheld RF Barcode Scanning', href: '/solutions/warehouse-management' },
          { name: 'Batch & Serial Number Tracking', href: '/solutions/warehouse-management' },
          { name: 'Automated E-Way Bill & Dispatch', href: '/solutions/warehouse-management' }
        ]
      },
      {
        id: 'finance-automation',
        name: 'Finance Automation Solutions',
        icon: 'TrendingUp',
        href: '/solutions/finance-automation',
        description: 'SAP HANA in-memory financials, UiPath OCR AP invoice ingestion, and automated bank reconciliation.',
        subItems: [
          { name: 'SAP HANA In-Memory Financials', href: '/solutions/finance-automation' },
          { name: 'UiPath AI Invoice & GRPO Ingestion', href: '/solutions/finance-automation' },
          { name: 'GSTR-2B & Vendor Statement Matching', href: '/solutions/finance-automation' },
          { name: 'Automated Bank Reconciliation', href: '/solutions/finance-automation' }
        ]
      },
      {
        id: 'logistics-shipping',
        name: 'Logistics & Shipping Solutions',
        icon: 'Ship',
        href: '/solutions/logistics-shipping',
        description: 'Multi-modal freight forwarding, precision landed cost allocation, weighbridge automation, and EXIM compliance.',
        subItems: [
          { name: 'Multi-Modal Freight & Cargo Tracking', href: '/solutions/logistics-shipping' },
          { name: 'Precision Landed Cost Allocation', href: '/solutions/logistics-shipping' },
          { name: 'Electronic Weighbridge & Gate Entry', href: '/solutions/logistics-shipping' },
          { name: 'EXIM Customs Documentation', href: '/solutions/logistics-shipping' }
        ]
      },
      {
        id: 'boyum-it-solutions',
        name: 'Boyum IT Solutions',
        icon: 'Layers',
        href: '/solutions/boyum-it',
        description: 'World-class SAP Certified add-ons for discrete manufacturing, advanced warehousing, and screen customization.',
        subItems: [
          { name: 'Beas Manufacturing', href: '/solutions/manufacturing' },
          { name: 'Produmex WMS Suite', href: '/solutions/warehouse-management' },
          { name: 'B1 Usability Package (B1UP)', href: '/solutions/boyum-it' },
          { name: 'Boyum Cloud & Usability', href: '/solutions/boyum-it' }
        ]
      },
      {
        id: 'atlas-proprietary-addons',
        name: 'ATLAS Proprietary Add-ons',
        icon: 'Cpu',
        href: '/solutions/atlas-addons',
        description: 'Niche proprietary IP solutions designed to address complex industrial, trading, and logistics requirements.',
        subItems: [
          { name: 'Multi-Modal Freight & Cargo Trading', href: '/solutions/atlas-addons' },
          { name: 'AI Gate Entry & Weighbridge Automation', href: '/solutions/atlas-addons' },
          { name: 'Vendor Collaboration Portal', href: '/solutions/atlas-addons' },
          { name: 'Export & Shipping Documentation', href: '/solutions/atlas-addons' }
        ]
      }
    ]
  },

  {
    name: 'Industries',
    href: '/industries',
    hasDropdown: true,
    categories: [
      {
        id: 'manufacturing',
        name: 'Manufacturing',
        icon: 'Factory',
        href: '/industries/manufacturing',
        description: 'Discrete, batch, chemical, and engineered-to-order manufacturing with live shop-floor data collection.',
        subItems: [
          { name: 'Advanced Planning & Scheduling (APS)', href: '/industries/manufacturing' },
          { name: 'Multi-Level Bill of Materials (BOM)', href: '/industries/manufacturing' },
          { name: 'Shop-Floor Data Capture & Job Costing', href: '/industries/manufacturing' },
          { name: 'Batch Traceability & Quality Control', href: '/industries/manufacturing' }
        ]
      },
      {
        id: 'warehouse-logistics',
        name: 'Warehouse & Logistics',
        icon: 'Truck',
        href: '/industries/warehouse-logistics',
        description: 'Optimized multi-bin storage, automated pick/pack/ship workflows, and real-time inventory visibility.',
        subItems: [
          { name: 'Produmex WMS & Handheld RF Scanners', href: '/industries/warehouse-logistics' },
          { name: 'Intelligent Picking & Putaway Logic', href: '/industries/warehouse-logistics' },
          { name: '3PL Billing & Landed Cost Tracking', href: '/industries/warehouse-logistics' },
          { name: 'Cross-Docking & Dispatch Speed', href: '/industries/warehouse-logistics' }
        ]
      },
      {
        id: 'finance-administration',
        name: 'Finance & Administration',
        icon: 'TrendingUp',
        href: '/industries/finance-administration',
        description: 'Touchless accounts payable/receivable, accelerated month-end close, and strict audit compliance.',
        subItems: [
          { name: 'Multi-Entity Financial Consolidation', href: '/industries/finance-administration' },
          { name: 'Automated Bank Reconciliations', href: '/industries/finance-administration' },
          { name: 'Statutory GST & E-Invoicing Precision', href: '/industries/finance-administration' },
          { name: 'Real-Time Executive Cashflow Analytics', href: '/industries/finance-administration' }
        ]
      },
      {
        id: 'trading-shipping',
        name: 'Trading & Shipping',
        icon: 'Boxes',
        href: '/industries/trading-shipping',
        description: 'Unified multi-currency operations, container tracking, import-export customs, and margin control.',
        subItems: [
          { name: 'EXIM & Shipping Documentation', href: '/industries/trading-shipping' },
          { name: 'Automated Landed Cost Calculation', href: '/industries/trading-shipping' },
          { name: 'Multi-Currency Forex Clearing', href: '/industries/trading-shipping' },
          { name: 'Container & Shipment Milestone Tracking', href: '/industries/trading-shipping' }
        ]
      }
    ]
  },
  {
    name: 'Case Studies',
    href: '/case-studies',
    hasDropdown: false,
  },
  {
    name: 'Partners',
    href: '/partners',
    hasDropdown: true,
    categories: [
      {
        id: 'sap-partnership',
        name: 'SAP Partnership',
        icon: 'CheckCircle2',
        href: '/partners/sap-business-one',
        description: 'Authorized SAP Channel Partner with 80+ certified live implementations across Indian and international markets.',
        subItems: [
          { name: 'SAP Business One Cloud & On-Premise', href: '/partners/sap-business-one' },
          { name: 'SAP HANA In-Memory Database', href: '/partners/sap-business-one' },
          { name: 'Certified Functional & Technical Consultants', href: '/partners/sap-business-one' },
          { name: 'Global Template Architecture', href: '/partners/sap-business-one' }
        ]
      },
      {
        id: 'boyum-it-partnership',
        name: 'Boyum IT Partnership',
        icon: 'Layers',
        href: '/partners/boyum-it',
        description: 'Certified Boyum IT Silver Partner specializing in Beas Manufacturing, Produmex WMS, and B1UP.',
        subItems: [
          { name: 'Beas Manufacturing Implementation', href: '/partners/boyum-it' },
          { name: 'Produmex WMS Deployment', href: '/partners/boyum-it' },
          { name: 'B1 Usability Package Customization', href: '/partners/boyum-it' },
          { name: 'Certified Module Specialists', href: '/partners/boyum-it' }
        ]
      },
      {
        id: 'uipath-partnership',
        name: 'UiPath Partnership',
        icon: 'Zap',
        href: '/partners/uipath',
        description: 'Certified UiPath Silver Partner providing intelligent software robots and AI Document Understanding.',
        subItems: [
          { name: 'RPA Bot Design & Deployment', href: '/partners/uipath' },
          { name: 'Document Understanding & Intelligent OCR', href: '/partners/uipath' },
          { name: 'Attended & Unattended Bot Orchestration', href: '/partners/uipath' },
          { name: 'Process Mining & ROI Audits', href: '/partners/uipath' }
        ]
      }
    ]
  },
  {
    name: 'Insights & Resources',
    href: '/blog',
    hasDropdown: true,
    categories: [
      {
        id: 'blog',
        name: 'Blog',
        icon: 'BookOpen',
        href: '/blog',
        description: 'Practical guides, strategic ERP insights, and technical breakthroughs written by ATLAS consultants.',
        subItems: [
          { name: 'All Insights & Articles', href: '/blog' },
          { name: 'SAP Business One Strategy', href: '/blog?category=SAP+Business+One' },
          { name: 'Manufacturing & Operations', href: '/blog?category=Manufacturing' },
          { name: 'UiPath & Intelligent RPA', href: '/blog?category=UiPath+%26+Intelligent+Automation' }
        ]
      },
      {
        id: 'sap-guides',
        name: 'SAP Guides',
        icon: 'FileText',
        href: '/resources/sap-guides',
        description: 'Educational resources and blueprints covering SAP Business One basics, HANA migration, and financial architecture.',
        subItems: [
          { name: 'SAP Business One Introduction', href: '/resources/sap-guides#sap-b1-introduction' },
          { name: 'SAP Implementation Methodology', href: '/resources/sap-guides#sap-implementation-methodology' },
          { name: 'SAP HANA Migration Guide', href: '/resources/sap-guides#sap-hana-migration' },
          { name: 'Inventory & Accounting Controls', href: '/resources/sap-guides#inventory-warehouse-management' }
        ]
      },
      {
        id: 'industry-insights',
        name: 'Industry Insights',
        icon: 'TrendingUp',
        href: '/resources/industry-insights',
        description: 'Sector-specific frameworks for discrete manufacturing, multi-bin warehousing, and automated trading operations.',
        subItems: [
          { name: 'Manufacturing ERP (Beas)', href: '/resources/industry-insights#manufacturing-erp-insight' },
          { name: 'Warehouse Logistics (Produmex)', href: '/resources/industry-insights#warehouse-management-insight' },
          { name: 'Finance & Compliance Automation', href: '/resources/industry-insights#finance-automation-insight' },
          { name: 'Trading & Shipping Automation', href: '/resources/industry-insights#trading-shipping-insight' }
        ]
      },
      {
        id: 'faqs',
        name: 'FAQs',
        icon: 'HelpCircle',
        href: '/resources/faqs',
        description: 'Answers to frequently asked questions regarding SAP Business One, Boyum IT modules, UiPath RPA, and support SLAs.',
        subItems: [
          { name: 'SAP Business One Essentials', href: '/resources/faqs#sap-b1' },
          { name: 'Implementation & Migration', href: '/resources/faqs#implementation' },
          { name: 'Boyum IT & WMS Modules', href: '/resources/faqs#boyum-it' },
          { name: 'UiPath RPA & Automation', href: '/resources/faqs#uipath' }
        ]
      }
    ]
  },
  {
    name: 'Contact',
    href: '/contact',
    hasDropdown: false,
  }
];
