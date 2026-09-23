import { Link } from 'react-router-dom';
import { IconArrowRight } from '../components/icons';
import { getServiceImage } from '../assets/images';
import ScrollReveal from '../components/ui/ScrollReveal';
import type { Service } from '../types';

const defaults: Pick<Service, 'title' | 'slug'>[] = [
  { title: 'Structural Repair', slug: 'aircraft-structural-repair' },
  { title: 'Aircraft Modification', slug: 'aircraft-structure-modification' },
  { title: 'Service Bulletin Compliance', slug: 'service-bulletin-compliance' },
  { title: 'Parts Supply', slug: 'aircraft-parts-supply' },
  { title: 'Tool Sales', slug: 'aviation-tools-sales' },
  { title: 'Tool Rental', slug: 'aviation-tool-rental' },
];

export default function ServicesShowcase({ services }: { services?: Service[] }) {
  const items = services?.length
    ? services.slice(0, 6).map((s) => ({ title: s.title, slug: s.slug }))
    : defaults;

  return (
    <section className="bg-offwhite text-midnight">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-12 md:mb-16">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">What We Do</p>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-midnight leading-tight">
                Comprehensive Aviation Solutions
              </h2>
            </div>
            <p className="text-muted text-base leading-relaxed lg:pb-1">
              From structural repair and modifications to certified parts and tooling — end-to-end support for
              operators, MROs, and aviation professionals worldwide.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map((service, i) => (
            <ScrollReveal key={service.slug} delay={i * 0.05}>
              <Link
                to={`/services/${service.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden bg-midnight"
              >
                <img
                  src={getServiceImage(service.slug, i)}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
                  <h3 className="font-heading text-lg text-white group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <span className="shrink-0 w-9 h-9 flex items-center justify-center border border-gold/50 text-gold group-hover:bg-gold group-hover:text-midnight transition-colors">
                    <IconArrowRight size={16} />
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
