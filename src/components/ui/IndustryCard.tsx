import React from 'react';
import { Factory, Boxes, Landmark, Ship, CheckCircle, TrendingUp } from 'lucide-react';
import { IndustryItem } from '../../types';

const iconMap: Record<string, React.ReactNode> = {
  Factory: <Factory className="w-6 h-6 text-brand-600" />,
  Boxes: <Boxes className="w-6 h-6 text-indigo-600" />,
  Finance: <Landmark className="w-6 h-6 text-emerald-600" />,
  Ship: <Ship className="w-6 h-6 text-cyan-600" />,
};

interface IndustryCardProps {
  industry: IndustryItem;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({ industry }) => {
  return (
    <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300">
      <div>
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
            {iconMap[industry.iconName] || <Factory className="w-6 h-6 text-brand-600" />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {industry.title}
            </h3>
            <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
              {industry.subtitle}
            </span>
          </div>
        </div>

        {/* Operational Challenge */}
        <div className="mb-4 p-3 rounded-xl bg-rose-50/60 border border-rose-100/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 block mb-1">
            Operational Challenge
          </span>
          <p className="text-xs text-rose-950 leading-relaxed">
            {industry.painPoints}
          </p>
        </div>

        {/* Delivered Solution */}
        <div className="mb-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Engineered Solution
          </span>
          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            {industry.deliveredSolution}
          </p>
        </div>
      </div>

      {/* Measurable Outcomes */}
      <div className="pt-4 border-t border-slate-100">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
          <TrendingUp className="w-3.5 h-3.5 text-brand-600" />
          Documented Impact
        </span>
        <ul className="space-y-2">
          {industry.keyOutcomes.map((kpi, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-800 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
              <span>{kpi}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

