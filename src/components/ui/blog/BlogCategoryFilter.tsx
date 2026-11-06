import React from 'react';
import { BLOG_CATEGORIES } from '../../../data/blogData';

interface BlogCategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts?: Record<string, number>;
}

export const BlogCategoryFilter: React.FC<BlogCategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts = {}
}) => {
  const allCategories = ['All', ...BLOG_CATEGORIES];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
      {allCategories.map(category => {
        const isActive = activeCategory === category;
        const count = categoryCounts[category];

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer active:scale-95 flex items-center gap-1.5 ${
              isActive
                ? 'bg-[#1F4FE0] text-white shadow-md shadow-blue-500/20'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <span>{category}</span>
            {count !== undefined && (
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

