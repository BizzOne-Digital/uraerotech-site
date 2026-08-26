import { useEffect, useState } from 'react';
import SEO from '../components/ui/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import { settingsApi } from '../services';
import type { SiteSettings } from '../types';

export default function AboutPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    settingsApi.get().then((r) => setSettings(r.data.data)).catch(() => {});
  }, []);

  const values = settings?.about?.values || [
    { title: 'Safety First', description: 'Every decision prioritizes flight safety and regulatory compliance.' },
    { title: 'Quality Excellence', description: 'Precision workmanship using certified materials and processes.' },
    { title: 'Customer Focus', description: 'Responsive service tailored to your operational requirements.' },
    { title: 'Innovation', description: 'Continuous improvement in repair techniques and capabilities.' },
    { title: 'Integrity', description: 'Transparent communication and honest assessments.' },
    { title: 'Reliability', description: 'Consistent delivery on time and to specification.' },
  ];

  return (
    <>
      <SEO title="About Us — UR Aerotech" description="20+ years of aircraft structural repair and modification experience." />

      <section className="pt-32 pb-16 bg-navy relative">
        <div className="section-padding !pt-8">
          <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="technical-label text-technical mb-4">About Us</p>
              <h1 className="heading-xl mb-6">Excellence in Aviation</h1>
              <p className="text-steel text-lg leading-relaxed">
                {settings?.about?.history || 'With over 20 years of experience in aircraft structural repair and modification, UR Aerotech has built a reputation for excellence in the aviation maintenance industry.'}
              </p>
            </div>
            <div className="relative">
              <img
                src="/images/hero-hangar.png"
                alt="Aircraft engineers inspecting fuselage structure in hangar"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-4 left-0 sm:-left-4 data-plate p-4">
                <p className="font-heading text-3xl text-technical">20+</p>
                <p className="font-mono text-[10px] text-steel uppercase">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-offwhite">
        <div className="container-custom">
          <SectionHeader number="01" label="Purpose" title="Mission & Vision" light />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-technical !bg-white/80 !border-steel/10">
              <p className="technical-label text-technical mb-4">Mission</p>
              <p className="text-graphite leading-relaxed">{settings?.about?.mission}</p>
            </div>
            <div className="card-technical !bg-white/80 !border-steel/10">
              <p className="technical-label text-technical mb-4">Vision</p>
              <p className="text-graphite leading-relaxed">{settings?.about?.vision}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-graphite">
        <div className="container-custom">
          <SectionHeader number="02" label="Values" title="Core Values" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="data-plate p-6">
                <span className="font-mono text-[10px] text-technical/60">VAL-{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-heading text-lg mt-2 mb-3">{v.title}</h3>
                <p className="text-steel text-sm">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy">
        <div className="container-custom">
          <SectionHeader number="03" label="Timeline" title="Company History" description="Two decades of aviation excellence." />
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-technical/20 hidden md:block" />
            {[
              { year: '2004', event: 'UR Aerotech founded in Gangelt, Germany' },
              { year: '2010', event: 'Expanded structural repair capabilities and parts inventory' },
              { year: '2015', event: 'International client base established across Europe' },
              { year: '2020', event: '50,000+ parts inventory milestone reached' },
              { year: '2024', event: 'Continued growth in global aviation services' },
            ].map((item, i) => (
              <div key={item.year} className="relative flex gap-8 mb-8 last:mb-0">
                <div className="hidden md:flex w-16 h-16 border border-technical/30 items-center justify-center shrink-0 bg-navy z-10">
                  <span className="font-mono text-xs text-technical">{item.year}</span>
                </div>
                <div className="data-plate p-6 flex-1">
                  <span className="font-mono text-[10px] text-steel md:hidden">{item.year}</span>
                  <p className="text-offwhite mt-1">{item.event}</p>
                  <span className="font-mono text-[10px] text-steel/40 mt-2 block">LOG-{String(i + 1).padStart(3, '0')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
