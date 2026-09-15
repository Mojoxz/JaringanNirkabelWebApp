import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Trophy, ChevronRight, Pencil } from 'lucide-react';
import clsx from 'clsx';

/**
 * ChapterExercise — Latihan soal per chapter (W3Schools style)
 *
 * Props:
 *   questions : array of question objects (see materials.js exercise field)
 *   onPassed  : callback fired when user passes (score >= 80%)
 *   alreadyPassed: bool — if chapter was already completed
 */
export default function ChapterExercise({ questions = [], onPassed, alreadyPassed = false }) {
  const [answers, setAnswers] = useState(() => questions.map(() => ({ value: '', chosen: null })));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [results, setResults] = useState([]);
  const topRef = useRef(null);

  if (!questions.length) return null;

  // ── Answer helpers ─────────────────────────────────────────
  const setFill = (idx, val) => {
    setAnswers(prev => prev.map((a, i) => i === idx ? { ...a, value: val } : a));
  };

  const setChoice = (idx, choiceIdx) => {
    if (submitted) return;
    setAnswers(prev => prev.map((a, i) => i === idx ? { ...a, chosen: choiceIdx } : a));
  };

  // ── Check answers ──────────────────────────────────────────
  const handleSubmit = () => {
    const res = questions.map((q, idx) => {
      if (q.type === 'fill') {
        const userVal = answers[idx].value.trim().toLowerCase();
        const correct = Array.isArray(q.answer)
          ? q.answer.some(a => a.toLowerCase() === userVal)
          : q.answer.trim().toLowerCase() === userVal;
        return { correct, userAnswer: answers[idx].value };
      } else {
        const correct = answers[idx].chosen === q.answer;
        return { correct, userAnswer: answers[idx].chosen };
      }
    });
    const passed = res.filter(r => r.correct).length;
    const total = questions.length;
    const pct = Math.round((passed / total) * 100);
    setResults(res);
    setScore({ passed, total, pct });
    setSubmitted(true);
    if (pct >= 80) {
      setTimeout(() => onPassed?.(), 600);
    }
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
  };

  // ── Reset ──────────────────────────────────────────────────
  const handleReset = () => {
    setAnswers(questions.map(() => ({ value: '', chosen: null })));
    setSubmitted(false);
    setScore(null);
    setResults([]);
  };

  const allAnswered = questions.every((q, idx) =>
    q.type === 'fill' ? answers[idx].value.trim() !== '' : answers[idx].chosen !== null
  );

  // ── Render ─────────────────────────────────────────────────
  return (
    <motion.div
      ref={topRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className="mt-10"
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center">
          <Pencil size={14} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Latihan Soal</h3>
          <p className="text-xs text-slate-500">Jawab semua soal untuk menyelesaikan chapter ini</p>
        </div>
        {alreadyPassed && (
          <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <CheckCircle2 size={13} /> Sudah Lulus
          </span>
        )}
      </div>

      {/* Score banner */}
      <AnimatePresence>
        {submitted && score && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={clsx(
              'flex items-center justify-between gap-4 p-4 rounded-2xl mb-5 border',
              score.pct >= 80
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-red-50 border-red-200'
            )}
          >
            <div className="flex items-center gap-3">
              {score.pct >= 80
                ? <Trophy size={24} className="text-emerald-600 shrink-0" />
                : <XCircle size={24} className="text-red-500 shrink-0" />
              }
              <div>
                <p className={clsx('font-bold text-sm', score.pct >= 80 ? 'text-emerald-800' : 'text-red-800')}>
                  {score.pct >= 80 ? 'Lulus! Selamat 🎉' : 'Belum Lulus — Coba Lagi'}
                </p>
                <p className={clsx('text-xs mt-0.5', score.pct >= 80 ? 'text-emerald-600' : 'text-red-600')}>
                  Skor: {score.passed}/{score.total} ({score.pct}%) — Minimal 80% untuk lulus
                </p>
              </div>
            </div>
            {score.pct < 80 && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition-colors shrink-0"
              >
                <RotateCcw size={12} /> Coba Lagi
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const res = results[idx];
          const isCorrect = res?.correct;
          const isWrong = submitted && !isCorrect;

          return (
            <div
              key={idx}
              className={clsx(
                'bg-white border rounded-2xl p-5 transition-all',
                submitted
                  ? isCorrect ? 'border-emerald-200 bg-emerald-50/40' : 'border-red-200 bg-red-50/30'
                  : 'border-slate-200'
              )}
            >
              {/* Question number + text */}
              <div className="flex items-start gap-3 mb-4">
                <span className={clsx(
                  'w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5',
                  submitted
                    ? isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    : 'bg-slate-100 text-slate-600'
                )}>
                  {idx + 1}
                </span>
                <p className="text-slate-800 text-sm font-medium leading-relaxed">{q.question}</p>
              </div>

              {/* Fill-in-blank */}
              {q.type === 'fill' && (
                <div className="ml-9">
                  <input
                    type="text"
                    value={answers[idx].value}
                    onChange={e => setFill(idx, e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && allAnswered && !submitted) handleSubmit(); }}
                    disabled={submitted}
                    placeholder="Ketik jawaban Anda..."
                    className={clsx(
                      'w-full max-w-sm px-4 py-2.5 text-sm border rounded-xl outline-none transition-all',
                      submitted
                        ? isCorrect
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                          : 'bg-red-50 border-red-300 text-red-700 line-through'
                        : 'border-slate-300 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
                    )}
                  />
                  {/* Feedback */}
                  {submitted && (
                    <div className="mt-2 flex items-start gap-2">
                      {isCorrect
                        ? <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold"><CheckCircle2 size={13} /> Benar!</span>
                        : <div>
                            <span className="flex items-center gap-1 text-xs text-red-600 font-semibold"><XCircle size={13} /> Salah</span>
                            <p className="text-xs text-slate-600 mt-1">
                              Jawaban: <span className="font-semibold text-slate-800">
                                {Array.isArray(q.answer) ? q.answer[0] : q.answer}
                              </span>
                            </p>
                          </div>
                      }
                    </div>
                  )}
                  {q.hint && !submitted && (
                    <p className="mt-1.5 text-xs text-slate-400">💡 {q.hint}</p>
                  )}
                </div>
              )}

              {/* Multiple choice */}
              {q.type === 'choice' && (
                <div className="ml-9 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oi) => {
                    const isSelected = answers[idx].chosen === oi;
                    const isAnswerKey = q.answer === oi;
                    let optClass = 'border-slate-200 text-slate-700 hover:border-primary-300 hover:bg-primary-50/50';
                    if (submitted) {
                      if (isAnswerKey) optClass = 'border-emerald-400 bg-emerald-50 text-emerald-800 font-semibold';
                      else if (isSelected && !isAnswerKey) optClass = 'border-red-400 bg-red-50 text-red-700 line-through';
                      else optClass = 'border-slate-100 text-slate-400 bg-slate-50/50';
                    } else if (isSelected) {
                      optClass = 'border-primary-400 bg-primary-50 text-primary-800 font-medium';
                    }
                    return (
                      <button
                        key={oi}
                        onClick={() => setChoice(idx, oi)}
                        disabled={submitted}
                        className={clsx(
                          'flex items-center gap-2.5 px-4 py-2.5 text-sm border rounded-xl text-left transition-all',
                          optClass,
                          !submitted && 'cursor-pointer'
                        )}
                      >
                        <span className={clsx(
                          'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                          isSelected && !submitted ? 'border-primary-500 bg-primary-500' : 'border-slate-300'
                        )}>
                          {submitted && isAnswerKey && <CheckCircle2 size={12} className="text-emerald-600" />}
                          {submitted && isSelected && !isAnswerKey && <XCircle size={12} className="text-red-500" />}
                          {!submitted && isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit button */}
      {!submitted && (
        <div className="mt-5 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={clsx(
              'flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all',
              allAnswered
                ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm shadow-primary-200'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            )}
          >
            Periksa Jawaban <ChevronRight size={15} />
          </button>
        </div>
      )}

      {/* Reset after correct */}
      {submitted && score?.pct >= 80 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            <RotateCcw size={12} /> Ulangi Latihan
          </button>
        </div>
      )}
    </motion.div>
  );
}
