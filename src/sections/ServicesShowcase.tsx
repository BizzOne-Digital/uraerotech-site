import { Link } from 'react-router-dom';
import { IconArrowRight } from '../components/icons';
import { getHomeServiceImage, homeServiceBlurbs } from '../assets/homeImages';
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
    ? services.slice(0, 6).map((s) => ({ title: s.title, slug: s.slug, tagline: s.tagline }))
    : defaults.map((d) => ({ ...d, tagline: homeServiceBlurbs[d.slug] }));

  return (
    <section className="relative bg-[#0A0E14] text-white overflow-hidden">
      <img
        src="/images/sections/section-tools-engine.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.07]"
        aria-hidden
      />
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
        <ScrollReveal>
          <div className="grid lg:grid-cols-[1fr_minmax(0,22rem)] gap-8 lg:gap-16 items-end mb-12 md:mb-14">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-4">What We Do</p>
              <h2 className="font-display text-[clamp(1.85rem,4vw,2.85rem)] font-semibold text-white leading-[1.12]">
                Complete Solutions for a Stronger Tomorrow
              </h2>
            </div>
            <p className="font-body text-sm md:text-base text-white/55 leading-relaxed lg:pb-1">
              From structural repair and modifications to certified parts and tooling — end-to-end support for
              operators, MROs, and aviation professionals worldwide.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map((service, i) => {
            const blurb =
              ('tagline' in service && service.tagline) ||
              homeServiceBlurbs[service.slug] ||
              'Precision aviation solutions built for airworthiness.';
            return (
              <ScrollReveal key={service.slug} delay={i * 0.05}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group flex flex-col h-full border border-white/[0.08] bg-[#0A0E14] hover:border-gold/30 transition-colors"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={getHomeServiceImage(service.slug, i)}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 flex flex-col p-5 md:p-6 border-t border-white/[0.06] bg-[#0A0E14]">
                    <div className="flex items-start justify-between gap-3 mt-auto">
                      <div>
                        <h3 className="font-display text-lg md:text-xl text-white group-hover:text-gold transition-colors mb-2">
                          {service.title}
                        </h3>
                        <p className="font-body text-xs md:text-sm text-white/50 leading-relaxed line-clamp-2">{blurb}</p>
                      </div>
                      <span className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center border border-gold/50 text-gold group-hover:bg-gold group-hover:text-[#0A0E14] transition-colors">
                        <IconArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
