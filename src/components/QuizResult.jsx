import { motion } from 'framer-motion';
import { Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuizResult({ score, total, correct, incorrect, onRetry }) {
  const percentage = Math.round((score / total) * 100);
  
  let feedback = "Keep Learning";
  let color = "text-orange-500";
  let bg = "bg-orange-50";
  
  if (percentage >= 90) {
    feedback = "Excellent!";
    color = "text-green-600";
    bg = "bg-green-50";
  } else if (percentage >= 80) {
    feedback = "Very Good!";
    color = "text-emerald-500";
    bg = "bg-emerald-50";
  } else if (percentage >= 70) {
    feedback = "Good!";
    color = "text-blue-500";
    bg = "bg-blue-50";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white max-w-2xl mx-auto rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 text-center"
    >
      <div className={`mx-auto w-24 h-24 rounded-full ${bg} flex items-center justify-center mb-6`}>
        <Trophy size={48} className={color} />
      </div>
      
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Selesai</h2>
      <p className={`text-xl font-medium mb-8 ${color}`}>{feedback}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-slate-50 p-6 rounded-2xl">
          <div className="text-4xl font-bold text-slate-900 mb-1">{score} <span className="text-xl text-slate-400">/ {total}</span></div>
          <div className="text-slate-500 font-medium text-sm uppercase tracking-wider">Skor Akhir</div>
        </div>
        <div className="grid grid-rows-2 gap-4">
          <div className="bg-green-50 p-3 flex flex-col justify-center rounded-xl">
            <span className="text-green-700 font-bold text-xl">{correct}</span>
            <span className="text-green-600/80 text-xs uppercase font-medium tracking-wider">Benar</span>
          </div>
          <div className="bg-red-50 p-3 flex flex-col justify-center rounded-xl">
            <span className="text-red-700 font-bold text-xl">{incorrect}</span>
            <span className="text-red-600/80 text-xs uppercase font-medium tracking-wider">Salah</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRetry}
          className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <RotateCcw size={20} />
          Ulangi Quiz
        </button>
        <Link
          to="/materi"
          className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
        >
          Kembali ke Materi
          <ArrowRight size={20} />
        </Link>
      </div>
    </motion.div>
  );
}
