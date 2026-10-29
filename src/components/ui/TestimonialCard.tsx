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
    <div className="flex flex-col sm:flex-row items-center rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
      {/* Left Photo Box */}
      <div className="w-full sm:w-36 md:w-40 h-44 sm:h-full min-h-[160px] bg-slate-100 shrink-0 relative overflow-hidden border-b sm:border-b-0 sm:border-r border-slate-200">
        <img
          src={imageSrc}
          alt="Client portrait"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Right Content Box */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between h-full">
        <div>
          {/* Blue quote mark */}
          <div className="text-blue-600 mb-2">
            <Quote className="w-6 h-6 fill-blue-50 text-blue-600" />
          </div>

          {/* Quotation text */}
          <p className="text-[14px] sm:text-[15px] italic text-slate-700 leading-relaxed mb-3">
            "{quote}"
          </p>
        </div>

        {/* Attribution & Verification Footer */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700">
            {author}
          </span>
          <VerificationBadge
            note="Testimonial from ATPL WEB Site_Content.pdf. Flagged for verification & client permission before production publication."
            variant="subtle"
          />
        </div>
      </div>
    </div>
  );
};
