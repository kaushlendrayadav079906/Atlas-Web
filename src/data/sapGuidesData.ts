import { SapGuideItem } from '../types/resources';

export const SAP_GUIDES: SapGuideItem[] = [
  {
    id: 'sap-b1-introduction',
    slug: 'sap-business-one-introduction',
    title: 'SAP Business One: Complete Architectural & Operational Guide',
    category: 'Fundamentals',
    summary: 'A foundational architecture guide for growing enterprises evaluating SAP Business One. Understand core database capabilities, native modules, and how unified financials, purchasing, sales, and inventory eliminate operational silos.',
    readTime: '8 min read',
    targetAudience: 'MDs, CEOs, CFOs, IT Directors evaluating ERP platforms for 20 to 500+ employee enterprises',
    documentType: 'Interactive Architecture Blueprint',
    isOfficialWhitepaperAvailable: false,
    whitepaperNote: 'Official architectural blueprints and sizing estimates are delivered directly following technical scoping with our certified architects.',
    topicsCovered: [
      'Core ERP architecture: Single database vs disparate point software',
      'Native modules: Financials, Sales CRM, Purchasing, Inventory, MRP, Service',
      'SQL Server vs SAP HANA in-memory processing models',
      'Licensing structure: Professional, Limited CRM, Logistics, Financial licenses',
      'Deployment models: On-Premise, Private Hosted Cloud, SAP Cloud Platform'
    ],
    keyHighlights: [
      {
        title: 'Single Source of Enterprise Truth',
        description: 'Transactions entered in sales or warehouse instantly update general ledgers and inventory balances with zero end-of-day batch processing.'
      },
      {
        title: 'Built Specifically for Growing SMEs',
        description: 'Avoid the overhead and 18-month implementation cycles of tier-1 systems while gaining enterprise-grade audit controls and statutory compliance.'
      },
      {
        title: 'Extensible via REST API Service Layer',
        description: 'Native RESTful architecture enables direct bi-directional connectivity with e-commerce, custom customer portals, and barcode scanning devices.'
      }
    ],
    prerequisites: [
      'Documented business processes across accounting and inventory',
      'Defined chart of accounts and multi-branch organizational hierarchy',
      'Identified user counts and departmental access requirements'
    ],
    implementationSteps: [
      'Process discovery & gap analysis against standard SAP B1 workflows',
      'Master data standardization (Item Master, Business Partner, Chart of Accounts)',
      'System configuration and user role authorization matrices',
      'User Acceptance Testing (UAT) with real operational transactional data',
      'Production cutover, opening balance migration, and hypercare support'
    ],
    recommendedSolutions: [
      { name: 'SAP Business One Implementation', href: '/services/sap-business-one' },
      { name: 'Manufacturing Domain Solutions', href: '/industries/manufacturing' }
    ]
  },
  {
    id: 'sap-implementation-methodology',
    slug: 'sap-implementation-methodology',
    title: 'Structured 5-Phase SAP Implementation Methodology',
    category: 'Implementation',
    summary: 'A battle-tested 45-to-90 day deployment roadmap minimizing operational disruption. Outlines the ATLAS phased delivery framework from project charter and business blueprint to cutover and Go-Live stabilization.',
    readTime: '10 min read',
    targetAudience: 'Project Managers, Steering Committees, Department Heads preparing for ERP rollout',
    documentType: 'Implementation Methodology',
    isOfficialWhitepaperAvailable: false,
    whitepaperNote: 'Full implementation schedule templates and RACI governance matrices are provided during formal project kickoff.',
    topicsCovered: [
      'Phase 1: Project Preparation, Charter & Steering Committee Setup',
      'Phase 2: Business Blueprint & Process Mapping (As-Is vs To-Be)',
      'Phase 3: System Realization, Custom Add-on Build & Unit Testing',
      'Phase 4: Final Preparation, Master Data Cleansing & User Training (UAT)',
      'Phase 5: Go-Live Cutover, Reconciliation & 30-Day Hypercare'
    ],
    keyHighlights: [
      {
        title: 'Zero Operational Downtime Cutover',
        description: 'Weekend migration cutovers ensure dispatch and invoicing resume Monday morning with verified opening balances.'
      },
      {
        title: 'Rigorous Change Management & Training',
        description: 'Hands-on role-based training ensures department staff master daily routines in test environments before production go-live.'
      },
      {
        title: 'Traceable Acceptance Gateways',
        description: 'Each implementation phase requires sign-off from both client project leads and ATLAS solution architects before milestone advancement.'
      }
    ],
    prerequisites: [
      'Dedicated client internal Project Champion with cross-department authority',
      'Clean historical customer, vendor, and item master databases',
      'Hardware and network infrastructure meeting SAP sizing recommendations'
    ],
    implementationSteps: [
      'Kickoff meeting, charter approval, and sandbox environment deployment',
      'Departmental workshops to document standard operating procedures (SOPs)',
      'Configuration of posting periods, tax depreciation, and payment terms',
      'Mock cutover simulation and trial balance verification',
      'Go-live execution and on-site support at manufacturing and warehouse facilities'
    ],
    recommendedSolutions: [
      { name: 'ATLAS ERP Advisory Services', href: '/services/sap-business-one' },
      { name: 'AMS 24/7 SLA Maintenance', href: '/services/support-maintenance' }
    ]
  },
  {
    id: 'sap-hana-migration',
    slug: 'sap-hana-migration-guide',
    title: 'Migrating from Microsoft SQL Server to SAP HANA In-Memory',
    category: 'HANA Migration',
    summary: 'A technical roadmap for businesses experiencing performance bottlenecks on legacy SQL databases. Learn how in-memory columnar processing accelerates reporting by up to 100x and unlocks embedded analytics.',
    readTime: '7 min read',
    targetAudience: 'Chief Technology Officers, IT Infrastructure Heads, Database Administrators',
    documentType: 'Migration Checklist',
    isOfficialWhitepaperAvailable: false,
    whitepaperNote: 'Hardware sizing benchmarks (RAM, CPU cores, NVMe IOPS) and migration effort assessments are prepared on-demand for existing SAP B1 customers.',
    topicsCovered: [
      'Row-based SQL vs In-Memory Columnar HANA architecture comparison',
      'Database health audits, table fragmentation, and cleanup before migration',
      'Sizing RAM and core requirements for SUSE Linux Enterprise / Red Hat',
      'Migrating user-defined queries, stored procedures, and formatted searches to HANA SQLScript',
      'Zero-data-loss backup and cutover execution protocol'
    ],
    keyHighlights: [
      {
        title: 'Sub-Second Analytics & Dashboard KPIs',
        description: 'Compute inventory turnover, cash-flow projections, and gross margin analyses instantly across millions of historical transactional records.'
      },
      {
        title: 'Pervasive Analytics & Interactive Dashboards',
        description: 'Enable native HTML5 Fiori dashboards and visual KPI sidebars directly inside every user document view.'
      },
      {
        title: 'Optimized Hardware Footprint',
        description: 'Advanced data compression reduces database storage volume by up to 70% compared to uncompressed relational tables.'
      }
    ],
    prerequisites: [
      'Existing SAP Business One license compatibility check (HANA engine licenses)',
      'Certified SAP HANA hardware appliance or certified cloud VM (AWS, Azure, Google Cloud)',
      'Inventory of customized crystal reports, queries, and external API connectors'
    ],
    implementationSteps: [
      'Legacy database compatibility scan using SAP Migration Tools',
      'Query remediation: Rewriting T-SQL syntax into standard ANSI / HANA SQLScript',
      'Pilot database restore and validation in staging HANA environment',
      'End-to-end regression testing of critical business documents',
      'Production migration cutover during scheduled maintenance window'
    ],
    recommendedSolutions: [
      { name: 'SAP HANA In-Memory Services', href: '/services/sap-business-one' },
      { name: 'Finance Automation Solutions', href: '/industries/finance-administration' }
    ]
  },
  {
    id: 'inventory-warehouse-management',
    slug: 'inventory-warehouse-management-guide',
    title: 'Optimizing Multi-Bin Inventory & Warehouse Controls in SAP',
    category: 'Inventory & Logistics',
    summary: 'A practical guide to achieving 99%+ inventory accuracy. Details multi-bin location setup, batch and serial number tracking, valuation methods (FIFO, Moving Average), and barcode handheld RF scanner integration.',
    readTime: '9 min read',
    targetAudience: 'Supply Chain Directors, Warehouse Managers, Operations Controllers',
    documentType: 'Workflow Standard',
    isOfficialWhitepaperAvailable: false,
    whitepaperNote: 'Detailed warehouse layout blueprints and RF scanner hardware compatibility matrices are provided during on-site warehouse assessments.',
    topicsCovered: [
      'Hierarchical warehouse zoning: Aisles, Racks, Shelves, and Dynamic Bins',
      'Mandatory batch and serial tracking for compliance (Expiry, Heat numbers, QA)',
      'Real-time valuation models: Moving Average vs FIFO vs Standard Costing',
      'Cycle counting without shutting down full-facility operations',
      'Extending native inventory with Boyum Produmex WMS handheld RF terminals'
    ],
    keyHighlights: [
      {
        title: 'Elimination of Stockouts and Misplacements',
        description: 'System-directed putaway ensures goods inward are stored in optimal bins based on weight, volume, and turnover velocity.'
      },
      {
        title: 'Real-Time Valuation and Cost Control',
        description: 'Every receipt, transfer, and dispatch updates financial cost-of-goods-sold (COGS) ledgers with zero valuation discrepancies.'
      },
      {
        title: 'Handheld Barcode & QR Verification',
        description: 'Pick-and-pack scanning prevents wrong shipments, duplicate dispatches, and manual delivery challan errors.'
      }
    ],
    prerequisites: [
      'Physical warehouse rack labeling and bin nomenclature standardization',
      'Standardized unit of measurement (UoM) conversion tables',
      'Operational handheld mobile terminals (Android-based RF scanners)'
    ],
    implementationSteps: [
      'Warehouse mapping into SAP B1 Bin Location master data',
      'Item classification by inventory valuation method and serial/batch governance',
      'Configuration of Goods Receipt PO and Delivery scanning workflows',
      'Staff training on handheld RF scanning devices and exception handling',
      'Baseline physical inventory count reconciliation'
    ],
    recommendedSolutions: [
      { name: 'Boyum Produmex WMS Solutions', href: '/services/boyum-it' },
      { name: 'Warehouse & Logistics Industry Solutions', href: '/industries/warehouse-logistics' }
    ]
  },
  {
    id: 'finance-accounting-architecture',
    slug: 'finance-accounting-architecture-guide',
    title: 'Financial Architecture, Statutory Compliance & GST in SAP',
    category: 'Finance & Tax',
    summary: 'An executive blueprint for finance leaders. Learn how SAP Business One structures multi-currency general ledgers, automates GST & TDS statutory compliance, streamlines e-way billing, and accelerates month-end closing.',
    readTime: '8 min read',
    targetAudience: 'Chief Financial Officers, Financial Controllers, Statutory Auditors',
    documentType: 'Interactive Architecture Blueprint',
    isOfficialWhitepaperAvailable: false,
    whitepaperNote: 'Statutory GST rulebooks and automated bank reconciliation integration specs are shared during financial discovery sessions.',
    topicsCovered: [
      'Segmented Chart of Accounts for multi-division and multi-branch tracking',
      'Statutory compliance: GST calculation, GSTR-1 / GSTR-3B filing, and e-Invoicing QR codes',
      'TDS / TCS deductions, challan tracking, and form 16A generation',
      'Automated bank statement reconciliation and MT940 / CSV imports',
      'Month-end financial close acceleration from 10 days to under 48 hours'
    ],
    keyHighlights: [
      {
        title: 'Audit-Proof Financial Governance',
        description: 'Immutable drill-down audit trails from consolidated balance sheets directly to underlying journal entries and source documents.'
      },
      {
        title: 'Seamless Indian Statutory Compliance',
        description: 'Direct NIC portal integration generates verified Government IRN numbers and signed QR codes on every tax invoice.'
      },
      {
        title: 'Multi-Currency Foreign Exchange Controls',
        description: 'Automatic revaluation of foreign currency accounts, tracking realized and unrealized exchange rate gains and losses.'
      }
    ],
    prerequisites: [
      'Defined account segmentation (Location, Division, Department, Project)',
      'GSTIN registrations and authorized API credentials for government portals',
      'Standardized credit terms, dunning levels, and payment approval thresholds'
    ],
    implementationSteps: [
      'Chart of Accounts restructuring to align with Indian Accounting Standards (Ind AS)',
      'Tax engine configuration: CGST, SGST, IGST, RCM, and TDS tables',
      'Direct API connection setup to Government e-Invoice and e-Way bill portals',
      'Financial report customization (P&L by branch, Cash Flow, Aging analyses)',
      'Opening balance journal entry reconciliation against signed audited accounts'
    ],
    recommendedSolutions: [
      { name: 'Finance Automation Practice', href: '/industries/finance-administration' },
      { name: 'SAP Business One Core Services', href: '/services/sap-business-one' }
    ]
  },
  {
    id: 'sap-integrations-service-layer',
    slug: 'sap-integrations-service-layer-guide',
    title: 'Modern ERP Connectivity: SAP Service Layer REST APIs',
    category: 'Integrations',
    summary: 'A developer and architect guide to building real-time integrations with SAP Business One. Learn how the OData-based REST Service Layer connects web applications, Shopify/WooCommerce, CRM, IoT, and custom legacy systems.',
    readTime: '9 min read',
    targetAudience: 'Enterprise Architects, Full-Stack Developers, Integration Specialists',
    documentType: 'Interactive Architecture Blueprint',
    isOfficialWhitepaperAvailable: false,
    whitepaperNote: 'Postman collections, OpenAPI schemas, and authentication handshake templates are shared with client technical engineering leads.',
    topicsCovered: [
      'Evolution from legacy DI-API / DI-Server to lightweight HTTP REST Service Layer',
      'OData standard: Querying, filtering ($filter), pagination ($top, $skip), and payload formatting',
      'Session authentication, B1Session management, and high-availability connection pools',
      'Handling asynchronous bulk operations and multi-document transactions',
      'Connecting external systems: eCommerce, CRM, shipping aggregators, and IoT sensors'
    ],
    keyHighlights: [
      {
        title: 'Platform-Agnostic Web Architecture',
        description: 'Integrate using any modern programming language (Node.js, Python, C#, Go) via standard HTTPS REST calls.'
      },
      {
        title: 'Strict Business Logic Enforcement',
        description: 'The Service Layer validates all business rules, ensuring invalid quantities, blocked customers, or locked periods are rejected at API entry.'
      },
      {
        title: 'High-Concurrency Throughput',
        description: 'Engineered for high-volume transactions such as online order surges and real-time conveyor belt sensor entries.'
      }
    ],
    prerequisites: [
      'SAP Business One version 9.2 or higher running on SAP HANA or MS SQL 2016+',
      'Service Layer daemon enabled and secured behind an HTTPS reverse proxy',
      'Dedicated integration user license with required object authorizations'
    ],
    implementationSteps: [
      'Service Layer SSL certificate installation and reverse proxy configuration',
      'Authentication credential provisioning and session keep-alive handling',
      'Endpoint mapping for primary entities (Orders, Invoices, Business Partners, Items)',
      'Idempotency and webhook retry mechanism implementation for failed syncs',
      'Stress testing and performance tuning for peak transactional throughput'
    ],
    recommendedSolutions: [
      { name: 'UiPath RPA & AI Integration', href: '/services/uipath-rpa' },
      { name: 'ATLAS Custom Add-on Modules', href: '/solutions' }
    ]
  }
];

