/** Home page image map — every asset under `public/images` (except logo). */
export const homeImages = {
  hero: '/images/hero-hangar.jpg',
  heroBlueprint: '/images/hero-hangar.png',
  cta: '/images/cta-hangar.jpg',
  about: '/images/about-engineer.jpg',
  certification: '/images/certification.jpg',
  productsFeature: '/images/products-feature.jpg',
  whyChoose: '/images/why-choose-team.jpg',
  services: {
    'aircraft-structural-repair': '/images/services/aircraft-structural-repair.jpg',
    'aircraft-structure-modification': '/images/services/aircraft-structure-modification.jpg',
    'service-bulletin-compliance': '/images/services/service-bulletin-compliance.jpg',
    'aircraft-parts-supply': '/images/services/aircraft-parts-supply.jpg',
    'aviation-tools-sales': '/images/services/aviation-tools-sales.jpg',
    'aviation-tool-rental': '/images/services/aviation-tool-rental.jpg',
  },
  industries: {
    'commercial-aviation': '/images/industries/commercial-aviation.jpg',
    'cargo-freight': '/images/industries/cargo-freight.jpg',
    'military-defense': '/images/industries/military-defense.jpg',
    'helicopter-services': '/images/industries/helicopter-services.jpg',
    'private-general-aviation': '/images/industries/private-general-aviation.jpg',
    'aerospace-manufacturing': '/images/industries/aerospace-manufacturing.jpg',
  },
  process: [
    '/images/process/01-assessment.jpg',
    '/images/process/02-engineering.jpg',
    '/images/process/03-repair.jpg',
    '/images/process/04-inspection.jpg',
  ],
  sections: {
    hangarSunset: '/images/sections/section-hangar-sunset.jpg',
    tarmacSunset: '/images/sections/section-tarmac-sunset.jpg',
    structuralOpen: '/images/sections/section-structural-open.jpg',
    hangarNight: '/images/sections/section-hangar-night.jpg',
    toolsEngine: '/images/sections/section-tools-engine.jpg',
  },
} as const;

export const homeServiceBlurbs: Record<string, string> = {
  'aircraft-structural-repair': 'Certified structural repairs that restore airworthiness and strength.',
  'aircraft-structure-modification': 'Engineered modifications aligned with OEM and regulatory data.',
  'service-bulletin-compliance': 'SB and AD compliance with full documentation packages.',
  'aircraft-parts-supply': 'Traceable airframe parts and hardware from a global network.',
  'aviation-tools-sales': 'Professional tooling for inspection, torque, and line maintenance.',
  'aviation-tool-rental': 'Flexible rental programs to keep your MRO moving.',
};

export function getHomeServiceImage(slug: string, index: number): string {
  return (
    homeImages.services[slug as keyof typeof homeImages.services] ||
    Object.values(homeImages.services)[index % 6]
  );
}

export function getHomeIndustryImage(slug: string, index: number): string {
  return (
    homeImages.industries[slug as keyof typeof homeImages.industries] ||
    Object.values(homeImages.industries)[index % 6]
  );
}
