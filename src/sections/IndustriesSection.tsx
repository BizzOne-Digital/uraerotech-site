import { Link } from 'react-router-dom';
import { IconArrowRight } from '../components/icons';
import { getIndustryImage } from '../assets/images';
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
    <section className="bg-graphite">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Industries We Serve</p>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-white">
              Tailored for Every Sector
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {items.map((ind, i) => (
            <ScrollReveal key={ind.slug} delay={i * 0.04}>
              <Link
                to={`/industries#${ind.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden border border-white/[0.08]"
              >
                <img
                  src={getIndustryImage(ind.slug, i)}
                  alt={ind.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <p className="text-[11px] md:text-xs font-medium text-white leading-snug mb-2">{ind.title}</p>
                  <IconArrowRight size={14} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
