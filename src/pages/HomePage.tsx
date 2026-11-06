import { LogoMarquee } from '../components/ui/LogoMarquee';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BlogSection } from '../components/ui/blog/BlogSection';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  TrendingUp
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { MetricCard } from '../components/ui/MetricCard';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { ServiceCard } from '../components/ui/SolutionCard';
import { IndustryCard } from '../components/ui/IndustryCard';
import { ProcessStep } from '../components/ui/ProcessStep';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { ConsultationModal } from '../components/ui/ConsultationModal';
import { CallbackModal } from '../components/ui/CallbackModal';
import { CtaContactCards } from '../components/ui/CtaContactCards';
import { SAPBusinessOneLogo, BoyumITLogo, UiPathLogo } from '../components/ui/PartnerLogos';
import { TRUST_METRICS } from '../data/websiteContent';

export interface CustomerStoryItem {
  id: string;
  category: string;
  quote: string;
  designation: string;
  companyCategory: string;
  imageSrc: string;
  objectPosition?: string;
  caseStudyUrl: string;
  verificationNote: string;
}

export const CUSTOMER_STORIES: CustomerStoryItem[] = [
  {
    id: 'warehouse-management',
    category: 'Warehouse Management',
    quote: 'Deploying Produmex WMS with SAP Business One transformed our fulfillment. Dispatch errors dropped significantly, and warehouse throughput increased by over 40%.',
    designation: 'Supply Chain & Logistics Director',
    companyCategory: 'Industrial Distribution Sector',
    imageSrc: '/images/case_studies/cs_warehouse.jpg',
    objectPosition: '50% 40%',
    caseStudyUrl: '/case-studies/warehouse-management',
    verificationNote: 'Sample Enterprise Story · Logistics'
  },
  {
    id: 'trading-distribution',
    category: 'Trading & Distribution',
    quote: 'The multi-currency reconciliation and automated landed-cost tracking unified our import-export operations across four distribution centers with live visibility.',
    designation: 'Head of International Trade',
    companyCategory: 'Global Commodity & Trading Group',
    imageSrc: '/images/crystal_hd/ind_shipping.jpg',
    objectPosition: 'center 45%',
    caseStudyUrl: '/case-studies/trading-operations',
    verificationNote: 'Sample Enterprise Story · Trading'
  },
  {
    id: 'retail-wholesale',
    category: 'Retail & Wholesale',
    quote: 'Our omnichannel inventory synchronization between retail storefronts and central warehousing eliminated stockouts and gave our management instant cash-flow control.',
    designation: 'Retail Operations Director',
    companyCategory: 'Multi-Store Retail Chain',
    imageSrc: '/images/solutions/solutions_sales_handshake.jpg',
    objectPosition: 'center 35%',
    caseStudyUrl: '/case-studies/inventory-visibility',
    verificationNote: 'Sample Enterprise Story · Retail'
  },
  {
    id: 'manufacturing',
    category: 'Manufacturing',
    quote: 'Beas Manufacturing integration with SAP Business One gave our production floor live shop-floor data capture, job costing precision, and flawless BOM scheduling.',
    designation: 'Plant & Production Manager',
    companyCategory: 'Precision Component Manufacturing',
    imageSrc: '/images/case_studies/cs_featured_manufacturing.jpg',
    objectPosition: 'center 40%',
    caseStudyUrl: '/case-studies/warehouse-management',
    verificationNote: 'Sample Enterprise Story · Manufacturing'
  },
  {
    id: 'finance-administration',
    category: 'Finance & Administration',
    quote: 'Automated invoice approvals and instant bank reconciliations cut our month-end financial closing time from ten days to under 48 hours without increasing headcount.',
    designation: 'Chief Financial Officer',
    companyCategory: 'Commercial Services Group',
    imageSrc: '/images/crystal_hd/ind_finance.jpg',
    objectPosition: 'center 35%',
    caseStudyUrl: '/case-studies/business-process-automation',
    verificationNote: 'Sample Enterprise Story · Finance'
  },
  {
    id: 'business-process-automation',
    category: 'Business Process Automation',
    quote: 'UiPath software robots implemented by ATLAS now process our routine vendor validations and transactional entries 24/7 with zero processing errors.',
    designation: 'Head of Digital Transformation',
    companyCategory: 'Enterprise Logistics & Supply',
    imageSrc: '/images/solutions/solutions_uipath_robot.jpg',
    objectPosition: 'center 40%',
    caseStudyUrl: '/case-studies/business-process-automation',
    verificationNote: 'Sample Enterprise Story · RPA & AI'
  }
];

export const HomePage: React.FC = () => {
  // Contact Form & Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("SAP Business One Implementation");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setActiveSlide(prev => {
        const max = mobile ? CUSTOMER_STORIES.length - 1 : Math.ceil(CUSTOMER_STORIES.length / 2) - 1;
        return Math.min(prev, Math.max(0, max));
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = useMemo(() => {
    if (isMobile) {
      return CUSTOMER_STORIES.map(story => [story]);
    }
    const pairs: CustomerStoryItem[][] = [];
    for (let i = 0; i < CUSTOMER_STORIES.length; i += 2) {
      pairs.push(CUSTOMER_STORIES.slice(i, i + 2));
    }
    return pairs;
  }, [isMobile]);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setActiveSlide(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    setTouchStartX(null);
  };
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openConsultationFor = (area: string) => {
    setSelectedService(area);
    setIsModalOpen(true);
  };


  return (
    <div className="relative bg-white text-atlas-body selection:bg-atlas-royal selection:text-white">

      {/* ========================================================================= */}
      {/* HERO — mist canvas, large sans headline, signature-corner media           */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden atlas-cream" data-no-reveal>
        {/* Ambient drifting glows */}
        <div className="pointer-events-none absolute -top-40 right-[8%] w-[520px] h-[520px] rounded-full bg-atlas-gold/20 blur-[120px] animate-drift" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-48 left-[-6%] w-[460px] h-[460px] rounded-full bg-[#F5C77E]/25 blur-[120px] animate-drift-slow" aria-hidden="true" />
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full"
          viewBox="0 0 1440 640"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M860 0 L1440 420" stroke="rgba(181,122,16,0.16)" strokeWidth="1" fill="none" />
          <path d="M1040 0 L1440 260" stroke="rgba(181,122,16,0.16)" strokeWidth="1" fill="none" />
          <path className="animate-dash" d="M0 560 L720 640" stroke="rgba(224,163,59,0.45)" strokeWidth="1.2" fill="none" />
          <path className="animate-dash" d="M1440 520 C1180 470 1000 600 760 640" stroke="rgba(181,122,16,0.18)" strokeWidth="1" fill="none" />
        </svg>

        {/* Soft golden waves along the bottom (brand reference) */}
        <svg
          className="pointer-events-none absolute bottom-0 left-0 w-full h-[180px] sm:h-[220px]"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 150 C 240 95, 420 205, 720 150 S 1200 70, 1440 120 L1440 220 L0 220 Z" fill="#FCEFD9" opacity="0.9" />
          <path d="M0 185 C 300 140, 520 225, 860 180 S 1260 130, 1440 165 L1440 220 L0 220 Z" fill="#F8E2BC" opacity="0.55" />
        </svg>

        <div className="atlas-container relative pt-14 pb-32 sm:pt-20 sm:pb-36 lg:pt-24 lg:pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <div className="lg:col-span-7 flex flex-col gap-7 text-left">
              <span className="animate-fade-up self-start inline-flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-full bg-white/[0.06] border border-white/15 text-[13px] font-semibold text-atlas-onNavy tracking-[0.02em]">
                <span className="w-2 h-2 rounded-full bg-atlas-gold animate-pulse-ring" />
                Your partner for a smarter tomorrow
              </span>

              <h1 className="animate-fade-up anim-delay-1 atlas-h1-size font-extrabold !text-white">
                Where SAP Business One meets{' '}
                <span className="atlas-accent atlas-underline text-atlas-gold">intelligent automation</span>
              </h1>

              <p className="animate-fade-up anim-delay-2 text-[17px] sm:text-[19px] leading-relaxed text-atlas-onNavy max-w-[580px]">
                ATLAS Technosoft helps manufacturing, logistics, pharma, and trading companies streamline operations with SAP Business One, Boyum IT solutions, UiPath RPA, and AI-driven automation.
              </p>

              <div className="animate-fade-up anim-delay-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Button
                  id="hero-book-btn"
                  onClick={() => setIsModalOpen(true)}
                  variant="cyan"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Book a Consultation
                </Button>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full border-[1.5px] border-white/30 text-white hover:bg-white/10 hover:border-white/60 text-[16px] font-bold transition-colors"
                >
                  Our Story &amp; Team
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative animate-scale-in anim-delay-2">
              <img
                src="/images/crystal_hd/hero_team.jpg"
                alt="ATLAS Technosoft consultants collaborating on an SAP Business One dashboard"
                className="block w-full h-[320px] sm:h-[420px] lg:h-[470px] object-cover rounded-[28px] lg:rounded-[32px_140px_32px_32px]"
              />
              <div className="animate-float-in sm:absolute sm:-left-8 sm:bottom-8 mt-4 sm:mt-0 sm:w-[300px] rounded-[22px] bg-[#0E1F57]/95 backdrop-blur-md border border-white/12 p-5 shadow-float">
                <div className="atlas-accent text-[17px] text-atlas-gold mb-3">Proven impact</div>
                <dl className="divide-y divide-white/10">
                  {TRUST_METRICS.slice(0, 3).map((m) => (
                    <div key={m.id} className="flex items-baseline justify-between gap-4 py-2.5">
                      <dt className="text-[13px] text-atlas-onNavy">{m.label}</dt>
                      <dd className="atlas-accent text-[24px] text-atlas-gold leading-none">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <div className="animate-fade-up anim-delay-6 mt-14 lg:mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-atlas-onNavy/80 shrink-0">
              Technology partners &amp; certifications
            </span>
            <Link to="/partners" className="flex flex-wrap items-center gap-3" aria-label="Our technology partners">
              <span className="h-11 px-3.5 rounded-xl bg-white flex items-center transition-transform duration-300 hover:-translate-y-1"><SAPBusinessOneLogo className="h-6" /></span>
              <span className="h-11 px-3.5 rounded-xl bg-white flex items-center transition-transform duration-300 hover:-translate-y-1"><BoyumITLogo className="h-6" /></span>
              <span className="h-11 px-3.5 rounded-xl bg-white flex items-center transition-transform duration-300 hover:-translate-y-1"><UiPathLogo className="h-6" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STAT STRIP — overlaps hero                                                */}
      {/* ========================================================================= */}
      <section id="metrics" className="relative -mt-20 sm:-mt-[72px] px-4 sm:px-6 z-10">
        <div className="max-w-[1232px] mx-auto bg-white rounded-3xl border border-atlas-line shadow-strip grid grid-cols-2 lg:grid-cols-4 overflow-hidden">
          {TRUST_METRICS.map((metric, idx) => (
            <div
              key={metric.id}
              className={`border-atlas-line ${idx % 2 === 0 ? 'border-r' : ''} ${idx < 2 ? 'border-b lg:border-b-0' : ''} ${idx === 1 ? 'lg:border-r' : ''} ${idx === 3 ? '' : ''}`}
            >
              <MetricCard metric={metric} />
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SERVICES                                                                  */}
      {/* ========================================================================= */}
      <section id="services" className="pt-24 sm:pt-28 pb-20 sm:pb-24 bg-white">
        <div className="atlas-container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="flex flex-col gap-4 max-w-[820px]">
              <span className="atlas-eyebrow">Our services</span>
              <h2 className="atlas-h2">Empower your business with our <span className="atlas-accent text-atlas-royal">range of services</span></h2>
            </div>
            <p className="atlas-lead max-w-[380px] lg:pb-2">
              From ERP implementation to intelligent automation, we deliver end-to-end solutions to help your business grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            <ServiceCard
              id="sap-b1"
              title="SAP Business One Implementation & Optimization"
              bullets={[
                "Complete implementation",
                "Customization and configuration",
                "Streamline business operations"
              ]}
              ctaText="Learn More"
              ctaTarget="/services/sap-business-one"
            />
            <ServiceCard
              id="boyum"
              title="Boyum IT Solutions"
              bullets={[
                "Beas Manufacturing",
                "Produmex WMS",
                "B1 Usability Package (B1UP)"
              ]}
              ctaText="Learn More"
              ctaTarget="/services/boyum-it"
            />
            <ServiceCard
              id="uipath"
              title="UiPath RPA & AI Automation"
              bullets={[
                "Automate business processes",
                "RPA and AI-driven solutions",
                "Improve efficiency and reduce costs"
              ]}
              ctaText="Learn More"
              ctaTarget="/services/uipath-automation"
            />
            <ServiceCard
              id="atlas"
              title="ATLAS Proprietary Add-ons"
              bullets={[
                "Freight & Trading",
                "Gate Entry & Weighment",
                "WMS & Vendor Portal",
                "Shipping Automation",
                "RPA Vendor & Sales Automation"
              ]}
              ctaText="Learn More"
              ctaTarget="/services/atlas-addons"
            />
          </div>
        </div>
      </section>

      {/* Continuous client logo slider */}
      <LogoMarquee />

      {/* ========================================================================= */}
      {/* EXPERTISE — navy band with big sky numbers                                */}
      {/* ========================================================================= */}
      <section id="expertise" className="atlas-cream text-white py-20 sm:py-24 lg:py-28">
        <div className="atlas-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <span className="atlas-eyebrow !text-atlas-gold">Our expertise</span>
              <h2 className="atlas-h2-size font-extrabold !text-white">
                Bridging ERP and <span className="atlas-accent text-atlas-gold">intelligent automation</span>
              </h2>
              <p className="text-[17px] sm:text-[18px] leading-relaxed text-atlas-onNavy">
                We combine deep expertise in SAP Business One, business process optimization, manufacturing and warehouse solutions, and intelligent automation to deliver real business value.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 pt-1">
                {[
                  "End-to-end ERP implementation and support",
                  "Industry-focused solutions for manufacturing, warehousing, and trading",
                  "Business process optimization",
                  "Intelligent automation with RPA and AI"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15.5px] font-medium text-white">
                    <Check className="w-5 h-5 text-atlas-gold shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <Button href="/services" variant="cyan" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Explore Our Services &amp; Expertise
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <img
                src="/images/crystal_hd/expertise_erp.jpg"
                alt="Bridging ERP, manufacturing robotics, analytics and cloud automation"
                className="block w-full h-[280px] sm:h-[380px] lg:h-[420px] object-cover rounded-[28px]"
              />
            </div>
          </div>

          <div className="mt-16 sm:mt-20 pt-12 sm:pt-14 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '80+', label: 'Live SAP Business One deployments' },
              { value: '2', label: 'Offices in Mumbai' },
              { value: '24/7', label: 'Software robots at work' },
              { value: '3', label: 'Global technology partners' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <span className="text-[44px] sm:text-[56px] lg:text-[64px] font-medium leading-none tracking-[-0.04em] text-atlas-gold">
                  <AnimatedCounter value={stat.value} duration={1800} />
                </span>
                <span className="text-[14px] sm:text-[15px] text-atlas-onNavy">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INDUSTRIES                                                                */}
      {/* ========================================================================= */}
      <section id="industries" className="py-20 sm:py-24 lg:py-28 bg-white">
        <div className="atlas-container">
          <SectionHeading
            badge="Industries we serve"
            title="Industry-focused"
            titleHighlight="solutions"
            subtitle="We understand your industry challenges and deliver tailored solutions."
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            <IndustryCard
              id="manufacturing"
              title="Manufacturing"
              description="Streamline production, inventory and operations."
              imageSrc="/images/crystal_hd/ind_manufacturing.jpg"
              targetRoute="/industries/manufacturing"
            />
            <IndustryCard
              id="warehouse"
              title="Warehouse & Logistics"
              description="Optimize warehousing, logistics and supply chain."
              imageSrc="/images/crystal_hd/ind_warehouse.jpg"
              targetRoute="/industries/warehouse-logistics"
            />
            <IndustryCard
              id="finance"
              title="Finance & Administration"
              description="Improve financial control and administrative efficiency."
              imageSrc="/images/crystal_hd/ind_finance.jpg"
              targetRoute="/industries/finance-administration"
            />
            <IndustryCard
              id="trading"
              title="Trading & Shipping"
              description="Enhance trading operations and shipping processes."
              imageSrc="/images/crystal_hd/ind_shipping.jpg"
              targetRoute="/industries/trading-shipping"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* APPROACH                                                                  */}
      {/* ========================================================================= */}
      <section id="approach" className="py-20 sm:py-24 atlas-dark">
        <div className="atlas-container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="flex flex-col gap-4 max-w-[820px]">
              <span className="atlas-eyebrow">Our approach</span>
              <h2 className="atlas-h2">A structured approach for <span className="atlas-accent text-atlas-royal">lasting success</span></h2>
            </div>
            <p className="atlas-lead max-w-[380px] lg:pb-2">
              We follow a proven approach to understand, implement and optimize solutions for your business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            <ProcessStep number={1} title="Discover" description="Understand your business requirements and challenges." />
            <ProcessStep number={2} title="Design" description="Create the right solution for your needs." />
            <ProcessStep number={3} title="Implement" description="Deploy and integrate the solution." />
            <ProcessStep number={4} title="Optimize" description="Provide ongoing support and continuous improvement." isLast />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CUSTOMER SUCCESS — carousel                                               */}
      {/* ========================================================================= */}
      <section id="case-studies" className="py-20 sm:py-24 lg:py-28 bg-white">
        <div className="atlas-container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div className="flex flex-col gap-4 max-w-[820px]">
              <span className="atlas-eyebrow">Customer success</span>
              <h2 className="atlas-h2">Trusted by <span className="atlas-accent text-atlas-royal">growing businesses</span></h2>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={prevSlide}
                className="w-[52px] h-[52px] rounded-full border-[1.5px] border-atlas-lineStrong bg-white text-atlas-navy hover:border-atlas-navy flex items-center justify-center transition-colors"
                aria-label="Previous customer stories"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-[52px] h-[52px] rounded-full bg-atlas-navy text-white hover:bg-atlas-royal flex items-center justify-center transition-colors"
                aria-label="Next customer stories"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            className="overflow-hidden rounded-[28px] focus:outline-none focus-visible:ring-2 focus-visible:ring-atlas-royal"
            tabIndex={0}
            role="region"
            aria-label="Customer testimonial carousel"
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
              } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
              }
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out items-stretch"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {slides.map((slideStories, slideIdx) => (
                <div key={slideIdx} className="w-full shrink-0 flex-none">
                  <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-6 items-stretch h-full`}>
                    {slideStories.map((story) => (
                      <TestimonialCard
                        key={story.id}
                        id={story.id}
                        category={story.category}
                        quote={story.quote}
                        author={story.designation}
                        companyCategory={story.companyCategory}
                        imageSrc={story.imageSrc}
                        objectPosition={story.objectPosition}
                        to={story.caseStudyUrl}
                        verificationNote={story.verificationNote}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-8">
            <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial slide">
              {Array.from({ length: totalSlides }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setActiveSlide(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  role="tab"
                  aria-selected={activeSlide === dotIdx}
                  className={`transition-all duration-300 rounded-full cursor-pointer h-2.5 ${
                    activeSlide === dotIdx ? 'w-8 bg-atlas-royal' : 'w-2.5 bg-atlas-lineStrong hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-[15px] font-bold text-atlas-navy hover:text-atlas-royal group transition-colors"
            >
              Explore all customer case studies
              <ArrowRight className="w-4 h-4 text-atlas-royal group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PARTNERS                                                                  */}
      {/* ========================================================================= */}
      <section id="partners" className="py-14 sm:py-16 atlas-dark">
        <div className="atlas-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col gap-3">
              <span className="atlas-eyebrow">Our partners</span>
              <h2 className="atlas-h2-size font-extrabold text-atlas-navy">
                Working with <span className="atlas-accent text-atlas-royal">global technology leaders</span>
              </h2>
              <p className="atlas-lead">We collaborate with industry-leading technology partners to deliver the best solutions.</p>
            </div>
            <div className="lg:col-span-6 flex flex-col gap-4 lg:items-end">
              <Link to="/partners" className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:max-w-[640px]" aria-label="View our partners">
                <span className="h-24 rounded-3xl bg-white border border-atlas-line hover:border-atlas-royal/40 hover:shadow-enterprise flex items-center justify-center transition-all"><SAPBusinessOneLogo className="h-9" /></span>
                <span className="h-24 rounded-3xl bg-white border border-atlas-line hover:border-atlas-royal/40 hover:shadow-enterprise flex items-center justify-center transition-all"><BoyumITLogo className="h-9" /></span>
                <span className="h-24 rounded-3xl bg-white border border-atlas-line hover:border-atlas-royal/40 hover:shadow-enterprise flex items-center justify-center transition-all"><UiPathLogo className="h-9" /></span>
              </Link>
              <Link to="/partners" className="inline-flex items-center gap-1.5 text-[14px] font-bold text-atlas-royal hover:text-atlas-royalDark">
                Explore our certified partner ecosystem
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest insights & articles */}
      <BlogSection />

      {/* ========================================================================= */}
      {/* CTA — royal block                                                         */}
      {/* ========================================================================= */}
      <section id="contact" className="pb-20 sm:pb-24 pt-4 bg-white">
        <div className="atlas-container">
          <div className="rounded-[32px] atlas-cream p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-atlas-gold">Let&apos;s work together</span>
              <h2 className="atlas-h2-size font-extrabold !text-white">
                Ready to transform <span className="atlas-accent text-atlas-gold">your business?</span>
              </h2>
              <p className="text-[16px] sm:text-[18px] leading-relaxed text-atlas-onNavy max-w-lg">
                Book a consultation with our experts and explore how we can help you streamline operations and drive growth.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-atlas-gold text-atlas-navy hover:bg-[#EBB55A] text-[16px] font-extrabold transition-colors"
                >
                  Book a Consultation
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsCallbackModalOpen(true)}
                  className="inline-flex items-center gap-2.5 px-6 py-[15px] rounded-full border-[1.5px] border-white/30 text-white hover:bg-white/10 hover:border-white/60 text-[16px] font-bold transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  Request a Callback
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-4 py-[15px] text-white/90 hover:text-white text-[16px] font-bold underline-offset-4 hover:underline"
                >
                  Contact us
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <CtaContactCards />
            </div>
          </div>
        </div>
      </section>

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={selectedService}
      />

      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
        defaultService={selectedService}
      />
    </div>
  );
};
