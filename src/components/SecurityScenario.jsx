import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export default function SecurityScenario({ scenario }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (idx) => {
    if (!submitted) setSelected(idx);
  };

  const correctIndex = scenario.options.findIndex(o => o.correct);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-3xl p-6 md:p-8 mt-8 space-y-6 border border-slate-700">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-red-600/20 rounded-xl mt-1 shrink-0">
          <ShieldAlert size={24} className="text-red-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-2">Skenario Interaktif</h3>
          <p className="text-slate-300 leading-relaxed">{scenario.question}</p>
        </div>
      </div>

      <div className="space-y-3">
        {scenario.options.map((opt, idx) => {
          let stateClass = "border-slate-600 hover:border-slate-400";
          let icon = null;
          if (submitted) {
            if (opt.correct) {
              stateClass = "border-green-500 bg-green-900/30";
              icon = <CheckCircle2 className="text-green-400 shrink-0" size={20} />;
            } else if (selected === idx && !opt.correct) {
              stateClass = "border-red-500 bg-red-900/30";
              icon = <XCircle className="text-red-400 shrink-0" size={20} />;
            } else {
              stateClass = "border-slate-700 opacity-50";
            }
          } else if (selected === idx) {
            stateClass = "border-primary-500 bg-primary-900/20";
          }

          return (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => handleSelect(idx)}
              className={`w-full flex items-center justify-between gap-4 p-4 rounded-xl border-2 text-left transition-all ${stateClass}`}
            >
              <span className="text-slate-200 font-medium leading-relaxed">{opt.text}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          disabled={selected === null}
          onClick={() => setSubmitted(true)}
          className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors"
        >
          Konfirmasi Jawaban
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-xl border ${scenario.options[selected]?.correct ? 'border-green-700/40 bg-green-900/20' : 'border-red-700/40 bg-red-900/20'}`}
          >
            <div className={`font-bold mb-2 ${scenario.options[selected]?.correct ? 'text-green-300' : 'text-red-300'}`}>
              {scenario.options[selected]?.correct ? 'Jawaban Tepat!' : 'Kurang Tepat.'}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {scenario.options[selected]?.feedback}
            </p>
            <button
              className="mt-4 text-sm text-slate-400 hover:text-white underline"
              onClick={() => { setSelected(null); setSubmitted(false); }}
            >
              Coba lagi
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
