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
  Sparkles, 
  Bot, 
  BrainCircuit, 
  Clock, 
  Award,
  ChevronRight,
  Send,
  ExternalLink,
  Handshake,
  CheckCircle,
  HelpCircle
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
  CORE_SERVICES,
  SOLUTIONS_DATA, 
  EXPERTISE_PILLARS, 
  INDUSTRY_SOLUTIONS, 
  ENGAGEMENT_APPROACH_STEPS, 
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
    // Client-side validation only; prepares mailto draft and direct WhatsApp action without faking a backend.
    setTimeout(() => {
      setIsSubmitting(false);
      setValidatedData({ ...formData });
      setIsSuccessModalOpen(true);
    }, 400);
  };

  // Generate Mailto draft link from validated inputs
  const generateMailtoLink = (data: ContactFormData) => {
    const subject = encodeURIComponent(`Consultation Booking: ${data.companyName} - ${data.areaOfInterest.toUpperCase()}`);
    const body = encodeURIComponent(
      `Dear ATLAS Technosoft Team,\n\n` +
      `I would like to book a consultation regarding your SAP & Intelligent Automation solutions.\n\n` +
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

  const serviceIconMap: Record<string, React.ReactNode> = {
    Database: <Database className="w-6 h-6 text-brand-600" />,
    Layers: <Layers className="w-6 h-6 text-indigo-600" />,
    Cpu: <Cpu className="w-6 h-6 text-sky-600" />,
    BrainCircuit: <BrainCircuit className="w-6 h-6 text-purple-600" />,
  };

  return (
    <div className="relative bg-white text-slate-900">
      
      {/* ========================================================================= */}
      {/* SECTION 2: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative bg-navy-950 text-white overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-glow pointer-events-none" />
        <div className="absolute -top-24 right-10 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

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

              {/* Exact PDF Headline */}
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

              {/* Supporting Value Message from PDF */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                ATLAS Technosoft helps manufacturing, logistics, pharma, and trading companies{' '}
                <strong className="text-white font-semibold">eliminate up to 70% manual work</strong>,{' '}
                <strong className="text-white font-semibold">gain real-time visibility</strong>, and{' '}
                <strong className="text-white font-semibold">achieve measurable ROI in 4–6 months</strong>{' '}
                using SAP Business One, Boyum IT add-ons, UiPath RPA, and AI-driven automation.
              </p>

              {/* Dual Action CTAs: Book a Consultation & Explore Our Solutions */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  href="#contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Book a Consultation
                </Button>

                <Button
                  href="#solutions"
                  variant="secondary"
                  size="lg"
                  icon={<ChevronRight className="w-5 h-5" />}
                >
                  Explore Our Solutions
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-navy-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                  <span>Readiness Score in 48 Hours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                  <span>3-Year AI Roadmap Included</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                  <span>Single-Vendor Accountability</span>
                </div>
              </div>
            </div>

            {/* Right Column: Connected Systems Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-md lg:max-w-none rounded-2xl bg-gradient-to-b from-navy-900 to-navy-950 p-6 sm:p-7 border border-navy-800 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-navy-800/80 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-slate-400">ATLAS Integrated Topology</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30">
                    Active Architecture
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="p-4 rounded-xl bg-navy-950/90 border border-brand-500/40 shadow-inner flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-brand-600/30 text-accent-cyan">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">SAP Business One (HANA / SQL)</div>
                        <div className="text-xs text-slate-400">Central Digital Core & Ledgers</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Core ERP
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-navy-900/70 border border-navy-800 flex items-center justify-between">
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

                  <div className="p-3.5 rounded-xl bg-navy-900/70 border border-navy-800 flex items-center justify-between">
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

                  <div className="p-3.5 rounded-xl bg-navy-900/70 border border-navy-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                        <BrainCircuit className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">ATLAS AI-Ready Suite</div>
                        <div className="text-[11px] text-slate-400">Computer Vision Gate & Stock Predictor</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-purple-300 font-mono">Real-time</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-navy-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent-cyan" />
                    <span>Executive Command Center</span>
                  </div>
                  <span className="text-[11px] text-slate-400">40% Faster Close</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: COMPANY METRICS                                                */}
      {/* ========================================================================= */}
      <section id="metrics" className="relative bg-slate-900 py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan block">
                Supplied Performance Claims
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Enterprise Track Record across India & Global SMEs
              </h2>
            </div>
            <VerificationBadge
              note="Figures supplied by ATPL WEB Site_Content.pdf. Flagged for legal and client audit verification before production publication."
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
      {/* SECTION 4: SERVICES OVERVIEW (4 PROFESSIONAL SERVICE CARDS)               */}
      {/* ========================================================================= */}
      <section id="services" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Services Overview"
            title="Core Enterprise Services & Capability Blocks"
            subtitle="Engineered exclusively to deploy, extend, and hyperautomate SAP Business One for high-growth discrete and process industries."
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CORE_SERVICES.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-slate-200/80 shadow-sm group-hover:bg-brand-50 transition-colors">
                      {serviceIconMap[service.iconName] || <Database className="w-6 h-6 text-brand-600" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block">
                        {service.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.summary}
                  </p>

                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                      Core Deliverables
                    </span>
                    <ul className="space-y-2.5">
                      {service.keyDeliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-200/80">
                  <div className="mb-4 p-3 rounded-lg bg-white border border-slate-200 text-xs">
                    <span className="font-bold uppercase text-slate-400 text-[10px] block mb-0.5">
                      Documented Business Outcome
                    </span>
                    <span className="font-semibold text-slate-900">
                      {service.businessImpact}
                    </span>
                  </div>

                  <Button
                    href={service.ctaTarget}
                    variant="primary"
                    size="sm"
                    fullWidth
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    {service.ctaText}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4B: SOLUTIONS SUITE (6 DETAILED SOLUTION MODULES)                  */}
      {/* ========================================================================= */}
      <section id="solutions" className="py-20 md:py-28 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Solutions Portfolio"
            title="Integrated Modules Built for Rapid SME Value"
            subtitle="From native SAP Business One HANA migrations to specialized freight and weighment automation add-ons deployed in weeks."
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
      {/* SECTION 5: EXPERTISE (ENTERPRISE SOFTWARE & CONVERGENCE)                  */}
      {/* ========================================================================= */}
      <section id="expertise" className="py-20 md:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Technical Expertise"
            title="Enterprise Software, Process Optimization & Automation"
            subtitle="How ATLAS combines deep SAP architecture with shop floor manufacturing execution, touchless warehousing, and autonomous RPA."
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {EXPERTISE_PILLARS.map((pillar, idx) => (
              <div
                key={pillar.id}
                className="p-7 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-100 text-brand-700 font-mono text-xs font-bold">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                    <span className="text-xs text-brand-600 font-semibold">{pillar.subtitle}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {pillar.description}
                </p>

                <ul className="space-y-2 border-t border-slate-200 pt-4">
                  {pillar.bulletPoints.map((point, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Differentiator Callout Box */}
          <div className="p-8 rounded-2xl bg-navy-950 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan block mb-1">
                Single-Vendor Accountability
              </span>
              <h3 className="text-xl font-bold text-white">
                SAP B1, Boyum IT, UiPath & AI Under One Roof
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                Eliminate coordination friction between disparate software vendors. ATLAS manages your complete digital architecture from scoping to 24×7 ongoing SLA support.
              </p>
            </div>
            <Button
              href="#contact"
              variant="cyan"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Book Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: INDUSTRIES (4 SECTOR CARDS)                                    */}
      {/* ========================================================================= */}
      <section id="industries" className="py-20 md:py-28 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Industry Specialization"
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
      {/* SECTION 7: OUR APPROACH (4-STEP PROPOSED ENGAGEMENT PROCESS)             */}
      {/* ========================================================================= */}
      <section id="approach" className="py-20 md:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 bg-brand-50 text-brand-700 border border-brand-200">
                <Clock className="w-3.5 h-3.5" />
                Proposed Engagement Process
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Our 4-Step Implementation Approach
              </h2>
              <p className="mt-3 text-slate-600 text-base max-w-xl">
                A structured discovery-to-delivery framework designed to identify high-ROI opportunities and ensure transparent delivery.
              </p>
            </div>

            <VerificationBadge
              note="Proposed delivery framework. Milestones and scope are customized per client engagement and do not represent a guaranteed or independently verified company methodology."
              variant="floating"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ENGAGEMENT_APPROACH_STEPS.map((step, idx) => (
              <ProcessStep
                key={step.step}
                step={step}
                isLast={idx === ENGAGEMENT_APPROACH_STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: CUSTOMER SUCCESS (CASE STUDIES & TESTIMONIALS)                 */}
      {/* ========================================================================= */}
      <section id="case-studies" className="py-20 md:py-28 bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 bg-brand-900/40 text-accent-cyan border border-accent-cyan/30">
                <Award className="w-3.5 h-3.5" />
                Customer Success
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Proven Client Outcomes from Source Records
              </h2>
              <p className="mt-3 text-slate-300 text-base max-w-xl">
                Verbatim feedback and documented KPI improvements across manufacturing, logistics, and trading clients.
              </p>
            </div>

            <VerificationBadge
              note="All client quotes and case statistics are extracted from ATPL WEB Site_Content.pdf. Mark for client permission and evidence verification before public production release."
              variant="subtle"
            />
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {TESTIMONIALS.map((test) => (
              <TestimonialCard key={test.id} testimonial={test} />
            ))}
          </div>

          {/* Documented Case Study Highlights */}
          <div className="p-8 rounded-2xl bg-navy-900 border border-navy-800">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center justify-between">
              <span>Documented Implementation Highlights (2020–2025)</span>
              <span className="text-accent-cyan font-mono">Real Client Records</span>
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
      {/* SECTION 9: PARTNERS (SAP, BOYUM IT, UIPATH ACCREDITATION)                 */}
      {/* ========================================================================= */}
      <section id="partners" className="py-20 md:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Strategic Alliances"
            title="Certified Partner Ecosystem"
            subtitle="Text-based and accredited representation for our enterprise technology partners. Subject to continuous audit and tier renewal."
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {PARTNER_STATEMENTS.map((partner, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-white border border-slate-200 text-brand-600">
                      {partner.badge}
                    </span>
                    <Handshake className="w-5 h-5 text-slate-400" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {partner.name}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500 mb-3">
                    Level: {partner.level}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {partner.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Tier Status Verified</span>
                  <VerificationBadge
                    note="Official partner statement as supplied in ATPL WEB Site_Content.pdf. Partner tier status subject to periodic verification."
                    variant="floating"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11B: ABOUT SNAPSHOT SUMMARY                                       */}
      {/* ========================================================================= */}
      <section id="about" className="py-16 bg-slate-50 border-t border-slate-200">
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
              Company Promise: <span className="text-brand-600 font-bold">{BRAND_INFO.promise}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: CONTACT CTA & CONSULTATION SECTION                            */}
      {/* ========================================================================= */}
      <section id="contact" className="py-20 md:py-28 bg-white border-t border-slate-200">
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
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-6">
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
                <div className="pt-6 border-t border-slate-200 space-y-3.5">
                  <a
                    href={`mailto:${BRAND_INFO.contact.email}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 transition-colors border border-slate-200"
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
                    className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 transition-colors border border-emerald-200"
                  >
                    <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div className="text-xs">
                      <span className="text-emerald-700 block">Phone / WhatsApp Support</span>
                      <span className="font-bold">{BRAND_INFO.contact.phoneDisplay}</span>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white text-slate-800 border border-slate-200">
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
              <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-lg">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900">
                    Book a Free Consultation
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Receive your SAP B1 + Boyum + UiPath Readiness Score within 48 hours.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
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
                      <option value="sap-b1">SAP Business One Implementation & Optimization</option>
                      <option value="boyum">Boyum IT Solutions (Beas Manufacturing & Produmex WMS)</option>
                      <option value="uipath-rpa">UiPath RPA & AI Automation (OCR & Bots)</option>
                      <option value="atlas-addons">ATLAS Proprietary Add-on Suite</option>
                      <option value="freight">Freight & Trading Modules</option>
                      <option value="gate-entry">Gate Entry & Computer Vision Weighment</option>
                      <option value="full-healthcheck">Full Hyperautomation Assessment</option>
                    </select>
                  </div>

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

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Client-Side Validation Only:</strong> Submitting formats your enquiry and prepares an email draft or WhatsApp dispatch to ATLAS Technosoft consultants. Backend database persistence will be integrated in Phase 3.
                    </span>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                    icon={isSubmitting ? undefined : <Send className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Validating Information...' : 'Book a Consultation'}
                  </Button>
                </form>
              </div>
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
                <strong className="font-bold block">Consultation Details Validated!</strong>
                Your consultation request has passed frontend validation and is formatted for dispatch.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div><strong>Name:</strong> {validatedData.fullName}</div>
              <div><strong>Company:</strong> {validatedData.companyName}</div>
              <div><strong>Work Email:</strong> {validatedData.workEmail}</div>
              <div><strong>Phone:</strong> {validatedData.phoneNumber}</div>
              <div><strong>Interest:</strong> {validatedData.areaOfInterest}</div>
              <div><strong>Requirements:</strong> {validatedData.message}</div>
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
                  `Hello ATLAS Technosoft, I would like to book a consultation for ${validatedData.companyName} regarding ${validatedData.areaOfInterest}. Name: ${validatedData.fullName}. Phone: ${validatedData.phoneNumber}.`
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
