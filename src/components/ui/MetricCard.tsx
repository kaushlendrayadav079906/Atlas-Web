import React from 'react';
import { Users, TrendingUp, Database, Award } from 'lucide-react';
import { MetricItem } from '../../types';
import { VerificationBadge } from './VerificationBadge';

interface MetricCardProps {
  metric: MetricItem;
}

const iconMap: Record<string, React.ReactNode> = {
  clients: <Users className="w-6 h-6 text-blue-600" />,
  retention: <TrendingUp className="w-6 h-6 text-blue-600" />,
  transactions: <Database className="w-6 h-6 text-blue-600" />,
  consultants: <Award className="w-6 h-6 text-blue-600" />,
};

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 sm:p-7 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-200 h-full justify-between">
      <div>
        {/* Icon in soft blue box */}
        <div className="w-13 h-13 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 mx-auto">
          {iconMap[metric.id] || <Users className="w-6 h-6 text-blue-600" />}
        </div>

        {/* Metric Number: 36–44px */}
        <div className="text-[34px] sm:text-[40px] lg:text-[44px] font-extrabold text-blue-600 tracking-tight leading-none mb-2.5">
          {metric.value}
        </div>

        {/* Metric Label: 16–18px */}
        <div className="text-[16px] sm:text-[17px] font-bold text-slate-800 leading-snug">
          {metric.label}
        </div>
      </div>

      {metric.requiresVerification && (
        <div className="mt-3 pt-2">
          <VerificationBadge note={metric.sourceNote} variant="subtle" />
        </div>
      )}
    </div>
  );
};
