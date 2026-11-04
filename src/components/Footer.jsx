import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-center sm:text-left">
          <Link to="/" aria-label="NetLab RF - Beranda" className="inline-flex justify-center sm:justify-start">
            <BrandLogo size="sm" showSubtitle={false} />
          </Link>
          <span aria-hidden="true" className="hidden sm:inline text-slate-300 dark:text-slate-700">
            ·
          </span>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Media Pembelajaran Jaringan Nirkabel, Kalkulator Link Budget &amp; Simulasi Spektrum 3D
          </p>
        </div>

        <nav
          aria-label="Navigasi bawah"
          className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm font-semibold text-slate-700 dark:text-slate-300"
        >
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
