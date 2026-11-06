import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { BlogDetail } from '../components/ui/blog/BlogDetail';
import { ConsultationModal } from '../components/ui/ConsultationModal';
import { useState } from 'react';
import { getArticleBySlug, getRelatedArticles } from '../data/blogData';

export const BlogDetailPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  const article = useMemo(() => {
    return slug ? getArticleBySlug(slug) : undefined;
  }, [slug]);

  const relatedArticles = useMemo(() => {
    return slug ? getRelatedArticles(slug, 3) : [];
  }, [slug]);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | ATLAS Technosoft Insights`;
    } else {
      document.title = 'Article Not Found | ATLAS Technosoft Insights';
    }
    window.scrollTo(0, 0);
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20 px-4 bg-white text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 text-[#1F4FE0] flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="atlas-h1-size font-serif font-bold text-[#0A1B4F]">
            Article Not Found
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            The article you are looking for does not exist or may have been moved.
          </p>
          <div className="pt-2">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F4FE0] hover:bg-[#1739B8] text-white text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog & Insights</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <BlogDetail
        article={article}
        relatedArticles={relatedArticles}
        onOpenConsultation={() => setIsModalOpen(true)}
      />
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={article ? `Article Inquiry: ${article.title}` : 'SAP Business One Implementation'}
        title="Book an Architecture Consultation"
        subtitle="Speak directly with certified SAP Business One, Boyum IT, and UiPath solution architects."
      />
    </>
  );
};

