import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Factory,
  Truck,
  Database,
  Boxes,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Clock,
  Sparkles,
  ShieldCheck,
  Building2,
  MessageCircle,
  BarChart3
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ConsultationModal } from '../components/ui/ConsultationModal';
import { CtaContactCards } from '../components/ui/CtaContactCards';
import { INDUSTRY_INSIGHTS } from '../data/industryInsightsData';
import { IndustryInsightItem } from '../types/resources';

const sectorIcons: Record<string, React.FC<{ className?: string }>> = {
  Manufacturing: Factory,
  'Warehouse & Logistics': Truck,
  'Finance & Compliance': Database,
  'Trading & Shipping': Boxes
};

export const IndustryInsightsPage: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState('Industry Assessment Consultation');

  useEffect(() => {
    document.title = 'Industry Insights & Sector Blueprints | ATLAS Technosoft';
    window.scrollTo(0, 0);
  }, []);

  const sectors = ['All', 'Manufacturing', 'Warehouse & Logistics', 'Finance & Compliance', 'Trading & Shipping'];

  const filteredInsights = selectedSector === 'All'
    ? INDUSTRY_INSIGHTS
    : INDUSTRY_INSIGHTS.filter(item => item.sector === selectedSector);

  const openConsultation = (insightTitle: string) => {
    setModalService(`Industry Assessment: ${insightTitle}`);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white text-slate-800 selection:bg-blue-600 selection:text-white">
      
      {/* ===================================================================== */}
      {/* 1. HERO HEADER                                                        */}
      {/* ===================================================================== */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 border-b border-white/10 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#E0A33B] text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>SECTOR BENCHMARKS & BLUEPRINTS</span>
            </div>

            <h1 className="atlas-h1-size font-serif font-extrabold text-[#0A1B4F]">
              Industry-Focused <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">ERP & Automation Insights</span>
            </h1>

            <p className="text-[16px] sm:text-[19px] text-[#4A5876] leading-relaxed font-normal">
              Practical domain analysis addressing manufacturing bottlenecks, multi-bin inventory drift, financial closing delays, and global trading logistics.
            </p>
          </div>

          {/* Sector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 sm:mt-10">
            {sectors.map(sec => {
              const isSelected = selectedSector === sec;
              return (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setSelectedSector(sec)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1F4FE0] text-white shadow-sm shadow-blue-500/20'
                      : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-[#E0A33B] border border-slate-200'
                  }`}
                >
                  {sec}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. INDUSTRY INSIGHTS ARTICLES LISTING                                 */}
      {/* ===================================================================== */}
      <section className="py-12 sm:py-16 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {filteredInsights.map((insight, idx) => {
            const SectorIcon = sectorIcons[insight.sector] || TrendingUp;

            return (
              <article
                key={insight.id}
                id={insight.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Left Column: Cover Image & Key Operational Metrics */}
                  <div className="lg:col-span-5 bg-atlas-navy relative flex flex-col justify-between overflow-hidden min-h-[320px] lg:min-h-full">
                    <img
                      src={insight.heroImage}
                      alt={insight.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-luminosity scale-105 transition-transform duration-700 hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

                    {/* Top Sector Badge */}
                    <div className="relative p-6 sm:p-8 flex items-center justify-between z-10">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                        <SectorIcon className="w-3.5 h-3.5" />
                        <span>{insight.sector}</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 text-xs text-white/80 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{insight.readTime}</span>
                      </span>
                    </div>

                    {/* Bottom Operational Metrics Grid */}
                    <div className="relative p-6 sm:p-8 z-10 space-y-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                        VERIFIED OPERATIONAL BENCHMARKS
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {insight.operationalMetrics.map((met, mIdx) => (
                          <div key={mIdx} className="bg-white atlas-light-surface rounded-xl p-3 text-center">
                            <div className="text-lg sm:text-xl font-black text-atlas-navy">
                              {met.value}
                            </div>
                            <div className="text-[10px] text-atlas-body font-medium leading-tight mt-0.5">
                              {met.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Deep-Dive Analysis & Solution Architecture */}
                  <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#E0A33B] block mb-1">
                          EXECUTIVE PROBLEM & SOLUTION ARCHITECTURE
                        </span>
                        <h2 className="text-[28px] sm:text-[34px] leading-[1.15] font-extrabold text-[#0A1B4F]">
                          {insight.title}
                        </h2>
                        <p className="text-sm sm:text-base font-semibold text-[#E0A33B] mt-1">
                          {insight.subtitle}
                        </p>
                      </div>

                      {/* The Operational Challenge */}
                      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 space-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
                          The Operational Bottleneck
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {insight.challengeSummary}
                        </p>
                      </div>

                      {/* The Solution Architecture */}
                      <div className="space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#0A1B4F]">
                          ATLAS Architectural Approach
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {insight.solutionArchitecture}
                        </p>
                      </div>

                      {/* Key Value Drivers */}
                      <div className="space-y-2 pt-1">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#0A1B4F]">
                          Measurable Business Impact
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {insight.keyBenefits.map((ben, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-snug">{ben}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Linked ATLAS Services */}
                      <div className="pt-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Connected ATLAS Services & Domain Solutions:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {insight.relatedServices.map((srv, sIdx) => (
                            <Link
                              key={sIdx}
                              to={srv.href}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#E0A33B] text-xs font-semibold border border-slate-200/80 transition-colors group"
                            >
                              <span>{srv.name}</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      {insight.caseStudyRef && (
                        <Link
                          to={insight.caseStudyRef.href}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#E0A33B] hover:underline"
                        >
                          <BarChart3 className="w-4 h-4" />
                          <span>View Real-World Case Study</span>
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={() => openConsultation(insight.title)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-atlas-gold hover:bg-[#D4972F] !text-atlas-navy font-bold shadow-[0_4px_14px_rgba(224,163,59,0.35)] text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer ml-auto"
                      >
                        <span>Request Industry Assessment</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              </article>
            );
          })}

        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. BOTTOM CTA & CONTACT CARDS                                         */}
      {/* ===================================================================== */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#0A1B4F] to-[#0A1B4F] text-white">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300 block">
                SECTOR ARCHITECTURE ASSESSMENT
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Evaluate Your Industry Process Maturity
              </h3>
              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
                Connect with our dedicated industry practice leads for an objective gap analysis of your current production scheduling, warehouse barcoding, or financial workflows.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => openConsultation('Sector Process Maturity Audit')}
                  variant="gold"
                  size="md"
                  className="bg-[#1F4FE0] hover:bg-[#1F4FE0] text-white font-semibold px-6 py-3 rounded-xl shadow-md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Book Strategic Consultation
                </Button>
                <a
                  href="https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20discuss%20industry%20solutions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Industry Desk</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <CtaContactCards />
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* REUSABLE ENTERPRISE CONSULTATION MODAL                                */}
      {/* ===================================================================== */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={modalService}
        title="Schedule Industry Process Assessment"
        subtitle="Speak directly with certified SAP Business One, Boyum IT, and UiPath practice heads. Receive tailored architectural guidance."
      />

    </div>
  );
};

