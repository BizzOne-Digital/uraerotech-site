import { Link } from 'react-router-dom';
import { IconArrowRight } from '../components/icons';
import { homeImages } from '../assets/homeImages';

interface CTASectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  image?: string;
  variant?: 'default' | 'home';
}

export default function CTASection({
  eyebrow = 'Get Started',
  title = "Let's Keep Your Aircraft Flying",
  description = 'Structural repair, modifications, and certified parts — talk to our team today.',
  primaryLabel = 'Get a Quote',
  primaryTo = '/quote',
  secondaryLabel = 'Talk to Our Team',
  secondaryTo = '/contact',
  image = homeImages.cta,
  variant = 'default',
}: CTASectionProps) {
  const isHome = variant === 'home';
  const homeEyebrow = 'Ready to Keep Moving?';
  const homeDesc =
    'Partner with UR Aerotech for structural excellence, certified parts, and responsive support — worldwide.';

  return (
    <section className="relative overflow-hidden min-h-[440px] flex items-center bg-[#0A0E14]">
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E14]/92 via-[#0A0E14]/75 to-[#0A0E14]/55" />

      {isHome && (
        <div
          className="hidden xl:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-4 text-gold/75"
          aria-hidden
        >
          <span className="w-px h-12 bg-gold/35" />
          <span className="font-mono text-[8px] uppercase tracking-[0.28em] [writing-mode:vertical-rl] rotate-180 text-center leading-relaxed max-h-[220px]">
            More Than Maintenance · A Higher Standard
          </span>
          <span className="w-px h-12 bg-gold/35" />
        </div>
      )}

      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-20 md:py-28 text-center z-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-5">
          {isHome ? homeEyebrow : eyebrow}
        </p>
        <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold text-white mb-6 max-w-3xl mx-auto leading-tight">
          {title}
        </h2>
        <p className="font-body text-white/55 max-w-xl mx-auto mb-10 text-base leading-relaxed">
          {isHome ? homeDesc : description}
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <Link
            to={primaryTo}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold text-[#0A0E14] font-body text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-amber transition-colors"
          >
            {primaryLabel}
            <IconArrowRight size={16} />
          </Link>
          <Link
            to={secondaryTo}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/40 text-white font-body text-[11px] font-medium uppercase tracking-[0.14em] hover:bg-white/10 transition-colors"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
