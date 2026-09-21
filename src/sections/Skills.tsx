import { useRef } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { skillCategories } from '../data';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTilt } from '../hooks/useTilt';

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  useTilt(sectionRef);

  return (
    <section ref={sectionRef} id="skills" className="relative overflow-hidden py-24 lg:py-32">
      <div className="section-orbit section-orbit--left" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div data-reveal className="max-w-2xl mb-14 lg:mb-20">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.24em] mb-4">What I bring to the table</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.045em] text-foreground leading-none">
            Built by curiosity.<br />
            <span className="text-primary text-glow">Driven by craft.</span>
          </h2>
        </div>

        <div className="skills-constellation grid lg:grid-cols-12 gap-5 lg:gap-7 items-stretch">
          {skillCategories.map((skill, index) => (
            <article
              key={skill.name}
              data-reveal
              data-reveal-delay={index * 0.08}
              data-tilt
              className={`skill-node tilt-panel group relative overflow-hidden min-h-[300px] lg:min-h-[430px] ${
                index === 0 ? 'lg:col-span-6 lg:row-span-2' : 'lg:col-span-3'
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-45 transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
                style={{ backgroundImage: `url(${skill.bgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-background/80 to-background" />
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border border-primary/30 group-hover:scale-125 transition-transform duration-700" />
              <div className="absolute top-6 right-7 text-4xl font-bold tracking-tighter text-foreground/[0.07]">0{index + 1}</div>

              <div className="relative z-10 h-full flex flex-col justify-between p-7 lg:p-9">
                <div className="flex items-start justify-between gap-5">
                  <div className="skill-icon-shell">
                    <img src={skill.icon} alt="" className="w-9 h-9 object-contain invert brightness-0 dark:brightness-200" />
                  </div>
                  <Sparkles className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div>
                  <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Focus area</p>
                  <h3 className="text-3xl lg:text-4xl font-bold tracking-[-0.04em] text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/75 transition-colors">
                    {skill.description}
                  </p>
                  <div className="mt-7 flex items-center gap-2 text-sm text-foreground/0 group-hover:text-primary transition-all duration-300 translate-y-3 group-hover:translate-y-0">
                    Explore the discipline <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </article>
          ))}

          <div data-reveal data-reveal-delay="0.24" className="lg:col-span-6 lg:col-start-7 skill-manifesto relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 blur-3xl" />
            <p className="relative text-xl sm:text-2xl font-medium leading-snug text-muted-foreground">
              I enjoy the part where an idea stops being a thought and starts becoming something <span className="text-foreground">real, useful, and alive.</span>
            </p>
            <div className="relative mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-10 bg-primary" /> Learning in motion
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
