import { AnimatedCounter } from '../components/ui/AnimatedCounter';
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
import { ConsultationModal } from '../components/ui/ConsultationModal';
import { SERVICE_DETAILS, ServiceDetailItem } from '../data/serviceDetailsData';
import { BRAND_INFO } from '../data/websiteContent';
import { ImageFeatureSlider } from '../components/ui/ImageFeatureSlider';
import { cardImage, poolForSlug } from '../data/cardImagePools';

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
  const [selectedService, setSelectedService] = useState(service ? service.title : "SAP Business One");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h1 className="atlas-h1-size font-serif font-bold text-[#0A1B4F] mb-4">Service Not Found</h1>
        <p className="text-[#4A5876] mb-6">The requested service detail page could not be located.</p>
        <Link to="/services" className="inline-flex items-center gap-2 text-[#E0A33B] font-semibold hover:underline">
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
      <section className="relative pt-6 pb-12 sm:pb-16 border-b border-white/10 overflow-hidden atlas-dark">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-gradient-to-bl from-blue-100/40 via-blue-100/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#4A5876] mb-6">
            <Link to="/" className="hover:text-[#E0A33B] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-[#E0A33B] transition-colors">Services</Link>
            <span>/</span>
            <span className="font-semibold text-[#0A1B4F] truncate">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/60 shadow-xs">
                <Sparkles className="w-4 h-4 text-[#E0A33B]" />
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#E0A33B]">
                  {service.badge}
                </span>
              </div>

              <h1 className="atlas-h1-size font-serif font-extrabold text-[#0A1B4F]">
                {service.title}{' '}
                <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                  {service.titleHighlight}
                </span>
              </h1>

              <p className="text-[18px] sm:text-[20px] font-medium text-[#0A1B4F] leading-snug">
                {service.tagline}
              </p>

              <p className="text-[15px] sm:text-[16px] lg:text-[17px] text-[#4A5876] leading-relaxed max-w-2xl">
                {service.description}
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="gold"
                  size="lg"
                  className="text-[15px] sm:text-[16px] font-semibold px-6 py-3.5 shadow-md shadow-blue-500/25 bg-gradient-to-r from-[#E0A33B] to-[#E0A33B] hover:from-[#1739B8] hover:to-[#1739B8] text-white"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Book a Consultation
                </Button>

                <a
                  href="#capabilities"
                  className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 px-6 py-3.5 text-[15px] sm:text-[16px] bg-white text-[#0A1B4F] hover:bg-slate-50 border border-slate-300 shadow-xs"
                >
                  Explore Capabilities
                </a>
              </div>

              {/* Partner Credentials Pill */}
              <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A1B4F]">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B4F]/50 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Micro Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200/90 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#E0A33B] flex items-center justify-center font-bold text-sm">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0A1B4F]">Certified ATLAS Delivery</div>
                      <div className="text-[11px] text-[#4A5876]">Backed by Enterprise SLAs</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#E0A33B] bg-blue-50 px-2.5 py-1 rounded-md">
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
                    <AnimatedCounter value={m.value} />
                  </div>
                  <div className="text-[14px] sm:text-[15px] font-bold text-[#0A1B4F] leading-snug">
                    {m.label}
                  </div>
                  <div className="text-[12px] sm:text-[13px] text-[#4A5876] leading-normal mt-1">
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
      <section className="py-12 sm:py-16 border-b border-white/10 atlas-dark">
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
              <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#E0A33B] block">
                STRATEGIC ADVANTAGE
              </span>
              
              <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                {service.overview.heading}
              </h2>

              <p className="text-[16px] sm:text-[17px] font-semibold text-[#0A1B4F]">
                {service.overview.subheading}
              </p>

              <div className="space-y-3 text-[15px] sm:text-[16px] text-[#4A5876] leading-relaxed">
                {service.overview.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Checklist */}
              <div className="space-y-2.5 pt-3">
                {service.overview.checklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0A1B4F] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[14px] sm:text-[15px] text-[#0A1B4F] font-medium leading-snug">
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
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#E0A33B]">
              CORE CAPABILITIES
            </span>
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              Comprehensive Modules Designed for{' '}
              <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                High Performance
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#4A5876]">
              Every capability is engineered to eliminate operational friction and deliver verified return on investment.
            </p>
          </div>

          <ImageFeatureSlider
            ariaLabel={`${service.title} capabilities`}
            perView={3}
            items={service.capabilities.map((cap, idx) => ({
              title: cap.title,
              description: cap.description,
              bullets: cap.features,
              image: cardImage(poolForSlug(serviceSlug), idx),
              actionLabel: 'Request Feature Demo',
              onClick: () => {
                setSelectedService(`${service.title} - ${cap.title}`);
                setIsModalOpen(true);
              },
            }))}
          />

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: KEY BUSINESS BENEFITS (6-CARD GRID)                            */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 border-b border-white/10 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#E0A33B]">
              BUSINESS ADVANTAGES
            </span>
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              Measurable Outcomes for{' '}
              <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                Every Department
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#4A5876]">
              Real-world improvements measured and verified across our 80+ customer deployments.
            </p>
          </div>

          <ImageFeatureSlider
            ariaLabel={`${service.title} business outcomes`}
            perView={3}
            items={service.benefits.map((b, idx) => ({
              title: b.title,
              description: b.description,
              eyebrow: b.metric,
              image: cardImage(poolForSlug(serviceSlug), idx, 4),
            }))}
          />

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: IMPLEMENTATION METHODOLOGY (4-STEP PIPELINE)                  */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#E0A33B]">
              PROVEN METHODOLOGY
            </span>
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              A Structured Roadmap to{' '}
              <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                Successful Adoption
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#4A5876]">
              Fixed milestones, transparent checkpoints, and zero disruption to your daily operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {service.processSteps.map((st, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#1F4FE0] transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#E0A33B] to-[#E0A33B] text-white font-black text-sm flex items-center justify-center mb-4 shadow-sm">
                  {st.step}
                </div>
                <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0A1B4F] mb-2">
                  {st.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#4A5876] leading-relaxed">
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
      <section className="py-12 sm:py-16 border-b border-white/10 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#E0A33B] block mb-1">
                COMPLEMENTARY CAPABILITIES
              </span>
              <h2 className="font-serif text-[26px] sm:text-[32px] font-bold text-[#0A1B4F]">
                Related Solutions in the{' '}
                <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                  ATLAS Ecosystem
                </span>
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E0A33B] hover:underline"
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
                className="group p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-[#1F4FE0] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-[#E0A33B] bg-blue-50 px-2.5 py-1 rounded-md mb-3 inline-block">
                    {rel.tag}
                  </span>
                  <h3 className="text-[18px] font-bold text-[#0A1B4F] group-hover:text-[#E0A33B] transition-colors mb-2">
                    {rel.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-[#4A5876] leading-relaxed">
                    {rel.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-[#0A1B4F] group-hover:text-[#E0A33B]">
                  <span>Explore Solution</span>
                  <ArrowRight className="w-4 h-4 text-[#E0A33B] group-hover:translate-x-1 transition-transform" />
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
          
          <div className="rounded-2xl bg-gradient-to-br from-blue-50/90 via-[#EEF4FA] to-blue-50/70 border border-blue-200/80 p-8 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Heading, Subtext & CTA */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#E0A33B] block">
                  READY TO ACCELERATE GROWTH?
                </span>
                <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                  Schedule a Consultation for{' '}
                  <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                    {service.title}
                  </span>
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#4A5876] leading-relaxed">
                  Discover how ATLAS Technosoft can tailor this solution to your exact operational requirements and eliminate manual bottlenecks.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="gold"
                    size="lg"
                    className="text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 bg-atlas-gold hover:bg-[#D4972F] !text-atlas-navy font-bold shadow-[0_4px_14px_rgba(224,163,59,0.35)]"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Book a Consultation
                  </Button>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3.5 text-[15px] sm:text-[16px] bg-white text-[#0A1B4F] hover:bg-slate-50 border border-slate-300 shadow-xs"
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
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={selectedService}
        title={`Book a Consultation — ${service.title}`}
      />

    </div>
  );
};
