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
  ShieldCheck,
  Sparkles,
  Send,
  Boxes,
  Truck,
  ShoppingCart,
  Cpu,
  Factory,
  Clock,
  Coins,
  FileText,
  Scale,
  Layers,
  BarChart3,
  Receipt,
  Quote
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { INDIVIDUAL_CASE_STUDIES, IndividualCaseStudy } from '../data/individualCaseStudiesData';
import { BRAND_INFO } from '../data/websiteContent';
import { ContactFormData } from '../types';

const renderCategoryIcon = (iconName: string, className = "w-4 h-4") => {
  switch (iconName) {
    case 'boxes': return <Boxes className={className} />;
    case 'truck': return <Truck className={className} />;
    case 'shopping-cart': return <ShoppingCart className={className} />;
    case 'cpu': return <Cpu className={className} />;
    case 'factory': return <Factory className={className} />;
    default: return <Sparkles className={className} />;
  }
};

const renderChallengeIcon = (iconName: string, className = "w-5 h-5") => {
  switch (iconName) {
    case 'Clock': return <Clock className={className} />;
    case 'Truck': return <Truck className={className} />;
    case 'Coins': return <Coins className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'Scale': return <Scale className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'BarChart3': return <BarChart3 className={className} />;
    case 'Receipt': return <Receipt className={className} />;
    default: return <Clock className={className} />;
  }
};

export const IndividualCaseStudyPage: React.FC = () => {
  const { studySlug } = useParams<{ studySlug: string }>();
  const navigate = useNavigate();

  const caseStudy: IndividualCaseStudy = INDIVIDUAL_CASE_STUDIES[studySlug || ''] || INDIVIDUAL_CASE_STUDIES['warehouse-management'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    areaOfInterest: caseStudy ? `Case Study Inquiry: ${caseStudy.title}` : 'Case Study Consultation',
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
        areaOfInterest: `Case Study Inquiry: ${caseStudy.title}`,
        message: ''
      });
    }, 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!caseStudy) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#142B59] mb-4">Case Study Not Found</h1>
        <p className="text-[#45546B] mb-6">The requested customer success story could not be found.</p>
        <Link to="/case-studies" className="inline-flex items-center gap-2 text-[#1B72E8] font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to All Case Studies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* ========================================================================= */}
      {/* SECTION 1: BREADCRUMBS & CASE STUDY HERO                                  */}
      {/* ========================================================================= */}
      <section className="relative pt-6 pb-12 sm:pb-16 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-100 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-gradient-to-bl from-blue-100/40 via-blue-100/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation: Home -> Case Studies -> Current Case Study */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#53647A]">
              <Link to="/" className="hover:text-[#1B72E8] transition-colors">Home</Link>
              <span>/</span>
              <Link to="/case-studies" className="hover:text-[#1B72E8] transition-colors">Case Studies</Link>
              <span>/</span>
              <span className="font-semibold text-[#142B59] truncate max-w-[280px] sm:max-w-md">
                {caseStudy.title}
              </span>
            </nav>

            <Link
              to="/case-studies"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1B72E8] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Case Studies</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Introduction & Badges */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/60 shadow-xs">
                {renderCategoryIcon(caseStudy.categoryIcon, "w-4 h-4 text-[#1B72E8]")}
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#1B72E8]">
                  {caseStudy.category} • CUSTOMER SUCCESS STORY
                </span>
              </div>

              <h1 className="font-serif text-[32px] sm:text-[42px] lg:text-[46px] font-bold text-[#142B59] tracking-tight leading-[1.15]">
                {caseStudy.title}{' '}
                <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                  {caseStudy.titleHighlight}
                </span>
              </h1>

              <p className="text-[18px] sm:text-[20px] font-medium text-[#172B50] leading-snug">
                {caseStudy.tagline}
              </p>

              <p className="text-[15px] sm:text-[16px] lg:text-[17px] text-[#45546B] leading-relaxed max-w-2xl">
                {caseStudy.introduction}
              </p>

              {/* Client Profile Data Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 pb-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-[#53647A] uppercase tracking-wider">Industry</div>
                  <div className="text-[13px] font-bold text-[#142B59] truncate">{caseStudy.clientProfile.industry}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-[#53647A] uppercase tracking-wider">Timeline</div>
                  <div className="text-[13px] font-bold text-[#142B59] truncate">{caseStudy.clientProfile.deploymentTime}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-[#53647A] uppercase tracking-wider">Scale</div>
                  <div className="text-[13px] font-bold text-[#142B59] truncate">{caseStudy.clientProfile.companyScale}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-[#53647A] uppercase tracking-wider">Region</div>
                  <div className="text-[13px] font-bold text-[#142B59] truncate">{caseStudy.clientProfile.geography}</div>
                </div>
              </div>

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
                  href="#solution"
                  className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 px-6 py-3.5 text-[15px] sm:text-[16px] bg-white text-[#142B59] hover:bg-slate-50 border border-slate-300 shadow-xs"
                >
                  View Solution & Results
                </a>
              </div>

              <div className="pt-1 flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#142B59]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Client Engagement • Protected under Corporate NDA</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Container */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
                <img
                  src={caseStudy.heroImage}
                  alt={caseStudy.heroImageAlt}
                  className="w-full h-auto object-cover max-h-[420px] group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1d3d]/50 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Micro Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200/90 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#142B59]">Verified Production Deployment</div>
                      <div className="text-[11px] text-[#53647A]">{caseStudy.clientProfile.deploymentTime}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Verified
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* 4-Column Verified Outcomes Metric Strip */}
          <div className="mt-12 pt-8 border-t border-slate-200/70">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {caseStudy.verifiedOutcomes.map((m, idx) => (
                <div key={idx} className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-200 transition-colors">
                  <div className="text-[28px] sm:text-[34px] font-black text-[#1B72E8] tracking-tight leading-none mb-1.5">
                    {m.metric}
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
      {/* SECTION 2: BUSINESS CHALLENGES & TECHNOLOGY STACK                         */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#f4f9ff]/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Column: Business Challenges */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] block mb-1">
                  OPERATIONAL BOTTLENECKS
                </span>
                <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#142B59] tracking-tight">
                  The Business{' '}
                  <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                    Challenges
                  </span>
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#45546B] mt-2">
                  Key hurdles faced by the client before partnering with ATLAS Technosoft:
                </p>
              </div>

              <div className="space-y-4">
                {caseStudy.businessChallenges.map((ch, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066CC] border border-blue-200/80 flex items-center justify-center shrink-0 mt-0.5">
                      {renderChallengeIcon(ch.icon, "w-5 h-5")}
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold text-[#142B59] mb-1">
                        {ch.title}
                      </h3>
                      <p className="text-[14px] text-[#53647A] leading-relaxed">
                        {ch.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Technology Stack Deployed */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] block mb-1">
                  SOLUTION ARCHITECTURE
                </span>
                <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#142B59] tracking-tight">
                  Technology{' '}
                  <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                    Stack
                  </span>
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#45546B] mt-2">
                  The integrated technologies deployed to solve these bottlenecks:
                </p>
              </div>

              <div className="space-y-3.5">
                {caseStudy.techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="text-base font-bold text-[#142B59]">{tech.name}</div>
                      <div className="text-xs text-[#53647A]">{tech.role}</div>
                    </div>
                    <span className="text-xs font-bold text-[#1B72E8] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      {tech.tag}
                    </span>
                  </div>
                ))}
              </div>

              {/* Client Quote Card */}
              <div className="p-6 rounded-2xl bg-[#f0f6ff] border border-blue-200/80 shadow-xs relative">
                <Quote className="w-8 h-8 text-blue-300 absolute top-4 right-4" />
                <p className="text-[14px] sm:text-[15px] italic text-[#172B50] leading-relaxed mb-4">
                  "{caseStudy.clientQuote.quote}"
                </p>
                <div>
                  <div className="text-xs font-bold text-[#142B59]">{caseStudy.clientQuote.author}</div>
                  <div className="text-[11px] text-[#53647A]">{caseStudy.clientQuote.role}</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: ATLAS SOLUTION & IMPLEMENTATION                                */}
      {/* ========================================================================= */}
      <section id="solution" className="py-12 sm:py-16 bg-white border-b border-slate-100 scroll-mt-20">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-12">
            
            {/* Left Visual */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-white">
                <img
                  src={caseStudy.secondaryImage}
                  alt={caseStudy.secondaryImageAlt}
                  className="w-full h-auto object-cover max-h-[380px]"
                />
              </div>
            </div>

            {/* Right Narrative */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] block">
                ATLAS SOLUTION & IMPLEMENTATION
              </span>
              <h2 className="font-serif text-[28px] sm:text-[36px] font-bold text-[#142B59] tracking-tight leading-tight">
                {caseStudy.solutionImplementation.heading}
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed">
                {caseStudy.solutionImplementation.description}
              </p>
            </div>

          </div>

          {/* 4 Implementation Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {caseStudy.solutionImplementation.pillars.map((pil, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#1B72E8] hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1B72E8] flex items-center justify-center font-bold text-sm mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-[17px] font-bold text-[#172B50] mb-2 leading-snug">
                  {pil.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#53647A] leading-relaxed">
                  {pil.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: KEY FEATURES DEPLOYED                                          */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#f4f9ff]/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8]">
              SYSTEM CAPABILITIES
            </span>
            <h2 className="font-serif text-[30px] sm:text-[38px] font-bold text-[#142B59] tracking-tight">
              Key Features &{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                Capabilities Deployed
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#45546B]">
              Specific technical capabilities engineered to achieve the client's operational goals.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-3.5">
            {caseStudy.keyFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-3.5 p-2">
                <div className="w-5 h-5 rounded-full bg-[#142B59] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[15px] sm:text-[16px] text-[#172B50] font-medium leading-snug">
                  {feat}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: RELATED SERVICES & SOLUTIONS                                   */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] block mb-1">
                COMPLEMENTARY EXPERTISE
              </span>
              <h2 className="font-serif text-[26px] sm:text-[32px] font-bold text-[#142B59]">
                Related Services &{' '}
                <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                  Solutions
                </span>
              </h2>
            </div>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1B72E8] hover:underline"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudy.relatedSolutions.map((rel, idx) => (
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
      {/* SECTION 6: CONSULTATION CALL-TO-ACTION                                    */}
      {/* ========================================================================= */}
      <section id="contact-cta" className="py-12 sm:py-16 bg-[#f4f9ff]/60">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-2xl bg-gradient-to-br from-blue-50/90 via-[#f0f6ff] to-blue-50/70 border border-blue-200/80 p-8 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Heading & CTA */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#1B72E8] block">
                  READY FOR SIMILAR MEASURABLE RESULTS?
                </span>
                <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#142B59] tracking-tight leading-tight">
                  Achieve Similar Outcomes for{' '}
                  <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                    Your Business
                  </span>
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed">
                  Book a consultation with our technology architects to discuss your specific operations and explore how SAP Business One, Boyum IT, and UiPath RPA can transform your workflows.
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
                    to="/case-studies"
                    className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3.5 text-[15px] sm:text-[16px] bg-white text-[#142B59] hover:bg-slate-50 border border-slate-300 shadow-xs"
                  >
                    View More Case Studies
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
        title={`Book a Consultation — ${caseStudy.title}`}
      >
        {formSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#142B59]">Thank You!</h3>
            <p className="text-sm text-[#45546B]">
              Your consultation request has been received. Our solutions architect will contact you within 24 business hours.
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
                placeholder="e.g. Sunil Deshmukh"
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
                placeholder="Enterprise Pvt. Ltd."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B72E8]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#142B59] uppercase tracking-wider mb-1">Inquiry Context</label>
              <input
                type="text"
                readOnly
                value={formData.areaOfInterest}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#142B59] uppercase tracking-wider mb-1">Brief Description of Your Requirements</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your current operational challenges..."
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

