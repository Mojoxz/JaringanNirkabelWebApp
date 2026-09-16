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
  timeline:             { icon: History,     color: 'text-slate-500' },
  'cards-antenna':      { icon: RadioTower,  color: 'text-primary-600' },
  diagram:              { icon: Waypoints,   color: 'text-primary-600' },
  factors:              { icon: Signal,      color: 'text-primary-600' },
  equipment:            { icon: Router,      color: 'text-primary-600' },
  security:             { icon: ShieldAlert, color: 'text-slate-600' },
  'tech-comparison':    { icon: BarChart3,   color: 'text-primary-600' },
  'pros-cons-extended': { icon: Scale,       color: 'text-primary-600' },
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

// ── Reusable intro block ─────────────────────────────────────
function IntroBlock({ children, variant = 'default' }) {
  const styles = {
    default: 'bg-slate-50 border-slate-200',
    primary: 'bg-primary-50 border-primary-100',
    warning: 'bg-red-50 border-red-100',
  };
  return (
    <div className={clsx('border rounded-lg p-5', styles[variant])}>
      <p className="text-slate-600 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

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
    <div className="space-y-8 mt-8">
      {chapter.intro && <IntroBlock variant="primary">{chapter.intro}</IntroBlock>}

      {/* 3D Visualizer */}
      <div className="rounded-xl bg-slate-900 p-5 border border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-primary-500 rounded-full" />
          <h3 className="text-white font-semibold text-sm">Visualisasi 3D Pola Pancaran Antena</h3>
          <span className="text-slate-500 text-xs ml-auto">Interaktif</span>
        </div>
        <AntennaPattern3D defaultType="omni" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chapter.content.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer bg-white border border-slate-200 hover:border-primary-300 rounded-xl overflow-hidden transition-colors"
          >
            <div className="flex">
              {/* Image */}
              <div className="w-28 shrink-0 relative overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover min-h-[110px]"
                />
                {item.badge && (
                  <span className="absolute top-2 left-2 text-xs font-medium bg-white/90 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                    {item.badge}
                  </span>
                )}
              </div>
              {/* Text */}
              <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1 text-sm">{item.name}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">{item.description}</p>
                </div>
                <p className="mt-2 text-primary-600 text-xs font-medium">
                  Lihat detail →
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── CHAPTER 03: DIAGRAM ───────────────────────────────────────
  const renderDiagram = () => (
    <div className="space-y-10 mt-8">
      {chapter.intro && <IntroBlock>{chapter.intro}</IntroBlock>}

      {/* 3D Network */}
      <div className="rounded-xl bg-slate-900 p-5 border border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-primary-500 rounded-full" />
          <h3 className="text-white font-semibold text-sm">Topologi Jaringan 3D Interaktif</h3>
          <span className="text-slate-500 text-xs ml-auto">Drag · Klik node</span>
        </div>
        <NetworkScene3D height="420px" />
      </div>

      {/* PTP */}
      <section className="space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md border border-primary-100 shrink-0">A</span>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Point-to-Point (PTP)</h3>
            <p className="text-slate-500 text-sm mt-0.5">{chapter.content.ptp.description}</p>
          </div>
        </div>
        <TopologyDiagram type="ptp" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-5">
            <h4 className="font-semibold text-slate-900 mb-3 text-sm">Keunggulan PTP</h4>
            <ul className="space-y-2">
              {chapter.content.ptp.advantages.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                  <CheckCircle2 size={14} className="text-primary-500 shrink-0 mt-0.5" />{a}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
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
      </section>

      <hr className="border-slate-200" />

      {/* PTMP */}
      <section className="space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200 shrink-0">B</span>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Point-to-Multipoint (PTMP)</h3>
            <p className="text-slate-500 text-sm mt-0.5">{chapter.content.ptmp.description}</p>
          </div>
        </div>
        <TopologyDiagram type="ptmp" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <h4 className="font-semibold text-slate-900 mb-3 text-sm">Keunggulan PTMP</h4>
            <ul className="space-y-2">
              {chapter.content.ptmp.advantages.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                  <CheckCircle2 size={14} className="text-slate-500 shrink-0 mt-0.5" />{a}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
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
      </section>
    </div>
  );

  // ── CHAPTER 04: FACTORS ───────────────────────────────────────
  const renderFactors = () => (
    <div className="space-y-8 mt-8">
      {chapter.intro && <IntroBlock>{chapter.intro}</IntroBlock>}

      <div className="space-y-2">
        {chapter.content.map((item, idx) => {
          const IconComponent = iconMap[item.icon] || Info;
          const isExpanded = expandedFactor === idx;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedFactor(isExpanded ? null : idx)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
              >
                <IconComponent size={16} className="text-primary-600 shrink-0" />
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
                      <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                        <p className="text-slate-600 text-sm leading-relaxed">{item.detail}</p>
                      </div>
                      {item.tips && (
                        <div className="flex gap-3 bg-amber-50 border border-amber-100 rounded-lg p-4">
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
            </div>
          );
        })}
      </div>

      {/* 3D Wave */}
      <div className="rounded-xl bg-slate-900 p-5 border border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-primary-500 rounded-full" />
          <h3 className="text-white font-semibold text-sm">Simulasi 3D Propagasi Sinyal</h3>
        </div>
        <WaveSignal3D height="340px" />
      </div>

      <LinkSimulator />
    </div>
  );

  // ── CHAPTER 05: EQUIPMENT ─────────────────────────────────────
  const renderEquipment = () => (
    <div className="space-y-6 mt-8">
      {chapter.intro && <IntroBlock>{chapter.intro}</IntroBlock>}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {chapter.content.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer bg-white border border-slate-200 hover:border-primary-300 rounded-xl overflow-hidden transition-colors flex flex-col"
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden bg-slate-100">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {item.badge && (
                <span className="absolute top-2 right-2 text-xs font-medium bg-white/90 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                  {item.badge}
                </span>
              )}
            </div>
            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-1">{item.category}</span>
              <h4 className="font-semibold text-slate-900 mb-1.5 text-sm leading-snug">{item.name}</h4>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1">{item.description}</p>
              <p className="mt-3 pt-3 border-t border-slate-100 text-primary-600 text-xs font-medium">
                Lihat spesifikasi →
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── CHAPTER 06: SECURITY ──────────────────────────────────────
  const renderSecurity = () => (
    <div className="space-y-10 mt-8">
      {chapter.intro && (
        <div className="flex gap-3 border border-red-100 bg-red-50 rounded-lg p-5">
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
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <LockIcon size={15} className="text-slate-400 shrink-0" />
                    <h4 className="font-semibold text-slate-900 text-sm">{p.name}</h4>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-md shrink-0 ${c.badge}`}>{c.label}</span>
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
              </div>
            );
          })}
        </div>
      </section>

      {/* Ancaman */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Ancaman Keamanan Nirkabel</h3>
        <div className="space-y-2">
          {chapter.threats.map((t, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedItem({ ...t, isSecurityThreat: true })}
              className="cursor-pointer bg-white border border-slate-200 border-l-4 border-l-slate-300 hover:border-l-primary-400 rounded-lg p-4 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-1">
                <h4 className="font-semibold text-slate-900 text-sm">{t.name}</h4>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-md shrink-0 ${severityBadge[t.severity]}`}>
                  {t.severity === 'high' ? 'Risiko Tinggi' : t.severity === 'medium' ? 'Risiko Sedang' : 'Risiko Rendah'}
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{t.description}</p>
              <p className="mt-1.5 text-primary-600 text-xs font-medium">Lihat detail →</p>
            </div>
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
      <div className="space-y-10 mt-8">
        {chapter.intro && <IntroBlock>{chapter.intro}</IntroBlock>}

        {/* Category sections with inline detail */}
        {categories.map(cat => (
          <section key={cat}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
              <h3 className="text-base font-bold text-slate-800">{cat}</h3>
            </div>
            <div className="space-y-3">
              {chapter.content.filter(t => t.category === cat).map((tech, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedItem({ ...tech, isTech: true })}
                  className="cursor-pointer bg-white border border-slate-200 hover:border-primary-300 rounded-xl p-5 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{tech.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Sejak {tech.year}</p>
                    </div>
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md shrink-0">{tech.category}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    {[
                      { label: 'Frekuensi', value: tech.freq },
                      { label: 'Kecepatan', value: tech.speed },
                      { label: 'Jangkauan', value: tech.range },
                    ].map(s => (
                      <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-lg p-2">
                        <p className="text-xs text-slate-400 mb-0.5">{s.label}</p>
                        <p className="text-xs font-semibold text-slate-700 leading-tight">{s.value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{tech.usecase}</p>
                  <p className="mt-2 text-primary-600 text-xs font-medium">Lihat detail →</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Comparison Table */}
        <section>
          <h3 className="text-base font-bold text-slate-900 mb-4">Tabel Perbandingan</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
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
                      <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{t.category}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  };

  // ── CHAPTER 08: PROS-CONS ─────────────────────────────────────
  const renderProsConsExtended = () => (
    <div className="space-y-10 mt-8">
      {chapter.intro && <IntroBlock>{chapter.intro}</IntroBlock>}

      {/* Kelebihan */}
      <section>
        <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-500" /> Kelebihan
        </h3>
        <div className="space-y-2">
          {chapter.content.pros.map((item, idx) => {
            const isOpen = expandedProCon.type === 'pro' && expandedProCon.idx === idx;
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedProCon(isOpen ? { type: null, idx: null } : { type: 'pro', idx })}
                  className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
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
          <X size={18} className="text-red-400" /> Kekurangan
        </h3>
        <div className="space-y-2">
          {chapter.content.cons.map((item, idx) => {
            const isOpen = expandedProCon.type === 'con' && expandedProCon.idx === idx;
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedProCon(isOpen ? { type: null, idx: null } : { type: 'con', idx })}
                  className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
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
            <div
              key={idx}
              className="bg-white border border-slate-200 border-l-4 border-l-primary-400 rounded-lg p-5"
            >
              <h4 className="font-semibold text-slate-900 mb-2 text-sm">{item.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-3">{item.description}</p>
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
                <p className="text-xs font-semibold text-primary-700 mb-1">Solusi / Pendekatan</p>
                <p className="text-slate-700 text-sm leading-relaxed">{item.solution}</p>
              </div>
            </div>
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
        <div className="space-y-4 mt-8">
          {Array.isArray(chapter.content) && chapter.content.map((item, idx) => (
            <InteractiveCard key={idx} delay={idx * 0.08} className="p-5">
              <h4 className="font-semibold text-primary-700 mb-2 text-sm">{item.name}</h4>
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
          <span className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-md ${severityBadge[selectedItem.severity]}`}>
            {selectedItem.severity === 'high' ? 'Risiko Tinggi' : 'Risiko Sedang'}
          </span>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Cara Kerja Serangan</p>
            <p className="text-slate-600 text-sm leading-relaxed">{selectedItem.howItWorks}</p>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed">{selectedItem.description}</p>
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
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
              <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-400 mb-1">{s.label}</p>
                <p className="text-sm font-semibold text-slate-800">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Fitur Utama</p>
            <p className="text-slate-600 text-sm leading-relaxed">{selectedItem.features}</p>
          </div>
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
            <p className="font-semibold text-primary-800 text-sm mb-1">Kelebihan</p>
            <p className="text-slate-700 text-sm leading-relaxed">{selectedItem.pros}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="font-semibold text-slate-700 text-sm mb-1">Kekurangan</p>
            <p className="text-slate-600 text-sm leading-relaxed">{selectedItem.cons}</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Kasus Penggunaan</p>
            <p className="text-slate-600 text-sm leading-relaxed">{selectedItem.usecase}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {selectedItem.image && (
          <div className="h-48 rounded-lg overflow-hidden bg-slate-100">
            <ImageWithFallback src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
          </div>
        )}
        {selectedItem.category && (
          <span className="inline-block text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100 px-2.5 py-1 rounded-md">{selectedItem.category}</span>
        )}
        <p className="text-slate-700 text-sm leading-relaxed">{selectedItem.detail || selectedItem.description}</p>
        {selectedItem.characteristics && (
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
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
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
            <p className="font-semibold text-primary-800 text-sm mb-1">Pola Pancaran</p>
            <p className="text-slate-700 text-sm leading-relaxed">{selectedItem.radiationPattern}</p>
          </div>
        )}
        {selectedItem.usage && (
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <p className="font-semibold text-slate-800 text-sm mb-1">Contoh Penggunaan</p>
            <p className="text-slate-600 text-sm leading-relaxed">{selectedItem.usage}</p>
          </div>
        )}
        {selectedItem.example && (
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <p className="font-semibold text-amber-900 text-sm mb-1">Contoh Nyata</p>
            <p className="text-amber-800 text-sm leading-relaxed">{selectedItem.example}</p>
          </div>
        )}
        {selectedItem.features && Array.isArray(selectedItem.features) && (
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
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
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <p className="font-semibold text-slate-800 text-sm mb-2">Contoh Produk</p>
            <div className="flex flex-wrap gap-2">
              {selectedItem.examples.map((e, i) => (
                <span key={i} className="bg-white text-slate-700 text-xs px-2.5 py-1 rounded-md border border-slate-200 font-medium">{e}</span>
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
      <div className="md:hidden flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
        <span className="font-semibold text-slate-900 text-sm">Materi Pembelajaran</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-slate-100 rounded-lg" aria-label="Toggle sidebar">
          <Menu size={18} />
        </button>
      </div>

      {/* Sidebar */}
      <div className={clsx('md:w-60 shrink-0', isSidebarOpen ? 'block' : 'hidden md:block')}>
        <div className="sticky top-20 bg-white border border-slate-200 rounded-xl p-4">
          <div className="mb-4 pb-4 border-b border-slate-100">
            <ProgressBar current={completedMaterials.length} total={materials.length} />
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Daftar Chapter</p>
          <nav className="space-y-0.5">
            {materials.map((m) => {
              const isActive = m.id === activeChapterId;
              const isDone = isCompleted(m.id);
              const meta = chapterMeta[m.type] || { icon: BookOpen, color: 'text-slate-500' };
              const MIcon = meta.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => { setActiveChapterId(m.id); setIsSidebarOpen(false); }}
                  className={clsx(
                    'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors text-sm',
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <MIcon size={14} className={isActive ? 'text-primary-600' : meta.color} />
                  <span className="truncate flex-1 text-[13px]">{m.title}</span>
                  {isDone && <CheckCircle2 size={13} className={isActive ? 'text-primary-400 shrink-0' : 'text-emerald-500 shrink-0'} />}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <motion.div
          key={activeChapterId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="pb-16"
        >
          {/* Chapter Header — flat, no card */}
          <div className="pb-6 mb-2 border-b border-slate-200">
            <p className="text-sm text-slate-400 mb-2">
              Chapter {chapter.id} <span className="text-slate-300">·</span> {materials.length} total
            </p>
            <h1 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{chapter.title}</h1>
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-2xl">{chapter.description}</p>

            {/* Progress track */}
            <div className="mt-4 flex items-center gap-1.5">
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
          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors w-full sm:w-auto justify-center"
            >
              <ChevronLeft size={16} /> Sebelumnya
            </button>

            <button
              onClick={() => markAsComplete(chapter.id)}
              disabled={!canComplete(chapter.id)}
              title={!canComplete(chapter.id) ? 'Selesaikan latihan soal terlebih dahulu' : ''}
              className={clsx(
                'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all w-full sm:w-auto justify-center border',
                isCompleted(chapter.id)
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : canComplete(chapter.id)
                    ? 'bg-primary-600 text-white border-primary-600 hover:bg-primary-700'
                    : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
              )}
            >
              <CheckCircle2 size={15} />
              {isCompleted(chapter.id) ? 'Selesai Dipelajari' : 'Tandai Selesai'}
            </button>

            <button
              onClick={handleNext}
              disabled={activeIndex === materials.length - 1}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors w-full sm:w-auto justify-center"
            >
              Selanjutnya <ChevronRight size={16} />
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