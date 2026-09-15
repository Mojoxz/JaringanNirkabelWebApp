import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, SlidersHorizontal, TowerControl } from 'lucide-react';

export default function LinkSimulator() {
  const [distance, setDistance] = useState(5);
  const [height, setHeight] = useState(20);
  const [frequency, setFrequency] = useState(5);
  const [interference, setInterference] = useState(2);

  // Simple scoring model for educational purposes
  const calcScore = () => {
    let score = 100;
    // Distance penalty
    score -= (distance / 50) * 30;
    // Height bonus
    score += (height / 50) * 20;
    // Frequency penalty at 2.4 GHz in dense areas (interference)
    if (frequency === 2) score -= interference * 5;
    else score -= interference * 2;
    // Distance too far for height
    if (distance > 10 && height < 15) score -= 25;
    if (distance > 20 && height < 25) score -= 20;
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const score = calcScore();
  const isGood = score >= 65;
  const isOk = score >= 40 && score < 65;

  const feedback = isGood
    ? { label: "Link Berhasil (Good Link)", color: "green", icon: CheckCircle2, msg: "Parameter Anda sudah cukup baik. Jarak, ketinggian, dan frekuensi membentuk kondisi link yang dapat diandalkan." }
    : isOk
      ? { label: "Link Marginal (Unstable)", color: "orange", icon: SlidersHorizontal, msg: "Link mungkin berfungsi namun tidak stabil. Coba tingkatkan ketinggian antena atau kurangi interferensi." }
      : { label: "Link Gagal (Poor Link)", color: "red", icon: XCircle, msg: "Koneksi kemungkinan tidak akan berfungsi baik. Jaraknya terlalu jauh, antena terlalu rendah, atau interferensi terlalu tinggi." };

  const FeedbackIcon = feedback.icon;

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 mt-8 space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-600 rounded-xl">
          <TowerControl size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold">Simulasi Link Wireless</h3>
          <p className="text-slate-400 text-sm">Atur parameter dan lihat apakah koneksi berhasil</p>
        </div>
      </div>

      {/* Visual Tower Representation */}
      <div className="flex items-end justify-center gap-8 md:gap-24 bg-slate-800/50 rounded-2xl p-8 min-h-[160px] relative overflow-hidden">
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-slate-700/50 rounded-b-2xl" />

        {/* Tower A */}
        <div className="flex flex-col items-center gap-2 z-10">
          <div className="text-xs text-slate-400 font-mono">Site A</div>
          <div
            className="w-3 bg-primary-500 rounded-t-sm transition-all duration-500"
            style={{ height: `${(height / 50) * 90 + 20}px` }}
          />
          <div className="w-8 h-2 bg-slate-600 rounded-sm" />
        </div>

        {/* Signal Line */}
        <div className="flex-1 flex flex-col items-center justify-end gap-2 mb-2 z-10">
          <div className="relative w-full">
            <motion.div
              className="h-0.5 rounded-full"
              style={{ background: isGood ? '#22c55e' : isOk ? '#f97316' : '#ef4444' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className={`text-center mt-3 text-sm font-bold ${isGood ? 'text-green-400' : isOk ? 'text-orange-400' : 'text-red-400'}`}>
              {distance} km ← → 
            </div>
          </div>
        </div>

        {/* Tower B */}
        <div className="flex flex-col items-center gap-2 z-10">
          <div className="text-xs text-slate-400 font-mono">Site B</div>
          <div
            className="w-3 bg-emerald-500 rounded-t-sm transition-all duration-500"
            style={{ height: `${(height / 50) * 90 + 20}px` }}
          />
          <div className="w-8 h-2 bg-slate-600 rounded-sm" />
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Jarak (km)", value: distance, setter: setDistance, min: 1, max: 50, unit: "km", color: "blue" },
          { label: "Ketinggian Antena (m)", value: height, setter: setHeight, min: 5, max: 50, unit: "m", color: "emerald" },
          { label: "Interferensi (1=rendah, 5=tinggi)", value: interference, setter: setInterference, min: 1, max: 5, unit: "", color: "orange" },
        ].map((s) => (
          <div key={s.label} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-medium">{s.label}</span>
              <span className="font-bold text-white bg-slate-700 px-2 py-0.5 rounded-lg font-mono">{s.value}{s.unit}</span>
            </div>
            <input
              type="range"
              min={s.min}
              max={s.max}
              value={s.value}
              onChange={(e) => s.setter(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none bg-slate-700 cursor-pointer accent-primary-500"
            />
          </div>
        ))}

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-300 font-medium">Frekuensi</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[{ label: "2.4 GHz", val: 2 }, { label: "5 GHz", val: 5 }].map((f) => (
              <button
                key={f.val}
                onClick={() => setFrequency(f.val)}
                className={`py-2 rounded-xl font-bold text-sm transition-all ${
                  frequency === f.val
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${isGood}-${isOk}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-start gap-4 p-5 rounded-2xl ${
            isGood ? 'bg-green-900/30 border border-green-700/40'
            : isOk ? 'bg-orange-900/30 border border-orange-700/40'
            : 'bg-red-900/30 border border-red-700/40'
          }`}
        >
          <FeedbackIcon size={32} className={isGood ? 'text-green-400 shrink-0' : isOk ? 'text-orange-400 shrink-0' : 'text-red-400 shrink-0'} />
          <div>
            <div className={`font-bold text-lg ${isGood ? 'text-green-300' : isOk ? 'text-orange-300' : 'text-red-300'}`}>
              {feedback.label} — Score: {score}/100
            </div>
            <p className="text-slate-300 text-sm mt-1">{feedback.msg}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
