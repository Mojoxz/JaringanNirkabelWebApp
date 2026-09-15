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
import { CheckCircle2, ChevronRight, ChevronLeft, Menu, Info, Lock, Unlock, X, Eye, Signal, Zap, TrendingUp, Layers, Cloud, Circle, Radio, BookOpen, History, RadioTower, Waypoints, Router, ShieldAlert, BarChart3, Scale } from 'lucide-react';
import clsx from 'clsx';
import Modal from '../components/Modal';

// ─────────────────────────────────────────────────────────────
// Icon Map for factors chapter
// ─────────────────────────────────────────────────────────────
const iconMap = { Eye, Signal, Zap, TrendingUp, Layers, Cloud, Circle, Radio };

// ─────────────────────────────────────────────────────────────
// BADGE COLOR HELPER
// ─────────────────────────────────────────────────────────────
const badgeColors = {
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  orange: 'bg-orange-100 text-orange-700',
  red: 'bg-red-100 text-red-700',
  slate: 'bg-slate-100 text-slate-700',
  green: 'bg-green-100 text-green-700',
  cyan: 'bg-cyan-100 text-cyan-700',
  pink: 'bg-pink-100 text-pink-700',
  indigo: 'bg-indigo-100 text-indigo-700',
};

const techCategoryColors = {
  WiFi: 'bg-primary-100 text-primary-700',
  'Short Range': 'bg-purple-100 text-purple-700',
  IoT: 'bg-orange-100 text-orange-700',
  LPWAN: 'bg-green-100 text-green-700',
};

const severityColors = {
  high: { bg: 'bg-red-50 border-red-200', badge: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
  medium: { bg: 'bg-orange-50 border-orange-200', badge: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
  low: { bg: 'bg-yellow-50 border-yellow-200', badge: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
};

const protocolColors = {
  broken: { bg: 'bg-red-100', label: 'text-red-800', bar: 'bg-red-400', badge: 'bg-red-200 text-red-900' },
  weak: { bg: 'bg-orange-100', label: 'text-orange-800', bar: 'bg-orange-400', badge: 'bg-orange-200 text-orange-900' },
  good: { bg: 'bg-blue-100', label: 'text-blue-800', bar: 'bg-blue-400', badge: 'bg-blue-200 text-blue-900' },
  best: { bg: 'bg-green-100', label: 'text-green-800', bar: 'bg-green-500', badge: 'bg-green-200 text-green-900' },
};

const protocolStatusLabel = { broken: 'Tidak Aman', weak: 'Lemah', good: 'Aman', best: 'Sangat Aman' };

// ─────────────────────────────────────────────────────────────
// PER-CHAPTER VISUAL IDENTITY
// ─────────────────────────────────────────────────────────────
const chapterMeta = {
  timeline: { icon: History, iconBg: 'bg-slate-800', accent: 'bg-slate-800' },
  'cards-antenna': { icon: RadioTower, iconBg: 'bg-blue-600', accent: 'bg-blue-600' },
  diagram: { icon: Waypoints, iconBg: 'bg-indigo-600', accent: 'bg-indigo-600' },
  factors: { icon: Signal, iconBg: 'bg-amber-500', accent: 'bg-amber-500' },
  equipment: { icon: Router, iconBg: 'bg-primary-600', accent: 'bg-primary-600' },
  security: { icon: ShieldAlert, iconBg: 'bg-red-600', accent: 'bg-red-600' },
  'tech-comparison': { icon: BarChart3, iconBg: 'bg-cyan-600', accent: 'bg-cyan-600' },
  'pros-cons-extended': { icon: Scale, iconBg: 'bg-emerald-600', accent: 'bg-emerald-600' },
};

export default function Materials() {
  const { completedMaterials, markAsComplete, isCompleted, lastVisitedChapter, setLastVisitedChapter } = useProgress();

  const [activeChapterId, setActiveChapterId] = useState(lastVisitedChapter);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedFactor, setExpandedFactor] = useState(null);
  const [expandedProCon, setExpandedProCon] = useState({ type: null, idx: null });

  const activeIndex = materials.findIndex(m => m.id === activeChapterId);
  const chapter = materials[activeIndex];

  useEffect(() => {
    setLastVisitedChapter(activeChapterId);
    window.scrollTo(0, 0);
    setExpandedFactor(null);
    setExpandedProCon({ type: null, idx: null });
  }, [activeChapterId, setLastVisitedChapter]);

  const handleNext = () => {
    if (activeIndex < materials.length - 1) setActiveChapterId(materials[activeIndex + 1].id);
  };
  const handlePrev = () => {
    if (activeIndex > 0) setActiveChapterId(materials[activeIndex - 1].id);
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER CHAPTER 02: CARDS-ANTENNA
  // ─────────────────────────────────────────────────────────────
  const renderAntennaCards = () => (
    <div className="space-y-8 mt-8">
      {chapter.intro && (
        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-primary-600 shrink-0 mt-0.5" />
            <p className="text-primary-900 leading-relaxed">{chapter.intro}</p>
          </div>
        </div>
      )}

      {/* ── 3D Antenna Radiation Pattern ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 border border-slate-700 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-2 h-8 rounded-full bg-gradient-to-b from-blue-400 to-violet-500" />
          <div>
            <h3 className="text-white font-bold text-lg">Visualisasi 3D Pola Pancaran Antena</h3>
            <p className="text-slate-400 text-sm">Interaktif — pilih jenis antena untuk melihat pola radiasi berbeda</p>
          </div>
        </div>
        <AntennaPattern3D defaultType="omni" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chapter.content.map((item, idx) => (
          <InteractiveCard key={idx} delay={idx * 0.08} onClick={() => setSelectedItem(item)} className="overflow-hidden">
            <div className="flex">
              <div className="w-1/3 shrink-0 relative">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover min-h-[120px]" />
                {item.badge && (
                  <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full ${badgeColors[item.badgeColor] || 'bg-slate-100 text-slate-700'}`}>
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-base text-slate-900 mb-2">{item.name}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{item.description}</p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-primary-600 text-sm font-semibold">
                  Lihat Detail <ChevronRight size={14} />
                </div>
              </div>
            </div>
          </InteractiveCard>
        ))}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // RENDER CHAPTER 03: DIAGRAM (PTP/PTMP)
  // ─────────────────────────────────────────────────────────────
  const renderDiagram = () => (
    <div className="space-y-16 mt-8">
      {chapter.intro && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <p className="text-slate-700 leading-relaxed">{chapter.intro}</p>
        </div>
      )}

      {/* ── 3D Interactive Network Topology ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 border border-indigo-900/50 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-2 h-8 rounded-full bg-gradient-to-b from-indigo-400 to-cyan-400" />
          <div>
            <h3 className="text-white font-bold text-lg">Topologi Jaringan 3D Interaktif</h3>
            <p className="text-slate-400 text-sm">Klik node untuk melihat detail perangkat · Drag untuk rotasi</p>
          </div>
        </div>
        <NetworkScene3D height="420px" />
      </motion.div>

      {/* PTP Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0">A</span>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Point-to-Point (PTP)</h3>
            <p className="text-slate-600 text-sm">{chapter.content.ptp.description}</p>
          </div>
        </div>
        <TopologyDiagram type="ptp" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-3">Keunggulan PTP</h4>
            <ul className="space-y-2">
              {chapter.content.ptp.advantages.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-blue-800 text-sm">
                  <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-3">Kasus Penggunaan</h4>
            <ul className="space-y-2">
              {chapter.content.ptp.usecases.map((u, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                  <ChevronRight size={14} className="text-slate-400 shrink-0 mt-0.5" />
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* PTMP Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0">B</span>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Point-to-Multipoint (PTMP)</h3>
            <p className="text-slate-600 text-sm">{chapter.content.ptmp.description}</p>
          </div>
        </div>
        <TopologyDiagram type="ptmp" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
            <h4 className="font-bold text-emerald-900 mb-3">Keunggulan PTMP</h4>
            <ul className="space-y-2">
              {chapter.content.ptmp.advantages.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-emerald-800 text-sm">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-3">Kasus Penggunaan</h4>
            <ul className="space-y-2">
              {chapter.content.ptmp.usecases.map((u, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                  <ChevronRight size={14} className="text-slate-400 shrink-0 mt-0.5" />
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // RENDER CHAPTER 04: FACTORS
  // ─────────────────────────────────────────────────────────────
  const renderFactors = () => (
    <div className="space-y-6 mt-8">
      {chapter.intro && (
        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
          <p className="text-primary-900 leading-relaxed">{chapter.intro}</p>
        </div>
      )}
      <div className="space-y-3">
        {chapter.content.map((item, idx) => {
          const IconComponent = iconMap[item.icon] || Info;
          const isExpanded = expandedFactor === idx;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setExpandedFactor(isExpanded ? null : idx)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-slate-50 transition-colors"
              >
                <div className={`p-2.5 rounded-xl bg-${item.color}-100 text-${item.color}-600 shrink-0`}>
                  <IconComponent size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <p className="text-slate-500 text-sm mt-0.5 truncate">{item.summary}</p>
                </div>
                <ChevronRight
                  size={20}
                  className={`text-slate-400 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 space-y-4 border-t border-slate-100 pt-4">
                      <p className="text-slate-700 leading-relaxed">{item.description}</p>
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <p className="text-slate-600 text-sm leading-relaxed">{item.detail}</p>
                      </div>
                      {item.tips && (
                        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex items-start gap-3">
                          <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
                          <p className="text-amber-800 text-sm leading-relaxed">
                            <strong className="block mb-1">Tips Praktis:</strong>
                            {item.tips}
                          </p>
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

      {/* ── 3D Wave Propagation ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 border border-slate-700 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-2 h-8 rounded-full bg-gradient-to-b from-blue-400 to-amber-400" />
          <div>
            <h3 className="text-white font-bold text-lg">Simulasi 3D Propagasi Sinyal</h3>
            <p className="text-slate-400 text-sm">Pilih skenario untuk melihat fenomena propagasi gelombang nirkabel</p>
          </div>
        </div>
        <WaveSignal3D height="340px" />
      </motion.div>

      {/* Link Simulator */}
      <LinkSimulator />
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // RENDER CHAPTER 05: EQUIPMENT
  // ─────────────────────────────────────────────────────────────
  const renderEquipment = () => (
    <div className="space-y-6 mt-8">
      {chapter.intro && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <p className="text-slate-700 leading-relaxed">{chapter.intro}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {chapter.content.map((item, idx) => (
          <InteractiveCard key={idx} delay={idx * 0.07} onClick={() => setSelectedItem(item)} className="overflow-hidden flex flex-col">
            <div className="relative">
              <img src={item.image} alt={item.name} className="w-full h-44 object-cover" />
              {item.badge && (
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {item.badge}
                </span>
              )}
            </div>
            <div className="p-5 flex flex-col flex-1">
              <span className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2 block">{item.category}</span>
              <h4 className="font-bold text-lg text-slate-900 mb-2">{item.name}</h4>
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 flex-1">{item.description}</p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1 text-primary-600 text-sm font-semibold">
                Lihat Spesifikasi <ChevronRight size={14} />
              </div>
            </div>
          </InteractiveCard>
        ))}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // RENDER CHAPTER 06: SECURITY
  // ─────────────────────────────────────────────────────────────
  const renderSecurity = () => (
    <div className="space-y-10 mt-8">
      {chapter.intro && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-red-600 shrink-0 mt-0.5" />
            <p className="text-red-900 leading-relaxed">{chapter.intro}</p>
          </div>
        </div>
      )}

      {/* Protokol Keamanan */}
      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-5">Evolusi Protokol Keamanan Wi-Fi</h3>
        <div className="space-y-4">
          {chapter.protocols.map((p, idx) => {
            const c = protocolColors[p.status];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-2xl p-5 ${c.bg}`}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div className="flex items-center gap-3">
                    {p.status === 'broken' || p.status === 'weak' ? <Lock size={20} className={c.label} /> : <Unlock size={20} className={c.label} />}
                    <h4 className={`font-bold text-lg ${c.label}`}>{p.name}</h4>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${c.badge}`}>
                    {protocolStatusLabel[p.status]}
                  </span>
                </div>
                {/* Strength Bar */}
                <div className="h-2 w-full bg-white/50 rounded-full mb-3 overflow-hidden">
                  <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${p.level * 25}%` }} />
                </div>
                <p className={`text-sm leading-relaxed ${c.label} opacity-90`}>{p.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Ancaman Keamanan */}
      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-5">Ancaman Keamanan Nirkabel</h3>
        <div className="space-y-4">
          {chapter.threats.map((t, idx) => {
            const sc = severityColors[t.severity];
            return (
              <InteractiveCard key={idx} delay={idx * 0.08} onClick={() => setSelectedItem({ ...t, isSecurityThreat: true })} className={`p-5 border ${sc.bg}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-3 h-3 rounded-full ${sc.dot} shrink-0 mt-1.5`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                      <h4 className="font-bold text-slate-900">{t.name}</h4>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${sc.badge}`}>
                        {t.severity === 'high' ? 'Risiko Tinggi' : t.severity === 'medium' ? 'Risiko Sedang' : 'Risiko Rendah'}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{t.description}</p>
                    <div className="mt-2 flex items-center gap-1 text-primary-600 text-xs font-semibold">
                      Lihat Detail <ChevronRight size={12} />
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            );
          })}
        </div>
      </section>

      {/* Skenario Interaktif */}
      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Uji Pemahaman Anda</h3>
        <SecurityScenario scenario={chapter.scenario} />
      </section>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // RENDER CHAPTER 07: TECH COMPARISON
  // ─────────────────────────────────────────────────────────────
  const renderTechComparison = () => {
    const categories = [...new Set(chapter.content.map(t => t.category))];
    return (
      <div className="space-y-10 mt-8">
        {chapter.intro && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <p className="text-slate-700 leading-relaxed">{chapter.intro}</p>
          </div>
        )}

        {categories.map(cat => (
          <div key={cat}>
            <div className="flex items-center gap-3 mb-5">
              <BookOpen size={20} className="text-slate-500" />
              <h3 className="text-xl font-bold text-slate-800">{cat}</h3>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${techCategoryColors[cat] || 'bg-slate-100 text-slate-700'}`}>{cat}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {chapter.content.filter(t => t.category === cat).map((tech, idx) => (
                <InteractiveCard key={idx} delay={idx * 0.08} onClick={() => setSelectedItem({ ...tech, isTech: true })} className="p-0 overflow-hidden">
                  <div className={`h-1.5 w-full bg-${tech.color}-500`} />
                  <div className="p-5 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-lg text-slate-900">{tech.name}</h4>
                        <p className="text-xs text-slate-500">Sejak {tech.year}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${techCategoryColors[tech.category] || ''}`}>{tech.category}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[
                        { label: "Frekuensi", value: tech.freq },
                        { label: "Kecepatan", value: tech.speed },
                        { label: "Jangkauan", value: tech.range },
                      ].map(s => (
                        <div key={s.label} className="bg-slate-50 rounded-xl p-2">
                          <div className="text-xs text-slate-500 mb-0.5">{s.label}</div>
                          <div className="text-xs font-bold text-slate-800 leading-tight">{s.value}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{tech.usecase}</p>
                  </div>
                </InteractiveCard>
              ))}
            </div>
          </div>
        ))}

        {/* Comparison Table */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Tabel Perbandingan</h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="p-4 font-semibold">Teknologi</th>
                  <th className="p-4 font-semibold">Kecepatan</th>
                  <th className="p-4 font-semibold">Jangkauan</th>
                  <th className="p-4 font-semibold">Konsumsi Daya</th>
                  <th className="p-4 font-semibold">Kategori</th>
                </tr>
              </thead>
              <tbody>
                {chapter.content.map((t, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-semibold text-slate-900">{t.name}</td>
                    <td className="p-4 text-slate-600 text-sm">{t.speed}</td>
                    <td className="p-4 text-slate-600 text-sm">{t.range}</td>
                    <td className="p-4 text-slate-600 text-sm">{t.power}</td>
                    <td className="p-4"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${techCategoryColors[t.category] || 'bg-slate-100 text-slate-700'}`}>{t.category}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER CHAPTER 08: PROS-CONS-EXTENDED
  // ─────────────────────────────────────────────────────────────
  const renderProsConsExtended = () => (
    <div className="space-y-10 mt-8">
      {chapter.intro && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <p className="text-slate-700 leading-relaxed">{chapter.intro}</p>
        </div>
      )}

      {/* Kelebihan */}
      <section>
        <h3 className="text-2xl font-bold text-green-700 mb-5 flex items-center gap-2">
          <CheckCircle2 size={24} /> Kelebihan
        </h3>
        <div className="space-y-3">
          {chapter.content.pros.map((item, idx) => {
            const isOpen = expandedProCon.type === 'pro' && expandedProCon.idx === idx;
            return (
              <motion.div key={idx} className="bg-white border border-green-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedProCon(isOpen ? { type: null, idx: null } : { type: 'pro', idx })}
                  className="w-full flex items-center gap-4 p-5 hover:bg-green-50 transition-colors text-left"
                >
                  <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-500 text-sm mt-0.5">{item.description}</p>
                  </div>
                  <ChevronRight size={20} className={`text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-2 bg-green-50 border-t border-green-100">
                        <p className="text-green-800 text-sm leading-relaxed">{item.detail}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Kekurangan */}
      <section>
        <h3 className="text-2xl font-bold text-red-700 mb-5 flex items-center gap-2">
          <X size={24} /> Kekurangan
        </h3>
        <div className="space-y-3">
          {chapter.content.cons.map((item, idx) => {
            const isOpen = expandedProCon.type === 'con' && expandedProCon.idx === idx;
            return (
              <motion.div key={idx} className="bg-white border border-red-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedProCon(isOpen ? { type: null, idx: null } : { type: 'con', idx })}
                  className="w-full flex items-center gap-4 p-5 hover:bg-red-50 transition-colors text-left"
                >
                  <span className="w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">!</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-500 text-sm mt-0.5">{item.description}</p>
                  </div>
                  <ChevronRight size={20} className={`text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-2 bg-red-50 border-t border-red-100">
                        <p className="text-red-800 text-sm leading-relaxed">{item.detail}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Tantangan */}
      <section>
        <h3 className="text-2xl font-bold text-orange-700 mb-5">Tantangan & Solusi</h3>
        <div className="space-y-4">
          {chapter.content.challenges.map((item, idx) => (
            <InteractiveCard key={idx} delay={idx * 0.1} className="p-6 border-l-4 border-l-orange-400">
              <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.description}</p>
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                <span className="font-bold text-orange-800 block mb-1 text-sm">Solusi / Pendekatan:</span>
                <p className="text-orange-700 text-sm leading-relaxed">{item.solution}</p>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </section>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // MAIN RENDER CONTENT DISPATCHER
  // ─────────────────────────────────────────────────────────────
  const renderContent = () => {
    switch (chapter.type) {
      case 'timeline': return <Timeline data={chapter.content} intro={chapter.intro} />;
      case 'cards-antenna': return renderAntennaCards();
      case 'diagram': return renderDiagram();
      case 'factors': return renderFactors();
      case 'equipment': return renderEquipment();
      case 'security': return renderSecurity();
      case 'tech-comparison': return renderTechComparison();
      case 'pros-cons-extended': return renderProsConsExtended();
      default: return (
        <div className="space-y-4 mt-8">
          {Array.isArray(chapter.content) && chapter.content.map((item, idx) => (
            <InteractiveCard key={idx} delay={idx * 0.1} className="p-6">
              <h4 className="font-bold text-lg text-primary-700 mb-2">{item.name}</h4>
              <p className="text-slate-600">{item.description}</p>
            </InteractiveCard>
          ))}
        </div>
      );
    }
  };

  // ─────────────────────────────────────────────────────────────
  // MODAL CONTENT
  // ─────────────────────────────────────────────────────────────
  const renderModalContent = () => {
    if (!selectedItem) return null;

    if (selectedItem.isSecurityThreat) {
      const sc = severityColors[selectedItem.severity];
      return (
        <div className="space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${sc.badge}`}>
            <span className={`w-2 h-2 rounded-full ${sc.dot}`} />
            {selectedItem.severity === 'high' ? 'Risiko Tinggi' : 'Risiko Sedang'}
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="font-bold text-red-900 text-sm mb-1">Bagaimana Serangan Ini Bekerja:</p>
            <p className="text-red-800 text-sm leading-relaxed">{selectedItem.howItWorks}</p>
          </div>
          <p className="text-slate-700 leading-relaxed">{selectedItem.description}</p>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-bold text-green-900 text-sm mb-1">Cara Pencegahan:</p>
            <p className="text-green-800 text-sm leading-relaxed">{selectedItem.prevention}</p>
          </div>
        </div>
      );
    }

    if (selectedItem.isTech) {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Frekuensi", value: selectedItem.freq },
              { label: "Kecepatan", value: selectedItem.speed },
              { label: "Jangkauan", value: selectedItem.range },
              { label: "Daya", value: selectedItem.power },
            ].map(s => (
              <div key={s.label} className="bg-slate-50 rounded-xl p-3 text-center">
                <div className="text-xs text-slate-500 mb-1">{s.label}</div>
                <div className="text-sm font-bold text-slate-800">{s.value}</div>
              </div>
            ))}
          </div>
          <div>
            <p className="font-semibold text-slate-800 mb-2">Fitur Utama:</p>
            <p className="text-slate-600 text-sm leading-relaxed">{selectedItem.features}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-bold text-green-900 text-sm mb-1">Kelebihan:</p>
            <p className="text-green-800 text-sm leading-relaxed">{selectedItem.pros}</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="font-bold text-orange-900 text-sm mb-1">Kekurangan:</p>
            <p className="text-orange-800 text-sm leading-relaxed">{selectedItem.cons}</p>
          </div>
          <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
            <p className="font-bold text-primary-900 text-sm mb-1">Kasus Penggunaan:</p>
            <p className="text-primary-800 text-sm leading-relaxed">{selectedItem.usecase}</p>
          </div>
        </div>
      );
    }

    // Default: antenna or equipment
    return (
      <div className="space-y-4">
        {selectedItem.image && (
          <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-56 object-cover rounded-xl" />
        )}
        {selectedItem.category && (
          <span className="text-xs font-bold bg-primary-100 text-primary-700 px-3 py-1 rounded-full">{selectedItem.category}</span>
        )}
        <p className="text-slate-700 leading-relaxed">{selectedItem.detail || selectedItem.description}</p>

        {selectedItem.characteristics && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="font-bold text-slate-900 text-sm mb-2">Karakteristik Teknis:</p>
            <ul className="space-y-1">
              {selectedItem.characteristics.map((c, i) => (
                <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                  <ChevronRight size={14} className="text-slate-400 shrink-0 mt-0.5" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedItem.radiationPattern && (
          <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
            <p className="font-bold text-primary-900 text-sm mb-1">Pola Pancaran:</p>
            <p className="text-primary-800 text-sm leading-relaxed">{selectedItem.radiationPattern}</p>
          </div>
        )}
        {selectedItem.usage && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="font-bold text-slate-900 text-sm mb-1">Contoh Penggunaan:</p>
            <p className="text-slate-600 text-sm leading-relaxed">{selectedItem.usage}</p>
          </div>
        )}
        {selectedItem.example && (
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-bold text-amber-900 text-sm mb-1">Contoh Nyata:</p>
            <p className="text-amber-800 text-sm leading-relaxed">{selectedItem.example}</p>
          </div>
        )}
        {selectedItem.features && Array.isArray(selectedItem.features) && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="font-bold text-slate-900 text-sm mb-2">Fitur Utama:</p>
            <ul className="space-y-1">
              {selectedItem.features.map((f, i) => (
                <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-primary-500 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedItem.examples && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="font-bold text-slate-900 text-sm mb-2">Contoh Produk:</p>
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

  return (
    <div className="flex flex-col md:flex-row gap-8 relative">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <span className="font-bold text-slate-900">Materi Pembelajaran</span>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-slate-100 rounded-lg"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {(isSidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 768) && (
          <motion.div
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, x: -20, height: 0 }}
            className={clsx(
              "md:w-1/4 shrink-0 flex flex-col space-y-2",
              isSidebarOpen ? "block" : "hidden md:flex"
            )}
          >
            <div className="sticky top-24 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <div className="mb-6 pb-6 border-b border-slate-100">
                <ProgressBar current={completedMaterials.length} total={materials.length} />
              </div>
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">Daftar Chapter</h3>
              <nav className="space-y-1">
                {materials.map((m) => {
                  const isActive = m.id === activeChapterId;
                  const isDone = isCompleted(m.id);
                  const meta = chapterMeta[m.type] || { icon: BookOpen, iconBg: 'bg-slate-800' };
                  const MIcon = meta.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        setActiveChapterId(m.id);
                        setIsSidebarOpen(false);
                      }}
                      className={clsx(
                        "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all font-medium text-sm",
                        isActive
                          ? "bg-primary-600 text-white shadow-md shadow-primary-600/20"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <span className={clsx(
                        "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                        isActive ? "bg-white/20" : meta.iconBg
                      )}>
                        <MIcon size={14} className={isActive ? "text-white" : "text-white"} />
                      </span>
                      <span className="truncate flex-1">{m.title}</span>
                      {isDone && <CheckCircle2 size={16} className={isActive ? "text-primary-200 shrink-0" : "text-green-500 shrink-0"} />}
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="md:w-3/4 flex-1 min-w-0">
        <motion.div
          key={activeChapterId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="pb-24"
        >
          {/* Chapter Header */}
          {(() => {
            const meta = chapterMeta[chapter.type] || { icon: BookOpen, iconBg: 'bg-slate-800', accent: 'bg-slate-800' };
            const ChapterIcon = meta.icon;
            return (
              <div className="mb-10 relative pl-6">
                <div className={clsx("absolute left-0 top-1 bottom-1 w-1 rounded-full", meta.accent)} />
                <div className="flex items-center gap-3 mb-4">
                  <div className={clsx("w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0", meta.iconBg)}>
                    <ChapterIcon size={22} />
                  </div>
                  <span className="text-slate-400 font-semibold text-sm">
                    Chapter {chapter.id} dari {materials.length}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
                  {chapter.title}
                </h1>
                <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
                  {chapter.description}
                </p>
              </div>
            );
          })()}

          {/* Dynamic Content */}
          {renderContent()}

          {/* Bottom Navigation */}
          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors w-full sm:w-auto justify-center"
            >
              <ChevronLeft size={20} /> Sebelumnya
            </button>

            <button
              onClick={() => markAsComplete(chapter.id)}
              className={clsx(
                "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all shadow-sm w-full sm:w-auto justify-center",
                isCompleted(chapter.id)
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200"
              )}
            >
              <CheckCircle2 size={20} />
              {isCompleted(chapter.id) ? "Selesai Dipelajari" : "Tandai Selesai"}
            </button>

            <button
              onClick={handleNext}
              disabled={activeIndex === materials.length - 1}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed shadow-md w-full sm:w-auto justify-center"
            >
              Selanjutnya <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.name || selectedItem?.threat}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}