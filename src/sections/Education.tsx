import { useRef } from 'react';
import { BadgeCheck, BookOpenCheck, CalendarDays, Orbit } from 'lucide-react';
import { certifications, education } from '../data';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTilt } from '../hooks/useTilt';

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  useTilt(sectionRef);

  return (
    <section ref={sectionRef} id="education" className="relative overflow-hidden py-24 lg:py-32">
      <div className="education-lines" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div data-reveal className="mb-14 lg:mb-20 max-w-3xl">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.24em] mb-4">The path so far</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.05em] text-foreground leading-none">
            Still becoming.<br />
            <span className="text-primary text-glow">Always building.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
          <div className="lg:col-span-7">
            <div className="mb-8 flex items-center gap-3 text-sm font-semibold text-foreground">
              <span className="education-symbol education-symbol--book"><BookOpenCheck size={19} /></span>
              Education timeline
            </div>
            <div className="education-timeline">
              {education.map((item, index) => (
                <article key={item.id} data-reveal data-reveal-delay={index * 0.1} className="education-stop group relative pl-12 sm:pl-16 pb-12 last:pb-0">
                  <div className="education-node">
                    <span className="relative z-10 text-[10px] font-bold text-primary">0{index + 1}</span>
                  </div>
                  <div data-tilt className="tilt-panel education-entry relative py-2 pr-2">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="text-primary text-xs font-semibold uppercase tracking-[0.18em] mb-2">{item.degree}</p>
                        <h3 className="text-2xl font-bold tracking-[-0.035em] text-foreground group-hover:text-primary transition-colors">{item.institution}</h3>
                      </div>
                      {item.status === 'current' ? <span className="timeline-current">Current</span> : null}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 font-mono">
                      <CalendarDays size={14} className="text-primary" /> {item.duration}
                    </div>
                    <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div data-reveal data-reveal-delay="0.12" className="mb-8 flex items-center gap-3 text-sm font-semibold text-foreground">
              <span className="education-symbol education-symbol--badge"><BadgeCheck size={19} /></span>
              Certifications
            </div>
            <div className="space-y-5">
              {certifications.map((item, index) => (
                <article key={item.id} data-reveal data-reveal-delay={0.18 + index * 0.1} data-tilt className="cert-orbit tilt-panel group relative overflow-hidden p-7">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-primary/20 group-hover:scale-125 transition-transform duration-700" />
                  <div className="relative flex items-start gap-4">
                    <Orbit className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="text-primary text-xs font-semibold uppercase tracking-[0.18em] mb-2">{item.year}</p>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.issuer}</p>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
