import clsx from 'clsx';

/**
 * Custom SVG brand lockup for NetLab RF.
 * Depicts a Point-to-Point dipole link, the First Fresnel Zone (F1) ellipsoid,
 * and a modulated carrier wave — built from the DESIGN.md palette without stock icons.
 */
export default function BrandLogo({ size = 'md', showSubtitle = true, forceDark = false, className }) {
  const isSm = size === 'sm';

  return (
    <span className={clsx('inline-flex items-center gap-2.5 select-none', className)}>
      <svg
        width={isSm ? 38 : 46}
        height={isSm ? 24 : 28}
        viewBox="0 0 46 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 overflow-visible"
      >
        {/* Outer First Fresnel Zone (F1) prolate ellipsoid */}
        <ellipse
          cx="23"
          cy="14"
          rx="18.5"
          ry="9.5"
          className="fill-primary-500/10 dark:fill-primary-400/10 stroke-primary-700 dark:stroke-primary-400 transition-colors"
          strokeWidth="1.6"
        />

        {/* Inner 60% Fresnel clearance boundary */}
        <ellipse
          cx="23"
          cy="14"
          rx="18.5"
          ry="5.2"
          className="stroke-primary-600/60 dark:stroke-primary-300/55 transition-colors"
          strokeWidth="1"
          strokeDasharray="2.5 2"
        />

        {/* Direct Line-of-Sight (LoS) axis */}
        <line
          x1="4.5"
          y1="14"
          x2="41.5"
          y2="14"
          className="stroke-slate-400 dark:stroke-slate-600"
          strokeWidth="1"
        />

        {/* Modulated RF carrier wave along the propagation path */}
        <path
          d="M 4.5 14 C 9.5 5.5, 14 22.5, 18.5 14 C 23 5.5, 27.5 22.5, 32 14 C 35.5 7.5, 38.5 18.5, 41.5 14"
          className="stroke-emerald-700 dark:stroke-emerald-400 transition-colors"
          strokeWidth="1.75"
          strokeLinecap="round"
        />

        {/* Left TX & Right RX dipole masts */}
        <line
          x1="4.5"
          y1="6.5"
          x2="4.5"
          y2="21.5"
          className={forceDark ? 'stroke-white' : 'stroke-slate-900 dark:stroke-white'}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="41.5"
          y1="6.5"
          x2="41.5"
          y2="21.5"
          className={forceDark ? 'stroke-white' : 'stroke-slate-900 dark:stroke-white'}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* TX, mid-path F1 radius, and RX telemetry nodes */}
        <circle cx="4.5" cy="14" r="2.3" className={forceDark ? 'fill-primary-400' : 'fill-primary-700 dark:fill-primary-400'} />
        <circle cx="23" cy="4.5" r="1.6" className={forceDark ? 'fill-primary-400' : 'fill-primary-700 dark:fill-primary-400'} />
        <circle cx="41.5" cy="14" r="2.3" className={forceDark ? 'fill-emerald-400' : 'fill-emerald-700 dark:fill-emerald-400'} />
      </svg>

      <span className="flex flex-col text-left">
        <span
          className={clsx(
            'font-extrabold tracking-tight leading-none flex items-baseline gap-1',
            forceDark ? 'text-white' : 'text-slate-900 dark:text-white',
            isSm ? 'text-sm' : 'text-base'
          )}
        >
          <span>NetLab</span>
          <span className={clsx('font-mono', forceDark ? 'text-primary-400' : 'text-primary-700 dark:text-primary-400')}>
            RF
          </span>
        </span>
        {showSubtitle && (
          <span
            className={clsx(
              'font-mono text-[10px] font-semibold tracking-wider mt-0.5',
              forceDark ? 'text-slate-400' : 'text-slate-600 dark:text-slate-400'
            )}
          >
            IEEE 802.11 LAB
          </span>
        )}
      </span>
    </span>
  );
}
