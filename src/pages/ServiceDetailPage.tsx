import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import Button from '../components/ui/Button';
import { IconCheck } from '../components/icons';
import { getServiceBySlug, getServices } from '../services/content';
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
      <div className="min-h-screen flex items-center justify-center bg-graphite">
        <div className="font-mono text-steel animate-pulse">Loading service data...</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-graphite">
        <div className="text-center">
          <h1 className="heading-md mb-4">Service Not Found</h1>
          <Button to="/services" variant="primary">Back to Services</Button>
        </div>
      </div>
    );
  }

  const related = allServices.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <SEO title={`${service.title} — UR Aerotech`} description={service.tagline} image={service.heroImage} />

      <section className="relative min-h-[60vh] flex items-end">
        <img src={service.heroImage || ''} alt={service.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/70 to-graphite/30" />
        <div className="relative z-10 section-padding w-full !pt-32">
          <div className="container-custom">
            <p className="technical-label text-technical mb-4">Service Detail</p>
            <h1 className="heading-xl mb-4">{service.title}</h1>
            <p className="text-steel text-lg max-w-2xl">{service.tagline}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-graphite">
        <div className="container-custom grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="heading-md mb-4">Overview</h2>
              <p className="text-steel leading-relaxed">{service.overview}</p>
            </div>
            <div>
              <h2 className="heading-md mb-4">What We Do</h2>
              <p className="text-steel leading-relaxed">{service.whatWeDo}</p>
            </div>
            <div>
              <h2 className="heading-md mb-4">Why It Matters</h2>
              <p className="text-steel leading-relaxed">{service.whyItMatters}</p>
            </div>

            {service.gallery?.length > 0 && (
              <div>
                <h2 className="heading-md mb-6">Gallery</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.gallery.map((img, i) => (
                    <img key={i} src={img} alt={`${service.title} gallery ${i + 1}`} className="w-full aspect-video object-cover" />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="data-plate p-6">
              <h3 className="font-heading text-lg mb-4">Capabilities</h3>
              <ul className="space-y-3">
                {service.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3 text-sm text-steel">
                    <IconCheck size={16} className="text-technical shrink-0 mt-0.5" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
            <Button to={`/quote?service=${service.slug}`} variant="amber" className="w-full justify-center">
              Request Quote
            </Button>
          </div>
        </div>
      </section>

      {service.process?.length > 0 && (
        <section className="section-padding bg-navy">
          <div className="container-custom">
            <h2 className="heading-md mb-8">Technical Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step) => (
                <div key={step.step} className="data-plate p-6">
                  <span className="font-heading text-3xl text-technical/20">{String(step.step).padStart(2, '0')}</span>
                  <h3 className="font-heading text-lg mt-2 mb-2">{step.title}</h3>
                  <p className="text-steel text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section-padding bg-graphite">
          <div className="container-custom">
            <h2 className="heading-md mb-8">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((s) => (
                <Link key={s._id} to={`/services/${s.slug}`} className="data-plate p-6 hover:border-technical/30 transition-colors group">
                  <h3 className="font-heading text-lg group-hover:text-technical transition-colors">{s.title}</h3>
                  <p className="text-steel text-sm mt-2">{s.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-technical text-center">
        <div className="container-custom">
          <h2 className="heading-md text-graphite mb-4">Ready to Get Started?</h2>
          <Button to={`/quote?service=${service.slug}`} variant="amber">Request a Quote</Button>
        </div>
      </section>
    </>
  );
}
