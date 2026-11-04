import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FeaturedArticle } from '../components/ui/blog/FeaturedArticle';
import { BlogCategoryFilter } from '../components/ui/blog/BlogCategoryFilter';
import { BlogSearch } from '../components/ui/blog/BlogSearch';
import { BlogListing } from '../components/ui/blog/BlogListing';
import {
  BLOG_ARTICLES,
  BLOG_CATEGORIES,
  searchArticles,
  getArticlesByCategory
} from '../data/blogData';

export const BlogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Sync title for SEO
  useEffect(() => {
    document.title = 'Blog & Insights | ATLAS Technosoft – SAP Business One & Automation';
    window.scrollTo(0, 0);
  }, []);

  // Sync category changes with URL search query param
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(6);
    const newParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setVisibleCount(6);
    const newParams = new URLSearchParams(searchParams);
    if (!val.trim()) {
      newParams.delete('q');
    } else {
      newParams.set('q', val.trim());
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setVisibleCount(6);
    setSearchParams({}, { replace: true });
  };

  // Compute category article counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: BLOG_ARTICLES.length
    };
    for (const cat of BLOG_CATEGORIES) {
      counts[cat] = BLOG_ARTICLES.filter(a => a.category === cat).length;
    }
    return counts;
  }, []);

  // Filter and search articles
  const filteredArticles = useMemo(() => {
    if (searchQuery.trim()) {
      return searchArticles(searchQuery, selectedCategory === 'All' ? undefined : selectedCategory);
    }
    return getArticlesByCategory(selectedCategory);
  }, [selectedCategory, searchQuery]);

  // Featured article (first featured article)
  const featuredArticle = useMemo(() => {
    return BLOG_ARTICLES.find(a => a.isFeatured) || BLOG_ARTICLES[0];
  }, []);

  // When 'All' is selected and no search query, exclude the featured article from the main listing grid to avoid duplication
  const listingArticles = useMemo(() => {
    if (selectedCategory === 'All' && !searchQuery.trim() && featuredArticle) {
      return filteredArticles.filter(a => a.id !== featuredArticle.id);
    }
    return filteredArticles;
  }, [filteredArticles, selectedCategory, searchQuery, featuredArticle]);

  const hasMore = visibleCount < listingArticles.length;

  return (
    <div className="bg-white text-slate-800">
      
      {/* ===================================================================== */}
      {/* 1. HERO HEADER                                                        */}
      {/* ===================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-sky-50/70 via-white to-blue-50/40 py-12 sm:py-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0052CC] block">
              ATLAS TECHNOSOFT INSIGHTS
            </span>

            <h1 className="font-serif text-[32px] sm:text-[42px] lg:text-[48px] font-bold text-[#142B59] tracking-tight leading-[1.15]">
              Knowledge, Insights & <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">Innovation</span>
            </h1>

            <p className="text-[16px] sm:text-[19px] text-[#45546B] leading-relaxed font-normal">
              Discover ideas and practical guidance to help your business grow with SAP Business One and intelligent automation.
            </p>
          </div>

          {/* Search bar inside hero */}
          <div className="max-w-xl mx-auto mt-8 sm:mt-10">
            <BlogSearch value={searchQuery} onChange={handleSearchChange} />
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. FEATURED ARTICLE (Shown when no search & 'All' category)           */}
      {/* ===================================================================== */}
      {selectedCategory === 'All' && !searchQuery.trim() && featuredArticle && (
        <section className="py-10 sm:py-12 bg-white border-b border-slate-100">
          <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturedArticle article={featuredArticle} />
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 3. CATEGORY FILTERS & ARTICLES LISTING GRID                           */}
      {/* ===================================================================== */}
      <section className="py-12 sm:py-16 bg-[#F4F9FF]/50 min-h-[500px]">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Controls */}
          <div className="mb-8 sm:mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <BlogCategoryFilter
                activeCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
                categoryCounts={categoryCounts}
              />
            </div>

            {/* Results count label */}
            <div className="text-xs sm:text-sm font-medium text-slate-500 whitespace-nowrap">
              Showing <span className="font-bold text-[#142B59]">{listingArticles.length}</span> {listingArticles.length === 1 ? 'article' : 'articles'}
              {selectedCategory !== 'All' && <span> in <strong className="text-[#0052CC]">{selectedCategory}</strong></span>}
            </div>
          </div>

          {/* Articles Grid */}
          <BlogListing
            articles={listingArticles}
            totalArticles={listingArticles.length}
            visibleCount={visibleCount}
            onLoadMore={() => setVisibleCount(prev => prev + 6)}
            onResetFilters={handleResetFilters}
            hasMore={hasMore}
          />

        </div>
      </section>

    </div>
  );
};

