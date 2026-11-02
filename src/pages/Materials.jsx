import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
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
import W3TryItLab from '../components/W3TryItLab';
import Modal from '../components/Modal';
import ChapterExercise from '../components/ChapterExercise';
import {
  CheckCircle2, ChevronRight, ChevronLeft, Menu, Info,
  Lock, Unlock, X, Eye, Signal, Zap, TrendingUp, Layers,
  Cloud, Circle, Radio, BookOpen, History, RadioTower,
  Waypoints, Router, ShieldAlert, BarChart3, Scale,
  Search, Bookmark, Clock, Terminal, Copy, Check, FlaskConical, HelpCircle
} from 'lucide-react';
import clsx from 'clsx';

const iconMap = { Eye, Signal, Zap, TrendingUp, Layers, Cloud, Circle, Radio };

const chapterMeta = {
  timeline:             { icon: History,     color: 'text-primary-600 dark:text-primary-400' },
  'cards-antenna':      { icon: RadioTower,  color: 'text-primary-600 dark:text-primary-400' },
  diagram:              { icon: Waypoints,   color: 'text-primary-600 dark:text-primary-400' },
  factors:              { icon: Signal,      color: 'text-primary-600 dark:text-primary-400' },
  equipment:            { icon: Router,      color: 'text-primary-600 dark:text-primary-400' },
  security:             { icon: ShieldAlert, color: 'text-primary-600 dark:text-primary-400' },
  'tech-comparison':    { icon: BarChart3,   color: 'text-primary-600 dark:text-primary-400' },
  'pros-cons-extended': { icon: Scale,       color: 'text-primary-600 dark:text-primary-400' },
};

const protocolLevel = {
  broken: { bar: 'w-1/4 bg-red-500',     badge: 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/60',         label: 'Tidak Aman',  lockIcon: Lock },
  weak:   { bar: 'w-2/4 bg-amber-500',   badge: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60', label: 'Lemah',       lockIcon: Lock },
  good:   { bar: 'w-3/4 bg-primary-500', badge: 'bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800/60', label: 'Aman', lockIcon: Unlock },
  best:   { bar: 'w-full bg-emerald-500', badge: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60', label: 'Sangat Aman', lockIcon: Unlock },
};

const severityBadge = {
  high:   'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/60',
  medium: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60',
  low:    'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60',
};

function IntroBlock({ children, variant = 'default' }) {
  const styles = {
    default: 'bg-slate-50 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 border-l-4 border-l-primary-500',
    primary: 'bg-primary-50/70 dark:bg-primary-950/30 border-primary-200 dark:border-primary-900/50 border-l-4 border-l-primary-600',
    warning: 'bg-red-50/70 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 border-l-4 border-l-red-500',
  };
  return (
    <div className={clsx('border rounded-xl p-5', styles[variant])}>
      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function ImageWithFallback({ src, alt, className }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div className={clsx('bg-slate-100 dark:bg-slate-800 flex items-center justify-center', className)}>
        <svg className="text-slate-400 w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      width="320"
      height="200"
      loading="lazy"
      className={className}
      onError={() => setErr(true)}
    />
  );
}

export default function Materials() {
  const {
    completedMaterials,
    markAsComplete,
    isCompleted,
    lastVisitedChapter,
    setLastVisitedChapter,
    bookmarkedChapters,
    toggleBookmark,
    isBookmarked,
  } = useProgress();

  const [activeChapterId, setActiveChapterId] = useState(lastVisitedChapter || materials[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedFactor, setExpandedFactor] = useState(null);
  const [expandedProCon, setExpandedProCon] = useState({ type: null, idx: null });
  const [exercisePassed, setExercisePassed] = useState({});
  const [copiedFormula, setCopiedFormula] = useState(false);

  const activeIndex = materials.findIndex((m) => m.id === activeChapterId);
  const chapter = materials[activeIndex] || materials[0];

  const filteredMaterials = useMemo(() => {
    return materials.filter((m) => {
      const matchesBookmark = !showBookmarksOnly || bookmarkedChapters.includes(m.id);
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesBookmark;
      const inTitle = m.title.toLowerCase().includes(q);
      const inDesc = m.description.toLowerCase().includes(q);
      const inObj = (m.objectives || []).some((o) => o.toLowerCase().includes(q));
      return matchesBookmark && (inTitle || inDesc || inObj);
    });
  }, [searchQuery, showBookmarksOnly, bookmarkedChapters]);

  useEffect(() => {
    setLastVisitedChapter(activeChapterId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeChapterId, setLastVisitedChapter]);

  const selectChapter = (chapterId) => {
    setActiveChapterId(chapterId);
    setExpandedFactor(null);
    setExpandedProCon({ type: null, idx: null });
    setCopiedFormula(false);
  };

  const handleCopyFormula = () => {
    if (!chapter?.keyFormula?.code) return;
    navigator.clipboard?.writeText(chapter.keyFormula.code);
    setCopiedFormula(true);
    setTimeout(() => setCopiedFormula(false), 2000);
  };

  const handleExercisePassed = (chapterId) => {
    setExercisePassed((prev) => ({ ...prev, [chapterId]: true }));
  };

  const canComplete = (chapterId) => {
    if (!chapter?.exercise?.length) return true;
    return exercisePassed[chapterId] || isCompleted(chapterId);
  };

  const handleNext = () => {
    if (activeIndex < materials.length - 1) selectChapter(materials[activeIndex + 1].id);
  };
  const handlePrev = () => {
    if (activeIndex > 0) selectChapter(materials[activeIndex - 1].id);
  };

  const renderAntennaCards = () => (
    <div className="space-y-8">
      {chapter.intro && <IntroBlock variant="primary">{chapter.intro}</IntroBlock>}

      <div className="rounded-2xl bg-slate-900 p-5 border border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-primary-500 rounded-full" />
          <h3 className="text-white font-semibold text-sm">Visualisasi 3D Pola Pancaran Antena</h3>
          <span className="text-slate-400 text-xs ml-auto font-mono">Interaktif 360°</span>
        </div>
        <AntennaPattern3D defaultType="omni" />
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
          Katalog Karakteristik Antena (Klik untuk Detail Teknis)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapter.content.map((item, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setSelectedItem(item)}
              className="group text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary-500 dark:hover:border-primary-500 rounded-xl overflow-hidden transition-all shadow-xs hover:shadow-md"
            >
              <div className="flex h-full">
                <div className="w-28 sm:w-32 shrink-0 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover min-h-[120px] group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.badge && (
                    <span className="absolute top-2 left-2 text-[11px] font-semibold bg-slate-900/85 text-white px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1 text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 text-xs font-semibold">
                    Pelajari spesifikasi <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDiagram = () => (
    <div className="space-y-10">
      {chapter.intro && <IntroBlock>{chapter.intro}</IntroBlock>}

      <div className="rounded-2xl bg-slate-900 p-5 border border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-primary-500 rounded-full" />
          <h3 className="text-white font-semibold text-sm">Topologi Jaringan 3D Interaktif</h3>
          <span className="text-slate-400 text-xs ml-auto font-mono">Geser · Klik Node</span>
        </div>
        <NetworkScene3D height="420px" />
      </div>

      <section className="space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="text-xs font-bold text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950/60 px-2.5 py-1 rounded-md border border-primary-200 dark:border-primary-800 shrink-0 font-mono">
            A
          </span>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Point-to-Point (PTP)</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">{chapter.content.ptp.description}</p>
          </div>
        </div>
        <TopologyDiagram type="ptp" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary-50/70 dark:bg-primary-950/25 border border-primary-200 dark:border-primary-900/50 rounded-xl p-5">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">Keunggulan PTP</h4>
            <ul className="space-y-2">
              {chapter.content.ptp.advantages.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 text-sm">
                  <CheckCircle2 size={15} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">Kasus Penggunaan</h4>
            <ul className="space-y-2">
              {chapter.content.ptp.usecases.map((u, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-sm">
                  <ChevronRight size={14} className="text-primary-500 shrink-0 mt-1" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-slate-200 dark:border-slate-800" />

      <section className="space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 shrink-0 font-mono">
            B
          </span>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Point-to-Multipoint (PTMP)</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">{chapter.content.ptmp.description}</p>
          </div>
        </div>
        <TopologyDiagram type="ptmp" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">Keunggulan PTMP</h4>
            <ul className="space-y-2">
              {chapter.content.ptmp.advantages.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 text-sm">
                  <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">Kasus Penggunaan</h4>
            <ul className="space-y-2">
              {chapter.content.ptmp.usecases.map((u, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-sm">
                  <ChevronRight size={14} className="text-primary-500 shrink-0 mt-1" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  const renderFactors = () => (
    <div className="space-y-8">
      {chapter.intro && <IntroBlock>{chapter.intro}</IntroBlock>}

      <div className="space-y-2.5">
        {chapter.content.map((item, idx) => {
          const IconComponent = iconMap[item.icon] || Info;
          const isExpanded = expandedFactor === idx;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setExpandedFactor(isExpanded ? null : idx)}
                aria-expanded={isExpanded}
                className="w-full flex items-center gap-3.5 px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-950/60 border border-primary-100 dark:border-primary-900/60 flex items-center justify-center shrink-0">
                  <IconComponent size={16} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5 truncate">{item.summary}</p>
                </div>
                <ChevronRight
                  size={16}
                  className={`text-slate-400 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-primary-600' : ''}`}
                />
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <framerMotion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{item.description}</p>
                      <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700 rounded-lg p-4">
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-mono text-xs">{item.detail}</p>
                      </div>
                      {item.tips && (
                        <div className="flex gap-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4">
                          <Info size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">Tips Praktis Lapangan</p>
                            <p className="text-amber-900 dark:text-amber-200 text-sm leading-relaxed">{item.tips}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </framerMotion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl bg-slate-900 p-5 border border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-primary-500 rounded-full" />
          <h3 className="text-white font-semibold text-sm">Simulasi 3D Propagasi Gelombang RF</h3>
        </div>
        <WaveSignal3D height="340px" />
      </div>

      <LinkSimulator />
    </div>
  );

  const renderEquipment = () => (
    <div className="space-y-6">
      {chapter.intro && <IntroBlock>{chapter.intro}</IntroBlock>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chapter.content.map((item, idx) => (
          <button
            type="button"
            key={idx}
            onClick={() => setSelectedItem(item)}
            className="group text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary-500 dark:hover:border-primary-500 rounded-xl overflow-hidden transition-all flex flex-col shadow-xs hover:shadow-md"
          >
            <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {item.badge && (
                <span className="absolute top-2.5 right-2.5 text-xs font-semibold bg-slate-900/85 text-white px-2.5 py-0.5 rounded-md">
                  {item.badge}
                </span>
              )}
            </div>
            <div className="p-4 flex flex-col flex-1 w-full">
              <span className="text-[11px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1 font-mono">
                {item.category}
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 text-sm leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {item.name}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-3 flex-1">
                {item.description}
              </p>
              <span className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 text-xs font-semibold">
                Lihat spesifikasi lengkap <ChevronRight size={13} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-10">
      {chapter.intro && <IntroBlock variant="warning">{chapter.intro}</IntroBlock>}

      <section>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Evolusi Protokol Keamanan Wi-Fi</h3>
        <div className="space-y-3">
          {chapter.protocols.map((p, idx) => {
            const c = protocolLevel[p.status];
            const LockIcon = c.lockIcon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <LockIcon size={15} className="text-slate-500 dark:text-slate-400 shrink-0" />
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{p.name}</h4>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md shrink-0 ${c.badge}`}>
                    {c.label}
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full mb-3 overflow-hidden">
                  <framerMotion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.level * 25}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className={`h-full rounded-full ${c.bar.split(' ')[1]}`}
                  />
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Ancaman Keamanan Nirkabel (Klik untuk Analisis Mitigasi)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {chapter.threats.map((t, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setSelectedItem({ ...t, isSecurityThreat: true })}
              className="text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-primary-500 hover:border-primary-500 rounded-xl p-4 transition-all shadow-xs hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</h4>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${severityBadge[t.severity]}`}>
                  {t.severity === 'high' ? 'Risiko Tinggi' : t.severity === 'medium' ? 'Risiko Sedang' : 'Risiko Rendah'}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">{t.description}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 text-xs font-semibold">
                Cara kerja &amp; pencegahan <ChevronRight size={13} />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Simulasi Kasus Lapangan</h3>
        <SecurityScenario scenario={chapter.scenario} />
      </section>
    </div>
  );

  const renderTechComparison = () => {
    const categories = [...new Set(chapter.content.map((t) => t.category))];
    return (
      <div className="space-y-10">
        {chapter.intro && <IntroBlock>{chapter.intro}</IntroBlock>}

        {categories.map((cat) => (
          <section key={cat}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{cat}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {chapter.content.filter((t) => t.category === cat).map((tech, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSelectedItem({ ...tech, isTech: true })}
                  className="text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary-500 rounded-xl p-5 transition-all shadow-xs hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{tech.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">Rilis {tech.year}</p>
                    </div>
                    <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-md shrink-0">
                      {tech.category}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    {[
                      { label: 'Frekuensi', value: tech.freq },
                      { label: 'Kecepatan', value: tech.speed },
                      { label: 'Jangkauan', value: tech.range },
                    ].map((s) => (
                      <div key={s.label} className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 rounded-lg p-2">
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-0.5">{s.label}</p>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight font-mono">{s.value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">{tech.usecase}</p>
                  <span className="mt-2.5 inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 text-xs font-semibold">
                    Bandingkan spesifikasi <ChevronRight size={13} />
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}

        <section>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Tabel Perbandingan Standar Nirkabel</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700">
                <tr className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 font-mono">
                  <th className="px-4 py-3 font-semibold">Teknologi</th>
                  <th className="px-4 py-3 font-semibold">Kecepatan</th>
                  <th className="px-4 py-3 font-semibold">Jangkauan</th>
                  <th className="px-4 py-3 font-semibold">Daya</th>
                  <th className="px-4 py-3 font-semibold">Kategori</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
                {chapter.content.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white text-sm">{t.name}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 text-xs font-mono">{t.speed}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 text-xs font-mono">{t.range}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 text-xs">{t.power}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md">
                        {t.category}
                      </span>
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

  const renderProsConsExtended = () => (
    <div className="space-y-10">
      {chapter.intro && <IntroBlock>{chapter.intro}</IntroBlock>}

      <section>
        <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-500" /> Kelebihan Jaringan Nirkabel
        </h3>
        <div className="space-y-2">
          {chapter.content.pros.map((item, idx) => {
            const isOpen = expandedProCon.type === 'pro' && expandedProCon.idx === idx;
            return (
              <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedProCon(isOpen ? { type: null, idx: null } : { type: 'pro', idx })}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5">{item.description}</p>
                  </div>
                  <ChevronRight size={15} className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <framerMotion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 pt-3 bg-emerald-50/60 dark:bg-emerald-950/25 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{item.detail}</p>
                      </div>
                    </framerMotion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4 flex items-center gap-2">
          <X size={18} className="text-red-500" /> Keterbatasan &amp; Kekurangan
        </h3>
        <div className="space-y-2">
          {chapter.content.cons.map((item, idx) => {
            const isOpen = expandedProCon.type === 'con' && expandedProCon.idx === idx;
            return (
              <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedProCon(isOpen ? { type: null, idx: null } : { type: 'con', idx })}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5">{item.description}</p>
                  </div>
                  <ChevronRight size={15} className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <framerMotion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 pt-3 bg-red-50/50 dark:bg-red-950/25 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{item.detail}</p>
                      </div>
                    </framerMotion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4">Tantangan Teknis &amp; Solusi Rekayasa</h3>
        <div className="space-y-3">
          {chapter.content.challenges.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-primary-500 rounded-xl p-5"
            >
              <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 text-sm">{item.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">{item.description}</p>
              <div className="bg-primary-50/70 dark:bg-primary-950/30 border border-primary-200 dark:border-primary-900/50 rounded-lg p-4">
                <p className="text-xs font-bold text-primary-700 dark:text-primary-300 mb-1">Solusi / Pendekatan Arsitektur</p>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

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
      default:
        return (
          <div className="space-y-4">
            {Array.isArray(chapter.content) && chapter.content.map((item, idx) => (
              <InteractiveCard key={idx} delay={idx * 0.08} className="p-5">
                <h4 className="font-semibold text-primary-700 dark:text-primary-400 mb-2 text-sm">{item.name}</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{item.description}</p>
              </InteractiveCard>
            ))}
          </div>
        );
    }
  };

  const renderModalContent = () => {
    if (!selectedItem) return null;

    if (selectedItem.isSecurityThreat) {
      return (
        <div className="space-y-4">
          <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-md ${severityBadge[selectedItem.severity]}`}>
            {selectedItem.severity === 'high' ? 'Risiko Tinggi' : 'Risiko Sedang'}
          </span>
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">Cara Kerja Serangan</p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{selectedItem.howItWorks}</p>
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{selectedItem.description}</p>
          <div className="bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
            <p className="font-bold text-primary-800 dark:text-primary-300 text-sm mb-1">Cara Pencegahan &amp; Mitigasi</p>
            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">{selectedItem.prevention}</p>
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
            ].map((s) => (
              <div key={s.label} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{s.label}</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white font-mono">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">Fitur Utama</p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{selectedItem.features}</p>
          </div>
          <div className="bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
            <p className="font-bold text-primary-800 dark:text-primary-300 text-sm mb-1">Kelebihan</p>
            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">{selectedItem.pros}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">Kekurangan</p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{selectedItem.cons}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">Kasus Penggunaan</p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{selectedItem.usecase}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {selectedItem.image && (
          <div className="h-48 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
            <ImageWithFallback src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
          </div>
        )}
        {selectedItem.category && (
          <span className="inline-block text-xs font-semibold bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 px-2.5 py-1 rounded-md">
            {selectedItem.category}
          </span>
        )}
        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{selectedItem.detail || selectedItem.description}</p>
        {selectedItem.characteristics && (
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-bold text-slate-900 dark:text-white text-sm mb-2">Karakteristik Teknis</p>
            <ul className="space-y-1.5">
              {selectedItem.characteristics.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-sm">
                  <ChevronRight size={13} className="text-primary-500 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedItem.radiationPattern && (
          <div className="bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
            <p className="font-bold text-primary-800 dark:text-primary-300 text-sm mb-1">Pola Pancaran</p>
            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">{selectedItem.radiationPattern}</p>
          </div>
        )}
        {selectedItem.usage && (
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">Contoh Penggunaan</p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{selectedItem.usage}</p>
          </div>
        )}
        {selectedItem.example && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-lg p-4">
            <p className="font-bold text-amber-900 dark:text-amber-300 text-sm mb-1">Contoh Implementasi</p>
            <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">{selectedItem.example}</p>
          </div>
        )}
        {selectedItem.features && Array.isArray(selectedItem.features) && (
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-bold text-slate-900 dark:text-white text-sm mb-2">Fitur Utama</p>
            <ul className="space-y-1.5">
              {selectedItem.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-sm">
                  <CheckCircle2 size={13} className="text-primary-500 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedItem.examples && (
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-bold text-slate-900 dark:text-white text-sm mb-2">Contoh Perangkat di Industri</p>
            <div className="flex flex-wrap gap-2">
              {selectedItem.examples.map((e, i) => (
                <span key={i} className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 font-medium">
                  {e}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 relative items-start">
      <div className="lg:hidden w-full flex items-center justify-between bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="px-2 py-0.5 rounded bg-primary-600 text-white text-xs font-mono font-bold">
            Bab {chapter.id}
          </span>
          <span className="font-bold text-slate-900 dark:text-white text-sm truncate">{chapter.title}</span>
        </div>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold"
          aria-expanded={isSidebarOpen}
          aria-label="Daftar Bab Tutorial"
        >
          <Menu size={16} />
          <span>Daftar Bab</span>
        </button>
      </div>

      <aside
        aria-label="Navigasi Tutorial W3"
        className={clsx(
          'w-full lg:w-72 shrink-0',
          isSidebarOpen ? 'block' : 'hidden lg:block'
        )}
      >
        <div className="sticky top-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-primary-600 dark:text-primary-400">
                Kurikulum W3-Interactive
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {completedMaterials.length}/{materials.length} selesai
              </span>
            </div>
            <ProgressBar current={completedMaterials.length} total={materials.length} />

            <div className="relative">
              <label htmlFor="tutorial-search" className="sr-only">
                Cari bab atau materi
              </label>
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="tutorial-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari bab atau rumus..."
                className="w-full pl-8 pr-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-primary-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
              <button
                type="button"
                onClick={() => setShowBookmarksOnly(false)}
                className={clsx(
                  'py-1.5 rounded-lg text-xs font-semibold transition-colors',
                  !showBookmarksOnly
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                )}
              >
                Semua ({materials.length})
              </button>
              <button
                type="button"
                onClick={() => setShowBookmarksOnly(true)}
                className={clsx(
                  'py-1.5 rounded-lg text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1',
                  showBookmarksOnly
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                )}
              >
                <Bookmark size={12} /> Disimpan ({bookmarkedChapters.length})
              </button>
            </div>
          </div>

          <nav className="p-2.5 max-h-[calc(100vh-260px)] overflow-y-auto space-y-1">
            {filteredMaterials.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                Tidak ada bab yang cocok dengan pencarian Anda.
              </div>
            ) : (
              filteredMaterials.map((m) => {
                const isActive = m.id === activeChapterId;
                const isDone = isCompleted(m.id);
                const saved = isBookmarked(m.id);
                const meta = chapterMeta[m.type] || { icon: BookOpen, color: 'text-slate-500' };
                const MIcon = meta.icon;
                return (
                  <div key={m.id} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        selectChapter(m.id);
                        setIsSidebarOpen(false);
                      }}
                      className={clsx(
                        'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all text-xs',
                        isActive
                          ? 'bg-primary-600 text-white font-bold shadow-xs'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      )}
                    >
                      <span
                        className={clsx(
                          'font-mono text-[11px] px-1.5 py-0.5 rounded shrink-0',
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        )}
                      >
                        {m.id}
                      </span>
                      <MIcon size={14} className={isActive ? 'text-white shrink-0' : `${meta.color} shrink-0`} />
                      <span className="truncate flex-1">{m.title}</span>
                      {saved && !isDone && (
                        <Bookmark size={12} className={isActive ? 'text-amber-200 fill-amber-200 shrink-0' : 'text-amber-500 fill-amber-500 shrink-0'} />
                      )}
                      {isDone && (
                        <CheckCircle2
                          size={14}
                          className={isActive ? 'text-emerald-200 shrink-0' : 'text-emerald-500 shrink-0'}
                        />
                      )}
                    </button>

                    {isActive && (
                      <div className="pl-7 pr-2 py-1 space-y-1 border-l-2 border-primary-500/40 ml-4 text-[11px]">
                        <a
                          href="#section-intro"
                          className="block py-1 px-2 rounded text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          1. Tujuan &amp; Rumus Inti
                        </a>
                        <a
                          href="#section-core"
                          className="block py-1 px-2 rounded text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          2. Materi &amp; Visualisasi 3D
                        </a>
                        <a
                          href="#section-try-it"
                          className="block py-1 px-2 rounded text-primary-600 dark:text-primary-400 font-semibold"
                        >
                          3. Coba Sendiri (Lab W3)
                        </a>
                        <a
                          href="#section-exercise"
                          className="block py-1 px-2 rounded text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          4. Latihan Bab {m.id}
                        </a>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </nav>
        </div>
      </aside>

      <div className="flex-1 min-w-0 w-full">
        <framerMotion.article
          key={activeChapterId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="pb-16 space-y-8"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft size={15} /> Bab Sebelumnya
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleBookmark(chapter.id)}
                  aria-pressed={isBookmarked(chapter.id)}
                  className={clsx(
                    'inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors',
                    isBookmarked(chapter.id)
                      ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  )}
                >
                  <Bookmark size={13} className={isBookmarked(chapter.id) ? 'fill-amber-500 text-amber-500' : ''} />
                  {isBookmarked(chapter.id) ? 'Tersimpan' : 'Simpan Bab'}
                </button>
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === materials.length - 1}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-40 transition-colors"
              >
                Bab Selanjutnya <ChevronRight size={15} />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono">
              <span className="px-2 py-0.5 rounded bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 font-bold border border-primary-200 dark:border-primary-800">
                BAB {chapter.id} / {String(materials.length).padStart(2, '0')}
              </span>
              {chapter.estimatedMinutes && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <Clock size={12} /> Estimasi {chapter.estimatedMinutes} menit
                </span>
              )}
              {isCompleted(chapter.id) && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 size={12} /> Selesai Dipelajari
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              {chapter.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {chapter.description}
            </p>
          </div>

          <section id="section-intro" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-12 gap-4">
            {chapter.objectives && (
              <div className="md:col-span-7 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                  <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-900 dark:text-emerald-300">
                    Tujuan Pembelajaran Bab {chapter.id}
                  </h2>
                </div>
                <ul className="space-y-2">
                  {chapter.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {chapter.keyFormula && (
              <div className="md:col-span-5 bg-slate-900 text-white border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-primary-400 font-bold">
                      <Terminal size={13} /> {chapter.keyFormula.label}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyFormula}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono transition-colors"
                      aria-label="Salin rumus teknis"
                    >
                      {copiedFormula ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      {copiedFormula ? 'Tersalin' : 'Salin'}
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto mb-2.5">
                    <code>{chapter.keyFormula.code}</code>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {chapter.keyFormula.caption}
                </p>
              </div>
            )}
          </section>

          <section id="section-core" className="scroll-mt-24">
            {renderContent()}
          </section>

          <div className="scroll-mt-24 pt-2">
            <W3TryItLab chapterId={chapter.id} />
          </div>

          {chapter.exercise && (
            <div className="scroll-mt-24 pt-2">
              <ChapterExercise
                questions={chapter.exercise}
                alreadyPassed={isCompleted(chapter.id) || !!exercisePassed[chapter.id]}
                onPassed={() => handleExercisePassed(chapter.id)}
              />
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors w-full sm:w-auto justify-center"
            >
              <ChevronLeft size={16} /> Bab Sebelumnya
            </button>

            <button
              type="button"
              onClick={() => markAsComplete(chapter.id)}
              disabled={!canComplete(chapter.id)}
              title={!canComplete(chapter.id) ? 'Selesaikan latihan soal bab ini terlebih dahulu' : ''}
              className={clsx(
                'flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all w-full sm:w-auto justify-center border',
                isCompleted(chapter.id)
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                  : canComplete(chapter.id)
                    ? 'bg-primary-600 text-white border-primary-600 hover:bg-primary-700'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 cursor-not-allowed'
              )}
            >
              <CheckCircle2 size={15} />
              {isCompleted(chapter.id) ? 'Bab Selesai Dipelajari' : 'Tandai Bab Selesai'}
            </button>

            {activeIndex < materials.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-primary-600 hover:bg-primary-700 text-white transition-colors w-full sm:w-auto justify-center"
              >
                Bab Selanjutnya <ChevronRight size={16} />
              </button>
            ) : (
              <Link
                to="/soal"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors w-full sm:w-auto justify-center"
              >
                Lanjut ke Evaluasi Soal <ChevronRight size={16} />
              </Link>
            )}
          </div>
        </framerMotion.article>
      </div>

      <aside className="hidden xl:block w-56 shrink-0 sticky top-20 space-y-4" aria-label="Ringkasan Halaman Ini">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3">
          <p className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
            Di Halaman Ini
          </p>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="#section-intro"
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <BookOpen size={13} className="text-primary-500" />
                <span>Tujuan &amp; Rumus Inti</span>
              </a>
            </li>
            <li>
              <a
                href="#section-core"
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <RadioTower size={13} className="text-primary-500" />
                <span>Materi &amp; Visual 3D</span>
              </a>
            </li>
            <li>
              <a
                href="#section-try-it"
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-semibold"
              >
                <FlaskConical size={13} className="text-emerald-500" />
                <span>Lab Coba Sendiri</span>
              </a>
            </li>
            <li>
              <a
                href="#section-exercise"
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <HelpCircle size={13} className="text-amber-500" />
                <span>Latihan Evaluasi</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-primary-50/70 dark:bg-primary-950/30 border border-primary-200 dark:border-primary-900/50 rounded-2xl p-4 space-y-2.5">
          <p className="text-xs font-bold text-slate-900 dark:text-white">
            Siap Uji Kompetensi?
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Uji pemahaman konsep propogasi RF, antena, dan keamanan di laboratorium kuis interaktif.
          </p>
          <Link
            to="/soal"
            className="inline-flex items-center justify-center w-full gap-1.5 px-3 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold transition-colors"
          >
            Buka Lab Soal <ChevronRight size={13} />
          </Link>
        </div>
      </aside>

      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.name || selectedItem?.threat}>
        {renderModalContent()}
      </Modal>
    </div>
  );
}
