import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  CheckCircle2,
  Bookmark,
  MessageSquare,
  Sparkles,
  ChevronRight,
  HelpCircle,
  Building2,
  List
} from 'lucide-react';
import { BlogArticle } from '../../../types/blog';
import { BlogCard } from './BlogCard';

interface BlogDetailProps {
  article: BlogArticle;
  relatedArticles: BlogArticle[];
  onOpenConsultation?: () => void;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({
  article,
  relatedArticles,
  onOpenConsultation
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <article className="bg-white text-slate-800 selection:bg-blue-600 selection:text-white">
      {/* ===================================================================== */}
      {/* BREADCRUMB & ARTICLE HEADER HERO                                      */}
      {/* ===================================================================== */}
      <section className="pt-8 pb-10 sm:pb-12 border-b border-white/10 bg-atlas-navy atlas-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
            <Link to="/" className="hover:text-[#1F4FE0] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link to="/blog" className="hover:text-[#1F4FE0] transition-colors">Blog & Insights</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[#1F4FE0] font-semibold">{article.category}</span>
          </nav>

          {/* Category Tag */}
          <div className="mb-4">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100/80 text-[#1F4FE0]">
              {article.category}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-[28px] sm:text-[36px] md:text-[44px] font-bold text-[#0A1B4F] leading-[1.2] tracking-tight mb-5">
            {article.title}
          </h1>

          {/* Excerpt Subtitle */}
          <p className="text-[16px] sm:text-[19px] text-slate-600 leading-relaxed font-normal mb-6">
            {article.excerpt}
          </p>

          {/* Author & Publication Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200/80">
            <div className="flex items-center gap-3.5">
              {article.author.avatar ? (
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 shadow-2xs"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#0A1B4F] text-white flex items-center justify-center font-black text-sm">
                  AT
                </div>
              )}
              <div>
                <div className="text-sm font-bold text-[#0A1B4F]">
                  {article.author.name}
                </div>
                <div className="text-xs text-slate-500">
                  {article.author.role}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>{article.publishDate}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{article.readTime}</span>
              </span>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition-colors cursor-pointer text-xs font-semibold"
                aria-label="Share this article"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* FEATURED COVER IMAGE                                                  */}
      {/* ===================================================================== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 sm:-mt-4 mb-8 sm:mb-12">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 aspect-[16/9] bg-atlas-navy relative">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MAIN ARTICLE CONTENT & SIDEBAR / TOC                                   */}
      {/* ===================================================================== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Table of Contents for Long Articles */}
        {article.tableOfContents && article.tableOfContents.length > 0 && (
          <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-white border border-blue-200/70 shadow-2xs">
            <div className="flex items-center gap-2 mb-3 text-[#0A1B4F]">
              <List className="w-5 h-5 text-[#1F4FE0]" />
              <h3 className="text-base font-bold uppercase tracking-wider">
                Table of Contents
              </h3>
            </div>
            <ol className="space-y-2 list-decimal list-inside text-sm sm:text-[15px]">
              {article.tableOfContents.map((item, idx) => (
                <li key={item.id} className="text-slate-700 font-medium hover:text-[#1F4FE0] transition-colors">
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="text-left hover:underline cursor-pointer"
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Structured Content Sections */}
        <div className="space-y-10 sm:space-y-12">
          {article.sections.map((section, sIdx) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#0A1B4F] leading-snug mb-4">
                {section.title}
              </h2>

              <div className="space-y-4 text-[16px] sm:text-[17px] text-slate-700 leading-relaxed">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Bullet list if present */}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="my-5 space-y-2.5">
                  {section.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-[15px] sm:text-[16px] text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Key Takeaway Box */}
              {section.keyTakeaway && (
                <div className="my-6 p-4 sm:p-5 rounded-xl bg-blue-50/80 border-l-4 border-blue-600 text-[15px] text-[#0A1B4F] font-medium leading-relaxed">
                  <strong className="block text-xs uppercase tracking-wider text-blue-700 font-bold mb-1">
                    Key Takeaway:
                  </strong>
                  {section.keyTakeaway}
                </div>
              )}

              {/* Callout Box */}
              {section.callout && (
                <div className="my-6 p-5 rounded-2xl bg-white border border-slate-200/90 text-sm leading-relaxed">
                  <div className="flex items-center gap-2 font-bold text-[#0A1B4F] mb-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>{section.callout.title}</span>
                  </div>
                  <p className="text-slate-600">{section.callout.text}</p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Tags Bar */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">
              Tags:
            </span>
            {article.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ===================================================================== */}
        {/* IN-ARTICLE STRATEGIC CONSULTATION CTA                                 */}
        {/* ===================================================================== */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0A1B4F] via-[#0A1B4F] to-[#0A1B4F] text-white shadow-xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300 block mb-2">
              Transform Your Operations with ATLAS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-3">
              Ready to Implement or Optimize SAP Business One?
            </h3>
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed mb-6">
              Our certified SAP, Boyum IT, and UiPath solution architects are available for a 45-minute discovery consultation tailored to your facility.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {onOpenConsultation ? (
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-colors cursor-pointer"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-colors"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <a
                href="https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20discuss%20the%20article%20I%20read%20on%20your%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ===================================================================== */}
      {/* RELATED ARTICLES SECTION                                              */}
      {/* ===================================================================== */}
      {relatedArticles && relatedArticles.length > 0 && (
        <section className="py-14 sm:py-16 border-t border-white/10 bg-atlas-navy atlas-dark">
          <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F4FE0] block mb-1">
                  CONTINUE READING
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1B4F]">
                  Related Insights & Guides
                </h3>
              </div>

              <Link
                to="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[#1F4FE0] hover:text-[#1739B8] transition-colors"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map(rel => (
                <BlogCard key={rel.id} article={rel} />
              ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#1F4FE0]"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </article>
  );
};

