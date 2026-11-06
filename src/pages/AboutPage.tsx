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
  Target,
  Eye,
  Gem,
  Factory,
  Truck,
  Ship,
  Building2,
  Layers,
  Handshake,
  Trophy,
  Sparkles,
  Settings,
  HeartHandshake,
  Headphones,
  Check
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ConsultationModal } from '../components/ui/ConsultationModal';
import { LeadershipSection } from '../components/about/LeadershipSection';
import { VerificationBadge } from '../components/ui/VerificationBadge';
import { JourneyTimeline } from '../components/about/JourneyTimeline';
import { BRAND_INFO } from '../data/websiteContent';
import {
  ABOUT_HERO_DATA,
  ABOUT_METRICS_DATA,
  OUR_STORY_DATA,
  MISSION_VISION_VALUES_DATA,
  ABOUT_EXPERTISE_DATA,
  ABOUT_INDUSTRIES_DATA,
  WHY_CHOOSE_ATLAS_DATA,
  JOURNEY_TIMELINE_DATA,
  ABOUT_CONTACT_CTA_DATA
} from '../data/aboutContent';
import { ImageFeatureSlider } from '../components/ui/ImageFeatureSlider';
import { cardImage, poolForSlug } from '../data/cardImagePools';

const industryIcons: Record<string, React.ReactNode> = {
  manufacturing: <Factory className="w-5 h-5 text-blue-600" />,
  warehouse: <Truck className="w-5 h-5 text-blue-600" />,
  finance: <Database className="w-5 h-5 text-[#1F4FE0]" />,
  trading: <Ship className="w-5 h-5 text-[#10b981]" />
};

export const AboutPage: React.FC = () => {
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
      {/* SECTION 1: ABOUT HERO SECTION                                             */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-white/10 bg-atlas-navy atlas-dark">

        {/* Soft subtle botanical ambient glow on far left */}
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-48 h-80 opacity-25 pointer-events-none select-none hidden lg:block">
          <div className="w-full h-full bg-gradient-to-tr from-emerald-600/30 via-teal-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Column (Approx 58% on Desktop) */}
            <div className="lg:col-span-7 space-y-5 text-left">
              {/* Eyebrow: 13–14px */}
              <div className="inline-block">
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1F4FE0] select-none">
                  {ABOUT_HERO_DATA.eyebrow} —
                </span>
              </div>

              {/* Main Heading: 46–54px desktop, 34–40px mobile */}
              <h1 className="atlas-h1-size font-serif font-extrabold text-[#0A1B4F]">
                {ABOUT_HERO_DATA.titleStart}{' '}
                <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">{ABOUT_HERO_DATA.titleHighlight}</span>
              </h1>

              {/* Supporting Text: 17–18px Desktop, 16px Mobile */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#4A5876] leading-relaxed max-w-2xl font-normal">
                {ABOUT_HERO_DATA.description}
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  href="#story"
                  variant="primary"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 shadow-md shadow-blue-500/25 bg-[#1F4FE0] hover:bg-blue-700 text-white rounded-lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  {ABOUT_HERO_DATA.primaryCtaText}
                </Button>

                <Button
                  href="#why-choose"
                  variant="secondary"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 bg-white text-[#0A1B4F] border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg shadow-sm"
                >
                  {ABOUT_HERO_DATA.secondaryCtaText}
                </Button>
              </div>
            </div>

            {/* Right Column: Modern Office Team Collaboration Visual with 4 Floating Pill Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-white">
                <img
                  src={ABOUT_HERO_DATA.imageSrc}
                  alt="ATLAS Technosoft Team Collaborating on Enterprise Solutions"
                  className="w-full h-auto object-cover max-h-[390px]"
                />

                {/* 4 Floating Information Cards Stacked on the Right Edge matching reference */}
                <div className="absolute top-3 right-3 bottom-3 flex flex-col justify-between gap-2 pointer-events-none">
                  {ABOUT_HERO_DATA.floatingCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-2.5 shadow-md border border-slate-200/90 flex items-center gap-2.5 w-[190px] sm:w-[210px]"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        card.color === 'blue' ? 'bg-blue-50 text-[#1F4FE0] border border-blue-200' :
                        card.color === 'purple' ? 'bg-blue-50 text-[#1F4FE0] border border-blue-200' :
                        card.color === 'emerald' ? 'bg-emerald-50 text-[#10b981] border border-emerald-200' :
                        'bg-blue-50 text-[#1F4FE0] border border-blue-200'
                      }`}>
                        {card.iconName === 'Users' && <Users className="w-4 h-4" />}
                        {card.iconName === 'Cog' && <Cog className="w-4 h-4" />}
                        {card.iconName === 'Cpu' && <Cpu className="w-4 h-4" />}
                        {card.iconName === 'TrendingUp' && <TrendingUp className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[12px] sm:text-[13px] font-bold text-[#0A1B4F] block leading-tight truncate">
                          {card.title}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-slate-500 block leading-tight truncate">
                          {card.subtitle}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: COMPANY METRICS BAR (4 VISUALLY SEPARATED CARDS)               */}
      {/* ========================================================================= */}
      <section id="metrics" className="py-6 sm:py-8 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-sm p-4 sm:p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {ABOUT_METRICS_DATA.map((metric) => (
                <div key={metric.id} className="flex flex-col items-center text-center p-3 sm:p-4">
                  
                  {/* Colored Icon Circle */}
                  <div className={`w-11 h-11 rounded-full border flex items-center justify-center mb-2.5 mx-auto ${
                    metric.color === 'blue' ? 'bg-blue-50 border-blue-200 text-[#1F4FE0]' :
                    metric.color === 'green' ? 'bg-emerald-50 border-emerald-200 text-[#10b981]' :
                    metric.color === 'purple' ? 'bg-blue-50 border-blue-200 text-[#1F4FE0]' :
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
                    metric.color === 'purple' ? 'text-[#1F4FE0]' :
                    'text-[#1F4FE0]'
                  }`}>
                    <AnimatedCounter value={metric.value} />
                  </div>

                  {/* Bold Label */}
                  <div className="text-[15px] sm:text-[16px] font-bold text-[#0A1B4F] leading-snug">
                    {metric.label}
                  </div>

                  {/* Small Supporting Description */}
                  <div className="text-[12px] sm:text-[13px] text-slate-500 leading-snug mt-0.5">
                    {metric.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: OUR STORY                                                      */}
      {/* ========================================================================= */}
      <section id="story" className="py-12 sm:py-16 lg:py-20 border-b border-white/10 bg-atlas-navy atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Team Collaboration Image with Floating Overlay Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-white">
                <img
                  src={OUR_STORY_DATA.imageSrc}
                  alt="ATLAS Technosoft Leadership and Project Team Collaborating"
                  className="w-full h-auto object-cover max-h-[420px]"
                />

                {/* Floating Overlay Card in Bottom Left matching reference screenshot */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-lg border border-slate-200/90 flex items-center gap-3.5 max-w-[210px]">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    {OUR_STORY_DATA.overlayCardItems.map((item, idx) => (
                      <div key={idx} className="text-[12px] sm:text-[13px] font-bold text-[#0A1B4F] leading-tight">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Story Copy & CTA */}
            <div className="lg:col-span-6 space-y-5 text-left relative">
              <div>
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1F4FE0] block mb-2">
                  {OUR_STORY_DATA.eyebrow} —
                </span>
                <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                  {OUR_STORY_DATA.titleStart}{' '}
                  <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">{OUR_STORY_DATA.titleHighlight}</span>
                </h2>
              </div>

              {OUR_STORY_DATA.paragraphs.map((p, idx) => (
                <p key={idx} className="text-[16px] sm:text-[17px] text-[#4A5876] leading-relaxed">
                  {p}
                </p>
              ))}

              <div className="pt-2">
                <Button
                  href="#journey"
                  variant="primary"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 shadow-md shadow-blue-500/25 bg-[#1F4FE0] hover:bg-blue-700 text-white rounded-lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  {OUR_STORY_DATA.ctaText}
                </Button>
              </div>

              {/* Decorative Dot Matrix on Bottom Right */}
              <div className="absolute -bottom-6 right-0 pointer-events-none hidden sm:block opacity-30">
                <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {[0, 1, 2, 3, 4, 5].map((row) =>
                    [0, 1, 2, 3, 4, 5].map((col) => (
                      <circle key={`${row}-${col}`} cx={col * 16 + 4} cy={row * 16 + 4} r="2" fill="#1F4FE0" />
                    ))
                  )}
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: MISSION, VISION & VALUES ("WHAT DRIVES US FORWARD")             */}
      {/* ========================================================================= */}
      <section id="mission-values" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-100 relative">
        <span id="values" className="absolute -top-24 opacity-0 pointer-events-none" />
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Left Intro Column */}
            <div className="lg:col-span-3 space-y-3 flex flex-col justify-center text-left">
              <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1F4FE0] block">
                {MISSION_VISION_VALUES_DATA.eyebrow}
              </span>
              <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                {MISSION_VISION_VALUES_DATA.titleStart}{' '}
                <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">{MISSION_VISION_VALUES_DATA.titleHighlight}</span>
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#4A5876] leading-relaxed">
                {MISSION_VISION_VALUES_DATA.intro}
              </p>
            </div>

            {/* Right 3 Cards Column with authentic soft pastel colors */}
            <div className="lg:col-span-9">
              <ImageFeatureSlider
                layout="grid"
                perView={3}
                ariaLabel="Mission, vision and values"
                items={[
                  {
                    title: MISSION_VISION_VALUES_DATA.mission.title,
                    description: MISSION_VISION_VALUES_DATA.mission.description,
                    image: cardImage('people', 4),
                  },
                  {
                    title: MISSION_VISION_VALUES_DATA.vision.title,
                    description: MISSION_VISION_VALUES_DATA.vision.description,
                    image: cardImage('technology', 4),
                  },
                  {
                    title: MISSION_VISION_VALUES_DATA.values.title,
                    bullets: MISSION_VISION_VALUES_DATA.values.items,
                    image: cardImage('people', 6),
                  },
                ]}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: OUR EXPERTISE                                                  */}
      {/* ========================================================================= */}
      <section id="expertise" className="py-12 sm:py-16 lg:py-20 border-b border-white/10 bg-atlas-navy atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div>
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1F4FE0] block mb-2">
                  {ABOUT_EXPERTISE_DATA.eyebrow}
                </span>
                <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                  {ABOUT_EXPERTISE_DATA.titleStart}{' '}
                  <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">{ABOUT_EXPERTISE_DATA.titleHighlight}</span>
                </h2>
              </div>

              <p className="text-[16px] sm:text-[17px] text-[#4A5876] leading-relaxed">
                {ABOUT_EXPERTISE_DATA.description}
              </p>

              {/* Checklist */}
              <div className="space-y-3 pt-1">
                {ABOUT_EXPERTISE_DATA.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[15px] sm:text-[16px] text-slate-800 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  href="#industries"
                  variant="primary"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 shadow-md shadow-blue-500/25 bg-[#1F4FE0] hover:bg-blue-700 text-white rounded-lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  {ABOUT_EXPERTISE_DATA.ctaText}
                </Button>
              </div>
            </div>

            {/* Right Visual: High-Tech SAP Ecosystem Hub Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-800 bg-atlas-navy max-h-[380px]">
                <img
                  src={ABOUT_EXPERTISE_DATA.imageSrc}
                  alt="ATLAS Technosoft SAP Business One and Intelligent Automation Ecosystem"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: INDUSTRIES WE SERVE                                            */}
      {/* ========================================================================= */}
      <section id="industries" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1F4FE0] select-none block mb-2">
              INDUSTRIES WE SERVE
            </span>
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              Delivering Tailored Solutions Across <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">Industries</span>
            </h2>
            <p className="mt-3.5 text-[16px] sm:text-[17px] text-[#4A5876] leading-relaxed">
              We understand your industry challenges and deliver tailored solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {ABOUT_INDUSTRIES_DATA.map((ind) => (
              <div
                key={ind.id}
                className={`group flex flex-col justify-between rounded-xl bg-white border-2 ${ind.borderClass} ${ind.hoverBorderClass} overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 h-full`}
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
                <div className="p-3.5 sm:p-4 flex-1 flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="shrink-0">
                        {industryIcons[ind.id]}
                      </div>
                      <h3 className="text-[17px] sm:text-[18px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {ind.title}
                      </h3>
                    </div>
                    <p className="text-[13px] sm:text-[14px] text-slate-600 leading-snug">
                      {ind.description}
                    </p>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className={`w-7 h-7 rounded-full border ${ind.arrowBorderClass} flex items-center justify-center shrink-0 transition-all duration-200 shadow-sm`}>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: WHY CHOOSE ATLAS TECHNOSOFT                                    */}
      {/* ========================================================================= */}
      <section id="why-choose" className="py-12 sm:py-16 lg:py-20 border-b border-white/10 bg-atlas-navy atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <div>
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1F4FE0] block mb-2">
                  {WHY_CHOOSE_ATLAS_DATA.eyebrow}
                </span>
                <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                  {WHY_CHOOSE_ATLAS_DATA.titleStart}{' '}
                  <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">{WHY_CHOOSE_ATLAS_DATA.titleHighlight}</span>
                </h2>
              </div>

              <p className="text-[16px] sm:text-[17px] text-[#4A5876] leading-relaxed">
                {WHY_CHOOSE_ATLAS_DATA.description}
              </p>

              <div className="pt-2">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="primary"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 shadow-md shadow-blue-500/25 bg-[#1F4FE0] hover:bg-blue-700 text-white rounded-lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  {WHY_CHOOSE_ATLAS_DATA.ctaText}
                </Button>
              </div>
            </div>

            {/* Right 2x2 Feature Cards Grid */}
            <div className="lg:col-span-7">
              <ImageFeatureSlider
                layout="grid"
                perView={2}
                ariaLabel="Why choose ATLAS Technosoft"
                items={WHY_CHOOSE_ATLAS_DATA.features.map((feat, idx) => ({
                  title: feat.title,
                  description: feat.description,
                  image: cardImage('people', idx),
                }))}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7.5: LEADERSHIP & EXPERT TEAM                                     */}
      {/* ========================================================================= */}
      <LeadershipSection />

      {/* ========================================================================= */}
      {/* SECTION 8: OUR JOURNEY — MILESTONES THAT DEFINE US                         */}
      {/* ========================================================================= */}
      <JourneyTimeline />

      {/* ========================================================================= */}
      {/* SECTION 9: CONTACT CTA ("LET'S WORK TOGETHER")                             */}
      {/* ========================================================================= */}
      <section id="contact-cta" className="py-10 sm:py-12 lg:py-14 bg-atlas-navy atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-blue-200/90 p-8 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Subtext & Both Action Buttons */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#1F4FE0] block">
                  {ABOUT_CONTACT_CTA_DATA.eyebrow}
                </span>
                <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                  {ABOUT_CONTACT_CTA_DATA.titleStart}{' '}
                  <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">{ABOUT_CONTACT_CTA_DATA.titleHighlight}</span>
                </h2>
                
                <p className="text-[15px] sm:text-[16px] text-[#4A5876] leading-relaxed max-w-lg">
                  {ABOUT_CONTACT_CTA_DATA.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="primary"
                    size="lg"
                    className="text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-md shadow-blue-500/25 bg-gradient-to-r from-[#1F4FE0] to-[#1F4FE0] hover:from-[#1739B8] hover:to-[#1739B8] text-white rounded-xl"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    {ABOUT_CONTACT_CTA_DATA.buttonText}
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

