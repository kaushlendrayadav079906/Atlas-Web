import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { BlogArticle } from '../../../types/blog';

interface FeaturedArticleProps {
  article: BlogArticle;
}

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  return (
    <article className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Visual / Image Column (approx 55% on desktop) */}
        <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-atlas-navy min-h-[280px] lg:min-h-[400px]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent lg:hidden" />

          {/* Featured Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1F4FE0] text-white text-xs font-bold uppercase tracking-wider shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>Featured Insight</span>
          </div>
        </div>

        {/* Content Column (approx 45% on desktop) */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-white via-sky-50/20 to-blue-50/30">
          <div>
            {/* Category & Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 mb-3.5">
              <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#E0A33B] border border-blue-100">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#E0A33B]" />
                <span>{article.publishDate}</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#E0A33B]" />
                <span>{article.readTime}</span>
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-[24px] sm:text-[28px] lg:text-[30px] font-bold text-[#0A1B4F] group-hover:text-[#E0A33B] transition-colors leading-tight mb-4">
              <Link to={`/blog/${article.slug}`}>
                {article.title}
              </Link>
            </h2>

            {/* Excerpt */}
            <p className="text-[15px] text-slate-600 leading-relaxed line-clamp-3 lg:line-clamp-4 mb-6">
              {article.excerpt}
            </p>
          </div>

          {/* Author info & Read More Button */}
          <div className="pt-6 border-t border-slate-200/80 flex items-center justify-between gap-4 mt-auto">
            <div className="flex items-center gap-3">
              {article.author.avatar ? (
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-blue-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#0A1B4F] text-white flex items-center justify-center font-bold text-xs">
                  AT
                </div>
              )}
              <div className="text-left">
                <div className="text-xs font-bold text-[#0A1B4F] leading-tight">
                  {article.author.name}
                </div>
                <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                  {article.author.role}
                </div>
              </div>
            </div>

            <Link
              to={`/blog/${article.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F4FE0] hover:bg-[#1739B8] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all shrink-0 active:scale-95"
            >
              <span>Read Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

      </div>
    </article>
  );
};

