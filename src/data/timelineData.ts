export interface MilestoneItem {
  id: string;
  year: string;
  displayYear: string;
  title: string;
  subtitle?: string;
  description: string;
  side: 'right' | 'left'; // Right → Left → Right → Left → Right
  iconName: 'Building2' | 'Award' | 'Layers' | 'Trophy' | 'Sparkles';
  tag: string;
  keyStats?: string[];
  isVerifiedFact: boolean;
  sourceNote: string;
}

export const COMPANY_JOURNEY_DATA = {
  eyebrow: "OUR JOURNEY",
  headingMain: "Milestones That",
  headingAccent: "Define Us",
  description: "From our foundation in enterprise ERP to becoming a hyperautomation leader in SAP Business One, Boyum IT, and UiPath RPA. Documented from company records and 2025 dossier.",
  milestones: [
    {
      id: "foundation",
      year: "2005",
      displayYear: "c. 2005*",
      title: "Foundations in Enterprise ERP Consulting",
      subtitle: "Nearly 20 Years of Deep SAP Expertise",
      description: "ATLAS Technosoft began its journey building deep consulting expertise in SAP architecture, data integration, and business process engineering, laying the foundation for SME digital transformation.",
      side: "right" as const,
      iconName: "Building2" as const,
      tag: "Foundation Era",
      keyStats: ["Deep SAP SME Focus", "Mumbai Consulting HQ"],
      isVerifiedFact: false,
      sourceNote: "Founding timeline referenced in ATPL dossier ('nearly 20 years of deep SAP expertise'). Formal incorporation date subject to company confirmation."
    },
    {
      id: "sap-partnership",
      year: "2015",
      displayYear: "2015*",
      title: "Authorized SAP Channel Partnership",
      subtitle: "Gold Standard for Mid-Market Enterprises",
      description: "Formally recognized as an Authorized SAP Channel Partner, delivering end-to-end SAP Business One implementations, HANA migrations, and global template rollouts across India and international markets.",
      side: "left" as const,
      iconName: "Award" as const,
      tag: "SAP Ecosystem",
      keyStats: ["Cloud & On-Premise", "SAP HANA Upgrades"],
      isVerifiedFact: false,
      sourceNote: "Channel partnership active across 80+ clients. Exact year of formal authorization subject to company confirmation."
    },
    {
      id: "expansion-partnerships",
      year: "2018-2020",
      displayYear: "2018–2020*",
      title: "Boyum IT Silver & UiPath Hyperautomation",
      subtitle: "Pioneering Manufacturing & WMS Excellence",
      description: "Expanded our technological ecosystem by becoming certified Boyum IT Silver and UiPath Silver Partners, deploying Beas Manufacturing, Produmex WMS, B1UP, and enterprise Robotic Process Automation.",
      side: "right" as const,
      iconName: "Layers" as const,
      tag: "Hyperautomation",
      keyStats: ["Beas Manufacturing", "Produmex WMS", "UiPath RPA"],
      isVerifiedFact: false,
      sourceNote: "Partnership tiers documented in ATPL dossier. Exact certification grant years subject to company confirmation."
    },
    {
      id: "achievements-era",
      year: "2020-2025",
      displayYear: "2020–2025",
      title: "Scale, 1.2M+ Transactions & Rapid Go-Lives",
      subtitle: "Documented Achievements (2020–2025)",
      description: "Accelerated to 80+ live SAP B1 clients (expanding toward 180+), 320+ Boyum modules, 1.2 million transactions automated annually, and a record 58-day go-live for SAP B1 + Beas + UiPath in pharma.",
      side: "left" as const,
      iconName: "Trophy" as const,
      tag: "Scale & Impact",
      keyStats: ["98.7% Retention", "1.2M+ Automated Yearly", "58-Day Go-Live"],
      isVerifiedFact: true,
      sourceNote: "Directly verified from ATPL Web Site Content PDF (Page 5 Achievements 2020–2025)."
    },
    {
      id: "future-vision",
      year: "2026-2030",
      displayYear: "2026–2030",
      title: "The Intelligent SME Factory & AI Co-Pilot",
      subtitle: "Vision 2030 Strategic Roadmap",
      description: "Scaling to power 1,000 SMEs with zero-touch SAP ecosystems. Launching the proprietary ATLAS AI Co-Pilot for SAP B1 in Q2 2026, establishing global hyperautomation centers, and training 10,000 professionals.",
      side: "right" as const,
      iconName: "Sparkles" as const,
      tag: "Future Roadmap",
      keyStats: ["Target: 1,000 SMEs", "AI Co-Pilot (Q2 2026)", "ATLAS Academy"],
      isVerifiedFact: true,
      sourceNote: "Directly verified from ATPL Web Site Content PDF (Page 6 Future Vision 2030)."
    }
  ]
};

