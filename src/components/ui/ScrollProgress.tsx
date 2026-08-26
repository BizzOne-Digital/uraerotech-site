import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement.scrollHeight - window.innerHeight;
      setP(d > 0 ? (window.scrollY / d) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-px bg-white/[0.06]">
      <div className="h-full bg-technical transition-[width] duration-150" style={{ width: `${p}%` }} />
    </div>
  );
}
