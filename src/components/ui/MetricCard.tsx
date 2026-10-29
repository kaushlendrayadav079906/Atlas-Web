import React from 'react';
import { Users, TrendingUp, Database, Award } from 'lucide-react';
import { MetricItem } from '../../types';
import { VerificationBadge } from './VerificationBadge';

interface MetricCardProps {
  metric: MetricItem;
}

const iconMap: Record<string, React.ReactNode> = {
  clients: <Users className="w-5 h-5 text-blue-600" />,
  retention: <TrendingUp className="w-5 h-5 text-blue-600" />,
  transactions: <Database className="w-5 h-5 text-blue-600" />,
  consultants: <Award className="w-5 h-5 text-blue-600" />,
};

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  return (
    <div className="flex flex-col items-center text-center p-3 sm:p-4 transition-all duration-200">
      {/* Icon in soft blue circle */}
      <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-2.5 mx-auto">
        {iconMap[metric.id] || <Users className="w-5 h-5 text-blue-600" />}
      </div>

      {/* Metric Number: 36–42px bold */}
      <div className="text-[32px] sm:text-[36px] lg:text-[40px] font-extrabold text-blue-600 tracking-tight leading-none mb-1.5">
        {metric.value}
      </div>

      {/* Metric Label: 16–17px */}
      <div className="text-[15px] sm:text-[16px] font-bold text-slate-800 leading-snug">
        {metric.label}
      </div>

      {metric.requiresVerification && (
        <div className="mt-1.5">
          <VerificationBadge note={metric.sourceNote} variant="subtle" />
        </div>
      )}
    </div>
  );
};
