import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Options {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}

const useScrollReveal = <T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  selector: string,
  { y = 32, duration = 0.9, stagger = 0.12, start = 'top 75%' }: Options = {}
) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const targets = containerRef.current.querySelectorAll(selector);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: 'play none none none',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, selector, y, duration, stagger, start]);
};

export default useScrollReveal;
