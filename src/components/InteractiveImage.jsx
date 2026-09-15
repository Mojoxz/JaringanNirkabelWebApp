import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveImage({ image, hotspots }) {
  const [activeHotspot, setActiveHotspot] = useState(null);

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
      <img src={image} alt="Interactive map" className="w-full h-auto block" />
      
      {hotspots.map((hotspot, index) => (
        <div key={index}>
          {/* Hotspot Marker */}
          <button
            onClick={() => setActiveHotspot(activeHotspot === index ? null : index)}
            className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 hover:scale-110 transition-transform z-10"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-40"></span>
            <span className="relative font-bold text-sm">{index + 1}</span>
          </button>

          {/* Tooltip Card */}
          <AnimatePresence>
            {activeHotspot === index && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute z-20 w-64 bg-white/95 backdrop-blur rounded-xl shadow-xl border border-slate-200 p-4"
                style={{ 
                  left: `${hotspot.x}%`, 
                  top: `calc(${hotspot.y}% + 24px)`,
                  transform: hotspot.x > 50 ? 'translateX(-100%)' : 'translateX(0)'
                }}
              >
                <h4 className="font-bold text-slate-900 mb-1">{hotspot.title}</h4>
                <p className="text-sm text-slate-600">{hotspot.description}</p>
                {hotspot.image && (
                   <img src={hotspot.image} alt={hotspot.title} className="mt-3 rounded-lg w-full h-24 object-cover" />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
