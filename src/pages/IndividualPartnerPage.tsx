import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { CtaContactCards } from '../components/ui/CtaContactCards';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  Building2,
  TrendingUp,
  ShoppingCart,
  Boxes,
  Factory,
  Cpu,
  Truck,
  Ship,
  Settings,
  ShieldCheck,
  FileCheck,
  Sparkles,
  Check,
  Award,
  Layers,
  ChevronRight,
  Send
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { ConsultationModal } from '../components/ui/ConsultationModal';
import {
  SAPBusinessOneLogo,
  BoyumITLogo,
  UiPathLogo,
  AtlasLogo
} from '../components/ui/PartnerLogos';
import {
  INDIVIDUAL_PARTNERS_DATA,
  IndividualPartner
} from '../data/individualPartnersData';
import { BRAND_INFO } from '../data/websiteContent';
import { ContactFormData } from '../types';
import { ImageFeatureSlider } from '../components/ui/ImageFeatureSlider';
import { cardImage, poolForSlug } from '../data/cardImagePools';

export const IndividualPartnerPage: React.FC = () => {
  const { partnerSlug } = useParams<{ partnerSlug: string }>();
  const navigate = useNavigate();

  // Find partner data
  const partner: IndividualPartner | undefined = partnerSlug
    ? INDIVIDUAL_PARTNERS_DATA[partnerSlug]
    : undefined;

  // Scroll to top indicator
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Modal and consultation state
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [partnerSlug]);

  // If slug is invalid, redirect to /partners
  if (!partner) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-white">
        <h2 className="atlas-h2-size font-serif font-bold text-[#0A1B4F] mb-4">Partner Not Found</h2>
        <p className="text-[#4A5876] max-w-md mb-6">
          The technology partner page you are looking for does not exist or has been relocated.
        </p>
        <Link
          to="/partners"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E0A33B] to-[#E0A33B] text-white font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Partners</span>
        </Link>
      </div>
    );
  }

  const renderIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className={className} />;
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      case 'ShoppingCart':
        return <ShoppingCart className={className} />;
      case 'Boxes':
        return <Boxes className={className} />;
      case 'Factory':
        return <Factory className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Truck':
        return <Truck className={className} />;
      case 'Ship':
        return <Ship className={className} />;
      case 'Settings':
        return <Settings className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'FileCheck':
        return <FileCheck className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      default:
        return <CheckCircle2 className={className} />;
    }
  };

  const renderPartnerLogo = (badgeType: string, className = "h-9") => {
    switch (badgeType) {
      case 'sap':
        return <SAPBusinessOneLogo className={className} />;
      case 'boyum':
        return <BoyumITLogo className={className} />;
      case 'uipath':
        return <UiPathLogo className={className} />;
      case 'atlas':
        return <AtlasLogo className={className} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative bg-white text-[#4A5876] selection:bg-blue-600 selection:text-white">
      {/* Background Decorative Ambient Glow matching About Page */}
      <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-48 h-80 opacity-25 pointer-events-none select-none hidden lg:block">
        <div className="w-full h-full bg-gradient-to-tr from-emerald-600/30 via-teal-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* ========================================================================= */}
      {/* TOP NAVIGATION STRIP & BREADCRUMBS                                       */}
      {/* ========================================================================= */}
      <section className="border-b border-white/10 py-3.5 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Breadcrumbs: Home -> Partners -> Partner Name */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-medium">
              <Link to="/" className="text-slate-500 hover:text-[#E0A33B] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <Link to="/partners" className="text-slate-500 hover:text-[#E0A33B] transition-colors">
                Partners
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[#0A1B4F] font-bold">
                {partner.name}
              </span>
            </nav>

            {/* Back to Partners Link Button */}
            <Link
              to="/partners"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#E0A33B] hover:text-[#E0A33B] group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Partners</span>
            </Link>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-10 pb-14 lg:pt-14 lg:pb-18 border-b border-white/10 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Eyebrow, Partner Logo, Heading, Intro & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Eyebrow & Verified Partnership Pill */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#E0A33B]">
                  {partner.eyebrow}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#E0A33B] border border-blue-200">
                  <Award className="w-3.5 h-3.5" />
                  <span>{partner.partnershipLevel}</span>
                </span>
              </div>

              {/* Partner Logo Ribbon */}
              <div className="pt-1">
                <div className="inline-block bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200/90 shadow-sm">
                  {renderPartnerLogo(partner.badgeType, "h-9 sm:h-10")}
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="atlas-h1-size font-serif font-extrabold text-[#0A1B4F]">
                {partner.heroTitle}{' '}
                <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                  {partner.heroHighlight}
                </span>
              </h1>

              {/* Partner Introduction */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#4A5876] leading-relaxed max-w-2xl font-normal">
                {partner.introduction}
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-atlas-gold hover:bg-[#D4972F] !text-atlas-navy font-bold shadow-[0_4px_14px_rgba(224,163,59,0.35)] transition-all duration-200 cursor-pointer"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href="#capabilities"
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0A1B4F] border border-slate-200/90 shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <span>Explore Capabilities</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual with Partner Logo Overlay */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
                <img
                  src={partner.heroImage}
                  alt={`${partner.name} enterprise technology deployment`}
                  className="w-full h-[380px] sm:h-[430px] lg:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Partner Badge at Bottom Left */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-lg border border-slate-200/90 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Technology Partner
                    </span>
                    <span className="text-[14px] font-bold text-[#0A1B4F]">
                      {partner.name}
                    </span>
                  </div>
                  <div className="shrink-0">
                    {renderPartnerLogo(partner.badgeType, "h-7")}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: VERIFIED METRICS BAR                                           */}
      {/* ========================================================================= */}
      <section className="py-8 sm:py-10 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {partner.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 text-left hover:border-blue-300 hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="font-serif text-[32px] sm:text-[40px] font-bold bg-gradient-to-r from-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em] leading-none mb-1.5">
                  <AnimatedCounter value={metric.value} />
                </div>
                <div className="text-[14px] sm:text-[15px] font-bold text-[#0A1B4F] leading-tight">
                  {metric.label}
                </div>
                <div className="text-[12px] text-slate-500 leading-snug mt-1">
                  {metric.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: TECHNOLOGY & ARCHITECTURE OVERVIEW                             */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 border-b border-white/10 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left 6 Cols: Secondary Visual */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
                <img
                  src={partner.secondaryImage}
                  alt={`${partner.name} architecture overview`}
                  className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 shadow-md border border-slate-200/90 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#E0A33B]" />
                  <span className="text-xs font-bold text-slate-700">
                    Enterprise Architecture
                  </span>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Overview Narrative & Architectural Highlights */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-left">
              <div className="inline-block">
                <span className="text-[13px] font-bold uppercase tracking-wider text-[#E0A33B]">
                  TECHNOLOGY & ARCHITECTURE —
                </span>
              </div>

              <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                {partner.techOverview.title}
              </h2>

              <p className="text-[16px] sm:text-[17px] text-[#4A5876] leading-relaxed font-normal">
                {partner.techOverview.description}
              </p>

              {/* 4 Architecture Points */}
              <div className="space-y-3 pt-2">
                {partner.techOverview.architecturePoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                    <div className="w-6 h-6 rounded-md bg-blue-50 text-[#E0A33B] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-700 leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: KEY CAPABILITIES & FEATURES (6 CARDS GRID)                    */}
      {/* ========================================================================= */}
      <section id="capabilities" className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left mb-12 space-y-2">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#E0A33B] block">
              CORE CAPABILITIES —
            </span>
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              Key Features &{' '}
              <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                Functional Highlights
              </span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#4A5876] leading-relaxed max-w-3xl">
              Engineered to handle complex business transactions, streamline cross-functional workflows, and empower teams with real-time operational accuracy.
            </p>
          </div>

          <ImageFeatureSlider
            ariaLabel={`${partner.name} capabilities`}
            perView={3}
            items={partner.capabilities.map((cap, idx) => ({
              title: cap.title,
              description: cap.description,
              image: cardImage(poolForSlug(partnerSlug), idx),
            }))}
          />

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: MEASURABLE BUSINESS BENEFITS (4 CARDS)                         */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 border-b border-white/10 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left mb-12 space-y-2">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#E0A33B] block">
              MEASURABLE ROI —
            </span>
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              Proven Business{' '}
              <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                Advantages
              </span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#4A5876] leading-relaxed max-w-3xl">
              Concrete operational improvements and financial returns delivered through structured ATLAS Technosoft deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partner.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between text-left group"
              >
                <div>
                  {benefit.metric && (
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#E0A33B] border border-blue-200/80 mb-4">
                      {benefit.metric}
                    </div>
                  )}

                  <h3 className="text-[18px] font-bold text-[#0A1B4F] mb-2 leading-snug group-hover:text-[#E0A33B] transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-[14px] text-[#4A5876] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: HOW ATLAS WORKS WITH PARTNER TECHNOLOGY                       */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left mb-12 space-y-2">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#E0A33B] block">
              OUR IMPLEMENTATION METHODOLOGY —
            </span>
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              How ATLAS Delivers{' '}
              <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                {partner.name}
              </span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#4A5876] leading-relaxed max-w-3xl">
              A structured 4-phase rollout methodology refined across 80+ live deployments ensuring on-time delivery and predictable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partner.howAtlasWorks.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 text-left hover:bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="font-serif text-3xl font-bold text-[#E0A33B] mb-3">
                    {pillar.step}
                  </div>
                  
                  <h3 className="text-[18px] font-bold text-[#0A1B4F] mb-2 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-[13px] sm:text-[14px] text-[#4A5876] leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Key Deliverables:
                  </span>
                  {pillar.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1F4FE0] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: RELEVANT INDUSTRIES & USE CASES                                */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 border-b border-white/10 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left mb-12 space-y-2">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#E0A33B] block">
              INDUSTRY APPLICATIONS —
            </span>
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              Tailored Industry{' '}
              <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                Solutions
              </span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#4A5876] leading-relaxed max-w-3xl">
              Discover how {partner.name} addresses sector-specific manufacturing, logistics, and trading challenges.
            </p>
          </div>

          <ImageFeatureSlider
            ariaLabel={`${partner.name} industry use cases`}
            perView={4}
            items={partner.industryUseCases.map((useCase) => ({
              title: useCase.title,
              description: useCase.description,
              eyebrow: useCase.industry,
              href: useCase.route,
              actionLabel: 'Explore industry',
              image: cardImage(poolForSlug(useCase.route), 0),
            }))}
          />

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: RELATED SERVICES & SOLUTIONS                                   */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left mb-10 space-y-2">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#E0A33B] block">
              ECOSYSTEM SYNERGY —
            </span>
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              Complementary Services &{' '}
              <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                Solutions
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partner.relatedServices.map((rel, idx) => (
              <Link
                key={idx}
                to={rel.route}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between text-left group"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E0A33B] block mb-1.5">
                    {rel.category}
                  </span>
                  <h3 className="text-[18px] font-bold text-[#0A1B4F] mb-2 leading-snug group-hover:text-[#E0A33B] transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-[#4A5876] leading-relaxed">
                    {rel.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-[#E0A33B] group-hover:underline">
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: CONSULTATION CTA CARD (CONSISTENT WITH ABOUT/PARTNERS)          */}
      {/* ========================================================================= */}
      <section className="py-12 lg:py-16 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white border border-blue-200/90 p-8 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Subtext & Button */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#E0A33B]">
                  CONNECT WITH OUR SPECIALISTS
                </span>

                <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                  Ready to Deploy{' '}
                  <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                    {partner.name}?
                  </span>
                </h2>

                <p className="text-[15px] sm:text-[16px] text-[#4A5876] leading-relaxed max-w-xl">
                  Schedule a discovery session with our certified architects to explore how {partner.name} can streamline operations and drive bottom-line efficiency.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setIsConsultationModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 text-[15px] sm:text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-atlas-gold hover:bg-[#D4972F] !text-atlas-navy font-bold shadow-[0_4px_14px_rgba(224,163,59,0.35)] transition-all cursor-pointer"
                  >
                    <span>Book a Partner Consultation</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right Column: 3 Contact Boxes */}
              <div className="lg:col-span-6 space-y-3.5">
                {/* Email Box */}
                <a
                  href={`mailto:sales@atlastechnosoft.com?subject=Partnership%20Inquiry%20-%20${encodeURIComponent(partner.name)}`}
                  className="bg-white rounded-xl p-4 sm:p-4.5 border-2 border-[#16b978] shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-[#E0A33B] flex items-center justify-center shrink-0 group-hover:bg-[#1F4FE0] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Direct Email
                    </p>
                    <p className="text-[15px] font-bold text-slate-900 group-hover:text-[#E0A33B] transition-colors">
                      sales@atlastechnosoft.com
                    </p>
                  </div>
                </a>

                {/* Phone Box */}
                <a
                  href="tel:+919372329599"
                  className="bg-white rounded-xl p-4 sm:p-4.5 border-2 border-[#1F4FE0] shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-[#E0A33B] flex items-center justify-center shrink-0 group-hover:bg-[#1F4FE0] group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Telephone
                    </p>
                    <p className="text-[15px] font-bold text-slate-900 group-hover:text-[#E0A33B] transition-colors">
                      +91-9372329599
                    </p>
                  </div>
                </a>

                {/* Office Location Box */}
                <div className="bg-white rounded-xl p-4 sm:p-4.5 border-2 border-[#1F4FE0] shadow-sm flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-[#E0A33B] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Locations
                    </p>
                    <p className="text-[14px] font-bold text-slate-900">
                      Borivali & Marine Lines, Mumbai
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FLOATING SCROLL TO TOP BUTTON                                             */}
      {/* ========================================================================= */}

      {/* ========================================================================= */}
      {/* REUSABLE ENTERPRISE CONSULTATION MODAL */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        defaultService={partner ? `Partner Consultation: ${partner.name}` : "SAP Business One Implementation"}
        title={partner ? `Book a ${partner.name} Consultation` : "Book a Partner Consultation"}
      />
    </div>
  );
};

