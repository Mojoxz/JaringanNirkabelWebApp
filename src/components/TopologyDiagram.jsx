import { motion } from 'framer-motion';
import { useState } from 'react';
import { RadioReceiver, Router, Antenna, Laptop } from 'lucide-react';
import clsx from 'clsx';

export default function TopologyDiagram({ type }) {
  const [activeNode, setActiveNode] = useState(null);

  const ptpData = [
    { id: 'site-a', label: 'Site A (HQ)', icon: Router, description: 'Kantor Pusat dengan koneksi internet utama.', x: 10, y: 50 },
    { id: 'link', label: 'Wireless Link', icon: Antenna, description: 'Koneksi PTP jarak jauh (misalnya 10km) menggunakan antena Grid/Dish.', x: 50, y: 50 },
    { id: 'site-b', label: 'Site B (Branch)', icon: Router, description: 'Kantor Cabang yang menerima koneksi dari HQ.', x: 90, y: 50 },
  ];

  const ptmpData = [
    { id: 'ap', label: 'Access Point (Base)', icon: Antenna, description: 'Base Station dengan antena Sectoral (memancar 120 derajat).', x: 20, y: 50 },
    { id: 'client-1', label: 'Client 1', icon: RadioReceiver, description: 'Rumah pelanggan 1 menggunakan antena CPE.', x: 80, y: 20 },
    { id: 'client-2', label: 'Client 2', icon: RadioReceiver, description: 'Rumah pelanggan 2.', x: 80, y: 50 },
    { id: 'client-3', label: 'Client 3', icon: RadioReceiver, description: 'Kantor kecil pelanggan 3.', x: 80, y: 80 },
  ];

  const nodes = type === 'ptp' ? ptpData : ptmpData;

  return (
    <div className="w-full bg-slate-900 rounded-2xl p-8 relative overflow-hidden text-white min-h-[400px] flex flex-col items-center">
      {/* Title */}
      <div className="absolute top-6 left-6 opacity-50 font-mono text-sm tracking-widest uppercase">
        {type === 'ptp' ? 'Point-to-Point (PTP)' : 'Point-to-Multipoint (PTMP)'}
      </div>

      <div className="relative w-full max-w-2xl h-[300px] mt-8">
        {/* Draw lines */}
        {type === 'ptp' && (
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            <motion.line 
              x1="15%" y1="50%" x2="85%" y2="50%" 
              stroke="#aa3bff" strokeWidth="4" strokeDasharray="10,10"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </svg>
        )}
        {type === 'ptmp' && (
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            <motion.line x1="25%" y1="50%" x2="75%" y2="20%" stroke="#3b82f6" strokeWidth="3" strokeDasharray="8,8" animate={{ strokeDashoffset: [0, -16] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
            <motion.line x1="25%" y1="50%" x2="75%" y2="50%" stroke="#3b82f6" strokeWidth="3" strokeDasharray="8,8" animate={{ strokeDashoffset: [0, -16] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
            <motion.line x1="25%" y1="50%" x2="75%" y2="80%" stroke="#3b82f6" strokeWidth="3" strokeDasharray="8,8" animate={{ strokeDashoffset: [0, -16] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
          </svg>
        )}

        {/* Draw nodes */}
        {nodes.map((node) => {
          const Icon = node.icon;
          const isActive = activeNode === node.id;
          return (
            <div
              key={node.id}
              onClick={() => setActiveNode(isActive ? null : node.id)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={clsx(
                  "p-4 rounded-full flex flex-col items-center justify-center shadow-2xl backdrop-blur-md border",
                  isActive ? "bg-primary-600/20 border-primary-400" : "bg-slate-800/80 border-slate-600 hover:border-slate-400"
                )}
              >
                <Icon size={32} className={isActive ? "text-primary-400" : "text-slate-300"} />
              </motion.div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-semibold text-center text-slate-300">
                {node.label}
              </div>

              {/* Info Card Popover */}
              {isActive && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-48 bg-white text-slate-800 p-4 rounded-xl shadow-xl z-20 border border-slate-200"
                >
                  <p className="text-xs">{node.description}</p>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
