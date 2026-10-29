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
    <div className="relative flex-1 flex flex-col items-center text-center p-4">
      {/* Numbered circle: prominent blue circle */}
      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-blue-600 text-white font-extrabold text-[18px] sm:text-[20px] flex items-center justify-center shadow-md shadow-blue-600/25 mb-4 shrink-0">
        {number}
      </div>

      {/* Step Heading: 18–20px */}
      <h3 className="text-[18px] sm:text-[20px] font-bold text-slate-900 mb-2">
        {title}
      </h3>

      {/* Description: 16–17px */}
      <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed max-w-xs">
        {description}
      </p>

      {/* Desktop connecting arrow */}
      {!isLast && (
        <div className="hidden lg:flex absolute top-10 -right-4 translate-x-1/2 text-slate-300">
          <ArrowRight className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
