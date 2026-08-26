import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phone: z.string().optional(),
  company: z.string().optional(),
  accountType: z.enum(['individual', 'business']).default('individual'),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1).max(200),
  message: z.string().min(10).max(5000),
  isAOG: z.boolean().default(false),
});

export const quoteSchema = z.object({
  fullName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(1),
  company: z.string().optional(),
  accountType: z.enum(['individual', 'business']).default('individual'),
  service: z.string().optional(),
  product: z.string().optional(),
  aircraftManufacturer: z.string().optional(),
  aircraftModel: z.string().optional(),
  partNumber: z.string().optional(),
  requestType: z.enum(['service', 'product', 'general']).default('service'),
  urgency: z.enum(['standard', 'urgent', 'aog']).default('standard'),
  isAOG: z.boolean().default(false),
  responseMethod: z.enum(['email', 'phone', 'both']).default('email'),
  message: z.string().min(10).max(5000),
  consent: z.literal(true),
});

export const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  sku: z.string().min(1),
  partNumber: z.string().optional(),
  manufacturer: z.string().optional(),
  category: z.string(),
  description: z.string().min(1),
  specifications: z.array(z.object({ key: z.string(), value: z.string() })).optional(),
  condition: z.enum(['new', 'overhauled', 'serviceable', 'as-removed']).default('serviceable'),
  saleOrRental: z.enum(['sale', 'rental', 'both']).default('sale'),
  quantity: z.number().min(0).default(0),
  availability: z.enum(['in-stock', 'low-stock', 'out-of-stock', 'on-order']).default('in-stock'),
  price: z.number().min(0).optional(),
  showPrice: z.boolean().default(false),
  quoteOnly: z.boolean().default(true),
  featured: z.boolean().default(false),
  certifications: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const serviceSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  tagline: z.string().min(1),
  overview: z.string().min(1),
  whatWeDo: z.string().min(1),
  whyItMatters: z.string().min(1),
  capabilities: z.array(z.string()).optional(),
  process: z.array(z.object({ step: z.number(), title: z.string(), description: z.string() })).optional(),
  heroImage: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});
