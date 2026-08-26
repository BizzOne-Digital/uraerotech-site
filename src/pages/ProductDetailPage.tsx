import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import Button from '../components/ui/Button';
import { productApi } from '../services';
import type { Product } from '../types';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    productApi.getBySlug(slug).then((r) => {
      setProduct(r.data.data);
    }).finally(() => setLoading(false));
    productApi.getRelated(slug).then((r) => setRelated(r.data.data)).catch(() => {});
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

      <section className="section-padding bg-graphite !pt-32">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="aspect-square overflow-hidden data-plate mb-4">
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
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-20 overflow-hidden border ${i === activeImage ? 'border-technical' : 'border-steel/20'}`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="font-mono text-xs text-technical mb-2">{product.sku}</p>
              <h1 className="heading-lg mb-4">{product.name}</h1>

              <div className="data-plate p-4 mb-6 space-y-2 font-mono text-sm">
                {product.partNumber && <div className="flex justify-between"><span className="text-steel">Part Number</span><span>{product.partNumber}</span></div>}
                {product.manufacturer && <div className="flex justify-between"><span className="text-steel">Manufacturer</span><span>{product.manufacturer}</span></div>}
                <div className="flex justify-between"><span className="text-steel">Condition</span><span className="capitalize">{product.condition.replace('-', ' ')}</span></div>
                <div className="flex justify-between"><span className="text-steel">Availability</span><span className="capitalize text-technical">{product.availability.replace('-', ' ')}</span></div>
                <div className="flex justify-between"><span className="text-steel">Type</span><span className="capitalize">{product.saleOrRental}</span></div>
                {product.showPrice && product.price && (
                  <div className="flex justify-between"><span className="text-steel">Price</span><span>€{product.price.toLocaleString()}</span></div>
                )}
              </div>

              <p className="text-steel leading-relaxed mb-8">{product.description}</p>

              <Button to={`/quote?product=${product._id}&type=product`} variant="amber" className="w-full justify-center mb-4">
                Request Product Quote
              </Button>
            </div>
          </div>

          {product.specifications?.length > 0 && (
            <div className="mt-16">
              <h2 className="heading-md mb-6">Specifications</h2>
              <div className="data-plate overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {product.specifications.map((spec, i) => (
                      <tr key={i} className="border-b border-steel/10 last:border-0">
                        <td className="p-4 font-mono text-sm text-steel w-1/3">{spec.key}</td>
                        <td className="p-4 text-sm">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {product.certifications && (
            <div className="mt-8 data-plate p-6">
              <h3 className="font-heading text-lg mb-2">Certification</h3>
              <p className="text-steel text-sm">{product.certifications}</p>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding bg-navy">
          <div className="container-custom">
            <h2 className="heading-md mb-8">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <a key={p._id} href={`/products/${p.slug}`} className="data-plate !p-0 overflow-hidden hover:border-technical/30 transition-colors group">
                  <img src={p.images[0]?.url} alt={p.name} className="w-full aspect-square object-cover" />
                  <div className="p-4">
                    <h3 className="font-heading text-sm group-hover:text-technical transition-colors">{p.name}</h3>
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
