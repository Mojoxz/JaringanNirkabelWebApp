import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import clsx from 'clsx';
import { Info } from 'lucide-react';

export default function Timeline({ data, intro }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-6 mt-6">
      {intro && (
        <div className="bg-primary-50/80 dark:bg-slate-900 border border-primary-200 dark:border-slate-800 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <Info size={18} className="text-primary-700 dark:text-primary-400 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed">{intro}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div
          role="tablist"
          aria-label="Garis waktu sejarah jaringan nirkabel"
          className="md:w-1/3 flex md:flex-col overflow-x-auto md:overflow-visible pb-3 md:pb-0 gap-1.5 border-b md:border-b-0 md:border-l-2 border-slate-300 dark:border-slate-700 shrink-0"
        >
          {data.map((item, index) => {
            const active = activeIndex === index;
            return (
              <button
                key={item.year}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveIndex(index)}
                className={clsx(
                  'flex flex-col text-left px-4 py-3 min-w-[145px] md:min-w-0 md:border-l-2 md:-ml-[2px] transition-colors relative rounded-r-lg min-h-[48px]',
                  active
                    ? 'border-primary-700 dark:border-primary-400 text-primary-900 dark:text-primary-200 bg-primary-50 dark:bg-primary-950/80 font-bold'
                    : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                )}
              >
                <span className="font-mono font-extrabold text-sm tracking-tight">{item.year}</span>
                <span className="text-xs font-medium mt-0.5 leading-snug">{item.event}</span>
              </button>
            );
          })}
        </div>

        <div className="md:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs"
            >
              {data[activeIndex].image && (
                <img
                  src={data[activeIndex].image}
                  alt={data[activeIndex].event}
                  width="800"
                  height="240"
                  loading="lazy"
                  className="w-full h-52 object-cover bg-slate-100 dark:bg-slate-800"
                />
              )}
              <div className="p-6 space-y-4">
                <div>
                  <span className="font-mono text-primary-700 dark:text-primary-400 font-extrabold text-2xl tracking-tight">
                    {data[activeIndex].year}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{data[activeIndex].event}</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {data[activeIndex].description}
                </p>
                {data[activeIndex].detail && (
                  <div className="bg-slate-50 dark:bg-slate-800/80 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                    <p className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Detail Teknis:
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      {data[activeIndex].detail}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
