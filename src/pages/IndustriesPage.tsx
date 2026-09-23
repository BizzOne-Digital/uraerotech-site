import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import PageHero from '../components/ui/PageHero';
import ScrollReveal from '../components/ui/ScrollReveal';
import CTASection from '../sections/CTASection';
import { IconArrowRight, IconCheck, IconShield, IconGlobe, IconWrench, IconPlane } from '../components/icons';
import { getHomeIndustryImage } from '../assets/homeImages';
import { pageHero } from '../assets/images';
import { getIndustries } from '../services/content';
import type { Industry } from '../types';

const valuePillars = [
  { title: 'Safety First', desc: 'Every sector served with regulatory compliance at the core.', icon: IconShield },
  { title: 'Unmatched Reliability', desc: 'Consistent turnaround and documented quality.', icon: IconCheck },
  { title: 'Built for Adaptability', desc: 'From narrow-body fleets to specialized rotorcraft.', icon: IconWrench },
  { title: 'Global Support', desc: 'Responsive coordination for operators worldwide.', icon: IconGlobe },
];

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);

  useEffect(() => {
    getIndustries().then(setIndustries);
  }, []);

  return (
    <>
      <SEO title="Industries — UR Aerotech" description="Aviation structural repair services across commercial, private, cargo, military, and helicopter sectors." />

      <PageHero
        eyebrow="Industries We Serve"
        headline="Expertise Across Every Sector of Flight"
        subheadline="Specialized structural repair, modification support, and certified parts supply tailored to your operational environment."
        image={pageHero.industries}
        primaryLabel="Our Industries"
        primaryTo="#industries-grid"
        secondaryLabel="Get a Quote"
        secondaryTo="/quote"
      />

      <section id="industries-grid" className="bg-midnight border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Sectors</p>
            <h2 className="font-display text-2xl md:text-3xl text-white">Industries We Support</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => {
              const img = getHomeIndustryImage(industry.slug, i);
              const num = String(i + 1).padStart(2, '0');

              return (
                <ScrollReveal key={industry._id} delay={i * 0.05}>
                  <article className="h-full flex flex-col bg-[#0d1522] border-t-2 border-gold/50 border border-white/[0.06] overflow-hidden group">
                    <div className="flex items-start justify-between p-5 border-b border-white/[0.06]">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-gold">{num}</span>
                        <span className="w-px h-6 bg-gold/40" />
                        <h3 className="font-heading text-sm text-white">{industry.title}</h3>
                      </div>
                      <span className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-midnight transition-colors">
                        <IconArrowRight size={14} />
                      </span>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={img} alt={industry.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <ul className="space-y-2 mb-4 flex-1">
                        {industry.capabilities.slice(0, 4).map((cap) => (
                          <li key={cap} className="flex items-center gap-2 text-xs text-white/60">
                            <IconWrench size={12} className="text-gold shrink-0" />
                            {cap}
                          </li>
                        ))}
                      </ul>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/80">Higher uptime. Brighter tomorrows.</p>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0d1522] border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 mb-14">
            <ScrollReveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Our Standard</p>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] text-white leading-tight">
                One Standard. Every Mission.
              </h2>
              <p className="text-white/60 mt-4 max-w-md leading-relaxed">
                Whether commercial, cargo, or defense — the same engineering rigor and quality documentation on every project.
              </p>
            </ScrollReveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuePillars.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.06}>
                <v.icon size={32} className="text-gold mb-4" />
                <h3 className="text-white font-medium mb-2">{v.title}</h3>
                <p className="text-sm text-white/55">{v.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-midnight overflow-hidden min-h-[320px] flex items-center">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(197,160,89,0.08) 0%, transparent 60%)`,
          }}
        />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 grid lg:grid-cols-2 gap-10 w-full">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Global Reach</p>
            <Link to="/about" className="btn-hero-gold inline-flex">
              Our Global Reach
              <IconArrowRight size={14} />
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-display text-3xl text-white">1,000+</p>
              <p className="text-xs text-white/50 mt-1">Clients supported</p>
            </div>
            <div>
              <p className="font-display text-3xl text-white">50+</p>
              <p className="text-xs text-white/50 mt-1">Countries served</p>
            </div>
            <div className="col-span-2 flex items-center gap-3 text-gold/60">
              <IconPlane size={20} />
              <span className="text-xs uppercase tracking-widest">Worldwide aviation support</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        title="Let's Keep Aviation Moving Forward"
        description="Talk to our team about structural repair and parts for your sector."
      />
    </>
  );
}
