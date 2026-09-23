import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import PageHero from '../components/ui/PageHero';
import ScrollReveal from '../components/ui/ScrollReveal';
import CTASection from '../sections/CTASection';
import StatsBar, { defaultPageStats } from '../components/ui/StatsBar';
import { IconArrowRight, IconShield, IconGlobe, IconCheck, IconGear } from '../components/icons';
import { images, pageHero } from '../assets/images';
import { settingsApi } from '../services';
import type { SiteSettings } from '../types';

const milestones = [
  { year: '2004', text: 'UR Aerotech founded in Gangelt, Germany' },
  { year: '2010', text: 'Expanded structural repair capabilities and parts inventory' },
  { year: '2015', text: 'International client base established across Europe' },
  { year: '2020', text: '50,000+ parts inventory milestone reached' },
  { year: '2024', text: 'Continued growth in global aviation services' },
];

export default function AboutPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    settingsApi.get().then((r) => setSettings(r.data.data)).catch(() => {});
  }, []);

  const mission = settings?.about?.mission || 'Deliver world-class aircraft structural repair and modification with uncompromising safety and quality.';
  const vision = settings?.about?.vision || 'To be the trusted global partner for aviation structural excellence and certified parts supply.';
  const history =
    settings?.about?.history ||
    'With over 20 years of experience in aircraft structural repair and modification, UR Aerotech has built a reputation for excellence in the aviation maintenance industry.';

  const values = settings?.about?.values?.slice(0, 3) || [
    { title: 'Safety First', description: 'Every decision prioritizes flight safety and regulatory compliance.' },
    { title: 'Quality Excellence', description: 'Precision workmanship using certified materials and processes.' },
    { title: 'Integrity', description: 'Transparent communication and honest assessments.' },
  ];

  return (
    <>
      <SEO title="About Us — UR Aerotech" description="20+ years of aircraft structural repair and modification experience." />

      <PageHero
        eyebrow="Our Story. A Higher Standard."
        headline="Built on Precision. Driven by Trust."
        subheadline={history.slice(0, 220) + (history.length > 220 ? '…' : '')}
        image={pageHero.about}
        primaryLabel="Get to Know Us"
        primaryTo="/contact"
        secondaryLabel="Get a Quote"
        secondaryTo="/quote"
        showStats={false}
      />

      <section className="bg-midnight border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal>
              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="aspect-square rounded-full overflow-hidden border-2 border-gold/40 p-2">
                  <img
                    src={images.sections.structuralOpen}
                    alt="Jet engine turbine detail"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Our Company</p>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] text-white mb-6 leading-tight">
                A Legacy of Aviation Excellence
              </h2>
              <p className="text-white/65 leading-relaxed mb-4">{history}</p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-gold text-[11px] font-semibold uppercase tracking-[0.14em] hover:text-amber transition-colors mt-4"
              >
                Explore our services
                <IconArrowRight size={14} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-[#0d1522] border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-20">
          <div className="grid md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-gold/20">
            {[
              { label: 'Our Mission', body: mission, icon: IconShield },
              { label: 'Our Vision', body: vision, icon: IconGlobe },
              { label: 'Our Values', body: values.map((v) => v.title).join(' · '), icon: IconCheck },
            ].map((col, i) => (
              <ScrollReveal key={col.label} delay={i * 0.08} className="md:px-8 first:md:pl-0 last:md:pr-0">
                <col.icon size={28} className="text-gold mb-5" />
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold mb-3">{col.label}</p>
                <p className="text-sm text-white/60 leading-relaxed">{col.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-midnight overflow-hidden">
        <img
          src={images.sections.hangarSunset}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          aria-hidden
        />
        <div className="absolute inset-0 bg-midnight/85" />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
          <ScrollReveal className="text-center mb-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Milestones</p>
            <h2 className="font-display text-2xl md:text-3xl text-white">Two Decades of Growth</h2>
          </ScrollReveal>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max md:min-w-0 md:grid md:grid-cols-5 md:gap-4">
              {milestones.map((m, i) => (
                <ScrollReveal key={m.year} delay={i * 0.05} className="w-48 md:w-auto shrink-0 border border-gold/20 bg-midnight/60 p-5">
                  <p className="font-display text-2xl text-gold mb-2">{m.year}</p>
                  <p className="text-xs text-white/55 leading-relaxed">{m.text}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StatsBar stats={defaultPageStats} />

      <section className="bg-midnight border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <img src={images.sections.toolsEngine} alt="Aviation engineering" className="w-full aspect-[4/3] object-cover" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Expertise</p>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] text-white mb-6">
                Engineering for a Safer Tomorrow
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Engineering Expertise', desc: 'Structural analysis and repair per OEM and regulatory standards.', icon: IconGear },
                  { title: 'Safety-First Approach', desc: 'Every repair scheme validated for airworthiness and durability.', icon: IconShield },
                  { title: 'Continuous Improvement', desc: 'Investing in capabilities, tooling, and certified processes.', icon: IconCheck },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <item.icon size={22} className="text-gold shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-medium mb-1">{item.title}</h3>
                      <p className="text-sm text-white/55">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-[#0d1522] border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Certifications</p>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] text-white mb-6">Trusted. Certified. Committed.</h2>
              <p className="text-white/60 mb-8 max-w-md">
                Repairs and supply chain processes aligned with international aviation quality standards.
              </p>
              <Link to="/contact" className="btn-hero-gold inline-flex">
                Our Quality Standards
                <IconArrowRight size={14} />
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { cert: 'AS9100', image: '/images/certification.jpg' },
                  { cert: 'ISO 9001', image: '/images/process/04-inspection.jpg' },
                  { cert: 'FAA', image: '/images/services/aircraft-structural-repair.jpg' },
                  { cert: 'EASA', image: '/images/sections/section-structural-open.jpg' },
                ].map((item) => (
                  <div
                    key={item.cert}
                    className="group relative aspect-square border border-gold/35 overflow-hidden bg-midnight"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14]/90 via-[#0A0E14]/50 to-[#0A0E14]/35" />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <span className="font-display text-xl md:text-2xl text-gold drop-shadow-sm text-center">
                        {item.cert}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="relative bg-midnight overflow-hidden min-h-[360px] flex items-center">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(197,160,89,0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 30%, rgba(74,144,194,0.12) 0%, transparent 45%)`,
          }}
        />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 grid lg:grid-cols-2 gap-10 items-center w-full">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Global Support</p>
            <h2 className="font-display text-2xl md:text-3xl text-white mb-6">A Worldwide Partner</h2>
            <Link to="/contact" className="btn-hero-ghost inline-flex border-gold/40 text-gold">
              Our Global Network
              <IconArrowRight size={14} />
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="hidden lg:flex justify-end text-gold/20">
            <IconGlobe size={180} className="opacity-30" />
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        eyebrow="Partner With Us"
        title="Engineering Confidence in Every Flight"
        description="From structural repair to certified parts — we support your fleet worldwide."
      />
    </>
  );
}
