import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
  to = '/case-studies',
  verificationNote = 'Sample Enterprise Story'
}) => {
  return (
    <figure className="group m-0 flex flex-col h-full rounded-[28px] bg-white border border-atlas-line hover:shadow-enterprise-lg transition-all duration-300 overflow-hidden min-w-0">
      <div className="p-7 sm:p-9 flex flex-col gap-6 flex-1 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {category && (
            <span className="px-3 py-1.5 rounded-full bg-white border border-atlas-lineStrong text-[12px] font-bold uppercase tracking-[0.08em] text-atlas-royal">
              {category}
            </span>
          )}
          <Link
            to={to}
            className="inline-flex items-center gap-1.5 text-[14px] font-bold text-atlas-navy hover:text-atlas-royal transition-colors"
          >
            Read case study
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <blockquote className="m-0 text-[18px] sm:text-[20px] leading-[1.55] font-semibold text-atlas-navy break-words [overflow-wrap:anywhere]">
          “{quote}”
        </blockquote>

        <figcaption className="mt-auto flex items-center gap-4 min-w-0">
          <img
            src={imageSrc}
            alt=""
            style={{ objectPosition }}
            className="w-14 h-14 rounded-2xl object-cover shrink-0 bg-slate-200"
            onError={(e) => {
              e.currentTarget.src = '/images/case_studies/cs_warehouse.jpg';
            }}
          />
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-bold text-atlas-navy leading-snug">{author}</div>
            {companyCategory && <div className="text-[13px] text-atlas-body leading-snug mt-0.5">{companyCategory}</div>}
          </div>
          <div className="shrink-0 hidden sm:block">
            <VerificationBadge note={verificationNote} variant="subtle" />
          </div>
        </figcaption>
      </div>
    </figure>
  );
};
