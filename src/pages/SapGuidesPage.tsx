import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Users,
  ArrowRight,
  ShieldAlert,
  Download,
  BookOpen,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Building2,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ConsultationModal } from '../components/ui/ConsultationModal';
import { CtaContactCards } from '../components/ui/CtaContactCards';
import { SAP_GUIDES } from '../data/sapGuidesData';
import { SapGuideItem } from '../types/resources';

export const SapGuidesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedGuideId, setExpandedGuideId] = useState<string | null>(SAP_GUIDES[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState('SAP Business One Architecture Advisory');

  useEffect(() => {
    document.title = 'SAP Guides & Educational Roadmaps | ATLAS Technosoft';
    window.scrollTo(0, 0);
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(SAP_GUIDES.map(g => g.category)));
    return ['All', ...cats];
  }, []);

  const filteredGuides = useMemo(() => {
    return SAP_GUIDES.filter(guide => {
      const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        guide.title.toLowerCase().includes(q) ||
        guide.summary.toLowerCase().includes(q) ||
        guide.topicsCovered.some(t => t.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  const openConsultation = (guideTitle: string) => {
    setModalService(`SAP Guide Inquiry: ${guideTitle}`);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white text-slate-800 selection:bg-blue-600 selection:text-white">
      
      {/* ===================================================================== */}
      {/* 1. HERO HEADER                                                        */}
      {/* ===================================================================== */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 border-b border-white/10 bg-atlas-navy atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#1F4FE0] text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>PRACTICAL ENTERPRISE KNOWLEDGE</span>
            </div>

            <h1 className="atlas-h1-size font-serif font-extrabold text-[#0A1B4F]">
              SAP Business One <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">Educational Guides</span>
            </h1>

            <p className="text-[16px] sm:text-[19px] text-[#4A5876] leading-relaxed font-normal">
              Explore in-depth technical blueprints, migration checklists, and operational best practices engineered by certified SAP solution architects.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-xl mx-auto mt-8 sm:mt-10">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search guides (e.g., HANA migration, inventory valuation, GST, Service Layer)..."
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1F4FE0] focus:border-transparent shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-100 px-2 py-1 rounded"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. CATEGORY PILLS & GUIDES DIRECTORY                                  */}
      {/* ===================================================================== */}
      <section className="py-12 sm:py-16 bg-atlas-navy atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat;
              const count = cat === 'All' ? SAP_GUIDES.length : SAP_GUIDES.filter(g => g.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1F4FE0] text-white shadow-sm shadow-blue-500/20'
                      : 'bg-white text-slate-600 hover:bg-blue-50/80 hover:text-[#1F4FE0] border border-slate-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Download Notice Box (Compliance with rule: Do not invent downloadable files) */}
          <div className="bg-white atlas-light-surface rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#1F4FE0] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-700 leading-snug">
                <strong className="font-bold text-[#0A1B4F]">Official Whitepapers & Custom Sizing Roadmaps: </strong>
                All technical blueprints below are available for immediate online reference. For formal downloadable architectural PDFs and customized server sizing calculations, connect directly with our advisory practice.
              </div>
            </div>
            <button
              type="button"
              onClick={() => openConsultation('General Architecture Consultation')}
              className="shrink-0 text-xs sm:text-sm font-bold text-[#1F4FE0] hover:text-[#1739B8] whitespace-nowrap inline-flex items-center gap-1.5"
            >
              <span>Request Advisory Document</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Guides List */}
          <div className="space-y-6">
            {filteredGuides.map(guide => {
              const isExpanded = expandedGuideId === guide.id;

              return (
                <div
                  key={guide.id}
                  id={guide.id}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-xs transition-all overflow-hidden"
                >
                  {/* Guide Header Summary Bar */}
                  <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F4FE0] bg-blue-50 px-2.5 py-1 rounded-md">
                          {guide.category}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                          {guide.documentType}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{guide.readTime}</span>
                        </span>
                      </div>

                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0A1B4F] leading-snug">
                        {guide.title}
                      </h2>

                      <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-4xl">
                        {guide.summary}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Users className="w-3.5 h-3.5 text-[#1F4FE0]" />
                        <span><strong>Target Audience:</strong> {guide.targetAudience}</span>
                      </div>
                    </div>

                    {/* Actions on right */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => setExpandedGuideId(isExpanded ? null : guide.id)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                        aria-expanded={isExpanded}
                      >
                        <span>{isExpanded ? 'Collapse Blueprint' : 'Read Full Blueprint'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => openConsultation(guide.title)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F4FE0] hover:bg-[#1739B8] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        <span>Consult on this Topic</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Blueprint Details */}
                  {isExpanded && (
                    <div className="px-6 sm:px-8 pb-8 pt-4 border-t border-slate-100 bg-white space-y-8 animate-fadeIn">
                      
                      {/* Topics Covered */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A1B4F] mb-3 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[#1F4FE0]" />
                          <span>Core Architectural Topics Covered</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {guide.topicsCovered.map((topic, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200/80">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Key Highlights */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A1B4F] mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#1F4FE0]" />
                          <span>Key Implementation Takeaways</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {guide.keyHighlights.map((hl, i) => (
                            <div key={i} className="bg-white p-4.5 rounded-xl border border-slate-200/80 space-y-1.5 shadow-2xs">
                              <div className="text-xs sm:text-sm font-bold text-[#0A1B4F]">
                                {hl.title}
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {hl.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Implementation Steps & Prerequisites */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {guide.prerequisites && (
                          <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-3">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                              Prerequisites & Readiness Checklist
                            </h5>
                            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                              {guide.prerequisites.map((p, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#1F4FE0] mt-1.5 shrink-0" />
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {guide.implementationSteps && (
                          <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-3">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                              Recommended Execution Steps
                            </h5>
                            <ol className="space-y-2 text-xs sm:text-sm text-slate-600">
                              {guide.implementationSteps.map((step, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-xs font-bold text-[#1F4FE0] bg-blue-50 px-1.5 py-0.5 rounded shrink-0">
                                    0{i + 1}
                                  </span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>

                      {/* Footer Actions & Recommended Solutions */}
                      <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="font-semibold text-slate-700">Relevant Solutions:</span>
                          {guide.recommendedSolutions.map((sol, idx) => (
                            <Link
                              key={idx}
                              to={sol.href}
                              className="text-[#1F4FE0] font-bold hover:underline inline-flex items-center gap-1"
                            >
                              <span>{sol.name}</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => openConsultation(guide.title)}
                          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1F4FE0] hover:text-[#1739B8]"
                        >
                          <span>Schedule Deep-Dive Architecture Review</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>

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
                TECHNICAL ADVISORY DESK
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Need a Custom SAP Architecture or Sizing Assessment?
              </h3>
              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
                Connect directly with certified SAP Business One and Boyum IT architects to review your transaction volume, database sizing, and multi-facility integration requirements.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => openConsultation('Executive Technical Advisory')}
                  variant="gold"
                  size="md"
                  className="bg-[#1F4FE0] hover:bg-[#1F4FE0] text-white font-semibold px-6 py-3 rounded-xl shadow-md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Book Strategic Consultation
                </Button>
                <a
                  href="https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20request%20guidance%20on%20SAP%20Business%20One%20architecture."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Solutions Desk</span>
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
        title="Request SAP Guide & Architecture Review"
        subtitle="Speak directly with certified SAP Business One and automation solution architects. Receive tailored guidance on your ERP landscape."
      />

    </div>
  );
};

