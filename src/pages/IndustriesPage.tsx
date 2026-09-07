import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import ScrollReveal from '../components/ui/ScrollReveal';
import { IconCheck } from '../components/icons';
import { getIndustryImage } from '../assets/images';
import { getIndustries } from '../services/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { Industry } from '../types';

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    getIndustries().then(setIndustries);
  }, []);

  return (
    <>
      <SEO title="Industries — UR Aerotech" description="Aviation structural repair services across commercial, private, cargo, military, and helicopter sectors." />

      <section className="relative pt-32 pb-16 bg-navy overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="section-padding !pt-8 relative z-10">
          <div className="container-custom">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="eyebrow mb-5">Industries</p>
              <h1 className="heading-xl text-white mb-6">Industries We Serve</h1>
              <p className="text-lg text-white/70 max-w-2xl">
                Specialized structural repair and parts supply across every sector of aviation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-graphite">
        <div className="container-custom space-y-20">
          {industries.map((industry, i) => (
            <ScrollReveal key={industry._id} delay={i * 0.05}>
              <div
                id={industry.slug}
                className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <span className="font-mono text-[10px] text-technical">IND-{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="heading-md text-white mt-2 mb-4">{industry.title}</h2>
                  <p className="text-white/70 leading-relaxed mb-6">{industry.description}</p>
                  <ul className="space-y-3">
                    {industry.capabilities.map((cap) => (
                      <li key={cap} className="flex items-center gap-3 text-sm text-white/75">
                        <IconCheck size={16} className="text-technical shrink-0" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative group ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img
                    src={industry.image?.startsWith('/images/') ? industry.image : getIndustryImage(industry.slug, i)}
                    alt={`${industry.title} aviation services`}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.fallback) {
                        target.dataset.fallback = '1';
                        target.src = getIndustryImage(industry.slug, i);
                      }
                    }}
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
                  <div className="absolute top-4 right-4 data-plate px-3 py-2 backdrop-blur-sm bg-surface/80">
                    <span className="font-mono text-[10px] text-technical">SECTOR {String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
