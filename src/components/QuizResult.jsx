import { useState } from 'react';
import { motion as framerMotion } from 'framer-motion';
import {
  Trophy,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  BookOpen,
  ChevronDown,
  History,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function QuizResult({
  score,
  correct,
  incorrect,
  questions = [],
  selectedAnswers = [],
  quizHistory = [],
  onRetry,
}) {
  const [openReviewIndex, setOpenReviewIndex] = useState(0);

  let feedback = 'Perlu Penguatan Konsep Dasar RF';
  let color = 'text-amber-600 dark:text-amber-400';
  let bg = 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800';

  if (score >= 90) {
    feedback = 'Kompetensi Sangat Baik (Siap Engineer Lapangan)';
    color = 'text-emerald-600 dark:text-emerald-400';
    bg = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800';
  } else if (score >= 75) {
    feedback = 'Kompetensi Baik (Memahami Standar Nirkabel)';
    color = 'text-primary-600 dark:text-primary-400';
    bg = 'bg-primary-50 dark:bg-primary-950/50 border-primary-200 dark:border-primary-800';
  }

  const categoryStats = questions.reduce((acc, q, idx) => {
    const cat = q.category || 'Umum';
    if (!acc[cat]) acc[cat] = { total: 0, correct: 0 };
    acc[cat].total += 1;
    if (selectedAnswers[idx] === q.answer) {
      acc[cat].correct += 1;
    }
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <framerMotion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xs border border-slate-200 dark:border-slate-800"
      >
        <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className={clsx('w-20 h-20 rounded-2xl border flex items-center justify-center shrink-0', bg)}>
            <Trophy size={40} className={color} />
          </div>
          <div className="text-center md:text-left flex-1">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Laporan Evaluasi Jaringan Nirkabel
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Skor Akhir: {score}/100
            </h2>
            <p className={clsx('text-sm sm:text-base font-semibold mt-1', color)}>{feedback}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <div className="px-5 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center">
              <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">{correct}</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Jawaban Benar
              </div>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-center">
              <div className="text-2xl font-extrabold text-red-700 dark:text-red-300 font-mono">{incorrect}</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
                Jawaban Salah
              </div>
            </div>
          </div>
        </div>

        {Object.keys(categoryStats).length > 0 && (
          <div className="py-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              Analisis Penguasaan per Domain Kompetensi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(categoryStats).map(([cat, stat]) => {
                const pct = Math.round((stat.correct / stat.total) * 100);
                return (
                  <div
                    key={cat}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800"
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{cat}</span>
                      <span className="font-mono font-bold text-primary-600 dark:text-primary-400">
                        {stat.correct}/{stat.total} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div
                        className={clsx(
                          'h-full rounded-full transition-all duration-500',
                          pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-primary-500' : 'bg-amber-500'
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {quizHistory.length > 0 && (
          <div className="py-5 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">
              <History size={14} className="text-primary-500" />
              <span>Riwayat Percobaan Terakhir</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quizHistory.slice(0, 5).map((item, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300"
                >
                  Skor <strong className="text-slate-900 dark:text-white">{item.score}</strong> · {item.mode} ({item.topic})
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <RotateCcw size={16} />
            Coba Ulang Evaluasi
          </button>
          <Link
            to="/materi"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm"
          >
            Pelajari Kembali Materi W3
            <ArrowRight size={16} />
          </Link>
        </div>
      </framerMotion.div>

      {questions.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Pembahasan Teknis Soal demi Soal
          </h3>
          <div className="space-y-2.5">
            {questions.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isRight = userAns === q.answer;
              const isOpen = openReviewIndex === idx;
              return (
                <div
                  key={q.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenReviewIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {isRight ? (
                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle size={18} className="text-red-500 shrink-0" />
                      )}
                      <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 shrink-0">
                        #{idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {q.question}
                      </span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={clsx('text-slate-400 shrink-0 transition-transform', isOpen && 'rotate-180')}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-2.5 text-xs sm:text-sm">
                      <div className="flex flex-wrap gap-4">
                        <div>
                          <span className="text-slate-500 dark:text-slate-400">Jawaban Anda: </span>
                          <strong className={isRight ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}>
                            {userAns !== null && userAns !== undefined ? q.options[userAns] : 'Tidak dijawab'}
                          </strong>
                        </div>
                        {!isRight && (
                          <div>
                            <span className="text-slate-500 dark:text-slate-400">Jawaban Tepat: </span>
                            <strong className="text-emerald-600 dark:text-emerald-400">
                              {q.options[q.answer]}
                            </strong>
                          </div>
                        )}
                      </div>
                      {q.explanation && (
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {q.explanation}
                        </p>
                      )}
                      {q.relatedChapter && (
                        <Link
                          to="/materi"
                          className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          <BookOpen size={13} /> Tinjau Bab {q.relatedChapter} di Materi
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
