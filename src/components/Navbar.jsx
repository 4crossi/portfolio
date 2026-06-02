import { useState, useEffect } from "react";
import { FiGithub, FiMail, FiMenu, FiX, FiSearch } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 ${scrolled ? 'border-white/10 bg-black/60 backdrop-blur-lg shadow-lg' : 'border-white/5 bg-black/40 backdrop-blur-md'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <a href="#home" className="text-lg font-semibold tracking-wide">
          Deepanshu
        </a>

        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <a href="#about" className="transition hover:text-white">About</a>
          <a href="#experience" className="transition hover:text-white">Experience</a>
          <a href="#education" className="transition hover:text-white">Education</a>
          <a href="#projects" className="transition hover:text-white">Projects</a>
          <a href="#certifications" className="transition hover:text-white">Certifications</a>
          <a href="#blogs" className="transition hover:text-white">Blogs</a>
          <a href="#contact" className="transition hover:text-white">Contact</a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a aria-label="GitHub" href="https://github.com" className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-white/20 hover:text-white">
            <FiGithub />
          </a>
          <a aria-label="Email" href="mailto:dy6924225@gmail.com" className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-white/20 hover:text-white">
            <FiMail />
          </a>
          <button aria-label="Command Palette" onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))} className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-white/20 hover:text-white">
            <FiSearch />
          </button>
          <button aria-label="Recruiter Mode" onClick={() => window.dispatchEvent(new CustomEvent('recruiter-toggle'))} className="ml-2 rounded-full border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:text-white">
            Recruiter Mode
          </button>
        </div>

        <button
          type="button"
          className="rounded-full border border-white/10 p-2 text-slate-300 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div
        className={`md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"} fixed inset-x-4 top-20 z-40 transform-gpu transition-all duration-300`}
        aria-hidden={!open}
      >
        <div className={`rounded-xl bg-black/70 backdrop-blur-lg p-6 shadow-lg transition-opacity ${open ? "opacity-100" : "opacity-0"}`}>
          <div className="flex flex-col gap-4 text-lg text-slate-200">
            <a onClick={() => setOpen(false)} href="#about" className="py-2">About</a>
            <a onClick={() => setOpen(false)} href="#experience" className="py-2">Experience</a>
            <a onClick={() => setOpen(false)} href="#education" className="py-2">Education</a>
            <a onClick={() => setOpen(false)} href="#projects" className="py-2">Projects</a>
            <a onClick={() => setOpen(false)} href="#certifications" className="py-2">Certifications</a>
            <a onClick={() => setOpen(false)} href="#blogs" className="py-2">Blogs</a>
            <a onClick={() => setOpen(false)} href="#contact" className="py-2">Contact</a>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <a aria-label="GitHub" href="https://github.com" className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-white/20 hover:text-white">
              <FiGithub />
            </a>
            <a aria-label="Email" href="mailto:dy6924225@gmail.com" className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-white/20 hover:text-white">
              <FiMail />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}