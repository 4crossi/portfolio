import { useEffect, useState } from 'react';

const lines = [
  { cmd: 'whoami', out: ['Cybersecurity Enthusiast', 'Cyber Threat Analyst', 'Automation developer', 'Prompt Engineer'] },
  { cmd: 'skills', out: ['Python', 'Bash', 'Java', 'Cyber Security', 'AI', 'Linux'] },
];

function useTyping(textArray, setOutput) {
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      for (const entry of textArray) {
        const prompt = `crossi@portfolio:~$ ${entry.cmd}`;
        setOutput(prev => [...prev, { type: 'cmd', text: prompt }]);
        // pause briefly before output starts
        await new Promise(r => setTimeout(r, 600));
        const out = entry.out.join('\n');
        // type each character at a readable speed
        for (let i = 0; i <= out.length; i++) {
          if (cancelled) return;
          setOutput(prev => {
            // replace last output entry or append if missing
            const copy = prev.slice();
            if (copy.length === 0 || copy[copy.length - 1].type !== 'out') {
              copy.push({ type: 'out', text: out.slice(0, i) });
            } else {
              copy[copy.length - 1] = { type: 'out', text: out.slice(0, i) };
            }
            return copy;
          });
          await new Promise(r => setTimeout(r, 28));
        }
        // small pause after full output before next command
        await new Promise(r => setTimeout(r, 450));
        setOutput(prev => [...prev, { type: 'sep', text: '' }]);
      }
    };
    setOutput([]);
    run();
    return () => { cancelled = true; };
  }, [textArray, setOutput]);
}

export default function Terminal() {
  const [out, setOut] = useState([]);
  useTyping(lines, setOut);

  return (
    <section id="terminal" className="scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <div className="glass rounded-2xl p-6 font-mono text-sm">
          {out.map((l, i) => (
            <div key={i} className={l.type === 'cmd' ? 'text-violet-300' : 'text-slate-300'}>
              {l.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
