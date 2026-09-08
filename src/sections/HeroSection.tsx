import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IconShield, IconGear, IconBox, IconArrowRight } from '../components/icons';

const HERO_BG = '/images/hero-hangar.jpg';

const defaultHero = {
  section: '01 / Structural Excellence',
  eyebrow: 'Expert Aircraft Structure Repair',
  headline: 'Structure Repair & Sales',
  subheadline:
    '20+ Years of Excellence in Aircraft Structural Repairs and Modifications. Supplying certified aircraft parts, aviation tools, and industry-leading services — all in one place.',
  ctaPrimary: 'Get a Quote',
  ctaSecondary: 'Browse Inventory',
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
}

export default function HeroSection({ data }: HeroProps) {
  const hero = { ...defaultHero, ...data };
  const bg = hero.image && !hero.image.includes('unsplash') ? hero.image : HERO_BG;

  const stats = [
    { icon: IconShield, value: '20+', label: 'Years Experience' },
    { icon: IconGear, value: '5,000+', label: 'Projects' },
    { icon: IconBox, value: '50K+', label: 'Parts' },
  ];

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-graphite">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={bg}
          alt="Aircraft technicians performing structural repair inside a hangar"
          className="w-full h-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite/75 via-graphite/40 to-graphite/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/25 to-transparent" />
      </div>

      {/* HUD overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 hidden sm:block"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <line x1="0" y1="280" x2="1440" y2="280" stroke="#4A90C2" strokeWidth="0.4" strokeDasharray="4 8" opacity="0.4" />
        <line x1="680" y1="0" x2="680" y2="900" stroke="#4A90C2" strokeWidth="0.4" strokeDasharray="4 8" opacity="0.3" />
        <circle cx="680" cy="280" r="5" fill="none" stroke="#4A90C2" strokeWidth="0.6" opacity="0.6" />
        <circle cx="680" cy="280" r="12" fill="none" stroke="#4A90C2" strokeWidth="0.4" opacity="0.4" />
        <line x1="680" y1="280" x2="780" y2="200" stroke="#4A90C2" strokeWidth="0.5" opacity="0.5" />
        <text x="790" y="198" fill="#4A90C2" fontSize="8" fontFamily="monospace" opacity="0.7">STA 558.75</text>
        <line x1="900" y1="350" x2="1050" y2="350" stroke="#4A90C2" strokeWidth="0.4" opacity="0.4" />
        <text x="1060" y="354" fill="#4A90C2" fontSize="8" fontFamily="monospace" opacity="0.7">WL 192.50</text>
        <rect x="950" y="420" width="140" height="52" fill="none" stroke="#4A90C2" strokeWidth="0.5" opacity="0.5" />
        <text x="960" y="438" fill="#4A90C2" fontSize="7" fontFamily="monospace" opacity="0.8">P/N 112A320-4</text>
        <text x="960" y="452" fill="#8aa4be" fontSize="7" fontFamily="monospace" opacity="0.7">ALCLAD 2024-T3</text>
        <text x="960" y="466" fill="#8aa4be" fontSize="7" fontFamily="monospace" opacity="0.7">S/N 55214</text>
        <circle cx="1100" cy="500" r="4" fill="#4A90C2" opacity="0.5" />
        <line x1="1100" y1="500" x2="1100" y2="560" stroke="#4A90C2" strokeWidth="0.4" strokeDasharray="3 3" opacity="0.4" />
      </svg>

      {/* Content */}
      <div className="relative z-10 w-full max-w-full px-4 sm:px-8 lg:px-10 pt-28 sm:pt-32 pb-0">
        <div className="max-w-[1440px] mx-auto">
          {/* Section tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#4A90C2]">
              {defaultHero.section}
            </span>
            <span className="h-px flex-1 max-w-[120px] bg-[#4A90C2]/50" />
          </motion.div>

          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.28em] text-[#4A90C2] mb-5 break-words"
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="font-heading font-bold text-[clamp(2rem,8vw,5rem)] leading-[1.05] tracking-[-0.02em] text-white mb-6 sm:mb-7 break-words"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-[15px] md:text-base text-white/65 leading-relaxed max-w-xl mb-10"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <Link to="/quote" className="btn-hero-gold w-full sm:w-auto">
                {hero.ctaPrimary}
                <IconArrowRight size={16} />
              </Link>
              <Link to="/products" className="btn-hero-ghost w-full sm:w-auto">
                {hero.ctaSecondary}
                <IconArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="relative z-10 mt-16 md:mt-20 border-t border-white/[0.08] bg-graphite/50 backdrop-blur-sm"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4 py-6 md:py-7 sm:px-8 first:sm:pl-0">
                <div className="w-10 h-10 flex items-center justify-center border border-[#4A90C2]/30 text-[#4A90C2]">
                  <s.icon size={18} />
                </div>
                <div>
                  <p className="font-heading text-2xl md:text-3xl font-semibold text-white leading-none">{s.value}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#4A90C2] mt-1.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
