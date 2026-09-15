import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import clsx from 'clsx';
import { Info } from 'lucide-react';

export default function Timeline({ data, intro }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-8 mt-6">
      {intro && (
        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-primary-600 shrink-0 mt-0.5" />
            <p className="text-primary-900 leading-relaxed">{intro}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Timeline Navigation */}
        <div className="md:w-1/3 flex md:flex-col overflow-x-auto md:overflow-visible pb-4 md:pb-0 gap-2 border-b md:border-b-0 md:border-l-2 border-slate-200 shrink-0">
          {data.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={clsx(
                "flex flex-col text-left px-4 py-3 min-w-[130px] md:min-w-0 md:border-l-2 md:-ml-[2px] transition-all relative rounded-r-xl",
                activeIndex === index
                  ? "border-primary-600 text-primary-700 bg-primary-50"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              )}
            >
              {activeIndex === index && (
                <motion.div
                  layoutId="timeline-indicator"
                  className="hidden md:block absolute -left-[7px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-600 border-2 border-white shadow-md shadow-primary-300"
                />
              )}
              <span className="font-black text-base tracking-tight">{item.year}</span>
              <span className="text-xs font-medium mt-0.5 leading-snug">{item.event}</span>
            </button>
          ))}
        </div>

        {/* Timeline Content Panel */}
        <div className="md:w-2/3 min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >
              {data[activeIndex].image && (
                <img
                  src={data[activeIndex].image}
                  alt={data[activeIndex].event}
                  className="w-full h-52 object-cover"
                />
              )}
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-primary-600 font-black text-3xl tracking-tight">{data[activeIndex].year}</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">{data[activeIndex].event}</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">{data[activeIndex].description}</p>
                {data[activeIndex].detail && (
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-slate-600 text-sm leading-relaxed">{data[activeIndex].detail}</p>
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
