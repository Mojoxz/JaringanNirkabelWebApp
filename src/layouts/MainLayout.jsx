import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
  const progressRef = useRef(null);
  // The home page renders a full-bleed 3D scene, so it skips the content container.
  const isHome = useLocation().pathname === '/';

  useEffect(() => {
    // Fallback for browsers that do not support CSS scroll-driven animation timelines.
    if (typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline', 'scroll()')) {
      return;
    }
    const updateScrollProgress = () => {
      if (!progressRef.current) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      progressRef.current.style.transform = `scaleX(${ratio})`;
    };
    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="min-h-dvh flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-primary-700 focus:text-white focus:font-semibold focus:shadow-lg"
      >
        Langsung ke konten utama
      </a>
      <div
        ref={progressRef}
        aria-hidden="true"
        className="scroll-progress-bar fixed top-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 z-[60] pointer-events-none"
      />
      <Navbar />
      <main
        id="main-content"
        className={isHome ? 'flex-1 w-full' : 'flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8'}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
