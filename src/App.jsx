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

function App() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.16),_transparent_36%),radial-gradient(circle_at_80%_20%,_rgba(14,165,233,0.1),_transparent_30%),linear-gradient(180deg,_#050505_0%,_#09090b_100%)]" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Certifications />
        <Projects />
        <Skills />
        <Blogs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;