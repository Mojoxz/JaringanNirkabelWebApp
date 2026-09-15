import { motion } from 'framer-motion';
import clsx from 'clsx';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function QuizCard({ question, selectedAnswer, onSelectAnswer, isSubmitted }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200"
    >
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4 leading-relaxed">
          {question.question}
        </h3>
        {question.image && (
          <img 
            src={question.image} 
            alt="Question visual" 
            className="w-full max-w-lg h-auto rounded-xl object-cover mb-6 border border-slate-100"
          />
        )}
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = question.answer === index;
          
          let stateClass = "border-slate-200 hover:border-primary-500 hover:bg-primary-50";
          let Icon = null;
          
          if (isSubmitted) {
            if (isCorrect) {
              stateClass = "border-green-500 bg-green-50 text-green-900";
              Icon = CheckCircle2;
            } else if (isSelected && !isCorrect) {
              stateClass = "border-red-500 bg-red-50 text-red-900";
              Icon = XCircle;
            } else {
              stateClass = "border-slate-200 opacity-50";
            }
          } else if (isSelected) {
            stateClass = "border-primary-600 bg-primary-50 text-primary-900 shadow-sm";
          }

          return (
            <button
              key={index}
              disabled={isSubmitted}
              onClick={() => onSelectAnswer(index)}
              className={clsx(
                "w-full flex items-center justify-between p-4 rounded-xl border-2 text-left font-medium transition-all",
                stateClass
              )}
            >
              <span>{option}</span>
              {Icon && <Icon className={isCorrect ? "text-green-600" : "text-red-600"} size={20} />}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
