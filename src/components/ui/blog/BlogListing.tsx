import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { BlogArticle } from '../../../types/blog';
import { BlogCard } from './BlogCard';

interface BlogListingProps {
  articles: BlogArticle[];
  totalArticles: number;
  visibleCount: number;
  onLoadMore: () => void;
  onResetFilters?: () => void;
  hasMore: boolean;
}

export const BlogListing: React.FC<BlogListingProps> = ({
  articles,
  totalArticles,
  visibleCount,
  onLoadMore,
  onResetFilters,
  hasMore
}) => {
  if (articles.length === 0) {
    return (
      <div className="py-16 px-4 text-center rounded-3xl bg-white border border-dashed border-slate-300 max-w-2xl mx-auto my-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1F4FE0] flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-xl font-bold text-[#0A1B4F] mb-2">
          No Insights Found
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
          We couldn't find any articles matching your search query or selected category. Try adjusting your keywords or clearing filters.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F4FE0] hover:bg-[#1739B8] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Filters & Show All</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {articles.slice(0, visibleCount).map(article => (
          <BlogCard key={article.id} article={article} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-12 sm:mt-14">
          <button
            type="button"
            onClick={onLoadMore}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0A1B4F] hover:text-[#1F4FE0] font-semibold text-sm sm:text-base border border-slate-300 shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span>Load More Articles</span>
            <span className="text-xs text-slate-500 font-normal">
              ({visibleCount} of {totalArticles})
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

