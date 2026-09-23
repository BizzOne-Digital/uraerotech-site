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
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkClass = (href: string) => {
    const active = href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);
    return `text-[11px] uppercase tracking-[0.18em] transition-colors ${
      active ? 'text-gold' : 'text-white/80 hover:text-white'
    }`;
  };

  const headerPad = scrolled ? 'py-2.5 sm:py-3' : isHome ? 'py-3 sm:py-5 md:py-6' : 'py-3 sm:py-4';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[80] transition-all duration-500 pt-[env(safe-area-inset-top,0px)] ${headerPad} ${
          scrolled
            ? 'bg-graphite/95 backdrop-blur-md border-b border-white/[0.08]'
            : isHome
              ? 'bg-gradient-to-b from-graphite/75 to-transparent'
              : 'bg-graphite/90 backdrop-blur-md'
        }`}
      >
        <div className="max-w-[1440px] mx-auto page-x flex items-center justify-between gap-2 sm:gap-6 min-w-0">
          <div className="min-w-0 shrink max-w-[68%] xs:max-w-none sm:max-w-none">
            <Logo height="lg" />
          </div>

          <nav className="hidden xl:flex items-center gap-5 2xl:gap-8 shrink-0">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="touch-target text-white/70 hover:text-technical transition-colors flex items-center justify-center"
              aria-label="Search"
            >
              <IconSearch size={18} />
            </button>
            {user && (user.role === 'admin' || user.role === 'superadmin') && (
              <Link
                to="/admin"
                className="text-[11px] uppercase tracking-[0.15em] text-white/70 hover:text-white whitespace-nowrap"
              >
                Admin
              </Link>
            )}
            <Link
              to="/quote"
              className="inline-flex items-center min-h-[44px] px-4 xl:px-5 py-2.5 bg-gold text-midnight text-[10px] font-semibold uppercase tracking-[0.12em] xl:tracking-[0.15em] hover:bg-amber transition-colors whitespace-nowrap"
            >
              Request a Quote
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden touch-target text-white flex items-center justify-center shrink-0 -mr-1"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
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
              <form action="/products" className="max-w-[1440px] mx-auto page-x py-3 flex flex-col xs:flex-row gap-3">
                <input
                  name="search"
                  type="search"
                  placeholder="Search products, SKU, part number..."
                  className="input flex-1 min-h-[44px] min-w-0"
                  autoFocus
                />
                <button
                  type="submit"
                  className="min-h-[44px] px-5 py-2 bg-[#e2b04a] text-graphite text-xs uppercase tracking-wider font-semibold shrink-0"
                >
                  Search
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[75] lg:hidden bg-black/50 backdrop-blur-sm"
              aria-label="Close menu overlay"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 right-0 z-[76] lg:hidden flex flex-col w-[min(100vw,22rem)] max-w-full bg-navy shadow-2xl overflow-y-auto overscroll-contain"
              style={{
                paddingTop: 'calc(4.5rem + env(safe-area-inset-top, 0px))',
                paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
              }}
            >
              <nav className="flex-1 page-x">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center min-h-[48px] py-2 text-lg font-heading text-white border-b border-white/[0.06] break-anywhere"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-6 page-x flex flex-col gap-3 shrink-0">
                <Link to="/quote" onClick={() => setOpen(false)} className="btn-hero-gold text-center justify-center min-h-[48px]">
                  Request a Quote
                </Link>
                {user && (user.role === 'admin' || user.role === 'superadmin') && (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="btn-hero-ghost text-center justify-center min-h-[48px] border-gold/40 text-gold"
                  >
                    Admin
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
