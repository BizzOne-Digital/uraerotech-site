import { useEffect, useState } from 'react';
import SEO, { StructuredData } from '../components/ui/SEO';
import HeroSection from '../sections/HeroSection';
import AboutIntro from '../sections/AboutIntro';
import Statistics from '../sections/Statistics';
import ServicesShowcase from '../sections/ServicesShowcase';
import IndustriesSection from '../sections/IndustriesSection';
import ProductsPreview from '../sections/ProductsPreview';
import ProcessSection from '../sections/ProcessSection';
import WhyChooseUs from '../sections/WhyChooseUs';
import Certifications from '../sections/Certifications';
import CTASection from '../sections/CTASection';
import { getFeaturedProducts, getIndustries, getServices } from '../services/content';
import { settingsApi } from '../services';
import type { SiteSettings, Service, Industry, Product } from '../types';

export default function HomePage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    Promise.all([
      settingsApi.get().then((r) => setSettings(r.data.data)).catch(() => {}),
      getServices().then(setServices),
      getIndustries().then(setIndustries),
      getFeaturedProducts().then(setProducts),
    ]);
  }, []);

  return (
    <>
      <SEO title={settings?.seo?.title} description={settings?.seo?.description} />
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'UR Aerotech',
        url: 'https://uraerotech.com',
        email: 'info@uraerotech.com',
        telephone: '+49-173-250-4540',
      }} />
      <HeroSection data={settings?.hero} />
      <AboutIntro mission={settings?.about?.mission} vision={settings?.about?.vision} />
      <Statistics statistics={settings?.statistics} />
      <ServicesShowcase services={services} />
      <IndustriesSection industries={industries} />
      <ProductsPreview products={products} />
      <ProcessSection />
      <WhyChooseUs />
      <Certifications certifications={settings?.certifications} />
      <CTASection />
    </>
  );
}
