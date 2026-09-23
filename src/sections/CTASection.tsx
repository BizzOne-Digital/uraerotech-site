import { Link } from 'react-router-dom';
import { IconArrowRight } from '../components/icons';
import { images } from '../assets/images';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden min-h-[420px] flex items-center">
      <img src={images.cta} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
      <div className="absolute inset-0 bg-midnight/80" />
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-20 md:py-28 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-5">Get Started</p>
        <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-white mb-6 max-w-3xl mx-auto leading-tight">
          Let&apos;s Keep Your Aircraft Flying
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mb-10 text-base">
          Structural repair, modifications, and certified parts — talk to our team today.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <Link
            to="/quote"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold text-midnight text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-amber transition-colors"
          >
            Get a Quote
            <IconArrowRight size={16} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/35 text-white text-[11px] font-medium uppercase tracking-[0.14em] hover:bg-white/10 transition-colors"
          >
            Talk to Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}
