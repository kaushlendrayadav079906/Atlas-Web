import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

export const ProcessStep: React.FC<ProcessStepProps> = ({
  number,
  title,
  description,
  isLast = false,
}) => {
  return (
    <div className="relative flex-1 flex flex-col items-center text-center p-6 sm:p-7 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all h-full justify-between">
      <div className="flex flex-col items-center">
        {/* Prominent numbered circle */}
        <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-extrabold text-[20px] flex items-center justify-center shadow-md shadow-blue-600/25 mb-4 shrink-0">
          {number}
        </div>

        {/* Step Heading: 18–20px */}
        <h3 className="text-[18px] sm:text-[20px] font-bold text-slate-900 mb-2.5">
          {title}
        </h3>

        {/* Description: 16–17px */}
        <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Desktop connector arrow */}
      {!isLast && (
        <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-slate-200 text-slate-400 items-center justify-center shadow-sm">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  );
};
