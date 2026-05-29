import { FiMail, FiMapPin } from "react-icons/fi";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 pt-16 pb-10 md:pt-20 md:pb-12">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="glass grid gap-6 rounded-[2rem] p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-violet-400">Contact</p>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">Open to cybersecurity opportunities.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              Available for roles, internships, and collaborations in cyber threat
              analysis, security operations, web security, and Linux-based security
              tooling.
            </p>
          </div>

          <div className="space-y-4 text-slate-300">
            <a href="mailto:dy6924225@gmail.com" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition hover:bg-white/10">
              <FiMail className="text-violet-400" />
              dy6924225@gmail.com
            </a>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              <FiMapPin className="text-violet-400" />
              Remote / India
            </div>
            <a href="https://www.linkedin.com/in/deepanshu-y/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition hover:bg-white/10">
              <FiMail className="text-violet-400" />
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}