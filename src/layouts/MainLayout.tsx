import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ScrollProgress from '../components/ui/ScrollProgress';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function MainLayout() {
  const location = useLocation();
  const reduced = useReducedMotion();
  const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password'].includes(location.pathname);

  return (
    <>
      <ScrollProgress />
      {!isAuthPage && <Header />}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="w-full max-w-full overflow-x-clip min-w-0"
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? {} : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      {!isAuthPage && <Footer />}
    </>
  );
}
