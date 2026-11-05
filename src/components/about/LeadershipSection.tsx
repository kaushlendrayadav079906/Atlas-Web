import React from 'react';
import {
  Users,
  ShieldCheck,
  Award,
  CheckCircle2,
  Cpu,
  Layers,
  Database,
  Headphones,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';

interface PracticeGroup {
  id: string;
  title: string;
  roleType: string;
  badge: string;
  description: string;
  metrics: string;
  icon: React.FC<{ className?: string }>;
  color: 'blue' | 'sky' | 'emerald' | 'purple';
  competencies: string[];
}

const PRACTICE_GROUPS: PracticeGroup[] = [
  {
    id: 'executive-leadership',
    title: 'Executive ERP Leadership & Advisory',
    roleType: 'Digital Transformation & SME Strategy',
    badge: '20+ Years Leadership',
    description:
      'Guiding executive leadership teams through digital transformation roadmaps, corporate governance, statutory compliance, and measurable ROI on SAP investments.',
    metrics: '80+ Enterprise Deployments',
    icon: ShieldCheck,
    color: 'blue',
    competencies: [
      'Digital Transformation Roadmaps',
      'Statutory & GST Compliance Architecture',
      'ROI & Total Cost of Ownership Audits',
      'Multi-Company Template Strategies'
    ]
  },
  {
    id: 'sap-architecture',
    title: 'SAP Functional & Technical Architecture',
    roleType: 'HANA In-Memory & Cloud Deployments',
    badge: 'Certified SAP B1 Architects',
    description:
      'Certified SAP Business One and SAP HANA specialists engineering core finance, supply chain, purchasing, sales CRM, and customized business logic.',
    metrics: 'HANA In-Memory Certified',
    icon: Database,
    color: 'sky',
    competencies: [
      'Cloud & On-Premise Deployments',
      'SQL to SAP HANA Database Migrations',
      'Multi-Currency Financial Consolidation',
      'Service Layer REST API Integrations'
    ]
  },
  {
    id: 'manufacturing-wms',
    title: 'Manufacturing & Warehouse Operations Practice',
    roleType: 'Beas Manufacturing & Produmex WMS',
    badge: 'Boyum IT Silver Certified',
    description:
      'Specialized operational engineers configuring advanced planning & scheduling (APS), shop-floor data capture, multi-level BOMs, and high-performance multi-bin WMS.',
    metrics: '320+ Boyum Modules Deployed',
    icon: Layers,
    color: 'purple',
    competencies: [
      'Beas Manufacturing APS & MRP II',
      'Produmex WMS & Handheld RF Scanners',
      'Batch Traceability & Quality Control',
      'B1 Usability Package (B1UP) Customization'
    ]
  },
  {
    id: 'hyperautomation-rpa',
    title: 'Hyperautomation & AI Engineering Practice',
    roleType: 'Robotic Process Automation & AI',
    badge: 'UiPath Silver Certified',
    description:
      'Accredited UiPath automation architects building touchless software robots and AI Document Understanding models directly integrated with SAP Business One.',
    metrics: '1.2M+ Annual Automated Tasks',
    icon: Cpu,
    color: 'emerald',
    competencies: [
      'Touchless AP Invoice & GRPO Bots',
      'AI Document Understanding (OCR)',
      'Automated Bank & Ledger Reconciliation',
      'Attended & Unattended Orchestration'
    ]
  }
];

export const LeadershipSection: React.FC = () => {
  return (
    <section 
      id="team" 
      className="py-16 sm:py-20 lg:py-24 bg-slate-50/50 border-b border-slate-100 relative overflow-hidden"
    >
      {/* Anchor for scroll navigation */}
      <span id="leadership" className="absolute -top-24 opacity-0 pointer-events-none" />

      {/* Subtle background ambient glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-blue-500/5 via-sky-400/5 to-transparent rounded-full blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#0052CC] border border-blue-200/80 mb-3.5 select-none">
            <Users className="w-3.5 h-3.5 text-[#0052CC]" />
            <span>LEADERSHIP & EXPERT TEAM</span>
          </div>

          <h2 className="font-serif text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#142B59] tracking-tight leading-[1.15]">
            Certified ERP & Automation Experts,{' '}
            <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
              Not Salespeople
            </span>
          </h2>

          <p className="mt-4 text-[15px] sm:text-[17px] text-[#45546B] leading-relaxed">
            Our delivery strength rests on a unified force of <strong>32 SAP HANA, Boyum IT, and UiPath RPA certified consultants</strong> based across our Mumbai delivery centers, with global project execution track records.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <Award className="w-4 h-4 text-[#0052CC]" />
              <span>32 Certified Consultants</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" />
              <span>99.9% Production Uptime</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <MapPin className="w-4 h-4 text-[#0878f9]" />
              <span>Mumbai Delivery Centers (Borivali & Marine Lines)</span>
            </div>
          </div>
        </div>

        {/* Practice Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PRACTICE_GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.id}
                className="group p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0052CC] border border-blue-200/80 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#0052CC] group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                        {group.badge}
                      </span>
                      <div className="text-[11.5px] font-semibold text-[#0052CC] mt-1">
                        {group.metrics}
                      </div>
                    </div>
                  </div>

                  {/* Title & Role */}
                  <h3 className="font-serif text-[20px] sm:text-[22px] font-bold text-[#142B59] leading-snug mb-1">
                    {group.title}
                  </h3>
                  <div className="text-xs sm:text-[13px] font-semibold text-slate-500 mb-3">
                    {group.roleType}
                  </div>

                  {/* Description */}
                  <p className="text-[14px] text-slate-600 leading-relaxed mb-5">
                    {group.description}
                  </p>

                  {/* Competencies List */}
                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <div className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">
                      Core Functional Competencies
                    </div>
                    {group.competencies.map((comp, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0052CC] shrink-0" />
                        <span>{comp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-6 mt-4 border-t border-slate-100/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    SLA-backed consulting delivery
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0052CC] hover:text-[#003E99] transition-colors"
                  >
                    <span>Consult Practice Lead</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Dedicated AMS Support Banner */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-7 rounded-2xl bg-[#eaf4ff] border border-blue-200/90 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-blue-200 text-[#0052CC] flex items-center justify-center shrink-0 shadow-xs">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#142B59]">
                Dedicated Application Management (AMS) Account Managers
              </h4>
              <p className="text-xs sm:text-sm text-[#45546B] mt-0.5">
                Every ATLAS client receives a named certified SAP consultant and dedicated AMS account manager with guaranteed response SLAs.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0052CC] hover:bg-[#003E99] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-colors whitespace-nowrap"
          >
            <span>Speak with our Consultants</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
