import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import PageHero from '../components/ui/PageHero';
import CTASection from '../sections/CTASection';
import ScrollReveal from '../components/ui/ScrollReveal';
import { IconCheck, IconArrowRight } from '../components/icons';
import { getServiceBySlug, getServices } from '../services/content';
import { pageHero } from '../assets/images';
import type { Service } from '../types';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    Promise.all([
      getServiceBySlug(slug).then(setService),
      getServices().then(setAllServices),
    ]).finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight">
        <div className="font-mono text-white/40 animate-pulse">Loading service data...</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight">
        <div className="text-center">
          <h1 className="font-display text-2xl text-white mb-4">Service Not Found</h1>
          <Link to="/services" className="btn-hero-gold inline-flex">Back to Services</Link>
        </div>
      </div>
    );
  }

  const related = allServices.filter((s) => s.slug !== slug).slice(0, 3);
  const heroImg = service.heroImage?.startsWith('/images/')
    ? service.heroImage
    : pageHero.services;

  return (
    <>
      <SEO title={`${service.title} — UR Aerotech`} description={service.tagline} image={service.heroImage} />

      <PageHero
        eyebrow="Service Detail"
        headline={service.title}
        subheadline={service.tagline}
        image={heroImg}
        primaryLabel="Request Quote"
        primaryTo={`/quote?service=${service.slug}`}
        secondaryLabel="All Services"
        secondaryTo="/services"
        showStats={false}
        minHeight="min-h-[55vh]"
      />

      <section className="bg-midnight border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {[
                { title: 'Overview', body: service.overview },
                { title: 'What We Do', body: service.whatWeDo },
                { title: 'Why It Matters', body: service.whyItMatters },
              ].map((block) => (
                <ScrollReveal key={block.title}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-3">{block.title}</p>
                  <p className="text-white/65 leading-relaxed">{block.body}</p>
                </ScrollReveal>
              ))}

              {service.gallery?.length > 0 && (
                <ScrollReveal>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-6">Gallery</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.gallery.map((img, i) => (
                      <img key={i} src={img} alt={`${service.title} gallery ${i + 1}`} className="w-full aspect-video object-cover border border-gold/10" />
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>

            <ScrollReveal delay={0.1} className="space-y-6">
              <div className="border border-gold/25 p-6 bg-[#0d1522]">
                <h3 className="font-display text-lg text-white mb-4">Capabilities</h3>
                <ul className="space-y-3">
                  {service.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-3 text-sm text-white/70">
                      <IconCheck size={16} className="text-gold shrink-0 mt-0.5" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to={`/quote?service=${service.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gold text-midnight text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-amber transition-colors"
              >
                Request Quote
                <IconArrowRight size={14} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {service.process?.length > 0 && (
        <section className="bg-[#0d1522] border-b border-white/[0.06]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-8">Technical Process</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step) => (
                <div key={step.step} className="border border-white/[0.08] p-6">
                  <span className="font-display text-3xl text-gold/30">{String(step.step).padStart(2, '0')}</span>
                  <h3 className="text-white font-medium mt-2 mb-2">{step.title}</h3>
                  <p className="text-white/55 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-midnight border-b border-white/[0.06]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-8">Related Services</p>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((s) => (
                <Link key={s._id} to={`/services/${s.slug}`} className="border border-white/[0.08] p-6 hover:border-gold/30 transition-colors group">
                  <h3 className="text-white group-hover:text-gold transition-colors">{s.title}</h3>
                  <p className="text-white/50 text-sm mt-2">{s.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection primaryTo={`/quote?service=${service.slug}`} />
    </>
  );
}
