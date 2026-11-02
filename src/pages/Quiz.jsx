import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { questions as allQuestions } from '../data/questions';
import { useProgress } from '../hooks/useProgress';
import QuizCard from '../components/QuizCard';
import QuizResult from '../components/QuizResult';
import {
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Flame,
  Timer,
  Pause,
  Play,
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import clsx from 'clsx';

export default function Quiz() {
  const { quizScore, setQuizScore, quizHistory, recordQuizAttempt } = useProgress();

  const categories = useMemo(
    () => ['Semua Topik', ...new Set(allQuestions.map((q) => q.category))],
    []
  );

  const [selectedTopic, setSelectedTopic] = useState('Semua Topik');
  const [mode, setMode] = useState('practice');

  const activeQuestions = useMemo(() => {
    if (selectedTopic === 'Semua Topik') return allQuestions;
    return allQuestions.filter((q) => q.category === selectedTopic);
  }, [selectedTopic]);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(() =>
    new Array(allQuestions.length).fill(null)
  );
  const [revealedQuestions, setRevealedQuestions] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [hintOpenQuestions, setHintOpenQuestions] = useState({});
  const [eliminatedMap, setEliminatedMap] = useState({});
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const [secondsLeft, setSecondsLeft] = useState(12 * 60);
  const [timerPaused, setTimerPaused] = useState(false);

  const resetSession = (newQuestionsLength = activeQuestions.length) => {
    setCurrentQIndex(0);
    setSelectedAnswers(new Array(newQuestionsLength).fill(null));
    setRevealedQuestions({});
    setFlaggedQuestions({});
    setHintOpenQuestions({});
    setEliminatedMap({});
    setFiftyFiftyUsed(false);
    setStreak(0);
    setIsSubmitted(false);
    setShowResult(false);
    setValidationMessage('');
    setSecondsLeft(newQuestionsLength * 60);
  };

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    const nextList =
      topic === 'Semua Topik'
        ? allQuestions
        : allQuestions.filter((q) => q.category === topic);
    resetSession(nextList.length);
  };

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    resetSession(activeQuestions.length);
  };

  useEffect(() => {
    if (mode !== 'exam' || showResult || isSubmitted || timerPaused) return undefined;
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [mode, showResult, isSubmitted, timerPaused]);

  const handleSelectAnswer = (optionIndex) => {
    if (isSubmitted || revealedQuestions[currentQIndex]) return;
    const nextAnswers = [...selectedAnswers];
    nextAnswers[currentQIndex] = optionIndex;
    setSelectedAnswers(nextAnswers);
    setValidationMessage('');
  };

  const handleCheckPracticeAnswer = () => {
    if (selectedAnswers[currentQIndex] === null) return;
    setRevealedQuestions((prev) => ({ ...prev, [currentQIndex]: true }));
    if (selectedAnswers[currentQIndex] === activeQuestions[currentQIndex].answer) {
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQIndex]: !prev[currentQIndex],
    }));
  };

  const handleToggleHint = () => {
    setHintOpenQuestions((prev) => ({
      ...prev,
      [currentQIndex]: !prev[currentQIndex],
    }));
  };

  const handleUseFiftyFifty = () => {
    if (fiftyFiftyUsed || eliminatedMap[currentQIndex]) return;
    const currentQ = activeQuestions[currentQIndex];
    const wrongIndices = currentQ.options
      .map((_, i) => i)
      .filter((i) => i !== currentQ.answer);
    const toEliminate = wrongIndices.slice(0, 2);
    setEliminatedMap((prev) => ({ ...prev, [currentQIndex]: toEliminate }));
    setFiftyFiftyUsed(true);
  };

  const finalizeSubmission = () => {
    setIsSubmitted(true);
    let correct = 0;
    activeQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        correct += 1;
      }
    });
    const finalScore = Math.round((correct / activeQuestions.length) * 100);
    setQuizScore(finalScore);
    recordQuizAttempt({
      score: finalScore,
      mode: mode === 'practice' ? 'Latihan' : 'Ujian',
      topic: selectedTopic,
      timestamp: new Date().toISOString(),
    });
    setShowResult(true);
  };

  const handleSubmit = () => {
    const unansweredIndices = selectedAnswers
      .map((ans, idx) => (ans === null ? idx + 1 : null))
      .filter(Boolean);

    if (unansweredIndices.length > 0) {
      setValidationMessage(
        `Masih ada ${unansweredIndices.length} soal yang belum dijawab (Nomor: ${unansweredIndices.join(', ')}). Silakan lengkapi terlebih dahulu.`
      );
      setCurrentQIndex(unansweredIndices[0] - 1);
      return;
    }

    finalizeSubmission();
  };

  const handleRetry = () => {
    setQuizScore(null);
    resetSession(activeQuestions.length);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (showResult) {
    let correctCount = 0;
    activeQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) correctCount += 1;
    });
    const computedScore =
      quizScore !== null
        ? quizScore
        : Math.round((correctCount / activeQuestions.length) * 100);
    const incorrectCount = activeQuestions.length - correctCount;

    return (
      <div className="py-6">
        <QuizResult
          score={computedScore}
          total={100}
          correct={correctCount}
          incorrect={incorrectCount}
          questions={activeQuestions}
          selectedAnswers={selectedAnswers}
          quizHistory={quizHistory}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  const currentQuestion = activeQuestions[currentQIndex];
  const answeredCount = selectedAnswers.filter((a) => a !== null).length;

  return (
    <div className="max-w-6xl mx-auto py-4 space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-primary-600 dark:text-primary-400 font-bold">
              Wireless Assessment Lab
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              Evaluasi &amp; Simulasi Kasus Nirkabel
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
              Pilih Mode Latihan untuk umpan balik instan per soal, atau Mode Ujian untuk simulasi berwaktu.
            </p>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 self-start">
            <button
              type="button"
              onClick={() => handleModeChange('practice')}
              aria-pressed={mode === 'practice'}
              className={clsx(
                'px-3.5 py-2 rounded-lg text-xs font-bold transition-all',
                mode === 'practice'
                  ? 'bg-white dark:bg-slate-900 text-primary-600 dark:text-primary-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              Mode Latihan Interaktif
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('exam')}
              aria-pressed={mode === 'exam'}
              className={clsx(
                'px-3.5 py-2 rounded-lg text-xs font-bold transition-all',
                mode === 'exam'
                  ? 'bg-white dark:bg-slate-900 text-primary-600 dark:text-primary-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              Mode Simulasi Ujian
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">
              <SlidersHorizontal size={13} /> Filter Topik:
            </span>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => handleTopicChange(cat)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors',
                  selectedTopic === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {mode === 'practice' ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold">
                <Flame size={14} className="text-amber-500" />
                <span>Streak Benar: {streak}</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-mono font-bold">
                <Timer size={14} className="text-primary-400" />
                <span>{formatTime(secondsLeft)}</span>
                <button
                  type="button"
                  onClick={() => setTimerPaused((p) => !p)}
                  aria-label={timerPaused ? 'Lanjutkan waktu ujian' : 'Jeda waktu ujian'}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                >
                  {timerPaused ? <Play size={11} /> : <Pause size={11} />}
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
            >
              <RotateCcw size={13} /> Reset
            </button>
          </div>
        </div>
      </div>

      {validationMessage && (
        <div
          role="alert"
          className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-medium"
        >
          <AlertCircle size={18} className="text-amber-600 dark:text-amber-400 shrink-0" />
          <span>{validationMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-5">
          <AnimatePresence mode="wait">
            <QuizCard
              key={`${selectedTopic}-${currentQuestion.id}`}
              question={currentQuestion}
              questionNumber={currentQIndex + 1}
              totalQuestions={activeQuestions.length}
              selectedAnswer={selectedAnswers[currentQIndex]}
              onSelectAnswer={handleSelectAnswer}
              isRevealed={isSubmitted || !!revealedQuestions[currentQIndex]}
              isFlagged={!!flaggedQuestions[currentQIndex]}
              onToggleFlag={handleToggleFlag}
              showHint={!!hintOpenQuestions[currentQIndex]}
              onToggleHint={handleToggleHint}
              eliminatedOptions={eliminatedMap[currentQIndex] || []}
              onUseFiftyFifty={handleUseFiftyFifty}
              fiftyFiftyUsed={fiftyFiftyUsed}
              mode={mode}
              onCheckAnswer={handleCheckPracticeAnswer}
            />
          </AnimatePresence>

          <div className="flex flex-wrap justify-between items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => currentQIndex > 0 && setCurrentQIndex(currentQIndex - 1)}
              disabled={currentQIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
            >
              <ArrowLeft size={15} /> Soal Sebelumnya
            </button>

            <div className="flex items-center gap-2">
              {currentQIndex < activeQuestions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQIndex(currentQIndex + 1)}
                  className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-primary-700 transition-colors shadow-xs"
                >
                  Soal Selanjutnya <ArrowRight size={15} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  <ShieldAlert size={15} /> Selesaikan &amp; Lihat Skor
                </button>
              )}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 sticky top-20">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Peta Navigasi Soal
            </h2>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {answeredCount}/{activeQuestions.length} Terjawab
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-primary-600 transition-all duration-300"
              style={{ width: `${Math.round((answeredCount / activeQuestions.length) * 100)}%` }}
            />
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2">
            {activeQuestions.map((q, idx) => {
              const isCurrent = idx === currentQIndex;
              const isAns = selectedAnswers[idx] !== null;
              const isFlag = !!flaggedQuestions[idx];
              const isRev = !!revealedQuestions[idx];
              const isCorrect = isRev && selectedAnswers[idx] === q.answer;

              let btnStyle =
                'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
              if (isRev) {
                btnStyle = isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-400'
                  : 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-400';
              } else if (isFlag) {
                btnStyle =
                  'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400';
              } else if (isAns) {
                btnStyle =
                  'bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border-primary-400';
              }

              return (
                <button
                  type="button"
                  key={q.id}
                  onClick={() => setCurrentQIndex(idx)}
                  aria-label={`Lompat ke soal nomor ${idx + 1}`}
                  aria-current={isCurrent ? 'step' : undefined}
                  className={clsx(
                    'h-10 rounded-xl font-mono text-xs font-bold border transition-all flex items-center justify-center relative',
                    btnStyle,
                    isCurrent && 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-slate-900'
                  )}
                >
                  {idx + 1}
                  {isFlag && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-primary-500 inline-block" /> Terjawab
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-amber-500 inline-block" /> Ditandai Ragu
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block" /> Tepat (Latihan)
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-slate-300 dark:bg-slate-700 inline-block" /> Belum Dijawab
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 dark:bg-primary-600 hover:bg-slate-800 dark:hover:bg-primary-700 text-white text-xs font-bold transition-colors"
          >
            <CheckCircle2 size={15} /> Kumpulkan Semua Jawaban ({answeredCount}/{activeQuestions.length})
          </button>
        </aside>
      </div>
    </div>
  );
}
