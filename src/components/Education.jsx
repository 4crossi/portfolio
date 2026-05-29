import { motion } from "framer-motion";

const education = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    org: "Galgotias College Of Engineering And Technology",
    period: "2023 - 2027",
    note: "Current degree",
  },
  {
    degree: "Senior Secondary (XII), CISCE Science",
    org: "City Montessori Higher Secondary School, Manipur West",
    period: "2023",
    note: "85.60%",
  },
  {
    degree: "Secondary (X), CISCE",
    org: "City Montessori Higher Secondary School, Manipur West",
    period: "2021",
    note: "90.00%",
  },
];

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <p className="text-sm uppercase tracking-[0.25em] text-violet-400">Education</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">Academic background</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {education.map((item) => (
            <motion.article
              key={`${item.degree}-${item.period}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              className="glass rounded-3xl p-6 md:p-7"
            >
              <p className="text-sm text-violet-400">{item.period}</p>
              <h3 className="mt-3 text-xl font-semibold leading-8">{item.degree}</h3>
              <p className="mt-4 text-slate-400">{item.org}</p>
              <p className="mt-4 text-slate-300">{item.note}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}