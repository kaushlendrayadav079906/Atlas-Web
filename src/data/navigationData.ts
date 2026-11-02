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
        href: '/services/sap-business-one',
        description: 'Dedicated Application Management Services (AMS) backed by guaranteed SLAs and certified specialists.',
        subItems: [
          { name: '24/7 SLA-Backed Support', href: '/services/sap-business-one' },
          { name: 'Incident & Defect Resolution', href: '/services/sap-business-one' },
          { name: 'System Health Checks & Tuning', href: '/services/sap-business-one' },
          { name: 'End-User Knowledge Transfer', href: '/services/sap-business-one' }
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
        id: 'sap-business-one',
        name: 'SAP Business One',
        icon: 'Database',
        href: '/solutions#sap-b1-section',
        description: 'Complete enterprise ERP managing finance, sales, purchasing, inventory, and operations in a single database.',
        subItems: [
          { name: 'Financial Management & Accounting', href: '/solutions' },
          { name: 'Sales & Customer Relationship (CRM)', href: '/solutions' },
          { name: 'Purchasing & Inventory Control', href: '/solutions' },
          { name: 'Executive Real-Time Analytics', href: '/solutions' }
        ]
      },
      {
        id: 'boyum-it-solutions',
        name: 'Boyum IT Solutions',
        icon: 'Layers',
        href: '/solutions/boyum-it',
        description: 'World-class SAP Certified add-ons for discrete manufacturing, advanced warehousing, and screen customization.',
        subItems: [
          { name: 'Beas Manufacturing (APS / MRP)', href: '/solutions/boyum-it' },
          { name: 'Produmex WMS & Mobile Barcode RF', href: '/solutions/boyum-it' },
          { name: 'B1 Usability Package (B1UP)', href: '/solutions/boyum-it' },
          { name: 'Produmex Scan Handheld Suite', href: '/solutions/boyum-it' }
        ]
      },
      {
        id: 'uipath-rpa-ai',
        name: 'UiPath RPA & AI Automation',
        icon: 'Zap',
        href: '/services/uipath-automation',
        description: 'Enterprise software robots and AI Document Understanding eliminating repetitive manual transactional tasks.',
        subItems: [
          { name: 'Invoice & GRPO Automated Processing', href: '/services/uipath-automation' },
          { name: 'AI Document Understanding (OCR)', href: '/services/uipath-automation' },
          { name: 'Automated Bank Reconciliation', href: '/services/uipath-automation' },
          { name: 'Vendor Statement Matching', href: '/services/uipath-automation' }
        ]
      },
      {
        id: 'atlas-proprietary-addons',
        name: 'ATLAS Proprietary Add-ons',
        icon: 'Cpu',
        href: '/services/atlas-addons',
        description: 'Niche proprietary IP solutions designed to address complex industrial, trading, and logistics requirements.',
        subItems: [
          { name: 'Multi-Modal Freight & Cargo Trading', href: '/services/atlas-addons' },
          { name: 'AI Gate Entry & Weighbridge Automation', href: '/services/atlas-addons' },
          { name: 'Vendor Collaboration Portal', href: '/services/atlas-addons' },
          { name: 'Export & Shipping Documentation', href: '/services/atlas-addons' }
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
        href: '/industries#manufacturing',
        description: 'Discrete, batch, chemical, and engineered-to-order manufacturing with live shop-floor data collection.',
        subItems: [
          { name: 'Advanced Planning & Scheduling (APS)', href: '/industries' },
          { name: 'Multi-Level Bill of Materials (BOM)', href: '/industries' },
          { name: 'Shop-Floor Data Capture & Job Costing', href: '/industries' },
          { name: 'Batch Traceability & Quality Control', href: '/industries' }
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
    name: 'Contact',
    href: '/contact',
    hasDropdown: false,
  }
];
