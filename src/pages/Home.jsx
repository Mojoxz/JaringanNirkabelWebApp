import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Terminal,
  Video,
  CheckCircle2,
  SlidersHorizontal,
  RadioTower,
  ShieldAlert,
  Cpu,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { materials } from '../data/materials';
import HeroWireless3D from '../components/HeroWireless3D';

const CHAPTER_LAB_TAGS = {
  '01': 'Garis Waktu IEEE & Komparator Standar',
  '02': 'Lab 3D Pola Pancaran Antena',
  '03': 'Lab 3D Topologi PTP & PTMP',
  '04': 'Simulator 3D Link & Kalkulator EIRP',
  '05': 'Kalkulator Daya PoE & Spesifikasi Perangkat',
  '06': 'Audit Enkripsi WPA3 & Skenario Serangan',
  '07': 'Matriks Protokol Wi-Fi, BLE, Zigbee & LoRa',
  '08': 'Simulasi Kepadatan Klien (High-Density WLAN)',
};

export default function Home() {
  const navigate = useNavigate();
  const { completedMaterials, lastVisitedChapter, setLastVisitedChapter, quizScore } = useProgress();
  const progressPercentage = Math.round((completedMaterials.length / materials.length) * 100);

  const [quickDistanceKm, setQuickDistanceKm] = useState(6);
  const [quickFreqGhz, setQuickFreqGhz] = useState(5.8);

  // Free Space Path Loss (dB) = 20*log10(d_km) + 20*log10(f_GHz) + 92.45
  const fsplDb = Math.round(
    (20 * Math.log10(quickDistanceKm) + 20 * Math.log10(quickFreqGhz) + 92.45) * 10
  ) / 10;

  // First Fresnel Zone radius (m) = 8.656 * sqrt(d_km / f_GHz)
  const fresnelRadiusM = Math.round(8.656 * Math.sqrt(quickDistanceKm / quickFreqGhz) * 10) / 10;
  const clearance60M = Math.round(fresnelRadiusM * 0.6 * 10) / 10;

  const recommendedAntenna =
    quickDistanceKm <= 2
      ? 'Antena Sectoral / Panel (14-18 dBi)'
      : quickDistanceKm <= 12
        ? 'Antena Panel / Yagi Directional (18-23 dBi)'
        : 'Antena Parabolic Grid / Solid Dish (24-34 dBi)';

  const currentChapterObj = materials.find((m) => m.id === lastVisitedChapter) || materials[0];

  const handleOpenChapter = (chapterId) => {
    setLastVisitedChapter(chapterId);
    navigate('/materi');
  };

  return (
    <div className="space-y-16 md:space-y-20 py-4 md:py-8">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-primary-800 dark:text-primary-300 bg-primary-50 dark:bg-primary-950/90 border border-primary-200 dark:border-primary-800 px-3 py-1.5 rounded-md">
            <RadioTower size={14} aria-hidden="true" />
            <span>[MODUL TEKNIK JARINGAN NIRKABEL // IEEE 802.11]</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Eksplorasi Spektrum, Antena &amp; Arsitektur{' '}
            <span className="text-primary-700 dark:text-primary-400 underline decoration-primary-300 dark:decoration-primary-700 decoration-2 underline-offset-4">
              Jaringan Nirkabel
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            Pelajari prinsip gelombang radio, pola radiasi antena, perhitungan <em>Link Budget</em> &amp;{' '}
            <em>Fresnel Zone</em>, hingga keamanan WPA3 melalui tutorial terstruktur bergaya W3Schools dan laboratorium
            simulasi 3D interaktif.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Link
              to="/materi"
              className="inline-flex items-center justify-center gap-2.5 bg-primary-700 hover:bg-primary-800 active:bg-primary-900 text-white px-6 py-3.5 rounded-lg font-bold text-sm transition-colors shadow-xs min-h-[48px]"
            >
              <BookOpen size={18} aria-hidden="true" />
              <span>Buka Tutorial Bab {lastVisitedChapter}</span>
            </Link>
            <Link
              to="/soal"
              className="inline-flex items-center justify-center gap-2.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 px-6 py-3.5 rounded-lg font-bold text-sm transition-colors min-h-[48px]"
            >
              <Terminal size={18} className="text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
              <span>Uji Kompetensi di Lab Soal</span>
            </Link>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                  STATUS BELAJAR ANDA
                </p>
                <h2 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  Bab Aktif: {currentChapterObj.id}. {currentChapterObj.title}
                </h2>
              </div>
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {completedMaterials.length}/{materials.length} Bab ({progressPercentage}%)
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 rounded-lg p-3">
                <p className="text-slate-600 dark:text-slate-400 font-medium">Bab Selesai</p>
                <p className="font-mono text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {completedMaterials.length} / {materials.length}
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 rounded-lg p-3">
                <p className="text-slate-600 dark:text-slate-400 font-medium">Skor Evaluasi</p>
                <p className="font-mono text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {quizScore !== null ? `${quizScore} / 100` : 'Belum diuji'}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 rounded-lg p-3 flex flex-col justify-between">
                <p className="text-slate-600 dark:text-slate-400 font-medium">Referensi Visual</p>
                <Link
                  to="/referensi"
                  className="inline-flex items-center gap-1 font-bold text-primary-700 dark:text-primary-400 hover:underline mt-0.5"
                >
                  <Video size={14} aria-hidden="true" />
                  <span>4 Video Kurasi</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <HeroWireless3D />
        </div>
      </section>

      <section
        aria-labelledby="quick-calculator-heading"
        className="bg-white dark:bg-slate-900 border-t-4 border-t-emerald-600 border-x border-b border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 shadow-xs"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <p className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase">
              [COBA SENDIRI // KALKULATOR CEPAT PROPAGASI RF]
            </p>
            <h2 id="quick-calculator-heading" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Simulasi Cepat Redaman Ruang Bebas (FSPL) &amp; Zona Fresnel
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Geser jarak tower dan pilih pita frekuensi untuk melihat perubahan redaman sinyal serta ruang bebas minimum
              di tengah lintasan.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleOpenChapter('04')}
            className="self-start lg:self-center inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors min-h-[40px] shrink-0"
          >
            <span>Buka Bab 04: Faktor Keberhasilan</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="home-distance-slider"
                  className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"
                >
                  <SlidersHorizontal size={15} className="text-primary-700 dark:text-primary-400" aria-hidden="true" />
                  <span>Jarak Lintasan Udara (d):</span>
                </label>
                <span className="font-mono text-sm font-bold text-primary-800 dark:text-primary-300 bg-primary-50 dark:bg-primary-950 px-2.5 py-1 rounded-md border border-primary-200 dark:border-primary-800">
                  {quickDistanceKm} km
                </span>
              </div>
              <input
                id="home-distance-slider"
                type="range"
                min={1}
                max={30}
                step={1}
                value={quickDistanceKm}
                onChange={(e) => setQuickDistanceKm(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 accent-primary-700 dark:accent-primary-400"
              />
              <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-400 mt-1">
                <span>1 km (Kampus)</span>
                <span>15 km (Antar Kecamatan)</span>
                <span>30 km (Backhaul)</span>
              </div>
            </div>

            <div>
              <span className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Frekuensi Operasi (f):
              </span>
              <div className="grid grid-cols-3 gap-2.5" role="group" aria-label="Pilih frekuensi kalkulator">
                {[
                  { label: '2.4 GHz', val: 2.4, desc: 'ISM Lebar' },
                  { label: '5.8 GHz', val: 5.8, desc: 'Outdoor PTP' },
                  { label: '6.0 GHz', val: 6.0, desc: 'Wi-Fi 6E/7' },
                ].map((item) => {
                  const active = quickFreqGhz === item.val;
                  return (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setQuickFreqGhz(item.val)}
                      className={`p-3 rounded-lg border text-left transition-colors min-h-[48px] ${
                        active
                          ? 'bg-primary-50 dark:bg-primary-950/90 border-primary-600 dark:border-primary-400 text-primary-900 dark:text-white'
                          : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <p className="font-mono text-xs font-bold">{item.label}</p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
              <p className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-400">
                REDAMAN RUANG BEBAS (FSPL)
              </p>
              <p className="font-mono text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                -{fsplDb} <span className="text-sm font-semibold">dB</span>
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                Sinyal melemah sebesar {fsplDb} dB di udara sebelum ditambah penguatan antena (Gain dBi).
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
              <p className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-400">
                RADIUS FRESNEL ZONE (F1)
              </p>
              <p className="font-mono text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">
                {fresnelRadiusM} <span className="text-sm font-semibold">meter</span>
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                Wajib bebas halangan minimal 60% ({clearance60M} m) di titik tengah jalur.
              </p>
            </div>

            <div className="sm:col-span-2 bg-primary-50/70 dark:bg-slate-800/90 border border-primary-200 dark:border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs font-bold text-primary-800 dark:text-primary-300">
                  REKOMENDASI PERANGKAT ANTENA
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{recommendedAntenna}</p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenChapter('02')}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary-800 dark:text-primary-300 hover:underline shrink-0"
              >
                <span>Lihat Pola 3D Antena</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="curriculum-heading" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-bold text-primary-800 dark:text-primary-300 uppercase">
              [STRUKTUR KURIKULUM // 8 MODUL TUTORIAL &amp; LAB]
            </p>
            <h2 id="curriculum-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Peta Materi &amp; Laboratorium Interaktif
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md">
            Setiap bab dilengkapi penjelasan terstruktur ala W3Schools, rumus teknis, kotak eksperimen{' '}
            <strong>Coba Sendiri</strong>, dan latihan penguji pemahaman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {materials.map((item, index) => {
            const done = completedMaterials.includes(item.id);
            const isCurrent = item.id === lastVisitedChapter;
            const isFeatured = index === 1 || index === 3;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleOpenChapter(item.id)}
                className={`group text-left rounded-xl p-5 border transition-all flex flex-col justify-between gap-4 ${
                  isCurrent
                    ? 'bg-white dark:bg-slate-900 border-primary-600 dark:border-primary-400 ring-1 ring-primary-500/30 shadow-sm'
                    : isFeatured
                      ? 'bg-slate-900 text-white border-slate-800 hover:border-sky-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary-400 dark:hover:border-primary-500'
                }`}
              >
                <div className="space-y-2.5 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md border ${
                        isFeatured && !isCurrent
                          ? 'bg-slate-800 text-sky-300 border-slate-700'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      BAB {item.id}
                    </span>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-mono ${
                          isFeatured && !isCurrent
                            ? 'text-slate-300'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <Clock size={12} aria-hidden="true" />
                        <span>{item.estimatedMinutes || 10} mnt</span>
                      </span>

                      {done ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          <CheckCircle2 size={12} aria-hidden="true" />
                          <span>Selesai</span>
                        </span>
                      ) : isCurrent ? (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                          Sedang Dipelajari
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <h3
                    className={`text-lg font-bold leading-snug ${
                      isFeatured && !isCurrent ? 'text-white' : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed line-clamp-2 ${
                      isFeatured && !isCurrent ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 w-full">
                  <span
                    className={`inline-flex items-center gap-1.5 font-mono text-xs font-semibold ${
                      isFeatured && !isCurrent
                        ? 'text-emerald-300'
                        : 'text-emerald-800 dark:text-emerald-400'
                    }`}
                  >
                    <Cpu size={14} aria-hidden="true" />
                    <span>{CHAPTER_LAB_TAGS[item.id]}</span>
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold ${
                      isFeatured && !isCurrent
                        ? 'text-sky-300 group-hover:translate-x-0.5'
                        : 'text-primary-700 dark:text-primary-400 group-hover:translate-x-0.5'
                    } transition-transform`}
                  >
                    <span>Pelajari</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-amber-400">
            <ShieldAlert size={15} aria-hidden="true" />
            <span>[EVALUASI DIAGNOSTIK &amp; PEMBAHASAN TEKNIS]</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Siap Menguji Analisis Jaringan Nirkabel Anda?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Kerjakan soal evaluasi interaktif dalam <strong>Mode Latihan</strong> (dilengkapi petunjuk dan pembahasan
            mendalam tiap opsi) atau <strong>Mode Simulasi Ujian</strong> dengan pengatur waktu dan rincian skor per
            kompetensi.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link
            to="/soal"
            className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm px-6 py-3.5 rounded-lg transition-colors min-h-[48px]"
          >
            <Terminal size={17} aria-hidden="true" />
            <span>Masuk ke Lab Evaluasi</span>
          </Link>
          <Link
            to="/referensi"
            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold text-sm px-5 py-3.5 rounded-lg transition-colors min-h-[48px]"
          >
            <Video size={17} aria-hidden="true" />
            <span>Tonton Video Referensi</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
