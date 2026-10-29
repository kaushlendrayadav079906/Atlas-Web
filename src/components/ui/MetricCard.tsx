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
    <div className="flex flex-col items-center text-center p-6 sm:p-7 rounded-2xl bg-white transition-all duration-200">
      {/* Icon in soft blue circle */}
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
        {iconMap[metric.id] || <Users className="w-6 h-6 text-blue-600" />}
      </div>

      {/* Metric Number: 36–44px */}
      <div className="text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-blue-600 tracking-tight leading-none mb-2">
        {metric.value}
      </div>

      {/* Metric Label: 16–18px */}
      <div className="text-[15px] sm:text-[17px] font-semibold text-slate-800 leading-snug">
        {metric.label}
      </div>

      {metric.requiresVerification && (
        <div className="mt-2.5">
          <VerificationBadge note={metric.sourceNote} variant="subtle" />
        </div>
      )}
    </div>
  );
};
