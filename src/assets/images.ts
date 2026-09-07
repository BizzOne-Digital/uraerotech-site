export const images = {
  hero: '/images/hero-hangar.jpg',
  about: '/images/about-engineer.jpg',
  aboutEngineer: '/images/about-engineer.jpg',
  hangar: '/images/hero-hangar.jpg',
  fuselage: '/images/services/aircraft-structural-repair.jpg',
  sheetMetal: '/images/services/aircraft-structural-repair.jpg',
  tools: '/images/services/aviation-tools-sales.jpg',
  inspection: '/images/process/01-assessment.jpg',

  services: {
    'aircraft-structural-repair': '/images/services/aircraft-structural-repair.jpg',
    'aircraft-structure-modification': '/images/services/aircraft-structure-modification.jpg',
    'service-bulletin-compliance': '/images/services/service-bulletin-compliance.jpg',
    'aircraft-parts-supply': '/images/services/aircraft-parts-supply.jpg',
    'aviation-tools-sales': '/images/services/aviation-tools-sales.jpg',
    'aviation-tool-rental': '/images/services/aviation-tool-rental.jpg',
  } as Record<string, string>,

  industries: {
    'commercial-aviation': '/images/industries/commercial-aviation.jpg',
    'private-general-aviation': '/images/industries/private-general-aviation.jpg',
    'cargo-freight': '/images/industries/cargo-freight.jpg',
    'military-defense': '/images/industries/military-defense.jpg',
    'helicopter-services': '/images/industries/helicopter-services.jpg',
    'aerospace-manufacturing': '/images/industries/aerospace-manufacturing.jpg',
  } as Record<string, string>,

  process: [
    '/images/process/01-assessment.jpg',
    '/images/process/02-engineering.jpg',
    '/images/process/03-repair.jpg',
    '/images/process/04-inspection.jpg',
  ],

  whyChoose: '/images/why-choose-team.jpg',
  cta: '/images/cta-hangar.jpg',
  products: '/images/products-feature.jpg',
  certification: '/images/certification.jpg',

  fallback: '/images/hero-hangar.jpg',
};

export function getServiceImage(slug: string, index = 0): string {
  return images.services[slug] || Object.values(images.services)[index % 6] || images.fallback;
}

export function getIndustryImage(slug: string, index = 0): string {
  return images.industries[slug] || Object.values(images.industries)[index % 6] || images.fallback;
}
