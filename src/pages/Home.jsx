import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pause, Play } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { materials } from '../data/materials';
import SpectrumWorld3D from '../components/SpectrumWorld3D';

// One short line per chapter; the full description lives on the chapter page.
const CHAPTER_LINES = {
  '01': 'Dari gelombang radio abad ke-19 sampai IEEE 802.11be (Wi-Fi 7).',
  '02': 'Omni, sektoral, yagi, parabola: ke mana sinyal dipancarkan dan berapa gain-nya.',
  '03': 'Point-to-Point dan Point-to-Multipoint untuk jaringan luar ruang.',
  '04': 'Line of Sight, Fresnel Zone, EIRP, dan lebar kanal yang menentukan link hidup atau mati.',
  '05': 'Access Point, router, CPE, PoE, dan radio PTP beserta perannya.',
  '06': 'Paket di udara bisa disadap siapa saja. Ini cara WPA3 menutupnya.',
  '07': 'NFC, Bluetooth, Zigbee, LoRaWAN, dan Wi-Fi: jangkauan dan kegunaannya.',
  '08': 'Multipath, kepadatan klien, dan strategi desain WLAN yang padat.',
};

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export default function Home() {
  const navigate = useNavigate();
  const { completedMaterials, lastVisitedChapter, setLastVisitedChapter, quizScore, theme } = useProgress();
  const [reducedMotion] = useState(prefersReducedMotion);
  const [paused, setPaused] = useState(reducedMotion);
  const [activeSection, setActiveSection] = useState(0);
  const progressRef = useRef(0);
  const sectionRefs = useRef([]);

  const hasStarted = completedMaterials.length > 0 || lastVisitedChapter !== '01';

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = sectionRefs.current.filter(Boolean);
      if (!sections.length) return;
      const header = document.querySelector('header');
      const y = window.scrollY + (header ? header.offsetHeight : 0);
      const tops = sections.map((el) => el.getBoundingClientRect().top + window.scrollY);
      let i = 0;
      while (i < tops.length - 1 && y >= tops[i + 1]) i += 1;
      const next = tops[i + 1] ?? tops[i] + window.innerHeight;
      const t = Math.min(1, Math.max(0, (y - tops[i]) / (next - tops[i])));
      progressRef.current = i + t;
      setActiveSection(Math.round(i + t));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const openChapter = (chapterId) => {
    setLastVisitedChapter(chapterId);
    navigate('/materi');
  };

  const scrollToSection = useCallback(
    (index) => {
      sectionRefs.current[index]?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    },
    [reducedMotion]
  );

  const handleStationSelect = useCallback((stationIndex) => scrollToSection(stationIndex + 1), [scrollToSection]);

  const setSectionRef = (index) => (el) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 z-0">
        <SpectrumWorld3D
          progressRef={progressRef}
          activeStation={activeSection - 1}
          completed={completedMaterials}
          theme={theme}
          paused={paused}
          reducedMotion={reducedMotion}
          onSelect={handleStationSelect}
        />
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Putar animasi gelombang' : 'Jeda animasi gelombang'}
        className="fixed top-20 right-4 z-20 inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 active:bg-slate-100 dark:active:bg-slate-700 transition-colors"
      >
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>

      <nav
        aria-label="Lompat ke bab"
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-1"
      >
        {materials.map((m, i) => {
          const active = activeSection === i + 1;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => scrollToSection(i + 1)}
              aria-label={`Bab ${m.id}: ${m.title}`}
              aria-current={active ? 'step' : undefined}
              className={`font-mono text-xs font-bold px-2 py-1.5 rounded-md transition-colors ${
                active
                  ? 'bg-primary-700 text-white dark:bg-primary-400 dark:text-slate-950'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-900/80'
              }`}
            >
              {m.id}
            </button>
          );
        })}
      </nav>

      <section
        ref={setSectionRef(0)}
        className="relative z-10 min-h-[calc(100dvh-4rem)] flex flex-col justify-start md:justify-center px-5 sm:px-10 lg:px-16 pt-10 md:pt-0 pb-10 pointer-events-none"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-slate-50 via-slate-50/85 to-transparent dark:from-slate-950 dark:via-slate-950/85 md:via-35% md:to-60%"
        />
        <div className="relative max-w-xl pointer-events-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-slate-900 dark:text-white">
            Jaringan nirkabel, dari gelombang radio sampai WPA3.
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 max-w-md">
            Delapan bab tutorial, masing-masing dengan lab 3D dan kotak Coba Sendiri. Gulir untuk mengelilingi
            access point dan singgah di tiap bab.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              type="button"
              onClick={() => openChapter(hasStarted ? lastVisitedChapter : '01')}
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-lg bg-primary-700 hover:bg-primary-800 active:bg-primary-900 text-white font-bold text-sm transition-colors"
            >
              {hasStarted ? `Lanjutkan Bab ${lastVisitedChapter}` : 'Mulai dari Bab 01'}
            </button>
            <Link
              to="/soal"
              className="inline-flex items-center min-h-[44px] text-sm font-semibold text-slate-800 dark:text-slate-200 underline underline-offset-4 decoration-slate-400 hover:decoration-primary-600 dark:hover:decoration-primary-400"
            >
              Langsung ke soal evaluasi
            </Link>
          </div>
        </div>
        <p className="relative mt-auto md:absolute md:bottom-8 md:left-16 pt-10 md:pt-0 font-mono text-xs text-slate-600 dark:text-slate-400">
          Gulir untuk menyusuri 8 bab <span aria-hidden="true">↓</span>
        </p>
      </section>

      {materials.map((m, i) => {
        const done = completedMaterials.includes(m.id);
        return (
          <section
            key={m.id}
            id={`bab-${m.id}`}
            ref={setSectionRef(i + 1)}
            aria-labelledby={`bab-${m.id}-title`}
            className="relative z-10 min-h-[calc(100dvh-4rem)] flex items-end md:items-center px-4 sm:px-10 lg:px-16 pb-6 md:pb-0 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-md rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 p-6 sm:p-7">
              <p className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-400">
                [BAB {m.id} // {m.estimatedMinutes || 10} MNT]
                {done && <span className="ml-2 text-emerald-700 dark:text-emerald-400">Selesai</span>}
              </p>
              <h2
                id={`bab-${m.id}-title`}
                className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white"
              >
                {m.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {CHAPTER_LINES[m.id] || m.description}
              </p>
              <button
                type="button"
                onClick={() => openChapter(m.id)}
                className="mt-6 inline-flex items-center justify-center min-h-[44px] px-5 rounded-lg bg-primary-700 hover:bg-primary-800 active:bg-primary-900 text-white font-bold text-sm transition-colors"
              >
                Buka Bab {m.id}
              </button>
            </div>
          </section>
        );
      })}

      <section
        ref={setSectionRef(materials.length + 1)}
        aria-labelledby="evaluasi-title"
        className="relative z-10 min-h-[calc(100dvh-4rem)] flex items-end md:items-center justify-center px-4 pb-6 md:pb-0 pointer-events-none"
      >
        <div className="pointer-events-auto w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 p-6 sm:p-8 text-center">
          <h2
            id="evaluasi-title"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Sudah keliling semua bab? Uji pemahamanmu.
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
            Mode Latihan memberi petunjuk dan pembahasan tiap opsi. Mode Simulasi Ujian memakai pengatur waktu.
            {quizScore !== null && (
              <>
                {' '}
                Skor terakhirmu <span className="font-mono font-bold text-slate-900 dark:text-white">{quizScore}/100</span>.
              </>
            )}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/soal"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-lg bg-primary-700 hover:bg-primary-800 active:bg-primary-900 text-white font-bold text-sm transition-colors"
            >
              Masuk Lab Evaluasi
            </Link>
            <Link
              to="/referensi"
              className="inline-flex items-center min-h-[44px] text-sm font-semibold text-slate-800 dark:text-slate-200 underline underline-offset-4 decoration-slate-400 hover:decoration-primary-600 dark:hover:decoration-primary-400"
            >
              Tonton video referensi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
