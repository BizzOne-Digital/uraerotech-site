import { Link } from 'react-router-dom';
import { IconArrowRight } from '../components/icons';
import { getHomeIndustryImage } from '../assets/homeImages';
import ScrollReveal from '../components/ui/ScrollReveal';
import type { Industry } from '../types';

const defaults: Pick<Industry, 'title' | 'slug'>[] = [
  { title: 'Commercial Aviation', slug: 'commercial-aviation' },
  { title: 'Cargo & Freight', slug: 'cargo-freight' },
  { title: 'Military & Defense', slug: 'military-defense' },
  { title: 'Helicopter Services', slug: 'helicopter-services' },
  { title: 'Private Aviation', slug: 'private-general-aviation' },
  { title: 'Aerospace Manufacturing', slug: 'aerospace-manufacturing' },
];

export default function IndustriesSection({ industries }: { industries?: Industry[] }) {
  const items = industries?.length
    ? industries.slice(0, 6).map((i) => ({ title: i.title, slug: i.slug }))
    : defaults;

  return (
    <section className="relative bg-[#0d1219] overflow-hidden">
      <img
        src="/images/sections/section-tarmac-sunset.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.14]"
        aria-hidden
      />
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-14 max-w-3xl mx-auto">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-4">Industries We Serve</p>
            <h2 className="font-display text-[clamp(1.85rem,4vw,2.85rem)] font-semibold text-white leading-tight">
              Powering Every Sector of Flight
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {items.map((ind, i) => (
            <ScrollReveal key={ind.slug} delay={i * 0.04}>
              <Link
                to={`/industries#${ind.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden border border-gold/20 bg-[#0A0E14]"
              >
                <img
                  src={getHomeIndustryImage(ind.slug, i)}
                  alt={ind.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-[#0A0E14]/45 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 flex items-end justify-between gap-2">
                  <p className="font-display text-sm md:text-base text-white leading-snug">{ind.title}</p>
                  <span className="shrink-0 w-8 h-8 rounded-full border border-gold/50 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-[#0A0E14] transition-colors">
                    <IconArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
