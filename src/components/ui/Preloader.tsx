import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Logo from './Logo';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) { onComplete(); return; }
    const t = setTimeout(() => setDone(true), 1200);
    return () => clearTimeout(t);
  }, [reduced, onComplete]);

  useEffect(() => {
    if (done) setTimeout(onComplete, 500);
  }, [done, onComplete]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-graphite flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div className="flex justify-center">
              <Logo height="lg" />
            </div>
            <motion.div
              className="w-32 h-px bg-white/10 mt-6 mx-auto overflow-hidden"
            >
              <motion.div
                className="h-full bg-technical"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
