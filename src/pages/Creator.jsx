import { Link } from 'react-router-dom';
import { Radio, BookOpen, HelpCircle, Cpu, Layers, ShieldCheck, User } from 'lucide-react';
import { motion as framerMotion } from 'framer-motion';

export default function Creator() {
  const modules = [
    {
      icon: Cpu,
      title: 'Simulasi 3D WebGL Interaktif',
      desc: 'Visualisasi pola radiasi antena (Omnidirectional, Sectoral, Yagi, Parabolic), topologi PTP/PTMP, dan Zona Fresnel berbasis Three.js.',
    },
    {
      icon: Layers,
      title: 'Modul Materi W3-Interactive',
      desc: 'Struktur pembelajaran 8 bab lengkap dengan pencarian instan, Tujuan Pembelajaran, Rumus Inti, dan sandbox Coba Sendiri di setiap bab.',
    },
    {
      icon: ShieldCheck,
      title: 'Evaluasi Dua Mode & Telemetri',
      desc: 'Laboratorium kuis dengan Mode Latihan (umpan balik langsung, petunjuk, 50:50) serta Mode Simulasi Ujian dengan analisis per kategori.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <framerMotion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-xs border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <div className="h-36 bg-slate-900 border-b border-slate-800 w-full relative flex items-center px-8">
          <div className="flex items-center gap-3 text-sky-400 font-mono text-xs uppercase tracking-widest">
            <Radio size={18} />
            <span>NetLab RF · Dokumentasi Pengembang &amp; Modul</span>
          </div>
        </div>

        <div className="px-6 sm:px-10 pb-10">
          <div className="relative -mt-12 mb-6 flex flex-col sm:flex-row sm:items-end gap-5">
            <div className="w-24 h-24 rounded-2xl bg-primary-600 text-white border-4 border-white dark:border-slate-900 shadow-md flex flex-col items-center justify-center shrink-0">
              <User size={32} />
              <span className="text-[9px] font-mono uppercase tracking-wider mt-1">[FOTO]</span>
            </div>
            <div className="pt-2">
              <span className="inline-block text-xs font-mono text-primary-600 dark:text-primary-400 font-bold">
                [IDENTITAS PENGEMBANG]
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                [NAMA PENGEMBANG]
              </h1>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                Pendidikan Teknik Informatika · [NAMA UNIVERSITAS]
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Tentang Media Pembelajaran Ini
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Aplikasi laboratorium pembelajaran jaringan nirkabel (Wireless Network) ini dirancang untuk menjembatani teori rekayasa frekuensi radio (RF) dengan praktik lapangan. Melalui simulasi tiga dimensi, kalkulator teknis interaktif bergaya W3Schools, dan studi kasus telemetri, peserta didik dapat bereksperimen langsung dengan parameter frekuensi, daya pancar (EIRP), antena, hingga mitigasi keamanan WPA3.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Arsitektur &amp; Komponen Interaktif
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {modules.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={m.title}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{m.title}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{m.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Stack: React 19 · Three.js (R3F) · Framer Motion · Tailwind CSS v4
              </div>
              <div className="flex flex-wrap gap-2.5">
                <Link
                  to="/materi"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  <BookOpen size={15} />
                  Buka Materi W3
                </Link>
                <Link
                  to="/soal"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors"
                >
                  <HelpCircle size={15} />
                  Coba Lab Evaluasi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </framerMotion.div>
    </div>
  );
}
