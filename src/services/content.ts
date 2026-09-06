import type { Category, Industry, Product, Service, Pagination } from '../types';
import { industryApi, productApi, serviceApi, settingsApi } from './index';

export async function getServices(): Promise<Service[]> {
  const res = await serviceApi.getAll();
  return res.data.data ?? [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const res = await serviceApi.getBySlug(slug);
    return res.data.data ?? null;
  } catch {
    return null;
  }
}

export async function getIndustries(): Promise<Industry[]> {
  const res = await industryApi.getAll();
  return res.data.data ?? [];
}

export async function getCategories(): Promise<Category[]> {
  const res = await settingsApi.getCategories();
  return res.data.data ?? [];
}

export async function getProducts(params?: Record<string, string>): Promise<{ data: Product[]; pagination: Pagination }> {
  const res = await productApi.getAll(params);
  return {
    data: res.data.data ?? [],
    pagination: res.data.pagination ?? { page: 1, pages: 1, total: 0, limit: 20 },
  };
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const res = await productApi.getFeatured();
  return res.data.data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await productApi.getBySlug(slug);
    return res.data.data ?? null;
  } catch {
    return null;
  }
}

export async function getRelatedProducts(slug: string): Promise<Product[]> {
  try {
    const res = await productApi.getRelated(slug);
    return res.data.data ?? [];
  } catch {
    return [];
  }
}
