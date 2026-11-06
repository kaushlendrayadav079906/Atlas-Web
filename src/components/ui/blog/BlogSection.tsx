import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';
import { BlogCard } from './BlogCard';
import { BLOG_ARTICLES } from '../../../data/blogData';

export const BlogSection: React.FC = () => {
  // Grab the 4 requested homepage articles
  const homepageArticles = BLOG_ARTICLES.slice(0, 4);

  return (
    <section id="insights" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-100">
      <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          badge="LATEST INSIGHTS & ARTICLES"
          title="Insights That Drive"
          titleHighlight="Smarter Business"
          subtitle="Explore expert insights, practical guides and the latest developments in SAP Business One, ERP and intelligent automation."
          align="center"
        />

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 mt-10">
          {homepageArticles.map(article => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>

        {/* Action Button: View All Articles */}
        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#1F4FE0] to-[#1F4FE0] hover:from-[#1739B8] hover:to-[#1739B8] text-white text-[15px] sm:text-[16px] font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            <BookOpen className="w-5 h-5" />
            <span>View All Articles & Insights</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

