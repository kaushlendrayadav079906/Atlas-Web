export interface ServiceDetailItem {
  slug: string;
  badge: string;
  title: string;
  titleHighlight: string;
  tagline: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  partnerBadge: string;
  metrics: Array<{ value: string; label: string; detail: string; color: string }>;
  overview: {
    heading: string;
    subheading: string;
    paragraphs: string[];
    checklist: string[];
    image: string;
    imageAlt: string;
  };
  capabilities: Array<{
    title: string;
    description: string;
    features: string[];
    icon: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
    metric?: string;
  }>;
  processSteps: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  relatedSolutions: Array<{
    title: string;
    description: string;
    route: string;
    tag: string;
  }>;
}

export const SERVICE_DETAILS: Record<string, ServiceDetailItem> = {
  'sap-business-one': {
    slug: 'sap-business-one',
    badge: 'AUTHORIZED SAP CHANNEL PARTNER',
    title: 'SAP Business One Implementation,',
    titleHighlight: 'Migration & Optimization',
    tagline: 'The Gold Standard ERP for Growing Small & Mid-Sized Enterprises',
    description:
      'Deploy SAP Business One the right way — fast, scalable, and future-ready. ATLAS Technosoft delivers end-to-end cloud and on-premise deployments, SAP HANA migrations, and global rollouts designed to eliminate manual data silos and achieve real-time operational visibility.',
    heroImage: '/images/partners/partners_sap_monitor.jpg',
    heroImageAlt: 'SAP Business One Executive Dashboard on Modern Workstation',
    partnerBadge: '80+ Certified Implementations Across India & Global Markets',
    metrics: [
      { value: '80+', label: 'SAP B1 Live Clients', detail: 'Across manufacturing, logistics, pharma & trading', color: 'text-[#1B72E8]' },
      { value: '40%', label: 'Faster Financial Close', detail: 'Accelerated month-end reporting and consolidation', color: 'text-[#10b981]' },
      { value: '100%', label: 'Statutory Compliance', detail: 'GST, e-invoicing, TDS & multi-currency precision', color: 'text-[#0066CC]' },
      { value: '98.7%', label: 'Client Retention Rate', detail: 'Continuous post-go-live ERP optimization and support', color: 'text-[#0284c7]' },
    ],
    overview: {
      heading: 'Enterprise ERP Built Specifically for Growing Mid-Market Leaders',
      subheading: 'Seamless integration of financials, inventory, purchasing, sales, and production into one authoritative platform.',
      paragraphs: [
        'SAP Business One is trusted by over 75,000 companies across the globe. As an Authorized SAP Channel Partner with nearly two decades of domain experience, ATLAS Technosoft specializes in transforming complex business operations into streamlined, data-driven workflows.',
        'Whether transitioning from legacy entry-level accounting software or migrating to in-memory SAP HANA speed, our certified team ensures rapid rollout with fixed milestones, zero data loss, and minimal operational downtime.'
      ],
      checklist: [
        'Cloud (AWS, Azure, SAP Private Cloud) & On-Premise Architecture',
        'SAP HANA in-memory analytics with sub-second report generation',
        'Multi-company, multi-currency, and global branch rollouts',
        'End-to-end data migration, user training, and 24/7 SLA support'
      ],
      image: '/images/partners/partners_sap_laptop.jpg',
      imageAlt: 'SAP Business One Financial Analytics on Enterprise Laptop'
    },
    capabilities: [
      {
        title: 'End-to-End Implementation',
        description: 'Structured deployment methodology tailored to your industry workflows with turnkey data migration.',
        features: ['Business Blueprinting & Gap Analysis', 'Master Data Cleansing & Migration', 'Role-Based Authorization & Security', 'Comprehensive User Acceptance Testing (UAT)'],
        icon: 'Layers'
      },
      {
        title: 'SAP HANA Migration & Cloud Hosting',
        description: 'Upgrade your legacy Microsoft SQL or on-premise installation to high-speed SAP HANA in-memory architecture.',
        features: ['Real-time transactional and analytical processing', 'Sub-second reporting across millions of ledger lines', 'Secure cloud hosting on AWS or Azure', 'Disaster recovery and automated backup protocols'],
        icon: 'Cpu'
      },
      {
        title: 'Financial Management & GST Compliance',
        description: 'Gain total control over cash flows, multi-dimensional cost centers, automated bank reconciliation, and tax filings.',
        features: ['One-click Indian GST e-Invoicing & E-Way Bills', 'Multi-currency ledger & automated Forex revaluation', 'Consolidated financial statements for multi-branch entities', 'Real-time cash flow & budget tracking'],
        icon: 'BarChart3'
      },
      {
        title: 'Purchasing & Supply Chain Coordination',
        description: 'Automate procurement from purchase requests through vendor quotation comparison to payment voucher approval.',
        features: ['Automated 3-way PO matching (PO, GRPO, Vendor AP)', 'Vendor rating, delivery performance & lead time analytics', 'Landed cost calculation with custom duty distribution', 'Drop-shipping and blanket purchase orders'],
        icon: 'Truck'
      },
      {
        title: 'Sales & Customer Relationship (CRM)',
        description: 'Track leads, generate instant sales quotes, manage price lists, and accelerate fulfillment across sales channels.',
        features: ['Omnichannel customer history and credit limits', 'Dynamic customer-specific discount & pricing rules', 'Automated sales order confirmation & dispatch alerts', 'Mobile sales executive application for field orders'],
        icon: 'Users'
      },
      {
        title: 'Continuous Optimization & SLA Support',
        description: 'Dedicated Tier-1 to Tier-3 support engineers to maintain system uptime, perform patch upgrades, and optimize performance.',
        features: ['Guaranteed 1-hour critical issue response SLA', 'Quarterly system health checks & index tuning', 'Ongoing user refresher training & knowledge base', 'Custom dashboard widgets and KPI alert setup'],
        icon: 'ShieldCheck'
      }
    ],
    benefits: [
      {
        title: 'Single Source of Truth',
        description: 'Eliminate duplicate spreadsheets and fragmented data across departments with a unified transactional database.',
        icon: 'Database',
        metric: '100% Data Integrity'
      },
      {
        title: 'Rapid Month-End Closing',
        description: 'Shorten monthly financial closing cycles from weeks to days with automated journals and real-time ledger updates.',
        icon: 'Clock',
        metric: '40% Time Saved'
      },
      {
        title: 'Executive Decision Velocity',
        description: 'Empower C-level executives with role-based interactive dashboards accessible anytime on desktop and mobile devices.',
        icon: 'TrendingUp',
        metric: 'Real-Time Insights'
      },
      {
        title: 'Scalable Enterprise Growth',
        description: 'Seamlessly expand into new branches, product lines, and export territories without outgrowing your ERP software.',
        icon: 'Zap',
        metric: 'Infinite Scalability'
      },
      {
        title: 'Audit & Compliance Confidence',
        description: 'Full traceability of user transactions, audit trails, and automated compliance with statutory fiscal requirements.',
        icon: 'CheckCircle2',
        metric: 'Zero Audit Deficiencies'
      },
      {
        title: 'Seamless Ecosystem Integration',
        description: 'Effortlessly integrate with Boyum IT add-ons, UiPath software bots, e-commerce stores, and third-party APIs.',
        icon: 'Sparkles',
        metric: 'Zero Sunk Costs'
      }
    ],
    processSteps: [
      { step: 1, title: 'Discovery & Blueprinting', description: 'Analyze existing operations, map departmental workflows, and define clear implementation scope.' },
      { step: 2, title: 'System Build & Migration', description: 'Configure business rules, build chart of accounts, and migrate verified historical master data.' },
      { step: 3, title: 'Testing & Key-User Training', description: 'Execute rigorous UAT sessions and empower your operational champions with hands-on scenario drills.' },
      { step: 4, title: 'Go-Live & Hypercare Support', description: 'Smooth cutover execution followed by dedicated on-site and remote hypercare for seamless adoption.' }
    ],
    relatedSolutions: [
      { title: 'Boyum IT Add-On Suites', description: 'Advanced manufacturing MRP, shop-floor terminals, and Produmex WMS RF scanning.', route: '/services/boyum-it', tag: 'Productivity' },
      { title: 'UiPath RPA & AI Automation', description: 'Automate invoice data entry, bank reconciliation, and repetitive front-office tasks.', route: '/services/uipath-automation', tag: 'Hyperautomation' },
      { title: 'ATLAS Proprietary Add-Ons', description: 'Custom freight, weighbridge, and vendor portals integrated directly into SAP B1.', route: '/services/atlas-addons', tag: 'Custom Add-ons' }
    ]
  },

  'uipath-automation': {
    slug: 'uipath-automation',
    badge: 'UIPATH SILVER PARTNER',
    title: 'UiPath Robotic Process Automation',
    titleHighlight: '& AI-Driven Hyperautomation',
    tagline: 'Move Beyond ERP to Intelligent Autonomous Operations',
    description:
      'Eliminate up to 70% of routine manual data entry, accelerate invoice turnaround, and liberate high-value employees with UiPath software robots, AI Document Understanding, and intelligent workflow orchestration integrated directly into SAP Business One.',
    heroImage: '/images/partners/partners_uipath_robot.jpg',
    heroImageAlt: 'UiPath Robotic Process Automation and Artificial Intelligence Interface',
    partnerBadge: 'Certified Hyperautomation Specialists with 1.2M+ Annual Automated Transactions',
    metrics: [
      { value: '70%', label: 'Manual Work Eliminated', detail: 'Touchless processing across AP, AR, GRPO & logistics', color: 'text-[#1B72E8]' },
      { value: '4–6 Mo', label: 'Average Investment ROI', detail: 'Rapid payback with immediate operational hours recovered', color: 'text-[#10b981]' },
      { value: '1.2M+', label: 'Annual Transactions', detail: 'Invoices, vendor reconciliations, and warehouse scans', color: 'text-[#0066CC]' },
      { value: '99.8%', label: 'Data Extraction Accuracy', detail: 'Machine learning Document Understanding OCR engine', color: 'text-[#0284c7]' },
    ],
    overview: {
      heading: 'Connect Your ERP to 24/7 Digital Workers That Never Sleep or Make Mistakes',
      subheading: 'Transform repetitive copy-pasting, multi-system reconciliation, and document scanning into intelligent, touchless digital execution.',
      paragraphs: [
        'Modern enterprises run hundreds of repetitive daily processes across email attachments, PDFs, vendor portals, and SAP Business One. ATLAS Technosoft combines certified UiPath RPA expertise with artificial intelligence to deploy digital workers that execute high-volume tasks with 100% precision.',
        'From intelligent invoice OCR that extracts multi-line vendor details to automated 3-way matching and bank reconciliations, our hyperautomation solutions deliver measurable ROI in under six months while letting your human team focus on strategic growth.'
      ],
      checklist: [
        'Attended & Unattended UiPath software robots running 24/7/365',
        'AI Document Understanding extracting structured data from scanned PDFs',
        'Process Mining & Task Mining to uncover hidden operational bottlenecks',
        'Direct API & UI-level connectors into SAP Business One and external portals'
      ],
      image: '/images/partners/partners_uipath_ai.jpg',
      imageAlt: 'AI Document Understanding and Machine Learning Workflow'
    },
    capabilities: [
      {
        title: 'Touchless Accounts Payable (AP) Automation',
        description: 'Read incoming vendor invoices from emails, extract line items via AI OCR, match against purchase orders, and post vouchers in SAP B1.',
        features: ['Multi-format PDF, TIFF & scan extraction', 'Automated 2-way & 3-way PO matching', 'Exception routing to finance managers', 'Instant posting to SAP B1 draft or final ledger'],
        icon: 'Receipt'
      },
      {
        title: 'Document Understanding (OCR + Machine Learning)',
        description: 'Advanced computer vision and natural language processing to interpret unstructured documents like bills of lading, contracts, and certificates of analysis.',
        features: ['Pre-trained ML models for financial and shipping papers', 'Self-learning algorithms that improve with each correction', 'Handwritten signature and stamp detection', 'Confidence scoring with automated human-in-the-loop review'],
        icon: 'FileText'
      },
      {
        title: 'Vendor & Customer Account Reconciliation',
        description: 'Eliminate tedious month-end reconciliation by deploying software bots that pull vendor statements, compare against SAP records, and highlight variances.',
        features: ['Automated bank statement reconciliation', 'Vendor ledger vs. SAP B1 statement matching', 'Color-coded exception reports with variance details', 'Scheduled automated batch reconciliation runs'],
        icon: 'Scale'
      },
      {
        title: 'Automated Order-to-Cash (O2C)',
        description: 'Capture customer purchase orders from email attachments or web portals, validate credit terms and inventory, and generate sales orders automatically.',
        features: ['Direct ingestion from customer PO PDFs and spreadsheets', 'Instant stock availability and price tier verification', 'Automated customer confirmation email dispatch', 'Reduces sales order creation time from hours to seconds'],
        icon: 'ShoppingCart'
      },
      {
        title: 'Supply Chain & Logistics Dispatch Bots',
        description: 'Coordinate shipments by extracting packaging slips, creating e-way bills on government portals, and dispatching tracking numbers to customers.',
        features: ['Automated E-Way bill and e-invoice portal filing', 'Carrier API integration for courier tracking', 'Automated Goods Receipt PO (GRPO) posting', 'Proof of delivery (POD) reconciliation'],
        icon: 'Truck'
      },
      {
        title: 'Predictive Stock & Anomaly Detection',
        description: 'Combine RPA data harvesting with AI forecasting models to predict inventory stockouts 7 days in advance and alert procurement champions.',
        features: ['Automated lead time tracking across supply chains', 'Safety stock calculation based on seasonal trends', 'Proactive stockout warning alerts via email & WhatsApp', 'Auto-generated draft purchase requests in SAP B1'],
        icon: 'Sparkles'
      }
    ],
    benefits: [
      {
        title: '70% Manual Work Reduction',
        description: 'Free accounting, customer service, and procurement teams from repetitive data entry.',
        icon: 'Zap',
        metric: '70% Touchless'
      },
      {
        title: 'Flawless Operational Accuracy',
        description: 'Eliminate human typos, transposition errors, and double payments across transaction processing.',
        icon: 'CheckCircle2',
        metric: '99.8% Precision'
      },
      {
        title: 'Rapid 4–6 Month Payback',
        description: 'Achieve positive net ROI within months through recovered labor hours and eliminated error penalties.',
        icon: 'TrendingUp',
        metric: '4–6 Mo ROI'
      },
      {
        title: '24/7/365 Operational Throughput',
        description: 'Software bots process invoices, orders, and reconciliations overnight so work is ready every morning.',
        icon: 'Clock',
        metric: '24/7 Execution'
      },
      {
        title: 'Employee Morale & Retention',
        description: 'Shift skilled employees from mundane data entry to value-added analytics and customer care.',
        icon: 'Users',
        metric: '+65% Satisfaction'
      },
      {
        title: 'Seamless Scalability',
        description: 'Absorb 5x transaction volume spikes during peak seasons without hiring temp staff.',
        icon: 'Layers',
        metric: '5x Scalability'
      }
    ],
    processSteps: [
      { step: 1, title: 'Process Assessment & Mining', description: 'Identify repetitive workflows, evaluate automation feasibility, and calculate precise ROI projections.' },
      { step: 2, title: 'Bot Architecture & AI Training', description: 'Build resilient workflow scripts, train Document Understanding models, and integrate with SAP B1.' },
      { step: 3, title: 'Pilot Testing & Validation', description: 'Run attended pilot executions with live sample data and validate 100% extraction accuracy.' },
      { step: 4, title: 'Orchestrator Go-Live & Support', description: 'Deploy to UiPath Orchestrator with 24/7 exception monitoring and continuous machine learning refinement.' }
    ],
    relatedSolutions: [
      { title: 'SAP Business One ERP', description: 'Core enterprise transactional engine powering your financials, supply chain, and operations.', route: '/services/sap-business-one', tag: 'Core ERP' },
      { title: 'Boyum IT Solutions', description: 'Beas Manufacturing, Produmex WMS, and B1UP usability add-ons.', route: '/services/boyum-it', tag: 'Certified Add-ons' },
      { title: 'ATLAS Proprietary Add-Ons', description: 'Custom freight, gate entry weighbridge, and vendor collaboration tools.', route: '/services/atlas-addons', tag: 'Specialized Tools' }
    ]
  },

  'atlas-addons': {
    slug: 'atlas-addons',
    badge: 'PROPRIETARY INNOVATION',
    title: 'ATLAS Proprietary SAP B1 Add-On Suite',
    titleHighlight: 'Engineered for Real-World SME Agility',
    tagline: 'Built on SAP Business One. Proven Across Industries. Deployed in Weeks.',
    description:
      'Bridge critical operational gaps with purpose-built add-ons developed by ATLAS Technosoft. From computer-vision gate entry and automated weighbridge capture to specialized freight modules and vendor portals, our extensions integrate natively into SAP B1 to eliminate manual friction.',
    heroImage: '/images/solutions/solutions_gate_entry_truck.jpg',
    heroImageAlt: 'AI-Powered Gate Entry and Weighbridge Automation at Industrial Logistics Facility',
    partnerBadge: 'Over 5 Specialized Proprietary Extensions Deployed Across Leading SMEs',
    metrics: [
      { value: '5+', label: 'Proprietary Modules', detail: 'Freight, Gate Entry, WMS, Shipping & Vendor Portals', color: 'text-[#1B72E8]' },
      { value: '90%', label: 'Freight Error Reduction', detail: 'Automated landed cost calculation and billing verification', color: 'text-[#10b981]' },
      { value: '3×', label: 'Faster Gate Turnaround', detail: 'Computer vision vehicle recognition and auto-weight logging', color: 'text-[#0066CC]' },
      { value: '85%', label: 'Documentation Time Saved', detail: 'Instant automated generation of shipping documents', color: 'text-[#0284c7]' },
    ],
    overview: {
      heading: 'Custom Extensions That Solve High-Impact Operational Bottlenecks',
      subheading: 'Designed from two decades of on-the-ground client experience where standard out-of-the-box ERP functions fall short.',
      paragraphs: [
        'While SAP Business One provides world-class core ERP capabilities, Indian manufacturing, logistics, and trading enterprises often face specialized challenges — such as physical truck weighbridge capture, multi-stage freight billing, customs documentation, and vendor quotation tracking.',
        'ATLAS Technosoft created a proprietary suite of lightweight, high-performance add-ons that plug directly into SAP Business One. Built using the native SAP B1 SDK and modern web frameworks, they deploy in days, require minimal training, and deliver immediate operational speed.'
      ],
      checklist: [
        'Native SAP Business One SDK integration with zero database schema conflicts',
        'Computer vision vehicle license plate recognition (ANPR) and weighbridge IoT',
        'Secure cloud vendor portal for direct PO acceptance, ASN creation, and invoice uploads',
        'Comprehensive shipping documentation generator for export-import compliance'
      ],
      image: '/images/solutions/solutions_wms_operator.jpg',
      imageAlt: 'Warehouse Operator utilizing ATLAS Specialized Add-On Interface'
    },
    capabilities: [
      {
        title: 'AI-Powered Gate Entry & Weighbridge Automation',
        description: 'Automate vehicle entry, gross weight capture, and tare weight verification with connected IoT weighbridge scales and computer vision cameras.',
        features: ['Automated Number Plate Recognition (ANPR)', 'Direct digital weigh scale readings into SAP B1', 'Prevents weight manipulation and vehicle queuing', 'Automated Gate Pass and Inward GRPO creation'],
        icon: 'Truck'
      },
      {
        title: 'Freight & Multi-Modal Trading Module',
        description: 'Comprehensive solution for freight forwarders and international traders managing complex sea, air, and road freight consignments.',
        features: ['Automated landed cost computation per item', 'Multi-currency freight charge distribution', 'Integration with customs exchange rates', 'Container tracking and demurrage calculation'],
        icon: 'Ship'
      },
      {
        title: 'WMS Collaboration & Vendor Self-Service Portal',
        description: 'Empower suppliers to view open purchase orders, submit Advance Shipping Notices (ASNs), generate barcodes, and upload invoices directly.',
        features: ['Secure web portal with vendor-specific login', 'Real-time ASN notification to warehouse team', 'Pre-printed barcode labels matching SAP B1 lots', 'Eliminates phone calls and email back-and-forth'],
        icon: 'Globe'
      },
      {
        title: 'Export Shipping & Customs Documentation Generator',
        description: 'Generate complete export shipping packages with a single click, ensuring 100% compliance with international trade customs.',
        features: ['Automated Commercial Invoice & Packing List', 'House & Master Bill of Lading (HBL/MBL) creation', 'Certificate of Origin and Inspection Certificates', 'Direct electronic export manifest generation'],
        icon: 'FileCheck'
      },
      {
        title: 'Intelligent Document Distributor',
        description: 'Automatically classify, split, rename, and archive over 50 business document types linked directly to SAP B1 transactions.',
        features: ['Automated dispatch of invoices and account statements', 'Direct attachment to SAP B1 transaction documents', 'Secure encrypted customer & vendor delivery', 'Real-time email open and download tracking'],
        icon: 'Share2'
      },
      {
        title: 'Smart Vendor Reconciliation & 3-Way Match',
        description: 'Automate high-volume vendor statement reconciliation with intelligent fuzzy matching logic and automated debit note creation.',
        features: ['Fuzzy matching algorithms for invoice numbers and dates', 'Automatic discrepancy flagging with tolerance thresholds', 'Auto-generated debit notes for price variances', 'Consolidated monthly vendor ledger verification'],
        icon: 'CheckSquare'
      }
    ],
    benefits: [
      {
        title: '3x Faster Gate Turnaround',
        description: 'Eliminate truck bottlenecks and manual weighbridge ledger slips with touchless IoT capture.',
        icon: 'Clock',
        metric: '3x Faster'
      },
      {
        title: '90% Freight Billing Error Reduction',
        description: 'Ensure accurate freight chargebacks and customs duty apportionments with zero manual math.',
        icon: 'ShieldCheck',
        metric: '90% Error Drop'
      },
      {
        title: '85% Export Documentation Time Saved',
        description: 'Compile full export documentation sets in 2 minutes instead of 2 hours.',
        icon: 'FileText',
        metric: '85% Faster Docs'
      },
      {
        title: 'Transparent Vendor Collaboration',
        description: 'Empower suppliers with self-service order tracking and pre-labeled delivery barcodes.',
        icon: 'Users',
        metric: 'Zero Misplaced Goods'
      },
      {
        title: 'Rapid 2–4 Week Deployment',
        description: 'Lightweight architecture allows rapid deployment and immediate employee onboarding.',
        icon: 'Zap',
        metric: 'Weeks Not Months'
      },
      {
        title: '100% Native SAP Compatibility',
        description: 'Built specifically for SAP Business One ensuring future upgrade safety and zero data friction.',
        icon: 'CheckCircle2',
        metric: 'Native SDK'
      }
    ],
    processSteps: [
      { step: 1, title: 'Operational Walkthrough', description: 'Observe shop floor, gate, or logistics bottlenecks to recommend the ideal proprietary add-on.' },
      { step: 2, title: 'Rapid Configuration', description: 'Install add-on modules, connect IoT hardware or cameras, and configure business rule tolerances.' },
      { step: 3, title: 'Pilot Run & Calibration', description: 'Run parallel operational shifts to verify automated data capture and user workflow adoption.' },
      { step: 4, title: 'Full Deployment & Training', description: 'Conduct hands-on user training and initiate live production usage with dedicated technical support.' }
    ],
    relatedSolutions: [
      { title: 'SAP Business One ERP', description: 'The foundational enterprise system that our proprietary add-ons natively extend.', route: '/services/sap-business-one', tag: 'Core ERP' },
      { title: 'Boyum IT Solutions', description: 'Beas Manufacturing, Produmex WMS, and B1UP usability extensions.', route: '/services/boyum-it', tag: 'Partner Suites' },
      { title: 'UiPath Hyperautomation', description: 'Combine add-ons with software bots for end-to-end autonomous business workflows.', route: '/services/uipath-automation', tag: 'RPA & AI' }
    ]
  }
};

