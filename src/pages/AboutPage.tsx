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
import { Modal } from '../components/ui/Modal';
import { VerificationBadge } from '../components/ui/VerificationBadge';
import { JourneyTimeline } from '../components/about/JourneyTimeline';
import { BRAND_INFO } from '../data/websiteContent';
import { ContactFormData } from '../types';
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

const industryIcons: Record<string, React.ReactNode> = {
  manufacturing: <Factory className="w-5 h-5 text-blue-600" />,
  warehouse: <Truck className="w-5 h-5 text-blue-600" />,
  finance: <Database className="w-5 h-5 text-[#0066CC]" />,
  trading: <Ship className="w-5 h-5 text-[#10b981]" />
};

export const AboutPage: React.FC = () => {
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    companyName: '',
    workEmail: '',
    phoneNumber: '',
    areaOfInterest: 'sap-b1',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.companyName.trim()) errors.companyName = 'Company name is required';
    if (!formData.workEmail.trim()) {
      errors.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      errors.workEmail = 'Please provide a valid work email address';
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^[+0-9\s-]{8,15}$/.test(formData.phoneNumber.trim())) {
      errors.phoneNumber = 'Please provide a valid phone number';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please briefly outline your process or requirements';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ContactFormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessSubmitted(true);
    }, 400);
  };

  const generateMailtoLink = (data: ContactFormData) => {
    const subject = encodeURIComponent(`Consultation Booking via About Us: ${data.companyName}`);
    const body = encodeURIComponent(
      `Dear ATLAS Technosoft Team,\n\n` +
      `I would like to book a consultation regarding ${data.areaOfInterest}.\n\n` +
      `Contact Details:\n` +
      `• Name: ${data.fullName}\n` +
      `• Company: ${data.companyName}\n` +
      `• Work Email: ${data.workEmail}\n` +
      `• Phone/WhatsApp: ${data.phoneNumber}\n\n` +
      `Requirements / Message:\n${data.message}\n\n` +
      `Submitted via ATLAS Technosoft Website (About Us Page).`
    );
    return `mailto:${BRAND_INFO.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative bg-white text-[#45546B] selection:bg-blue-600 selection:text-white">

      {/* ========================================================================= */}
      {/* SECTION 1: ABOUT HERO SECTION                                             */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#fffbf4] via-[#fdfcf9] to-[#f4f8fe] pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-slate-100">

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
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] select-none">
                  {ABOUT_HERO_DATA.eyebrow} —
                </span>
              </div>

              {/* Main Heading: 46–54px desktop, 34–40px mobile */}
              <h1 className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] xl:text-[52px] font-bold tracking-tight leading-[1.14] text-[#142B59]">
                {ABOUT_HERO_DATA.titleStart}{' '}
                <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{ABOUT_HERO_DATA.titleHighlight}</span>
              </h1>

              {/* Supporting Text: 17–18px Desktop, 16px Mobile */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#45546B] leading-relaxed max-w-2xl font-normal">
                {ABOUT_HERO_DATA.description}
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  href="#story"
                  variant="primary"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 shadow-md shadow-blue-500/25 bg-[#0878f9] hover:bg-blue-700 text-white rounded-lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  {ABOUT_HERO_DATA.primaryCtaText}
                </Button>

                <Button
                  href="#why-choose"
                  variant="secondary"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 bg-white text-[#142B59] border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg shadow-sm"
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
                        card.color === 'blue' ? 'bg-blue-50 text-[#0878f9] border border-blue-200' :
                        card.color === 'purple' ? 'bg-blue-50 text-[#0066CC] border border-blue-200' :
                        card.color === 'emerald' ? 'bg-emerald-50 text-[#10b981] border border-emerald-200' :
                        'bg-blue-50 text-[#0066CC] border border-blue-200'
                      }`}>
                        {card.iconName === 'Users' && <Users className="w-4 h-4" />}
                        {card.iconName === 'Cog' && <Cog className="w-4 h-4" />}
                        {card.iconName === 'Cpu' && <Cpu className="w-4 h-4" />}
                        {card.iconName === 'TrendingUp' && <TrendingUp className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[12px] sm:text-[13px] font-bold text-[#142B59] block leading-tight truncate">
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
                    metric.color === 'blue' ? 'bg-blue-50 border-blue-200 text-[#0878f9]' :
                    metric.color === 'green' ? 'bg-emerald-50 border-emerald-200 text-[#10b981]' :
                    metric.color === 'purple' ? 'bg-blue-50 border-blue-200 text-[#0066CC]' :
                    'bg-blue-50 border-blue-200 text-[#0066CC]'
                  }`}>
                    {metric.iconName === 'Users' && <Users className="w-5 h-5" />}
                    {metric.iconName === 'TrendingUp' && <TrendingUp className="w-5 h-5" />}
                    {metric.iconName === 'Database' && <Database className="w-5 h-5" />}
                    {metric.iconName === 'Award' && <Award className="w-5 h-5" />}
                  </div>

                  {/* Metric Numeric Value */}
                  <div className={`text-[32px] sm:text-[36px] lg:text-[40px] font-extrabold tracking-tight leading-none mb-1 ${
                    metric.color === 'blue' ? 'text-[#0878f9]' :
                    metric.color === 'green' ? 'text-[#10b981]' :
                    metric.color === 'purple' ? 'text-[#0066CC]' :
                    'text-[#0066CC]'
                  }`}>
                    {metric.value}
                  </div>

                  {/* Bold Label */}
                  <div className="text-[15px] sm:text-[16px] font-bold text-[#142B59] leading-snug">
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
      <section id="story" className="py-12 sm:py-16 lg:py-20 bg-slate-50/50 border-b border-slate-100">
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
                      <div key={idx} className="text-[12px] sm:text-[13px] font-bold text-[#142B59] leading-tight">
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
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] block mb-2">
                  {OUR_STORY_DATA.eyebrow} —
                </span>
                <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#142B59] tracking-tight leading-tight">
                  {OUR_STORY_DATA.titleStart}{' '}
                  <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{OUR_STORY_DATA.titleHighlight}</span>
                </h2>
              </div>

              {OUR_STORY_DATA.paragraphs.map((p, idx) => (
                <p key={idx} className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed">
                  {p}
                </p>
              ))}

              <div className="pt-2">
                <Button
                  href="#journey"
                  variant="primary"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 shadow-md shadow-blue-500/25 bg-[#0878f9] hover:bg-blue-700 text-white rounded-lg"
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
                      <circle key={`${row}-${col}`} cx={col * 16 + 4} cy={row * 16 + 4} r="2" fill="#0878f9" />
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
      <section id="mission-values" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Left Intro Column */}
            <div className="lg:col-span-3 space-y-3 flex flex-col justify-center text-left">
              <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] block">
                {MISSION_VISION_VALUES_DATA.eyebrow}
              </span>
              <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#142B59] tracking-tight leading-tight">
                {MISSION_VISION_VALUES_DATA.titleStart}{' '}
                <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{MISSION_VISION_VALUES_DATA.titleHighlight}</span>
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed">
                {MISSION_VISION_VALUES_DATA.intro}
              </p>
            </div>

            {/* Right 3 Cards Column with authentic soft pastel colors */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              
              {/* Card 1: Our Mission */}
              <div className="p-6 rounded-2xl bg-[#eff6ff] border border-blue-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-[#0878f9] flex items-center justify-center mb-4">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-[20px] sm:text-[22px] font-bold text-[#142B59] mb-2.5">
                    {MISSION_VISION_VALUES_DATA.mission.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#45546B] leading-relaxed">
                    {MISSION_VISION_VALUES_DATA.mission.description}
                  </p>
                </div>
              </div>

              {/* Card 2: Our Vision */}
              <div className="p-6 rounded-2xl bg-[#f4f9ff] border border-blue-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-[#0066CC] flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-[20px] sm:text-[22px] font-bold text-[#142B59] mb-2.5">
                    {MISSION_VISION_VALUES_DATA.vision.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#45546B] leading-relaxed">
                    {MISSION_VISION_VALUES_DATA.vision.description}
                  </p>
                </div>
              </div>

              {/* Card 3: Our Values */}
              <div className="p-6 rounded-2xl bg-[#f0fdf4] border border-emerald-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-[#10b981] flex items-center justify-center mb-4">
                    <Gem className="w-6 h-6" />
                  </div>
                  <h3 className="text-[20px] sm:text-[22px] font-bold text-[#142B59] mb-3">
                    {MISSION_VISION_VALUES_DATA.values.title}
                  </h3>
                  <ul className="space-y-2">
                    {MISSION_VISION_VALUES_DATA.values.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[14px] sm:text-[15px] text-[#45546B]">
                        <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: OUR EXPERTISE                                                  */}
      {/* ========================================================================= */}
      <section id="expertise" className="py-12 sm:py-16 lg:py-20 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div>
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] block mb-2">
                  {ABOUT_EXPERTISE_DATA.eyebrow}
                </span>
                <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#142B59] tracking-tight leading-tight">
                  {ABOUT_EXPERTISE_DATA.titleStart}{' '}
                  <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{ABOUT_EXPERTISE_DATA.titleHighlight}</span>
                </h2>
              </div>

              <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed">
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
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 shadow-md shadow-blue-500/25 bg-[#0878f9] hover:bg-blue-700 text-white rounded-lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  {ABOUT_EXPERTISE_DATA.ctaText}
                </Button>
              </div>
            </div>

            {/* Right Visual: High-Tech SAP Ecosystem Hub Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-800 bg-[#070D1E] max-h-[380px]">
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
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] select-none block mb-2">
              INDUSTRIES WE SERVE
            </span>
            <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#142B59] tracking-tight leading-tight">
              Delivering Tailored Solutions Across <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">Industries</span>
            </h2>
            <p className="mt-3.5 text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed">
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
      <section id="why-choose" className="py-12 sm:py-16 lg:py-20 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <div>
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] block mb-2">
                  {WHY_CHOOSE_ATLAS_DATA.eyebrow}
                </span>
                <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#142B59] tracking-tight leading-tight">
                  {WHY_CHOOSE_ATLAS_DATA.titleStart}{' '}
                  <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{WHY_CHOOSE_ATLAS_DATA.titleHighlight}</span>
                </h2>
              </div>

              <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed">
                {WHY_CHOOSE_ATLAS_DATA.description}
              </p>

              <div className="pt-2">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="primary"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 shadow-md shadow-blue-500/25 bg-[#0878f9] hover:bg-blue-700 text-white rounded-lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  {WHY_CHOOSE_ATLAS_DATA.ctaText}
                </Button>
              </div>
            </div>

            {/* Right 2x2 Feature Cards Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {WHY_CHOOSE_ATLAS_DATA.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-start gap-4"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    feat.color === 'blue' ? 'bg-blue-50 text-[#0878f9] border border-blue-200' :
                    feat.color === 'purple' ? 'bg-blue-50 text-[#0066CC] border border-blue-200' :
                    'bg-emerald-50 text-[#10b981] border border-emerald-200'
                  }`}>
                    {feat.iconName === 'Users' && <Users className="w-5 h-5" />}
                    {feat.iconName === 'Settings' && <Settings className="w-5 h-5" />}
                    {feat.iconName === 'HeartHandshake' && <HeartHandshake className="w-5 h-5" />}
                    {feat.iconName === 'Headphones' && <Headphones className="w-5 h-5" />}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[17px] sm:text-[18px] font-bold text-[#142B59] mb-1 leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-slate-600 leading-snug">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: OUR JOURNEY — MILESTONES THAT DEFINE US                         */}
      {/* ========================================================================= */}
      <JourneyTimeline />

      {/* ========================================================================= */}
      {/* SECTION 9: CONTACT CTA ("LET'S WORK TOGETHER")                             */}
      {/* ========================================================================= */}
      <section id="contact-cta" className="py-10 sm:py-12 lg:py-14 bg-slate-50/50">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-2xl sm:rounded-3xl bg-[#eaf4ff] border border-blue-200/90 p-8 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Subtext & Both Action Buttons */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#1B72E8] block">
                  {ABOUT_CONTACT_CTA_DATA.eyebrow}
                </span>
                <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#142B59] tracking-tight leading-[1.18]">
                  {ABOUT_CONTACT_CTA_DATA.titleStart}{' '}
                  <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{ABOUT_CONTACT_CTA_DATA.titleHighlight}</span>
                </h2>
                
                <p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed max-w-lg">
                  {ABOUT_CONTACT_CTA_DATA.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="primary"
                    size="lg"
                    className="text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-md shadow-blue-500/25 bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white rounded-xl"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    {ABOUT_CONTACT_CTA_DATA.buttonText}
                  </Button>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center font-semibold rounded-xl px-6 py-3.5 text-[15px] sm:text-[16px] bg-white text-[#142B59] hover:bg-slate-50 border border-slate-300 shadow-sm transition-colors"
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
      {/* INTERACTIVE CONSULTATION BOOKING MODAL                                    */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsSuccessSubmitted(false);
        }}
        title="Book a Consultation with ATLAS Technosoft"
      >
        {!isSuccessSubmitted ? (
          <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
            <p className="text-[14px] text-slate-600 mb-2">
              Speak directly with certified SAP Business One, Boyum IT, and UiPath RPA experts.
            </p>

            <div>
              <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g. Rajesh Sharma"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                  formErrors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
              />
              {formErrors.fullName && <p className="mt-1 text-xs text-rose-600">{formErrors.fullName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="companyName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Company Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. Apex Manufacturing Ltd"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    formErrors.companyName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                />
                {formErrors.companyName && <p className="mt-1 text-xs text-rose-600">{formErrors.companyName}</p>}
              </div>

              <div>
                <label htmlFor="workEmail" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Work Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  id="workEmail"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  placeholder="e.g. rajesh@apex.com"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    formErrors.workEmail ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                />
                {formErrors.workEmail && <p className="mt-1 text-xs text-rose-600">{formErrors.workEmail}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phoneNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 98200 12345"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    formErrors.phoneNumber ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                />
                {formErrors.phoneNumber && <p className="mt-1 text-xs text-rose-600">{formErrors.phoneNumber}</p>}
              </div>

              <div>
                <label htmlFor="areaOfInterest" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Area of Interest
                </label>
                <select
                  id="areaOfInterest"
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="sap-b1">SAP Business One Implementation</option>
                  <option value="boyum">Boyum IT Solutions (Beas / WMS)</option>
                  <option value="uipath-rpa">UiPath RPA & Automation</option>
                  <option value="atlas-addons">ATLAS Proprietary Add-ons</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Requirements / Goals <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Briefly describe your process bottlenecks or ERP requirements..."
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                  formErrors.message ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
              />
              {formErrors.message && <p className="mt-1 text-xs text-rose-600">{formErrors.message}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSubmitting}
              icon={isSubmitting ? undefined : <Send className="w-4 h-4" />}
            >
              {isSubmitting ? 'Validating...' : 'Submit Consultation Request'}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">Consultation Details Validated!</strong>
                Your details are validated. You can send this directly via Email or WhatsApp to ATLAS Technosoft.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div><strong>Name:</strong> {formData.fullName}</div>
              <div><strong>Company:</strong> {formData.companyName}</div>
              <div><strong>Work Email:</strong> {formData.workEmail}</div>
              <div><strong>Phone:</strong> {formData.phoneNumber}</div>
              <div><strong>Message:</strong> {formData.message}</div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={generateMailtoLink(formData)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Open Email Draft</span>
              </a>

              <a
                href={`https://wa.me/919372329599?text=${encodeURIComponent(
                  `Hello ATLAS Technosoft, I submitted a consultation request for ${formData.companyName}. Name: ${formData.fullName}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </Modal>

      {/* Floating Scroll-to-Top Button */}
      /* Global scroll-to-top handled by SiteLayout */

    </div>
  );
};

