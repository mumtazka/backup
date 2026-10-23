import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import { projects } from '../data';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTilt } from '../hooks/useTilt';

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentImages = useMemo(() => selectedProject?.images ?? [], [selectedProject]);
  useScrollReveal(sectionRef);
  useTilt(sectionRef);

  useEffect(() => {
    if (!selectedProject) {
      setProgress(0);
      return;
    }

    let startedAt = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextProgress = Math.min((elapsed / 4000) * 100, 100);
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        setActiveIndex((value) => (value === selectedProject.images.length - 1 ? 0 : value + 1));
        startedAt = Date.now();
      }
    }, 25);

    return () => window.clearInterval(timer);
  }, [selectedProject, activeIndex]);

  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);

  const nextImage = () => {
    if (!selectedProject) return;
    setActiveIndex((value) => (value === selectedProject.images.length - 1 ? 0 : value + 1));
  };

  const previousImage = () => {
    if (!selectedProject) return;
    setActiveIndex((value) => (value === 0 ? selectedProject.images.length - 1 : value - 1));
  };

  return (
    <section ref={sectionRef} id="projects" className="projects-section relative overflow-hidden py-24 lg:py-32">
      <div className="absolute right-[-18rem] top-1/4 h-[34rem] w-[34rem] rounded-full border border-primary/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div data-reveal className="mb-14 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.24em] mb-4">Selected experiments</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.05em] text-foreground leading-none">
              Things I&apos;ve made<br />
              <span className="text-primary text-glow">with intent.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:text-right">
            Hover for a closer look. Open any project to step through the details.
          </p>
        </div>

        <div className="projects-composition space-y-6 lg:space-y-10">
          {projects.map((project, index) => (
            <button
              type="button"
              key={project.id}
              data-reveal
              data-reveal-delay={index * 0.1}
              data-tilt
              data-cursor
              className={`project-slab tilt-panel group relative block w-full overflow-hidden text-left ${index % 2 === 1 ? 'lg:ml-auto lg:w-[88%]' : 'lg:w-[88%]'}`}
              onClick={() => {
                setSelectedProject(project);
                setActiveIndex(0);
              }}
            >
              <div className="relative grid min-h-[430px] md:min-h-[360px] md:grid-cols-[0.92fr_1.08fr]">
                <div className={`relative min-h-[240px] overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/10 to-transparent" />
                  <div className="absolute left-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-background/65 text-sm font-bold text-primary backdrop-blur-md">
                    0{index + 1}
                  </div>
                </div>

                <div className={`relative flex flex-col justify-center p-7 md:p-10 lg:p-12 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-xs font-semibold text-primary uppercase tracking-[0.16em]">
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">{project.year}</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold tracking-[-0.04em] text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="max-w-xl text-muted-foreground text-sm leading-relaxed mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-7">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="px-3 py-1.5 text-[11px] font-medium text-muted-foreground border border-white/10 rounded-full bg-white/[0.03]"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm transition-all duration-300">
                    <span className="border-b border-primary/50 pb-1">Open case study</span>
                    <ExternalLink size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedProject ? (
        <div
          className="fixed inset-0 bg-background/90 backdrop-blur-md z-[9999] flex items-start justify-center p-4 pt-28 pb-8 animate-in fade-in duration-200 overflow-y-auto"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProject(null);
            }
          }}
        >
          <div className="max-w-3xl w-full max-h-[calc(100vh-10rem)] overflow-hidden border border-white/10 rounded-xl shadow-2xl glass bg-card flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-4 border-b border-white/10 flex justify-between items-start shrink-0">
              <div className="flex-1 pr-3">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-foreground leading-tight">{selectedProject.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded">
                      {selectedProject.category}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                      {selectedProject.year}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{selectedProject.description}</p>
                {selectedProject.url ? (
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full border border-primary/40 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Open live project <ExternalLink size={15} />
                  </a>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                aria-label="Close project details"
              >
                <X className="text-muted-foreground hover:text-foreground" size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="p-4">
                <div className="relative aspect-video overflow-hidden rounded-lg bg-black/50 border border-white/5 shadow-inner">
                  <div className="relative w-full h-full">
                    {currentImages.map((image, index) => (
                      <div
                        key={image}
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                          index === activeIndex
                            ? 'translate-x-0 opacity-100'
                            : index < activeIndex
                              ? '-translate-x-full opacity-0'
                              : 'translate-x-full opacity-0'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${selectedProject.title} - ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>

                  {currentImages.length > 1 ? (
                    <>
                      <button
                        type="button"
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-primary/80 text-white rounded-full transition-all backdrop-blur-sm border border-white/10"
                        onClick={previousImage}
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-primary/80 text-white rounded-full transition-all backdrop-blur-sm border border-white/10"
                        onClick={nextImage}
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  ) : null}
                </div>

                {currentImages.length > 1 ? (
                  <div className="flex justify-center gap-2 mt-4">
                    {currentImages.map((image, index) => {
                      const isActive = index === activeIndex;

                      return (
                        <div
                          key={image}
                          className={`relative h-2 rounded-full transition-all duration-300 ${
                            isActive ? 'w-8 bg-muted' : 'w-2 bg-muted/30'
                          }`}
                        >
                          {isActive ? (
                            <div
                              className="absolute inset-y-0 left-0 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                              style={{
                                width: `${progress}%`,
                                transition: 'width 0.05s linear',
                              }}
                            />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Projects;
