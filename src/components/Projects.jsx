import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { useRef } from "react";

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
          {projects.map((project) => {
            const ref = useRef();
            return (
              <div key={project.title} className="tilt-card relative">
                <motion.article
                  ref={ref}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.48, ease: [0.2, 0.8, 0.2, 1] }}
                  onMouseMove={(e) => {
                    const el = ref.current;
                    if (!el) return;
                    const inner = el.querySelector('.tilt-inner');
                    if (!inner) return;
                    const rect = el.getBoundingClientRect();
                    const px = (e.clientX - rect.left) / rect.width;
                    const py = (e.clientY - rect.top) / rect.height;
                    const rx = (py - 0.5) * 8;
                    const ry = (px - 0.5) * -12;
                    // batch via rAF and store id on element to avoid flooding
                    if (el._tiltRaf) cancelAnimationFrame(el._tiltRaf);
                    el._tiltRaf = requestAnimationFrame(() => {
                      inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
                      el._tiltRaf = null;
                    });
                  }}
                  onMouseLeave={() => {
                    const el = ref.current;
                    if (!el) return;
                    const inner = el.querySelector('.tilt-inner');
                    if (!inner) return;
                    if (el._tiltRaf) cancelAnimationFrame(el._tiltRaf);
                    inner.style.transform = '';
                  }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="glass rounded-3xl p-6 md:p-7 relative overflow-hidden"
                >
                  <div className="tilt-inner relative will-change-transform">
                    <div className="card-top-highlight" aria-hidden="true" />
                    <div className="tilt-reflection" />
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
                  </div>
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}