import { Link } from 'react-router-dom';
import { CtaContactCards } from '../components/ui/CtaContactCards';
import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Factory,
  Truck,
  Boxes,
  ShoppingCart,
  Cog,
  Utensils,
  Pill,
  FlaskConical,
  MessageSquare,
  LineChart,
  Lightbulb,
  Settings,
  UserCheck,
  TrendingUp,
  Eye,
  BarChart3,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  CheckCircle2,
  X,
  Send,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { ConsultationModal } from '../components/ui/ConsultationModal';
import { BRAND_INFO } from '../data/websiteContent';
import { ContactFormData } from '../types';
import {
  INDUSTRIES_HERO_DATA,
  INDUSTRIES_SECTION_HEADER,
  INDUSTRIES_CARDS_DATA,
  INDUSTRY_VALUE_DATA,
  INDUSTRY_ENGAGEMENT_DATA,
  INDUSTRIES_CONTACT_CTA_DATA,
  IndustryCardItem
} from '../data/industriesContent';

export const IndustriesPage: React.FC = () => {
  // Modal & Consultation States
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryCardItem | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Form State
  const renderIndustryIcon = (iconName: string, className = 'w-6 h-6') => {
    switch (iconName) {
      case 'factory':
        return <Factory className={className} />;
      case 'truck':
        return <Truck className={className} />;
      case 'boxes':
        return <Boxes className={className} />;
      case 'shopping-cart':
        return <ShoppingCart className={className} />;
      case 'cog':
        return <Cog className={className} />;
      case 'utensils':
        return <Utensils className={className} />;
      case 'pill':
        return <Pill className={className} />;
      case 'flask':
        return <FlaskConical className={className} />;
      default:
        return <Factory className={className} />;
    }
  };

  const renderValueIcon = (iconName: string) => {
    switch (iconName) {
      case 'cog':
        return <Cog className="w-6 h-6 text-white" />;
      case 'trending-up':
        return <TrendingUp className="w-6 h-6 text-white" />;
      case 'eye':
        return <Eye className="w-6 h-6 text-white" />;
      case 'bar-chart':
        return <BarChart3 className="w-6 h-6 text-white" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-white" />;
    }
  };

  const renderEngagementIcon = (iconName: string) => {
    switch (iconName) {
      case 'message-square':
        return <MessageSquare className="w-6 h-6 text-white" />;
      case 'line-chart':
        return <LineChart className="w-6 h-6 text-white" />;
      case 'lightbulb':
        return <Lightbulb className="w-6 h-6 text-white" />;
      case 'settings':
        return <Settings className="w-6 h-6 text-white" />;
      case 'user-check':
        return <UserCheck className="w-6 h-6 text-white" />;
      case 'trending-up':
        return <TrendingUp className="w-6 h-6 text-white" />;
      default:
        return <Sparkles className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="relative bg-white text-[#4A5876] selection:bg-blue-600 selection:text-white">
      {/* Background Decorative Ambient Glow matching About Page */}
      <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-48 h-80 opacity-25 pointer-events-none select-none hidden lg:block">
        <div className="w-full h-full bg-gradient-to-tr from-emerald-600/30 via-teal-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-10 pb-14 lg:pt-14 lg:pb-18 border-b border-white/10 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow */}
              <div className="inline-block">
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#E0A33B] select-none">
                  {INDUSTRIES_HERO_DATA.eyebrow}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="atlas-h1-size font-serif font-extrabold text-[#0A1B4F]">
                {INDUSTRIES_HERO_DATA.titleStart}{' '}
                <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">{INDUSTRIES_HERO_DATA.titleHighlight}</span>
              </h1>

              {/* Subheading / Description */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#4A5876] leading-relaxed max-w-2xl font-normal">
                {INDUSTRIES_HERO_DATA.description}
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-atlas-gold hover:bg-[#D4972F] !text-atlas-navy font-bold shadow-[0_4px_14px_rgba(224,163,59,0.35)] transition-all duration-200 cursor-pointer"
                >
                  <span>{INDUSTRIES_HERO_DATA.primaryCtaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0A1B4F] border border-slate-200/90 shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <span>{INDUSTRIES_HERO_DATA.secondaryCtaText}</span>
                </button>
              </div>
            </div>

            {/* Right Visual Column: Industrial Engineer with Floating Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
                <img
                  src={INDUSTRIES_HERO_DATA.heroImage}
                  alt="Industrial Operations Engineer with Digital Tablet"
                  className="w-full h-[400px] sm:h-[460px] lg:h-[490px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = '/images/crystal_hd/ind_manufacturing.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Top Right Card: Technology Solutions for Every Industry */}
                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200/90 max-w-[270px]">
                  <p className="text-[13px] font-bold text-[#0A1B4F] mb-3 leading-snug">
                    {INDUSTRIES_HERO_DATA.floatingTitle}
                  </p>
                  <div className="space-y-2">
                    {INDUSTRIES_HERO_DATA.floatingBadges.map((badge, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white border border-slate-100"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: badge.color }}
                        />
                        <span className="text-[12px] font-semibold text-slate-700">
                          {badge.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: SOLUTIONS DESIGNED AROUND YOUR INDUSTRY (8 CARDS)              */}
      {/* ========================================================================= */}
      <section id="industries-grid" className="py-16 lg:py-24 bg-white border-b border-slate-100 relative">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-5xl mx-auto mb-14 space-y-3">
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#E0A33B]">
              {INDUSTRIES_SECTION_HEADER.eyebrow}
            </span>
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              {INDUSTRIES_SECTION_HEADER.titleStart}{' '}
              <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">{INDUSTRIES_SECTION_HEADER.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#4A5876] leading-relaxed max-w-3xl mx-auto">
              {INDUSTRIES_SECTION_HEADER.description}
            </p>
          </div>

          {/* 8 Industry Cards Grid: 4 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {INDUSTRIES_CARDS_DATA.map((card) => {
              return (
                <div
                  key={card.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  style={{
                    border: `2px solid ${card.accentColor}`
                  }}
                >
                  <div>
                    {/* Card Image Banner */}
                    <div className="relative h-44 overflow-hidden bg-slate-100">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          if (card.fallbackCrop) {
                            e.currentTarget.src = card.fallbackCrop;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                      {/* Icon Badge Positioned at bottom-left of photo */}
                      <div
                        className="absolute bottom-3 left-4 w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md"
                        style={{ backgroundColor: card.accentColor }}
                      >
                        {renderIndustryIcon(card.iconName, 'w-5 h-5')}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <h3 className="text-[20px] font-bold text-[#0A1B4F] leading-snug group-hover:text-[#E0A33B] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-[14px] text-[#4A5876] leading-relaxed line-clamp-3">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Learn More Link + Circular Arrow */}
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedIndustry(card)}
                      className="text-[14px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      style={{ color: card.accentColor }}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => setSelectedIndustry(card)}
                      aria-label={`View ${card.title} details`}
                      className="w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer"
                      style={{
                        borderColor: card.accentColor,
                        color: card.accentColor
                      }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: INDUSTRY VALUE WE DELIVER (4 CARDS)                            */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-20 border-b border-white/10 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              {INDUSTRY_VALUE_DATA.titleStart}{' '}
              <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">{INDUSTRY_VALUE_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#4A5876] leading-relaxed">
              {INDUSTRY_VALUE_DATA.description}
            </p>
          </div>

          {/* 4 Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRY_VALUE_DATA.items.map((val) => (
              <div
                key={val.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
              >
                {/* Circular Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: val.color }}
                >
                  {renderValueIcon(val.iconName)}
                </div>

                {/* Text Content */}
                <div className="space-y-1">
                  <h3 className="text-[17px] font-bold text-[#0A1B4F] leading-snug">
                    {val.title}
                  </h3>
                  <p className="text-[13px] text-[#4A5876] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: OUR INDUSTRY ENGAGEMENT MODEL (6 CONNECTED STEPS)               */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              {INDUSTRY_ENGAGEMENT_DATA.titleStart}{' '}
              <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">{INDUSTRY_ENGAGEMENT_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#4A5876] leading-relaxed">
              {INDUSTRY_ENGAGEMENT_DATA.description}
            </p>
          </div>

          {/* 6 Connected Steps with Arrows */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-2">
            {INDUSTRY_ENGAGEMENT_DATA.steps.map((step, idx) => {
              const isLast = idx === INDUSTRY_ENGAGEMENT_DATA.steps.length - 1;
              return (
                <React.Fragment key={step.number}>
                  {/* Step Item */}
                  <div className="flex flex-col items-center text-center max-w-[180px] group">
                    {/* Circle Badge */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: step.color }}
                    >
                      {renderEngagementIcon(step.iconName)}
                    </div>

                    {/* Step Title */}
                    <h3 className="mt-4 text-[15px] font-bold text-[#0A1B4F] leading-tight group-hover:text-[#E0A33B] transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  {/* Connecting Arrow between steps (Desktop: horizontal, Mobile/Tablet: vertical arrow) */}
                  {!isLast && (
                    <div className="hidden lg:flex items-center justify-center text-[#E0A33B]/50 px-1">
                      <ArrowRight className="w-6 h-6 stroke-[2.5]" />
                    </div>
                  )}
                  {!isLast && (
                    <div className="flex lg:hidden items-center justify-center text-[#E0A33B]/50 py-2">
                      <div className="w-0.5 h-6 bg-blue-600/30" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: SIMPLE CONTACT CTA (RULE 9 - NO COMPLICATED FORMS)             */}
      {/* ========================================================================= */}
      <section className="py-12 lg:py-16 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-blue-200/90 p-8 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Subtext & Both Action Buttons */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#E0A33B] block">
                  {INDUSTRIES_CONTACT_CTA_DATA.eyebrow}
                </span>
                <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                  {INDUSTRIES_CONTACT_CTA_DATA.titleStart}{' '}
                  <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">{INDUSTRIES_CONTACT_CTA_DATA.titleHighlight}</span>
                </h2>
                
                <p className="text-[15px] sm:text-[16px] text-[#4A5876] leading-relaxed max-w-lg">
                  {INDUSTRIES_CONTACT_CTA_DATA.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setIsConsultationModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 rounded-xl bg-atlas-gold hover:bg-[#D4972F] !text-atlas-navy font-bold shadow-[0_4px_14px_rgba(224,163,59,0.35)] transition-all cursor-pointer"
                  >
                    <span>{INDUSTRIES_CONTACT_CTA_DATA.primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
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
      {/* MODAL 1: INDUSTRY DEEP DIVE MODAL                                          */}
      {/* ========================================================================= */}
      {selectedIndustry && (
        <Modal
          isOpen={!!selectedIndustry}
          onClose={() => setSelectedIndustry(null)}
          title={selectedIndustry.title}
        >
          <div className="space-y-6 text-left">
            <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={selectedIndustry.image}
                alt={selectedIndustry.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  if (selectedIndustry.fallbackCrop) {
                    e.currentTarget.src = selectedIndustry.fallbackCrop;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div
                className="absolute bottom-4 left-4 px-4 py-1.5 rounded-lg text-white font-bold text-sm flex items-center gap-2 shadow-md"
                style={{ backgroundColor: selectedIndustry.accentColor }}
              >
                {renderIndustryIcon(selectedIndustry.iconName, 'w-4 h-4')}
                <span>{selectedIndustry.title} Solution Architecture</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[18px] font-bold text-[#0A1B4F]">Industry Focus & Value</h4>
              <p className="text-[15px] text-[#40506a] leading-relaxed">
                {selectedIndustry.description}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-[16px] font-bold text-[#0A1B4F]">
                Key Capabilities & Modules
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedIndustry.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-100 text-slate-700 text-[14px]"
                  >
                    <CheckCircle2
                      className="w-4 h-4 shrink-0"
                      style={{ color: selectedIndustry.accentColor }}
                    />
                    <span className="font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[13px] text-slate-500">
                Ready to optimize your {selectedIndustry.title.toLowerCase()} operations?
              </p>
              <button
                onClick={() => {
                  setSelectedIndustry(null);
                  setIsConsultationModalOpen(true);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-atlas-gold hover:bg-[#D4972F] !text-atlas-navy font-bold shadow-[0_4px_14px_rgba(224,163,59,0.35)] font-semibold text-sm shadow-md transition-all cursor-pointer"
              >
                Book Industry Consultation
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* REUSABLE ENTERPRISE CONSULTATION MODAL */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        defaultService={selectedIndustry ? `Industry Assessment: ${selectedIndustry.title}` : "SAP Business One Implementation"}
        title="Book an Industry Consultation"
      />

    </div>
  );
};

export default IndustriesPage;
