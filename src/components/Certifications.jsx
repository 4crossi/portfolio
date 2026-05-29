import { motion } from "framer-motion";

const certifications = [
  {
    title: "Fundamentals Of Cybersecurity",
    issuer: "Zscaler, Virtual",
    period: "Mar 2026 - Apr 2026",
  },
  {
    title: "Getting Started With Cisco Packet Tracer",
    issuer: "Cisco Networking Academy, Virtual",
    period: "May 2025 - Jun 2025",
  },
  {
    title: "EY Techathon 6.0 Semi-Finalist",
    issuer: "EY",
    period: "Achievement",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <p className="text-sm uppercase tracking-[0.25em] text-violet-400">Certifications</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">Training and recognition</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {certifications.map((certification) => (
            <motion.article
              key={certification.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              className="glass rounded-3xl p-6 md:p-7"
            >
              <p className="text-sm text-violet-400">{certification.period}</p>
              <h3 className="mt-3 text-xl font-semibold leading-8">{certification.title}</h3>
              <p className="mt-4 text-slate-400">{certification.issuer}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}