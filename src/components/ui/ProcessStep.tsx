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
    <div className="relative flex-1 flex flex-col items-center text-center p-3 sm:p-4">
      {/* Prominent Blue Circle Badge */}
      <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-extrabold text-[18px] flex items-center justify-center shadow-md shadow-blue-600/25 mb-3 shrink-0">
        {number}
      </div>

      {/* Step Heading */}
      <h3 className="text-[17px] sm:text-[19px] font-bold text-slate-900 mb-1.5">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[13px] sm:text-[14px] text-slate-600 leading-snug max-w-[220px]">
        {description}
      </p>

      {/* Desktop Connecting Arrow between steps */}
      {!isLast && (
        <div className="hidden lg:flex absolute top-9 -right-3 translate-x-1/2 text-slate-300">
          <ArrowRight className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};
