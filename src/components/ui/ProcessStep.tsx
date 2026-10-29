import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { ProcessStepItem } from '../../types';

interface ProcessStepProps {
  step: ProcessStepItem;
  isLast?: boolean;
}

export const ProcessStep: React.FC<ProcessStepProps> = ({ step, isLast = false }) => {
  return (
    <div className="relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300">
      <div>
        {/* Step number and timeframe */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl sm:text-4xl font-extrabold text-brand-600/30">
            {step.step}
          </span>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
            <Clock className="w-3.5 h-3.5 text-brand-600" />
            <span>{step.timeframe}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {step.description}
        </p>
      </div>

      {/* Deliverables */}
      <div className="pt-4 border-t border-slate-100">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
          Key Milestones
        </span>
        <ul className="space-y-2">
          {step.deliverables.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
