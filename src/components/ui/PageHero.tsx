import { Link } from 'react-router-dom';
import { IconArrowRight } from '../icons';
import StatsBar, { defaultPageStats, type StatItem } from './StatsBar';

export interface PageHeroProps {
  eyebrow: string;
  headline: string;
  subheadline?: string;
  image?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  showStats?: boolean;
  stats?: StatItem[];
  verticalTagline?: string;
  minHeight?: string;
}

export default function PageHero({
  eyebrow,
  headline,
  subheadline,
  image = '/images/hero-hangar.jpg',
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
  showStats = true,
  stats = defaultPageStats,
  verticalTagline = 'Safer · Stronger · Further',
  minHeight = 'min-h-[72vh]',
}: PageHeroProps) {
  const hasCta = primaryLabel && primaryTo;

  return (
    <section className={`relative ${minHeight} min-h-[100dvh] flex flex-col justify-end overflow-hidden bg-midnight min-w-0`}>
      <div className="absolute inset-0">
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/95 via-midnight/60 to-midnight/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
      </div>

      {verticalTagline && (
        <div
          className="hidden xl:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-4 text-gold/80"
          aria-hidden
        >
          <span className="w-px h-16 bg-gold/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] [writing-mode:vertical-rl] rotate-180">
            {verticalTagline}
          </span>
          <span className="w-px h-16 bg-gold/40" />
        </div>
      )}

      <div className="relative z-10 w-full page-x pt-[max(6rem,calc(4.5rem+env(safe-area-inset-top,0px)))] sm:pt-36 pb-0 min-w-0">
        <div className="max-w-[1440px] mx-auto min-w-0">
          <div className="max-w-2xl min-w-0">
            <p className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.28em] text-gold mb-5 break-anywhere">{eyebrow}</p>
            <h1 className="font-display text-[clamp(1.65rem,6vw,3.75rem)] leading-[1.1] text-white mb-6 break-anywhere">{headline}</h1>
            {subheadline && (
              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mb-10 break-anywhere">{subheadline}</p>
            )}
            {hasCta && (
              <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 mb-6">
                <Link
                  to={primaryTo!}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] w-full xs:w-auto px-6 sm:px-7 py-3.5 bg-gold text-midnight text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-amber transition-colors"
                >
                  {primaryLabel}
                  <IconArrowRight size={16} />
                </Link>
                {secondaryLabel && secondaryTo && (
                  <Link
                    to={secondaryTo}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] w-full xs:w-auto px-6 sm:px-7 py-3.5 border border-white/35 text-white text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] hover:bg-white/10 transition-colors"
                  >
                    {secondaryLabel}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showStats && <StatsBar stats={stats} className="relative z-10 mt-10 md:mt-14" />}
    </section>
  );
}
