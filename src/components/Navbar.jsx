import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useProgress } from '../hooks/useProgress';
import { materials } from '../data/materials';
import BrandLogo from './BrandLogo';

const NAV_LINKS = [
  { to: '/', label: 'Beranda' },
  { to: '/materi', label: 'Tutorial Materi' },
  { to: '/soal', label: 'Lab Evaluasi' },
  { to: '/referensi', label: 'Video Referensi' },
  { to: '/pembuat', label: 'Dokumentasi' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { completedMaterials, theme, toggleTheme } = useProgress();
  const isHome = useLocation().pathname === '/';

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 backdrop-blur-md border-b transition-colors',
        isHome
          ? 'bg-white/80 dark:bg-slate-950/75 border-slate-200/70 dark:border-slate-800/70'
          : 'bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800'
      )}
    >
      <nav aria-label="Navigasi utama" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-3">
          <Link
            to="/"
            aria-label="NetLab RF - Beranda"
            className="inline-flex items-center min-h-[44px] py-1 rounded-lg group"
          >
            <BrandLogo />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  clsx(
                    'relative inline-flex items-center px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors min-h-[44px]',
                    isActive
                      ? 'text-primary-800 dark:text-primary-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:bg-slate-200 dark:active:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 bg-primary-50 dark:bg-primary-950/80 border border-primary-200 dark:border-primary-800 rounded-lg -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/materi"
              title="Status penyelesaian bab materi"
              className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 active:bg-emerald-200 dark:active:bg-emerald-900 transition-colors min-h-[44px]"
            >
              <span>
                {completedMaterials.length}/{materials.length} Bab
              </span>
            </Link>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 transition-colors text-xs font-semibold"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={17} className="text-amber-400" aria-hidden="true" />
                  <span className="hidden xl:inline">Terang</span>
                </>
              ) : (
                <>
                  <Moon size={17} className="text-slate-700" aria-hidden="true" />
                  <span className="hidden xl:inline">Gelap</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-menu"
              aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className="lg:hidden inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 dark:active:bg-slate-600 rounded-lg text-sm font-semibold transition-colors"
            >
              {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              <span>Menu</span>
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            id="mobile-nav-menu"
            className="lg:hidden py-3 border-t border-slate-200 dark:border-slate-800 space-y-1"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-colors min-h-[44px]',
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-950 text-primary-800 dark:text-primary-300 border border-primary-200 dark:border-primary-800'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:bg-slate-200 dark:active:bg-slate-700'
                  )
                }
              >
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
