import { useEffect, useState } from 'react';

export default function RecruiterController() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const handler = () => setOn(s => {
      const next = !s;
      document.documentElement.toggleAttribute('data-recruiter', next);
      // dispatch an event so listeners can respond without MutationObserver
      window.dispatchEvent(new CustomEvent('recruiter-changed', { detail: { on: next } }));
      return next;
    });
    window.addEventListener('recruiter-toggle', handler);
    return () => window.removeEventListener('recruiter-toggle', handler);
  }, []);

  useEffect(() => {
    if (on) {
      document.documentElement.style.setProperty('--accent-from', '#7c3aed');
      document.documentElement.style.setProperty('--accent-to', '#06b6d4');
    } else {
      // keep defaults
    }
  }, [on]);

  return null;
}
