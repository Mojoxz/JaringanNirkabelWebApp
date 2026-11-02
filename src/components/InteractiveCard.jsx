import { motion as framerMotion } from 'framer-motion';
import clsx from 'clsx';

export default function InteractiveCard({ children, className, onClick, delay = 0 }) {
  const Component = onClick ? framerMotion.button : framerMotion.div;

  return (
    <Component
      type={onClick ? 'button' : undefined}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay }}
      onClick={onClick}
      className={clsx(
        "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden text-left",
        onClick && "cursor-pointer hover:border-primary-400 dark:hover:border-primary-500 transition-colors",
        className
      )}
    >
      {children}
    </Component>
  );
}
