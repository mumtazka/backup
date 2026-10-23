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

        <div className="skills-showcase grid lg:grid-cols-12 gap-5 lg:gap-7 items-stretch">
          {skillCategories.map((skill, index) => (
            <article key={skill.name} data-reveal data-reveal-delay={index * 0.08} data-tilt className={`skill-showcase-card tilt-panel group relative overflow-hidden ${index === 0 ? 'skill-showcase-card--feature lg:col-span-7 lg:row-span-2' : 'skill-showcase-card--compact lg:col-span-5'}`}>
              <div className="skill-showcase-card__image" style={{ backgroundImage: `url(${skill.bgImage})` }} />
              <div className="skill-showcase-card__wash" />
              <div className="relative z-10 flex h-full flex-col justify-between p-6 lg:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="skill-icon-shell"><img src={skill.icon} alt="" className="h-9 w-9 object-contain invert brightness-0 dark:brightness-200" /></div>
                  <div className="flex items-center gap-3"><span className="skill-index">0{index + 1}</span><Sparkles className="h-4 w-4 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" /></div>
                </div>
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{index === 0 ? 'Core stack' : 'People & systems'}</p>
                  <h3 className="mb-3 text-3xl font-bold tracking-[-0.04em] text-foreground transition-colors duration-300 group-hover:text-primary lg:text-4xl">{skill.name}</h3>
                  <p className="max-w-xl text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/75">{skill.description}</p>
                  <div className="skill-tool-list">{skill.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                  {index === 0 ? <div className="skill-card-footer"><span><i /> currently building</span><ArrowUpRight size={17} /></div> : null}
                </div>
              </div>
            </article>
          ))}

          <div data-reveal data-reveal-delay="0.24" className="skill-manifesto skill-manifesto--new relative overflow-hidden lg:col-span-5">
            <div className="absolute inset-0 bg-primary/5 blur-3xl" />
            <p className="relative text-xl font-medium leading-snug text-muted-foreground sm:text-2xl">The fun part is when a rough idea becomes something <span className="text-foreground">real, useful, and alive.</span></p>
            <div className="relative mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary"><span className="h-px w-10 bg-primary" /> Learning in motion</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
