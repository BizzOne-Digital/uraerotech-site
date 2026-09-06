import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import { getServiceImage } from '../assets/images';
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
      <section className="pt-32 pb-16 bg-navy relative overflow-hidden">
        <div className="section-padding !pt-8 !pb-16">
          <div className="container-custom">
            <p className="technical-label text-technical mb-4">Services</p>
            <h1 className="heading-xl mb-6">Our Services</h1>
            <p className="text-steel text-lg max-w-2xl">
              Comprehensive structural repair services for the global aviation industry.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-graphite">
        <div className="container-custom">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-navy/50 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, i) => (
                <Link
                  key={service._id}
                  to={`/services/${service.slug}`}
                  className="group relative overflow-hidden data-plate hover:border-technical/30 transition-all"
                >
                  <div className="aspect-[16/7] overflow-hidden">
                    <img
                      src={service.heroImage?.startsWith('/images/') ? service.heroImage : getServiceImage(service.slug, i)}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/60 to-transparent" />
                  </div>
                  <div className="p-8">
                    <span className="font-mono text-[10px] text-technical/60">SVC-{String(i + 1).padStart(2, '0')}</span>
                    <h2 className="font-heading text-2xl mt-2 mb-3 group-hover:text-technical transition-colors">{service.title}</h2>
                    <p className="text-steel text-sm">{service.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-technical text-center">
        <div className="container-custom">
          <h2 className="heading-md text-graphite mb-4">Need a Custom Solution?</h2>
          <p className="text-graphite/70 mb-8">Contact our team for specialized structural repair and modification services.</p>
          <Button to="/quote" variant="amber">Request a Quote</Button>
        </div>
      </section>
    </>
  );
}
