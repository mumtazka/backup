import { ArrowDownRight, ArrowUpRight, Code2, GraduationCap, MapPin, MousePointer2 } from 'lucide-react';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { profile, resumeFile } from '../data';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTilt } from '../hooks/useTilt';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const parts = profile.name.split(' ');
  const firstName = parts.slice(0, -1).join(' ');
  const lastName = parts.slice(-1);
  useScrollReveal(sectionRef);
  useTilt(sectionRef);

  const moveVisual = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!visualRef.current || !window.matchMedia('(pointer: fine)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    gsap.to(visualRef.current, {
      rotateX: y * -8,
      rotateY: x * 10,
      x: x * 10,
      y: y * 10,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const resetVisual = () => {
    if (visualRef.current) {
      gsap.to(visualRef.current, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.55)' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen hero-scene relative overflow-hidden flex items-center justify-center py-28 lg:py-24"
    >
      <div className="absolute inset-0 pointer-events-none opacity-30 [background-image:linear-gradient(hsl(var(--border)/0.25)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.25)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-12 xl:gap-24 items-center">
          <div className="order-2 lg:order-1 flex flex-col items-start text-left">
            <div className="space-y-4">
              <p data-reveal className="hero-kicker text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Hello, I&apos;m
              </p>
              <h1 data-reveal data-reveal-delay="0.08" className="max-w-3xl text-5xl sm:text-6xl xl:text-7xl font-bold leading-[0.94] tracking-[-0.055em] text-foreground">
                {firstName}{' '}
                <span className="text-primary text-glow">{lastName}</span>
              </h1>
              <div data-reveal data-reveal-delay="0.16" className="flex items-center gap-3 text-xl sm:text-2xl font-semibold text-muted-foreground">
                <span className="h-px w-8 bg-primary" />
                {profile.title}
              </div>
            </div>

            <p data-reveal data-reveal-delay="0.24" className="mt-7 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {profile.bio}
            </p>

            <div data-reveal data-reveal-delay="0.32" className="flex flex-wrap gap-3 md:gap-4 mt-8">
              <a
                href="#projects"
                data-cursor
                className="magnetic-button group relative inline-flex items-center justify-center gap-2 px-5 md:px-7 py-3 bg-primary text-primary-foreground text-sm md:text-base font-semibold rounded-full border-2 border-primary overflow-hidden transition-all duration-300 hover:shadow-[0_0_28px_hsl(var(--primary)/0.45)]"
              >
                <span className="relative z-10">Explore my work</span>
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              <a
                href={resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="magnetic-button group inline-flex items-center justify-center gap-1.5 md:gap-2 px-5 md:px-8 py-2.5 md:py-3 bg-transparent text-primary text-sm md:text-base font-semibold rounded-full border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <span>View résumé</span>
              </a>
            </div>

            <div data-reveal data-reveal-delay="0.4" className="grid grid-cols-2 gap-3 mt-12 w-full max-w-xl">
              <div data-tilt className="tilt-panel glass rounded-2xl p-3.5 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Currently studying</p>
                  <p className="text-sm font-semibold text-foreground">Informatika · UNDIP</p>
                </div>
              </div>
              <div data-tilt className="tilt-panel glass rounded-2xl p-3.5 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Based in</p>
                  <p className="text-sm font-semibold text-foreground">{profile.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div data-reveal data-reveal-delay="0.18" className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
            <div className="hero-visual-wrap relative w-[min(82vw,440px)] aspect-square" onPointerMove={moveVisual} onPointerLeave={resetVisual}>
              <div ref={visualRef} data-tilt className="tilt-panel hero-visual h-full w-full">
              <div className="absolute -inset-5 rounded-[2rem] border border-primary/20 rotate-6 transition-transform duration-700 hover:rotate-3" />
              <div className="absolute -inset-5 rounded-[2rem] border border-muted-foreground/10 -rotate-6 transition-transform duration-700 hover:-rotate-3" />
              <div className="absolute -inset-12 rounded-full border border-primary/10 animate-[spin_24s_linear_infinite]" />
              <div className="absolute inset-0 rounded-[2rem] bg-primary/10 blur-2xl" />
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-card/50 p-3 shadow-2xl shadow-black/30">
              <img
                src={profile.heroImage}
                alt={profile.name}
                  className="h-full w-full object-cover rounded-[1.35rem] transition-transform duration-700 hover:scale-105"
              />
                <div className="absolute inset-3 rounded-[1.35rem] bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute left-7 bottom-7 right-7 flex items-end justify-between">
                  <div className="rounded-lg border border-white/10 bg-background/70 px-3 py-2 backdrop-blur-md">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Building with</p>
                    <p className="text-sm font-semibold text-foreground">curiosity & code</p>
                  </div>
                  <div className="rounded-full border border-primary/30 bg-primary/15 p-3 text-primary backdrop-blur-md">
                    <Code2 size={20} />
                  </div>
                </div>
              </div>
              </div>
              <div className="hero-scroll-hint absolute -left-12 bottom-5 hidden xl:flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground -rotate-90 origin-left">
                <MousePointer2 size={13} className="text-primary" />
                Move to explore
                <ArrowDownRight size={13} className="text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
