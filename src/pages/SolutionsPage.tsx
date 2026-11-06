import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { Link } from 'react-router-dom';
import { CtaContactCards } from '../components/ui/CtaContactCards';
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronUp,
  Send,
  Users,
  TrendingUp,
  Database,
  Award,
  Cog,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  LineChart,
  Clock,
  Check,
  Ship,
  Truck,
  Factory,
  Boxes,
  Handshake,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ConsultationModal } from '../components/ui/ConsultationModal';
import { SAPBusinessOneLogo, BoyumITLogo, UiPathLogo } from '../components/ui/PartnerLogos';
import { BRAND_INFO } from '../data/websiteContent';
import { ABOUT_METRICS_DATA } from '../data/aboutContent';
import {
  SOLUTIONS_HERO_DATA,
  SOLUTIONS_OVERVIEW_CARDS,
  SAP_B1_DEEP_DIVE,
  BOYUM_IT_DEEP_DIVE,
  UIPATH_RPA_DEEP_DIVE,
  ATLAS_ADDONS_DEEP_DIVE,
  SOLUTIONS_INDUSTRIES_DATA,
  SOLUTIONS_CONTACT_CTA_DATA
} from '../data/solutionsContent';

const industryIcons: Record<string, React.ReactNode> = {
  manufacturing: <Factory className="w-5 h-5 text-blue-600" />,
  warehouse: <Truck className="w-5 h-5 text-emerald-600" />,
  finance: <Database className="w-5 h-5 text-[#1F4FE0]" />,
  trading: <Ship className="w-5 h-5 text-[#1F4FE0]" />
};

export const SolutionsPage: React.FC = () => {
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="relative bg-white text-[#4A5876] selection:bg-blue-600 selection:text-white">

      {/* ========================================================================= */}
      {/* SECTION 1: SOLUTIONS HERO                                                 */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-white/10 atlas-dark">
        
        {/* Soft subtle botanical ambient glow on far left */}
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-48 h-80 opacity-25 pointer-events-none select-none hidden lg:block">
          <div className="w-full h-full bg-gradient-to-tr from-emerald-600/30 via-teal-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Column (58% on Desktop) */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              {/* Eyebrow: 13–14px */}
              <div className="inline-block">
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1F4FE0] select-none">
                  {SOLUTIONS_HERO_DATA.eyebrow}
                </span>
              </div>

              {/* Main Heading: 46–54px desktop, 34–40px mobile */}
              <h1 className="atlas-h1-size font-serif font-extrabold text-[#0A1B4F]">
                {SOLUTIONS_HERO_DATA.titleStart}{' '}
                <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">{SOLUTIONS_HERO_DATA.titleHighlight}</span>
              </h1>

              {/* Supporting Text: 17–18px Desktop, 16px Mobile */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#4A5876] leading-relaxed max-w-2xl font-normal">
                {SOLUTIONS_HERO_DATA.description}
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  href="#overview"
                  variant="primary"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 shadow-md shadow-blue-500/25 bg-gradient-to-r from-[#1F4FE0] to-[#1F4FE0] hover:from-[#1739B8] hover:to-[#1739B8] text-white"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  {SOLUTIONS_HERO_DATA.primaryCtaText}
                </Button>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="secondary"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 text-[#0A1B4F] hover:text-[#1F4FE0]"
                >
                  {SOLUTIONS_HERO_DATA.secondaryCtaText}
                </Button>
              </div>
            </div>

            {/* Right Column: Office Workspace Monitor with 4 Floating Brand Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white">
                <img
                  src={SOLUTIONS_HERO_DATA.imageSrc}
                  onError={(e) => {
                    e.currentTarget.src = SOLUTIONS_HERO_DATA.fallbackImageSrc;
                  }}
                  alt="Modern Enterprise Workstation Monitor Showing ERP Analytics"
                  className="w-full h-auto object-cover max-h-[390px]"
                />

                {/* 4 Floating Badges Matching Reference Mockup */}
                {/* 1. SAP Business One (Top Left) */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-2.5 shadow-md border border-slate-200/90 flex items-center gap-2">
                  <div className="h-6 flex items-center">
                    <SAPBusinessOneLogo />
                  </div>
                </div>

                {/* 2. Boyum IT (Top Right) */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-2.5 shadow-md border border-slate-200/90 flex items-center gap-2">
                  <div className="h-6 flex items-center">
                    <BoyumITLogo />
                  </div>
                </div>

                {/* 3. UiPath (Bottom Left) */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-2.5 shadow-md border border-slate-200/90 flex items-center gap-2">
                  <div className="h-6 flex items-center">
                    <UiPathLogo />
                  </div>
                </div>

                {/* 4. ATLAS Add-ons (Bottom Right) */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-2.5 shadow-md border border-slate-200/90 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center shrink-0">
                    <img src="/images/logo.png" alt="ATLAS Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 leading-tight">
                    ATLAS <span className="text-cyan-600">Add-ons</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: COMPANY METRICS BAR (4 CLEAN SEPARATED CARDS)                  */}
      {/* ========================================================================= */}
      <section id="metrics" className="py-6 sm:py-8 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-sm p-4 sm:p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {ABOUT_METRICS_DATA.map((metric) => (
                <div key={metric.id} className="pt-3 sm:pt-0 first:pt-0 flex flex-col items-center text-center p-3 sm:p-4">
                  
                  {/* Colored Icon Circle */}
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center mb-2 mx-auto ${
                    metric.color === 'blue' ? 'bg-blue-50 border-blue-200 text-[#1F4FE0]' :
                    metric.color === 'green' ? 'bg-emerald-50 border-emerald-200 text-[#10b981]' :
                    'bg-blue-50 border-blue-200 text-[#1F4FE0]'
                  }`}>
                    {metric.iconName === 'Users' && <Users className="w-5 h-5" />}
                    {metric.iconName === 'TrendingUp' && <TrendingUp className="w-5 h-5" />}
                    {metric.iconName === 'Database' && <Database className="w-5 h-5" />}
                    {metric.iconName === 'Award' && <Award className="w-5 h-5" />}
                  </div>

                  {/* Metric Numeric Value */}
                  <div className={`text-[32px] sm:text-[36px] lg:text-[40px] font-extrabold tracking-tight leading-none mb-1 ${
                    metric.color === 'blue' ? 'text-[#1F4FE0]' :
                    metric.color === 'green' ? 'text-[#10b981]' :
                    'text-[#1F4FE0]'
                  }`}>
                    <AnimatedCounter value={metric.value} />
                  </div>

                  {/* Bold Label */}
                  <div className="text-[15px] sm:text-[16px] font-bold text-[#0A1B4F] leading-snug">
                    {metric.label}
                  </div>

                  {/* Small Supporting Description */}
                  <div className="text-[12px] sm:text-[13px] text-[#4A5876] leading-snug mt-0.5">
                    {metric.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: TECHNOLOGY SOLUTIONS FOR EVERY BUSINESS NEED (5 CARDS)         */}
      {/* ========================================================================= */}
      <section id="overview" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="OUR SOLUTIONS —"
            title="Technology Solutions for"
            titleHighlight="Every Business Need"
            subtitle="A comprehensive range of enterprise solutions to help businesses streamline processes, and achieve long-term growth."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-4 xl:gap-5">
            {SOLUTIONS_OVERVIEW_CARDS.map((card) => (
              <div
                key={card.id}
                className="group flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Header Image */}
                <div className="relative w-full h-32 sm:h-36 overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img
                    src={card.imageSrc}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-4">
                    {/* Badge / Logo */}
                    <div className="h-7 flex items-center">
                      {card.badgeType === 'sap' && <SAPBusinessOneLogo />}
                      {card.badgeType === 'boyum' && <BoyumITLogo />}
                      {card.badgeType === 'uipath' && <UiPathLogo />}
                      {card.badgeType === 'atlas' && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                          <Boxes className="w-4 h-4 text-emerald-600" />
                          <span>ATLAS Add-ons</span>
                        </div>
                      )}
                      {card.badgeType === 'ecosystem' && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                          <Layers className="w-4 h-4 text-blue-600" />
                          <span>Ecosystem</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0A1B4F] group-hover:text-[#1F4FE0] transition-colors leading-snug">
                      <a href={card.linkHref} className="hover:underline">
                        {card.title}
                      </a>
                    </h3>

                    <p className="text-[13px] sm:text-[14px] text-[#4A5876] leading-snug">
                      {card.description}
                    </p>
                  </div>

                  {/* Footer Learn More Link with Circular Button */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={card.linkHref}
                      className="text-[13px] sm:text-[14px] font-semibold text-[#0A1B4F] group-hover:text-[#1F4FE0] transition-colors flex items-center gap-1.5"
                    >
                      <span>Learn More</span>
                    </a>
                    
                    <a
                      href={card.linkHref}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        card.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
                        card.color === 'coral' ? 'bg-indigo-50 text-[#6366f1] group-hover:bg-[#6366f1] group-hover:text-white' :
                        card.color === 'purple' ? 'bg-blue-50 text-[#1F4FE0] group-hover:bg-[#1F4FE0] group-hover:text-white' :
                        card.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' :
                        'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white'
                      }`}
                      aria-label={`Learn more about ${card.title}`}
                    >
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: DEEP DIVE — SAP BUSINESS ONE (ONE PLATFORM FOR SMARTER MGMT)   */}
      {/* ========================================================================= */}
      <section id="sap-b1-section" className="py-12 sm:py-16 lg:py-20 border-b border-white/10 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Content (4.5 cols) */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[13px] font-bold uppercase tracking-wider text-[#1F4FE0] block">
                {SAP_B1_DEEP_DIVE.eyebrow}
              </span>
              
              <div className="h-8 flex items-center mb-1">
                <SAPBusinessOneLogo />
              </div>

              <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                Comprehensive ERP for <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">Growing Enterprises</span>
              </h2>

              <p className="text-[15px] sm:text-[16px] text-[#4A5876] leading-relaxed">
                {SAP_B1_DEEP_DIVE.description}
              </p>

              {/* Checklist */}
              <div className="space-y-2.5 pt-1">
                {SAP_B1_DEEP_DIVE.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#1F4FE0] to-[#1F4FE0] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[14px] sm:text-[15px] font-medium text-[#4A5876]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="primary"
                  size="md"
                  className="text-[15px] sm:text-[16px] font-semibold px-6 py-3 bg-gradient-to-r from-[#1F4FE0] to-[#1F4FE0] hover:from-[#1739B8] hover:to-[#1739B8] text-white shadow-md shadow-blue-500/25"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {SAP_B1_DEEP_DIVE.ctaText}
                </Button>
              </div>
            </div>

            {/* Center Monitor Image (4 cols) */}
            <div className="lg:col-span-4 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-white">
                <img
                  src={SAP_B1_DEEP_DIVE.imageSrc}
                  alt="SAP Business One Enterprise Management Monitor"
                  className="w-full h-auto object-cover max-h-[350px]"
                />
              </div>
            </div>

            {/* Right Column: Key Benefits (3.5 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-[16px] sm:text-[17px] font-bold text-[#0A1B4F] mb-3 text-left">
                Key Benefits
              </h4>
              <div className="space-y-3">
                {SAP_B1_DEEP_DIVE.keyBenefits.map((b) => (
                  <div
                    key={b.id}
                    className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3 text-left hover:border-blue-300 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                      {b.iconName === 'Database' && <Database className="w-4 h-4" />}
                      {b.iconName === 'LineChart' && <LineChart className="w-4 h-4" />}
                      {b.iconName === 'Zap' && <Zap className="w-4 h-4" />}
                      {b.iconName === 'TrendingUp' && <TrendingUp className="w-4 h-4" />}
                    </div>
                    <span className="text-[13px] sm:text-[14px] font-bold text-[#0A1B4F] leading-tight">
                      {b.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: DEEP DIVE — BOYUM IT SOLUTIONS (EXTEND SAP BUSINESS ONE)       */}
      {/* ========================================================================= */}
      <section id="boyum-section" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Content (4 cols) */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <span className="text-[13px] font-bold uppercase tracking-wider text-[#1F4FE0] block">
                {BOYUM_IT_DEEP_DIVE.eyebrow}
              </span>

              <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                Advanced Manufacturing & <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">Warehouse Management</span>
              </h2>

              <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#0A1B4F] leading-snug">
                {BOYUM_IT_DEEP_DIVE.subtitle}
              </h3>

              <p className="text-[15px] sm:text-[16px] text-[#4A5876] leading-relaxed">
                {BOYUM_IT_DEEP_DIVE.description}
              </p>

              <div className="pt-2">
                <Button
                  href="/solutions/boyum-it"
                  variant="primary"
                  size="md"
                  className="text-[15px] sm:text-[16px] font-semibold px-6 py-3 bg-gradient-to-r from-[#1F4FE0] to-[#1F4FE0] hover:from-[#1739B8] hover:to-[#1739B8] text-white shadow-md shadow-blue-500/25"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {BOYUM_IT_DEEP_DIVE.ctaText}
                </Button>
              </div>
            </div>

            {/* Right 3 Module Cards (8 cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {BOYUM_IT_DEEP_DIVE.modules.map((mod) => (
                <div
                  key={mod.id}
                  className="group rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {/* Top Image */}
                  <div className="relative w-full h-32 overflow-hidden bg-slate-100 border-b border-slate-100">
                    <img
                      src={mod.imageSrc}
                      onError={(e) => {
                        e.currentTarget.src = "/images/crystal_hd/ind_warehouse.jpg";
                      }}
                      alt={mod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          mod.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-blue-50 text-[#1F4FE0]'
                        }`}>
                          {mod.id === 'beas' && <Factory className="w-4 h-4" />}
                          {mod.id === 'produmex' && <Boxes className="w-4 h-4" />}
                          {mod.id === 'b1up' && <Cog className="w-4 h-4" />}
                        </div>
                        <h4 className="text-[16px] sm:text-[17px] font-bold text-[#0A1B4F] leading-snug">
                          {mod.title}
                        </h4>
                      </div>

                      <p className="text-[13px] text-[#4A5876] leading-snug">
                        {mod.subtitle}
                      </p>
                    </div>

                    {/* Footer Link with Button */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href={mod.linkHref}
                        className="text-[13px] font-semibold text-[#0A1B4F] group-hover:text-[#1F4FE0] transition-colors"
                      >
                        Learn More
                      </a>
                      <a
                        href={mod.linkHref}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          mod.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' :
                          'bg-blue-50 text-[#1F4FE0] group-hover:bg-[#1F4FE0] group-hover:text-white'
                        }`}
                        aria-label={`Learn more about ${mod.title}`}
                      >
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: DEEP DIVE — UIPATH RPA & AI AUTOMATION                         */}
      {/* ========================================================================= */}
      <section id="uipath-section" className="py-12 sm:py-16 lg:py-20 border-b border-white/10 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Content (4 cols) */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <span className="text-[13px] font-bold uppercase tracking-wider text-[#1F4FE0] block">
                {UIPATH_RPA_DEEP_DIVE.eyebrow}
              </span>

              <div className="h-8 flex items-center mb-1">
                <UiPathLogo />
              </div>

              <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                Intelligent Process Automation with <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">RPA & AI</span>
              </h2>

              <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#0A1B4F] leading-snug">
                {UIPATH_RPA_DEEP_DIVE.subtitle}
              </h3>

              <p className="text-[15px] sm:text-[16px] text-[#4A5876] leading-relaxed">
                {UIPATH_RPA_DEEP_DIVE.description}
              </p>

              <div className="pt-2">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="primary"
                  size="md"
                  className="text-[15px] sm:text-[16px] font-semibold px-6 py-3 bg-[#1F4FE0] hover:bg-blue-700 shadow-md shadow-blue-500/25"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {UIPATH_RPA_DEEP_DIVE.ctaText}
                </Button>
              </div>
            </div>

            {/* Center Robot Visual (4 cols) */}
            <div className="lg:col-span-4 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-white">
                <img
                  src={UIPATH_RPA_DEEP_DIVE.imageSrc}
                  onError={(e) => {
                    e.currentTarget.src = "/images/about/about_expertise_hub.jpg";
                  }}
                  alt="UiPath Robotic Process Automation with AI Humanoid"
                  className="w-full h-auto object-cover max-h-[350px]"
                />
              </div>
            </div>

            {/* Right Column: Key Automation Areas 2x2 Grid (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-[16px] sm:text-[17px] font-bold text-[#0A1B4F] mb-3 text-left">
                Key Automation Areas
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {UIPATH_RPA_DEEP_DIVE.areas.map((area) => (
                  <div
                    key={area.id}
                    className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between text-left hover:border-blue-300 transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 shrink-0 ${
                      area.color === 'purple' ? 'bg-blue-50 text-[#1F4FE0] border border-blue-200' :
                      area.color === 'sky' ? 'bg-sky-50 text-[#0284c7] border border-sky-200' :
                      area.color === 'indigo' ? 'bg-indigo-50 text-[#6366f1] border border-indigo-200' :
                      'bg-emerald-50 text-[#10b981] border border-emerald-200'
                    }`}>
                      {area.iconName === 'Cog' && <Cog className="w-4 h-4" />}
                      {area.iconName === 'TrendingUp' && <TrendingUp className="w-4 h-4" />}
                      {area.iconName === 'Clock' && <Clock className="w-4 h-4" />}
                      {area.iconName === 'Cpu' && <Cpu className="w-4 h-4" />}
                    </div>

                    <div>
                      <h5 className="text-[14px] sm:text-[15px] font-bold text-[#0A1B4F] leading-snug">
                        {area.title}
                      </h5>
                      <p className="text-[12px] text-[#4A5876] leading-snug mt-0.5">
                        {area.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: ATLAS PROPRIETARY ADD-ONS (5 CARDS)                            */}
      {/* ========================================================================= */}
      <section id="atlas-addons-section" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-left">
            <div>
              <span className="text-[13px] font-bold uppercase tracking-wider text-[#1F4FE0] block mb-1">
                {ATLAS_ADDONS_DEEP_DIVE.eyebrow}
              </span>
              <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                Purpose-Built Solutions for <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">Specialized Operations</span>
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#4A5876] max-w-2xl mt-1 leading-relaxed">
                {ATLAS_ADDONS_DEEP_DIVE.description}
              </p>
            </div>

            <Button
              href="#contact-cta"
              variant="primary"
              size="md"
              className="text-[15px] font-semibold px-6 py-3 shrink-0 bg-gradient-to-r from-[#1F4FE0] to-[#1F4FE0] hover:from-[#1739B8] hover:to-[#1739B8] text-white shadow-md shadow-blue-500/25"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {ATLAS_ADDONS_DEEP_DIVE.ctaText}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ATLAS_ADDONS_DEEP_DIVE.items.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative w-full h-28 sm:h-32 overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img
                    src={item.imageSrc}
                    onError={(e) => {
                      e.currentTarget.src = "/images/crystal_hd/ind_shipping.jpg";
                    }}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        item.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                        item.color === 'cyan' ? 'bg-cyan-50 text-cyan-600' :
                        item.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                        item.color === 'purple' ? 'bg-blue-50 text-[#1F4FE0]' :
                        'bg-teal-50 text-teal-600'
                      }`}>
                        {item.id === 'freight-trading' && <Ship className="w-4 h-4" />}
                        {item.id === 'gate-entry' && <Scale className="w-4 h-4" />}
                        {item.id === 'wms-vendor' && <Boxes className="w-4 h-4" />}
                        {item.id === 'shipping-auto' && <Truck className="w-4 h-4" />}
                        {item.id === 'rpa-sales' && <Handshake className="w-4 h-4" />}
                      </div>
                      <h4 className="text-[15px] sm:text-[16px] font-bold text-[#0A1B4F] leading-snug">
                        {item.title}
                      </h4>
                    </div>

                    <p className="text-[12px] sm:text-[13px] text-[#4A5876] leading-snug">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                    <a
                      href="#contact-cta"
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        item.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
                        item.color === 'cyan' ? 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white' :
                        item.color === 'indigo' ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white' :
                        item.color === 'purple' ? 'bg-blue-50 text-[#1F4FE0] group-hover:bg-[#1F4FE0] group-hover:text-white' :
                        'bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white'
                      }`}
                      aria-label={`Inquire about ${item.title}`}
                    >
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: SOLUTIONS DESIGNED AROUND YOUR INDUSTRY (4 CARDS)              */}
      {/* ========================================================================= */}
      <section id="industries" className="py-12 sm:py-16 lg:py-20 border-b border-white/10 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#1F4FE0] block mb-2">
              INDUSTRIES WE SERVE —
            </span>
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              Solutions Designed Around <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">Your Industry</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {SOLUTIONS_INDUSTRIES_DATA.map((ind) => (
              <div
                key={ind.id}
                className="group flex flex-col justify-between rounded-xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden"
              >
                {/* Header Image */}
                <div className="relative w-full h-28 sm:h-32 overflow-hidden bg-slate-100 border-b border-slate-200/90">
                  <img
                    src={ind.imageSrc}
                    alt={ind.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Card Content Bar */}
                <div className="p-3.5 sm:p-4 flex-1 flex items-center justify-between gap-3 text-left">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="shrink-0">
                        {industryIcons[ind.id]}
                      </div>
                      <h3 className="text-[16px] sm:text-[17px] font-bold text-[#0A1B4F] group-hover:text-[#1F4FE0] transition-colors leading-snug">
                        {ind.title}
                      </h3>
                    </div>
                    <p className="text-[13px] text-[#4A5876] leading-snug">
                      {ind.description}
                    </p>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-200 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: CONTACT CTA ("LET'S FIND THE RIGHT SOLUTION")                   */}
      {/* ========================================================================= */}
      <section id="contact-cta" className="py-10 sm:py-12 lg:py-14 bg-white">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-blue-200/90 p-8 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Subtext & Both Action Buttons */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#1F4FE0] block">
                  {SOLUTIONS_CONTACT_CTA_DATA.eyebrow}
                </span>
                <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                  {SOLUTIONS_CONTACT_CTA_DATA.titleStart}{' '}
                  <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">{SOLUTIONS_CONTACT_CTA_DATA.titleHighlight}</span>
                </h2>
                
                <p className="text-[15px] sm:text-[16px] text-[#4A5876] leading-relaxed max-w-lg">
                  {SOLUTIONS_CONTACT_CTA_DATA.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="primary"
                    size="lg"
                    className="text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-md shadow-blue-500/25 bg-gradient-to-r from-[#1F4FE0] to-[#1F4FE0] hover:from-[#1739B8] hover:to-[#1739B8] text-white rounded-xl"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    {SOLUTIONS_CONTACT_CTA_DATA.buttonText}
                  </Button>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center font-semibold rounded-xl px-6 py-3.5 text-[15px] sm:text-[16px] bg-white text-[#0A1B4F] hover:bg-slate-50 border border-slate-300 shadow-sm transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Right Column: 3 Clean Contact Info Cards matching reference */}
              <div className="lg:col-span-6">
                <CtaContactCards />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* REUSABLE ENTERPRISE CONSULTATION MODAL                                    */}
      {/* ========================================================================= */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService="SAP Business One Implementation"
      />


    </div>
  );
};
