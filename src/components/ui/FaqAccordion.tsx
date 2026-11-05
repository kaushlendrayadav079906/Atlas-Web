import React, { useState, useId } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaqItem, FaqCategory } from '../../types/resources';

interface FaqAccordionProps {
  faqs: FaqItem[];
  categories: FaqCategory[];
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
  showSearch?: boolean;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  faqs,
  categories,
  activeCategory = 'All',
  onSelectCategory,
  showSearch = true
}) => {
  const [selectedCat, setSelectedCat] = useState<string>(activeCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    [faqs[0]?.id || '']: true // First item open by default for immediate preview
  });

  const baseId = useId();

  const handleCategoryClick = (cat: string) => {
    setSelectedCat(cat);
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    filteredFaqs.forEach(f => {
      allOpen[f.id] = true;
    });
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  // Filter FAQs based on active category and search query
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCat === 'All' || faq.category === selectedCat;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();
    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      (faq.tags && faq.tags.some(t => t.toLowerCase().includes(query)))
    );
  });

  return (
    <div className="w-full space-y-8">
      
      {/* Category Pills & Search Controls */}
      <div className="space-y-6">
        
        {/* Search Bar */}
        {showSearch && (
          <div className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search frequently asked questions (e.g., GST, implementation time, HANA, Boyum, RPA)..."
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent shadow-xs transition-all"
                aria-label="Search FAQs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-semibold text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Category Pills Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => handleCategoryClick('All')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedCat === 'All'
                ? 'bg-[#0052CC] text-white shadow-sm shadow-blue-500/20'
                : 'bg-white text-slate-600 hover:bg-blue-50/80 hover:text-[#0052CC] border border-slate-200'
            }`}
          >
            All Questions ({faqs.length})
          </button>

          {categories.map(cat => {
            const count = faqs.filter(f => f.category === cat).length;
            const isSelected = selectedCat === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0052CC] text-white shadow-sm shadow-blue-500/20'
                    : 'bg-white text-slate-600 hover:bg-blue-50/80 hover:text-[#0052CC] border border-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Counter & Expand/Collapse Toggle */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-1 border-b border-slate-200/80 pb-3">
          <div>
            Showing <strong className="text-[#142B59] font-bold">{filteredFaqs.length}</strong> questions
            {selectedCat !== 'All' && <span> in <span className="text-[#0052CC] font-semibold">{selectedCat}</span></span>}
            {searchQuery && <span> matching "<span className="text-slate-800 font-semibold">{searchQuery}</span>"</span>}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={expandAll}
              className="text-xs font-semibold text-[#0052CC] hover:underline"
            >
              Expand All
            </button>
            <span className="text-slate-300">|</span>
            <button
              type="button"
              onClick={collapseAll}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 hover:underline"
            >
              Collapse All
            </button>
          </div>
        </div>

      </div>

      {/* Accordion List */}
      {filteredFaqs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center mx-auto">
            <HelpCircle className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#142B59]">
            No matching questions found
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We couldn't find any questions matching your query. Please try different keywords or reach out directly to our solution desk.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCat('All');
              }}
              className="text-xs sm:text-sm font-semibold text-[#0052CC] hover:underline"
            >
              Reset Search & Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, index) => {
            const isOpen = !!openItems[faq.id];
            const headerId = `${baseId}-header-${faq.id}`;
            const panelId = `${baseId}-panel-${faq.id}`;

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#0052CC]/40 shadow-md shadow-blue-500/5'
                    : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Accordion Header Button */}
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(faq.id)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-4.5 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052CC] transition-colors group cursor-pointer"
                >
                  <div className="space-y-1.5 flex-1 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052CC] bg-blue-50 px-2 py-0.5 rounded">
                        {faq.category}
                      </span>
                      {faq.tags && faq.tags[0] && (
                        <span className="text-[11px] font-medium text-slate-400 hidden sm:inline-block">
                          · {faq.tags[0]}
                        </span>
                      )}
                    </div>
                    <h3 className={`font-serif text-[16px] sm:text-[17.5px] font-bold leading-snug transition-colors ${
                      isOpen ? 'text-[#0052CC]' : 'text-[#142B59] group-hover:text-[#0052CC]'
                    }`}>
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors mt-0.5 ${
                    isOpen ? 'bg-[#0052CC] text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#0052CC]'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Accordion Collapsible Panel */}
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-5 sm:px-6 pb-5 pt-1 text-slate-600 text-sm sm:text-[15px] leading-relaxed border-t border-slate-100/90 space-y-3"
                  >
                    <p className="pt-2 text-slate-700">{faq.answer}</p>

                    {/* Related contextual link */}
                    {faq.relatedLink && (
                      <div className="pt-2 flex items-center">
                        <Link
                          to={faq.relatedLink.href}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0052CC] hover:text-[#003E99] transition-colors group/link"
                        >
                          <span>{faq.relatedLink.text}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

