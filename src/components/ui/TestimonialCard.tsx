import React from 'react';
import { Quote } from 'lucide-react';
import { VerificationBadge } from './VerificationBadge';

interface TestimonialCardProps {
  quote: string;
  author: string;
  imageSrc: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, imageSrc }) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Left Photo Box (approx 38% width on desktop) */}
      <div className="w-full sm:w-2/5 min-h-[240px] bg-slate-100 relative overflow-hidden border-b sm:border-b-0 sm:border-r border-slate-200">
        <img
          src={imageSrc}
          alt="Client testimonial"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Right Content Box */}
      <div className="w-full sm:w-3/5 p-7 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Blue quote mark */}
          <div className="text-blue-600 mb-3.5">
            <Quote className="w-8 h-8 fill-blue-50 text-blue-600" />
          </div>

          {/* Quotation text (16-18px) */}
          <p className="text-[16px] sm:text-[18px] italic text-slate-700 leading-relaxed mb-5">
            "{quote}"
          </p>
        </div>

        {/* Attribution & Verification Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[14px] sm:text-[15px] font-bold text-slate-800">
            {author}
          </span>
          <VerificationBadge
            note="Customer testimonial from ATPL WEB Site_Content.pdf. Flagged for verification & client permission before production publication."
            variant="subtle"
          />
        </div>
      </div>
    </div>
  );
};
