import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  ChevronRight,
  Boxes,
  Clock,
  Cpu,
  Database,
  RefreshCw,
  Settings,
  ShieldCheck,
  TrendingUp,
  Truck,
  Users,
  Building2,
  FileCheck2,
  PhoneCall
} from 'lucide-react';
import { Button } from '../ui/Button';
import { ConsultationModal } from '../ui/ConsultationModal';
import { CallbackModal } from '../ui/CallbackModal';
import { CtaContactCards } from '../ui/CtaContactCards';
import { DomainSolutionData } from '../../types/domainSolutions';

interface DomainSolutionTemplateProps {
  data: DomainSolutionData;
}

export const DomainSolutionTemplate: React.FC<DomainSolutionTemplateProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  useEffect(() => {
    document.title = `${data.title} ${data.titleHighlight} | ATLAS Technosoft`;
    window.scrollTo(0, 0);
  }, [data]);

  const renderIcon = (name: string, className = 'w-6 h-6 text-[#1B72E8]') => {
    switch (name) {
      case 'Boxes':
        return <Boxes className={className} />;
      case 'Clock':
        return <Clock className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Database':
        return <Database className={className} />;
      case 'RefreshCw':
        return <RefreshCw className={className} />;
      case 'Settings':
        return <Settings className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      case 'Truck':
        return <Truck className={className} />;
      case 'Users':
        return <Users className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#45546B]">
      {/* ========================================================================= */}
      {/* 1. BREADCRUMBS                                                           */}
      {/* ========================================================================= */}
      <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200/80 py-3">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500">
            <li>
              <Link to="/" className="hover:text-[#1B72E8] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </li>
            <li>
              <Link to="/solutions" className="hover:text-[#1B72E8] transition-colors">
                Solutions
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </li>
            <li className="font-semibold text-slate-800 truncate" aria-current="page">
              {data.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <section className="relative pt-10 pb-16 lg:pt-14 lg:pb-20 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white border-b border-slate-100">
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2">
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#1B72E8] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  {data.eyebrow}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A202C] tracking-tight leading-tight">
                {data.title} <span className="text-[#1B72E8]">{data.titleHighlight}</span>
              </h1>

              <p className="text-lg sm:text-xl font-medium text-slate-700 leading-snug">
                {data.subtitle}
              </p>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {data.description}
              </p>

              {/* Partner Badges */}
              <div className="pt-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                  Platform Architecture & Certifications:
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {data.partnerBadges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs sm:text-sm font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-4 flex flex-wrap gap-3 sm:gap-4 items-center">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#1B72E8] hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-lg shadow-sm transition-all duration-200 inline-flex items-center gap-2"
                >
                  Book a Domain Consultation
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <a
                  href="#architecture"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg text-slate-700 font-semibold bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
                >
                  <Layers className="w-4 h-4 text-[#1B72E8]" />
                  Explore Architecture
                </a>
              </div>
            </div>

            {/* Right Media */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 group">
                <img
                  src={data.heroImage}
                  alt={data.heroImageAlt}
                  className="w-full h-[380px] sm:h-[440px] object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('solutions_hero_monitor.jpg')) {
                      target.src = '/images/solutions/solutions_hero_monitor.jpg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-slate-200/60 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-[#1B72E8] rounded-lg">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#1B72E8]">
                        Enterprise-Grade Implementation
                      </p>
                      <p className="text-xs font-medium text-slate-700">
                        Zero-Data Loss Architecture • Turnkey Delivery
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PERFORMANCE METRICS                                                   */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {data.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B72E8] tracking-tight mb-2">
                  {metric.value}
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                  {metric.label}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INDUSTRY CHALLENGES ELIMINATED                                        */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E06D53]">
              Operational Bottlenecks
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
              Core Industry Challenges We Eliminate
            </h2>
            <p className="text-base text-slate-600">
              Legacy spreadsheets and fragmented standalone software create operational blindspots. Here is how enterprise leaders overcome them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {data.challenges.map((c, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex-shrink-0">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {c.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
                    {c.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-start gap-2 text-xs sm:text-sm">
                  <span className="font-bold text-[#E06D53] whitespace-nowrap">Business Impact:</span>
                  <span className="text-slate-700 font-medium">{c.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ARCHITECTURE OVERVIEW & TECHNICAL APPROACH                           */}
      {/* ========================================================================= */}
      <section id="architecture" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B72E8]">
              Proven Technical Blueprint
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
              {data.architectureOverview.heading}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {data.architectureOverview.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10">
            {data.architectureOverview.points.map((point, idx) => (
              <div
                key={idx}
                className="bg-slate-50/60 rounded-2xl p-6 sm:p-8 border border-slate-200/90 hover:border-blue-400 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1B72E8] flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {point.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                  {point.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {point.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded text-xs font-semibold bg-white text-slate-700 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {data.architectureOverview.diagramNote && (
            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-[#1B72E8] rounded-xl flex-shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <p className="text-sm sm:text-base text-blue-900 font-medium">
                <span className="font-bold">Integration Architecture: </span>
                {data.architectureOverview.diagramNote}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. KEY FEATURES & CAPABILITIES                                          */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B72E8]">
              Comprehensive Functionality
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
              Core Capabilities & Modules
            </h2>
            <p className="text-base text-slate-600">
              Purpose-built capabilities engineered to provide total transparency, operational speed, and strict compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {data.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="p-3 rounded-xl bg-blue-50 text-[#1B72E8] group-hover:bg-[#1B72E8] group-hover:text-white transition-colors duration-200 w-fit mb-4">
                    {renderIcon(feature.icon, 'w-6 h-6')}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. STEP-BY-STEP PROCESS WORKFLOW                                         */}
      {/* ========================================================================= */}
      <section id="workflow" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-600">
              Execution Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
              End-to-End Operational Workflow
            </h2>
            <p className="text-base text-slate-600">
              How ATLAS aligns technical configuration with real physical operations from initial intake to final ledger reconciliation.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
            {data.workflowSteps.map((step) => (
              <div
                key={step.step}
                className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 hover:border-emerald-400 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                    0{step.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right flex-shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <FileCheck2 className="w-3.5 h-3.5" />
                    {step.output}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. VERIFIED CASE STUDY SPOTLIGHT                                         */}
      {/* ========================================================================= */}
      {data.caseStudy && (
        <section className="py-16 lg:py-20 bg-slate-900 text-white">
          <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-700/80 shadow-2xl relative overflow-hidden">
              <div className="max-w-3xl relative z-10">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
                  {data.caseStudy.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  {data.caseStudy.title}
                </h3>
                <blockquote className="text-lg sm:text-xl text-slate-300 italic mb-6 leading-relaxed">
                  "{data.caseStudy.quote}"
                </blockquote>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
                    ATPL
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">
                      Enterprise Customer Deployment
                    </div>
                    <div className="text-xs text-slate-400">
                      {data.caseStudy.designation}
                    </div>
                  </div>
                </div>
                <Link
                  to={data.caseStudy.href}
                  className="inline-flex items-center gap-2 bg-[#1B72E8] hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-sm transition-all duration-200"
                >
                  Read Full Case Study
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 9. RELATED SOLUTIONS                                                     */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B72E8]">
              Ecosystem Connectivity
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-3">
              Complementary Enterprise Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Integrate domain capabilities across our verified product and service catalog.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.relatedSolutions.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 mb-3">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>
                <Link
                  to={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B72E8] hover:text-blue-700 transition-colors"
                >
                  Explore Solution
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. CALL TO ACTION & CONSULTATION FORM MODAL                            */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-14 text-white text-center relative overflow-hidden mb-12">
            <div className="max-w-2xl mx-auto space-y-5 relative z-10">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-300">
                Let's Talk Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Ready to Upgrade Your {data.title}?
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Connect directly with ATLAS Technosoft’s senior functional consultants in Mumbai to discuss process workflows, integration timelines, and ROI metrics.
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#1B72E8] hover:bg-blue-600 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-all duration-200 inline-flex items-center gap-2"
                >
                  Schedule Solution Consultation
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <button
                  type="button"
                  onClick={() => setIsCallbackModalOpen(true)}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-base px-7 py-4 rounded-xl transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-5 h-5 text-blue-300" />
                  Request a Callback
                </button>
              </div>
            </div>
          </div>

          {/* Contact Details Cards */}
          <CtaContactCards />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. REUSABLE BACKEND-CONNECTED CONSULTATION MODAL                        */}
      {/* ========================================================================= */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={`${data.title} ${data.titleHighlight}`}
      />

      {/* Reusable Enterprise Callback Modal */}
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
        defaultService={`${data.title} ${data.titleHighlight}`}
      />
    </div>
  );
};

