import { motion } from "framer-motion";

const skills = [
  "Cybersecurity",
  "Linux",
  "Bug Tracking",
  "VAPT",
  "Java",
  "Bash",
  "Python",
  "Problem Solving",
  "HTML",
  "Automation",
  "Ethical Hacking",
  "Analytical Thinking",
  "Self-learning",
  "Prompt Engineering",
];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <p className="text-sm uppercase tracking-[0.25em] text-violet-400">Skills</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">Core skills</h2>

        <div className="mt-8 flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <motion.button
              key={skill}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="glass rounded-full px-4 py-2.5 text-sm text-slate-200 flex items-center gap-3"
              onClick={() => {
                const el = document.getElementById('skills');
                el?.classList.add('pulse-spot');
                setTimeout(() => el?.classList.remove('pulse-spot'), 600);
              }}
            >
              <span className="w-2 h-2 rounded-full bg-violet-400/80 inline-block" />
              <span>{skill}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}