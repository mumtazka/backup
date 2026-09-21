import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CursorFollower = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reducedMotion || !dotRef.current || !ringRef.current) return;

    const moveDotX = gsap.quickTo(dotRef.current, 'x', { duration: 0.1, ease: 'power3.out' });
    const moveDotY = gsap.quickTo(dotRef.current, 'y', { duration: 0.1, ease: 'power3.out' });
    const moveRingX = gsap.quickTo(ringRef.current, 'x', { duration: 0.38, ease: 'power3.out' });
    const moveRingY = gsap.quickTo(ringRef.current, 'y', { duration: 0.38, ease: 'power3.out' });

    const move = (event: PointerEvent) => {
      moveDotX(event.clientX);
      moveDotY(event.clientY);
      moveRingX(event.clientX);
      moveRingY(event.clientY);
    };

    const setInteractive = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest('a, button, input, textarea, [data-cursor]') : null;
      document.body.classList.toggle('cursor-active', Boolean(target));
    };

    const press = () => document.body.classList.add('cursor-pressed');
    const release = () => document.body.classList.remove('cursor-pressed');

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', setInteractive);
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    document.body.classList.add('has-custom-cursor');

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', setInteractive);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      document.body.classList.remove('has-custom-cursor', 'cursor-active', 'cursor-pressed');
    };
  }, []);

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={ringRef} className="custom-cursor__ring" />
      <div ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
};

export default CursorFollower;
