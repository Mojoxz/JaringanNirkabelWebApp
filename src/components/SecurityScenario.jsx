import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export default function SecurityScenario({ scenario }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (idx) => {
    if (!submitted) setSelected(idx);
  };

  return (
    <div className="bg-slate-900 text-white rounded-xl p-6 md:p-7 space-y-5 border border-slate-800">
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-amber-500/20 border border-amber-500/30 rounded-lg mt-0.5 shrink-0">
          <ShieldAlert size={20} className="text-amber-400" aria-hidden="true" />
        </div>
        <div>
          <p className="font-mono text-xs font-bold text-amber-400 uppercase">[SIMULASI INSIDEN KEAMANAN]</p>
          <h4 className="text-base font-bold text-white mt-0.5 mb-1.5">{scenario.title || 'Skenario Tanggap Insiden'}</h4>
          <p className="text-slate-200 text-sm leading-relaxed">{scenario.question}</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {scenario.options.map((opt, idx) => {
          let stateClass = 'border-slate-700 bg-slate-800/70 hover:border-slate-500';
          let icon = null;

          if (submitted) {
            if (opt.correct) {
              stateClass = 'border-emerald-500 bg-emerald-950/60';
              icon = <CheckCircle2 className="text-emerald-400 shrink-0" size={18} aria-hidden="true" />;
            } else if (selected === idx && !opt.correct) {
              stateClass = 'border-red-500 bg-red-950/60';
              icon = <XCircle className="text-red-400 shrink-0" size={18} aria-hidden="true" />;
            } else {
              stateClass = 'border-slate-800 bg-slate-900/50 opacity-60';
            }
          } else if (selected === idx) {
            stateClass = 'border-sky-400 bg-sky-950/50';
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={submitted}
              onClick={() => handleSelect(idx)}
              className={`w-full flex items-center justify-between gap-4 p-4 rounded-lg border text-left transition-colors min-h-[48px] ${stateClass}`}
            >
              <span className="text-slate-100 text-sm font-medium leading-relaxed">{opt.text}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          type="button"
          disabled={selected === null}
          onClick={() => setSubmitted(true)}
          className="w-full py-3 px-6 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold text-sm rounded-lg transition-colors min-h-[44px]"
        >
          Konfirmasi Keputusan Mitigasi
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border ${
              scenario.options[selected]?.correct
                ? 'border-emerald-600/60 bg-emerald-950/50'
                : 'border-red-600/60 bg-red-950/50'
            }`}
          >
            <p
              className={`font-bold text-sm mb-1 ${
                scenario.options[selected]?.correct ? 'text-emerald-300' : 'text-red-300'
              }`}
            >
              {scenario.options[selected]?.correct ? 'Tindakan Tepat!' : 'Tindakan Kurang Tepat'}
            </p>
            <p className="text-slate-200 text-sm leading-relaxed">{scenario.options[selected]?.feedback}</p>
            <button
              type="button"
              className="mt-3 text-xs font-mono font-bold text-sky-300 hover:text-white underline py-1"
              onClick={() => {
                setSelected(null);
                setSubmitted(false);
              }}
            >
              Ulangi Skenario
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
