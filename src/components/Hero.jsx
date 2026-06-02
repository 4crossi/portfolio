import { motion } from "framer-motion";
import { FiArrowRight, FiFolder } from "react-icons/fi";

export default function Hero() {
  return (
    <section id="home" className="flex min-h-[88vh] items-center pt-20">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            Aspiring Cybersecurity Professional
          </p>
          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Deepanshu
          </h1>

          <div className="mt-3 h-1 w-36 overflow-hidden rounded-full">
            <div className="h-1 w-full animate-[slidebg_6s_linear_infinite] bg-gradient-to-r from-violet-500 via-rose-400 to-cyan-400" />
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400 md:text-xl">
            Aspiring cybersecurity professional focused on cyber threat analysis,
            security operations, web security, and hands-on learning through
            real-world projects, labs, and certifications.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="glass rounded-full px-4 py-2">Noida</span>
            <span className="glass rounded-full px-4 py-2">CSE, 2023-2027</span>
            <span className="glass rounded-full px-4 py-2">Web Security Intern</span>
            <span className="glass rounded-full px-4 py-2">SOC / VAPT / Linux</span>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#experience" className="btn-primary inline-flex items-center gap-3">
              View Experience
            </a>
            <a href="#projects" className="btn-secondary inline-flex items-center gap-3">
              View Projects
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}