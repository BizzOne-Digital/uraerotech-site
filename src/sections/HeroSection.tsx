import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IconShield, IconGlobe, IconBox, IconClock, IconArrowRight } from '../components/icons';
import { homeImages } from '../assets/homeImages';

const HERO_VIDEO = encodeURI('/Aviation Video.mp4');

const defaultHero = {
  eyebrow: 'Keeping the World in Flight',
  headline: 'Expert Engineering for a Higher Standard',
  subheadline:
    'Structural repair. Maintenance. Parts. Tools. Trusted by operators worldwide.',
  ctaPrimary: 'Our Services',
  ctaSecondary: 'Get a Quote',
};

interface HeroProps {
  data?: {
    eyebrow?: string;
    headline?: string;
    subheadline?: string;
    image?: string;
    ctaPrimary?: string;
    ctaSecondary?: string;
  };
  statistics?: { label: string; value: string; suffix?: string }[];
}

const defaultStats = [
  { value: '25+', label: 'Years of Excellence' },
  { value: '1,200+', label: 'Clients Worldwide' },
  { value: '50,000+', label: 'Parts in Stock' },
  { value: '99.8%', label: 'On-Time Delivery' },
];

export default function HeroSection({ data, statistics }: HeroProps) {
  const hero = { ...defaultHero, ...data };
  const poster = hero.image && !hero.image.includes('unsplash') ? hero.image : homeImages.hero;
  const stats = statistics?.length
    ? statistics.slice(0, 4).map((s) => ({
        value: `${s.value}${s.suffix ?? ''}`,
        label: s.label,
      }))
    : defaultStats;

  return (
    <section className="relative min-h-screen-safe min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#0A0E14]">
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          aria-hidden
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0A0E14]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-[#0A0E14]/45 to-[#0A0E14]/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E14]/70 via-transparent to-transparent" />
      </div>

      <div
        className="relative z-10 w-full page-x pt-[max(6.5rem,calc(4.5rem+env(safe-area-inset-top,0px)))] sm:pt-36 pb-0 flex-1 flex flex-col justify-center items-center text-center min-w-0"
      >
        <div className="max-w-[1440px] mx-auto w-full flex flex-col items-center min-w-0">
          <div className="max-w-3xl mx-auto w-full min-w-0 px-0.5">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-[0.2em] xs:tracking-[0.28em] sm:tracking-[0.32em] text-gold mb-4 sm:mb-5 break-anywhere"
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="font-display text-[clamp(1.65rem,7vw,4.25rem)] font-semibold leading-[1.1] text-white mb-4 sm:mb-6 break-anywhere px-1"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-body text-sm sm:text-base text-white/75 leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10 px-1 break-anywhere"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 justify-center w-full max-w-md mx-auto"
            >
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 w-full xs:w-auto min-h-[44px] px-6 sm:px-7 py-3.5 bg-gold text-[#0A0E14] font-body text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] hover:bg-amber transition-colors"
              >
                {hero.ctaPrimary}
                <IconArrowRight size={16} />
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 w-full xs:w-auto min-h-[44px] px-6 sm:px-7 py-3.5 border border-white/40 text-white font-body text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em] hover:bg-white/10 transition-colors"
              >
                {hero.ctaSecondary}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        className="relative z-10 mt-8 sm:mt-10 md:mt-14 border-t border-white/[0.08] bg-[#0A0E14]/90 backdrop-blur-md w-full min-w-0 pb-[env(safe-area-inset-bottom,0px)]"
      >
        <div className="max-w-[1440px] mx-auto page-x">
          <div className="flex items-stretch min-w-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 flex-1 min-w-0 gap-px bg-white/[0.08] rounded-sm overflow-hidden">
              {stats.map((s, i) => {
                const StatIcon = [IconShield, IconGlobe, IconBox, IconClock][i] ?? IconShield;
                return (
                  <div
                    key={s.label}
                    className="flex flex-col xs:flex-row items-center justify-center xs:justify-start gap-1.5 xs:gap-3 sm:gap-4 py-4 sm:py-6 md:py-8 px-2 xs:px-3 sm:px-6 bg-[#0A0E14]/95 min-w-0 text-center xs:text-left"
                  >
                    <div className="hidden xs:flex w-9 h-9 sm:w-10 sm:h-10 shrink-0 items-center justify-center rounded-full border border-gold/45 text-gold">
                      <StatIcon size={16} />
                    </div>
                    <div className="min-w-0 w-full">
                      <p className="font-display text-lg xs:text-xl sm:text-2xl md:text-[1.75rem] text-white leading-none truncate">
                        {s.value}
                      </p>
                      <p className="font-body text-[9px] xs:text-[10px] sm:text-[11px] text-white/50 mt-1 leading-snug break-anywhere line-clamp-2">
                        {s.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className="hidden xl:flex items-center justify-center pl-6 pr-1 border-l border-white/[0.08] min-w-[3.5rem] shrink-0"
              aria-hidden
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-gold/75 [writing-mode:vertical-rl] rotate-180 text-center leading-relaxed break-anywhere">
                Safer Stronger Further
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
