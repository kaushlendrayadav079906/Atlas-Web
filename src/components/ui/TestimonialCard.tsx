import React from 'react';
import { Quote, Star } from 'lucide-react';
import { TestimonialItem } from '../../types';
import { VerificationBadge } from './VerificationBadge';

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-md hover:border-slate-700 transition-all duration-300">
      <div>
        {/* Top: Stars and Quote Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(testimonial.rating || 5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <Quote className="w-7 h-7 text-slate-700" />
        </div>

        {/* Quote */}
        <p className="text-sm sm:text-base italic text-slate-200 leading-relaxed mb-6 font-light">
          "{testimonial.quote}"
        </p>
      </div>

      {/* Attribution & Verification Footer */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="text-xs sm:text-sm font-bold text-white">
            {testimonial.authorRole}
          </div>
          <div className="text-xs text-slate-400">
            {testimonial.companyContext}
          </div>
        </div>

        <VerificationBadge note={testimonial.claimNote} variant="subtle" />
      </div>
    </div>
  );
};

