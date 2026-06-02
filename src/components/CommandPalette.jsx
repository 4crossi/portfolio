import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('');
  const commands = [
    { id: 'about', name: 'About', action: 'goto-about' },
    { id: 'projects', name: 'Projects', action: 'goto-projects' },
    { id: 'certifications', name: 'Certifications', action: 'goto-certifications' },
    { id: 'skills', name: 'Skills', action: 'goto-skills' },
    { id: 'resume', name: 'Resume', action: 'open-resume' },
    { id: 'blogs', name: 'Blogs', action: 'goto-blogs' },
    { id: 'contact', name: 'Contact', action: 'goto-contact' },
    { id: 'recruiter', name: 'Toggle Recruiter Mode', action: 'toggle-recruiter' },
  ];

  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;

  const filtered = commands.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  const run = (c) => {
    if (c.action === 'toggle-recruiter') {
      window.dispatchEvent(new CustomEvent('recruiter-toggle'));
    } else if (c.action === 'goto-projects') {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    } else if (c.action === 'goto-contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else if (c.action === 'goto-about') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else if (c.action === 'goto-certifications') {
      document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
    } else if (c.action === 'goto-skills') {
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    } else if (c.action === 'open-resume') {
      // try to open resume link if present
      const link = document.querySelector('a[href$=".pdf"]');
      if (link) window.open(link.href, '_blank');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-start justify-center pt-36">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-2xl p-4">
        <div className="glass no-blur rounded-xl p-3">
          <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Type a command (Ctrl+K)" className="w-full bg-transparent outline-none text-white placeholder:text-slate-400 px-3 py-2" />
          <div className="mt-2">
            {filtered.map(c => (
                <div key={c.id} onClick={() => run(c)} className="cursor-pointer rounded-md px-3 py-2 hover:bg-white/3 transition text-slate-200">
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs text-slate-400">{c.action.replace('-', ' ')}</div>
                </div>
              ))}
            {filtered.length === 0 && <div className="text-sm text-slate-400 px-3 py-2">No commands</div>}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
