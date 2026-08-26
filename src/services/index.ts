import api from './api';
import type { User, Product, Service, Industry, SiteSettings, QuoteRequest, ApiResponse } from '../types';

export const authApi = {
  register: (data: Record<string, unknown>) => api.post<ApiResponse<User>>('/auth/register', data),
  login: (data: { email: string; password: string }) => api.post<ApiResponse<User>>('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get<ApiResponse<User>>('/auth/me'),
  updateProfile: (data: Record<string, unknown>) => api.put<ApiResponse<User>>('/auth/profile', data),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) => api.post('/auth/reset-password', { token, password }),
  verifyEmail: (token: string) => api.get(`/auth/verify-email?token=${token}`),
  toggleSavedProduct: (productId: string) => api.post(`/auth/saved-products/${productId}`),
};

export const productApi = {
  getAll: (params?: Record<string, string>) => api.get<ApiResponse<Product[]>>('/products', { params }),
  getFeatured: () => api.get<ApiResponse<Product[]>>('/products/featured'),
  getBySlug: (slug: string) => api.get<ApiResponse<Product>>(`/products/${slug}`),
  getRelated: (slug: string) => api.get<ApiResponse<Product[]>>(`/products/${slug}/related`),
};

export const serviceApi = {
  getAll: () => api.get<ApiResponse<Service[]>>('/services'),
  getBySlug: (slug: string) => api.get<ApiResponse<Service>>(`/services/${slug}`),
};

export const industryApi = {
  getAll: () => api.get<ApiResponse<Industry[]>>('/industries'),
  getBySlug: (slug: string) => api.get<ApiResponse<Industry>>(`/industries/${slug}`),
};

export const inquiryApi = {
  createQuote: (data: Record<string, unknown>) => api.post('/inquiries/quotes', data),
  getMyQuotes: () => api.get<ApiResponse<QuoteRequest[]>>('/inquiries/quotes/my'),
  getQuoteByRef: (ref: string) => api.get<ApiResponse<QuoteRequest>>(`/inquiries/quotes/${ref}`),
  createContact: (data: Record<string, unknown>) => api.post('/inquiries/contact', data),
};

export const settingsApi = {
  get: () => api.get<ApiResponse<SiteSettings>>('/admin/settings'),
  getCategories: () => api.get('/admin/categories'),
  subscribe: (email: string) => api.post('/admin/subscribe', { email }),
};

export const adminApi = {
  getDashboard: () => api.get('/admin/dashboard'),
  getSettings: () => api.get<ApiResponse<SiteSettings>>('/admin/settings'),
  updateSettings: (data: Partial<SiteSettings>) => api.put('/admin/settings', data),
  getProducts: (params?: Record<string, string>) => api.get('/products/admin/all', { params }),
  createProduct: (data: Record<string, unknown>) => api.post('/products', data),
  updateProduct: (id: string, data: Record<string, unknown>) => api.put(`/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
  createService: (data: Record<string, unknown>) => api.post('/services', data),
  updateService: (id: string, data: Record<string, unknown>) => api.put(`/services/${id}`, data),
  deleteService: (id: string) => api.delete(`/services/${id}`),
  createIndustry: (data: Record<string, unknown>) => api.post('/industries', data),
  updateIndustry: (id: string, data: Record<string, unknown>) => api.put(`/industries/${id}`, data),
  getQuotes: (params?: Record<string, string>) => api.get('/inquiries/quotes', { params }),
  updateQuoteStatus: (id: string, data: Record<string, unknown>) => api.patch(`/inquiries/quotes/${id}`, data),
  getContacts: (params?: Record<string, string>) => api.get('/inquiries/contact', { params }),
  getUsers: (params?: Record<string, string>) => api.get('/admin/users', { params }),
  getCategories: () => api.get('/admin/categories'),
  createCategory: (data: Record<string, unknown>) => api.post('/admin/categories', data),
  uploadImage: (file: File, folder?: string) => {
    const form = new FormData();
    form.append('file', file);
    if (folder) form.append('folder', folder);
    return api.post('/upload/image', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  exportQuotes: () => api.get('/admin/export/quotes', { responseType: 'blob' }),
};
