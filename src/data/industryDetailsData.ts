export interface IndustryDetailItem {
  slug: string;
  badge: string;
  title: string;
  titleHighlight: string;
  tagline: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
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
  caseStudyHighlight: {
    title: string;
    clientType: string;
    quote: string;
    author: string;
    kpis: Array<{ value: string; label: string }>;
  };
  techStack: Array<{ name: string; role: string; tag: string }>;
  relatedIndustries: Array<{
    title: string;
    description: string;
    route: string;
    tag: string;
  }>;
}

export const INDUSTRY_DETAILS: Record<string, IndustryDetailItem> = {
  manufacturing: {
    slug: 'manufacturing',
    badge: 'MANUFACTURING INDUSTRY SOLUTIONS',
    title: 'Smart Manufacturing & Shop-Floor Execution',
    titleHighlight: 'Powered by SAP & Boyum IT',
    tagline: 'Achieve Production Precision, Real-Time MRP, and Total Shop-Floor Visibility',
    description:
      'Transform discrete and process manufacturing operations with SAP Business One, Beas Manufacturing, and AI-driven automation. Eliminate planning guesswork, optimize raw material yields, track machine capacity in real time, and reduce scrap by up to 42%.',
    heroImage: '/images/crystal_hd/ind_manufacturing.jpg',
    heroImageAlt: 'Modern High-Precision Manufacturing Production Floor and Robotics Line',
    metrics: [
      { value: '35%', label: 'Manufacturing Efficiency Gain', detail: 'Optimized scheduling and reduced idle machine time', color: 'text-[#1B72E8]' },
      { value: '28%', label: 'OEE Improvement', detail: 'Overall Equipment Effectiveness with Beas APS', color: 'text-[#10b981]' },
      { value: '42%', label: 'Scrap & Defect Reduction', detail: 'In-line quality inspection & AI vision defect detection', color: 'text-[#0066CC]' },
      { value: '58 Days', label: 'Rapid Go-Live Benchmark', detail: 'Turnkey SAP B1 + Beas implementation for pharma client', color: 'text-[#0284c7]' },
    ],
    overview: {
      heading: 'From Raw Material Staging to Finished Goods Packaging — Total Control',
      subheading: 'Eliminate production bottlenecks, inaccurate bills of materials, and unplanned machine downtime.',
      paragraphs: [
        'Manufacturers face constant pressures: volatile raw material costs, shifting customer delivery deadlines, strict quality standards, and machine bottlenecks. Standard spreadsheets and disconnected software cannot keep up with shop-floor realities.',
        'ATLAS Technosoft implements certified manufacturing suites combining SAP Business One with Beas Manufacturing and IoT machine sensors. Production managers gain interactive Gantt chart scheduling, multi-level BOM versioning, live scrap tracking, and instant cost accounting for every work order.'
      ],
      checklist: [
        'Advanced Planning & Scheduling (APS) with finite machine capacity calculations',
        'Material Requirements Planning (MRP II) driving timely procurement and production orders',
        'Ruggedized shop-floor data collection terminals for touchless operator clock-in and job logging',
        'Batch, lot, and serial number pedigree traceability for strict regulatory compliance'
      ],
      image: '/images/solutions/solutions_beas_manufacturing.jpg',
      imageAlt: 'Beas Manufacturing Scheduling and Workstation Control'
    },
    capabilities: [
      {
        title: 'Advanced Planning & Scheduling (APS)',
        description: 'Dynamically schedule work orders across work centers, taking into account machine capacity, tooling availability, and operator shifts.',
        features: ['Interactive Netronic Gantt chart scheduling', 'Drag-and-drop job re-sequencing with instant conflict alerts', 'Finite capacity planning avoiding workstation overloads', 'What-if scenario modeling for rush customer orders'],
        icon: 'Calendar'
      },
      {
        title: 'Multi-Level BOM & Product Configurator',
        description: 'Manage complex multi-level Bills of Materials (BOM) with engineering change orders, phantom assemblies, and custom rule configurations.',
        features: ['Version-controlled BOMs with effective date stamps', 'Custom product configurator for engineer-to-order (ETO)', 'Scrap and yield factor calculations per process step', 'Direct CAD/PLM integration into SAP Business One'],
        icon: 'Layers'
      },
      {
        title: 'Shop-Floor Data Collection & Terminals',
        description: 'Equip factory floor operators with industrial touchscreen terminals to start jobs, record scrap reasons, and log material consumption.',
        features: ['Barcode and QR code job card scanning', 'Real-time labor and machine time tracking', 'Scrap reason code analysis for root cause investigations', 'Operator digital work instructions and assembly drawings'],
        icon: 'Cpu'
      },
      {
        title: 'Quality Control & Regulatory Inspection',
        description: 'Embed mandatory quality inspection gates across incoming raw materials, in-process routing steps, and final pre-shipment checks.',
        features: ['Certificate of Analysis (CoA) generation and archiving', 'Acceptable Quality Limit (AQL) statistical sampling', 'Quarantine and non-conformance hold automation', 'Complete lot genealogy and backward/forward recall tracking'],
        icon: 'ShieldCheck'
      },
      {
        title: 'Real-Time Actual Costing & Variance Analysis',
        description: 'Track planned vs. actual material usage, direct labor, and machine overhead costs down to individual production batches.',
        features: ['Multi-currency standard and moving average costing', 'Instant WIP (Work in Progress) financial valuation', 'Detailed cost variance breakdown (material, labor, machine)', 'Accurate gross margin reporting per finished SKU'],
        icon: 'BarChart3'
      },
      {
        title: 'IoT Machine Monitoring & Predictive Maintenance',
        description: 'Connect production machinery via IoT gateways to automatically log operating hours, cycle times, and trigger preventive maintenance.',
        features: ['Automated downtime capture with operator prompts', 'Predictive maintenance alerts based on operating hours', 'Spare parts inventory reservation in SAP B1', 'Overall Equipment Effectiveness (OEE) analytics'],
        icon: 'Settings'
      }
    ],
    benefits: [
      {
        title: '35% Higher Throughput',
        description: 'Eliminate scheduling deadlocks and ensure continuous machine utilization across production shifts.',
        icon: 'TrendingUp',
        metric: '+35% Output'
      },
      {
        title: '42% Lower Scrap & Waste',
        description: 'Catch manufacturing deviations in real time before defective batches pass downstream.',
        icon: 'ShieldCheck',
        metric: '-42% Scrap'
      },
      {
        title: '100% Lot Traceability',
        description: 'Trace any finished batch back to raw material supplier lots, work centers, and operators in seconds.',
        icon: 'CheckCircle2',
        metric: 'Full Traceability'
      },
      {
        title: 'Accurate Product Margins',
        description: 'Know the true landed cost of every manufactured SKU with granular labor and overhead allocation.',
        icon: 'BarChart3',
        metric: 'Accurate Costing'
      },
      {
        title: 'On-Time Customer Delivery',
        description: 'Provide dependable delivery promises based on real-time capacity and component availability.',
        icon: 'Clock',
        metric: '99% OTIF'
      },
      {
        title: 'Paperless Shop Floor',
        description: 'Replace paper job traveler packets with interactive digital work orders and tablet interfaces.',
        icon: 'Layers',
        metric: 'Zero Paperwork'
      }
    ],
    caseStudyHighlight: {
      title: 'Leading Discrete & Process Manufacturing Enterprises',
      clientType: 'Precision Engineering & Pharmaceutical Manufacturing',
      quote: 'ATLAS Technosoft deployed SAP Business One with Beas Manufacturing in just 58 days. Our shop-floor visibility doubled and scrap dropped by 42% within four months.',
      author: '— Vice President of Operations',
      kpis: [
        { value: '35%', label: 'Throughput Increase' },
        { value: '42%', label: 'Scrap Reduction' },
        { value: '58 Days', label: 'Go-Live Time' }
      ]
    },
    techStack: [
      { name: 'SAP Business One', role: 'Core Financials, Inventory & Sales Engine', tag: 'Core ERP' },
      { name: 'Beas Manufacturing', role: 'APS Scheduling, MRP II, Shop Floor & Quality', tag: 'Specialized Suite' },
      { name: 'UiPath Software Bots', role: 'Automated Inward Raw Material GRPO Creation', tag: 'RPA' },
      { name: 'ATLAS Weighbridge Add-On', role: 'Automated Raw Material Truck Inward Weighment', tag: 'Add-on' }
    ],
    relatedIndustries: [
      { title: 'Warehouse & Logistics', description: 'Advanced mobile RF scanning and multi-bin warehouse management.', route: '/industries/warehouse-logistics', tag: 'Supply Chain' },
      { title: 'Trading & Shipping', description: 'High-volume wholesale trading and export documentation.', route: '/industries/trading-shipping', tag: 'Commercial' },
      { title: 'Finance & Administration', description: 'Streamlined multi-company accounting and cash flow automation.', route: '/industries/finance-administration', tag: 'Corporate' }
    ]
  },

  'warehouse-logistics': {
    slug: 'warehouse-logistics',
    badge: 'WAREHOUSE & SUPPLY CHAIN SOLUTIONS',
    title: 'Zero-Touch Warehouse Management & Logistics',
    titleHighlight: 'Powered by Produmex WMS & Mobile RF',
    tagline: 'Achieve 99.9% Inventory Accuracy and 3x Faster Goods Receipt',
    description:
      'Transform warehouse hubs, cold chain facilities, and distribution centers with Produmex WMS for SAP Business One. Deploy mobile RF handheld barcode scanning, multi-bin wave picking, and automated 3PL billing to eliminate shipping errors and double fulfillment speed.',
    heroImage: '/images/crystal_hd/ind_warehouse.jpg',
    heroImageAlt: 'Modern Automated Distribution Center with Pallet Racks and High-Speed Forklifts',
    metrics: [
      { value: '99.9%', label: 'Inventory Accuracy', detail: 'Real-time bin-level tracking with mobile RF barcode scanners', color: 'text-[#1B72E8]' },
      { value: '3×', label: 'Faster Goods Receipt', detail: 'Touchless GRPO generation from Advance Shipping Notices (ASNs)', color: 'text-[#10b981]' },
      { value: '50%', label: 'Fulfillment Time Saved', detail: 'Optimized wave picking, multi-order consolidation & zone routing', color: 'text-[#0066CC]' },
      { value: '400%', label: '9-Month Payback ROI', detail: 'Proven labor savings, eliminated mispicks & inventory shrinkage', color: 'text-[#0284c7]' },
    ],
    overview: {
      heading: 'Turn Warehouse Chaos into Flawless, High-Velocity Order Fulfillment',
      subheading: 'Stop losing money to mispicked shipments, lost pallets, misplaced lots, and slow manual check-in.',
      paragraphs: [
        'In modern supply chains, warehouse speed and accuracy make or break customer satisfaction. Manual clipboards, paper pick sheets, and delayed ERP updates lead to out-of-stock surprises, costly returns, and disgruntled clients.',
        'ATLAS Technosoft implements Produmex WMS for SAP Business One, equipping warehouse teams with rugged Android RF scanners. Every putaway, bin transfer, pick wave, and dispatch scan synchronizes instantly with SAP B1, guaranteeing flawless 99.9% inventory precision.'
      ],
      checklist: [
        'Mobile RF handheld scanning with GS1-128, 2D Datamatrix, and QR code validation',
        'Dynamic multi-bin storage management with optimized putaway strategies',
        'Advanced wave, cluster, and zone picking minimizing operator travel distances',
        'Integrated 3PL customer billing rules and comprehensive expiry date FIFO/FEFO control'
      ],
      image: '/images/solutions/solutions_produmex_wms.jpg',
      imageAlt: 'Produmex WMS High-Speed Barcode Scanning in Logistics Facility'
    },
    capabilities: [
      {
        title: 'Mobile RF Barcode Scanning (Android / iOS)',
        description: 'Eliminate paper slips with rugged industrial handhelds validating every item, bin, pallet, and batch in real time.',
        features: ['Instant audio-visual beep validation preventing wrong SKU picks', 'Works seamlessly on Zebra, Honeywell, and Datalogic scanners', 'Offline scanning support for remote warehouse corners', 'Direct real-time posting into SAP Business One'],
        icon: 'Smartphone'
      },
      {
        title: 'Dynamic Multi-Bin Putaway Optimization',
        description: 'Direct forklift operators to the most logical storage bin based on SKU dimensions, turnover velocity, and weight constraints.',
        features: ['Zone configuration (bulk, high-rack, pick-face, cold storage)', 'Optimized path routing reducing forklift transit time', 'Automatic consolidation into partially filled pallets', 'Replenishment triggers from bulk storage to active pick faces'],
        icon: 'Boxes'
      },
      {
        title: 'Intelligent Wave & Cluster Picking',
        description: 'Consolidate multiple customer orders into single picking waves to fulfill dozens of orders in a single warehouse pass.',
        features: ['Multi-order cluster picking for e-commerce and retail distribution', 'Zone picking with automated consolidation at packing stations', 'Cartonization algorithm calculating optimal packing box sizes', 'Automated packing slip and shipping label generation'],
        icon: 'Package'
      },
      {
        title: 'Batch & Lot Control with Strict FEFO Enforcement',
        description: 'Ensure pharmaceutical, food, chemical, and retail products are picked based on First-Expiry-First-Out (FEFO) rules.',
        features: ['Automated block on expired or quarantined batch lots', 'Shelf-life validation against customer-specific remaining shelf-life rules', 'Complete backward and forward recall tracking in seconds', 'Temperature-controlled staging and inspection workflows'],
        icon: 'Clock'
      },
      {
        title: 'Touchless Goods Receipt & ASN Ingestion',
        description: 'Receive entire truckloads in minutes by matching incoming vendor Advance Shipping Notices against purchase orders.',
        features: ['Container and pallet-level license plate number (LPN) tagging', 'Discrepancy flagging for damaged or missing cartons', 'Direct creation of Goods Receipt PO (GRPO) in SAP B1', 'Automated vendor ASN reconciliation'],
        icon: 'Truck'
      },
      {
        title: 'Third-Party Logistics (3PL) Multi-Client Billing',
        description: 'Manage inventory for multiple client accounts under one roof with automated storage, handling, and value-added charge calculations.',
        features: ['Client-specific fee schedules (per pallet, per day, per pick)', 'Automated billing voucher generation in SAP Business One', 'Restricted client portal access for real-time stock visibility', 'Multi-tenant segregation with airtight data security'],
        icon: 'Layers'
      }
    ],
    benefits: [
      {
        title: '99.9% Pick Accuracy',
        description: 'Barcode scan verification prevents sending wrong items or incorrect quantities to customers.',
        icon: 'CheckCircle2',
        metric: '99.9% Accuracy'
      },
      {
        title: '3x Faster Receiving',
        description: 'Unload, inspect, and put away incoming shipments in a fraction of traditional manual turnaround.',
        icon: 'Zap',
        metric: '3x Speed'
      },
      {
        title: '50% Labor Time Recovered',
        description: 'Optimized wave pick paths and automated replenishment slash unnecessary walking and transit time.',
        icon: 'Clock',
        metric: '50% Less Travel'
      },
      {
        title: 'Zero Lost Inventory',
        description: 'Every SKU has a registered bin location in SAP B1, eliminating misplaced stock write-offs.',
        icon: 'ShieldCheck',
        metric: 'Zero Lost Stock'
      },
      {
        title: 'Strict Shelf-Life Adherence',
        description: 'Automated FEFO prevents aging goods from sitting forgotten at the back of high racks.',
        icon: 'TrendingUp',
        metric: 'Zero Waste'
      },
      {
        title: 'Real-Time Telemetry',
        description: 'Monitor worker pick rates, dock turnaround, and rack utilization on live executive dashboards.',
        icon: 'BarChart3',
        metric: 'Live Metrics'
      }
    ],
    caseStudyHighlight: {
      title: 'Major Cold Storage & FMCG Distribution Center',
      clientType: 'Multi-Location 3PL Warehouse Operator',
      quote: 'With Produmex WMS and ATLAS Technosoft, inventory accuracy jumped to 99.9% and warehouse picking speed doubled across all 3 facility hubs.',
      author: '— Chief Supply Chain Officer',
      kpis: [
        { value: '99.9%', label: 'Inventory Accuracy' },
        { value: '3x', label: 'Receiving Speed' },
        { value: '400%', label: 'ROI in 9 Months' }
      ]
    },
    techStack: [
      { name: 'SAP Business One', role: 'Real-Time ERP Master Data & Financial Engine', tag: 'Core ERP' },
      { name: 'Produmex WMS', role: 'Mobile RF Barcode Scanning & Warehouse Management', tag: 'Certified WMS' },
      { name: 'UiPath Robots', role: 'Automated Vendor ASN Parsing & Touchless GRPO', tag: 'Hyperautomation' },
      { name: 'ATLAS Gate Entry', role: 'Automated Weighbridge & Truck Check-In', tag: 'Specialized Tool' }
    ],
    relatedIndustries: [
      { title: 'Manufacturing Operations', description: 'Advanced production planning and shop-floor terminals.', route: '/industries/manufacturing', tag: 'Production' },
      { title: 'Trading & Shipping', description: 'Multi-modal shipping logistics and export customs documentation.', route: '/industries/trading-shipping', tag: 'Logistics' },
      { title: 'Finance & Administration', description: 'Cash-flow forecasting and automated billing.', route: '/industries/finance-administration', tag: 'Corporate' }
    ]
  },

  'finance-administration': {
    slug: 'finance-administration',
    badge: 'FINANCIAL AUTOMATION & GOVERNANCE',
    title: 'Intelligent Finance, Accounting & Administration',
    titleHighlight: 'Powered by SAP B1, B1UP & AI',
    tagline: 'Reduce DSO by 18 Days, Eliminate 70% of Manual Bookkeeping, and Close Month-End in Hours',
    description:
      'Elevate corporate finance from administrative bookkeeping to strategic value creation. ATLAS Technosoft combines SAP Business One financial architecture with B1 Usability Package (B1UP), UiPath Document Understanding, and predictive AI cash-flow forecasting to deliver touchless AP/AR and statutory compliance.',
    heroImage: '/images/crystal_hd/ind_finance.jpg',
    heroImageAlt: 'Corporate Finance Executive analyzing Financial Charts and Real-Time Ledger on Modern Workstation',
    metrics: [
      { value: '18 Days', label: 'DSO Reduction', detail: 'Accelerated receivables collection with automated customer reminders', color: 'text-[#1B72E8]' },
      { value: '1,000+', label: 'Daily Touchless Invoices', detail: 'Posted into SAP B1 with zero human typing or data entry errors', color: 'text-[#10b981]' },
      { value: '92%', label: 'Cash Flow Prediction Accuracy', detail: 'Machine learning predictive models forecasting customer payment delays', color: 'text-[#0066CC]' },
      { value: '40%', label: 'Faster Financial Close', detail: 'Automated journals, depreciation runs, and intercompany reconciliation', color: 'text-[#0284c7]' },
    ],
    overview: {
      heading: 'Transform Finance into a Strategic Engine of Growth and Capital Efficiency',
      subheading: 'Stop losing valuable hours to manual invoice punching, spreadsheet reconciliation, and chasing overdue accounts.',
      paragraphs: [
        'Finance leaders in high-growth companies are routinely trapped in administrative firefighting: keying in hundreds of supplier bills, reconciling bank feeds line-by-line, and assembling monthly financial packets in fragmented spreadsheets.',
        'ATLAS Technosoft transforms financial operations into an intelligent, touchless ecosystem. Software bots capture invoices directly from emails, extract line items with AI Document Understanding, match against POs, and post vouchers in SAP B1 with zero manual touch.'
      ],
      checklist: [
        'Automated 3-way matching between Purchase Order, Goods Receipt (GRPO), and Vendor AP Invoice',
        'One-click statutory Indian GST e-Invoicing, E-Way bills, TDS reporting, and audit logs',
        'Predictive AI cash-flow forecasting calculating liquidity positions 30–90 days ahead',
        'Consolidated multi-company, multi-currency financial statements with automated currency revaluation'
      ],
      image: '/images/solutions/solutions_b1up_interface.jpg',
      imageAlt: 'B1UP Financial Usability and Workflow Customization Platform'
    },
    capabilities: [
      {
        title: 'Touchless Accounts Payable (AP) Automation',
        description: 'Deploy software bots to ingest PDF invoices from email inboxes, extract line-level tax and SKU data via OCR, and post drafts in SAP B1.',
        features: ['AI extraction of vendor name, GSTIN, line items, and totals', 'Automated verification against open PO and GRPO balances', 'Configurable approval hierarchies with threshold alerts', 'Eliminates paper invoice routing and duplicate payments'],
        icon: 'Receipt'
      },
      {
        title: 'Automated Accounts Receivable (AR) & Collections',
        description: 'Shorten Days Sales Outstanding (DSO) by orchestrating automated payment reminders, payment links, and customer balance statements.',
        features: ['Automated dispatch of invoices and statements via email and WhatsApp', 'Dynamic dunning letter workflows based on customer payment history', 'Instant digital payment link generation with auto-reconciliation', 'Credit limit enforcement and sales hold triggers'],
        icon: 'Coins'
      },
      {
        title: 'Automated Bank Reconciliation & Feed Matching',
        description: 'Automatically pull daily electronic bank statements, match incoming customer remittances and outgoing payouts, and highlight variances.',
        features: ['Multi-bank statement ingestion (MT940, CSV, API)', 'Fuzzy matching on invoice reference numbers and transaction amounts', 'Auto-creation of incoming payment journals for matched lines', 'Instant dashboard alert for unexpected banking fees or bounced checks'],
        icon: 'Scale'
      },
      {
        title: 'B1UP Usability & Approval Workflow Automation',
        description: 'Customize SAP Business One screens, enforce mandatory data validation rules, and streamline multi-level approval workflows with B1UP.',
        features: ['Custom validation preventing users from posting without required fields', 'Color-coded high-priority document highlights for managers', 'One-click automated email dispatch of approved purchase orders', 'Over 300 pre-built usability shortcuts and business rules'],
        icon: 'Sliders'
      },
      {
        title: 'Multi-Company Consolidation & Cost Accounting',
        description: 'Consolidate multiple legal entities, manage intercompany balancing transactions, and track multi-dimensional cost center profitability.',
        features: ['Automated intercompany billing and elimination entries', 'Segment and cost center reporting (project, department, product line)', 'Real-time multi-currency ledger with automated unrealized Forex gains/losses', 'Consolidated Balance Sheet and P&L at the push of a button'],
        icon: 'BarChart3'
      },
      {
        title: 'AI Predictive Cash Flow & Delay Forecasting',
        description: 'Harness machine learning models that analyze historical payment behaviors to accurately predict customer payment dates and cash flow.',
        features: ['92% accurate predictions of when overdue invoices will be paid', '30, 60, and 90-day predictive rolling cash flow curves', 'Early warning indicators for liquidity crunches', 'Actionable recommendations for vendor payment scheduling'],
        icon: 'Sparkles'
      }
    ],
    benefits: [
      {
        title: 'DSO Reduced by 18 Days',
        description: 'Accelerate cash collections and minimize bad debt exposure with automated customer engagement.',
        icon: 'TrendingUp',
        metric: '-18 Days DSO'
      },
      {
        title: '1,000+ Invoices Daily',
        description: 'Scale transactional volumes effortlessly without adding administrative headcount to finance.',
        icon: 'Zap',
        metric: '1,000+ Daily'
      },
      {
        title: '40% Faster Month-End Close',
        description: 'Generate audited financial statements within days of month-end rather than waiting weeks.',
        icon: 'Clock',
        metric: '40% Faster'
      },
      {
        title: '100% Tax & GST Compliance',
        description: 'Direct integration with government e-invoicing and e-way bill portals ensures flawless statutory filing.',
        icon: 'CheckCircle2',
        metric: '100% Compliant'
      },
      {
        title: 'Zero Duplicate Payments',
        description: 'Systematic 3-way matching and duplicate invoice checks safeguard your working capital.',
        icon: 'ShieldCheck',
        metric: 'Zero Overpayments'
      },
      {
        title: 'Strategic CFO Visibility',
        description: 'Empower executive leadership with real-time gross margin, cash runway, and EBITDA telemetry.',
        icon: 'BarChart3',
        metric: 'Real-Time Insights'
      }
    ],
    caseStudyHighlight: {
      title: 'High-Volume Commercial Trading & Manufacturing Conglomerate',
      clientType: 'Multi-Branch Commercial Group (40+ Legal Entities)',
      quote: 'ATLAS Technosoft automated our finance operations with SAP B1, B1UP, and UiPath. We now post over 1,000 vendor invoices daily touchlessly and shortened our DSO by 18 days.',
      author: '— Chief Financial Officer',
      kpis: [
        { value: '18 Days', label: 'DSO Reduction' },
        { value: '1,000+', label: 'Daily Auto-Invoices' },
        { value: '40%', label: 'Faster Financial Close' }
      ]
    },
    techStack: [
      { name: 'SAP Business One', role: 'General Ledger, Chart of Accounts & Financial Compliance', tag: 'Core ERP' },
      { name: 'B1 Usability Package (B1UP)', role: 'Screen Customization, Approvals & Workflow Automation', tag: 'Usability' },
      { name: 'UiPath Document Understanding', role: 'AI OCR Invoice Extraction & 3-Way Matching Bots', tag: 'RPA + AI' },
      { name: 'ATLAS Vendor Reconciliation', role: 'Automated Vendor Statement Matching & Debit Notes', tag: 'Add-on' }
    ],
    relatedIndustries: [
      { title: 'Manufacturing Operations', description: 'Real-time production planning and machine capacity.', route: '/industries/manufacturing', tag: 'Production' },
      { title: 'Warehouse & Logistics', description: 'Mobile RF scanning and inventory management.', route: '/industries/warehouse-logistics', tag: 'Supply Chain' },
      { title: 'Trading & Shipping', description: 'Wholesale order-to-cash and customs documentation.', route: '/industries/trading-shipping', tag: 'Commercial' }
    ]
  },

  'trading-shipping': {
    slug: 'trading-shipping',
    badge: 'COMMERCIAL TRADING & MARITIME SHIPPING',
    title: 'High-Volume Trading, Freight & Shipping Logistics',
    titleHighlight: 'Powered by SAP B1 & Custom Add-Ons',
    tagline: 'Save 85% Documentation Time, Automate Landed Costs, and Eliminate 90% of Trade Processing Errors',
    description:
      'Empower import-export enterprises, commodity traders, and wholesale distributors with end-to-end trading and shipping automation. ATLAS Technosoft combines SAP Business One with specialized multi-currency freight modules, automated customs documentation, and container tracking to accelerate order-to-cash cycles.',
    heroImage: '/images/crystal_hd/ind_shipping.jpg',
    heroImageAlt: 'International Maritime Container Vessel Docked at Busy Port Container Terminal',
    metrics: [
      { value: '85%', label: 'Documentation Time Saved', detail: 'Instant generation of Commercial Invoices, Packing Lists & Bills of Lading', color: 'text-[#1B72E8]' },
      { value: '90%', label: 'Trade Processing Error Drop', detail: 'Automated landed cost computation and customs duty distribution', color: 'text-[#10b981]' },
      { value: '100%', label: 'End-to-End Visibility', detail: 'Real-time container tracking, port ETA forecasting & shipment milestones', color: 'text-[#0066CC]' },
      { value: '2×', label: 'Faster Order Turnaround', detail: 'Direct customer PO ingestion and automated sales order creation', color: 'text-[#0284c7]' },
    ],
    overview: {
      heading: 'Navigate International Trade Complexity with Uncompromising Precision',
      subheading: 'Eliminate manual shipping paperwork delays, unexpected demurrage penalties, and complex customs duty miscalculations.',
      paragraphs: [
        'Global trading and shipping companies operate in high-velocity, low-margin environments. Managing fluctuating ocean freight rates, multi-currency price lists, customs tariffs, letters of credit (LC), and port documentation across time zones creates acute operational friction.',
        'ATLAS Technosoft deploys specialized solutions that integrate directly into SAP Business One. From automated House and Master Bill of Lading generation to multi-currency landed cost allocation and real-time container tracking, we empower traders to scale volume while cutting documentation time by 85%.'
      ],
      checklist: [
        'Automated generation of complete export documentation packages (HBL/MBL, COO, Invoice, Packing List)',
        'Accurate multi-currency landed cost apportionment (freight, insurance, customs, terminal handling)',
        'Real-time vessel and container status tracking with automated ETA updates to customers',
        'Letter of Credit (LC) and bank guarantee tracking with expiry and document presentation alerts'
      ],
      image: '/images/case_studies/cs_trading.jpg',
      imageAlt: 'Cargo Operations and International Freight Management at Major Port'
    },
    capabilities: [
      {
        title: 'Automated Shipping & Customs Documentation',
        description: 'Generate complete, compliant international export-import documentation sets with a single click in SAP Business One.',
        features: ['Automated Commercial Invoice & Multi-Carton Packing List', 'House and Master Bill of Lading (HBL/MBL) creation', 'Certificate of Origin and Inspection Certificates', 'Direct electronic export manifest generation'],
        icon: 'FileCheck'
      },
      {
        title: 'Multi-Modal Landed Cost & Duty Distribution',
        description: 'Apportion ocean freight, air cargo, marine insurance, and customs duties accurately across individual items on a bill.',
        features: ['Cost allocation by gross weight, net weight, volume, or CIF value', 'Multi-currency freight charge calculation with live exchange rates', 'Automatic update of inventory moving average cost upon GRPO', 'Comprehensive shipment profitability and gross margin reporting'],
        icon: 'Scale'
      },
      {
        title: 'Real-Time Container & Vessel ETA Tracking',
        description: 'Connect your ERP to global maritime carrier data to track container milestones, transshipment hubs, and port arrival dates.',
        features: ['Container milestone tracking (gated-in, loaded, vessel departed, arrived)', 'Predictive ETA alerts warning of port congestion or weather delays', 'Automated customer shipping notification emails and WhatsApp alerts', 'Demurrage and detention risk warning alerts'],
        icon: 'Ship'
      },
      {
        title: 'Multi-Branch Order-to-Cash & Stock Allocation',
        description: 'Accelerate wholesale trading operations by automatically matching incoming customer orders against on-hand, in-transit, and on-order stock.',
        features: ['Omnichannel customer order ingestion from EDI and portals', 'Automated backorder management and priority inventory reservation', 'Customer-specific pricing tiers and volume discounts', 'Direct dispatch of pro-forma invoices with instant payment links'],
        icon: 'ShoppingCart'
      },
      {
        title: 'Letter of Credit (LC) & Trade Finance Management',
        description: 'Track documentary credits, bank guarantees, and export factoring directly within the SAP Business One environment.',
        features: ['LC terms, tolerance percentages, and expiry date management', 'Document presentation checklist preventing bank discrepancies', 'Margin money and bank limit utilization tracking', 'Export realization tracking and statutory compliance'],
        icon: 'Building'
      },
      {
        title: 'Gen-AI Powered Customer Shipping Updates',
        description: 'Deploy intelligent communication bots that answer customer status inquiries instantly via email or WhatsApp without human intervention.',
        features: ['Automated replies to customer "Where is my shipment?" queries', 'Instant PDF document retrieval and secure attachment dispatch', 'Proactive exception alerts for weather or customs holds', 'Freed logistics support coordinators from repetitive calls'],
        icon: 'Sparkles'
      }
    ],
    benefits: [
      {
        title: '85% Documentation Time Saved',
        description: 'Generate entire compliant shipping document packets in minutes instead of hours.',
        icon: 'FileText',
        metric: '85% Faster'
      },
      {
        title: '90% Fewer Trade Errors',
        description: 'Eliminate costly customs rejections and documentation penalties through automated validation.',
        icon: 'ShieldCheck',
        metric: '90% Error Drop'
      },
      {
        title: '100% Landed Cost Precision',
        description: 'Know your exact unit cost and true gross margin before selling imported goods.',
        icon: 'BarChart3',
        metric: 'Exact Margins'
      },
      {
        title: 'Zero Demurrage Penalties',
        description: 'Proactive container tracking and customs documentation preparation prevent port storage charges.',
        icon: 'Clock',
        metric: 'Zero Demurrage'
      },
      {
        title: '2x Faster Order Turnaround',
        description: 'Fulfill customer orders faster by matching against in-transit shipments before docking.',
        icon: 'Zap',
        metric: '2x Speed'
      },
      {
        title: 'Delighted Global Clients',
        description: 'Provide clients with automated milestone updates and transparent digital tracking.',
        icon: 'CheckCircle2',
        metric: '99% CSAT'
      }
    ],
    caseStudyHighlight: {
      title: 'Global Commodity & Chemical Trading Corporation',
      clientType: 'Multi-National Import-Export Distributor',
      quote: 'ATLAS Technosoft transformed our trading and shipping operations. Export documentation time plummeted by 85%, and our landed cost precision eliminated profit leaks on every vessel shipment.',
      author: '— Director of International Logistics',
      kpis: [
        { value: '85%', label: 'Documentation Time Saved' },
        { value: '90%', label: 'Fewer Shipping Errors' },
        { value: '100%', label: 'Real-Time Visibility' }
      ]
    },
    techStack: [
      { name: 'SAP Business One', role: 'Multi-Currency Financials, Inventory & Landed Cost Engine', tag: 'Core ERP' },
      { name: 'ATLAS Shipping Add-On', role: 'Custom Shipping Documentation & Container Tracking', tag: 'Proprietary' },
      { name: 'UiPath Orchestrator', role: 'Automated Carrier Tracking & Email Ingestion Bots', tag: 'Hyperautomation' },
      { name: 'ATLAS Freight Module', role: 'Landed Cost Distribution & Customs Exchange Rates', tag: 'Specialized Suite' }
    ],
    relatedIndustries: [
      { title: 'Warehouse & Logistics', description: 'Advanced mobile RF scanning and multi-bin management.', route: '/industries/warehouse-logistics', tag: 'Supply Chain' },
      { title: 'Manufacturing Operations', description: 'Shop-floor terminals, BOMs and production scheduling.', route: '/industries/manufacturing', tag: 'Production' },
      { title: 'Finance & Administration', description: 'Multi-company accounting, DSO reduction and cash flow.', route: '/industries/finance-administration', tag: 'Corporate' }
    ]
  }
};

