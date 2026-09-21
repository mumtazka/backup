import { useEffect } from 'react';
import CursorFollower from './components/CursorFollower';
import Navbar from './components/Navbar';
import SocialSidebar from './components/SocialSidebar';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Contact from './sections/Contact';

const App = () => {
  useEffect(() => {
    const spotlight = document.getElementById('spotlight');

    const handleMouseMove = (event: MouseEvent) => {
      if (!spotlight) return;

      const x = event.clientX;
      const y = event.clientY;
      const mask = `radial-gradient(700px at ${x}px ${y}px, rgba(255,255,255,1), rgba(255,255,255,0))`;

      spotlight.style.maskImage = mask;
      spotlight.style.webkitMaskImage = mask;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="app min-h-screen w-full overflow-x-hidden bg-background text-foreground relative selection:bg-primary/30">
      <CursorFollower />
      <div id="spotlight" className="pointer-events-none fixed inset-0 z-30 transition-all duration-300 ease-in-out" />
      <div className="relative z-50">
        <Navbar />
      </div>
      <div className="relative z-40">
        <SocialSidebar />
      </div>
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Projects />
        <Education />
      </main>
      <div className="relative z-10">
        <Contact />
      </div>
    </div>
  );
};

export default App;
