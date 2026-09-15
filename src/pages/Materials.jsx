import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { materials } from '../data/materials';
import { useProgress } from '../hooks/useProgress';
import Timeline from '../components/Timeline';
import InteractiveCard from '../components/InteractiveCard';
import TopologyDiagram from '../components/TopologyDiagram';
import ProgressBar from '../components/ProgressBar';
import LinkSimulator from '../components/LinkSimulator';
import SecurityScenario from '../components/SecurityScenario';
import AntennaPattern3D from '../components/AntennaPattern3D';
import NetworkScene3D from '../components/NetworkScene3D';
import WaveSignal3D from '../components/WaveSignal3D';
import {
  CheckCircle2, ChevronRight, ChevronLeft, Menu, Info,
  Lock, Unlock, X, Eye, Signal, Zap, TrendingUp, Layers,
  Cloud, Circle, Radio, BookOpen, History, RadioTower,
  Waypoints, Router, ShieldAlert, BarChart3, Scale, Shield, AlertTriangle
} from 'lucide-react';
import clsx from 'clsx';
import Modal from '../components/Modal';
import ChapterExercise from '../components/ChapterExercise';

const iconMap = { Eye, Signal, Zap, TrendingUp, Layers, Cloud, Circle, Radio };

const chapterMeta = {
  timeline:             { icon: History,     iconBg: 'bg-slate-600' },
  'cards-antenna':      { icon: RadioTower,  iconBg: 'bg-primary-600' },
  diagram:              { icon: Waypoints,   iconBg: 'bg-primary-600' },
  factors:              { icon: Signal,      iconBg: 'bg-primary-600' },
  equipment:            { icon: Router,      iconBg: 'bg-primary-600' },
  security:             { icon: ShieldAlert, iconBg: 'bg-slate-700' },
  'tech-comparison':    { icon: BarChart3,   iconBg: 'bg-primary-600' },
  'pros-cons-extended': { icon: Scale,       iconBg: 'bg-primary-600' },
};

const protocolLevel = {
  broken: { bar: 'w-1/4 bg-red-400',   badge: 'bg-red-50 text-red-600 border border-red-200',   label: 'Tidak Aman', lockIcon: Lock },
  weak:   { bar: 'w-2/4 bg-amber-400', badge: 'bg-amber-50 text-amber-700 border border-amber-200', label: 'Lemah',     lockIcon: Lock },
  good:   { bar: 'w-3/4 bg-blue-400',  badge: 'bg-blue-50 text-blue-700 border border-blue-200',   label: 'Aman',      lockIcon: Unlock },
  best:   { bar: 'w-full bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200', label: 'Sangat Aman', lockIcon: Unlock },
};

const severityBadge = {
  high:   'bg-red-50 text-red-600 border border-red-200',
  medium: 'bg-amber-50 text-amber-700 border border-amber-200',
  low:    'bg-green-50 text-green-700 border border-green-200',
};

// ── Image with graceful fallback ──────────────────────────────
function ImageWithFallback({ src, alt, className }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div className={clsx('bg-slate-100 flex items-center justify-center', className)}>
        <svg className="text-slate-300 w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setErr(true)} />;
}

export default function Materials() {
  const { completedMaterials, markAsComplete, isCompleted, lastVisitedChapter, setLastVisitedChapter } = useProgress();
  const [activeChapterId, setActiveChapterId] = useState(lastVisitedChapter);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedFactor, setExpandedFactor] = useState(null);
  const [expandedProCon, setExpandedProCon] = useState({ type: null, idx: null });
  const [exercisePassed, setExercisePassed] = useState({});

  const activeIndex = materials.findIndex(m => m.id === activeChapterId);
  const chapter = materials[activeIndex];

  useEffect(() => {
    setLastVisitedChapter(activeChapterId);
    window.scrollTo(0, 0);
    setExpandedFactor(null);
    setExpandedProCon({ type: null, idx: null });
  }, [activeChapterId, setLastVisitedChapter]);

  const handleExercisePassed = (chapterId) => {
    setExercisePassed(prev => ({ ...prev, [chapterId]: true }));
  };

  const canComplete = (chapterId) => {
    if (!chapter?.exercise?.length) return true;
    return exercisePassed[chapterId] || isCompleted(chapterId);
  };

  const handleNext = () => { if (activeIndex < materials.length - 1) setActiveChapterId(materials[activeIndex + 1].id); };
  const handlePrev = () => { if (activeIndex > 0) setActiveChapterId(materials[activeIndex - 1].id); };

  // ── CHAPTER 02: ANTENNA CARDS ─────────────────────────────────
  const renderAntennaCards = () => (
    <div className="space-y-8 mt-6">
      {chapter.intro && (
        <div className="flex gap-3 p-5 bg-primary-50 border border-primary-100 rounded-2xl">
          <Info size={18} className="text-primary-500 shrink-0 mt-0.5" />
          <p className="text-slate-700 text-sm leading-relaxed">{chapter.intro}</p>
        </div>
      )}

      {/* 3D Visualizer */}
      <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-primary-500 rounded-full" />
          <h3 className="text-white font-semibold">Visualisasi 3D Pola Pancaran Antena</h3>
          <span className="text-slate-500 text-xs ml-auto">Interaktif</span>
        </div>
        <AntennaPattern3D defaultType="omni" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chapter.content.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: idx * 0.07 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer bg-white border border-slate-200 hover:border-primary-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex">
              {/* Image */}
              <div className="w-32 shrink-0 relative overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover min-h-[120px] transition-transform duration-400 group-hover:scale-105"
                />
                {item.badge && (
                  <span className="absolute top-2 left-2 text-xs font-semibold bg-white/90 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                    {item.badge}
                  </span>
                )}
              </div>
              {/* Text */}
              <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1.5 text-sm">{item.name}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">{item.description}</p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-primary-600 text-xs font-semibold">
                  Detail <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // ── CHAPTER 03: DIAGRAM ───────────────────────────────────────
  const renderDiagram = () => (
    <div className="space-y-12 mt-6">
      {chapter.intro && (
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
          <p className="text-slate-600 text-sm leading-relaxed">{chapter.intro}</p>
        </div>
      )}

      {/* 3D Network */}
      <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-primary-500 rounded-full" />
          <h3 className="text-white font-semibold">Topologi Jaringan 3D Interaktif</h3>
          <span className="text-slate-500 text-xs ml-auto">Drag · Klik node</span>
        </div>
        <NetworkScene3D height="420px" />
      </div>

      {/* PTP */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 bg-primary-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shrink-0">A</span>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Point-to-Point (PTP)</h3>
            <p className="text-slate-500 text-sm">{chapter.content.ptp.description}</p>
          </div>
        </div>
        <TopologyDiagram type="ptp" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5">
            <h4 className="font-semibold text-slate-900 mb-3 text-sm">Keunggulan PTP</h4>
            <ul className="space-y-2">
              {chapter.content.ptp.advantages.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                  <CheckCircle2 size={14} className="text-primary-500 shrink-0 mt-0.5" />{a}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h4 className="font-semibold text-slate-900 mb-3 text-sm">Kasus Penggunaan</h4>
            <ul className="space-y-2">
              {chapter.content.ptp.usecases.map((u, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                  <ChevronRight size={12} className="text-slate-400 shrink-0 mt-1" />{u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-dashed border-slate-200" />

      {/* PTMP */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 bg-slate-700 text-white rounded-xl flex items-center justify-center font-bold text-sm shrink-0">B</span>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Point-to-Multipoint (PTMP)</h3>
            <p className="text-slate-500 text-sm">{chapter.content.ptmp.description}</p>
          </div>
        </div>
        <TopologyDiagram type="ptmp" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h4 className="font-semibold text-slate-900 mb-3 text-sm">Keunggulan PTMP</h4>
            <ul className="space-y-2">
              {chapter.content.ptmp.advantages.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                  <CheckCircle2 size={14} className="text-slate-500 shrink-0 mt-0.5" />{a}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h4 className="font-semibold text-slate-900 mb-3 text-sm">Kasus Penggunaan</h4>
            <ul className="space-y-2">
              {chapter.content.ptmp.usecases.map((u, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                  <ChevronRight size={12} className="text-slate-400 shrink-0 mt-1" />{u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // ── CHAPTER 04: FACTORS ───────────────────────────────────────
  const renderFactors = () => (
    <div className="space-y-5 mt-6">
      {chapter.intro && (
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
          <p className="text-slate-600 text-sm leading-relaxed">{chapter.intro}</p>
        </div>
      )}

      <div className="space-y-2">
        {chapter.content.map((item, idx) => {
          const IconComponent = iconMap[item.icon] || Info;
          const isExpanded = expandedFactor === idx;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedFactor(isExpanded ? null : idx)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="w-9 h-9 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                  <IconComponent size={16} className="text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm">{item.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5 truncate">{item.summary}</p>
                </div>
                <ChevronRight
                  size={16}
                  className={`text-slate-400 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                />
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-3 border-t border-slate-100 pt-4">
                      <p className="text-slate-700 text-sm leading-relaxed">{item.description}</p>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                        <p className="text-slate-600 text-sm leading-relaxed">{item.detail}</p>
                      </div>
                      {item.tips && (
                        <div className="flex gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
                          <Info size={15} className="text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-amber-700 mb-1">Tips Praktis</p>
                            <p className="text-amber-800 text-sm leading-relaxed">{item.tips}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* 3D Wave */}
      <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-primary-500 rounded-full" />
          <h3 className="text-white font-semibold">Simulasi 3D Propagasi Sinyal</h3>
        </div>
        <WaveSignal3D height="340px" />
      </div>

      <LinkSimulator />
    </div>
  );

  // ── CHAPTER 05: EQUIPMENT ─────────────────────────────────────
  const renderEquipment = () => (
    <div className="space-y-6 mt-6">
      {chapter.intro && (
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
          <p className="text-slate-600 text-sm leading-relaxed">{chapter.intro}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {chapter.content.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer bg-white border border-slate-200 hover:border-primary-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden bg-slate-100">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
              />
              {item.badge && (
                <span className="absolute top-3 right-3 text-xs font-semibold bg-white/95 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 shadow-sm">
                  {item.badge}
                </span>
              )}
            </div>
            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-1.5">{item.category}</span>
              <h4 className="font-semibold text-slate-900 mb-2 leading-snug">{item.name}</h4>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1">{item.description}</p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1 text-primary-600 text-sm font-semibold">
                Lihat Spesifikasi <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // ── CHAPTER 06: SECURITY ──────────────────────────────────────
  const renderSecurity = () => (
    <div className="space-y-10 mt-6">
      {chapter.intro && (
        <div className="flex gap-3 p-5 bg-red-50 border border-red-100 rounded-2xl">
          <Info size={18} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-slate-700 text-sm leading-relaxed">{chapter.intro}</p>
        </div>
      )}

      {/* Protokol */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Evolusi Protokol Keamanan Wi-Fi</h3>
        <div className="space-y-3">
          {chapter.protocols.map((p, idx) => {
            const c = protocolLevel[p.status];
            const LockIcon = c.lockIcon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white border border-slate-200 rounded-2xl p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <LockIcon size={16} className="text-slate-400 shrink-0" />
                    <h4 className="font-semibold text-slate-900">{p.name}</h4>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${c.badge}`}>{c.label}</span>
                </div>
                {/* Strength bar */}
                <div className="h-1.5 w-full bg-slate-100 rounded-full mb-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.level * 25}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className={`h-full rounded-full ${c.bar.split(' ')[1]}`}
                  />
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{p.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Ancaman */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Ancaman Keamanan Nirkabel</h3>
        <div className="space-y-3">
          {chapter.threats.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedItem({ ...t, isSecurityThreat: true })}
              className="cursor-pointer bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-slate-400 shrink-0 mt-2" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3 mb-1.5 flex-wrap">
                    <h4 className="font-semibold text-slate-900 text-sm">{t.name}</h4>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${severityBadge[t.severity]}`}>
                      {t.severity === 'high' ? 'Risiko Tinggi' : t.severity === 'medium' ? 'Risiko Sedang' : 'Risiko Rendah'}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{t.description}</p>
                  <div className="mt-2 flex items-center gap-1 text-primary-600 text-xs font-semibold">
                    Lihat Detail <ChevronRight size={11} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-3">Uji Pemahaman Anda</h3>
        <SecurityScenario scenario={chapter.scenario} />
      </section>
    </div>
  );

  // ── CHAPTER 07: TECH COMPARISON ───────────────────────────────
  const renderTechComparison = () => {
    const categories = [...new Set(chapter.content.map(t => t.category))];
    return (
      <div className="space-y-10 mt-6">
        {chapter.intro && (
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
            <p className="text-slate-600 text-sm leading-relaxed">{chapter.intro}</p>
          </div>
        )}
        {categories.map(cat => (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary-500" />
              <h3 className="text-base font-bold text-slate-800">{cat}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapter.content.filter(t => t.category === cat).map((tech, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedItem({ ...tech, isTech: true })}
                  className="group cursor-pointer bg-white border border-slate-200 hover:border-primary-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <div className="h-1 bg-primary-500 w-full" />
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-slate-900">{tech.name}</h4>
                        <p className="text-xs text-slate-400">Sejak {tech.year}</p>
                      </div>
                      <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full shrink-0">{tech.category}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {[
                        { label: 'Frekuensi', value: tech.freq },
                        { label: 'Kecepatan', value: tech.speed },
                        { label: 'Jangkauan', value: tech.range },
                      ].map(s => (
                        <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-xl p-2">
                          <p className="text-xs text-slate-400 mb-0.5">{s.label}</p>
                          <p className="text-xs font-semibold text-slate-700 leading-tight">{s.value}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{tech.usecase}</p>
                    <div className="flex items-center gap-1 text-primary-600 text-xs font-semibold">
                      Detail <ChevronRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Table */}
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-4">Tabel Perbandingan</h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3 font-semibold">Teknologi</th>
                  <th className="px-4 py-3 font-semibold">Kecepatan</th>
                  <th className="px-4 py-3 font-semibold">Jangkauan</th>
                  <th className="px-4 py-3 font-semibold">Daya</th>
                  <th className="px-4 py-3 font-semibold">Kategori</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {chapter.content.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-900 text-sm">{t.name}</td>
                    <td className="px-4 py-3 text-slate-600 text-sm">{t.speed}</td>
                    <td className="px-4 py-3 text-slate-600 text-sm">{t.range}</td>
                    <td className="px-4 py-3 text-slate-600 text-sm">{t.power}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t.category}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ── CHAPTER 08: PROS-CONS ─────────────────────────────────────
  const renderProsConsExtended = () => (
    <div className="space-y-10 mt-6">
      {chapter.intro && (
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
          <p className="text-slate-600 text-sm leading-relaxed">{chapter.intro}</p>
        </div>
      )}

      {/* Kelebihan */}
      <section>
        <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
          <CheckCircle2 size={20} className="text-emerald-500" /> Kelebihan
        </h3>
        <div className="space-y-2">
          {chapter.content.pros.map((item, idx) => {
            const isOpen = expandedProCon.type === 'pro' && expandedProCon.idx === idx;
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedProCon(isOpen ? { type: null, idx: null } : { type: 'pro', idx })}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-emerald-300 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-sm">{item.title}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{item.description}</p>
                  </div>
                  <ChevronRight size={15} className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 pt-1 bg-emerald-50/50 border-t border-slate-100">
                        <p className="text-slate-700 text-sm leading-relaxed">{item.detail}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Kekurangan */}
      <section>
        <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
          <X size={20} className="text-red-400" /> Kekurangan
        </h3>
        <div className="space-y-2">
          {chapter.content.cons.map((item, idx) => {
            const isOpen = expandedProCon.type === 'con' && expandedProCon.idx === idx;
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedProCon(isOpen ? { type: null, idx: null } : { type: 'con', idx })}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-red-200 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-sm">{item.title}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{item.description}</p>
                  </div>
                  <ChevronRight size={15} className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 pt-1 bg-red-50/40 border-t border-slate-100">
                        <p className="text-slate-700 text-sm leading-relaxed">{item.detail}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tantangan */}
      <section>
        <h3 className="font-bold text-slate-900 text-lg mb-4">Tantangan &amp; Solusi</h3>
        <div className="space-y-3">
          {chapter.content.challenges.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-200 border-l-4 border-l-primary-400 rounded-2xl p-5"
            >
              <h4 className="font-semibold text-slate-900 mb-2 text-sm">{item.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-3">{item.description}</p>
              <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
                <p className="text-xs font-semibold text-primary-700 mb-1">Solusi / Pendekatan</p>
                <p className="text-slate-700 text-sm leading-relaxed">{item.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );

  // ── MAIN DISPATCH ─────────────────────────────────────────────
  const renderContent = () => {
    switch (chapter.type) {
      case 'timeline':           return <Timeline data={chapter.content} intro={chapter.intro} />;
      case 'cards-antenna':      return renderAntennaCards();
      case 'diagram':            return renderDiagram();
      case 'factors':            return renderFactors();
      case 'equipment':          return renderEquipment();
      case 'security':           return renderSecurity();
      case 'tech-comparison':    return renderTechComparison();
      case 'pros-cons-extended': return renderProsConsExtended();
      default: return (
        <div className="space-y-4 mt-6">
          {Array.isArray(chapter.content) && chapter.content.map((item, idx) => (
            <InteractiveCard key={idx} delay={idx * 0.1} className="p-6">
              <h4 className="font-semibold text-primary-700 mb-2">{item.name}</h4>
              <p className="text-slate-600 text-sm">{item.description}</p>
            </InteractiveCard>
          ))}
        </div>
      );
    }
  };

  // ── MODAL CONTENT ─────────────────────────────────────────────
  const renderModalContent = () => {
    if (!selectedItem) return null;

    if (selectedItem.isSecurityThreat) {
      return (
        <div className="space-y-4">
          <span className={`inline-flex text-xs font-semibold px-3 py-1 rounded-full ${severityBadge[selectedItem.severity]}`}>
            {selectedItem.severity === 'high' ? 'Risiko Tinggi' : 'Risiko Sedang'}
          </span>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Cara Kerja Serangan</p>
            <p className="text-slate-600 text-sm leading-relaxed">{selectedItem.howItWorks}</p>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed">{selectedItem.description}</p>
          <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
            <p className="font-semibold text-primary-800 text-sm mb-1">Cara Pencegahan</p>
            <p className="text-slate-700 text-sm leading-relaxed">{selectedItem.prevention}</p>
          </div>
        </div>
      );
    }

    if (selectedItem.isTech) {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Frekuensi', value: selectedItem.freq },
              { label: 'Kecepatan', value: selectedItem.speed },
              { label: 'Jangkauan', value: selectedItem.range },
              { label: 'Daya', value: selectedItem.power },
            ].map(s => (
              <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-400 mb-1">{s.label}</p>
                <p className="text-sm font-semibold text-slate-800">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Fitur Utama</p>
            <p className="text-slate-600 text-sm leading-relaxed">{selectedItem.features}</p>
          </div>
          <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
            <p className="font-semibold text-primary-800 text-sm mb-1">Kelebihan</p>
            <p className="text-slate-700 text-sm leading-relaxed">{selectedItem.pros}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm mb-1">Kekurangan</p>
            <p className="text-slate-600 text-sm leading-relaxed">{selectedItem.cons}</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Kasus Penggunaan</p>
            <p className="text-slate-600 text-sm leading-relaxed">{selectedItem.usecase}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {selectedItem.image && (
          <div className="h-48 rounded-xl overflow-hidden bg-slate-100">
            <ImageWithFallback src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
          </div>
        )}
        {selectedItem.category && (
          <span className="inline-block text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-100 px-3 py-1 rounded-full">{selectedItem.category}</span>
        )}
        <p className="text-slate-700 text-sm leading-relaxed">{selectedItem.detail || selectedItem.description}</p>
        {selectedItem.characteristics && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-2">Karakteristik Teknis</p>
            <ul className="space-y-1.5">
              {selectedItem.characteristics.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                  <ChevronRight size={13} className="text-slate-400 shrink-0 mt-0.5" />{c}
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedItem.radiationPattern && (
          <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
            <p className="font-semibold text-primary-800 text-sm mb-1">Pola Pancaran</p>
            <p className="text-slate-700 text-sm leading-relaxed">{selectedItem.radiationPattern}</p>
          </div>
        )}
        {selectedItem.usage && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Contoh Penggunaan</p>
            <p className="text-slate-600 text-sm leading-relaxed">{selectedItem.usage}</p>
          </div>
        )}
        {selectedItem.example && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="font-semibold text-amber-900 text-sm mb-1">Contoh Nyata</p>
            <p className="text-amber-800 text-sm leading-relaxed">{selectedItem.example}</p>
          </div>
        )}
        {selectedItem.features && Array.isArray(selectedItem.features) && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-2">Fitur Utama</p>
            <ul className="space-y-1.5">
              {selectedItem.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                  <CheckCircle2 size={13} className="text-primary-500 shrink-0 mt-0.5" />{f}
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedItem.examples && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <p className="font-semibold text-slate-800 text-sm mb-2">Contoh Produk</p>
            <div className="flex flex-wrap gap-2">
              {selectedItem.examples.map((e, i) => (
                <span key={i} className="bg-white text-slate-700 text-xs px-3 py-1 rounded-full border border-slate-200 font-medium">{e}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── MAIN LAYOUT ───────────────────────────────────────────────
  return (
    <div className="flex flex-col md:flex-row gap-8 relative">
      {/* Mobile toggle */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <span className="font-semibold text-slate-900">Materi Pembelajaran</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-slate-100 rounded-xl">
          <Menu size={18} />
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 768) && (
          <motion.div
            initial={{ opacity: 0, x: -16, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, x: -16, height: 0 }}
            className={clsx('md:w-64 shrink-0', isSidebarOpen ? 'block' : 'hidden md:block')}
          >
            <div className="sticky top-24 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="mb-5 pb-5 border-b border-slate-100">
                <ProgressBar current={completedMaterials.length} total={materials.length} />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Daftar Chapter</p>
              <nav className="space-y-1">
                {materials.map((m) => {
                  const isActive = m.id === activeChapterId;
                  const isDone = isCompleted(m.id);
                  const meta = chapterMeta[m.type] || { icon: BookOpen, iconBg: 'bg-slate-600' };
                  const MIcon = meta.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => { setActiveChapterId(m.id); setIsSidebarOpen(false); }}
                      className={clsx(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all text-sm',
                        isActive
                          ? 'bg-primary-600 text-white font-semibold shadow-sm'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      )}
                    >
                      <span className={clsx('w-7 h-7 rounded-lg flex items-center justify-center shrink-0', isActive ? 'bg-white/20' : meta.iconBg)}>
                        <MIcon size={13} className="text-white" />
                      </span>
                      <span className="truncate flex-1">{m.title}</span>
                      {isDone && <CheckCircle2 size={14} className={isActive ? 'text-primary-200 shrink-0' : 'text-emerald-500 shrink-0'} />}
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <motion.div
          key={activeChapterId}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="pb-20"
        >
          {/* Chapter Header — Clean White Card */}
          {(() => {
            const meta = chapterMeta[chapter.type] || { icon: BookOpen, iconBg: 'bg-slate-600' };
            const ChapterIcon = meta.icon;
            return (
              <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm mb-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', meta.iconBg)}>
                    <ChapterIcon size={18} className="text-white" />
                  </div>
                  <span className="text-slate-400 text-sm">Chapter {chapter.id} <span className="text-slate-300">·</span> {materials.length} Total</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-tight">{chapter.title}</h1>
                <p className="text-slate-500 leading-relaxed max-w-2xl">{chapter.description}</p>

                {/* Progress bar track */}
                <div className="mt-5 flex items-center gap-1.5">
                  {materials.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveChapterId(m.id)}
                      title={m.title}
                      className={clsx(
                        'h-1 rounded-full transition-all duration-200',
                        m.id === activeChapterId ? 'bg-primary-500 w-6'
                          : isCompleted(m.id) ? 'bg-primary-200 w-3'
                          : 'bg-slate-200 w-3 hover:bg-slate-300'
                      )}
                    />
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Content */}
          {renderContent()}

          {/* Chapter Exercise — gating completion */}
          {chapter.exercise && (
            <div className="mt-10 border-t border-slate-100 pt-8">
              <ChapterExercise
                questions={chapter.exercise}
                alreadyPassed={isCompleted(chapter.id) || !!exercisePassed[chapter.id]}
                onPassed={() => handleExercisePassed(chapter.id)}
              />
            </div>
          )}

          {/* Bottom Nav */}
          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors w-full sm:w-auto justify-center"
            >
              <ChevronLeft size={18} /> Sebelumnya
            </button>

            <button
              onClick={() => markAsComplete(chapter.id)}
              disabled={!canComplete(chapter.id)}
              title={!canComplete(chapter.id) ? 'Selesaikan latihan soal terlebih dahulu' : ''}
              className={clsx(
                'flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all w-full sm:w-auto justify-center border',
                isCompleted(chapter.id)
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : canComplete(chapter.id)
                    ? 'bg-primary-600 text-white border-primary-600 hover:bg-primary-700 shadow-sm'
                    : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
              )}
            >
              <CheckCircle2 size={16} />
              {isCompleted(chapter.id) ? 'Selesai Dipelajari' : 'Tandai Selesai'}
            </button>

            <button
              onClick={handleNext}
              disabled={activeIndex === materials.length - 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors w-full sm:w-auto justify-center"
            >
              Selanjutnya <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.name || selectedItem?.threat}>
        {renderModalContent()}
      </Modal>
    </div>
  );
}