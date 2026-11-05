import { IndustryInsightItem } from '../types/resources';

export const INDUSTRY_INSIGHTS: IndustryInsightItem[] = [
  {
    id: 'manufacturing-erp-insight',
    slug: 'manufacturing-erp-operational-excellence',
    title: 'Transforming Discrete & Process Manufacturing with SAP & Beas',
    subtitle: 'Overcoming Shop-Floor Bottlenecks, Material Waste, and Disconnected Machine Schedules',
    sector: 'Manufacturing',
    icon: 'Factory',
    readTime: '7 min read',
    heroImage: '/images/solutions/solutions_beas_manufacturing.jpg',
    challengeSummary: 'Mid-sized manufacturers frequently struggle with production bottlenecks caused by manual spreadsheets, imprecise bill-of-materials (BOMs), and lack of real-time machine capacity visibility. When design changes occur or raw material shipments are delayed, planners are forced to manually recalculate work orders, leading to machine idle time, missed customer delivery commitments, and excessive scrap rates.',
    solutionArchitecture: 'By integrating SAP Business One with Boyum Beas Manufacturing, ATLAS implements a closed-loop Manufacturing Resource Planning (MRP II) and Advanced Planning & Scheduling (APS) environment. Digital terminals on the shop floor allow operators to log run times, material consumption, and scrap reasons via barcode scans in real time.',
    keyBenefits: [
      'Multi-level bill of materials (BOM) management with automatic version control and scrap factor calculations.',
      'Finite capacity scheduling that balances machine workloads, tooling availability, and labor shifts.',
      'Real-time work-in-progress (WIP) tracking preventing unaccounted inventory leakages on factory floors.',
      'Full batch traceability and certificate of analysis (CoA) documentation for quality-sensitive compliance.'
    ],
    operationalMetrics: [
      { value: '27%', label: 'Average Production Efficiency Gain' },
      { value: '42%', label: 'Reduction in Scrap & Material Waste' },
      { value: '100%', label: 'Traceability from Raw Material to Dispatch' }
    ],
    relatedServices: [
      {
        name: 'Boyum IT Manufacturing Practice',
        href: '/services/boyum-it',
        description: 'Certified Beas Manufacturing implementation, APS configuration, and operator terminal setup.'
      },
      {
        name: 'Smart Manufacturing Sector Solutions',
        href: '/industries/manufacturing',
        description: 'Tailored ERP architectures for automotive, industrial machinery, and chemical producers.'
      },
      {
        name: 'Core SAP Business One Services',
        href: '/services/sap-business-one',
        description: 'Enterprise ERP backbone managing financials, procurement, and supply chain.'
      }
    ],
    caseStudyRef: {
      title: 'Precision Component Manufacturer 40% Throughput Boost',
      href: '/case-studies/warehouse-management'
    }
  },
  {
    id: 'warehouse-management-insight',
    slug: 'warehouse-management-inventory-accuracy',
    title: 'Achieving 99%+ Inventory Accuracy with Handheld WMS Terminals',
    subtitle: 'Eliminating Misplacements, Picking Errors, and Manual Stock Counts in High-Throughput Hubs',
    sector: 'Warehouse & Logistics',
    icon: 'Truck',
    readTime: '6 min read',
    heroImage: '/images/solutions/solutions_produmex_wms.jpg',
    challengeSummary: 'Growing distribution and warehousing operations experience severe fulfillment bottlenecks when relying on paper pick-lists and manual challans. Warehouse workers waste up to 60% of their shift traveling haphazardly across aisles, stockouts occur despite adequate on-hand balances due to inventory misplacement, and wrong-item dispatches drive costly return logistics.',
    solutionArchitecture: 'ATLAS deploys Boyum Produmex WMS on top of SAP Business One, transforming warehouses into barcode-directed operations. Android handheld RF terminals guide operators through optimized picking paths (wave, zone, and batch picking), validate every bin and item barcode, and automatically generate e-way bills upon packing completion.',
    keyBenefits: [
      'System-directed putaway and picking maximizing space utilization and minimizing worker walking distance.',
      'Real-time GS1-128 and 2D barcode scanning preventing incorrect item or expired batch dispatches.',
      'Continuous cycle counting during active business hours without requiring full-warehouse operational shutdowns.',
      'Direct integration with multi-carrier shipping aggregators and gate entry validation kiosks.'
    ],
    operationalMetrics: [
      { value: '99.4%', label: 'Inventory Record Accuracy' },
      { value: '40%+', label: 'Increase in Daily Order Picking Velocity' },
      { value: '68%', label: 'Drop in Dispatch & Packing Errors' }
    ],
    relatedServices: [
      {
        name: 'Produmex WMS Implementation',
        href: '/services/boyum-it',
        description: 'Complete warehouse layout digitization, handheld terminal configuration, and staff training.'
      },
      {
        name: 'Warehouse & Logistics Solutions',
        href: '/industries/warehouse-logistics',
        description: 'End-to-end supply chain architectures for 3PL providers, FMCG, and wholesale distributors.'
      },
      {
        name: 'Gate Entry & Weighbridge Add-ons',
        href: '/solutions',
        description: 'ATLAS proprietary modules securing commercial vehicle entry and cargo weight validation.'
      }
    ],
    caseStudyRef: {
      title: 'Multi-Location Industrial Distribution Center WMS Transformation',
      href: '/case-studies/warehouse-management'
    }
  },
  {
    id: 'finance-automation-insight',
    slug: 'finance-automation-closing-acceleration',
    title: 'Accelerating Month-End Closing: From 10 Days to Under 48 Hours',
    subtitle: 'Streamlining Multi-Branch Ledgers, Bank Reconciliations, and Statutory Tax Governance',
    sector: 'Finance & Compliance',
    icon: 'Database',
    readTime: '8 min read',
    heroImage: '/images/crystal_hd/ind_finance.jpg',
    challengeSummary: 'Financial controllers in mid-sized commercial groups frequently spend the first two weeks of every month manually reconciling bank accounts, chasing inter-branch journal entries, and cross-checking vendor statements. Manual invoice entry into government tax portals introduces transcription errors, risking GST input tax credit (ITC) mismatches and statutory compliance penalties.',
    solutionArchitecture: 'Combining SAP Business One financial architecture with UiPath intelligent software robots, ATLAS automates the complete financial record-to-report lifecycle. Robotic bots extract data from incoming supplier PDF invoices, match line items against SAP purchase orders (3-way matching), post accounts payable journals, and upload tax data directly to the GST portal.',
    keyBenefits: [
      'Touchless Accounts Payable (AP) invoice processing with 99%+ optical character recognition (OCR) accuracy.',
      'Automated bank statement reconciliation processing thousands of transactions in minutes via MT940 / CSV feeds.',
      'Automated GSTR-1, GSTR-2B ITC matching, and 3B validation flagging unfiled supplier invoices before payment release.',
      'Live executive dashboards providing real-time cash flow runway, aging debtor analysis, and EBITDA tracking.'
    ],
    operationalMetrics: [
      { value: '<48 Hrs', label: 'Month-End Closing Cycle (Down from 10 Days)' },
      { value: '85%', label: 'Reduction in Manual Accounting Data Entry' },
      { value: 'Zero', label: 'GST Input Tax Credit (ITC) Loss' }
    ],
    relatedServices: [
      {
        name: 'UiPath RPA & Hyperautomation',
        href: '/services/uipath-rpa',
        description: 'Software robots automating repetitive accounting tasks, invoice entry, and portal scraping.'
      },
      {
        name: 'Finance & Administration Practice',
        href: '/industries/finance-administration',
        description: 'Corporate financial consolidation, multi-currency accounting, and executive reporting.'
      },
      {
        name: 'SAP HANA In-Memory Reporting',
        href: '/services/sap-business-one',
        description: 'Instant sub-second financial statements, P&L by cost center, and automated dunning.'
      }
    ],
    caseStudyRef: {
      title: 'Automated Financial Operations for Commercial Group',
      href: '/case-studies/business-process-automation'
    }
  },
  {
    id: 'trading-shipping-insight',
    slug: 'trading-shipping-landed-cost-automation',
    title: 'Precision Landed Cost & EXIM Automation for Global Traders',
    subtitle: 'Eliminating Margin Leakage from Customs Duties, Port Demurrage, and Freight Volatility',
    sector: 'Trading & Shipping',
    icon: 'Boxes',
    readTime: '7 min read',
    heroImage: '/images/crystal_hd/ind_shipping.jpg',
    challengeSummary: 'Import-export and commodity trading businesses operate on slim operating margins where unallocated freight, customs duties, port handling, and demurrage charges can convert profitable shipments into net losses. Calculating the true landed cost across hundreds of items using manual spreadsheets leads to delayed billing, inaccurate inventory valuation, and flawed sales pricing.',
    solutionArchitecture: 'ATLAS implements customized EXIM and Landed Cost allocation engines within SAP Business One. As international shipments progress from Bill of Lading (B/L) to customs clearance, all duty components, currency fluctuations, and inland logistics charges are apportioned to item valuation based on weight, volume, or customs value, updating profit margins instantly.',
    keyBenefits: [
      'Automated Landed Cost allocation across multiple purchase orders, customs tariffs, and freight forwarder invoices.',
      'End-to-end EXIM documentation management: Letters of Credit (LC), Bills of Entry, and shipping bills.',
      'Multi-currency purchase contracts with real-time foreign exchange gain/loss accounting.',
      'Automated Gate Entry and weighbridge integration ensuring dispatched weights reconcile with customs declarations.'
    ],
    operationalMetrics: [
      { value: '100%', label: 'Landed Cost Visibility on Every SKU' },
      { value: '3x', label: 'Faster Shipping Document Processing' },
      { value: 'Zero', label: 'Unallocated Freight or Demurrage Leakage' }
    ],
    relatedServices: [
      {
        name: 'ATLAS EXIM & Freight Add-ons',
        href: '/solutions',
        description: 'Proprietary enterprise add-ons tailored for Indian import-export statutory requirements.'
      },
      {
        name: 'SAP Business One Core Implementation',
        href: '/services/sap-business-one',
        description: 'Multi-branch, multi-warehouse, and multi-currency commercial trading backbones.'
      },
      {
        name: 'UiPath RPA Document Extraction',
        href: '/services/uipath-rpa',
        description: 'Intelligent extraction of shipping invoices, airway bills, and customs manifests.'
      }
    ],
    caseStudyRef: {
      title: 'Global Export-Import Trading House ERP Modernization',
      href: '/case-studies/trading-distribution'
    }
  }
];

