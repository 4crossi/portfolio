import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
// Stats component removed
// PromptEngineering component removed per request
import CommandPalette from "./components/CommandPalette";
import RecruiterController from "./components/RecruiterController";
import ScrollProgress from "./components/ScrollProgress";
import Terminal from "./components/Terminal";
import FloatingOrb from "./components/FloatingOrb";
import RecruiterPanel from "./components/RecruiterPanel";
import { useState, useEffect } from "react";

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((s) => !s);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <RecruiterController />
      <RecruiterPanel />
      <ScrollProgress />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.16),_transparent_36%),radial-gradient(circle_at_80%_20%,_rgba(14,165,233,0.1),_transparent_30%),linear-gradient(180deg,_#050505_0%,_#09090b_100%)]" />
      <div className="mouse-spotlight" />
      <div className="cyber-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Terminal />
        <About />
        <Experience />
        <Education />
        <Certifications />
        <Projects />
        <Skills />
        {/* PromptEngineering removed */}
        <Blogs />
        <Contact />
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}

export default App;