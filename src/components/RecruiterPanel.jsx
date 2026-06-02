import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function RecruiterPanel() {
  const [open, setOpen] = useState(() => document.documentElement.hasAttribute('data-recruiter'));

  useEffect(() => {
    // listen to higher-level event from RecruiterController to avoid MutationObserver
    const handler = (e) => {
      if (e && e.detail && typeof e.detail.on === 'boolean') setOpen(Boolean(e.detail.on));
      else setOpen(document.documentElement.hasAttribute('data-recruiter'));
    };
    window.addEventListener('recruiter-changed', handler);
    return () => window.removeEventListener('recruiter-changed', handler);
  }, []);

  const close = () => {
    document.documentElement.removeAttribute('data-recruiter');
    // notify others
    window.dispatchEvent(new CustomEvent('recruiter-changed', { detail: { on: false } }));
    setOpen(false);
  };

  return (
    <div aria-hidden={!open} className="recruiter-panel-wrapper">
      <div role="dialog" aria-label="Recruiter panel" className={`recruiter-panel glass rounded-2xl p-4`} aria-hidden={!open}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-violet-400">Recruiter Mode</p>
            <h3 className="mt-2 text-lg font-semibold">Available & Primary Skills</h3>
          </div>
          <button type="button" aria-label="Close recruiter panel" onClick={close} className="ml-3 text-slate-300 p-2 rounded-md hover:bg-white/3">
            <FiX />
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          <div>
            <div className="text-sm text-slate-300 font-medium">Available For</div>
            <ul className="mt-2 text-slate-200 list-inside list-disc ml-4">
              <li>Internship</li>
              <li>Freelance</li>
              <li>Full-Time</li>
            </ul>
          </div>

          <div>
            <div className="text-sm text-slate-300 font-medium">Primary Skills</div>
            <div className="mt-2 text-slate-200">
              Python, Bash, Java, Cyber Security, AI, Linux
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
