import { useState } from 'react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';

export default function InteractiveImage({ image, hotspots }) {
  const [activeHotspot, setActiveHotspot] = useState(null);

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <img
        src={image}
        alt="Peta interaktif jaringan nirkabel"
        width="896"
        height="504"
        loading="lazy"
        className="w-full h-auto block"
      />

      {hotspots.map((hotspot, index) => (
        <div key={index}>
          <button
            type="button"
            onClick={() => setActiveHotspot(activeHotspot === index ? null : index)}
            aria-label={`Titik info ${index + 1}: ${hotspot.title}`}
            aria-expanded={activeHotspot === index}
            className="absolute w-9 h-9 -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 hover:scale-105 transition-transform z-10 border-2 border-white"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
          >
            <span className="relative font-bold text-sm">{index + 1}</span>
          </button>

          <AnimatePresence>
            {activeHotspot === index && (
              <framerMotion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute z-20 w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4"
                style={{
                  left: `${hotspot.x}%`,
                  top: `calc(${hotspot.y}% + 24px)`,
                  transform: hotspot.x > 50 ? 'translateX(-100%)' : 'translateX(0)',
                }}
              >
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">{hotspot.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">{hotspot.description}</p>
                {hotspot.image && (
                  <img
                    src={hotspot.image}
                    alt={hotspot.title}
                    width="240"
                    height="96"
                    loading="lazy"
                    className="mt-3 rounded-lg w-full h-24 object-cover"
                  />
                )}
              </framerMotion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
