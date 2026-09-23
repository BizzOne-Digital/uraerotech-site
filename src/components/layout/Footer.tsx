import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { IconMail, IconPhone, IconMapPin, IconArrowRight } from '../icons';
import Logo from '../ui/Logo';
import { SITE_CONTACT } from '../../constants/siteContact';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Tools & Parts', to: '/products' },
  { label: 'Contact', to: '/contact' },
];

const serviceLinks = [
  { label: 'Structural Repair', to: '/services/aircraft-structural-repair' },
  { label: 'Modifications', to: '/services/aircraft-structure-modification' },
  { label: 'SB Compliance', to: '/services/service-bulletin-compliance' },
  { label: 'Parts Supply', to: '/services/aircraft-parts-supply' },
  { label: 'All Services', to: '/services' },
];

const accountLinks = [{ label: 'Request a Quote', to: '/quote' }];

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="text-sm text-white/55 hover:text-gold transition-colors inline-flex items-center gap-2 group"
    >
      <span className="w-0 group-hover:w-2 h-px bg-gold transition-all duration-300 shrink-0" />
      {children}
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A0E14] overflow-x-clip text-white">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(197,160,89,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.35) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* CTA strip */}
      <div className="relative border-b border-white/[0.08] bg-gradient-to-r from-[#0A0E14] via-[#0d1219] to-[#0A0E14]">
        <div className="max-w-[1440px] mx-auto page-x py-12 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            <div className="max-w-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-3">Ready to start?</p>
              <h3 className="font-display text-2xl md:text-[1.75rem] lg:text-3xl font-semibold text-white leading-snug">
                Expert structural repair &amp; certified parts — worldwide
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gold text-[#0A0E14] font-body text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-amber transition-colors w-full sm:w-auto"
              >
                Request a Quote
                <IconArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/35 text-white font-body text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] hover:bg-white/5 hover:border-gold/40 transition-colors w-full sm:w-auto"
              >
                Contact Us
                <IconArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div className="relative page-x py-14 md:py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-3">
              <Logo height="xl" className="mb-5" />
              <p className="font-body text-sm text-white/55 leading-relaxed max-w-sm mb-6">
                Aircraft structural repair, modification, and certified parts supply. Serving airlines, MROs, and
                operators from Gangelt, Germany.
              </p>
              <div className="flex flex-wrap gap-2">
                {['FAA Standards', 'EASA Compliant', '20+ Years'].map((badge) => (
                  <span
                    key={badge}
                    className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.12em] text-gold/90 border border-gold/30 bg-gold/[0.06] px-3 py-1.5"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold mb-5 pb-2 border-b border-gold/15 inline-block">
                Quick Links
              </p>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <FooterLink to={link.to}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold mb-5 pb-2 border-b border-gold/15 inline-block">
                Our Services
              </p>
              <ul className="space-y-2.5">
                {serviceLinks.map((link) => (
                  <li key={link.to}>
                    <FooterLink to={link.to}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold mb-5 pb-2 border-b border-gold/15 inline-block">
                Account
              </p>
              <ul className="space-y-2.5">
                {accountLinks.map((link) => (
                  <li key={link.to}>
                    <FooterLink to={link.to}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold mb-5 pb-2 border-b border-gold/15">
                Contact Us
              </p>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${SITE_CONTACT.email}`}
                    className="flex items-start gap-3 text-sm text-white/60 hover:text-gold transition-colors group"
                  >
                    <span className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full border border-gold/30 bg-gold/[0.06] text-gold group-hover:border-gold/50">
                      <IconMail size={15} />
                    </span>
                    <span className="pt-1 break-all">{SITE_CONTACT.email}</span>
                  </a>
                </li>
                {SITE_CONTACT.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a
                      href={`tel:${phone.tel}`}
                      className="flex items-start gap-3 text-sm text-white/60 hover:text-gold transition-colors group"
                    >
                      <span className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full border border-gold/30 bg-gold/[0.06] text-gold group-hover:border-gold/50">
                        <IconPhone size={15} />
                      </span>
                      <span className="pt-1">{phone.display}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={SITE_CONTACT.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-sm text-white/60 hover:text-gold transition-colors group"
                  >
                    <span className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full border border-gold/30 bg-gold/[0.06] text-gold group-hover:border-gold/50 mt-0.5">
                      <IconMapPin size={15} />
                    </span>
                    <span className="leading-relaxed max-w-[16rem]">
                      Gaterstr. 66B
                      <br />
                      52538 Gangelt, Germany
                    </span>
                  </a>
                </li>
              </ul>
              <p className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-gold/70 mt-6 pt-5 border-t border-white/[0.06] leading-relaxed">
                A Stronger Tomorrow Together
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/[0.08] bg-[#070a10] pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]">
        <div className="max-w-[1440px] mx-auto page-x py-5 md:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 min-w-0">
          <p className="font-mono text-[10px] text-white/35 tracking-wide">
            © {year} UR Aerotech GmbH. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: 'Privacy', to: '/contact' },
              { label: 'Terms', to: '/contact' },
              { label: 'Sitemap', to: '/contact' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/35 hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={SITE_CONTACT.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/35 hover:text-gold transition-colors"
            >
              uraerotech.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
