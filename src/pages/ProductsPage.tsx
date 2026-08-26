import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import Button from '../components/ui/Button';
import { productApi, settingsApi } from '../services';
import type { Product, Category } from '../types';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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
      productApi.getAll(params).then((r) => {
        setProducts(r.data.data);
        if (r.data.pagination) setPagination(r.data.pagination);
      }),
      settingsApi.getCategories().then((r) => setCategories(r.data.data)),
    ]).finally(() => setLoading(false));
  }, [searchParams]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page');
    setSearchParams(params);
  };

  return (
    <>
      <SEO title="Products & Inventory — UR Aerotech" description="Browse our extensive inventory of certified aircraft parts and aviation tools." />

      <section className="pt-32 pb-16 bg-navy">
        <div className="section-padding !pt-8 !pb-16">
          <div className="container-custom">
            <p className="technical-label text-technical mb-4">Inventory</p>
            <h1 className="heading-xl mb-6">Aircraft Parts & Tools</h1>
            <p className="text-steel text-lg max-w-2xl">
              Browse our extensive inventory of certified aircraft components and specialized tools.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-graphite">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            <aside className="lg:w-64 shrink-0 space-y-6">
              <div>
                <label className="technical-label block mb-2">Search</label>
                <input
                  type="text"
                  defaultValue={search}
                  placeholder="Name, SKU, part #..."
                  className="input-field"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') updateFilter('search', (e.target as HTMLInputElement).value);
                  }}
                />
              </div>
              <div>
                <label className="technical-label block mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="technical-label block mb-2">Condition</label>
                <select value={condition} onChange={(e) => updateFilter('condition', e.target.value)} className="input-field">
                  <option value="">All Conditions</option>
                  <option value="new">New</option>
                  <option value="overhauled">Overhauled</option>
                  <option value="serviceable">Serviceable</option>
                  <option value="as-removed">As Removed</option>
                </select>
              </div>
              <div>
                <label className="technical-label block mb-2">Type</label>
                <select value={saleOrRental} onChange={(e) => updateFilter('saleOrRental', e.target.value)} className="input-field">
                  <option value="">Sale & Rental</option>
                  <option value="sale">For Sale</option>
                  <option value="rental">For Rental</option>
                </select>
              </div>
              <div>
                <label className="technical-label block mb-2">Sort By</label>
                <select value={sort} onChange={(e) => updateFilter('sort', e.target.value)} className="input-field">
                  <option value="-createdAt">Newest</option>
                  <option value="name">Name A-Z</option>
                  <option value="-name">Name Z-A</option>
                </select>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <p className="font-mono text-xs text-steel mb-6">{pagination.total} products found</p>

              {loading ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-72 bg-navy/50 animate-pulse" />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="data-plate p-12 text-center">
                  <p className="text-steel mb-4">No products found matching your criteria.</p>
                  <Button onClick={() => setSearchParams({})} variant="secondary">Clear Filters</Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link key={product._id} to={`/products/${product.slug}`} className="group card-technical !p-0 overflow-hidden hover:border-technical/30">
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={product.images[0]?.url || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80'}
                          alt={product.images[0]?.alt || product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.featured && (
                          <span className="absolute top-3 left-3 bg-amber text-graphite font-mono text-[10px] px-2 py-1 uppercase">Featured</span>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="font-mono text-[10px] text-steel">{product.sku}</p>
                        <h3 className="font-heading text-sm mt-1 group-hover:text-technical transition-colors line-clamp-2">{product.name}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-steel capitalize">{product.condition.replace('-', ' ')}</span>
                          <span className={`text-xs font-mono ${product.availability === 'in-stock' ? 'text-technical' : 'text-steel'}`}>
                            {product.availability.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {pagination.pages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams);
                        params.set('page', String(p));
                        setSearchParams(params);
                      }}
                      className={`w-10 h-10 font-mono text-sm border ${
                        p === pagination.page ? 'border-technical text-technical' : 'border-steel/20 text-steel'
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
    </>
  );
}
