const fs = require('fs');
const path = require('path');

// 1. Update BlogDetail.tsx
{
  const p = path.resolve('src/components/ui/blog/BlogDetail.tsx');
  let c = fs.readFileSync(p, 'utf8');
  const target = `<div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-colors"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>`;

  const replacement = `<div className="flex flex-wrap items-center gap-3">
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
              )}`;
  
  c = c.replace(target, replacement);
  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated BlogDetail.tsx');
}

// 2. Update BlogDetailPage.tsx
{
  const p = path.resolve('src/pages/BlogDetailPage.tsx');
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('ConsultationModal')) {
    c = c.replace("import { BlogDetail } from '../components/ui/blog/BlogDetail';", "import { BlogDetail } from '../components/ui/blog/BlogDetail';\nimport { ConsultationModal } from '../components/ui/ConsultationModal';\nimport { useState } from 'react';");
  }
  
  if (!c.includes('const [isModalOpen, setIsModalOpen]')) {
    c = c.replace("export const BlogDetailPage: React.FC = () => {", "export const BlogDetailPage: React.FC = () => {\n  const [isModalOpen, setIsModalOpen] = useState(false);");
  }

  c = c.replace(`<BlogDetail
      article={article}
      relatedArticles={relatedArticles}
    />`, `<>
      <BlogDetail
        article={article}
        relatedArticles={relatedArticles}
        onOpenConsultation={() => setIsModalOpen(true)}
      />
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={article ? \`Article Inquiry: \${article.title}\` : 'SAP Business One Implementation'}
        title="Book an Architecture Consultation"
        subtitle="Speak directly with certified SAP Business One, Boyum IT, and UiPath solution architects."
      />
    </>`);

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated BlogDetailPage.tsx');
}

