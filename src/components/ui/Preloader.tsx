import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const LOGO_SRC = '/images/logo.png';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (reduced) {
      onCompleteRef.current();
      return;
    }
    const t = window.setTimeout(() => setDone(true), 1200);
    return () => window.clearTimeout(t);
  }, [reduced]);

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => onCompleteRef.current(), 500);
    return () => window.clearTimeout(t);
  }, [done]);

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
              <span className="inline-flex items-center rounded-md bg-white px-2 py-1 shadow-sm shadow-black/10">
                <img
                  src={LOGO_SRC}
                  alt="UR Aerotech"
                  className="h-10 sm:h-11 md:h-14 w-auto object-contain"
                />
              </span>
            </div>
            <motion.div className="w-32 h-px bg-white/10 mt-6 mx-auto overflow-hidden">
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
