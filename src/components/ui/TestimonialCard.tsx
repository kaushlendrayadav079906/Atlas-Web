import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Quote, ArrowRight } from 'lucide-react';
import { VerificationBadge } from './VerificationBadge';

export interface TestimonialCardProps {
  id?: string;
  category?: string;
  quote: string;
  author: string;
  companyCategory?: string;
  imageSrc: string;
  objectPosition?: string;
  to?: string;
  verificationNote?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  category,
  quote,
  author,
  companyCategory,
  imageSrc,
  objectPosition = 'center',
  to = "/case-studies",
  verificationNote = "Sample Enterprise Story"
}) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // If user clicked directly on an anchor or button, let that handle it
    if ((e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) return;
    navigate(to);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col sm:flex-row items-stretch rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-[#1B72E8]/40 transition-all duration-300 h-full cursor-pointer text-left overflow-hidden min-w-0 w-full box-border"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Left Image Section: approximately 38% width on sm/desktop */}
      <div className="w-full sm:w-[38%] min-h-[220px] sm:min-h-0 relative shrink-0 overflow-hidden bg-slate-100 border-b sm:border-b-0 sm:border-r border-slate-100">
        <img
          src={imageSrc}
          alt={`${category || 'Customer story'} visual`}
          style={{ objectPosition }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = "/images/case_studies/cs_warehouse.jpg";
          }}
        />
        {/* Subtle mobile overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent sm:hidden pointer-events-none" />
      </div>

      {/* Right Testimonial Content: approximately 62% width on sm/desktop */}
      <div className="w-full sm:w-[62%] p-4 sm:p-5 lg:p-6 flex flex-col justify-between h-full bg-white min-w-0 box-border">
        <div className="min-w-0">
          {/* Top row: Responsive Header with Badge & Read Case Study Link */}
          <div className="flex flex-wrap items-center justify-between gap-x-2.5 gap-y-2 mb-3 min-w-0">
            {category && (
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#1B72E8] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100/80 inline-block shrink-0">
                {category}
              </span>
            )}

            <Link
              to={to}
              onClick={(e) => e.stopPropagation()}
              className="text-[12px] font-bold text-[#1B72E8] hover:text-[#142B59] inline-flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <span>Read Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          </div>

          {/* Quote icon & Testimonial text */}
          <div className="flex items-start gap-2.5 mb-3 min-w-0">
            <Quote className="w-5 h-5 text-[#1B72E8] shrink-0 fill-blue-50/70 mt-0.5" />
            <p className="text-[13px] sm:text-[13.5px] lg:text-[14px] italic text-[#45546B] leading-relaxed font-normal break-words [overflow-wrap:anywhere] min-w-0">
              "{quote}"
            </p>
          </div>
        </div>

        <div className="min-w-0 mt-auto">
          {/* Subtle Divider */}
          <div className="w-full my-3 border-t border-slate-100" />

          {/* Designation, Company & Source Verification */}
          <div className="flex flex-wrap items-center justify-between gap-2 min-w-0">
            <div className="min-w-0 pr-1 flex-1">
              <div className="font-bold text-[#142B59] group-hover:text-[#1B72E8] transition-colors text-[13px] sm:text-[13.5px] leading-snug break-words [overflow-wrap:anywhere]">
                {author}
              </div>
              {companyCategory && (
                <div className="text-[11px] sm:text-[12px] text-[#53647A] leading-snug mt-0.5 break-words [overflow-wrap:anywhere]">
                  {companyCategory}
                </div>
              )}
            </div>

            <div className="shrink-0">
              <VerificationBadge
                note={verificationNote}
                variant="subtle"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
