import { FiGithub, FiMail, FiMenu } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <a href="#home" className="text-lg font-semibold tracking-wide">
          Deepanshu Yadav
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
          <a aria-label="Email" href="mailto:deepanshu@example.com" className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-white/20 hover:text-white">
            <FiMail />
          </a>
        </div>

        <button type="button" className="rounded-full border border-white/10 p-2 text-slate-300 md:hidden" aria-label="Menu">
          <FiMenu />
        </button>
      </div>
    </nav>
  );
}