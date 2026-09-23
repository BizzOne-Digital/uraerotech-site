import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import PageHero from '../components/ui/PageHero';
import ScrollReveal from '../components/ui/ScrollReveal';
import ProcessSection from '../sections/ProcessSection';
import CTASection from '../sections/CTASection';
import { IconArrowRight, IconCheck } from '../components/icons';
import { getHomeServiceImage } from '../assets/homeImages';
import { pageHero } from '../assets/images';
import { getServices } from '../services/content';
import type { Service } from '../types';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices().then(setServices).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="Services — UR Aerotech" description="Comprehensive aircraft structural repair, modification, and compliance services." />

      <PageHero
        eyebrow="Our Services"
        headline="Complete Aviation Solutions for Structural Excellence"
        subheadline="Structural repair, modification, bulletin compliance, parts supply, and professional tooling — certified precision for every airframe."
        image={pageHero.services}
        primaryLabel="Get a Quote"
        primaryTo="/quote"
        secondaryLabel="Explore Our Services"
        secondaryTo="#services-list"
      />

      <div id="services-list" className="bg-midnight">
        {loading ? (
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-20 space-y-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-white/[0.03] animate-pulse" />
            ))}
          </div>
        ) : (
          services.map((service, i) => {
            const imageSrc = getHomeServiceImage(service.slug, i);
            const reversed = i % 2 === 1;
            const num = String(i + 1).padStart(2, '0');

            return (
              <section
                key={service._id}
                className="border-b border-white/[0.06] last:border-b-0"
              >
                <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
                  <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reversed ? '' : ''}`}>
                    <ScrollReveal className={reversed ? 'lg:order-2' : ''}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center justify-center w-10 h-10 border border-gold/50 text-gold font-mono text-xs">
                          {num}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">{service.title}</span>
                      </div>
                      <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-white mb-4 leading-tight">
                        {service.tagline}
                      </h2>
                      <p className="text-white/60 leading-relaxed mb-6">{service.overview}</p>
                      <ul className="space-y-2 mb-8">
                        {service.capabilities.slice(0, 5).map((cap) => (
                          <li key={cap} className="flex items-start gap-2 text-sm text-white/70">
                            <IconCheck size={16} className="text-gold shrink-0 mt-0.5" />
                            {cap}
                          </li>
                        ))}
                      </ul>
                      {service.process?.length > 0 && (
                        <div className="border border-gold/20 p-5 mb-8 bg-white/[0.02]">
                          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold mb-3">Key Specifications</p>
                          <ul className="space-y-2">
                            {service.process.slice(0, 4).map((step) => (
                              <li key={step.step} className="text-xs text-white/55">
                                <span className="text-gold/80">{String(step.step).padStart(2, '0')}</span> — {step.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-midnight text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-amber transition-colors"
                      >
                        Learn About {service.title.split(' ')[0]}
                        <IconArrowRight size={14} />
                      </Link>
                    </ScrollReveal>
                    <ScrollReveal delay={0.08} className={reversed ? 'lg:order-1' : ''}>
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img src={imageSrc} alt={service.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              </section>
            );
          })
        )}
      </div>

      <ProcessSection />

      <section className="relative bg-midnight border-y border-white/[0.06] overflow-hidden">
        <img
          src="/images/sections/section-tarmac-sunset.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          aria-hidden
        />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Our Commitment</p>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] text-white leading-tight">
                Our Commitment to Quality Assurance
              </h2>
              <p className="text-white/60 mt-6 leading-relaxed">
                Every repair and supply order follows documented quality processes — from intake through final release.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="space-y-6">
              {[
                'Certified materials and approved repair data',
                'NDT and dimensional verification',
                'Complete traceability and documentation',
              ].map((line) => (
                <div key={line} className="flex gap-4 border-l-2 border-gold/40 pl-5">
                  <p className="text-white/70 text-sm">{line}</p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTASection
        title="Keep Your Aircraft Mission-Ready"
        description="Request a quote or speak with our engineering team about your next project."
      />
    </>
  );
}
