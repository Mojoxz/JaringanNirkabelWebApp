import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../data/questions';
import { useProgress } from '../hooks/useProgress';
import QuizCard from '../components/QuizCard';
import QuizResult from '../components/QuizResult';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export default function Quiz() {
  const { quizScore, setQuizScore } = useProgress();
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // If already completed and has score, show result automatically
  useEffect(() => {
    if (quizScore !== null && !showResult && !isSubmitted) {
      setShowResult(true);
    }
  }, [quizScore, showResult, isSubmitted]);

  const handleSelectAnswer = (optionIndex) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Confirm all answered
    if (selectedAnswers.includes(null)) {
      alert("Harap jawab semua soal sebelum mengumpulkan!");
      return;
    }
    
    setIsSubmitted(true);
    
    // Calculate Score
    let correct = 0;
    selectedAnswers.forEach((ans, idx) => {
      if (ans === questions[idx].answer) {
        correct++;
      }
    });

    const finalScore = Math.round((correct / questions.length) * 100);
    setQuizScore(finalScore);

    // Short delay before showing result
    setTimeout(() => {
      setShowResult(true);
    }, 1500);
  };

  const handleRetry = () => {
    setQuizScore(null);
    setSelectedAnswers(new Array(questions.length).fill(null));
    setCurrentQIndex(0);
    setIsSubmitted(false);
    setShowResult(false);
  };

  if (showResult && quizScore !== null) {
    const correctCount = Math.round((quizScore / 100) * questions.length);
    const incorrectCount = questions.length - correctCount;
    return (
      <div className="py-12">
        <QuizResult 
          score={quizScore} 
          total={100} 
          correct={correctCount} 
          incorrect={incorrectCount} 
          onRetry={handleRetry} 
        />
      </div>
    );
  }

  const currentQuestion = questions[currentQIndex];

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Soal Interaktif</h1>
          <p className="text-slate-600">Uji pengetahuan Anda tentang materi jaringan nirkabel.</p>
        </div>
        <div className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full font-bold text-sm">
          Soal {currentQIndex + 1} / {questions.length}
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-200 h-2 rounded-full mb-12 overflow-hidden flex">
        {questions.map((_, idx) => (
          <div 
            key={idx} 
            className="h-full border-r border-slate-300/30 transition-colors duration-300"
            style={{ 
              width: `${100 / questions.length}%`,
              backgroundColor: 
                selectedAnswers[idx] !== null 
                  ? '#3b82f6' // Answered
                  : idx === currentQIndex ? '#bfdbfe' : 'transparent'
            }}
          />
        ))}
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <QuizCard
          key={currentQIndex}
          question={currentQuestion}
          selectedAnswer={selectedAnswers[currentQIndex]}
          onSelectAnswer={handleSelectAnswer}
          isSubmitted={isSubmitted}
        />
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrev}
          disabled={currentQIndex === 0 || isSubmitted}
          className="px-6 py-3 font-medium text-slate-600 hover:text-slate-900 disabled:opacity-50"
        >
          Sebelumnya
        </button>

        {currentQIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswers[currentQIndex] === null || isSubmitted}
            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-full font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-lg"
          >
            Kumpulkan Jawaban
            <ShieldAlert size={20} />
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={selectedAnswers[currentQIndex] === null || isSubmitted}
            className="flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-full font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors shadow-lg"
          >
            Selanjutnya
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
