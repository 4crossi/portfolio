import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

const projects = [
  {
    title: "SOC Threat Detection Platform",
    status: "May 2026",
    href: "https://github.com/4crossi/soc_detector",
    description:
      "Real-time SOC monitoring and threat detection platform for Linux environments using Python, Flask, SQLite, and Bash scripting. Includes SSH log monitoring, brute-force detection, invalid user detection, GeoIP enrichment, attacker IP tracking, and event visualization.",
  },
  {
    title: "NeurOfRed (NOR)",
    status: "In Progress",
    href: "https://github.com/4crossi/NoR",
    description:
      "Event-driven offensive security intelligence platform featuring telemetry correlation, attack reconstruction, and the I3Ris engine.",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-violet-400">Projects</p>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">Featured Work</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <motion.article
              key={project.title}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="glass rounded-3xl p-6 md:p-7"
            >
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="mt-2 text-violet-400">{project.status}</p>
              <p className="mt-3 leading-7 text-slate-400">{project.description}</p>

              {project.href ? (
                <div className="mt-6">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    View Project <FiExternalLink />
                  </a>
                </div>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}