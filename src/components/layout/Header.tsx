import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../../hooks/useReducedMotion';
import { useAuth } from '../../hooks/useAuth';
import { IconMenu, IconClose, IconSearch } from '../icons';
import Logo from '../ui/Logo';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Products', href: '/products' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const scrollY = useScrollPosition();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const scrolled = scrollY > 50;
  const isHome = location.pathname === '/';

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const linkClass = (href: string) => {
    const active = href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);
    return `text-[11px] uppercase tracking-[0.18em] transition-colors ${
      active ? 'text-[#58a6ff]' : 'text-white/80 hover:text-white'
    }`;
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[70] transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0d12]/95 backdrop-blur-md border-b border-white/[0.06] py-3'
            : isHome
              ? 'bg-gradient-to-b from-[#0a0d12]/70 to-transparent py-5 md:py-6'
              : 'bg-[#0a0d12]/90 backdrop-blur-md py-4'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 flex items-center justify-between gap-3 sm:gap-6 min-w-0">
          <div className="min-w-0 shrink">
            <Logo height="md" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white/70 hover:text-[#58a6ff] transition-colors p-1"
              aria-label="Search"
            >
              <IconSearch size={18} />
            </button>
            {user ? (
              <Link
                to={user.role === 'admin' || user.role === 'superadmin' ? '/admin' : '/dashboard'}
                className="text-[11px] uppercase tracking-[0.15em] text-white/70 hover:text-white"
              >
                {user.firstName}
              </Link>
            ) : (
              <Link to="/login" className="text-[11px] uppercase tracking-[0.15em] text-white/70 hover:text-white">
                Sign In
              </Link>
            )}
            <Link
              to="/quote"
              className="inline-flex items-center px-5 py-2.5 bg-[#e2b04a] text-[#0a0d12] text-[10px] font-semibold uppercase tracking-[0.15em] hover:bg-[#ecc55e] transition-colors"
            >
              Request a Quote
            </Link>
          </div>

          <button className="lg:hidden text-white p-2 shrink-0" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <IconClose size={22} /> : <IconMenu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-white/[0.06] overflow-hidden"
            >
              <form action="/products" className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 py-3 flex gap-3">
                <input name="search" type="text" placeholder="Search products, SKU, part number..." className="input flex-1" autoFocus />
                <button type="submit" className="px-5 py-2 bg-[#e2b04a] text-[#0a0d12] text-xs uppercase tracking-wider font-semibold">Search</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden flex flex-col pt-24 px-6 sm:px-8 pb-8 bg-[#0a0d12] overflow-y-auto"
          >
            <nav className="flex-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-xl font-heading text-white border-b border-white/[0.06]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3 shrink-0">
              <Link to="/quote" onClick={() => setOpen(false)} className="btn-hero-gold text-center justify-center">
                Request a Quote
              </Link>
              <Link
                to={user ? (user.role === 'admin' || user.role === 'superadmin' ? '/admin' : '/dashboard') : '/login'}
                onClick={() => setOpen(false)}
                className="btn-hero-ghost text-center justify-center"
              >
                {user ? user.firstName : 'Sign In'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
