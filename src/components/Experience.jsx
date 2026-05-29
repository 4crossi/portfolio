import { motion } from "framer-motion";

const experiences = [
  {
    role: "Web Security Intern",
    org: "Eduskills, Virtual",
    period: "Oct 2025 - Dec 2025",
    details: [
      "Learned and applied web application security concepts including reconnaissance and vulnerability assessment.",
      "Worked with Linux-based security tools to identify and analyze common web vulnerabilities.",
      "Performed basic penetration testing and bug hunting tasks in practical lab environments.",
      "Strengthened problem-solving and analytical skills through hands-on cybersecurity assignments and projects.",
    ],
  },
  {
    role: "Website Manager",
    org: "VSPlegals, Virtual",
    period: "Nov 2024 - Jan 2025",
    details: [
      "Managed website structure and SEO performance.",
      "Maintained uptime and performance of business websites.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <p className="text-sm uppercase tracking-[0.25em] text-violet-400">Experience</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">Work experience</h2>

        <div className="mt-8 space-y-4">
          {experiences.map((experience) => (
            <motion.article
              key={`${experience.role}-${experience.org}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              className="glass rounded-3xl p-6 md:p-7"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{experience.role}</h3>
                  <p className="mt-2 text-violet-400">{experience.org}</p>
                </div>
                <p className="text-sm text-slate-400">{experience.period}</p>
              </div>

              <ul className="mt-5 space-y-2.5 text-slate-300">
                {experience.details.map((detail) => (
                  <li key={detail} className="leading-7">{detail}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}