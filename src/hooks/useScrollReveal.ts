import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (scope: RefObject<HTMLElement | null>) => {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const distance = Math.min(72, 30 + index * 5);
        const tilt = direction * (index % 3 === 0 ? 5 : 2.5);
        const usesGeometryMask = !element.classList.contains('project-slab');
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top 92%',
            end: 'top 52%',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        timeline.fromTo(
          element,
          {
            autoAlpha: 0.25,
            x: direction * distance,
            y: 52 + (index % 3) * 14,
            rotate: tilt,
            scale: 0.9,
            skewY: direction * 2,
            filter: 'blur(8px)',
            ...(usesGeometryMask ? { clipPath: 'inset(10% 7% 10% 7% round 1.25rem)' } : {}),
            transformPerspective: 1100,
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            skewY: 0,
            filter: 'blur(0px)',
            ...(usesGeometryMask ? { clipPath: 'inset(0% 0% 0% 0% round 0rem)' } : {}),
            ease: 'none',
          },
        );
      });
    }, root);

    return () => context.revert();
  }, [scope]);
};
