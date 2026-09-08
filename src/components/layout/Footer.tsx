import { Link } from 'react-router-dom';
import { IconMail, IconPhone, IconMapPin, IconArrowRight } from '../icons';
import Logo from '../ui/Logo';

const serviceLinks = [
  { label: 'Structural Repair', to: '/services/aircraft-structural-repair' },
  { label: 'Modifications', to: '/services/aircraft-structure-modification' },
  { label: 'SB Compliance', to: '/services/service-bulletin-compliance' },
  { label: 'Parts Supply', to: '/services/aircraft-parts-supply' },
  { label: 'All Services', to: '/services' },
];

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Industries', to: '/industries' },
  { label: 'Products', to: '/products' },
  { label: 'Contact', to: '/contact' },
  { label: 'Request a Quote', to: '/quote' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-graphite overflow-x-clip">
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#4A90C2 1px, transparent 1px), linear-gradient(90deg, #4A90C2 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#4A90C2]/40 to-transparent" />

      {/* CTA strip */}
      <div className="relative border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#4A90C2] mb-3">
                Ready to start?
              </p>
              <h3 className="font-heading text-2xl md:text-3xl text-white leading-tight max-w-lg">
                Expert structural repair &amp; certified parts — worldwide
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
              <Link to="/quote" className="btn-hero-gold w-full sm:w-auto justify-center">
                Request a Quote
                <IconArrowRight size={14} />
              </Link>
              <Link to="/contact" className="btn-hero-ghost w-full sm:w-auto justify-center">
                Contact Us
                <IconArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* main footer */}
      <div className="relative px-5 sm:px-8 lg:px-10 py-14 md:py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-4">
              <Logo height="lg" className="mb-6" />
              <p className="text-sm text-white/50 leading-relaxed max-w-sm mb-8">
                Aircraft structural repair, modification, and certified parts supply.
                Serving airlines, MROs, and operators from Gangelt, Germany.
              </p>
              <div className="flex flex-wrap gap-2">
                {['FAA Standards', 'EASA Compliant', '20+ Years'].map((badge) => (
                  <span
                    key={badge}
                    className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#4A90C2]/80 border border-[#4A90C2]/20 px-3 py-1.5"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="lg:col-span-2 lg:col-start-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#4A90C2] mb-6">Services</p>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/50 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#4A90C2] transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#4A90C2] mb-6">Company</p>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/50 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#4A90C2] transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#4A90C2] mb-6">Contact</p>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:info@uraerotech.com"
                    className="flex items-start gap-3 text-sm text-white/50 hover:text-white transition-colors group"
                  >
                    <IconMail size={16} className="text-[#4A90C2] shrink-0 mt-0.5" />
                    info@uraerotech.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+491732504540"
                    className="flex items-start gap-3 text-sm text-white/50 hover:text-white transition-colors"
                  >
                    <IconPhone size={16} className="text-[#4A90C2] shrink-0 mt-0.5" />
                    +49 173 250 4540
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+491732498648"
                    className="flex items-start gap-3 text-sm text-white/50 hover:text-white transition-colors"
                  >
                    <IconPhone size={16} className="text-[#4A90C2] shrink-0 mt-0.5" />
                    +49 173 249 8648
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/50">
                  <IconMapPin size={16} className="text-[#4A90C2] shrink-0 mt-0.5" />
                  <span>Gaterstr. 66B, 52538 Gangelt, Germany</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="relative border-t border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-mono text-[10px] text-white/30 tracking-wider">
            © {year} UR Aerotech GmbH. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link to="/contact" className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30 hover:text-[#4A90C2] transition-colors">
              Privacy
            </Link>
            <Link to="/contact" className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30 hover:text-[#4A90C2] transition-colors">
              Terms
            </Link>
            <a
              href="https://uraerotech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30 hover:text-[#4A90C2] transition-colors"
            >
              uraerotech.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
