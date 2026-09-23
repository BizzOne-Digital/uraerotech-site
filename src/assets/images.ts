/** Cinematic section photography — do not use for page hero bands. */
export const sectionPhotos = [
  '/images/sections/section-hangar-sunset.jpg',
  '/images/sections/section-tarmac-sunset.jpg',
  '/images/sections/section-structural-open.jpg',
  '/images/sections/section-hangar-night.jpg',
  '/images/sections/section-tools-engine.jpg',
] as const;

/** Top-of-page heroes only (unchanged stock assets). */
export const pageHero = {
  about: '/images/about-engineer.jpg',
  services: '/images/services/aircraft-structural-repair.jpg',
  industries: '/images/industries/commercial-aviation.jpg',
  products: '/images/services/aviation-tools-sales.jpg',
  contact: '/images/cta-hangar.jpg',
  quote: '/images/hero-hangar.jpg',
  default: '/images/hero-hangar.jpg',
};

export const images = {
  hero: '/images/hero-hangar.jpg',
  about: sectionPhotos[2],
  aboutEngineer: sectionPhotos[4],
  hangar: sectionPhotos[0],
  fuselage: sectionPhotos[2],
  sheetMetal: sectionPhotos[2],
  tools: sectionPhotos[4],
  inspection: sectionPhotos[0],

  sections: {
    hangarSunset: sectionPhotos[0],
    tarmacSunset: sectionPhotos[1],
    structuralOpen: sectionPhotos[2],
    hangarNight: sectionPhotos[3],
    toolsEngine: sectionPhotos[4],
  },

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
    sectionPhotos[2],
    sectionPhotos[4],
    sectionPhotos[0],
    sectionPhotos[3],
  ],

  whyChoose: sectionPhotos[1],
  cta: '/images/cta-hangar.jpg',
  products: sectionPhotos[4],
  certification: sectionPhotos[2],

  fallback: sectionPhotos[0],
};

export function getSectionPhoto(index = 0): string {
  return sectionPhotos[index % sectionPhotos.length];
}

export function getServiceImage(slug: string, index = 0): string {
  if (images.services[slug]) return images.services[slug];
  const bySlug = `/images/services/${slug}.jpg`;
  return bySlug || Object.values(images.services)[index % 6] || images.fallback;
}

export function getIndustryImage(slug: string, index = 0): string {
  if (images.industries[slug]) return images.industries[slug];
  const bySlug = `/images/industries/${slug}.jpg`;
  return bySlug || Object.values(images.industries)[index % 6] || images.fallback;
}
