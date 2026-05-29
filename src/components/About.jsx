import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-violet-400">About</p>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">Building practical cybersecurity experience.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Aspiring cybersecurity professional seeking real-world experience in
              cyber threat analysis and security operations. I enjoy learning new
              technologies, solving security challenges, and contributing through
              hands-on work in web security, VAPT, and Linux-based tooling.
            </p>
          </div>

          <div className="glass rounded-3xl p-6 md:p-7">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Strengths</p>
            <ul className="mt-6 space-y-4 text-slate-300">
              <li>Web application security and reconnaissance</li>
              <li>VAPT, bug hunting, and basic penetration testing</li>
              <li>Linux tools, Bash scripting, and Python automation</li>
              <li>Problem solving, analytical thinking, and self-learning</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}