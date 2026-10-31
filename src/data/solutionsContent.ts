export interface SolutionCardItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  badgeType: 'sap' | 'boyum' | 'uipath' | 'atlas' | 'ecosystem';
  color: 'blue' | 'coral' | 'purple' | 'emerald' | 'cyan';
  linkHref: string;
}

export interface KeyBenefitItem {
  id: string;
  title: string;
  iconName: 'Database' | 'LineChart' | 'Zap' | 'TrendingUp';
}

export interface BoyumModuleItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  color: 'blue' | 'emerald' | 'purple';
  linkHref: string;
}

export interface AutomationAreaItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: 'Cog' | 'TrendingUp' | 'Clock' | 'Cpu';
  color: 'purple' | 'sky' | 'indigo' | 'rose';
}

export interface ProprietaryAddonItem {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  color: 'blue' | 'cyan' | 'indigo' | 'purple' | 'rose';
}

export const SOLUTIONS_HERO_DATA = {
  eyebrow: "OUR SOLUTIONS —",
  titleStart: "Powering Business Growth with",
  titleHighlight: "Intelligent Enterprise Solutions",
  description: "Discover business solutions designed to streamline operations, improve visibility and drive growth with SAP Business One, Boyum IT solutions, UiPath RPA and ATLAS proprietary add-ons.",
  primaryCtaText: "Explore Our Solutions",
  secondaryCtaText: "Talk to Our Experts",
  imageSrc: "/images/solutions/solutions_hero_monitor.jpg",
  fallbackImageSrc: "/images/dashboards/dashboard-preview.jpg"
};

export const SOLUTIONS_OVERVIEW_CARDS: SolutionCardItem[] = [
  {
    id: "sap-b1",
    title: "SAP Business One",
    description: "A complete ERP solution for managing your entire business on a single integrated platform.",
    imageSrc: "/images/dashboards/dashboard-preview.jpg",
    badgeType: "sap",
    color: "blue",
    linkHref: "#sap-b1-section"
  },
  {
    id: "boyum",
    title: "Boyum IT Solutions",
    description: "Powerful add-ons to extend SAP Business One for manufacturing, warehouse and usability.",
    imageSrc: "/images/crystal_hd/ind_warehouse.jpg",
    badgeType: "boyum",
    color: "purple",
    linkHref: "/solutions/boyum-it"
  },
  {
    id: "uipath",
    title: "UiPath RPA & AI Automation",
    description: "Automate repetitive processes and drive operational efficiency with RPA and AI.",
    imageSrc: "/images/solutions/solutions_uipath_robot.jpg",
    badgeType: "uipath",
    color: "purple",
    linkHref: "#uipath-section"
  },
  {
    id: "atlas-addons",
    title: "Proprietary Add-ons",
    description: "Industry-specific solutions for freight, trading, gate entry, WMS, shipping and more.",
    imageSrc: "/images/crystal_hd/ind_shipping.jpg",
    badgeType: "atlas",
    color: "emerald",
    linkHref: "#atlas-addons-section"
  },
  {
    id: "integrated-solutions",
    title: "Integrated Business Solutions",
    description: "A connected ecosystem that works together for end-to-end business excellence.",
    imageSrc: "/images/solutions/solutions_integrated_ecosystem.jpg",
    badgeType: "ecosystem",
    color: "cyan",
    linkHref: "#contact-cta"
  }
];

export const SAP_B1_DEEP_DIVE = {
  eyebrow: "ENTERPRISE ERP SOLUTION",
  heading: "One Platform for Smarter Business Management",
  description: "SAP Business One is a powerful and flexible ERP solution designed for small and mid-sized businesses. It helps you manage core business processes, gain real-time visibility, and make smarter decisions.",
  checklist: [
    "End-to-end implementation and support",
    "Process optimization and customization",
    "Real-time business insights and reporting"
  ],
  ctaText: "Book a Consultation",
  imageSrc: "/images/dashboards/executive-command-center.jpg",
  keyBenefits: [
    {
      id: "b1",
      title: "Integrated business management",
      iconName: "Database" as const
    },
    {
      id: "b2",
      title: "Real-time visibility and reporting",
      iconName: "LineChart" as const
    },
    {
      id: "b3",
      title: "Improved operational efficiency",
      iconName: "Zap" as const
    },
    {
      id: "b4",
      title: "Scalable as your business grows",
      iconName: "TrendingUp" as const
    }
  ]
};

export const BOYUM_IT_DEEP_DIVE = {
  eyebrow: "EXTEND SAP BUSINESS ONE",
  title: "Boyum IT Solutions",
  subtitle: "Powerful Add-ons for Enhanced Capabilities",
  description: "Boyum IT solutions extend the functionality of SAP Business One, helping businesses in manufacturing, warehousing, and daily operations achieve greater efficiency and control.",
  ctaText: "Explore Boyum Solutions",
  modules: [
    {
      id: "beas",
      title: "Beas Manufacturing",
      subtitle: "Complete manufacturing solution for SAP Business One.",
      description: "Advanced planning & scheduling (APS), MRP, quality control, and real-time shop floor execution integrated into SAP B1.",
      imageSrc: "/images/solutions/solutions_beas_manufacturing.jpg",
      color: "purple" as const,
      linkHref: "#contact-cta"
    },
    {
      id: "produmex",
      title: "Produmex WMS",
      subtitle: "Advanced warehouse management for optimized inventory control.",
      description: "Barcode scanning, mobile RF terminals, batch/serial traceability, multi-zone picking, and 3PL billing automation.",
      imageSrc: "/images/solutions/solutions_produmex_wms.jpg",
      color: "emerald" as const,
      linkHref: "#contact-cta"
    },
    {
      id: "b1up",
      title: "B1 Usability Package",
      subtitle: "Enhanced usability and productivity for SAP Business One.",
      description: "Custom screen design, 300+ approval workflows, mandatory field validations, and automated recurring tasks.",
      imageSrc: "/images/solutions/solutions_b1up_interface.jpg",
      color: "purple" as const,
      linkHref: "#contact-cta"
    }
  ]
};

export const UIPATH_RPA_DEEP_DIVE = {
  eyebrow: "INTELLIGENT AUTOMATION",
  title: "UiPath RPA & AI Automation",
  subtitle: "Automate Workflows. Improve Business Efficiency.",
  description: "UiPath RPA and AI automation help businesses reduce manual work, streamline processes, and improve productivity across departments.",
  ctaText: "Book a Consultation",
  imageSrc: "/images/solutions/solutions_uipath_robot.jpg",
  areas: [
    {
      id: "a1",
      title: "Process Automation",
      subtitle: "Automate repetitive tasks",
      iconName: "Cog" as const,
      color: "purple" as const
    },
    {
      id: "a2",
      title: "Reduced Manual Work",
      subtitle: "Improve accuracy",
      iconName: "TrendingUp" as const,
      color: "sky" as const
    },
    {
      id: "a3",
      title: "Workflow Efficiency",
      subtitle: "Faster turnaround time",
      iconName: "Clock" as const,
      color: "indigo" as const
    },
    {
      id: "a4",
      title: "AI-Driven Automation",
      subtitle: "Intelligent document processing",
      iconName: "Cpu" as const,
      color: "rose" as const
    }
  ]
};

export const ATLAS_ADDONS_DEEP_DIVE = {
  eyebrow: "ATLAS PROPRIETARY ADD-ONS",
  title: "Purpose-Built Solutions for Specialized Operations",
  description: "Our proprietary add-ons are designed to address industry-specific requirements and unique business operations, providing enhanced functionality on top of SAP Business One.",
  ctaText: "Explore Our Add-ons",
  items: [
    {
      id: "freight-trading",
      title: "Freight & Trading",
      subtitle: "Streamline freight and trading operations.",
      imageSrc: "/images/crystal_hd/ind_shipping.jpg",
      color: "blue" as const
    },
    {
      id: "gate-entry",
      title: "Gate Entry & Weighment",
      subtitle: "Automate gate entry and weighment processes.",
      imageSrc: "/images/solutions/solutions_gate_entry_truck.jpg",
      color: "cyan" as const
    },
    {
      id: "wms-vendor",
      title: "WMS & Vendor Portal",
      subtitle: "Efficient warehouse management and supplier collab.",
      imageSrc: "/images/solutions/solutions_wms_operator.jpg",
      color: "indigo" as const
    },
    {
      id: "shipping-auto",
      title: "Shipping Automation",
      subtitle: "End-to-end shipping process automation.",
      imageSrc: "/images/crystal_hd/ind_shipping.jpg",
      color: "purple" as const
    },
    {
      id: "rpa-sales",
      title: "RPA Vendor & Sales",
      subtitle: "Automate vendor and sales processes with RPA.",
      imageSrc: "/images/solutions/solutions_sales_handshake.jpg",
      color: "rose" as const
    }
  ]
};

export const SOLUTIONS_INDUSTRIES_DATA = [
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Production, inventory and operations management.",
    imageSrc: "/images/crystal_hd/ind_manufacturing.jpg",
    color: "blue" as const
  },
  {
    id: "warehouse",
    title: "Warehouse & Logistics",
    description: "Inventory control, logistics and supply chain efficiency.",
    imageSrc: "/images/crystal_hd/ind_warehouse.jpg",
    color: "emerald" as const
  },
  {
    id: "finance",
    title: "Finance & Administration",
    description: "Financial control and administrative efficiency.",
    imageSrc: "/images/crystal_hd/ind_finance.jpg",
    color: "purple" as const
  },
  {
    id: "trading",
    title: "Trading & Shipping",
    description: "Trading operations and end-to-end shipping visibility.",
    imageSrc: "/images/crystal_hd/ind_shipping.jpg",
    color: "purple" as const
  }
];

export const SOLUTIONS_CONTACT_CTA_DATA = {
  eyebrow: "LET'S FIND THE RIGHT SOLUTION",
  titleStart: "Ready to Transform",
  titleHighlight: "Your Business?",
  description: "Talk to our team about your business requirements and discover the right technology approach for your organization.",
  buttonText: "Book a Consultation"
};
