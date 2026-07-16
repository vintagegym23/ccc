import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Same command structure (M...C...L...C...Z) across all 5 states, so GSAP can
// tween the `d` attribute directly as a string — no MorphSVG plugin needed.
const WIPE_STATES = [
  'M 0 100 C 30 100 70 100 100 100 L 100 100 C 70 100 30 100 0 100 Z', // 1. Start — flat, collapsed at the bottom
  'M 0 60 C 30 30 70 80 100 50 L 100 100 C 70 100 30 100 0 100 Z',     // 2. Wave In
  'M 0 0 C 30 0 70 0 100 0 L 100 100 C 70 100 30 100 0 100 Z',         // 3. Cover — fills the screen
  'M 0 0 C 30 0 70 0 100 0 L 100 50 C 70 80 30 30 0 60 Z',             // 4. Wave Out
  'M 0 0 C 30 0 70 0 100 0 L 100 0 C 70 0 30 0 0 0 Z',                 // 5. End — flat, collapsed at the top
];

// Same palette as the "Our Eternal Commitment" value cards. Bottom → top
// paint order, so brand-sage is the visual top layer.
const LAYERS = [
  { id: 'brown-dark', color: '#5C3A21' }, // brand-brown-dark
  { id: 'card-light', color: '#EFECE6' }, // brand-card-light
  { id: 'sage', color: '#8E9F88' },       // brand-sage
];

/**
 * A gooey liquid-wipe flourish that plays automatically as the user crosses
 * the seam between two sections — forward on the way down, in reverse on the
 * way back up — and repeats every time that boundary is crossed, in either
 * direction. Renders no visible layout of its own; `triggerRef` is a
 * zero-height marker ScrollTrigger watches to fire the wipe at the right
 * scroll position.
 */
const LiquidWipeTransition = () => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const paths = pathRefs.current;
    if (!triggerRef.current || paths.some((p) => !p)) return;

    const ctx = gsap.context(() => {
      gsap.set(paths, { attr: { d: WIPE_STATES[0] } });

      const tl = gsap.timeline({ paused: true });

      tl
        // wipe up to cover: bottom layer (brown) leads, sage trails behind
        .to(paths, { attr: { d: WIPE_STATES[1] }, duration: 0.5, stagger: 0.1, ease: 'power2.inOut' })
        .to(paths, { attr: { d: WIPE_STATES[2] }, duration: 0.4, stagger: 0.1, ease: 'power2.inOut' })
        // hold at full coverage for a beat before receding
        // wipe up to reveal: top layer (sage) peels off first
        .to(paths, { attr: { d: WIPE_STATES[3] }, duration: 0.4, stagger: -0.1, ease: 'power2.inOut', delay: 0.15 })
        .to(paths, { attr: { d: WIPE_STATES[4] }, duration: 0.5, stagger: -0.1, ease: 'power2.inOut' });

      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: 'top 70%',
        // scrolling down past the seam: play the wipe forward
        onEnter: () => tl.restart(),
        // scrolling back up past the same seam: unwind it in reverse
        onLeaveBack: () => tl.reverse(),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={triggerRef} aria-hidden="true" />
      <svg
        className="fixed inset-0 w-full h-full z-[9999] pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {LAYERS.map((layer, i) => (
          <path
            key={layer.id}
            ref={(el) => { pathRefs.current[i] = el; }}
            fill={layer.color}
          />
        ))}
      </svg>
    </>
  );
};

export default LiquidWipeTransition;
