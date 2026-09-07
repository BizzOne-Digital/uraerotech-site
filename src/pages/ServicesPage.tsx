import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import Button from '../components/ui/Button';
import ScrollReveal, { staggerContainer, staggerItem } from '../components/ui/ScrollReveal';
import { IconArrowRight } from '../components/icons';
import { getServiceImage } from '../assets/images';
import { getServices } from '../services/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { Service } from '../types';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    getServices().then(setServices).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="Services — UR Aerotech" description="Comprehensive aircraft structural repair, modification, and compliance services." />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-graphite overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-technical/10 rounded-full blur-[120px] pointer-events-none animate-glow-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-technical/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="section-padding !pt-8 !pb-0 relative z-10">
          <div className="container-custom">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow mb-5">Services</p>
              <h1 className="heading-xl text-white mb-6">Our Services</h1>
              <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
                Comprehensive structural repair services for the global aviation industry — certified, precise, and built for airworthiness.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-graphite relative">
        <div className="container-custom">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-surface/50 animate-pulse border border-white/[0.06]" />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 gap-6 lg:gap-8"
              variants={reduced ? undefined : staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
            >
              {services.map((service, i) => (
                <motion.div key={service._id} variants={reduced ? undefined : staggerItem}>
                  <Link to={`/services/${service.slug}`} className="service-card group block h-full">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={service.heroImage?.startsWith('/images/') ? service.heroImage : getServiceImage(service.slug, i)}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E10] via-[#0B0E10]/50 to-transparent" />
                      <span className="absolute top-4 left-4 w-5 h-5 border-t border-l border-technical/60" />
                      <span className="absolute top-4 right-4 w-5 h-5 border-t border-r border-technical/60" />

                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono text-[10px] tracking-[0.2em] text-technical">
                            SVC — {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="h-px flex-1 bg-technical/30" />
                        </div>
                        <h2 className="font-heading text-xl md:text-2xl text-white mb-2 group-hover:text-technical transition-colors duration-300">
                          {service.title}
                        </h2>
                        <p className="text-sm text-white/75 leading-relaxed line-clamp-2">{service.tagline}</p>
                        <span className="inline-flex items-center gap-2 mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-technical opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          Explore service
                          <IconArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal>
        <section className="section-padding bg-technical relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 grid-bg pointer-events-none" />
          <div className="container-custom text-center relative z-10">
            <h2 className="heading-md text-graphite mb-4">Need a Custom Solution?</h2>
            <p className="text-graphite/75 mb-8 max-w-xl mx-auto">
              Contact our team for specialized structural repair and modification services.
            </p>
            <Button to="/quote" variant="amber">Request a Quote</Button>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
