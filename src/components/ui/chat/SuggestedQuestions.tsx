import React from 'react';
import { HelpCircle } from 'lucide-react';

interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
  heading?: string;
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  questions,
  onSelect,
  heading = 'Suggested questions:'
}) => {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="pt-2 border-t border-slate-200/80">
      <div className="flex items-center gap-1.5 mb-2">
        <HelpCircle className="w-3 h-3 text-blue-600" />
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          {heading}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {questions.map((question, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelect(question)}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-700 rounded-lg border border-slate-200/90 hover:border-blue-300 transition-all duration-150 shadow-2xs active:scale-95 text-left cursor-pointer"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

