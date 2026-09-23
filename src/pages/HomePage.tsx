import { useEffect, useState } from 'react';
import SEO, { StructuredData } from '../components/ui/SEO';
import HeroSection from '../sections/HeroSection';
import ServicesShowcase from '../sections/ServicesShowcase';
import ProcessSection from '../sections/ProcessSection';
import IndustriesSection from '../sections/IndustriesSection';
import HomeMissionSection from '../sections/HomeMissionSection';
import CTASection from '../sections/CTASection';
import { getIndustries, getServices } from '../services/content';
import { settingsApi } from '../services';
import type { SiteSettings, Service, Industry } from '../types';

export default function HomePage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);

  useEffect(() => {
    Promise.all([
      settingsApi.get().then((r) => setSettings(r.data.data)).catch(() => {}),
      getServices().then(setServices),
      getIndustries().then(setIndustries),
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
      <HeroSection data={settings?.hero} statistics={settings?.statistics} />
      <ServicesShowcase services={services} />
      <ProcessSection />
      <IndustriesSection industries={industries} />
      <HomeMissionSection mission={settings?.about?.mission} />
      <CTASection />
    </>
  );
}
