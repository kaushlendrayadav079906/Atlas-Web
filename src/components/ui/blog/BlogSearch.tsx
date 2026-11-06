import React from 'react';
import { Search, X } from 'lucide-react';

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const BlogSearch: React.FC<BlogSearchProps> = ({
  value,
  onChange,
  placeholder = 'Search insights by keyword, topic, or technology...'
}) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search blog articles"
        className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-white text-sm sm:text-base text-slate-800 placeholder-slate-400 border border-slate-200/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs transition-all"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

