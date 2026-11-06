export interface SubmenuItem {
  name: string;
  href: string;
  summary?: string; // One-line description shown in the mega menu
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
          { name: 'Our Story & Vision', href: '/about', summary: 'How ATLAS grew into a trusted SAP partner in Mumbai.' },
          { name: 'Mission & Values', href: '/about#values', summary: 'The principles behind every engagement we take on.' },
          { name: '15+ Years Track Record', href: '/about#timeline', summary: 'A history of successful ERP projects since 2008.' },
          { name: 'Office Locations (Borivali & Marine Lines)', href: '/contact', summary: 'Visit our two Mumbai offices.' }
        ]
      },
      {
        id: 'approach-values',
        name: 'Our Approach & Values',
        icon: 'ShieldCheck',
        href: '/about#values',
        description: 'Delivering sustainable business value through zero-manual-touch automation and resilient ERP foundations.',
        subItems: [
          { name: 'Client-Centric SLA Focus', href: '/about#values', summary: 'Support commitments built around your business hours.' },
          { name: 'Proven 4-Step Methodology', href: '/#approach', summary: 'Discover, design, implement and optimize.' },
          { name: 'Enterprise Security & Compliance', href: '/about', summary: 'Secure, audit-ready ERP environments.' },
          { name: 'Continuous AMS Optimization', href: '/services', summary: 'Ongoing tuning after go-live, not just support.' }
        ]
      },
      {
        id: 'journey-milestones',
        name: 'Journey & Milestones',
        icon: 'Clock',
        href: '/about#timeline',
        description: 'Explore our evolution across 80+ successful ERP implementations since 2008.',
        subItems: [
          { name: 'Foundational Milestones', href: '/about#timeline', summary: 'Key moments that shaped ATLAS Technosoft.' },
          { name: 'SAP Channel Partnership', href: '/partners/sap-business-one', summary: 'Our authorized SAP Business One partnership.' },
          { name: 'Boyum IT & UiPath Alliances', href: '/partners', summary: 'Partnerships that extend SAP with WMS and RPA.' },
          { name: 'Enterprise Customer Stories', href: '/case-studies', summary: 'Real results from companies we work with.' }
        ]
      },
      {
        id: 'leadership-team',
        name: 'Leadership & Team',
        icon: 'Users',
        href: '/about#team',
        description: '32 certified consultants across SAP HANA, Beas Manufacturing, Produmex WMS, and UiPath RPA.',
        subItems: [
          { name: 'Executive Leadership', href: '/about#team', summary: 'The people steering ATLAS Technosoft.' },
          { name: 'SAP Functional & Technical Leads', href: '/about#team', summary: 'Consultants who design and build your ERP.' },
          { name: 'RPA & Automation Architects', href: '/about#team', summary: 'Specialists who design your software robots.' },
          { name: 'Dedicated AMS Account Managers', href: '/contact', summary: 'One point of contact for ongoing support.' }
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
          { name: 'SAP Business One Implementation', href: '/services/sap-business-one', summary: 'End-to-end rollout of SAP Business One.' },
          { name: 'Process Consulting', href: '/services/sap-business-one', summary: 'Map and improve processes before you automate.' },
          { name: 'System Integration', href: '/services/atlas-addons', summary: 'Connect SAP with the rest of your systems.' },
          { name: 'Ongoing Support (AMS)', href: '/services/sap-business-one', summary: 'Application management after go-live.' }
        ]
      },
      {
        id: 'implementation',
        name: 'Implementation',
        icon: 'Layers',
        href: '/services/sap-business-one',
        description: 'Structured, proven implementation methodology for Cloud and On-Premise SAP Business One architectures.',
        subItems: [
          { name: 'Cloud & On-Premise Deployments', href: '/services/sap-business-one', summary: 'Run SAP Business One where it suits you.' },
          { name: 'Multi-Company Template Setup', href: '/services/sap-business-one', summary: 'One template rolled out across entities.' },
          { name: 'Data Migration & Validation', href: '/services/sap-business-one', summary: 'Move legacy data cleanly and verify it.' },
          { name: 'Go-Live & Cutover Support', href: '/services/sap-business-one', summary: 'Hands-on help through launch week.' }
        ]
      },
      {
        id: 'support-ams',
        name: 'Support & AMS',
        icon: 'Headphones',
        href: '/services/support-maintenance',
        description: 'Dedicated Application Management Services (AMS) backed by guaranteed SLAs and certified specialists.',
        subItems: [
          { name: '24/7 SLA-Backed Support', href: '/services/support-maintenance#sla-matrix', summary: 'Guaranteed response times, around the clock.' },
          { name: 'Incident & Defect Resolution', href: '/services/support-maintenance#sla-matrix', summary: 'Fast fixes tracked against clear SLAs.' },
          { name: 'System Health Checks & Tuning', href: '/services/support-maintenance', summary: 'Keep your system fast and stable.' },
          { name: 'End-User Knowledge Transfer', href: '/services/support-maintenance', summary: 'Train your team to use SAP confidently.' }
        ]
      },
      {
        id: 'upgrades-migration',
        name: 'Upgrades & Migration',
        icon: 'RefreshCw',
        href: '/services/sap-business-one',
        description: 'Seamless upgrades to the latest SAP Business One versions and zero-downtime SAP HANA database migrations.',
        subItems: [
          { name: 'SAP HANA In-Memory Migration', href: '/services/sap-business-one', summary: 'Move to SAP HANA for faster reporting.' },
          { name: 'SQL to SAP HANA Conversion', href: '/services/sap-business-one', summary: 'Convert SQL Server databases to HANA.' },
          { name: 'Version & Patch Upgrades', href: '/services/sap-business-one', summary: 'Stay current with SAP releases.' },
          { name: 'Add-on Compatibility Audits', href: '/services/sap-business-one', summary: 'Check add-ons before you upgrade.' }
        ]
      },
      {
        id: 'integration-services',
        name: 'Integration Services',
        icon: 'Link2',
        href: '/services/atlas-addons',
        description: 'Connecting SAP Business One seamlessly with e-commerce, third-party logistics, machinery, and external APIs.',
        subItems: [
          { name: 'Boyum IT (Beas & Produmex)', href: '/services/boyum-it', summary: 'Manufacturing and WMS add-ons for SAP.' },
          { name: 'UiPath RPA Bot Connectors', href: '/services/uipath-automation', summary: 'Robots that work directly inside SAP.' },
          { name: 'ATLAS Proprietary Add-on Bridges', href: '/services/atlas-addons', summary: 'Our own add-ons, integrated with SAP.' },
          { name: 'Custom REST APIs & EDI Bridges', href: '/services/atlas-addons', summary: 'Connect partners, portals and marketplaces.' }
        ]
      },
      {
        id: 'consulting-advisory',
        name: 'Consulting & Advisory',
        icon: 'Users',
        href: '/services',
        description: 'Strategic ERP consulting, statutory compliance checks, and business process re-engineering for high-growth SMEs.',
        subItems: [
          { name: 'ERP Audit & Architecture Review', href: '/services', summary: 'An expert review of your current ERP.' },
          { name: 'Business Process Optimization', href: '/services', summary: 'Remove manual steps and bottlenecks.' },
          { name: 'GST & E-Invoicing Compliance', href: '/services', summary: 'Stay compliant with Indian tax rules.' },
          { name: 'Digital Transformation Roadmap', href: '/services', summary: 'A phased plan for modernizing operations.' }
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
          { name: 'Beas Manufacturing (APS / MRP)', href: '/solutions/manufacturing', summary: 'Production planning and MRP inside SAP.' },
          { name: 'Multi-Level BOM & Cost Estimation', href: '/solutions/manufacturing', summary: 'Accurate product structures and costing.' },
          { name: 'Shop-Floor Data Collection (Terminal)', href: '/solutions/manufacturing', summary: 'Capture production data in real time.' },
          { name: 'Quality Control & Batch Traceability', href: '/solutions/manufacturing', summary: 'Track every batch from input to dispatch.' }
        ]
      },
      {
        id: 'warehouse-solutions',
        name: 'Warehouse Management (WMS)',
        icon: 'Truck',
        href: '/solutions/warehouse-management',
        description: 'Multi-bin storage hierarchy, RF handheld barcode scanning, automated e-way billing, and lot control.',
        subItems: [
          { name: 'Produmex WMS Integration', href: '/solutions/warehouse-management', summary: 'Advanced warehouse management for SAP.' },
          { name: 'Handheld RF Barcode Scanning', href: '/solutions/warehouse-management', summary: 'Scan-based picking, putaway and counts.' },
          { name: 'Batch & Serial Number Tracking', href: '/solutions/warehouse-management', summary: 'Full traceability for every unit.' },
          { name: 'Automated E-Way Bill & Dispatch', href: '/solutions/warehouse-management', summary: 'Generate e-way bills as goods ship.' }
        ]
      },
      {
        id: 'finance-automation',
        name: 'Finance Automation Solutions',
        icon: 'TrendingUp',
        href: '/solutions/finance-automation',
        description: 'SAP HANA in-memory financials, UiPath OCR AP invoice ingestion, and automated bank reconciliation.',
        subItems: [
          { name: 'SAP HANA In-Memory Financials', href: '/solutions/finance-automation', summary: 'Real-time finance on SAP HANA.' },
          { name: 'UiPath AI Invoice & GRPO Ingestion', href: '/solutions/finance-automation', summary: 'Robots read invoices and post them.' },
          { name: 'GSTR-2B & Vendor Statement Matching', href: '/solutions/finance-automation', summary: 'Automatic tax and vendor reconciliation.' },
          { name: 'Automated Bank Reconciliation', href: '/solutions/finance-automation', summary: 'Match bank statements without manual work.' }
        ]
      },
      {
        id: 'logistics-shipping',
        name: 'Logistics & Shipping Solutions',
        icon: 'Ship',
        href: '/solutions/logistics-shipping',
        description: 'Multi-modal freight forwarding, precision landed cost allocation, weighbridge automation, and EXIM compliance.',
        subItems: [
          { name: 'Multi-Modal Freight & Cargo Tracking', href: '/solutions/logistics-shipping', summary: 'Track shipments across sea, air and road.' },
          { name: 'Precision Landed Cost Allocation', href: '/solutions/logistics-shipping', summary: 'Know the true cost of every import.' },
          { name: 'Electronic Weighbridge & Gate Entry', href: '/solutions/logistics-shipping', summary: 'Automate weighment and gate records.' },
          { name: 'EXIM Customs Documentation', href: '/solutions/logistics-shipping', summary: 'Export-import paperwork, generated in SAP.' }
        ]
      },
      {
        id: 'boyum-it-solutions',
        name: 'Boyum IT Solutions',
        icon: 'Layers',
        href: '/solutions/boyum-it',
        description: 'World-class SAP Certified add-ons for discrete manufacturing, advanced warehousing, and screen customization.',
        subItems: [
          { name: 'Beas Manufacturing', href: '/solutions/manufacturing', summary: 'Manufacturing planning and execution.' },
          { name: 'Produmex WMS Suite', href: '/solutions/warehouse-management', summary: 'Warehouse management built for SAP.' },
          { name: 'B1 Usability Package (B1UP)', href: '/solutions/boyum-it', summary: 'Customize SAP screens without coding.' },
          { name: 'Boyum Cloud & Usability', href: '/solutions/boyum-it', summary: 'Cloud tools that make SAP easier to use.' }
        ]
      },
      {
        id: 'atlas-proprietary-addons',
        name: 'ATLAS Proprietary Add-ons',
        icon: 'Cpu',
        href: '/solutions/atlas-addons',
        description: 'Niche proprietary IP solutions designed to address complex industrial, trading, and logistics requirements.',
        subItems: [
          { name: 'Multi-Modal Freight & Cargo Trading', href: '/solutions/atlas-addons', summary: 'Freight and trading workflows in SAP.' },
          { name: 'AI Gate Entry & Weighbridge Automation', href: '/solutions/atlas-addons', summary: 'Smart gate and weighbridge records.' },
          { name: 'Vendor Collaboration Portal', href: '/solutions/atlas-addons', summary: 'Let suppliers share documents online.' },
          { name: 'Export & Shipping Documentation', href: '/solutions/atlas-addons', summary: 'Shipping documents generated automatically.' }
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
          { name: 'Advanced Planning & Scheduling (APS)', href: '/industries/manufacturing', summary: 'Plan capacity and production smarter.' },
          { name: 'Multi-Level Bill of Materials (BOM)', href: '/industries/manufacturing', summary: 'Manage complex product structures.' },
          { name: 'Shop-Floor Data Capture & Job Costing', href: '/industries/manufacturing', summary: 'Live job costs from the factory floor.' },
          { name: 'Batch Traceability & Quality Control', href: '/industries/manufacturing', summary: 'Quality checks with full traceability.' }
        ]
      },
      {
        id: 'warehouse-logistics',
        name: 'Warehouse & Logistics',
        icon: 'Truck',
        href: '/industries/warehouse-logistics',
        description: 'Optimized multi-bin storage, automated pick/pack/ship workflows, and real-time inventory visibility.',
        subItems: [
          { name: 'Produmex WMS & Handheld RF Scanners', href: '/industries/warehouse-logistics', summary: 'Scanner-driven warehouse operations.' },
          { name: 'Intelligent Picking & Putaway Logic', href: '/industries/warehouse-logistics', summary: 'Faster, rule-based picking routes.' },
          { name: '3PL Billing & Landed Cost Tracking', href: '/industries/warehouse-logistics', summary: 'Bill clients and track true costs.' },
          { name: 'Cross-Docking & Dispatch Speed', href: '/industries/warehouse-logistics', summary: 'Move goods out faster.' }
        ]
      },
      {
        id: 'finance-administration',
        name: 'Finance & Administration',
        icon: 'TrendingUp',
        href: '/industries/finance-administration',
        description: 'Touchless accounts payable/receivable, accelerated month-end close, and strict audit compliance.',
        subItems: [
          { name: 'Multi-Entity Financial Consolidation', href: '/industries/finance-administration', summary: 'One view across all your companies.' },
          { name: 'Automated Bank Reconciliations', href: '/industries/finance-administration', summary: 'Bank matching without spreadsheets.' },
          { name: 'Statutory GST & E-Invoicing Precision', href: '/industries/finance-administration', summary: 'Accurate, compliant tax filings.' },
          { name: 'Real-Time Executive Cashflow Analytics', href: '/industries/finance-administration', summary: 'Live cash position for leadership.' }
        ]
      },
      {
        id: 'trading-shipping',
        name: 'Trading & Shipping',
        icon: 'Boxes',
        href: '/industries/trading-shipping',
        description: 'Unified multi-currency operations, container tracking, import-export customs, and margin control.',
        subItems: [
          { name: 'EXIM & Shipping Documentation', href: '/industries/trading-shipping', summary: 'Trade paperwork handled in SAP.' },
          { name: 'Automated Landed Cost Calculation', href: '/industries/trading-shipping', summary: 'Duties and freight allocated automatically.' },
          { name: 'Multi-Currency Forex Clearing', href: '/industries/trading-shipping', summary: 'Handle foreign currency with ease.' },
          { name: 'Container & Shipment Milestone Tracking', href: '/industries/trading-shipping', summary: 'Follow every container to delivery.' }
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
          { name: 'SAP Business One Cloud & On-Premise', href: '/partners/sap-business-one', summary: 'Deployment options for SAP Business One.' },
          { name: 'SAP HANA In-Memory Database', href: '/partners/sap-business-one', summary: 'The fast database behind modern SAP.' },
          { name: 'Certified Functional & Technical Consultants', href: '/partners/sap-business-one', summary: 'SAP-certified experts on your project.' },
          { name: 'Global Template Architecture', href: '/partners/sap-business-one', summary: 'Standardize SAP across countries.' }
        ]
      },
      {
        id: 'boyum-it-partnership',
        name: 'Boyum IT Partnership',
        icon: 'Layers',
        href: '/partners/boyum-it',
        description: 'Certified Boyum IT Silver Partner specializing in Beas Manufacturing, Produmex WMS, and B1UP.',
        subItems: [
          { name: 'Beas Manufacturing Implementation', href: '/partners/boyum-it', summary: 'Deploy Beas with certified specialists.' },
          { name: 'Produmex WMS Deployment', href: '/partners/boyum-it', summary: 'Roll out Produmex across your warehouses.' },
          { name: 'B1 Usability Package Customization', href: '/partners/boyum-it', summary: 'Tailor SAP to how your team works.' },
          { name: 'Certified Module Specialists', href: '/partners/boyum-it', summary: 'Boyum-certified consultants.' }
        ]
      },
      {
        id: 'uipath-partnership',
        name: 'UiPath Partnership',
        icon: 'Zap',
        href: '/partners/uipath',
        description: 'Certified UiPath Silver Partner providing intelligent software robots and AI Document Understanding.',
        subItems: [
          { name: 'RPA Bot Design & Deployment', href: '/partners/uipath', summary: 'Design, build and run UiPath robots.' },
          { name: 'Document Understanding & Intelligent OCR', href: '/partners/uipath', summary: 'Extract data from documents with AI.' },
          { name: 'Attended & Unattended Bot Orchestration', href: '/partners/uipath', summary: 'Robots that run with or without people.' },
          { name: 'Process Mining & ROI Audits', href: '/partners/uipath', summary: 'Find what to automate and prove the return.' }
        ]
      }
    ]
  },
  {
    name: 'Resources',
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
          { name: 'All Insights & Articles', href: '/blog', summary: 'Every article from our consultants.' },
          { name: 'SAP Business One Strategy', href: '/blog?category=SAP+Business+One', summary: 'Getting more value from SAP Business One.' },
          { name: 'Manufacturing & Operations', href: '/blog?category=Manufacturing', summary: 'Ideas for running production better.' },
          { name: 'UiPath & Intelligent RPA', href: '/blog?category=UiPath+%26+Intelligent+Automation', summary: 'Practical automation with UiPath.' }
        ]
      },
      {
        id: 'sap-guides',
        name: 'SAP Guides',
        icon: 'FileText',
        href: '/resources/sap-guides',
        description: 'Educational resources and blueprints covering SAP Business One basics, HANA migration, and financial architecture.',
        subItems: [
          { name: 'SAP Business One Introduction', href: '/resources/sap-guides#sap-b1-introduction', summary: 'What SAP Business One is and does.' },
          { name: 'SAP Implementation Methodology', href: '/resources/sap-guides#sap-implementation-methodology', summary: 'How a successful rollout is structured.' },
          { name: 'SAP HANA Migration Guide', href: '/resources/sap-guides#sap-hana-migration', summary: 'Planning your move to SAP HANA.' },
          { name: 'Inventory & Accounting Controls', href: '/resources/sap-guides#inventory-warehouse-management', summary: 'Keep stock and books in sync.' }
        ]
      },
      {
        id: 'industry-insights',
        name: 'Industry Insights',
        icon: 'TrendingUp',
        href: '/resources/industry-insights',
        description: 'Sector-specific frameworks for discrete manufacturing, multi-bin warehousing, and automated trading operations.',
        subItems: [
          { name: 'Manufacturing ERP (Beas)', href: '/resources/industry-insights#manufacturing-erp-insight', summary: 'How Beas modernizes manufacturing.' },
          { name: 'Warehouse Logistics (Produmex)', href: '/resources/industry-insights#warehouse-management-insight', summary: 'How Produmex speeds up warehouses.' },
          { name: 'Finance & Compliance Automation', href: '/resources/industry-insights#finance-automation-insight', summary: 'Automating finance and tax work.' },
          { name: 'Trading & Shipping Automation', href: '/resources/industry-insights#trading-shipping-insight', summary: 'Automating trade and shipping workflows.' }
        ]
      },
      {
        id: 'faqs',
        name: 'FAQs',
        icon: 'HelpCircle',
        href: '/resources/faqs',
        description: 'Answers to frequently asked questions regarding SAP Business One, Boyum IT modules, UiPath RPA, and support SLAs.',
        subItems: [
          { name: 'SAP Business One Essentials', href: '/resources/faqs#sap-b1', summary: 'Common questions about SAP Business One.' },
          { name: 'Implementation & Migration', href: '/resources/faqs#implementation', summary: 'Timelines, costs and data migration.' },
          { name: 'Boyum IT & WMS Modules', href: '/resources/faqs#boyum-it', summary: 'Questions about Beas, Produmex and B1UP.' },
          { name: 'UiPath RPA & Automation', href: '/resources/faqs#uipath', summary: 'Questions about robots and automation.' }
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
