import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full space-y-1.5">
      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
        <span>Progres Tutorial</span>
        <span className="font-mono">
          {percentage}% ({current}/{total})
        </span>
      </div>
      <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
