import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogArticle } from '../../../types/blog';

interface BlogCardProps {
  article: BlogArticle;
  featured?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ article, featured = false }) => {
  return (
    <article className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Thumbnail Container */}
      <Link
        to={`/blog/${article.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Ambient Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Pill Tag */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-[#0052CC] backdrop-blur-md shadow-xs border border-blue-100">
            {article.category}
          </span>
        </div>
      </Link>

      {/* Content Area */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Metadata bar: Date & Reading Time */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-3">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{article.publishDate}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-[#142B59] group-hover:text-[#0052CC] transition-colors leading-snug line-clamp-2 mb-2.5">
            <Link to={`/blog/${article.slug}`} className="focus:outline-none focus:underline">
              {article.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-[14px] text-slate-600 leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        </div>

        {/* Card Footer: Read More Link */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <span className="text-xs font-semibold text-slate-500 truncate max-w-[60%]">
            By {article.author.name}
          </span>

          <Link
            to={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0052CC] group-hover:text-[#003E99] transition-colors"
            aria-label={`Read article: ${article.title}`}
          >
            <span>Read More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};

