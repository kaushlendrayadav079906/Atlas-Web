import React from 'react';
import { Factory, Truck, Database, Ship, ArrowRight } from 'lucide-react';

interface IndustryCardProps {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}

const iconMap: Record<string, React.ReactNode> = {
  manufacturing: <Factory className="w-5 h-5 text-blue-600" />,
  warehouse: <Truck className="w-5 h-5 text-blue-600" />,
  finance: <Database className="w-5 h-5 text-blue-600" />,
  trading: <Ship className="w-5 h-5 text-blue-600" />,
};

export const IndustryCard: React.FC<IndustryCardProps> = ({ id, title, description, imageSrc }) => {
  return (
    <div className="group flex flex-col justify-between rounded-xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 h-full">
      
      {/* Sleek Landscape Image Container (Panoramic ~2.8:1 ratio, matching reference UI) */}
      <div className="relative w-full h-28 sm:h-32 overflow-hidden bg-slate-100 border-b border-slate-200/90">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Card Content Bar: Title, Description, and Action Arrow */}
      <div className="p-3.5 sm:p-4 flex-1 flex items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="text-blue-600 shrink-0">
              {iconMap[id] || <Factory className="w-4 h-4 text-blue-600" />}
            </div>
            <h3 className="text-[17px] sm:text-[18px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
              {title}
            </h3>
          </div>

          <p className="text-[13px] sm:text-[14px] text-slate-600 leading-snug">
            {description}
          </p>
        </div>

        {/* Small Blue Arrow Icon on Right */}
        <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-blue-600 group-hover:text-white text-slate-400 flex items-center justify-center shrink-0 transition-colors">
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

    </div>
  );
};
