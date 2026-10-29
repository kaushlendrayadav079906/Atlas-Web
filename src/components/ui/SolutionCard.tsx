import React from 'react';
import { 
  Database, 
  Layers, 
  Cpu, 
  Ship, 
  Truck, 
  BrainCircuit, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SolutionItem } from '../../types';
import { Button } from './Button';

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database className="w-6 h-6 text-brand-500" />,
  Layers: <Layers className="w-6 h-6 text-indigo-500" />,
  Cpu: <Cpu className="w-6 h-6 text-accent-cyan" />,
  Ship: <Ship className="w-6 h-6 text-blue-500" />,
  Truck: <Truck className="w-6 h-6 text-sky-500" />,
  BrainCircuit: <BrainCircuit className="w-6 h-6 text-purple-500" />,
};

interface SolutionCardProps {
  solution: SolutionItem;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ solution }) => {
  return (
    <div
      className={`group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
        solution.highlight
          ? 'border-brand-300 shadow-md ring-1 ring-brand-100'
          : 'border-slate-200/90 hover:border-slate-300 shadow-sm'
      }`}
    >
      {solution.highlight && (
        <div className="absolute -top-3 right-6 inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-600 text-white shadow-sm">
          <Sparkles className="w-3 h-3" />
          Core Pillar
        </div>
      )}

      <div>
        {/* Icon & Title Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-105 group-hover:bg-brand-50 transition-all duration-200">
            {iconMap[solution.iconName] || <Database className="w-6 h-6 text-brand-600" />}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
              {solution.title}
            </h3>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs font-semibold text-brand-700 uppercase tracking-wide mb-3">
          {solution.tagline}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {solution.description}
        </p>

        {/* Key Capabilities */}
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Key Capabilities
          </div>
          <ul className="space-y-2.5">
            {solution.capabilities.map((cap, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer: Business Impact & CTA */}
      <div className="pt-5 mt-4 border-t border-slate-100">
        <div className="mb-4 p-3 rounded-lg bg-slate-50 border border-slate-100/80">
          <span className="text-[11px] font-bold uppercase text-slate-500 block mb-0.5">
            Business Impact
          </span>
          <span className="text-xs sm:text-sm font-semibold text-slate-900">
            {solution.businessImpact}
          </span>
        </div>

        <Button
          href={solution.ctaTarget}
          variant={solution.highlight ? 'primary' : 'secondary'}
          size="sm"
          fullWidth
          icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
        >
          {solution.ctaText}
        </Button>
      </div>
    </div>
  );
};

