import { DomainSolutionData } from '../types/domainSolutions';

export const DOMAIN_SOLUTIONS_DATA: Record<string, DomainSolutionData> = {
  // 1. Manufacturing Solutions
  manufacturing: {
    slug: 'manufacturing',
    route: '/solutions/manufacturing',
    eyebrow: 'DISCRETE & PROCESS MANUFACTURING ERP',
    title: 'Smart Manufacturing & Shop-Floor',
    titleHighlight: 'Execution Solutions',
    subtitle: 'Unified MRP II, Finite Capacity APS & Real-Time Terminal Data Collection',
    description: 'Transform discrete, batch, and process manufacturing operations with SAP Business One and Boyum Beas Manufacturing. Eliminate planning guesswork, optimize raw material yields, track machine capacity in real time, and reduce scrap by up to 42%.',
    heroImage: '/images/solutions/solutions_beas_manufacturing.jpg',
    heroImageAlt: 'Modern Automotive and Industrial Manufacturing Facility with Robotic Assembly',
    partnerBadges: ['SAP Business One HANA', 'Boyum IT Beas Certified', 'MRP II & APS Architecture'],
    metrics: [
      { value: '27%', label: 'Manufacturing Efficiency Gain', detail: 'Optimized scheduling and reduced idle machine time' },
      { value: '42%', label: 'Scrap & Defect Reduction', detail: 'In-line quality inspection & AI vision defect capture' },
      { value: '45 Days', label: 'Rapid Go-Live Benchmark', detail: 'Turnkey SAP B1 + Beas implementation methodology' }
    ],
    challenges: [
      {
        title: 'Multi-Level BOM Complexity & Inaccurate Costing',
        description: 'Managing complex engineering bills of materials across sub-assemblies using static spreadsheets leads to unaccounted scrap, variance leakages, and delayed customer quoting.',
        impact: 'High margin erosion and delayed product delivery schedules.'
      },
      {
        title: 'Unbalanced Machine Scheduling & Idle Run Times',
        description: 'Without finite capacity scheduling, sudden work order additions create machine bottlenecks, tooling conflicts, and excessive changeover downtime.',
        impact: 'Poor Overall Equipment Effectiveness (OEE) and unpredictable factory lead times.'
      },
      {
        title: 'Disconnected Work-in-Progress (WIP) Tracking',
        description: 'Lack of digital shop-floor terminals forces supervisors to log production tallies on paper at shift-end, leaving inventory managers blind to true stock on the factory floor.',
        impact: 'Stockouts of critical intermediate components and delayed assembly lines.'
      },
      {
        title: 'Strict Regulatory & Batch Traceability Demands',
        description: 'Quality-sensitive manufacturing (automotive, pharma, industrial) requires end-to-end forward and backward batch pedigree from raw supplier material to final customer dispatch.',
        impact: 'Vulnerability to compliance audit failures and catastrophic product recall liabilities.'
      }
    ],
    architectureOverview: {
      heading: 'Closed-Loop Manufacturing Architecture with SAP & Beas',
      description: 'ATLAS integrates SAP Business One with Boyum Beas Manufacturing to form a seamless operational loop connecting sales demand, MRP II material forecasting, finite shop-floor scheduling, and touch terminal execution.',
      points: [
        {
          title: 'Dynamic Bill of Materials (BOM) & Routing Management',
          description: 'Define multi-level BOMs with active version control, alternative components, fixed/variable scrap factors, and detailed operational labor/machine run times.',
          technologies: ['SAP Business One', 'Beas BOM Engine', 'Version Controller']
        },
        {
          title: 'Finite Advanced Planning & Scheduling (APS)',
          description: 'Visualize and optimize production schedules against real machine capacity, tooling availability, scheduled maintenance windows, and worker skill shifts.',
          technologies: ['Beas APS Visual Planner', 'Gantt Scheduler', 'Resource Pool']
        },
        {
          title: 'Touchscreen Shop-Floor Data Capture (SFDC)',
          description: 'Deploy ruggedized industrial terminals and barcode scanners at machine stations allowing operators to log work orders, run times, pauses, and scrap reasons live.',
          technologies: ['Beas Web Terminal', 'Industrial Barcode Readers', 'REST Service Layer']
        },
        {
          title: 'Integrated In-Line Quality Control (QC)',
          description: 'Enforce mandatory inspection gates at goods receipt, intermediate machining stages, and final packing with automated Certificate of Analysis (CoA) generation.',
          technologies: ['Beas Quality Assurance', 'Defect Loggers', 'SAP General Ledger']
        }
      ]
    },
    features: [
      {
        title: 'Finite Capacity MRP II Engine',
        description: 'Calculates procurement and production schedules based on actual order backlog, lead times, safety stocks, and resource constraints.',
        icon: 'Cpu'
      },
      {
        title: 'Real-Time WIP Cost Accounting',
        description: 'Posts actual machine, labor, overhead, and raw material expenses to work-in-progress general ledgers upon operation completion.',
        icon: 'Database'
      },
      {
        title: 'Tool & Mold Maintenance Management',
        description: 'Tracks tool strokes, calibration cycles, and maintenance schedules directly linked to work order releases.',
        icon: 'Settings'
      },
      {
        title: 'Complete Bi-Directional Traceability',
        description: 'Instantly trace any finished lot number back to its raw material supplier batches, machine stations, and quality inspector IDs.',
        icon: 'ShieldCheck'
      }
    ],
    workflowSteps: [
      {
        step: 1,
        title: 'Sales Order & Demand Forecasting',
        description: 'Confirmed sales orders and demand forecasts automatically trigger MRP II calculations in SAP Business One.',
        output: 'Target Production Work Orders & Purchase Recommendations'
      },
      {
        step: 2,
        title: 'Finite APS Scheduling & Optimization',
        description: 'Beas APS calculates optimal job sequences considering setup times, mold availability, and machine capacities.',
        output: 'Sequenced Shop-Floor Work Order Queue'
      },
      {
        step: 3,
        title: 'Material Staging & Barcode Verification',
        description: 'Raw materials are picked from warehouse bins and verified via barcode scanner before staging at machines.',
        output: 'Verified Material Issue to WIP'
      },
      {
        step: 4,
        title: 'Terminal Execution & In-Line QC',
        description: 'Operators punch start/stop on touch terminals; quality inspectors record dimensional checks and approve batches.',
        output: 'Live Operation Receipts & QC Inspection Certificates'
      },
      {
        step: 5,
        title: 'Finished Goods Receipt & Cost Variance',
        description: 'Finished products are booked into warehouse inventory; system computes actual vs standard cost variances.',
        output: 'Finished Goods in Stock & Financial P&L Postings'
      }
    ],
    relatedSolutions: [
      {
        title: 'Boyum IT Manufacturing Practice',
        description: 'Deep dive into Beas Manufacturing, B1 Usability Package, and handheld module extensions.',
        href: '/services/boyum-it',
        tag: 'Partner Solution'
      },
      {
        title: 'Warehouse Management Solutions',
        description: 'Connect shop-floor finished output directly to multi-bin warehouse storage and guided dispatch.',
        href: '/solutions/warehouse-management',
        tag: 'Domain Solution'
      },
      {
        title: 'Application Management Services (AMS)',
        description: '24/7 SLA-backed support, version upgrades, and ongoing optimization for manufacturing clients.',
        href: '/services/support-maintenance',
        tag: 'Support Service'
      }
    ],
    caseStudy: {
      category: 'Discrete Manufacturing',
      title: 'Precision Component Manufacturer 40% Throughput Boost',
      quote: 'Deploying Beas Manufacturing and SAP Business One gave our production managers real-time visibility across 14 CNC workstations. Scrap rates plummeted, and delivery precision reached 98.4%.',
      designation: 'Operations Vice President, Precision Engineering Group',
      href: '/case-studies/industrial-manufacturing'
    }
  },

  // 2. Warehouse Management Solutions
  'warehouse-management': {
    slug: 'warehouse-management',
    route: '/solutions/warehouse-management',
    eyebrow: 'INTELLIGENT MULTI-BIN WAREHOUSE EXECUTION',
    title: 'Advanced Warehouse Management',
    titleHighlight: 'Solutions (WMS)',
    subtitle: 'High-Performance Multi-Bin Storage, Handheld RF Scanning & Automated E-Way Billing',
    description: 'Transform manual warehouse hubs into barcode-directed fulfillment centers with SAP Business One and Boyum Produmex WMS. Achieve 99.4%+ inventory accuracy, cut order picking travel by 40%, and eliminate shipping discrepancies.',
    heroImage: '/images/solutions/solutions_produmex_wms.jpg',
    heroImageAlt: 'Automated Logistics Warehouse with Multi-Tier Storage and Barcode Scanning Operators',
    partnerBadges: ['SAP Business One', 'Boyum Produmex WMS Silver Partner', 'Handheld RF Scanning Suite'],
    metrics: [
      { value: '99.4%', label: 'Inventory Record Accuracy', detail: 'Eliminated stock misplacements and manual tallies' },
      { value: '40%+', label: 'Faster Order Picking Velocity', detail: 'System-directed wave, zone & batch picking paths' },
      { value: '68%', label: 'Reduction in Dispatch Errors', detail: 'Mandatory GS1 barcode & QR validation at packing' }
    ],
    challenges: [
      {
        title: 'Misplaced Stock & Phantom Inventory Discrepancies',
        description: 'Without dynamic multi-bin location tracking, warehouse items are stored haphazardly. System balances show available stock, but pickers cannot physically find items on the floor.',
        impact: 'Order fulfillment delays, emergency reorders, and expensive inventory write-offs.'
      },
      {
        title: 'Inefficient Paper-Based Picking Routes',
        description: 'Workers walking long, zig-zagging paths across warehouse aisles with printed pick lists spend up to 60% of their time traveling rather than picking orders.',
        impact: 'Severe fulfillment bottlenecks during month-end surges and peak seasonal volumes.'
      },
      {
        title: 'Mishandled Batches & Expired Stock Shipments',
        description: 'Manual checking of batch numbers and expiry dates frequently fails, resulting in older batches expiring on back shelves while newer stock is shipped.',
        impact: 'Customer return penalties, expired stock write-downs, and regulatory compliance breaches.'
      },
      {
        title: 'Manual Dispatch Logging & Delayed E-Way Bills',
        description: 'Manually keying vehicle numbers, weights, and items into tax portals slows down dispatch docks and creates vehicle detention queues at the warehouse gate.',
        impact: 'High transporter detention charges and customer delivery SLA penalties.'
      }
    ],
    architectureOverview: {
      heading: 'Intelligent Warehouse Execution with SAP & Produmex WMS',
      description: 'ATLAS replaces disconnected paper processes with an end-to-end mobile barcode architecture. Ruggedized Android handheld RF terminals guide operators through every physical movement from goods inward to container loading.',
      points: [
        {
          title: 'Granular Multi-Bin Hierarchical Modeling',
          description: 'Digitize your warehouse into zones, aisles, racks, shelves, and bins with defined dimensions, maximum weight capacities, and temperature controls.',
          technologies: ['SAP Business One', 'Produmex Bin Manager', 'GS1-128 Location Barcodes']
        },
        {
          title: 'System-Directed Putaway Intelligence',
          description: 'Incoming materials are analyzed by weight, turnover velocity (fast/slow movers), and hazardous classifications to suggest optimal storage locations.',
          technologies: ['Produmex Putaway Engine', 'Handheld RF Scanners', 'Stock Allocation']
        },
        {
          title: 'Optimized Wave, Zone & Batch Picking',
          description: 'Group orders into picking waves that navigate operators along a single shortest-path route, verifying every SKU and lot barcode at the bin.',
          technologies: ['Wave Planner', 'Pick-to-Tote Engine', 'Visual Bin Validation']
        },
        {
          title: 'Automated Pack, Weigh & E-Way Bill Generation',
          description: 'Integrated digital packing stations print carrier-compliant labels and automatically generate official Indian e-Way bills via Government NIC APIs.',
          technologies: ['Packing Station UI', 'Electronic Scale Interface', 'NIC E-Way Bill Service']
        }
      ]
    },
    features: [
      {
        title: 'Rugged Handheld Android Scanner Suite',
        description: 'Optimized touch interface for warehouse operators supporting long-range 1D/2D laser scanning even in low-connectivity cold storage.',
        icon: 'Truck'
      },
      {
        title: 'Continuous Cycle Counting (Zero Shutdowns)',
        description: 'Perform rolling inventory audits by bin or ABC classification during active working hours without halting inbound or outbound shipments.',
        icon: 'RefreshCw'
      },
      {
        title: 'FEFO / FIFO Automated Allocation',
        description: 'Enforce strict First-Expiry-First-Out (FEFO) or First-In-First-Out (FIFO) batch rotation rules at the moment of order reservation.',
        icon: 'Clock'
      },
      {
        title: 'Multi-Carrier Shipping Aggregator Link',
        description: 'Connect directly to logistics aggregators and parcel carriers to book waybills, track shipments, and reconcile freight invoices.',
        icon: 'Boxes'
      }
    ],
    workflowSteps: [
      {
        step: 1,
        title: 'Goods Inward & ASN Verification',
        description: 'Truck arrives; operator scans supplier Advanced Shipping Notice (ASN) barcode or PO number on mobile terminal.',
        output: 'System Goods Receipt PO (GRPO) Draft'
      },
      {
        step: 2,
        title: 'Barcode Printing & Directed Putaway',
        description: 'System prints GS1 batch labels; handheld scanner guides operator to designated bin and confirms barcode scan.',
        output: 'Verified Putaway into Specific Storage Bin'
      },
      {
        step: 3,
        title: 'Wave Generation & Guided Picking',
        description: 'Sales orders grouped into optimized picking routes; worker picks items into totes with mandatory SKU barcode confirmation.',
        output: 'Picked Order Totes at Staging Area'
      },
      {
        step: 4,
        title: 'Packing Station Weigh & Quality Audit',
        description: 'Items scanned into shipping cartons; electronic weigh scale validates weight against calculated tolerance thresholds.',
        output: 'Shipping Carton Packing Slip & Carrier Label'
      },
      {
        step: 5,
        title: 'Dispatch Gate Scan & E-Way Bill Creation',
        description: 'Cartons scanned onto delivery truck; SAP B1 automatically triggers official e-Way bill and posts Delivery document.',
        output: 'Official Delivery Note, E-Way Bill & Closed Order'
      }
    ],
    relatedSolutions: [
      {
        title: 'Logistics & Shipping Solutions',
        description: 'Extend warehouse fulfillment into multi-modal freight tracking and landed cost calculations.',
        href: '/solutions/logistics-shipping',
        tag: 'Domain Solution'
      },
      {
        title: 'ATLAS Proprietary Gate Entry Add-on',
        description: 'Automate weighbridge scale capture and security gate vehicle checks before warehouse docking.',
        href: '/solutions/atlas-addons',
        tag: 'ATLAS Add-on'
      },
      {
        title: 'Boyum IT Certified Practice',
        description: 'Explore full Produmex WMS capabilities and certified partner deployment services.',
        href: '/services/boyum-it',
        tag: 'Partner Solution'
      }
    ],
    caseStudy: {
      category: 'Warehouse & Logistics',
      title: 'Industrial Supply Distributor Multi-Bin Transformation',
      quote: 'Deploying Produmex WMS with SAP Business One transformed our fulfillment. Dispatch errors dropped to near-zero, and warehouse throughput increased by over 40% across two distribution hubs.',
      designation: 'Supply Chain & Logistics Director, National Distribution Group',
      href: '/case-studies/warehouse-management'
    }
  },

  // 3. Finance Automation Solutions
  'finance-automation': {
    slug: 'finance-automation',
    route: '/solutions/finance-automation',
    eyebrow: 'TOUCHLESS ACCOUNTING & EXECUTIVE CONTROL',
    title: 'Enterprise Finance & Tax',
    titleHighlight: 'Automation Solutions',
    subtitle: 'From 10 Days to Under 48 Hours: Intelligent AP Invoicing, Bank Reconciliation & GST Compliance',
    description: 'Compress month-end financial closing cycles and eliminate manual bookkeeping errors. ATLAS combines SAP Business One HANA in-memory financials with UiPath intelligent RPA software robots to deliver touchless invoice ingestion, 3-way matching, and automated Indian tax compliance.',
    heroImage: '/images/crystal_hd/ind_finance.jpg',
    heroImageAlt: 'Financial Controller Reviewing Real-Time SAP HANA Balance Sheet and Cash Flow Analytics',
    partnerBadges: ['SAP HANA In-Memory Certified', 'UiPath Silver Partner', 'GST & E-Invoicing Compliant'],
    metrics: [
      { value: '<48 Hrs', label: 'Month-End Financial Close', detail: 'Accelerated down from 10 days with automated journals' },
      { value: '85%', label: 'Drop in Manual Data Entry', detail: 'Touchless OCR AP invoice ingestion and posting' },
      { value: 'Zero', label: 'GST Input Tax Credit Loss', detail: 'Automated GSTR-2B reconciliation before payment approval' }
    ],
    challenges: [
      {
        title: 'Overwhelming Volume of Supplier Paper & PDF Invoices',
        description: 'Accounts payable teams manually typing invoice numbers, HSN codes, and line-item amounts into ERP systems introduce typos, duplicate entries, and delayed approvals.',
        impact: 'High administrative overhead and missed supplier early-payment discounts.'
      },
      {
        title: 'Tedious, Time-Consuming Bank Reconciliations',
        description: 'Reconciling hundreds of daily bank transaction rows against sales receipts and vendor disbursements using Excel spreadsheets takes days after month-end.',
        impact: 'Obscured cash flow runway and delayed executive financial statements.'
      },
      {
        title: 'Risk of Lost GST Input Tax Credit (ITC)',
        description: 'If a vendor fails to file their invoice on the Government GST portal or files with mismatched tax values, your business loses eligible tax credits unless caught beforehand.',
        impact: 'Direct cash flow leakage and punitive statutory tax penalties.'
      },
      {
        title: 'Fragmented Multi-Branch & Multi-Currency Accounting',
        description: 'Consolidating balance sheets across multiple regional business units with foreign exchange transactions requires complicated manual journal balancing.',
        impact: 'Delayed board reporting and lack of real-time profitability visibility.'
      }
    ],
    architectureOverview: {
      heading: 'Touchless Financial Operations Architecture',
      description: 'ATLAS pairs SAP Business One general ledger controls with UiPath software robots. Robots handle document ingestion, data validation, and government portal scraping, freeing senior accountants for strategic financial analysis.',
      points: [
        {
          title: 'UiPath AI Document Understanding (OCR)',
          description: 'Autonomous software robots ingest vendor invoices from emails, extract headers, tables, tax amounts, and HSN codes with 99%+ optical precision.',
          technologies: ['UiPath AI Center', 'Document Understanding OCR', 'REST Service Layer']
        },
        {
          title: 'Automated 3-Way PO, GRPO & Invoice Matching',
          description: 'Robots validate invoice quantities and rates against SAP Business One purchase orders and warehouse goods receipts, auto-posting matching records.',
          technologies: ['SAP Business One AP Engine', 'Workflow Rules Engine', 'Approval Matrix']
        },
        {
          title: 'Automated MT940 / CSV Bank Reconciliation',
          description: 'Imports electronic bank statement feeds daily, matches customer references and UTR numbers, and reconciles open accounts receivable entries.',
          technologies: ['SAP Banking Module', 'Bank Reconciliation Bot', 'Payment Engine']
        },
        {
          title: 'Statutory GST Portal Auto-Reconciliation',
          description: 'Robots download monthly GSTR-2B data from the government portal and cross-check against SAP purchase registers, flagging unfiled supplier bills.',
          technologies: ['GST API Gateway', 'GSTR-2B Reconciler', 'Payment Block Trigger']
        }
      ]
    },
    features: [
      {
        title: 'Instant Sub-Second HANA Financial Analytics',
        description: 'Compute consolidated balance sheets, P&L by division, and cash flow projections in sub-seconds across millions of transactions.',
        icon: 'TrendingUp'
      },
      {
        title: 'Direct Government E-Invoicing & E-Way Bills',
        description: 'Generate Government Invoice Reference Numbers (IRN) and digitally signed QR codes directly upon invoice approval in SAP.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Automated Multi-Currency Forex Revaluation',
        description: 'Automatically calculates realized and unrealized foreign exchange gains and losses on foreign currency vendor and customer ledgers.',
        icon: 'RefreshCw'
      },
      {
        title: 'Automated Dunning & Payment Reminder Workflows',
        description: 'Generates automated payment reminder statements and escalation notices to overdue debtors based on customizable credit terms.',
        icon: 'Clock'
      }
    ],
    workflowSteps: [
      {
        step: 1,
        title: 'Invoice Receipt via Email / Portal',
        description: 'Supplier emails PDF invoice to accounts desk; UiPath bot detects incoming email and downloads attachment.',
        output: 'PDF Staged in Secure Robotic Processing Queue'
      },
      {
        step: 2,
        title: 'AI Data Extraction & Normalization',
        description: 'Document Understanding extracts invoice number, vendor GSTIN, line-item HSN, rates, and total tax amounts.',
        output: 'Structured JSON Transaction Payload'
      },
      {
        step: 3,
        title: 'SAP B1 3-Way Validation & Tolerance Check',
        description: 'Bot queries SAP Business One to verify matching Purchase Order and Goods Receipt PO within price tolerance.',
        output: 'Approved AP Reserve Invoice or Exception Flag'
      },
      {
        step: 4,
        title: 'GSTR-2B Verification & Payment Clearance',
        description: 'Bot cross-verifies vendor tax filing on GST portal; upon match, releases invoice for scheduled payment run.',
        output: 'Cleared for Payment & Verified Input Tax Credit'
      },
      {
        step: 5,
        title: 'Automated Bank Reconcile & Journal Post',
        description: 'Payment batch executed; electronic bank statement auto-reconciled against bank ledger in SAP HANA.',
        output: 'Reconciled Ledgers & Real-Time Cash Flow Dashboards'
      }
    ],
    relatedSolutions: [
      {
        title: 'UiPath RPA & Hyperautomation Practice',
        description: 'Explore full capabilities of software robots for finance, supply chain, and CRM operations.',
        href: '/services/uipath-automation',
        tag: 'Partner Solution'
      },
      {
        title: 'SAP Business One Core Implementation',
        description: 'Deploy robust enterprise financial accounting, multi-currency ledgers, and audit governance.',
        href: '/services/sap-business-one',
        tag: 'Core ERP'
      },
      {
        title: 'Support & Maintenance (AMS)',
        description: 'Ongoing statutory tax rule updates, GST schema changes, and quarterly audit assistance.',
        href: '/services/support-maintenance',
        tag: 'Support Service'
      }
    ],
    caseStudy: {
      category: 'Finance & Administration',
      title: 'Automated Financial Operations for Commercial Group',
      quote: 'Automated invoice approvals and instant bank reconciliations cut our month-end financial closing time from ten days to under 48 hours without increasing accounting headcount.',
      designation: 'Chief Financial Officer, Commercial Services Group',
      href: '/case-studies/business-process-automation'
    }
  },

  // 4. Logistics & Shipping Solutions
  'logistics-shipping': {
    slug: 'logistics-shipping',
    route: '/solutions/logistics-shipping',
    eyebrow: 'SUPPLY CHAIN & MULTI-MODAL LOGISTICS',
    title: 'Logistics, Shipping & Freight',
    titleHighlight: 'Management Solutions',
    subtitle: 'End-to-End Multi-Modal Container Tracking, Landed Cost Allocation & Automated Gate Entry',
    description: 'Eliminate freight margin leakage, demurrage fines, and gate detention delays. ATLAS implements comprehensive shipping logistics within SAP Business One, incorporating multi-modal freight booking, precise landed cost duty apportionment, and automated weighbridge scale integration.',
    heroImage: '/images/crystal_hd/ind_shipping.jpg',
    heroImageAlt: 'Global Ocean Freight Container Terminal and Cargo Logistics Hub',
    partnerBadges: ['SAP Business One Logistics', 'ATLAS EXIM Engine', 'Weighbridge Hardware Certified'],
    metrics: [
      { value: '100%', label: 'Landed Cost Visibility on Every SKU', detail: 'Full customs duty, freight & port charge allocation' },
      { value: '3x', label: 'Faster Shipping Document Processing', detail: 'Automated Bills of Lading, packing lists & customs docs' },
      { value: 'Zero', label: 'Unallocated Demurrage or Port Fines', detail: 'Automated detention container countdowns' }
    ],
    challenges: [
      {
        title: 'Hidden Margin Leakage from Unallocated Landed Costs',
        description: 'Customs duties, ocean freight, port handling, and clearing charges are often billed weeks after goods arrive, leaving companies unaware of true unit profitability.',
        impact: 'Selling imported inventory below actual cost and distorted gross margin accounting.'
      },
      {
        title: 'Expensive Port Demurrage & Container Detention Penalties',
        description: 'Losing track of container free-days at port terminals leads to steep detention charges from shipping lines and terminal operators.',
        impact: 'Millions in unexpected annual operational penalty costs.'
      },
      {
        title: 'Slow Gate Entry & Weighbridge Bottlenecks',
        description: 'Manual paper register entry of incoming trucks, manual gross/tare scale recording, and manual gate passes cause long truck queues outside factory premises.',
        impact: 'Driver detention charges, inventory receipt delays, and vulnerability to weight theft.'
      },
      {
        title: 'Complex Multi-Currency Export/Import Compliance',
        description: 'Managing Letters of Credit (LC), bank guarantees, exchange rate adjustments, and export incentive documentation across multiple spreadsheets creates compliance chaos.',
        impact: 'Delayed export duty drawbacks and statutory regulatory penalties.'
      }
    ],
    architectureOverview: {
      heading: 'Integrated Multi-Modal Logistics Architecture',
      description: 'ATLAS connects global shipping workflows directly into SAP Business One. From initial purchase contract and customs clearance to automated weighbridge gate check-in, all physical and financial variables remain synchronized.',
      points: [
        {
          title: 'Precision Landed Cost Calculation Engine',
          description: 'Apportions ocean freight, customs tariff duty, port clearance, and inland transport charges to individual item valuations based on weight, volume, or customs value.',
          technologies: ['SAP Business One Landed Cost', 'Customs Tariff Master', 'Cost Apportionment']
        },
        {
          title: 'Container & Shipment Lifecycle Tracking',
          description: 'Tracks Bill of Lading (B/L) milestones, container numbers, vessel ETA, and customs clearing stages with automated alerts for impending free-day expiry.',
          technologies: ['Shipment Status Tracker', 'Detention Countdown Alert', 'Milestone Monitor']
        },
        {
          title: 'Automated Gate Entry & Weighbridge Interface',
          description: 'Interfaces directly with electronic weighbridge scales and gate cameras to log vehicle license plates, capture gross/tare weights, and generate digital gate passes.',
          technologies: ['ATLAS Weighbridge Bridge', 'Scale RS-232 / TCP Driver', 'Gate Pass Kiosk']
        },
        {
          title: 'Export / Import (EXIM) Documentation Suite',
          description: 'Generates standard statutory documentation: Commercial Invoices, Packing Lists, Certificates of Origin, Shipping Bills, and Letters of Credit tracking.',
          technologies: ['EXIM Document Generator', 'Letter of Credit Tracker', 'Bank Export Register']
        }
      ]
    },
    features: [
      {
        title: 'Electronic Weighbridge Scale Driver',
        description: 'Direct communication with industrial weighbridge indicators preventing manual tampering of gross and tare weights.',
        icon: 'Boxes'
      },
      {
        title: 'Multi-Modal Freight Booking (Sea, Air, Road)',
        description: 'Manage FCL, LCL, break-bulk, and air shipments with consolidated multi-leg billing and route cost tracking.',
        icon: 'Truck'
      },
      {
        title: 'Automated E-Way Bill Generation at Gate',
        description: 'Direct NIC portal integration triggers valid e-way bills immediately upon vehicle tare weight validation.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Multi-Currency Forex Risk Accounting',
        description: 'Tracks foreign currency contracts against customs exchange rates and commercial bank transaction rates.',
        icon: 'RefreshCw'
      }
    ],
    workflowSteps: [
      {
        step: 1,
        title: 'International PO Booking & LC Setup',
        description: 'Purchase contract booked in foreign currency; Letter of Credit (LC) terms and shipping windows established in SAP.',
        output: 'Active Import PO & Documented LC Commitment'
      },
      {
        step: 2,
        title: 'Vessel Dispatch & Milestone Tracking',
        description: 'Supplier dispatches cargo; Bill of Lading, container numbers, and port arrival dates logged with detention alerts.',
        output: 'In-Transit Shipment Tracking & Free-Day Monitor'
      },
      {
        step: 3,
        title: 'Customs Clearance & Landed Cost Entry',
        description: 'Customs duty, port handling, and ocean freight invoices allocated to item inventory value via Landed Cost document.',
        output: 'Exact Unit Landed Cost Calculated in SAP B1'
      },
      {
        step: 4,
        title: 'Gate Entry & Automated Weighbridge Check',
        description: 'Truck arrives at facility; electronic weighbridge captures gross weight, verifies PO, and prints barcode gate pass.',
        output: 'Gross Weight Certified & Gate Entry Slip Issued'
      },
      {
        step: 5,
        title: 'Unloading, Tare Weight & Stock Inward',
        description: 'Cargo unloaded into warehouse; truck tare weight logged; net weight verified against customs packing list.',
        output: 'Goods Receipt PO Finalized & Stock Active in Warehouse'
      }
    ],
    relatedSolutions: [
      {
        title: 'ATLAS Proprietary Add-on Modules',
        description: 'Explore our full suite of enterprise add-on modules for Indian statutory and industrial operations.',
        href: '/solutions/atlas-addons',
        tag: 'ATLAS Add-on'
      },
      {
        title: 'Warehouse Management Solutions',
        description: 'Direct integration from container unloading into multi-bin warehouse putaway and RF scanning.',
        href: '/solutions/warehouse-management',
        tag: 'Domain Solution'
      },
      {
        title: 'Support & Maintenance (AMS)',
        description: 'Ongoing support for weighbridge hardware interfaces, EDI bridges, and customs format updates.',
        href: '/services/support-maintenance',
        tag: 'Support Service'
      }
    ],
    caseStudy: {
      category: 'Trading & Distribution',
      title: 'Global Export-Import Trading House ERP Modernization',
      quote: 'ATLAS implemented landed cost automation and EXIM documentation that gave us 100% margin clarity across hundreds of monthly shipping containers. Demurrage penalties dropped to zero.',
      designation: 'Managing Director, International Trading Group',
      href: '/case-studies/trading-operations'
    }
  },

  // 5. ATLAS Proprietary Add-ons
  'atlas-addons': {
    slug: 'atlas-addons',
    route: '/solutions/atlas-addons',
    eyebrow: 'ATLAS PROPRIETARY INTELLECTUAL PROPERTY',
    title: 'ATLAS Specialized Add-ons for',
    titleHighlight: 'SAP Business One',
    subtitle: 'Turnkey Enterprise Extensions Designed for Indian Statutory Governance & Industrial Operations',
    description: 'Bridge operational gaps in standard ERP software with enterprise-grade modules developed by ATLAS Technosoft. Deployed across dozens of high-growth businesses, our certified add-ons deliver turnkey capabilities for freight trading, weighbridge gate automation, vendor portals, and EXIM compliance.',
    heroImage: '/images/solutions/solutions_gate_entry_truck.jpg',
    heroImageAlt: 'Commercial Truck Passing Through Automated RFID Gate Entry and Weighbridge Terminal',
    partnerBadges: ['Certified SAP B1 Add-on Architecture', 'Survives Version Upgrades', 'Turnkey 2–4 Week Deployment'],
    metrics: [
      { value: '4', label: 'Core Proprietary Enterprise Modules', detail: 'Freight, Gate Entry, Vendor Portal & EXIM Landed Cost' },
      { value: '100%', label: 'Upgrade-Proof Architecture', detail: 'Built on official SAP Service Layer & DI-API interfaces' },
      { value: '2–4 Wks', label: 'Average Deployment Timeline', detail: 'Turnkey pre-configured templates with minimal IT overhead' }
    ],
    challenges: [
      {
        title: 'Standard ERP Lacks Native Indian Operational Realities',
        description: 'Standard global ERP packages do not natively include Indian industrial gate security protocols, weighbridge serial interfaces, or specialized EXIM statutory formats.',
        impact: 'Teams resort to unmonitored manual registers or fragile custom scripts.'
      },
      {
        title: 'Custom Scripting Breaks During Standard ERP Upgrades',
        description: 'Unstructured third-party customizations and database triggers frequently break when upgrading to newer SAP Business One versions or moving to SAP HANA.',
        impact: 'High recurring consulting maintenance bills and delayed software upgrades.'
      },
      {
        title: 'Disconnected Communication with External Suppliers',
        description: 'Purchase orders, delivery acknowledgements, quality rejection notices, and payment statuses exchanged over scattered emails create confusion and delivery delays.',
        impact: 'Procurement blind spots and delayed factory material arrivals.'
      },
      {
        title: 'Vulnerability to Weighbridge Tampering & Weight Discrepancies',
        description: 'Manual entry of vehicle weights into ERP systems creates significant vulnerability to fraud, weight manipulation, and unrecorded material diversion.',
        impact: 'Direct bottom-line financial losses on high-value bulk commodities.'
      }
    ],
    architectureOverview: {
      heading: 'Engineered for Enterprise Stability & Upgrade Resilience',
      description: 'Unlike fragile database hacks, ATLAS Proprietary Add-ons are engineered as modular micro-applications communicating strictly through official SAP Service Layer REST APIs and certified SDK interfaces, ensuring smooth compatibility across all SAP Business One versions.',
      points: [
        {
          title: 'Module 1: Multi-Modal Freight & Cargo Trading',
          description: 'Manages ocean, air, and overland logistics operations. Includes container bookings, consignment tracking, demurrage management, and automated freight billing.',
          technologies: ['SAP B1 Service Layer', 'Freight Engine', 'Multi-Currency Ledger']
        },
        {
          title: 'Module 2: AI Gate Entry & Weighbridge Automation',
          description: 'Integrates with electronic weighbridge indicators, boom barriers, and camera OCR to automate commercial vehicle check-in, weight capture, and digital gate pass creation.',
          technologies: ['Weighbridge Scale Driver', 'RFID / Barcode Kiosk', 'Automated E-Way Matching']
        },
        {
          title: 'Module 3: Vendor Collaboration Self-Service Portal',
          description: 'A secure cloud portal where suppliers view purchase orders, submit Advanced Shipping Notices (ASNs), upload tax invoices, and review payment advice statements in real time.',
          technologies: ['React Web Portal', 'Secure REST API Gateway', 'Real-Time SAP B1 Sync']
        },
        {
          title: 'Module 4: EXIM & Landed Cost Calculation Engine',
          description: 'Automates Letters of Credit (LC), Bill of Entry, and Shipping Bill tracking with automated allocation of customs duties, port clearing, and freight to inventory costs.',
          technologies: ['EXIM Duty Apportioner', 'Bank LC Register', 'Statutory Export Formatter']
        }
      ]
    },
    features: [
      {
        title: 'Direct Hardware Serial / TCP Connectivity',
        description: 'Interfaces with industrial digital weight indicators (Avery, Essae, Mettler Toledo) with encrypted data transmission preventing weight tampering.',
        icon: 'Boxes'
      },
      {
        title: 'Zero-Maintenance Cloud Vendor Portal',
        description: 'Lightweight web interface for suppliers accessible on mobile and desktop without requiring external users to consume expensive SAP client licenses.',
        icon: 'Users'
      },
      {
        title: 'Automated Exception Flagging & SMS Alerts',
        description: 'Notifies plant managers and security supervisors immediately if vehicle net weight deviates beyond configured tolerance limits.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Standard SAP Version Upgrade Compatibility',
        description: 'Guaranteed seamless migration across SAP Business One feature packs and major database upgrades (SQL to HANA).',
        icon: 'RefreshCw'
      }
    ],
    workflowSteps: [
      {
        step: 1,
        title: 'Add-on Scoping & Hardware Assessment',
        description: 'ATLAS architects evaluate your physical gate, weighbridge hardware indicators, and external system connectivity.',
        output: 'Hardware Compatibility & Workflow Specification'
      },
      {
        step: 2,
        title: 'Standard Package Installation in Test Sandbox',
        description: 'Add-on deployed into sandbox environment; hardware drivers and REST Service Layer endpoints configured.',
        output: 'Functional Sandbox Testing Environment'
      },
      {
        step: 3,
        title: 'Business Rule & Validation Configuration',
        description: 'Configures weight tolerance margins, automated e-way bill validation, supplier portal permissions, and approval hierarchies.',
        output: 'Configured Enterprise Add-on Rules'
      },
      {
        step: 4,
        title: 'Operator & Security Personnel Training',
        description: 'Hands-on training for security guards, weighbridge operators, logistics coordinators, and supplier portal administrators.',
        output: 'Certified Operators & Training Documentation'
      },
      {
        step: 5,
        title: 'Production Cutover & Dedicated SLA Support',
        description: 'Live deployment with on-site pilot monitoring, guaranteed SLA response, and ongoing performance tuning.',
        output: 'Live Automated Operation & 24/7 AMS Support'
      }
    ],
    relatedSolutions: [
      {
        title: 'Logistics & Shipping Solutions',
        description: 'Discover how ATLAS add-ons integrate into end-to-end multi-modal container and freight workflows.',
        href: '/solutions/logistics-shipping',
        tag: 'Domain Solution'
      },
      {
        title: 'Warehouse Management Solutions',
        description: 'Connect gate entry weighbridge verification with warehouse receiving and multi-bin putaway.',
        href: '/solutions/warehouse-management',
        tag: 'Domain Solution'
      },
      {
        title: 'Support & Maintenance (AMS)',
        description: 'Dedicated technical support ensuring ongoing hardware driver stability and SAP version upgrades.',
        href: '/services/support-maintenance',
        tag: 'Support Service'
      }
    ],
    caseStudy: {
      category: 'Industrial Manufacturing',
      title: 'Automated Gate Entry & Weighbridge Deployment for Manufacturing Hub',
      quote: 'The ATLAS Gate Entry add-on eliminated vehicle congestion at our factory gates. Vehicle turnaround dropped from 45 minutes to under 12 minutes, and manual weight recording errors were completely eliminated.',
      designation: 'Head of Plant Operations, Industrial Materials Group',
      href: '/case-studies/warehouse-management'
    }
  }
};

