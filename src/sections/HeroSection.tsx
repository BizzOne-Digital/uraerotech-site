import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IconShield, IconGlobe, IconBox, IconClock, IconArrowRight } from '../components/icons';

const HERO_BG = '/images/hero-hangar.jpg';
const HERO_VIDEO = '/videos/hero-hangar.mp4';

const defaultHero = {
  eyebrow: 'Keeping the World in Flight',
  headline: 'Expert Engineering for a Higher Standard',
  subheadline:
    'World-class aircraft structural repair, modification, and certified parts supply — precision you can trust in every airframe.',
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
  { value: '20+', label: 'Years of Excellence' },
  { value: '1,000+', label: 'Clients Worldwide' },
  { value: '50,000+', label: 'Parts in Stock' },
  { value: '99.8%', label: 'On-Time Delivery' },
];

export default function HeroSection({ data, statistics }: HeroProps) {
  const hero = { ...defaultHero, ...data };
  const bg = hero.image && !hero.image.includes('unsplash') ? hero.image : HERO_BG;
  const stats = statistics?.length
    ? statistics.slice(0, 4).map((s) => ({
        value: `${s.value}${s.suffix ?? ''}`,
        label: s.label,
      }))
    : defaultStats;

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-midnight">
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          poster={bg}
          aria-hidden
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/95 via-midnight/55 to-midnight/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/35 to-transparent" />
      </div>

      <div
        className="hidden xl:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-4 text-gold/80"
        aria-hidden
      >
        <span className="w-px h-16 bg-gold/40" />
        <span
          className="font-mono text-[10px] uppercase tracking-[0.35em] [writing-mode:vertical-rl] rotate-180"
        >
          Safer · Stronger · Further
        </span>
        <span className="w-px h-16 bg-gold/40" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-10 pt-28 sm:pt-36 pb-0">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-gold mb-5"
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="font-display text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.08] text-white mb-6"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base text-white/70 leading-relaxed max-w-xl mb-10"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gold text-midnight text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-amber transition-colors"
              >
                {hero.ctaPrimary}
                <IconArrowRight size={16} />
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/35 text-white text-[11px] font-medium uppercase tracking-[0.14em] hover:bg-white/10 transition-colors"
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
        className="relative z-10 mt-14 md:mt-20 border-t border-white/[0.08] bg-midnight/75 backdrop-blur-md"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.08]">
            {stats.map((s, i) => {
              const StatIcon = [IconShield, IconGlobe, IconBox, IconClock][i] ?? IconShield;
              return (
              <div
                key={s.label}
                className="flex items-center gap-3 sm:gap-4 py-6 md:py-8 px-3 sm:px-6"
              >
                <div className="hidden sm:flex w-10 h-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <StatIcon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xl sm:text-2xl md:text-3xl text-white leading-none">{s.value}</p>
                  <p className="text-[10px] sm:text-[11px] text-white/55 mt-1.5 leading-snug">{s.label}</p>
                </div>
              </div>
            );})}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
