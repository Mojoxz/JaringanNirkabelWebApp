import { Link } from 'react-router-dom';
import { Radio } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-700 text-white flex items-center justify-center shrink-0">
            <Radio size={16} aria-hidden="true" />
          </div>
          <div>
            <p className="font-bold text-sm text-slate-900 dark:text-white">
              NetLab RF: Media Pembelajaran Jaringan Nirkabel
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Modul Tutorial Interaktif, Kalkulator Link Budget &amp; Simulasi Spektrum 3D
            </p>
          </div>
        </div>

        <nav aria-label="Navigasi bawah" className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <Link to="/" className="hover:text-primary-700 dark:hover:text-primary-400 py-1 transition-colors">
            Beranda
          </Link>
          <Link to="/materi" className="hover:text-primary-700 dark:hover:text-primary-400 py-1 transition-colors">
            Tutorial Materi
          </Link>
          <Link to="/soal" className="hover:text-primary-700 dark:hover:text-primary-400 py-1 transition-colors">
            Lab Evaluasi
          </Link>
          <Link to="/referensi" className="hover:text-primary-700 dark:hover:text-primary-400 py-1 transition-colors">
            Video Referensi
          </Link>
          <Link to="/pembuat" className="hover:text-primary-700 dark:hover:text-primary-400 py-1 transition-colors">
            Dokumentasi
          </Link>
        </nav>
      </div>
    </footer>
  );
}
