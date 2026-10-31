import { CtaContactCards } from '../components/ui/CtaContactCards';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ChevronUp,
  X,
  Send,
  ShieldCheck,
  Sparkles,
  Layers,
  Cpu,
  BarChart3,
  Truck,
  Users,
  Database,
  Clock,
  TrendingUp,
  Zap,
  Receipt,
  FileText,
  Scale,
  ShoppingCart,
  Ship,
  Globe,
  FileCheck,
  Share2,
  CheckSquare,
  Building
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { SERVICE_DETAILS, ServiceDetailItem } from '../data/serviceDetailsData';
import { BRAND_INFO } from '../data/websiteContent';
import { ContactFormData } from '../types';

// Icon resolver for dynamic icon names
const getIcon = (iconName: string, className = "w-5 h-5") => {
  switch (iconName) {
    case 'Layers': return <Layers className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'BarChart3': return <BarChart3 className={className} />;
    case 'Truck': return <Truck className={className} />;
    case 'Users': return <Users className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Database': return <Database className={className} />;
    case 'Clock': return <Clock className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Receipt': return <Receipt className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'Scale': return <Scale className={className} />;
    case 'ShoppingCart': return <ShoppingCart className={className} />;
    case 'Ship': return <Ship className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'FileCheck': return <FileCheck className={className} />;
    case 'Share2': return <Share2 className={className} />;
    case 'CheckSquare': return <CheckSquare className={className} />;
    case 'Building': return <Building className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export const ServiceDetailPage: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const navigate = useNavigate();

  // Redirect to boyum-it page if requested through here
  useEffect(() => {
    if (serviceSlug === 'boyum-it') {
      navigate('/solutions/boyum-it', { replace: true });
    }
  }, [serviceSlug, navigate]);

  const service: ServiceDetailItem = SERVICE_DETAILS[serviceSlug || ''] || SERVICE_DETAILS['sap-business-one'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    areaOfInterest: service ? service.title : 'SAP Business One',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setFormSubmitted(false);
      setFormData({
        fullName: '',
        workEmail: '',
        phoneNumber: '',
        companyName: '',
        areaOfInterest: service.title,
        message: ''
      });
    }, 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#142B59] mb-4">Service Not Found</h1>
        <p className="text-[#45546B] mb-6">The requested service detail page could not be located.</p>
        <Link to="/services" className="inline-flex items-center gap-2 text-[#1B72E8] font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* ========================================================================= */}
      {/* SECTION 1: BREADCRUMBS & HERO SECTION                                     */}
      {/* ========================================================================= */}
      <section className="relative pt-6 pb-12 sm:pb-16 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-100 overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-gradient-to-bl from-blue-100/40 via-blue-100/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#53647A] mb-6">
            <Link to="/" className="hover:text-[#1B72E8] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-[#1B72E8] transition-colors">Services</Link>
            <span>/</span>
            <span className="font-semibold text-[#142B59] truncate">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/60 shadow-xs">
                <Sparkles className="w-4 h-4 text-[#1B72E8]" />
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#1B72E8]">
                  {service.badge}
                </span>
              </div>

              <h1 className="font-serif text-[32px] sm:text-[42px] lg:text-[48px] font-bold text-[#142B59] tracking-tight leading-[1.15]">
                {service.title}{' '}
                <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                  {service.titleHighlight}
                </span>
              </h1>

              <p className="text-[18px] sm:text-[20px] font-medium text-[#172B50] leading-snug">
                {service.tagline}
              </p>

              <p className="text-[15px] sm:text-[16px] lg:text-[17px] text-[#45546B] leading-relaxed max-w-2xl">
                {service.description}
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="gold"
                  size="lg"
                  className="text-[15px] sm:text-[16px] font-semibold px-6 py-3.5 shadow-md shadow-blue-500/25 bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Book a Consultation
                </Button>

                <a
                  href="#capabilities"
                  className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 px-6 py-3.5 text-[15px] sm:text-[16px] bg-white text-[#142B59] hover:bg-slate-50 border border-slate-300 shadow-xs"
                >
                  Explore Capabilities
                </a>
              </div>

              {/* Partner Credentials Pill */}
              <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#142B59]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{service.partnerBadge}</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Container */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
                <img
                  src={service.heroImage}
                  alt={service.heroImageAlt}
                  className="w-full h-auto object-cover max-h-[420px] group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1d3d]/50 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Micro Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200/90 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1B72E8] flex items-center justify-center font-bold text-sm">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#142B59]">Certified ATLAS Delivery</div>
                      <div className="text-[11px] text-[#53647A]">Backed by Enterprise SLAs</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#1B72E8] bg-blue-50 px-2.5 py-1 rounded-md">
                    Enterprise
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* 4-Column Live Metric Strip */}
          <div className="mt-12 pt-8 border-t border-slate-200/70">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {service.metrics.map((m, idx) => (
                <div key={idx} className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-200 transition-colors">
                  <div className={`text-[28px] sm:text-[34px] font-black ${m.color} tracking-tight leading-none mb-1.5`}>
                    {m.value}
                  </div>
                  <div className="text-[14px] sm:text-[15px] font-bold text-[#142B59] leading-snug">
                    {m.label}
                  </div>
                  <div className="text-[12px] sm:text-[13px] text-[#53647A] leading-normal mt-1">
                    {m.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: STRATEGIC OVERVIEW & VALUE PROPOSITION                         */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#f4f9ff]/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Solution Architecture Visual */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-white">
                <img
                  src={service.overview.image}
                  alt={service.overview.imageAlt}
                  className="w-full h-auto object-cover max-h-[400px]"
                />
              </div>
            </div>

            {/* Right: Narrative & Checklist */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] block">
                STRATEGIC ADVANTAGE
              </span>
              
              <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#142B59] tracking-tight leading-tight">
                {service.overview.heading}
              </h2>

              <p className="text-[16px] sm:text-[17px] font-semibold text-[#172B50]">
                {service.overview.subheading}
              </p>

              <div className="space-y-3 text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed">
                {service.overview.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Checklist */}
              <div className="space-y-2.5 pt-3">
                {service.overview.checklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#142B59] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[14px] sm:text-[15px] text-[#172B50] font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: CORE CAPABILITIES & MODULES GRID                               */}
      {/* ========================================================================= */}
      <section id="capabilities" className="py-12 sm:py-16 bg-white border-b border-slate-100 scroll-mt-20">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8]">
              CORE CAPABILITIES
            </span>
            <h2 className="font-serif text-[30px] sm:text-[38px] font-bold text-[#142B59] tracking-tight">
              Comprehensive Modules Designed for{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                High Performance
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#45546B]">
              Every capability is engineered to eliminate operational friction and deliver verified return on investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {service.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#1B72E8] hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1B72E8] group-hover:bg-[#1B72E8] group-hover:text-white flex items-center justify-center transition-colors mb-5 shadow-xs">
                    {getIcon(cap.icon, "w-6 h-6")}
                  </div>

                  <h3 className="text-[19px] sm:text-[20px] font-bold text-[#172B50] group-hover:text-[#1B72E8] transition-colors leading-snug mb-2.5">
                    {cap.title}
                  </h3>

                  <p className="text-[14px] sm:text-[15px] text-[#53647A] leading-relaxed mb-5">
                    {cap.description}
                  </p>

                  <ul className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                    {cap.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-[#45546B]">
                        <CheckCircle2 className="w-4 h-4 text-[#1B72E8] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, areaOfInterest: `${service.title} - ${cap.title}` }));
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#142B59] hover:text-[#1B72E8] group-hover:gap-2 transition-all"
                  >
                    <span>Request Feature Demo</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#1B72E8]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: KEY BUSINESS BENEFITS (6-CARD GRID)                            */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#f4f9ff]/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8]">
              BUSINESS ADVANTAGES
            </span>
            <h2 className="font-serif text-[30px] sm:text-[38px] font-bold text-[#142B59] tracking-tight">
              Measurable Outcomes for{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                Every Department
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#45546B]">
              Real-world improvements measured and verified across our 80+ customer deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.benefits.map((b, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066CC] flex items-center justify-center">
                    {getIcon(b.icon, "w-5 h-5")}
                  </div>
                  {b.metric && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-[#0066CC] border border-blue-100">
                      {b.metric}
                    </span>
                  )}
                </div>

                <h3 className="text-[17px] sm:text-[18px] font-bold text-[#172B50] mb-2 leading-snug">
                  {b.title}
                </h3>

                <p className="text-[14px] sm:text-[15px] text-[#53647A] leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: IMPLEMENTATION METHODOLOGY (4-STEP PIPELINE)                  */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8]">
              PROVEN METHODOLOGY
            </span>
            <h2 className="font-serif text-[30px] sm:text-[38px] font-bold text-[#142B59] tracking-tight">
              A Structured Roadmap to{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                Successful Adoption
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#45546B]">
              Fixed milestones, transparent checkpoints, and zero disruption to your daily operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {service.processSteps.map((st, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#1B72E8] transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0052CC] to-[#0A66C2] text-white font-black text-sm flex items-center justify-center mb-4 shadow-sm">
                  {st.step}
                </div>
                <h3 className="text-[17px] sm:text-[18px] font-bold text-[#172B50] mb-2">
                  {st.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#53647A] leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: RELATED SOLUTIONS & CROSS-SERVICE NAVIGATION                  */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#f4f9ff]/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] block mb-1">
                COMPLEMENTARY CAPABILITIES
              </span>
              <h2 className="font-serif text-[26px] sm:text-[32px] font-bold text-[#142B59]">
                Related Solutions in the{' '}
                <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                  ATLAS Ecosystem
                </span>
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1B72E8] hover:underline"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.relatedSolutions.map((rel, idx) => (
              <Link
                key={idx}
                to={rel.route}
                className="group p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-[#1B72E8] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-[#1B72E8] bg-blue-50 px-2.5 py-1 rounded-md mb-3 inline-block">
                    {rel.tag}
                  </span>
                  <h3 className="text-[18px] font-bold text-[#172B50] group-hover:text-[#1B72E8] transition-colors mb-2">
                    {rel.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-[#53647A] leading-relaxed">
                    {rel.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-[#142B59] group-hover:text-[#1B72E8]">
                  <span>Explore Solution</span>
                  <ArrowRight className="w-4 h-4 text-[#1B72E8] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: CONSULTATION CALL-TO-ACTION                                    */}
      {/* ========================================================================= */}
      <section id="contact-cta" className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-2xl bg-gradient-to-br from-blue-50/90 via-[#f0f6ff] to-blue-50/70 border border-blue-200/80 p-8 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Heading, Subtext & CTA */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#1B72E8] block">
                  READY TO ACCELERATE GROWTH?
                </span>
                <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#142B59] tracking-tight leading-tight">
                  Schedule a Consultation for{' '}
                  <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                    {service.title}
                  </span>
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed">
                  Discover how ATLAS Technosoft can tailor this solution to your exact operational requirements and eliminate manual bottlenecks.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="gold"
                    size="lg"
                    className="text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white shadow-md shadow-blue-500/25"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Book a Consultation
                  </Button>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3.5 text-[15px] sm:text-[16px] bg-white text-[#142B59] hover:bg-slate-50 border border-slate-300 shadow-xs"
                  >
                    Contact Sales Office
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
      {/* INTERACTIVE BOOK A CONSULTATION MODAL                                    */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Book a Consultation — ${service.title}`}
      >
        {formSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#142B59]">Thank You!</h3>
            <p className="text-sm text-[#45546B]">
              Your consultation request has been received. Our certified specialist will contact you within 24 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#142B59] uppercase tracking-wider mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Rajesh Sharma"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B72E8]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#142B59] uppercase tracking-wider mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  value={formData.workEmail}
                  onChange={e => setFormData({ ...formData, workEmail: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B72E8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142B59] uppercase tracking-wider mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B72E8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#142B59] uppercase tracking-wider mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Company Pvt. Ltd."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B72E8]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#142B59] uppercase tracking-wider mb-1">Service or Solution</label>
              <input
                type="text"
                readOnly
                value={formData.areaOfInterest}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#142B59] uppercase tracking-wider mb-1">Project Details or Requirements</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Briefly describe your ERP or automation objectives..."
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B72E8]"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="md"
                icon={<Send className="w-4 h-4" />}
              >
                Submit Consultation Request
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Floating Back to Top Button */}
      /* Global scroll-to-top handled by SiteLayout */
    </div>
  );
};
