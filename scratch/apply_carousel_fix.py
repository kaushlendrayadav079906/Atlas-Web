import re

path = 'src/pages/HomePage.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update React import if needed
content = re.sub(
    r"import React, \{ useState, useEffect \} from 'react';",
    "import React, { useState, useEffect, useMemo, useCallback } from 'react';",
    content
)

# 2. Update CUSTOMER_STORIES definition cleanly
old_stories_pattern = r'export const CUSTOMER_STORIES: CustomerStoryItem\[\] = \[.*?\n\];'
new_stories = """export const CUSTOMER_STORIES: CustomerStoryItem[] = [
  {
    id: 'warehouse-management',
    category: 'Warehouse Management',
    quote: 'Deploying Produmex WMS with SAP Business One transformed our fulfillment. Dispatch errors dropped significantly, and warehouse throughput increased by over 40%.',
    designation: 'Supply Chain & Logistics Director',
    companyCategory: 'Industrial Distribution Sector',
    imageSrc: '/images/case_studies/cs_warehouse_crop.jpg',
    caseStudyUrl: '/case-studies/warehouse-management',
    verificationNote: 'Sample Enterprise Story · Logistics'
  },
  {
    id: 'trading-distribution',
    category: 'Trading & Distribution',
    quote: 'The multi-currency reconciliation and automated landed-cost tracking unified our import-export operations across four distribution centers with live visibility.',
    designation: 'Head of International Trade',
    companyCategory: 'Global Commodity & Trading Group',
    imageSrc: '/images/case_studies/cs_trading_crop.jpg',
    caseStudyUrl: '/case-studies/trading-operations',
    verificationNote: 'Sample Enterprise Story · Trading'
  },
  {
    id: 'retail-wholesale',
    category: 'Retail & Wholesale',
    quote: 'Our omnichannel inventory synchronization between retail storefronts and central warehousing eliminated stockouts and gave our management instant cash-flow control.',
    designation: 'Retail Operations Director',
    companyCategory: 'Multi-Store Retail Chain',
    imageSrc: '/images/case_studies/cs_retail_crop.jpg',
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
    caseStudyUrl: '/case-studies/business-process-automation',
    verificationNote: 'Sample Enterprise Story · Finance'
  },
  {
    id: 'business-process-automation',
    category: 'Business Process Automation',
    quote: 'UiPath software robots implemented by ATLAS now process our routine vendor validations and transactional entries 24/7 with zero processing errors.',
    designation: 'Head of Digital Transformation',
    companyCategory: 'Enterprise Logistics & Supply',
    imageSrc: '/images/case_studies/cs_automation_crop.jpg',
    caseStudyUrl: '/case-studies/business-process-automation',
    verificationNote: 'Sample Enterprise Story · RPA & AI'
  }
];"""

content = re.sub(old_stories_pattern, new_stories, content, flags=re.DOTALL)

# 3. Update Carousel state in HomePage component
old_state_pattern = r'const \[activeSlide, setActiveSlide\] = useState\(0\);.*?const visibleStories =.*?;'
new_state = """const [activeSlide, setActiveSlide] = useState(0);
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
  };"""

content = re.sub(old_state_pattern, new_state, content, flags=re.DOTALL)

# 4. Update Section 8 JSX
old_section_pattern = r'\{/\* SECTION 8: CUSTOMER SUCCESS.*?\{/\* SECTION 9: OUR PARTNERS'
new_section = """{/* SECTION 8: CUSTOMER SUCCESS (RESPONSIVE CAROUSEL)                      */}
      {/* ========================================================================= */}
      <section id="case-studies" className="py-12 sm:py-14 lg:py-16 bg-[#f4f9ff]/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="CUSTOMER SUCCESS"
            title="Trusted by"
            titleHighlight="Growing Businesses"
            subtitle="We help businesses across industries streamline operations and achieve their goals with proven enterprise solutions."
            align="center"
          />

          {/* Testimonials Carousel Container with outer clearance for arrows */}
          <div className="relative max-w-6xl mx-auto px-3 sm:px-4 md:px-14 lg:px-16">
            {/* Desktop Left navigation arrow */}
            <button
              type="button"
              onClick={prevSlide}
              className="hidden md:flex absolute left-0 lg:left-1 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-slate-200 text-[#142B59] hover:text-[#1B72E8] hover:border-[#1B72E8] items-center justify-center shadow-md hover:shadow-xl z-20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous customer testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Testimonials Carousel Track Viewport */}
            <div
              className="overflow-hidden rounded-2xl focus:outline-none"
              tabIndex={0}
              role="region"
              aria-label="Customer Testimonial Carousel"
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
                  <div
                    key={slideIdx}
                    className="w-full shrink-0 flex-none px-1"
                  >
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
                          to={story.caseStudyUrl}
                          verificationNote={story.verificationNote}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Right navigation arrow */}
            <button
              type="button"
              onClick={nextSlide}
              className="hidden md:flex absolute right-0 lg:right-1 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-slate-200 text-[#142B59] hover:text-[#1B72E8] hover:border-[#1B72E8] items-center justify-center shadow-md hover:shadow-xl z-20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next customer testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Carousel Controls Bar (Pagination Dots + Mobile Arrows) */}
          <div className="flex items-center justify-center gap-3 pt-6">
            {/* Mobile Left Arrow */}
            <button
              type="button"
              onClick={prevSlide}
              className="flex md:hidden w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 items-center justify-center shadow-xs active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setActiveSlide(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  role="tab"
                  aria-selected={activeSlide === dotIdx}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeSlide === dotIdx
                      ? 'w-7 h-2.5 bg-gradient-to-r from-[#1B72E8] to-[#7139E8] shadow-xs'
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            {/* Mobile Right Arrow */}
            <button
              type="button"
              onClick={nextSlide}
              className="flex md:hidden w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 items-center justify-center shadow-xs active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Explore Case Studies Link */}
          <div className="text-center pt-6">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#142B59] hover:text-[#1B72E8] group transition-colors"
            >
              <span>Explore All Verified Customer Case Studies</span>
              <ArrowRight className="w-4 h-4 text-[#1B72E8] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: OUR PARTNERS"""

content = re.sub(old_section_pattern, new_section, content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated HomePage.tsx successfully")

