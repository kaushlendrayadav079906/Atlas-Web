export interface PartnerMetric {
  value: string;
  label: string;
  sublabel: string;
}

export interface PartnerCapability {
  title: string;
  description: string;
  iconName: string;
}

export interface PartnerBenefit {
  title: string;
  description: string;
  metric?: string;
}

export interface HowAtlasWorksPillar {
  step: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface PartnerIndustryUseCase {
  industry: string;
  title: string;
  description: string;
  route: string;
  iconName: string;
}

export interface RelatedPartnerLink {
  title: string;
  description: string;
  route: string;
  category: string;
}

export interface IndividualPartner {
  slug: string;
  route: string;
  name: string;
  badgeType: 'sap' | 'boyum' | 'uipath' | 'atlas';
  eyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  introduction: string;
  partnershipLevel: string;
  heroImage: string;
  secondaryImage: string;
  metrics: PartnerMetric[];
  techOverview: {
    title: string;
    description: string;
    architecturePoints: string[];
  };
  capabilities: PartnerCapability[];
  benefits: PartnerBenefit[];
  howAtlasWorks: HowAtlasWorksPillar[];
  industryUseCases: PartnerIndustryUseCase[];
  relatedServices: RelatedPartnerLink[];
}

export const INDIVIDUAL_PARTNERS_DATA: Record<string, IndividualPartner> = {
  'sap-business-one': {
    slug: 'sap-business-one',
    route: '/partners/sap-business-one',
    name: 'SAP Business One',
    badgeType: 'sap',
    eyebrow: 'AUTHORIZED SAP CHANNEL PARTNER — GLOBAL ERP LEADER',
    heroTitle: 'Comprehensive ERP for Agile, Scalable',
    heroHighlight: 'Enterprise Growth',
    introduction:
      'SAP Business One is the globally trusted enterprise resource planning platform engineered specifically for growing mid-sized enterprises. It unites financials, purchasing, sales, inventory, and operations into a single scalable system powered by high-performance SAP HANA in-memory analytics.',
    partnershipLevel: 'Authorized SAP Channel Partner',
    heroImage: '/images/partners/partners_sap_monitor.jpg',
    secondaryImage: '/images/partners/partners_sap_laptop.jpg',
    metrics: [
      { value: '80+', label: 'Live Deployments', sublabel: 'Across manufacturing, logistics & trade' },
      { value: '32', label: 'Certified Consultants', sublabel: 'SAP HANA & ERP domain specialists' },
      { value: '40%', label: 'Faster Financial Close', sublabel: 'Streamlined month-end reporting' },
      { value: '98.7%', label: 'Retention Rate', sublabel: 'Long-term customer partnerships' }
    ],
    techOverview: {
      title: 'A Unified Digital Backbone Powered by In-Memory Computing',
      description:
        'SAP Business One eliminates operational silos by managing the complete lifecycle of enterprise data within a single transactional core. Available on-premise or in private cloud with native SAP HANA architecture, it processes complex analytical queries in sub-seconds without locking transactional tables.',
      architecturePoints: [
        'High-performance SAP HANA in-memory database with pre-packaged calculation views',
        'Modern RESTful Service Layer enabling bidirectional cloud integrations with e-commerce & MES',
        'Embedded CRM, MRP II, and multi-currency financial consolidation across global entities',
        'Granular role-based security, document approval workflows, and audit-trail compliance'
      ]
    },
    capabilities: [
      {
        title: 'Financial Management & Accounting',
        description:
          'Automate general ledger accounting, accounts payable/receivable, bank statement reconciliation, fixed assets, and multi-country tax filings.',
        iconName: 'Building2'
      },
      {
        title: 'Sales & Customer Management',
        description:
          'Manage end-to-end customer lifecycles from initial opportunity quotation to sales orders, delivery dispatch, and post-sales service contracts.',
        iconName: 'TrendingUp'
      },
      {
        title: 'Purchasing & Procurement Automation',
        description:
          'Streamline purchase requests, purchase orders, goods receipt POs (GRPO), vendor returns, and automated landed cost distribution.',
        iconName: 'ShoppingCart'
      },
      {
        title: 'Multi-Bin Inventory & Warehouse Control',
        description:
          'Real-time inventory valuation (FIFO, Moving Average, Standard), multi-location bin allocations, serial number tracking, and batch controls.',
        iconName: 'Boxes'
      },
      {
        title: 'Production Planning & MRP',
        description:
          'Multi-level bill of materials (BOM), material requirements planning (MRP) wizards, production order issue/receipt, and scrap accounting.',
        iconName: 'Factory'
      },
      {
        title: 'Real-Time Executive Analytics',
        description:
          'Interactive dashboards, embedded KPI tiles, and ad-hoc query generators deliver instantaneous visibility for CFOs, COOs, and business owners.',
        iconName: 'Cpu'
      }
    ],
    benefits: [
      {
        title: 'Single Source of Enterprise Truth',
        description: 'Eliminate disconnected spreadsheets and redundant data entry across departments.',
        metric: '100% data integrity'
      },
      {
        title: 'Substantial Speed in Financial Closing',
        description: 'Accelerate monthly accounts reconciliation, tax calculations, and balance sheet preparation.',
        metric: '40% faster closing'
      },
      {
        title: 'Strict Regulatory & Tax Compliance',
        description: 'Automated GST, TDS, e-invoicing, and audit trail logs ensure zero compliance slippage.',
        metric: 'Full compliance'
      },
      {
        title: 'Future-Proof Scalability',
        description: 'Scale effortlessly from single-entity operations to multi-warehouse, multinational group structures.',
        metric: 'Scalable to 1,000+ users'
      }
    ],
    howAtlasWorks: [
      {
        step: '01',
        title: 'Discovery & Solution Architecture',
        description: 'Detailed operational mapping to align business workflows with standard SAP best practices, minimizing unnecessary customization.',
        deliverables: ['Business Blueprint document', 'HANA hardware sizing', 'Data migration roadmap']
      },
      {
        step: '02',
        title: 'Certified Implementation & Migration',
        description: 'End-to-end deployment on SAP HANA Cloud or on-premise, including historical master data scrubbing and opening balance cutover.',
        deliverables: ['HANA instance configuration', 'Data extraction & validation', 'Pilot user acceptance testing']
      },
      {
        step: '03',
        title: 'Add-on Orchestration & Integration',
        description: 'Seamless integration of certified Boyum IT modules, UiPath software bots, and ATLAS custom add-ons via the SAP Service Layer.',
        deliverables: ['Service Layer REST endpoints', 'Warehouse mobile scanners', 'Automated bot connectors']
      },
      {
        step: '04',
        title: 'Ongoing Optimization & Managed SLA',
        description: 'Dedicated post-go-live support desk, database tuning, regular version upgrades, and ongoing process optimization.',
        deliverables: ['SLA-backed technical support', 'HANA database maintenance', 'Annual version upgrades']
      }
    ],
    industryUseCases: [
      {
        industry: 'Manufacturing',
        title: 'Discrete & Process Manufacturing',
        description: 'Multi-level BOM routing, shop-floor order tracking, and production yield monitoring.',
        route: '/industries/manufacturing',
        iconName: 'Factory'
      },
      {
        industry: 'Warehouse & Logistics',
        title: 'High-Volume Distribution',
        description: 'Real-time multi-bin management, lot/serial tracking, and automated shipping manifests.',
        route: '/industries/warehouse-logistics',
        iconName: 'Truck'
      },
      {
        industry: 'Trading & Shipping',
        title: 'Import-Export Operations',
        description: 'Multi-currency hedging, foreign vendor agreements, and landed cost recalculations.',
        route: '/industries/trading-shipping',
        iconName: 'Ship'
      },
      {
        industry: 'Finance & Administration',
        title: 'Corporate Financial Control',
        description: 'Multi-entity balance sheets, intercompany transactions, and cash flow forecasting.',
        route: '/industries/finance-administration',
        iconName: 'Building2'
      }
    ],
    relatedServices: [
      {
        title: 'Boyum IT Solutions',
        description: 'Certified add-ons for advanced manufacturing, warehouse management, and usability.',
        route: '/partners/boyum-it',
        category: 'Partner Ecosystem'
      },
      {
        title: 'UiPath Automation',
        description: 'RPA and Document Understanding to eliminate repetitive data entry into SAP B1.',
        route: '/partners/uipath',
        category: 'Automation'
      },
      {
        title: 'ATLAS Proprietary Suite',
        description: 'Specialized freight, weighbridge, and compliance modules built on SAP B1.',
        route: '/partners/atlas-solutions',
        category: 'In-House Solutions'
      }
    ]
  },

  'boyum-it': {
    slug: 'boyum-it',
    route: '/partners/boyum-it',
    name: 'Boyum IT Solutions',
    badgeType: 'boyum',
    eyebrow: 'BOYUM IT SILVER PARTNER — GLOBAL ADD-ON LEADER',
    heroTitle: 'Extend SAP Business One with Industry-Leading',
    heroHighlight: 'Manufacturing & WMS Solutions',
    introduction:
      'Boyum IT is the undisputed global market leader for SAP Business One extension software, utilized by over 9,000 customers in 115 countries. As a certified Boyum IT Silver Partner, ATLAS Technosoft delivers certified implementations of Beas Manufacturing, Produmex WMS, and the B1 Usability Package (B1UP).',
    partnershipLevel: 'Boyum IT Silver Partner',
    heroImage: '/images/partners/partners_boyum_warehouse.jpg',
    secondaryImage: '/images/solutions/solutions_beas_manufacturing.jpg',
    metrics: [
      { value: '99.9%', label: 'Picking Accuracy', sublabel: 'With Produmex WMS barcode verification' },
      { value: '35%', label: 'Productivity Gain', sublabel: 'Through Beas Manufacturing MRP II' },
      { value: '9,000+', label: 'Global Customers', sublabel: 'Trust Boyum IT worldwide' },
      { value: 'Silver', label: 'Partner Status', sublabel: 'Certified ATLAS implementation team' }
    ],
    techOverview: {
      title: 'Certified Extension Modules Built to Scale Without Core Modifications',
      description:
        'Boyum IT solutions plug natively into SAP Business One data schemas, eliminating fragile third-party interfaces. Whether orchestrating industrial shop floor machinery or guiding warehouse staff via mobile scanners, Boyum IT ensures 100% data synchronicity while maintaining future SAP upgrade compatibility.',
      architecturePoints: [
        'Direct DI-API & Service Layer architecture guaranteeing zero data duplication',
        'Industrial barcode scanner & mobile terminal support (Zebra, Honeywell, Datalogic)',
        'Comprehensive shop floor data collection (SFDC) terminals with real-time labor logging',
        'User interface customization engine (B1UP) enabling no-code form and validation tailoring'
      ]
    },
    capabilities: [
      {
        title: 'Beas Manufacturing (MRP II & Scheduling)',
        description:
          'Advanced multi-level production scheduling, machine capacity planning, bill of materials versioning, scrap tracking, and shop floor data capture.',
        iconName: 'Factory'
      },
      {
        title: 'Produmex WMS (Enterprise Warehousing)',
        description:
          'Paperless warehousing with guided putaway, wave picking, license plate numbers (LPN), GS1 barcode compliance, and cold chain batch controls.',
        iconName: 'Boxes'
      },
      {
        title: 'B1 Usability Package (B1UP Customization)',
        description:
          'Modify SAP Business One screens, create custom tabs, enforce mandatory field validations, and configure automated scheduled email dispatches.',
        iconName: 'Settings'
      },
      {
        title: 'CloudApps & Buildr Low-Code Portals',
        description:
          'Deploy intuitive web and tablet interfaces for shop-floor operators and warehouse workers without full desktop SAP licenses.',
        iconName: 'Cpu'
      },
      {
        title: 'Quality Control & Compliance Inspection',
        description:
          'Establish in-process quality checkpoints, manage quarantine workflows, and automatically generate Certificates of Analysis (CoA).',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Logistics & Carrier Integration',
        description:
          'Direct integration with commercial courier and freight carriers for real-time rate shopping, parcel label generation, and tracking sync.',
        iconName: 'Truck'
      }
    ],
    benefits: [
      {
        title: 'Near-Zero Dispatch & Picking Errors',
        description: 'Barcode-enforced validation prevents shipping wrong items, batches, or quantities.',
        metric: '99.9% accuracy'
      },
      {
        title: 'Maximized Machine & Labor Utilization',
        description: 'Finite capacity scheduling prevents production bottlenecks and machine idling.',
        metric: '35% capacity lift'
      },
      {
        title: 'Painless SAP Version Upgrades',
        description: 'Because all extensions adhere strictly to Boyum architecture, SAP version upgrades occur without rewriting code.',
        metric: '100% upgrade safe'
      },
      {
        title: 'Drastic Reduction in Warehouse Paperwork',
        description: 'Complete paperless digital pick lists, putaway instructions, and cycle counting.',
        metric: 'Paperless operations'
      }
    ],
    howAtlasWorks: [
      {
        step: '01',
        title: 'Plant & Warehouse Feasibility Audit',
        description: 'Our certified consultants tour your production floor and warehouse to assess material flows, staging zones, and scanner requirements.',
        deliverables: ['Physical workflow audit', 'Scanner hardware spec', 'Gap analysis vs standard modules']
      },
      {
        step: '02',
        title: 'Pre-Configured Template Implementation',
        description: 'Deploying Beas and Produmex configurations based on proven industry templates, slashing implementation timeframes.',
        deliverables: ['Custom routing definitions', 'Bin & zone location hierarchy', 'Barcode layout templates']
      },
      {
        step: '03',
        title: 'Industrial Hardware & Network Testing',
        description: 'Pairing mobile RF terminals, wearable ring scanners, and industrial label printers with seamless failover connectivity.',
        deliverables: ['Handheld scanner setup', 'Zebra printer integration', 'Offline transaction buffering']
      },
      {
        step: '04',
        title: 'Operator Training & Go-Live Cutover',
        description: 'Interactive training sessions for machine operators and warehouse staff to ensure rapid adoption and zero production downtime.',
        deliverables: ['SOP documentation', 'Floor champion training', 'Hypercare support coverage']
      }
    ],
    industryUseCases: [
      {
        industry: 'Manufacturing',
        title: 'Machinery & Automotive Components',
        description: 'Precision routing, work center capacity planning, and scrap tracking.',
        route: '/industries/manufacturing',
        iconName: 'Factory'
      },
      {
        industry: 'Warehouse & Logistics',
        title: '3PL & High-Throughput Warehousing',
        description: 'Wave picking, license plate tracking, and cross-docking operations.',
        route: '/industries/warehouse-logistics',
        iconName: 'Truck'
      },
      {
        industry: 'Pharmaceuticals & Food',
        title: 'Batch Traceability & Expiry Management',
        description: 'FEFO picking, temperature log integration, and automated CoAs.',
        route: '/industries/warehouse-logistics',
        iconName: 'ShieldCheck'
      },
      {
        industry: 'Retail & Distribution',
        title: 'Omnichannel Order Fulfillment',
        description: 'High-velocity multi-item order packing and carrier label generation.',
        route: '/industries/trading-shipping',
        iconName: 'ShoppingCart'
      }
    ],
    relatedServices: [
      {
        title: 'SAP Business One Core',
        description: 'The foundation ERP engine that powers Boyum IT manufacturing and WMS modules.',
        route: '/partners/sap-business-one',
        category: 'Core ERP'
      },
      {
        title: 'Boyum IT Solutions Detail',
        description: 'Explore deep technical feature guides for Beas, Produmex, and B1UP.',
        route: '/solutions/boyum-it',
        category: 'Dedicated Solution'
      },
      {
        title: 'ATLAS Proprietary Suite',
        description: 'Enhance Boyum setups with ATLAS weighbridge and trading add-ons.',
        route: '/partners/atlas-solutions',
        category: 'In-House Solutions'
      }
    ]
  },

  'uipath': {
    slug: 'uipath',
    route: '/partners/uipath',
    name: 'UiPath',
    badgeType: 'uipath',
    eyebrow: 'UIPATH SILVER PARTNER — ENTERPRISE HYPERAUTOMATION',
    heroTitle: 'Transform Operations with Enterprise RPA and',
    heroHighlight: 'Intelligent AI Automation',
    introduction:
      'UiPath is the global enterprise leader in robotic process automation (RPA) and AI-powered orchestration. ATLAS Technosoft partners with UiPath to help small and mid-sized enterprises eliminate up to 70% of manual data entry, automate cross-system reconciliations, and process unstructured documents directly into SAP Business One.',
    partnershipLevel: 'UiPath Silver Partner',
    heroImage: '/images/partners/partners_uipath_ai.jpg',
    secondaryImage: '/images/partners/partners_uipath_robot.jpg',
    metrics: [
      { value: '1.2M+', label: 'Transactions / Year', sublabel: 'Automated by ATLAS deployed bots' },
      { value: '70%', label: 'Manual Effort Saved', sublabel: 'In finance, procurement & logistics' },
      { value: '4–6 mo', label: 'Target Payback', sublabel: 'Measurable return on investment' },
      { value: 'Silver', label: 'Partner Status', sublabel: 'UiPath certified advanced RPA developers' }
    ],
    techOverview: {
      title: 'Non-Invasive AI Automation Connecting Disparate Enterprise Systems',
      description:
        'UiPath software robots work alongside human staff, executing repetitive tasks across web portals, spreadsheets, legacy desktop software, and SAP Business One with zero errors. Powered by machine learning and Document Understanding, robots parse unstructured PDF invoices and bills of lading with extraordinary precision.',
      architecturePoints: [
        'Centralized UiPath Orchestrator managing scheduling, bot pooling, and security credentials',
        'Document Understanding machine learning models pre-trained on international invoice & BL formats',
        'Attended robots providing human-in-the-loop validation for edge cases and exceptions',
        'Enterprise-grade audit logs recording every automated keystroke and API transaction'
      ]
    },
    capabilities: [
      {
        title: 'Attended & Unattended Software Bots',
        description:
          'Deploy autonomous background workers for nighttime batch processing alongside desktop co-pilots that assist finance staff with ad-hoc tasks.',
        iconName: 'Cpu'
      },
      {
        title: 'UiPath Document Understanding',
        description:
          'Extract structured data from scanned invoices, handwritten delivery challans, and foreign bills of lading with automatic validation.',
        iconName: 'FileCheck'
      },
      {
        title: 'Automated 3-Way Invoice Matching',
        description:
          'Cross-verify vendor invoice line items against SAP purchase orders (PO) and goods receipt notes (GRPO) without manual typing.',
        iconName: 'CheckCircle2'
      },
      {
        title: 'Bank Statement Reconciliation',
        description:
          'Download MT940 statement files, parse transactions against SAP customer ledgers, and auto-generate incoming payment records.',
        iconName: 'Building2'
      },
      {
        title: 'External Portal & Government Portal Sync',
        description:
          'Automate data exchange with customs icegate portals, port container status queries, and e-way bill portals with zero API dependencies.',
        iconName: 'TrendingUp'
      },
      {
        title: 'Multi-System Integration & Orchestration',
        description:
          'Bridge legacy desktop software and modern SaaS CRM systems directly to SAP Business One without extensive custom middleware.',
        iconName: 'Sparkles'
      }
    ],
    benefits: [
      {
        title: 'Dramatic Reduction in Manual Labor',
        description: 'Reclaim hundreds of employee hours each week to focus on customer relationships and high-value analysis.',
        metric: '70% labor saved'
      },
      {
        title: 'Zero Data Entry Typo Errors',
        description: 'Robots perform transactional posting with 100% adherence to defined accounting rules.',
        metric: '100% data accuracy'
      },
      {
        title: 'Rapid Return on Investment',
        description: 'Most clients recoup total software licensing and implementation costs within 4 to 6 months of rollout.',
        metric: '4–6 month ROI'
      },
      {
        title: 'Scalable Processing Capacity',
        description: 'Absorb seasonal spikes and month-end closing volumes without hiring temporary clerical workers.',
        metric: '24/7 round-the-clock'
      }
    ],
    howAtlasWorks: [
      {
        step: '01',
        title: 'Hyperautomation Health Check',
        description: 'Evaluating departmental workflows to identify high-volume, rules-based tasks with the fastest potential automation return.',
        deliverables: ['Process complexity matrix', 'ROI & payback forecast', 'Process Definition Document (PDD)']
      },
      {
        step: '02',
        title: 'Bot Development & Exception Handling',
        description: 'Building robust robot workflows in UiPath Studio with intelligent error recovery, retry policies, and automated alerts.',
        deliverables: ['Solution Design Document (SDD)', 'Document Understanding taxonomy', 'Sandbox pilot test']
      },
      {
        step: '03',
        title: 'SAP B1 & Security Integration',
        description: 'Configuring safe Service Layer API posting and orchestrator credential asset security compliant with enterprise standards.',
        deliverables: ['Role-based credentials setup', 'Service Layer API endpoints', 'Human-in-the-loop exception dashboard']
      },
      {
        step: '04',
        title: 'Orchestrator Management & SLA',
        description: 'Providing round-the-clock monitoring, bot health checks, and rapid adaptation when vendor invoice formats change.',
        deliverables: ['Daily robot execution logs', 'Bot upgrade maintenance', 'Proactive exception monitoring']
      }
    ],
    industryUseCases: [
      {
        industry: 'Finance & Administration',
        title: 'Vendor Invoice & AP Automation',
        description: 'Touchless invoice extraction, 3-way matching, and automatic SAP journal posting.',
        route: '/industries/finance-administration',
        iconName: 'Building2'
      },
      {
        industry: 'Trading & Shipping',
        title: 'Freight Manifest & Customs Ingestion',
        description: 'Reading maritime shipping bills, terminal container tracking, and landed duty entries.',
        route: '/industries/trading-shipping',
        iconName: 'Ship'
      },
      {
        industry: 'Manufacturing',
        title: 'Vendor Reconciliation & PO Tracking',
        description: 'Reconciling supplier ledger balances and automated order confirmation ingestion.',
        route: '/industries/manufacturing',
        iconName: 'Factory'
      },
      {
        industry: 'Warehouse & Logistics',
        title: 'E-Way Bill & Dispatch Documentation',
        description: 'Automated generation and verification of statutory transit passes and delivery proofs.',
        route: '/industries/warehouse-logistics',
        iconName: 'Truck'
      }
    ],
    relatedServices: [
      {
        title: 'SAP Business One Core',
        description: 'The transactional ERP platform that software robots interact with seamlessly.',
        route: '/partners/sap-business-one',
        category: 'Core ERP'
      },
      {
        title: 'Case Study: Process Automation',
        description: 'See how a trading business automated 85% of invoice matching with UiPath and SAP.',
        route: '/case-studies/business-process-automation',
        category: 'Verified Case Study'
      },
      {
        title: 'ATLAS Proprietary Suite',
        description: 'Combine UiPath bots with ATLAS AI-powered weighbridge and vendor add-ons.',
        route: '/partners/atlas-solutions',
        category: 'In-House Solutions'
      }
    ]
  },

  'atlas-solutions': {
    slug: 'atlas-solutions',
    route: '/partners/atlas-solutions',
    name: 'ATLAS Technology & Add-ons',
    badgeType: 'atlas',
    eyebrow: 'PROPRIETARY INTELLECTUAL PROPERTY — BUILT ON SAP B1',
    heroTitle: 'Industry-Specific Proprietary Add-on Suite Built for',
    heroHighlight: 'Operational Precision',
    introduction:
      'With nearly 20 years of hands-on ERP implementation experience, ATLAS Technosoft has engineered a proprietary suite of specialized add-on modules for SAP Business One. Built to address Indian regulatory, logistical, and operational nuances, our add-ons deploy in weeks and integrate natively without third-party middleware.',
    partnershipLevel: 'ATLAS In-House IP Suite',
    heroImage: '/images/solutions/solutions_integrated_ecosystem.jpg',
    secondaryImage: '/images/solutions/solutions_gate_entry_truck.jpg',
    metrics: [
      { value: '20+', label: 'Years of Expertise', sublabel: 'In SAP Business One engineering' },
      { value: '90%', label: 'Error Reduction', sublabel: 'In freight & landed cost calculations' },
      { value: '100%', label: 'Service Layer Native', sublabel: 'Zero core modifications required' },
      { value: 'Weeks', label: 'Rapid Deployment', sublabel: 'Pre-configured plug & play modules' }
    ],
    techOverview: {
      title: 'Purpose-Built Extension Modules Addressing Real-World Operational Gaps',
      description:
        'Standard ERP platforms frequently require excessive customization to handle specific domestic compliance, weighbridge connectivity, and multi-currency freight tracking. The ATLAS Proprietary Add-on Suite bridges these operational gaps with pre-engineered, battle-tested modules that install seamlessly alongside standard SAP Business One tables.',
      architecturePoints: [
        'Built strictly upon SAP Business One User-Defined Objects (UDO) and tables (UDT)',
        'Native Service Layer REST integration compatible with SAP HANA and MS SQL engines',
        'Direct hardware interface connectors for electronic weighbridges and IP camera feeds',
        'Modular architecture allowing clients to activate only the modules their business requires'
      ]
    },
    capabilities: [
      {
        title: 'Freight & International Trading Module',
        description:
          'Automate multi-currency freight allocations, landed cost tracking across multiple containers, customs duty calculations, and landed margin reports.',
        iconName: 'Ship'
      },
      {
        title: 'AI-Powered Gate Entry & Weighment',
        description:
          'Computer-vision vehicle license plate recognition, automated weighbridge gross/tare capture, and digital gate pass creation synced to SAP GRPO.',
        iconName: 'Truck'
      },
      {
        title: 'Predictive Stock Alert Engine',
        description:
          'Machine-learning models that forecast inventory stock-outs 7 days in advance based on seasonal consumption rates and supplier lead time variability.',
        iconName: 'TrendingUp'
      },
      {
        title: 'Smart Vendor Reconciliation RPA',
        description:
          'Automated 3-way matching between vendor PDF statements and internal SAP AP ledgers, flagging discrepancies and debit note requirements.',
        iconName: 'CheckCircle2'
      },
      {
        title: 'Pharmaceutical & Chemical QC Suite',
        description:
          'In-line quality sampling checklists, quarantine status locks on inventory bins, and one-click Certificate of Analysis (CoA) generation.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Statutory E-Invoicing & E-Way Bill Connector',
        description:
          'Real-time direct API synchronization with government GST and NIC portals for instantaneous IRN and e-way bill generation inside SAP B1.',
        iconName: 'Building2'
      }
    ],
    benefits: [
      {
        title: '90% Error Reduction in Landed Costs',
        description: 'Eliminate manual spreadsheet miscalculations in container shipping duties and port handling fees.',
        metric: '90% fewer errors'
      },
      {
        title: 'Deployed in Weeks, Not Months',
        description: 'Pre-built business logic and database schemas mean rapid deployment without custom software development risks.',
        metric: '2–3 weeks rollout'
      },
      {
        title: 'Uncompromised Upgrade Safety',
        description: 'Modules utilize official SAP extension protocols, ensuring effortless compatibility with future SAP versions.',
        metric: '100% upgrade safe'
      },
      {
        title: 'Total Regulatory Peace of Mind',
        description: 'Automatic updates keep your tax calculations and e-way bill integrations aligned with the latest statutory amendments.',
        metric: 'Zero tax penalty risk'
      }
    ],
    howAtlasWorks: [
      {
        step: '01',
        title: 'Module Suitability Assessment',
        description: 'Our senior solution architects analyze your business model to determine which ATLAS proprietary modules offer immediate operational payback.',
        deliverables: ['Module fit-gap analysis', 'Weighbridge/hardware spec check', 'Deployment timeline']
      },
      {
        step: '02',
        title: 'Plug-and-Play Installation',
        description: 'Seamless deployment of pre-built user-defined objects and screens directly into your existing SAP Business One environment.',
        deliverables: ['Module database schema import', 'Hardware COM port / IP pairing', 'Custom permission roles']
      },
      {
        step: '03',
        title: 'Business Rule & Approval Tailoring',
        description: 'Configuring custom approval thresholds, notification alerts, and printable document formats according to company policy.',
        deliverables: ['Approval workflow configuration', 'Printable layout designer setup', 'User acceptance sign-off']
      },
      {
        step: '04',
        title: 'Continuous Upgrades & Maintenance',
        description: 'Regular product updates ensuring ongoing compatibility with new SAP B1 service packs and evolving tax regulatory mandates.',
        deliverables: ['Version compatibility updates', 'Helpdesk support', 'Statutory compliance patches']
      }
    ],
    industryUseCases: [
      {
        industry: 'Trading & Shipping',
        title: 'Global Commodity & Freight Trading',
        description: 'Multi-currency container cost allocation and maritime transit tracking.',
        route: '/industries/trading-shipping',
        iconName: 'Ship'
      },
      {
        industry: 'Manufacturing',
        title: 'Metals, Chemicals & Heavy Industry',
        description: 'Automated truck scale gross/tare weighing and raw material gate entry.',
        route: '/industries/manufacturing',
        iconName: 'Factory'
      },
      {
        industry: 'Warehouse & Logistics',
        title: 'Bulk Yard & Freight Terminal Operations',
        description: 'Digital transit documentation, yard entry queueing, and dispatch verification.',
        route: '/industries/warehouse-logistics',
        iconName: 'Truck'
      },
      {
        industry: 'Finance & Administration',
        title: 'AP Reconciliations & E-Invoicing',
        description: 'Automated vendor balance matching and direct government GST portal sync.',
        route: '/industries/finance-administration',
        iconName: 'Building2'
      }
    ],
    relatedServices: [
      {
        title: 'SAP Business One Core',
        description: 'The foundation ERP engine that hosts all ATLAS proprietary add-on modules.',
        route: '/partners/sap-business-one',
        category: 'Core ERP'
      },
      {
        title: 'Boyum IT Solutions',
        description: 'Complement ATLAS add-ons with advanced manufacturing and WMS capabilities.',
        route: '/partners/boyum-it',
        category: 'Partner Ecosystem'
      },
      {
        title: 'UiPath Automation',
        description: 'Pair ATLAS add-ons with intelligent software robots for automated document processing.',
        route: '/partners/uipath',
        category: 'Automation'
      }
    ]
  }
};

