import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  Sparkles,
  Bookmark,
  Terminal,
  BookOpen,
  HelpCircle,
} from 'lucide-react';

export default function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  isRevealed,
  isFlagged,
  onToggleFlag,
  showHint,
  onToggleHint,
  eliminatedOptions = [],
  onUseFiftyFifty,
  fiftyFiftyUsed,
  mode,
  onCheckAnswer,
}) {
  const optionLetters = ['A', 'B', 'C', 'D'];

  const difficultyStyles = {
    Dasar: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    Menengah: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    Lanjut: 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
  };

  return (
    <framerMotion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-slate-900 p-5 sm:p-7 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 space-y-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 text-xs font-mono font-bold">
            Soal {questionNumber}/{totalQuestions}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
            {question.category}
          </span>
          {question.difficulty && (
            <span
              className={clsx(
                'px-2.5 py-1 rounded-md text-xs font-semibold border',
                difficultyStyles[question.difficulty] || difficultyStyles.Menengah
              )}
            >
              Level: {question.difficulty}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleFlag}
            aria-pressed={isFlagged}
            className={clsx(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors',
              isFlagged
                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
            )}
          >
            <Bookmark size={13} className={isFlagged ? 'fill-amber-500 text-amber-500' : ''} />
            {isFlagged ? 'Ditandai Ragu' : 'Tandai Ragu'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
          {question.question}
        </h2>

        {question.telemetry && (
          <div className="rounded-xl bg-slate-950 text-slate-100 p-4 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary-400">
              <Terminal size={13} />
              <span>Data Telemetri &amp; Pengukuran Spektrum</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {question.telemetry.map((t, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-mono">{t.label}</div>
                  <div className="text-xs font-mono font-bold text-sky-300 mt-0.5">{t.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {question.image && (
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 max-w-md">
            <img
              src={question.image}
              alt="Visualisasi perangkat untuk soal"
              width="448"
              height="260"
              loading="lazy"
              className="w-full h-52 object-cover block"
            />
          </div>
        )}
      </div>

      {!isRevealed && (
        <div className="flex flex-wrap items-center gap-2">
          {question.hint && (
            <button
              type="button"
              onClick={onToggleHint}
              aria-expanded={showHint}
              className={clsx(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors',
                showHint
                  ? 'bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-800'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              )}
            >
              <Lightbulb size={13} className="text-amber-500" />
              {showHint ? 'Sembunyikan Petunjuk' : 'Buka Petunjuk Teknis'}
            </button>
          )}

          <button
            type="button"
            onClick={onUseFiftyFifty}
            disabled={fiftyFiftyUsed || eliminatedOptions.length > 0}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
          >
            <Sparkles size={13} className="text-primary-500" />
            {eliminatedOptions.length > 0
              ? '50:50 Diterapkan'
              : fiftyFiftyUsed
                ? 'Bantuan 50:50 Habis'
                : 'Eliminasi 50:50 (1x)'}
          </button>
        </div>
      )}

      <AnimatePresence>
        {showHint && question.hint && !isRevealed && (
          <framerMotion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/35 border border-amber-200 dark:border-amber-800/60 flex items-start gap-2.5">
              <Lightbulb size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                <strong className="font-bold">Petunjuk: </strong>
                {question.hint}
              </p>
            </div>
          </framerMotion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2.5" role="radiogroup" aria-label="Pilihan Jawaban">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = question.answer === index;
          const isEliminated = eliminatedOptions.includes(index);

          let stateClass =
            'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary-400 dark:hover:border-primary-500 text-slate-800 dark:text-slate-200';
          let badgeClass =
            'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';
          let Icon = null;

          if (isEliminated && !isRevealed) {
            stateClass =
              'border-slate-200/60 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-600 line-through opacity-45';
          } else if (isRevealed) {
            if (isCorrect) {
              stateClass =
                'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200';
              badgeClass = 'bg-emerald-600 text-white border-emerald-600';
              Icon = CheckCircle2;
            } else if (isSelected && !isCorrect) {
              stateClass =
                'border-red-500 bg-red-50/80 dark:bg-red-950/40 text-red-950 dark:text-red-200';
              badgeClass = 'bg-red-600 text-white border-red-600';
              Icon = XCircle;
            } else {
              stateClass =
                'border-slate-200 dark:border-slate-800 opacity-55 text-slate-600 dark:text-slate-400';
            }
          } else if (isSelected) {
            stateClass =
              'border-primary-600 dark:border-primary-500 bg-primary-50/80 dark:bg-primary-950/50 text-primary-950 dark:text-white shadow-xs';
            badgeClass = 'bg-primary-600 text-white border-primary-600';
          }

          return (
            <button
              type="button"
              key={index}
              disabled={isRevealed || isEliminated}
              onClick={() => onSelectAnswer(index)}
              aria-checked={isSelected}
              role="radio"
              className={clsx(
                'w-full flex items-center justify-between gap-3 p-4 rounded-xl border-2 text-left text-sm font-medium transition-all',
                stateClass
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={clsx(
                    'w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 border transition-colors',
                    badgeClass
                  )}
                >
                  {optionLetters[index]}
                </span>
                <span className="leading-snug">{option}</span>
              </div>
              {Icon && (
                <Icon
                  className={clsx(
                    'shrink-0',
                    isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                  )}
                  size={20}
                />
              )}
            </button>
          );
        })}
      </div>

      {mode === 'practice' && !isRevealed && (
        <div className="pt-2 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Mode Latihan: Periksa jawaban sekarang untuk melihat pembahasan teknis.
          </p>
          <button
            type="button"
            onClick={onCheckAnswer}
            disabled={selectedAnswer === null}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold transition-colors shrink-0"
          >
            <HelpCircle size={15} /> Periksa Jawaban
          </button>
        </div>
      )}

      <AnimatePresence>
        {isRevealed && question.explanation && (
          <framerMotion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={clsx(
              'p-5 rounded-xl border space-y-3',
              selectedAnswer === question.answer
                ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60'
                : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={clsx(
                  'text-xs font-bold uppercase tracking-wider font-mono',
                  selectedAnswer === question.answer
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : 'text-red-600 dark:text-red-400'
                )}
              >
                {selectedAnswer === question.answer
                  ? 'Jawaban Tepat! Analisis Teknis:'
                  : `Kurang Tepat · Jawaban Benar: Pilihan ${optionLetters[question.answer]}`}
              </span>
              {question.relatedChapter && (
                <Link
                  to="/materi"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline"
                >
                  <BookOpen size={13} /> Buka Bab {question.relatedChapter}
                </Link>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {question.explanation}
            </p>
          </framerMotion.div>
        )}
      </AnimatePresence>
    </framerMotion.div>
  );
}
