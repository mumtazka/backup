import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';

export const useTilt = (scope: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const root = scope.current;
    const canHover = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!root || !canHover || reducedMotion) return;

    const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-tilt]'));
    const cleanups = panels.map((panel) => {
      const onMove = (event: PointerEvent) => {
        const bounds = panel.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        panel.style.setProperty('--tilt-x', `${y * -8}deg`);
        panel.style.setProperty('--tilt-y', `${x * 9}deg`);
        panel.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
        panel.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
      };
      const onLeave = () => {
        gsap.to(panel, {
          '--tilt-x': '0deg',
          '--tilt-y': '0deg',
          duration: 0.55,
          ease: 'power3.out',
          overwrite: true,
        });
      };

      panel.addEventListener('pointermove', onMove);
      panel.addEventListener('pointerleave', onLeave);
      return () => {
        panel.removeEventListener('pointermove', onMove);
        panel.removeEventListener('pointerleave', onLeave);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [scope]);
};
