import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../components/ui/SectionHeader';
import { IconArrowRight } from '../components/icons';
import { getServiceImage } from '../assets/images';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { Service } from '../types';

gsap.registerPlugin(ScrollTrigger);

const defaults: Pick<Service, 'title' | 'slug' | 'tagline'>[] = [
  { title: 'Aircraft Structural Repair', slug: 'aircraft-structural-repair', tagline: 'Expert structural repairs to keep your aircraft safe, reliable, and airworthy.' },
  { title: 'Structure Modification', slug: 'aircraft-structure-modification', tagline: 'Tailored modifications to enhance performance and capabilities.' },
  { title: 'Service Bulletin Compliance', slug: 'service-bulletin-compliance', tagline: 'Keep your aircraft up to date and fully compliant.' },
  { title: 'Aircraft Parts Supply', slug: 'aircraft-parts-supply', tagline: 'Certified parts sourced from trusted manufacturers.' },
  { title: 'Aviation Tools Sales', slug: 'aviation-tools-sales', tagline: 'Premium tools for professional aircraft maintenance.' },
  { title: 'Aviation Tool Rental', slug: 'aviation-tool-rental', tagline: 'Flexible tooling for short-term projects.' },
];

type ServiceItem = (typeof defaults)[number] & { heroImage?: string };

function serviceImage(service: ServiceItem, index: number) {
  if (service.heroImage?.startsWith('/images/')) return service.heroImage;
  return getServiceImage(service.slug, index);
}

export default function ServicesShowcase({ services }: { services?: Service[] }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const items: ServiceItem[] = services?.length
    ? services.map((s) => ({
        title: s.title,
        slug: s.slug,
        tagline: s.tagline,
        heroImage: s.heroImage?.startsWith('/images/') ? s.heroImage : undefined,
      }))
    : defaults;

  useEffect(() => {
    if (reduced) return;
    const pinWrap = pinRef.current;
    const track = trackRef.current;
    if (!pinWrap || !track) return;

    const scroller = document.documentElement;
    let tween: gsap.core.Tween | null = null;
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const getDistance = () => Math.max(track.scrollWidth - pinWrap.offsetWidth + 48, 0);

      tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinWrap,
          scroller,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween?.scrollTrigger?.kill();
        tween?.kill();
        gsap.set(track, { clearProps: 'transform' });
      };
    });

    const refresh = () => ScrollTrigger.refresh();
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);
    window.addEventListener('load', refresh);
    const t = window.setTimeout(refresh, 400);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', refresh);
      window.clearTimeout(t);
      mm.revert();
    };
  }, [reduced, items.length]);

  return (
    <section className="relative bg-[#0a0d12] overflow-x-clip">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#58a6ff 1px, transparent 1px), linear-gradient(90deg, #58a6ff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Header scrolls normally — not pinned */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-10 pt-20 md:pt-24 pb-8 md:pb-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <SectionHeader
              label="Services"
              title="Structural repair & aviation services"
              description="From damage assessment to certified release — comprehensive solutions for every airframe requirement."
            />
            <Link
              to="/services"
              className="hidden lg:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#58a6ff] hover:text-white transition-colors shrink-0 mb-10"
            >
              View all services
              <IconArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Only cards area pins for horizontal scroll */}
      <div
        ref={pinRef}
        className="hidden md:flex relative z-10 overflow-hidden items-center min-h-[min(78vh,720px)] pb-12"
      >
        <div ref={trackRef} className="flex gap-5 pl-5 sm:pl-8 lg:pl-10 w-max will-change-transform">
          {items.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
          <div className="w-[6vw] shrink-0" aria-hidden />
        </div>
      </div>

      {/* Mobile stack */}
      <div className="md:hidden relative z-10 px-4 sm:px-8 pb-12 space-y-5 max-w-full">
        {items.map((service, i) => (
          <ServiceCard key={service.slug} service={service} index={i} />
        ))}
        <Link
          to="/services"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#58a6ff] hover:text-white transition-colors pt-4"
        >
          View all services
          <IconArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const src = serviceImage(service, index);

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group relative shrink-0 w-full md:w-[320px] lg:w-[380px] max-w-full border border-white/[0.08] bg-[#111820] overflow-hidden transition-colors duration-500 hover:border-[#58a6ff]/40"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={src}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.fallback) {
              target.dataset.fallback = '1';
              target.src = getServiceImage(service.slug, index);
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d12] via-[#0a0d12]/35 to-transparent" />

        <span className="absolute top-4 left-4 w-5 h-5 border-t border-l border-[#58a6ff]/50" />
        <span className="absolute top-4 right-4 w-5 h-5 border-t border-r border-[#58a6ff]/50" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#58a6ff]">
              SVC — {String(index + 1).padStart(2, '0')}
            </span>
            <span className="h-px flex-1 bg-[#58a6ff]/30" />
          </div>
          <h3 className="font-heading text-xl text-white mb-2 leading-snug group-hover:text-[#58a6ff] transition-colors">
            {service.title}
          </h3>
          <p className="text-sm text-white/55 line-clamp-2 leading-relaxed">{service.tagline}</p>
          <span className="inline-flex items-center gap-2 mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#58a6ff] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Explore service
            <IconArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}
