import { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './hooks/useAuth';
import { useLenis } from './hooks/useLenis';
import MainLayout from './layouts/MainLayout';
import Preloader from './components/ui/Preloader';
import ProtectedRoute from './components/layout/ProtectedRoute';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import IndustriesPage from './pages/IndustriesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import QuotePage from './pages/QuotePage';
import LoginPage from './pages/LoginPage';
import AdminLayout from './admin/AdminLayout';

function AppRoutes() {
  useLenis();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:slug" element={<ProductDetailPage />} />
        <Route path="industries" element={<IndustriesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="quote" element={<QuotePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Navigate to="/" replace />} />
        <Route path="dashboard" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="admin/*" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>} />
    </Routes>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          {!loaded && <Preloader onComplete={handleLoaded} />}
          {loaded && <AppRoutes />}
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}
