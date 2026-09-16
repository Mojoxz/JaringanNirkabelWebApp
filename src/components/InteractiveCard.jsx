import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function InteractiveCard({ children, className, onClick, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay }}
      onClick={onClick}
      className={clsx(
        "bg-white rounded-xl border border-slate-200 overflow-hidden",
        onClick && "cursor-pointer hover:border-slate-300 transition-colors",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
