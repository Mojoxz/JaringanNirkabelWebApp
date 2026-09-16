import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm font-medium text-slate-600">
        <span>Progress Belajar</span>
        <span>{percentage}% ({current}/{total})</span>
      </div>
      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
