/** Curated Unsplash aviation maintenance & structural repair imagery */
const img = (id: string, w = 1920) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

export const images = {
  hero: '/images/hero-hangar.png',
  heroAlt: img('photo-1581092918056-0c4c3acd3789', 1200),

  about: '/images/hero-hangar.png',
  aboutEngineer: img('photo-1581091226825-a6a2a5aee158', 1200),
  hangar: img('photo-1559629956-d6e1d0896d0f', 1600),
  fuselage: img('photo-1581092160562-40aa08e78837', 1200),
  sheetMetal: img('photo-1581092918056-0c4c3acd3789', 1200),
  tools: img('photo-1581094794329-cd2c90e2b3a0', 1200),
  inspection: img('photo-1581091226825-a6a2a5aee158', 1200),

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
    'aerospace-manufacturing': img('photo-1581092160562-40aa08e78837', 900),
  } as Record<string, string>,

  process: [
    img('photo-1581092918056-0c4c3acd3789', 600),
    img('photo-1581091226825-a6a2a5aee158', 600),
    img('photo-1569629743758-f27aec8d45c2', 600),
    img('photo-1581094794329-cd2c90e2b3a0', 600),
  ],

  whyChoose: '/images/hero-hangar.png',
  cta: '/images/hero-hangar.png',
  products: img('photo-1581092160562-40aa08e78837', 1200),
  certification: img('photo-1581091226825-a6a2a5aee158', 1000),

  /** Fallback if any image fails to load */
  fallback: '/images/hero-hangar.png',
};

export function getServiceImage(slug: string, index = 0): string {
  return images.services[slug] || Object.values(images.services)[index % 6] || images.fallback;
}

export function getIndustryImage(slug: string, index = 0): string {
  return images.industries[slug] || Object.values(images.industries)[index % 6] || images.fallback;
}
