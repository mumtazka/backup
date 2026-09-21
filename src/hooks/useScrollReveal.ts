import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (scope: RefObject<HTMLElement | null>) => {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        const delay = Number(element.dataset.revealDelay ?? 0);
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42, rotateX: -8, transformPerspective: 900 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            delay,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          },
        );
      });
    }, root);

    return () => context.revert();
  }, [scope]);
};
