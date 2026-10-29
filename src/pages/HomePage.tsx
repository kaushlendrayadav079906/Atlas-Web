import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Layers, 
  TrendingUp, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Sparkles, 
  Workflow, 
  Bot, 
  BrainCircuit, 
  Clock, 
  Award,
  ChevronRight,
  Send,
  AlertTriangle,
  Building2,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { MetricCard } from '../components/ui/MetricCard';
import { SolutionCard } from '../components/ui/SolutionCard';
import { IndustryCard } from '../components/ui/IndustryCard';
import { ProcessStep } from '../components/ui/ProcessStep';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { VerificationBadge } from '../components/ui/VerificationBadge';
import { Modal } from '../components/ui/Modal';
import { 
  BRAND_INFO, 
  PARTNER_STATEMENTS, 
  TRUST_METRICS, 
  SOLUTIONS_DATA, 
  EXPERTISE_PILLARS, 
  INDUSTRY_SOLUTIONS, 
  IMPLEMENTATION_STEPS, 
  TESTIMONIALS, 
  CASE_STUDY_HIGHLIGHTS,
  CONSULTATION_BENEFITS
} from '../data/websiteContent';
import { ContactFormData } from '../types';

export const HomePage: React.FC = () => {
  // Contact Form State
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
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [validatedData, setValidatedData] = useState<ContactFormData | null>(null);

  // Form Field Validation
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!formData.companyName.trim()) {
      errors.companyName = 'Company name is required';
    }

    if (!formData.workEmail.trim()) {
      errors.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      errors.workEmail = 'Please provide a valid work email address';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^[+0-9\s-]{8,15}$/.test(formData.phoneNumber.trim())) {
      errors.phoneNumber = 'Please provide a valid phone number (8-15 digits)';
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

    // Phase 1 frontend demonstration behavior:
    // Strictly does not mock a backend submission; validates inputs and presents email draft / WhatsApp action.
    setTimeout(() => {
      setIsSubmitting(false);
      setValidatedData({ ...formData });
      setIsSuccessModalOpen(true);
    }, 400);
  };

  // Generate Mailto draft link from validated inputs
  const generateMailtoLink = (data: ContactFormData) => {
    const subject = encodeURIComponent(`Consultation Request: ${data.companyName} - ${data.areaOfInterest.toUpperCase()}`);
    const body = encodeURIComponent(
      `Dear ATLAS Technosoft Team,\n\n` +
      `I would like to request a Free Hyperautomation Health Check / Consultation.\n\n` +
      `Contact Details:\n` +
      `• Name: ${data.fullName}\n` +
      `• Company: ${data.companyName}\n` +
      `• Work Email: ${data.workEmail}\n` +
      `• Phone/WhatsApp: ${data.phoneNumber}\n` +
      `• Area of Interest: ${data.areaOfInterest}\n\n` +
      `Requirements / Message:\n${data.message}\n\n` +
      `Submitted via ATLAS Technosoft Website.`
    );
    return `mailto:${BRAND_INFO.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative">
      {/* ========================================================================= */}
      {/* SECTION A & B: HERO SECTION                                               */}
      {/* ========================================================================= */}
      <section className="relative bg-navy-950 text-white overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Background Visual Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-glow pointer-events-none" />
        <div className="absolute -top-24 right-10 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-accent-cyan/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines, Partner Badges & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Partner Badges Ribbon */}
              <div className="inline-flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-navy-900/90 border border-navy-800 shadow-sm text-xs">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-900/50 text-accent-cyan font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Authorized SAP Channel Partner
                </span>
                <span className="hidden sm:inline text-navy-700">•</span>
                <span className="px-2 py-1 text-slate-300 font-medium">Boyum IT Silver Partner</span>
                <span className="hidden sm:inline text-navy-700">•</span>
                <span className="px-2 py-1 text-slate-300 font-medium">UiPath Silver Partner</span>
              </div>

              {/* Main Headline from PDF */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.12]">
                Where <span className="text-white">SAP Business One</span> Meets{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-sky-300 to-brand-400">
                  Intelligent Automation
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg font-semibold text-brand-300 leading-snug">
                {BRAND_INFO.subTagline}
              </p>

              {/* Supporting Value Proposition from PDF */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                ATLAS Technosoft helps manufacturing, logistics, pharma, and trading companies{' '}
                <strong className="text-white font-semibold">eliminate up to 70% manual work</strong>,{' '}
                <strong className="text-white font-semibold">gain real-time visibility</strong>, and{' '}
                <strong className="text-white font-semibold">achieve measurable ROI in 4–6 months</strong>{' '}
                using SAP Business One, Boyum IT add-ons, UiPath RPA, and AI-driven automation.
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  href="#contact"
                  variant="cyan"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Get a Free Hyperautomation Health Check
                </Button>

                <Button
                  href="#solutions"
                  variant="secondary"
                  size="lg"
                  icon={<ChevronRight className="w-5 h-5" />}
                >
                  View Our Solutions
                </Button>
              </div>

              {/* Partner Statements & Trust Proof */}
              <div className="pt-6 border-t border-navy-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                  <span>3-Year AI Maturity Roadmap Included</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                  <span>Readiness Score in 48 Hours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                  <span>Zero Sales Fluff</span>
                </div>
              </div>
            </div>

            {/* Right Column: Connected Systems Enterprise Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-md lg:max-w-none rounded-2xl bg-gradient-to-b from-navy-900 to-navy-950 p-6 sm:p-7 border border-navy-800 shadow-2xl overflow-hidden">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 border-b border-navy-800/80 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-slate-400">ATLAS Intelligent Ecosystem</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30">
                    Live Telemetry
                  </span>
                </div>

                {/* Architecture Convergence Diagram */}
                <div className="space-y-3.5">
                  {/* Central Node: SAP Business One */}
                  <div className="p-4 rounded-xl bg-navy-950/90 border border-brand-500/40 shadow-inner flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-brand-600/30 text-accent-cyan">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">SAP Business One (HANA / SQL)</div>
                        <div className="text-xs text-slate-400">Single Source of Enterprise Truth</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Core ERP
                    </span>
                  </div>

                  {/* Connected Child 1: Boyum IT */}
                  <div className="p-3.5 rounded-xl bg-navy-900/70 border border-navy-800 flex items-center justify-between hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">Boyum IT Suite (Beas + Produmex)</div>
                        <div className="text-[11px] text-slate-400">Shop-Floor APS & Barcode WMS</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">99.9% Pick</span>
                  </div>

                  {/* Connected Child 2: UiPath RPA */}
                  <div className="p-3.5 rounded-xl bg-navy-900/70 border border-navy-800 flex items-center justify-between hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent-cyan/20 text-accent-cyan">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">UiPath RPA & Document AI</div>
                        <div className="text-[11px] text-slate-400">Touchless Invoicing & AP/AR Reconciliations</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-accent-cyan font-mono">-70% Manual</span>
                  </div>

                  {/* Connected Child 3: ATLAS AI Add-ons */}
                  <div className="p-3.5 rounded-xl bg-navy-900/70 border border-navy-800 flex items-center justify-between hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                        <BrainCircuit className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">ATLAS AI-Ready Suite</div>
                        <div className="text-[11px] text-slate-400">Computer Vision Weighbridge & Stock Predictor</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-purple-300 font-mono">Real-time</span>
                  </div>
                </div>

                {/* Real Executive Dashboard Preview Teaser */}
                <div className="mt-5 pt-4 border-t border-navy-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent-cyan" />
                    <span>Real-time CXO Command Center</span>
                  </div>
                  <span className="text-[11px] text-slate-400">40% Faster Close</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION C: TRUST AND IMPACT METRICS                                       */}
      {/* ========================================================================= */}
      <section className="relative bg-navy-900 py-12 border-y border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan block">
                Quantified Track Record
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Proven Enterprise Results across India & Global SMEs
              </h2>
            </div>
            <VerificationBadge
              note="All figures are extracted directly from ATPL WEB Site_Content.pdf and flagged for legal verification before commercial production release."
              variant="subtle"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_METRICS.map((metric) => (
              <MetricCard key={metric.id} metric={metric} theme="dark" />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION D: WHAT WE DO (SOLUTIONS SECTION - 6 CARDS)                       */}
      {/* ========================================================================= */}
      <section id="solutions" className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Solutions Portfolio"
            title="Enterprise ERP & Hyperautomation Architecture"
            subtitle="Built on SAP Business One. Powered by certified Boyum IT modules and UiPath AI robots to convert routine tasks into autonomous operations."
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOLUTIONS_DATA.map((solution) => (
              <SolutionCard key={solution.id} solution={solution} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION E: EXPERTISE AND BUSINESS OUTCOMES                                */}
      {/* ========================================================================= */}
      <section id="expertise" className="py-20 md:py-28 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Ecosystem Convergence"
            title="How SAP B1, Boyum IT, UiPath & AI Work Together"
            subtitle="Most providers deliver isolated software tools. ATLAS integrates the four critical layers into a unified autonomous business engine."
            align="center"
            theme="dark"
          />

          {/* 4 Architectural Convergence Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {EXPERTISE_PILLARS.map((pillar, idx) => (
              <div
                key={pillar.id}
                className="p-7 sm:p-8 rounded-2xl bg-navy-900/80 border border-navy-800 hover:border-brand-500/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600/30 text-accent-cyan font-mono text-xs font-bold">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                    <span className="text-xs text-accent-cyan font-medium">{pillar.subtitle}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {pillar.description}
                </p>

                <ul className="space-y-2 border-t border-navy-850 pt-4">
                  {pillar.bulletPoints.map((point, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Business Impact Banner */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-navy-800 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan block mb-1">
                The ATLAS Value Guarantee
              </span>
              <h3 className="text-xl font-bold text-white">
                Single-Vendor Accountability Across Your Digital Stack
              </h3>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                No finger-pointing between your ERP vendor, RPA consultant, and add-on developers. ATLAS owns the complete discovery, integration, and 24×7 operational SLA.
              </p>
            </div>
            <Button
              href="#approach"
              variant="cyan"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              See Our Approach
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION F: INDUSTRY SOLUTIONS                                             */}
      {/* ========================================================================= */}
      <section id="industries" className="py-20 md:py-28 bg-slate-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Sector Focus"
            title="Tailored Solutions for SME Industry Verticals"
            subtitle="Pre-configured industry templates that solve specific shop-floor, yard, trading, and finance bottlenecks."
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRY_SOLUTIONS.map((industry) => (
              <IndustryCard key={industry.id} industry={industry} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION G: IMPLEMENTATION APPROACH (3 STEPS)                              */}
      {/* ========================================================================= */}
      <section id="approach" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Discovery to Delivery"
            title="Simple. Structured. Result-Oriented."
            subtitle="How we evaluate your operations, identify high-ROI automation targets, and deliver on a fixed-scope commitment."
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {IMPLEMENTATION_STEPS.map((step, idx) => (
              <ProcessStep
                key={step.step}
                step={step}
                isLast={idx === IMPLEMENTATION_STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION H: CUSTOMER OUTCOMES & SOCIAL PROOF                               */}
      {/* ========================================================================= */}
      <section id="outcomes" className="py-20 md:py-28 bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 bg-brand-900/40 text-accent-cyan border border-accent-cyan/30">
                <Award className="w-3.5 h-3.5" />
                Proven Client Outcomes
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Trusted by 80+ Growing Enterprises
              </h2>
              <p className="mt-3 text-slate-300 text-base max-w-xl">
                Real KPI gains achieved across manufacturing, pharmaceutical, logistics, and trading operations.
              </p>
            </div>

            <VerificationBadge
              note="Client quotations and case study statistics represent data from ATPL WEB Site_Content.pdf. All case evidence is being collated for final audit verification before public publication."
              variant="subtle"
            />
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {TESTIMONIALS.map((test) => (
              <TestimonialCard key={test.id} testimonial={test} />
            ))}
          </div>

          {/* Case Study Benchmark Strip */}
          <div className="p-8 rounded-2xl bg-navy-900 border border-navy-800">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center justify-between">
              <span>Verified Implementation Highlights</span>
              <span className="text-accent-cyan font-mono">2020 – 2025 Milestones</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-navy-800">
              {CASE_STUDY_HIGHLIGHTS.map((cs) => (
                <div key={cs.id} className="pt-6 md:pt-0 md:px-6 first:pl-0 last:pr-0">
                  <div className="text-xs font-bold text-brand-400 uppercase tracking-wide mb-1">
                    {cs.sector}
                  </div>
                  <div className="text-lg font-extrabold text-white mb-1">
                    {cs.headlineMetric}
                  </div>
                  <div className="text-xs font-semibold text-emerald-400 mb-3 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{cs.timeframeOrSpeed}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cs.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION I: CONVERSION CTA                                                 */}
      {/* ========================================================================= */}
      <section className="relative py-20 bg-gradient-to-br from-brand-700 via-brand-800 to-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md text-accent-cyan border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            Complimentary Executive Assessment
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Ready to Make Your SAP Business One Intelligent?
          </h2>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed mb-8">
            Turn SAP B1 into an autonomous growth engine. Schedule your Hyperautomation Health Check and receive your tailored readiness score in 48 hours along with a 3-Year AI Roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              href="#contact"
              variant="cyan"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Get a Free Hyperautomation Health Check
            </Button>
            <Button
              href={BRAND_INFO.contact.whatsappLink}
              variant="secondary"
              size="lg"
              icon={<ExternalLink className="w-5 h-5" />}
            >
              Direct WhatsApp (+91-9372329599)
            </Button>
          </div>

          {/* Included Features Pill Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-left max-w-4xl mx-auto">
            {CONSULTATION_BENEFITS.slice(0, 4).map((benefit, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-slate-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span className="leading-snug">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION J: CONTACT & CONSULTATION SECTION                                 */}
      {/* ========================================================================= */}
      <section id="contact" className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Consultation & Enquiry"
            title="Talk to SAP B1, Automation & AI Experts — Not Salespeople"
            subtitle="Whether you're planning a new SAP implementation, upgrading with Boyum IT, or deploying UiPath RPA, our consultants identify clear, ROI-driven opportunities."
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Direct Contact Info & Value Badges */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Why Start with ATLAS?
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <strong className="text-slate-900 block">Authorized SAP Channel Partner</strong>
                      <span className="text-slate-600">80+ successful SAP B1 projects across discrete manufacturing, pharma & logistics.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <strong className="text-slate-900 block">Boyum IT Silver & UiPath Silver Partner</strong>
                      <span className="text-slate-600">In-house certified automation and WMS specialists.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <strong className="text-slate-900 block">Proven Operational ROI</strong>
                      <span className="text-slate-600">Up to 70% manual effort reduction and 40% financial closing efficiency.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <strong className="text-slate-900 block">Mumbai-Based Engineering Team</strong>
                      <span className="text-slate-600">Offices in Borivali West & Marine Lines with global delivery capability.</span>
                    </div>
                  </li>
                </ul>

                {/* Direct Reach Channels */}
                <div className="pt-6 border-t border-slate-100 space-y-3.5">
                  <a
                    href={`mailto:${BRAND_INFO.contact.email}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-brand-600 shrink-0" />
                    <div className="text-xs">
                      <span className="text-slate-500 block">Email Us Directly</span>
                      <span className="font-bold text-slate-900">{BRAND_INFO.contact.email}</span>
                    </div>
                  </a>

                  <a
                    href={BRAND_INFO.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div className="text-xs">
                      <span className="text-emerald-700 block">Phone / WhatsApp Support</span>
                      <span className="font-bold">{BRAND_INFO.contact.phoneDisplay}</span>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 text-slate-800">
                    <MapPin className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="text-slate-500 block">Office Locations</span>
                      <span className="font-semibold text-slate-900">Mumbai: Borivali West & Marine Lines</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Complete Interactive Consultation Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/90 shadow-lg">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900">
                    Book Your Free Hyperautomation Health Check
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Receive your SAP B1 + Boyum + UiPath Readiness Score within 48 hours.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
                  {/* Row 1: Name and Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 ${
                          formErrors.fullName
                            ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                            : 'border-slate-300 focus:ring-brand-500/20 focus:border-brand-500'
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="mt-1 text-xs text-rose-600">{formErrors.fullName}</p>
                      )}
                    </div>

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
                        placeholder="e.g. Apex Industrial Pvt Ltd"
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 ${
                          formErrors.companyName
                            ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                            : 'border-slate-300 focus:ring-brand-500/20 focus:border-brand-500'
                        }`}
                      />
                      {formErrors.companyName && (
                        <p className="mt-1 text-xs text-rose-600">{formErrors.companyName}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Work Email and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        placeholder="e.g. rajesh@apexindustrial.com"
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 ${
                          formErrors.workEmail
                            ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                            : 'border-slate-300 focus:ring-brand-500/20 focus:border-brand-500'
                        }`}
                      />
                      {formErrors.workEmail && (
                        <p className="mt-1 text-xs text-rose-600">{formErrors.workEmail}</p>
                      )}
                    </div>

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
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 ${
                          formErrors.phoneNumber
                            ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                            : 'border-slate-300 focus:ring-brand-500/20 focus:border-brand-500'
                        }`}
                      />
                      {formErrors.phoneNumber && (
                        <p className="mt-1 text-xs text-rose-600">{formErrors.phoneNumber}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Area of Interest */}
                  <div>
                    <label htmlFor="areaOfInterest" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Primary Area of Interest
                    </label>
                    <select
                      id="areaOfInterest"
                      name="areaOfInterest"
                      value={formData.areaOfInterest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    >
                      <option value="sap-b1">SAP Business One Implementation & HANA Migration</option>
                      <option value="boyum">Boyum IT Add-Ons (Beas Manufacturing & Produmex WMS)</option>
                      <option value="uipath-rpa">UiPath RPA & Document Understanding (OCR + AI)</option>
                      <option value="freight">Freight, Shipping & Trading Modules</option>
                      <option value="gate-entry">Gate Entry & Computer Vision Weighment</option>
                      <option value="ai-suite">ATLAS AI-Ready Proprietary Suite</option>
                      <option value="full-healthcheck">Comprehensive Hyperautomation Health Check</option>
                    </select>
                  </div>

                  {/* Row 4: Requirements / Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Operational Process or Requirements <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Briefly describe your current ERP setup, operational pain points, or automation goals..."
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 ${
                        formErrors.message
                          ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                          : 'border-slate-300 focus:ring-brand-500/20 focus:border-brand-500'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-xs text-rose-600">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Phase 1 Client-Side Notice */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Phase 1 Frontend Sandbox:</strong> Submitting will validate your inputs and prepare a direct email draft or WhatsApp notification to ATLAS Technosoft consultants. Backend database persistence will be integrated in Phase 3.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                    icon={isSubmitting ? undefined : <Send className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Validating Information...' : 'Book Free Consultation'}
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION K: ABOUT SNAPSHOT SUMMARY (ANCHOR TARGET)                         */}
      {/* ========================================================================= */}
      <section id="about" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              About ATLAS Technosoft Pvt. Ltd.
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Nearly 20 Years of Specialized SAP Excellence
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              With nearly two decades of deep SAP expertise, ATLAS Technosoft has evolved into Mumbai's premier digital transformation partner for high-growth SMEs. We focus exclusively on SAP Business One, enhanced with Boyum IT add-ons, UiPath Robotic Process Automation, and AI-driven automation — delivering end-to-end solutions that convert routine operations into strategic business advantages.
            </p>
            <div className="pt-2 text-xs font-semibold text-slate-500">
              Promise: <span className="text-brand-600">Run SAP Smarter. Faster. With Zero Manual Touch.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL: SUBMISSION CONFIRMATION & EMAIL DRAFT GENERATOR                    */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Consultation Request Prepared"
      >
        {validatedData && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">Frontend Form Validated Successfully!</strong>
                As part of Phase 1 Frontend Foundation, your inquiry data is formatted and ready for dispatch.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div><strong>Name:</strong> {validatedData.fullName}</div>
              <div><strong>Company:</strong> {validatedData.companyName}</div>
              <div><strong>Work Email:</strong> {validatedData.workEmail}</div>
              <div><strong>Phone:</strong> {validatedData.phoneNumber}</div>
              <div><strong>Interest:</strong> {validatedData.areaOfInterest}</div>
              <div><strong>Message:</strong> {validatedData.message}</div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Click below to send this directly via your email client to{' '}
              <strong className="text-slate-800">sales@atlastechnosoft.com</strong>, or send directly via WhatsApp.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={generateMailtoLink(validatedData)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Open Email Draft</span>
              </a>

              <a
                href={`https://wa.me/919372329599?text=${encodeURIComponent(
                  `Hello ATLAS Technosoft, I submitted a consultation request on your website for ${validatedData.companyName} regarding ${validatedData.areaOfInterest}. Name: ${validatedData.fullName}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </a>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsSuccessModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600 underline"
              >
                Close Dialog
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
