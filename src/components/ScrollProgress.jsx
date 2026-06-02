import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [pct, setPct] = useState(8);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (window.scrollY / h) * 100 : 0;
      setPct(Math.max(4, Math.min(100, p)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-progress" aria-hidden>
      <i style={{ height: pct + '%' }} />
    </div>
  );
}
