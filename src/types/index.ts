export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin' | 'superadmin';
  accountType: 'individual' | 'business';
  isVerified?: boolean;
  phone?: string;
  company?: string;
  savedProducts?: string[];
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  partNumber?: string;
  manufacturer?: string;
  category: Category | string;
  description: string;
  specifications: { key: string; value: string }[];
  condition: 'new' | 'overhauled' | 'serviceable' | 'as-removed';
  saleOrRental: 'sale' | 'rental' | 'both';
  quantity: number;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock' | 'on-order';
  price?: number;
  showPrice: boolean;
  quoteOnly: boolean;
  featured: boolean;
  images: { url: string; publicId: string; alt?: string }[];
  documents: { name: string; url: string; publicId: string }[];
  certifications?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  tagline: string;
  overview: string;
  whatWeDo: string;
  whyItMatters: string;
  capabilities: string[];
  process: { step: number; title: string; description: string }[];
  heroImage?: string;
  gallery: string[];
  order: number;
}

export interface Industry {
  _id: string;
  title: string;
  slug: string;
  description: string;
  capabilities: string[];
  image?: string;
  order: number;
}

export interface QuoteRequest {
  _id: string;
  reference: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  status: string;
  urgency: string;
  isAOG: boolean;
  message: string;
  createdAt: string;
  statusHistory: { status: string; note?: string; changedAt: string }[];
}

export interface SiteSettings {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    image: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    mission: string;
    vision: string;
    history: string;
    values: { title: string; description: string }[];
  };
  statistics: { label: string; value: string; suffix?: string }[];
  certifications: { title: string; description: string; validUntil?: string }[];
  contact: {
    email: string;
    phones: string[];
    address: string;
    mapUrl: string;
    hours: { day: string; hours: string }[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  footer: {
    tagline: string;
    copyright: string;
    socialLinks: { platform: string; url: string }[];
  };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: Pagination;
}
