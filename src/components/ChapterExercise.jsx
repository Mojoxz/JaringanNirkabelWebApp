import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Trophy, ChevronRight, Pencil, HelpCircle } from 'lucide-react';
import clsx from 'clsx';

export default function ChapterExercise({ questions = [], onPassed, alreadyPassed = false }) {
  const [answers, setAnswers] = useState(() => questions.map(() => ({ value: '', chosen: null })));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [results, setResults] = useState([]);
  const topRef = useRef(null);

  if (!questions.length) return null;

  const setFill = (idx, val) => {
    setAnswers((prev) => prev.map((a, i) => (i === idx ? { ...a, value: val } : a)));
  };

  const setChoice = (idx, choiceIdx) => {
    if (submitted) return;
    setAnswers((prev) => prev.map((a, i) => (i === idx ? { ...a, chosen: choiceIdx } : a)));
  };

  const handleSubmit = () => {
    const res = questions.map((q, idx) => {
      if (q.type === 'fill') {
        const userVal = (answers[idx]?.value || '').trim().toLowerCase();
        const correct = Array.isArray(q.answer)
          ? q.answer.some((a) => a.toLowerCase() === userVal)
          : q.answer.trim().toLowerCase() === userVal;
        return { correct, userAnswer: answers[idx]?.value };
      }
      const correct = answers[idx]?.chosen === q.answer;
      return { correct, userAnswer: answers[idx]?.chosen };
    });

    const passed = res.filter((r) => r.correct).length;
    const total = questions.length;
    const pct = Math.round((passed / total) * 100);
    setResults(res);
    setScore({ passed, total, pct });
    setSubmitted(true);

    if (pct >= 80) {
      setTimeout(() => onPassed?.(), 400);
    }
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
  };

  const handleReset = () => {
    setAnswers(questions.map(() => ({ value: '', chosen: null })));
    setSubmitted(false);
    setScore(null);
    setResults([]);
  };

  const allAnswered = questions.every((q, idx) =>
    q.type === 'fill' ? (answers[idx]?.value || '').trim() !== '' : answers[idx]?.chosen !== null
  );

  return (
    <section
      id="section-exercise"
      ref={topRef}
      aria-labelledby="chapter-exercise-heading"
      className="bg-slate-100/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-700 text-white rounded-lg flex items-center justify-center shrink-0">
            <Pencil size={16} aria-hidden="true" />
          </div>
          <div>
            <p className="font-mono text-[11px] font-bold text-primary-800 dark:text-primary-300 uppercase">
              [UJI PEMAHAMAN BAB // MINIMAL 80%]
            </p>
            <h2 id="chapter-exercise-heading" className="font-bold text-base text-slate-900 dark:text-white">
              Latihan Evaluasi Materi
            </h2>
          </div>
        </div>
        {alreadyPassed && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-md">
            <CheckCircle2 size={14} aria-hidden="true" />
            <span>Bab Telah Lulus</span>
          </span>
        )}
      </div>

      <AnimatePresence>
        {submitted && score && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className={clsx(
              'flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border',
              score.pct >= 80
                ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800'
                : 'bg-red-50 dark:bg-red-950/80 border-red-300 dark:border-red-800'
            )}
          >
            <div className="flex items-center gap-3">
              {score.pct >= 80 ? (
                <Trophy size={22} className="text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
              ) : (
                <XCircle size={22} className="text-red-700 dark:text-red-400 shrink-0" aria-hidden="true" />
              )}
              <div>
                <p
                  className={clsx(
                    'font-bold text-sm',
                    score.pct >= 80 ? 'text-emerald-900 dark:text-emerald-200' : 'text-red-900 dark:text-red-200'
                  )}
                >
                  {score.pct >= 80 ? 'Selamat! Anda Lulus Latihan Bab Ini' : 'Belum Mencapai Batas Lulus. Silakan Coba Lagi'}
                </p>
                <p
                  className={clsx(
                    'text-xs mt-0.5 font-medium',
                    score.pct >= 80 ? 'text-emerald-800 dark:text-emerald-300' : 'text-red-800 dark:text-red-300'
                  )}
                >
                  Skor: {score.passed}/{score.total} ({score.pct}%). Batas kelulusan minimal 80%.
                </p>
              </div>
            </div>
            {score.pct < 80 && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-3.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors min-h-[38px]"
              >
                <RotateCcw size={13} aria-hidden="true" />
                <span>Coba Lagi</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {questions.map((q, idx) => {
          const res = results[idx];
          const isCorrect = res?.correct;
          const inputId = `chapter-ex-input-${idx}`;

          return (
            <div
              key={idx}
              className={clsx(
                'bg-white dark:bg-slate-950 border rounded-xl p-5 transition-colors',
                submitted
                  ? isCorrect
                    ? 'border-emerald-300 dark:border-emerald-800'
                    : 'border-red-300 dark:border-red-800'
                  : 'border-slate-200 dark:border-slate-800'
              )}
            >
              <div className="flex items-start gap-3 mb-4">
                <span
                  className={clsx(
                    'w-6 h-6 rounded-md font-mono flex items-center justify-center text-xs font-bold shrink-0 mt-0.5',
                    submitted
                      ? isCorrect
                        ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                  )}
                >
                  {idx + 1}
                </span>
                <p className="text-slate-900 dark:text-slate-100 text-sm font-semibold leading-relaxed">{q.question}</p>
              </div>

              {q.type === 'fill' && (
                <div className="sm:ml-9 space-y-2">
                  <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Jawaban Isian Singkat:
                  </label>
                  <input
                    id={inputId}
                    type="text"
                    value={answers[idx]?.value || ''}
                    onChange={(e) => setFill(idx, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && allAnswered && !submitted) handleSubmit();
                    }}
                    disabled={submitted}
                    placeholder="Ketik istilah atau angka jawaban..."
                    className={clsx(
                      'w-full max-w-sm px-3.5 py-2.5 text-sm border rounded-lg transition-colors bg-white dark:bg-slate-900',
                      submitted
                        ? isCorrect
                          ? 'border-emerald-500 text-emerald-900 dark:text-emerald-300 font-bold'
                          : 'border-red-500 text-red-800 dark:text-red-300 line-through'
                        : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-primary-600'
                    )}
                  />
                  {submitted && (
                    <div className="pt-1">
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                          <CheckCircle2 size={14} aria-hidden="true" />
                          <span>Jawaban Benar!</span>
                        </span>
                      ) : (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center gap-1 text-xs text-red-700 dark:text-red-400 font-bold">
                            <XCircle size={14} aria-hidden="true" />
                            <span>Jawaban Kurang Tepat</span>
                          </span>
                          <p className="text-xs text-slate-700 dark:text-slate-300">
                            Kunci Jawaban:{' '}
                            <strong className="font-mono text-slate-900 dark:text-white">
                              {Array.isArray(q.answer) ? q.answer[0] : q.answer}
                            </strong>
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {q.hint && !submitted && (
                    <p className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <HelpCircle size={13} aria-hidden="true" />
                      <span>Petunjuk: {q.hint}</span>
                    </p>
                  )}
                </div>
              )}

              {q.type === 'choice' && (
                <div className="sm:ml-9 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, oi) => {
                    const isSelected = answers[idx]?.chosen === oi;
                    const isAnswerKey = q.answer === oi;
                    let optClass =
                      'border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-slate-900';

                    if (submitted) {
                      if (isAnswerKey) {
                        optClass =
                          'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 font-bold';
                      } else if (isSelected && !isAnswerKey) {
                        optClass =
                          'border-red-500 bg-red-50 dark:bg-red-950/70 text-red-900 dark:text-red-200 line-through';
                      } else {
                        optClass = 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500';
                      }
                    } else if (isSelected) {
                      optClass =
                        'border-primary-600 dark:border-primary-400 bg-primary-50 dark:bg-primary-950/80 text-primary-900 dark:text-primary-200 font-bold';
                    }

                    return (
                      <button
                        key={oi}
                        type="button"
                        onClick={() => setChoice(idx, oi)}
                        disabled={submitted}
                        className={clsx(
                          'flex items-center gap-2.5 px-4 py-3 text-sm border rounded-lg text-left transition-colors min-h-[44px]',
                          optClass
                        )}
                      >
                        <span
                          className={clsx(
                            'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                            isSelected && !submitted
                              ? 'border-primary-600 bg-primary-600'
                              : 'border-slate-400 dark:border-slate-600'
                          )}
                        >
                          {submitted && isAnswerKey && (
                            <CheckCircle2 size={13} className="text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                          )}
                          {submitted && isSelected && !isAnswerKey && (
                            <XCircle size={13} className="text-red-700 dark:text-red-400" aria-hidden="true" />
                          )}
                          {!submitted && isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {allAnswered
            ? 'Semua pertanyaan telah diisi. Klik tombol untuk memeriksa skor.'
            : 'Isi seluruh pertanyaan di atas untuk mengaktifkan tombol pemeriksaan.'}
        </p>

        {!submitted ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={clsx(
              'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-colors min-h-[44px]',
              allAnswered
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-500'
            )}
          >
            <span>Periksa Jawaban Bab</span>
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors min-h-[40px]"
          >
            <RotateCcw size={13} aria-hidden="true" />
            <span>Ulangi Latihan</span>
          </button>
        )}
      </div>
    </section>
  );
}
