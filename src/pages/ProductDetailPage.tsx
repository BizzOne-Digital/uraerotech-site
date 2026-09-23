import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import Button from '../components/ui/Button';
import { getProductBySlug, getRelatedProducts } from '../services/content';
import type { Product } from '../types';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getProductBySlug(slug).then(setProduct).finally(() => setLoading(false));
    getRelatedProducts(slug).then(setRelated);
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-graphite"><div className="font-mono text-steel animate-pulse">Loading...</div></div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-graphite">
        <div className="text-center">
          <h1 className="heading-md mb-4">Product Not Found</h1>
          <Button to="/products" variant="primary">Back to Inventory</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title={`${product.name} — UR Aerotech`} description={product.description} />

      <section className="section-padding bg-midnight !pt-32 border-b border-white/[0.06]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="aspect-square overflow-hidden border border-gold/20 mb-4">
                <img
                  src={product.images[activeImage]?.url || ''}
                  alt={product.images[activeImage]?.alt || product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-20 overflow-hidden border ${i === activeImage ? 'border-gold' : 'border-white/20'}`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="font-mono text-xs text-gold mb-2">{product.sku}</p>
              <h1 className="font-display text-3xl text-white mb-4">{product.name}</h1>

              <div className="border border-gold/20 p-4 mb-6 space-y-2 font-mono text-sm bg-[#0d1522]">
                {product.partNumber && <div className="flex justify-between"><span className="text-white/45">Part Number</span><span className="text-white">{product.partNumber}</span></div>}
                {product.manufacturer && <div className="flex justify-between"><span className="text-white/45">Manufacturer</span><span className="text-white">{product.manufacturer}</span></div>}
                <div className="flex justify-between"><span className="text-white/45">Condition</span><span className="capitalize text-white">{product.condition.replace('-', ' ')}</span></div>
                <div className="flex justify-between"><span className="text-white/45">Availability</span><span className="capitalize text-gold">{product.availability.replace('-', ' ')}</span></div>
                <div className="flex justify-between"><span className="text-white/45">Type</span><span className="capitalize text-white">{product.saleOrRental}</span></div>
                {product.showPrice && product.price && (
                  <div className="flex justify-between"><span className="text-white/45">Price</span><span className="text-white">€{product.price.toLocaleString()}</span></div>
                )}
              </div>

              <p className="text-white/60 leading-relaxed mb-8">{product.description}</p>

              <Button to={`/quote?product=${product._id}&type=product`} variant="amber" className="w-full justify-center mb-4 !bg-gold !text-midnight hover:!bg-amber">
                Request Product Quote
              </Button>
            </div>
          </div>

          {product.specifications?.length > 0 && (
            <div className="mt-16">
              <p className="font-mono text-[10px] uppercase tracking-widest text-gold mb-6">Specifications</p>
              <div className="border border-white/[0.08] overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {product.specifications.map((spec, i) => (
                      <tr key={i} className="border-b border-white/[0.06] last:border-0">
                        <td className="p-4 font-mono text-sm text-white/45 w-1/3">{spec.key}</td>
                        <td className="p-4 text-sm text-white/80">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {product.certifications && (
            <div className="mt-8 border border-gold/20 p-6">
              <h3 className="font-display text-lg text-white mb-2">Certification</h3>
              <p className="text-white/55 text-sm">{product.certifications}</p>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding bg-[#0d1522]">
          <div className="container-custom">
            <p className="font-mono text-[10px] uppercase tracking-widest text-gold mb-8">Related Products</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <a key={p._id} href={`/products/${p.slug}`} className="border border-white/[0.08] overflow-hidden hover:border-gold/30 transition-colors group">
                  <img src={p.images[0]?.url} alt={p.name} className="w-full aspect-square object-cover" />
                  <div className="p-4">
                    <h3 className="text-sm text-white group-hover:text-gold transition-colors">{p.name}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
