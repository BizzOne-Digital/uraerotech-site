import { Link } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import { images } from '../assets/images';
import type { Product } from '../types';

export default function ProductsPreview({ products = [] }: { products?: Product[] }) {
  return (
    <section className="section-dark">
      <div className="section-pad">
        <div className="site-container">
          <SectionHeader
            label="Inventory"
            title="Aircraft parts & tools"
            description="Certified components and specialized aviation tooling — ready when you need them."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {(products.length ? products.slice(0, 4) : [1, 2, 3, 4]).map((item, i) => {
              const product = typeof item === 'object' ? item : null;
              return (
                <Link
                  key={product?._id || i}
                  to={product ? `/products/${product.slug}` : '/products'}
                  className="group card"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product?.images[0]?.url || [images.fuselage, images.sheetMetal, images.tools, images.hangar][i]}
                      alt={product?.name || 'Aviation parts'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 border-t border-white/[0.06]">
                    <p className="font-mono text-[10px] text-technical mb-1">{product?.sku || 'INVENTORY'}</p>
                    <h3 className="font-heading text-sm text-white line-clamp-2">{product?.name || 'Browse our catalog'}</h3>
                  </div>
                </Link>
              );
            })}
          </div>

          <Button to="/products" variant="outline">Browse Full Inventory</Button>
        </div>
      </div>
    </section>
  );
}
