import { Link } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
import { getIndustryImage } from '../assets/images';
import type { Industry } from '../types';

const defaults: Pick<Industry, 'title' | 'slug' | 'description'>[] = [  { title: 'Commercial Aviation', slug: 'commercial-aviation', description: 'Fleet structural repairs and AOG response for airlines and MRO facilities.' },
  { title: 'Private & General Aviation', slug: 'private-general-aviation', description: 'Services for business jets, turboprops, and general aviation.' },
  { title: 'Cargo & Freight', slug: 'cargo-freight', description: 'Freighter conversions, door modifications, and heavy-use repairs.' },
  { title: 'Helicopter Services', slug: 'helicopter-services', description: 'Rotorcraft structural repairs and composite blade services.' },
];

function industryImage(ind: Industry | (typeof defaults)[number], index: number) {
  if ('image' in ind && ind.image?.startsWith('/images/')) return ind.image;
  return getIndustryImage(ind.slug, index);
}

export default function IndustriesSection({ industries }: { industries?: Industry[] }) {  const items = industries?.length ? industries.slice(0, 4) : defaults;

  return (
    <section className="section-light">
      <div className="section-pad">
        <div className="site-container">
          <SectionHeader
            label="Industries"
            title="Serving every sector of aviation"
            description="Specialized structural solutions tailored to your operational environment."
            light
          />

          <div className="grid md:grid-cols-2 gap-4">
            {items.map((ind, i) => (
              <Link
                key={ind.slug}
                to={`/industries#${ind.slug}`}
                className={`group relative overflow-hidden ${i === 0 ? 'md:row-span-2' : ''}`}
              >
                <div className={`relative ${i === 0 ? 'aspect-[3/4] md:aspect-auto md:h-full min-h-[320px]' : 'aspect-[16/10]'}`}>
                  <img
                    src={industryImage(ind, i)}
                    alt={ind.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.fallback) {
                        target.dataset.fallback = '1';
                        target.src = getIndustryImage(ind.slug, i);
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/30 to-transparent" />
                  <div className="absolute bottom-0 p-6 md:p-8">
                    <h3 className="font-heading text-xl md:text-2xl text-white mb-2">{ind.title}</h3>
                    <p className="text-sm text-steel max-w-sm">{ind.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
