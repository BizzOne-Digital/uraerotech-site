import { useEffect, useState } from 'react';
import SEO from '../components/ui/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import { IconCheck } from '../components/icons';
import { getIndustryImage } from '../assets/images';
import { getIndustries } from '../services/content';
import type { Industry } from '../types';

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);

  useEffect(() => {
    getIndustries().then(setIndustries);
  }, []);

  return (
    <>
      <SEO title="Industries — UR Aerotech" description="Aviation structural repair services across commercial, private, cargo, military, and helicopter sectors." />

      <section className="pt-32 pb-16 bg-navy">
        <div className="section-padding !pt-8">
          <div className="container-custom">
            <p className="technical-label text-technical mb-4">Industries</p>
            <h1 className="heading-xl mb-6">Industries We Serve</h1>
            <p className="text-steel text-lg max-w-2xl">
              Specialized structural repair and parts supply across every sector of aviation.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-graphite">
        <div className="container-custom space-y-20">
          {industries.map((industry, i) => (
            <div key={industry._id} id={industry.slug} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <span className="font-mono text-[10px] text-technical/60">IND-{String(i + 1).padStart(2, '0')}</span>
                <h2 className="heading-md mt-2 mb-4">{industry.title}</h2>
                <p className="text-steel leading-relaxed mb-6">{industry.description}</p>
                <ul className="space-y-3">
                  {industry.capabilities.map((cap) => (
                    <li key={cap} className="flex items-center gap-3 text-sm text-steel">
                      <IconCheck size={16} className="text-technical shrink-0" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`relative ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <img
                  src={industry.image?.startsWith('/images/') ? industry.image : getIndustryImage(industry.slug, i)}
                  alt={`${industry.title} aviation services`}
                  className="w-full aspect-[4/3] object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = '1';
                      target.src = getIndustryImage(industry.slug, i);
                    }
                  }}
                />
                <div className="absolute top-4 right-4 data-plate px-3 py-2">
                  <span className="font-mono text-[10px] text-technical">SECTOR {String(i + 1).padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
