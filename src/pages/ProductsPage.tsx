import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import PageHero from '../components/ui/PageHero';
import ScrollReveal from '../components/ui/ScrollReveal';
import CTASection from '../sections/CTASection';
import StatsBar from '../components/ui/StatsBar';
import { IconArrowRight, IconBox, IconGlobe, IconShield, IconWrench, IconCheck } from '../components/icons';
import { getSectionPhoto, images, pageHero } from '../assets/images';
import { getCategories, getProducts } from '../services/content';
import type { Product, Category } from '../types';

const productStats = [
  { value: '50,000+', label: 'Parts in Stock' },
  { value: '1,000+', label: 'Global Suppliers' },
  { value: 'Same-Day', label: 'Shipping Available' },
  { value: 'OEM', label: 'Certified Parts & Tools' },
];

const categories = [
  {
    title: 'Aircraft Parts Supply',
    desc: 'Structural components, fasteners, and airframe hardware.',
    icon: IconBox,
    filter: 'sale',
    image: getSectionPhoto(2),
  },
  {
    title: 'Professional Tool Sales',
    desc: 'Inspection equipment, torque tools, and calibrated kits.',
    icon: IconWrench,
    filter: 'sale',
    image: getSectionPhoto(4),
  },
  {
    title: 'Flexible Tool Rental',
    desc: 'Pneumatic tools and specialized repair kits on demand.',
    icon: IconShield,
    filter: 'rental',
    image: getSectionPhoto(1),
  },
];

const rentalSteps = [
  { step: '01', title: 'Select', desc: 'Browse available tools and rental terms.' },
  { step: '02', title: 'Schedule', desc: 'Choose rental period and delivery details.' },
  { step: '03', title: 'Receive', desc: 'Tools shipped to your MRO or line station.' },
  { step: '04', title: 'Return', desc: 'Send back when the job is complete.' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const condition = searchParams.get('condition') || '';
  const saleOrRental = searchParams.get('saleOrRental') || '';
  const sort = searchParams.get('sort') || '-createdAt';

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = { page: searchParams.get('page') || '1', sort };
    if (search) params.search = search;
    if (category) params.category = category;
    if (condition) params.condition = condition;
    if (saleOrRental) params.saleOrRental = saleOrRental;

    Promise.all([
      getProducts(params).then(({ data, pagination: p }) => {
        setProducts(data);
        setPagination(p);
      }),
      getCategories().then(setCats),
    ]).finally(() => setLoading(false));
  }, [searchParams, search, category, condition, saleOrRental, sort]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page');
    setSearchParams(params);
  };

  return (
    <>
      <SEO title="Tools & Parts — UR Aerotech" description="Browse certified aircraft parts and aviation tools — sales and rental." />

      <PageHero
        eyebrow="Tools & Parts"
        headline="The Right Parts. The Right Tools. Ready When You Are."
        subheadline="OEM-certified components and professional tooling with traceability, inspection, and rapid logistics."
        image={pageHero.products}
        primaryLabel="Browse Products"
        primaryTo="#inventory"
        secondaryLabel="Get a Quote"
        secondaryTo="/quote"
        showStats={false}
        verticalTagline="Precision Supports Higher Standards"
      />

      <StatsBar stats={productStats} sideTagline="Precision Supports Higher Standards" />

      <section className="bg-midnight border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Our Product Categories</p>
            <h2 className="font-display text-2xl md:text-3xl text-white">Everything You Need to Keep Aircraft Moving</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.title} delay={i * 0.06}>
                <Link
                  to={`/products?saleOrRental=${cat.filter}#inventory`}
                  className="block group border border-white/[0.08] border-t-2 border-t-gold/50 bg-[#0d1522] p-6 hover:border-gold/30 transition-colors"
                >
                  <cat.icon size={28} className="text-gold mb-4" />
                  <h3 className="text-white font-medium mb-2">{cat.title}</h3>
                  <p className="text-sm text-white/55 mb-4">{cat.desc}</p>
                  <span className="inline-flex items-center gap-2 text-gold text-[10px] uppercase tracking-widest">
                    Explore
                    <IconArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="inventory" className="bg-[#0d1522] border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
          <ScrollReveal className="mb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Inventory</p>
            <h2 className="font-display text-2xl text-white">Browse Catalog</h2>
          </ScrollReveal>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 shrink-0 space-y-5">
              <div>
                <label className="font-mono text-[9px] uppercase tracking-widest text-gold block mb-2">Search</label>
                <input
                  type="text"
                  defaultValue={search}
                  placeholder="Name, SKU, part #..."
                  className="input border-gold/20 focus:border-gold/50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') updateFilter('search', (e.target as HTMLInputElement).value);
                  }}
                />
              </div>
              <div>
                <label className="font-mono text-[9px] uppercase tracking-widest text-gold block mb-2">Category</label>
                <select value={category} onChange={(e) => updateFilter('category', e.target.value)} className="input border-gold/20">
                  <option value="">All Categories</option>
                  {cats.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-mono text-[9px] uppercase tracking-widest text-gold block mb-2">Type</label>
                <select value={saleOrRental} onChange={(e) => updateFilter('saleOrRental', e.target.value)} className="input border-gold/20">
                  <option value="">Sale & Rental</option>
                  <option value="sale">For Sale</option>
                  <option value="rental">For Rental</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[9px] uppercase tracking-widest text-gold block mb-2">Condition</label>
                <select value={condition} onChange={(e) => updateFilter('condition', e.target.value)} className="input border-gold/20">
                  <option value="">All Conditions</option>
                  <option value="new">New</option>
                  <option value="overhauled">Overhauled</option>
                  <option value="serviceable">Serviceable</option>
                  <option value="as-removed">As Removed</option>
                </select>
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <p className="font-mono text-xs text-white/40 mb-6">{pagination.total} products found</p>
              {loading ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-72 bg-white/[0.03] animate-pulse" />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="border border-gold/20 p-12 text-center">
                  <p className="text-white/50 mb-4">No products found matching your criteria.</p>
                  <button type="button" onClick={() => setSearchParams({})} className="btn-hero-ghost border-gold/40 text-gold">
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link
                      key={product._id}
                      to={`/products/${product.slug}`}
                      className="group border border-white/[0.08] overflow-hidden bg-midnight hover:border-gold/30 transition-colors"
                    >
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={product.images[0]?.url || getSectionPhoto(2)}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-mono text-[10px] text-gold/70">{product.sku}</p>
                        <h3 className="text-sm text-white mt-1 line-clamp-2 group-hover:text-gold transition-colors">{product.name}</h3>
                        <p className="text-xs text-white/40 mt-2 capitalize">{product.availability.replace('-', ' ')}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {pagination.pages > 1 && (
                <div className="flex justify-center gap-2 mt-8 flex-wrap">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        const params = new URLSearchParams(searchParams);
                        params.set('page', String(p));
                        setSearchParams(params);
                      }}
                      className={`w-10 h-10 font-mono text-sm border ${
                        p === pagination.page ? 'border-gold text-gold' : 'border-white/20 text-white/40'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-midnight border-b border-white/[0.06] overflow-hidden">
        <img src={images.sections.structuralOpen} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" aria-hidden />
        <div className="absolute inset-0 bg-midnight/80" />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">OEM Partners</p>
            <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Trusted Parts from Leading OEMs</h2>
            <p className="text-white/60 mb-8">Genuine sources and documented traceability for critical airframe components.</p>
            <Link to="/contact" className="btn-hero-gold inline-flex">
              Our Suppliers
              <IconArrowRight size={14} />
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="flex flex-wrap gap-4 justify-center lg:justify-end opacity-70">
            {['Boeing', 'Airbus', 'GE Aerospace', 'Collins', 'Pratt & Whitney', 'Honeywell'].map((name) => (
              <span key={name} className="px-4 py-2 border border-white/20 text-xs text-white/60 uppercase tracking-wider">
                {name}
              </span>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#0d1522] border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
          <ScrollReveal className="text-center mb-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Tool Rental</p>
            <h2 className="font-display text-2xl text-white">Simple. Fast. Reliable.</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rentalSteps.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 0.06}>
                <span className="font-mono text-gold text-sm">{s.step}</span>
                <h3 className="text-white font-medium mt-2 mb-2">{s.title}</h3>
                <p className="text-sm text-white/55">{s.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-midnight border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Quality</p>
            <h2 className="font-display text-2xl text-white mb-6">Certified. Inspected. Ready.</h2>
            <ul className="space-y-3">
              {['OEM certified where applicable', 'Rigorous inspection', 'Industry compliance', 'Performance verified'].map((line) => (
                <li key={line} className="flex gap-2 text-sm text-white/65">
                  <IconCheck size={16} className="text-gold shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <img src={images.products} alt="Quality aviation parts" className="w-full aspect-[4/3] object-cover" />
          </ScrollReveal>
        </div>
      </section>

      <section className="relative min-h-[280px] flex items-center overflow-hidden">
        <img src={images.cta} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
        <div className="absolute inset-0 bg-midnight/85" />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 text-center w-full">
          <IconGlobe size={32} className="text-gold mx-auto mb-4" />
          <h2 className="font-display text-xl md:text-2xl text-white mb-2">Global Logistics. Rapid Delivery.</h2>
          <p className="text-white/55 text-sm">Where you are — we deliver.</p>
        </div>
      </section>

      <CTASection
        eyebrow="Equip Your Project"
        title="Ready to Equip Your Next Project?"
        description="Keep every job moving with parts and tools from UR Aerotech."
        primaryLabel="Get a Quote"
        secondaryLabel="Browse Products"
        secondaryTo="/products#inventory"
      />
    </>
  );
}
