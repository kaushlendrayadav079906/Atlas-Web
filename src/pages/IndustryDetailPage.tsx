import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { CtaContactCards } from '../components/ui/CtaContactCards';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  Factory,
  Truck,
  Boxes,
  Package,
  Calendar,
  Layers,
  Cpu,
  BarChart3,
  Settings,
  TrendingUp,
  Clock,
  Smartphone,
  Receipt,
  Coins,
  Scale,
  Sliders,
  Ship,
  ShoppingCart,
  Building,
  FileCheck,
  FileText
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ConsultationModal } from '../components/ui/ConsultationModal';
import { INDUSTRY_DETAILS, IndustryDetailItem } from '../data/industryDetailsData';
import { BRAND_INFO } from '../data/websiteContent';
import { ImageFeatureSlider } from '../components/ui/ImageFeatureSlider';
import { cardImage, poolForSlug } from '../data/cardImagePools';

// Dynamic icon resolver for industry capabilities
const getIndustryIcon = (iconName: string, className = "w-5 h-5") => {
  switch (iconName) {
    case 'Calendar': return <Calendar className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'BarChart3': return <BarChart3 className={className} />;
    case 'Settings': return <Settings className={className} />;
    case 'Smartphone': return <Smartphone className={className} />;
    case 'Boxes': return <Boxes className={className} />;
    case 'Package': return <Package className={className} />;
    case 'Truck': return <Truck className={className} />;
    case 'Receipt': return <Receipt className={className} />;
    case 'Coins': return <Coins className={className} />;
    case 'Scale': return <Scale className={className} />;
    case 'Sliders': return <Sliders className={className} />;
    case 'Ship': return <Ship className={className} />;
    case 'ShoppingCart': return <ShoppingCart className={className} />;
    case 'Building': return <Building className={className} />;
    case 'FileCheck': return <FileCheck className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'Clock': return <Clock className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    default: return <Factory className={className} />;
  }
};

export const IndustryDetailPage: React.FC = () => {
  const { industrySlug } = useParams<{ industrySlug: string }>();
  const industry: IndustryDetailItem = INDUSTRY_DETAILS[industrySlug || ''] || INDUSTRY_DETAILS['manufacturing'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(industry ? `Industry Assessment: ${industry.title}` : "Industry Assessment");
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

  if (!industry) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h1 className="atlas-h1-size font-serif font-bold text-[#0A1B4F] mb-4">Industry Not Found</h1>
        <p className="text-[#4A5876] mb-6">The requested industry detail page could not be located.</p>
        <Link to="/industries" className="inline-flex items-center gap-2 text-[#1F4FE0] font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Industries
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
            <Link to="/" className="hover:text-[#1F4FE0] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/industries" className="hover:text-[#1F4FE0] transition-colors">Industries</Link>
            <span>/</span>
            <span className="font-semibold text-[#0A1B4F] truncate">{industry.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/60 shadow-xs">
                <Sparkles className="w-4 h-4 text-[#1F4FE0]" />
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#1F4FE0]">
                  {industry.badge}
                </span>
              </div>

              <h1 className="atlas-h1-size font-serif font-extrabold text-[#0A1B4F]">
                {industry.title}{' '}
                <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                  {industry.titleHighlight}
                </span>
              </h1>

              <p className="text-[18px] sm:text-[20px] font-medium text-[#0A1B4F] leading-snug">
                {industry.tagline}
              </p>

              <p className="text-[15px] sm:text-[16px] lg:text-[17px] text-[#4A5876] leading-relaxed max-w-2xl">
                {industry.description}
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="gold"
                  size="lg"
                  className="text-[15px] sm:text-[16px] font-semibold px-6 py-3.5 shadow-md shadow-blue-500/25 bg-gradient-to-r from-[#1F4FE0] to-[#1F4FE0] hover:from-[#1739B8] hover:to-[#1739B8] text-white"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Book Industry Assessment
                </Button>

                <a
                  href="#capabilities"
                  className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 px-6 py-3.5 text-[15px] sm:text-[16px] bg-white text-[#0A1B4F] hover:bg-slate-50 border border-slate-300 shadow-xs"
                >
                  View Sector Capabilities
                </a>
              </div>

              {/* Verified Sector Credential */}
              <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A1B4F]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified End-to-End Industry Implementations Across India & Global Markets</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Container */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
                <img
                  src={industry.heroImage}
                  alt={industry.heroImageAlt}
                  className="w-full h-auto object-cover max-h-[420px] group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B4F]/50 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Micro Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200/90 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0A1B4F]">Industry-Tested Best Practices</div>
                      <div className="text-[11px] text-[#4A5876]">Customized to Sector Workflows</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Verified
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* 4-Column Live Metric Strip */}
          <div className="mt-12 pt-8 border-t border-slate-200/70">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {industry.metrics.map((m, idx) => (
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
      {/* SECTION 2: SECTOR CHALLENGES & ARCHITECTURE OVERVIEW                      */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 atlas-cream">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Operational Workflow Visual */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-[28px] overflow-hidden shadow-float border border-white/10 bg-atlas-navy">
                <img
                  src={industry.overview.image}
                  alt={industry.overview.imageAlt}
                  className="w-full h-auto object-cover max-h-[400px]"
                />
              </div>
            </div>

            {/* Right: Narrative & Checklist */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-atlas-gold block">
                INDUSTRY TRANSFORMATION
              </span>
              
              <h2 className="atlas-h2-size font-extrabold !text-white">
                {industry.overview.heading}
              </h2>

              <p className="text-[16px] sm:text-[18px] font-semibold text-white">
                {industry.overview.subheading}
              </p>

              <div className="space-y-3 text-[15px] sm:text-[16px] text-atlas-onNavy leading-relaxed">
                {industry.overview.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Checklist */}
              <div className="space-y-2.5 pt-3">
                {industry.overview.checklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-atlas-gold text-atlas-navy flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-atlas-navy" />
                    </div>
                    <span className="text-[14px] sm:text-[15px] text-white font-medium leading-snug">
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
      {/* SECTION 3: SPECIALIZED INDUSTRY CAPABILITIES & MODULES                    */}
      {/* ========================================================================= */}
      <section id="capabilities" className="py-12 sm:py-16 bg-white border-b border-slate-100 scroll-mt-20">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1F4FE0]">
              INDUSTRY CAPABILITIES
            </span>
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              Tailored Modules for{' '}
              <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                Sector Operational Excellence
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#4A5876]">
              Engineered to meet specific industry compliance mandates, operational speeds, and margin goals.
            </p>
          </div>

          <ImageFeatureSlider
            ariaLabel={`${industry.title} capabilities`}
            perView={3}
            items={industry.capabilities.map((cap, idx) => ({
              title: cap.title,
              description: cap.description,
              bullets: cap.features,
              image: cardImage(poolForSlug(industrySlug), idx),
              actionLabel: 'Request Technical Review',
              onClick: () => {
                setSelectedService(`${industry.title} - ${cap.title}`);
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
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1F4FE0]">
              MEASURABLE ADVANTAGES
            </span>
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              Proven Return on Investment in{' '}
              <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                Your Industry
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#4A5876]">
              Real operational metrics achieved across our manufacturing, warehouse, finance, and trading clients.
            </p>
          </div>

          <ImageFeatureSlider
            ariaLabel={`${industry.title} business benefits`}
            perView={3}
            items={industry.benefits.map((b, idx) => ({
              title: b.title,
              description: b.description,
              eyebrow: b.metric,
              image: cardImage(poolForSlug(industrySlug), idx, 4),
            }))}
          />

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: REAL-WORLD CASE STUDY & RECOMMENDED TECH STACK                 */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Client Success Spotlight */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-blue-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/70 text-[#1F4FE0] text-xs font-bold mb-4">
                  CLIENT SPOTLIGHT
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-[#0A1B4F] mb-1">
                  {industry.caseStudyHighlight.title}
                </h3>
                <div className="text-xs text-[#4A5876] font-semibold mb-4">
                  {industry.caseStudyHighlight.clientType}
                </div>
                <blockquote className="text-[15px] sm:text-[16px] italic text-[#4A5876] leading-relaxed mb-6 border-l-2 border-[#1F4FE0] pl-4">
                  "{industry.caseStudyHighlight.quote}"
                </blockquote>
                <div className="text-xs font-bold text-[#0A1B4F]">
                  {industry.caseStudyHighlight.author}
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-200/80">
                {industry.caseStudyHighlight.kpis.map((k, i) => (
                  <div key={i}>
                    <div className="text-[20px] sm:text-[24px] font-black text-[#1F4FE0] leading-none mb-1">
                      {k.value}
                    </div>
                    <div className="text-[11px] sm:text-[12px] font-semibold text-[#4A5876]">
                      {k.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Recommended Tech Stack */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
              <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1F4FE0] block">
                RECOMMENDED ARCHITECTURE
              </span>
              <h3 className="text-[20px] sm:text-[22px] font-bold text-[#0A1B4F]">
                Integrated Technology Stack
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#4A5876]">
                The optimal combination of core ERP, specialized add-ons, and AI automation deployed for this sector.
              </p>

              <div className="space-y-3 pt-2">
                {industry.techStack.map((tech, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-[#0A1B4F]">{tech.name}</div>
                      <div className="text-xs text-[#4A5876]">{tech.role}</div>
                    </div>
                    <span className="text-[11px] font-bold text-[#1F4FE0] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {tech.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: RELATED INDUSTRIES NAVIGATION                                  */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 border-b border-white/10 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1F4FE0] block mb-1">
                SECTORS WE SERVE
              </span>
              <h2 className="font-serif text-[26px] sm:text-[32px] font-bold text-[#0A1B4F]">
                Explore Other{' '}
                <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                  Specialized Industries
                </span>
              </h2>
            </div>
            <Link
              to="/industries"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1F4FE0] hover:underline"
            >
              <span>View All Industries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industry.relatedIndustries.map((rel, idx) => (
              <Link
                key={idx}
                to={rel.route}
                className="group p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-[#1F4FE0] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-[#1F4FE0] bg-blue-50 px-2.5 py-1 rounded-md mb-3 inline-block">
                    {rel.tag}
                  </span>
                  <h3 className="text-[18px] font-bold text-[#0A1B4F] group-hover:text-[#1F4FE0] transition-colors mb-2">
                    {rel.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-[#4A5876] leading-relaxed">
                    {rel.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-[#0A1B4F] group-hover:text-[#1F4FE0]">
                  <span>Explore Industry Page</span>
                  <ArrowRight className="w-4 h-4 text-[#1F4FE0] group-hover:translate-x-1 transition-transform" />
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
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#1F4FE0] block">
                  READY TO TRANSFORM YOUR OPERATIONS?
                </span>
                <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                  Schedule an Industry Assessment for{' '}
                  <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                    {industry.title}
                  </span>
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#4A5876] leading-relaxed">
                  Connect with our industry architects to review your operational bottlenecks and get an actionable digital roadmap.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="gold"
                    size="lg"
                    className="text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 bg-gradient-to-r from-[#1F4FE0] to-[#1F4FE0] hover:from-[#1739B8] hover:to-[#1739B8] text-white shadow-md shadow-blue-500/25"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Book Industry Assessment
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
        title={`Book Industry Assessment — ${industry.title}`}
      />

    </div>
  );
};
