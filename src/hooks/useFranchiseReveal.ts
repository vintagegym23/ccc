import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface FranchiseRevealRefs {
  section: RefObject<HTMLElement | null>;
  image: RefObject<HTMLImageElement | null>;
  eyebrow: RefObject<HTMLSpanElement | null>;
  heading: RefObject<HTMLHeadingElement | null>;
  underline: RefObject<HTMLDivElement | null>;
  paragraph: RefObject<HTMLParagraphElement | null>;
  stats: RefObject<HTMLDivElement | null>;
  statValues: RefObject<(HTMLElement | null)[]>;
  buttons: RefObject<(HTMLElement | null)[]>;
}

export interface FranchiseStatTarget {
  to: number;
  prefix?: string;
  suffix?: string;
}

const CONTENT_DURATION = 0.7;
const CONTENT_STAGGER = 0.12;
const STATS_DURATION = 0.6;
const COUNT_DURATION = 1;
const BUTTON_DURATION = 0.5;
const BUTTON_STAGGER = 0.1;
const EASE = 'power3.out';

// Only the `inset()` shape is used here, and GSAP's CSSPlugin can tween
// between two inset() clip-paths directly — but feature-detect anyway, since
// the brief calls for a graceful fallback rather than assuming support.
const supportsClipPath =
  typeof CSS !== 'undefined' && !!CSS.supports?.('clip-path', 'inset(0% 0% 0% 0%)');

// How much of the viewport the image's reveal is scrubbed across — the
// window between the section entering (top 75%) and settling further up
// (top 25%). Progress is clamped to [0, 1] by ScrollTrigger outside that
// band, which is what gives the "locks in place past the section, and
// scrolling back up closes it again" behavior for free — no manual state.
const IMAGE_SCRUB_START = 'top 75%';
const IMAGE_SCRUB_END = 'top 25%';
const IMAGE_SCRUB = 0.5;

/**
 * Scroll-in behavior for the franchise highlight section, split into two
 * independent pieces:
 *
 * - The building image is scroll-scrubbed (not a one-time play): it wipes
 *   open via clip-path while the section scrolls into its trigger band, and
 *   reverses/closes if the user scrolls back up through that same band —
 *   directly tied to scroll position, not a triggered timeline.
 * - Content -> stats -> count-up -> buttons remain a single ScrollTrigger
 *   timeline that plays once and then leaves the section fully static — no
 *   loops, no parallax, nothing left running.
 *
 * Deliberately understated throughout (see the design brief this
 * implements): every step is a plain opacity/y (or clip-path) settle, no
 * scale/rotation/bounce.
 */
const useFranchiseReveal = (refs: FranchiseRevealRefs, statTargets: FranchiseStatTarget[]) => {
  useEffect(() => {
    const { section, image, eyebrow, heading, underline, paragraph, stats, statValues, buttons } = refs;
    if (
      !section.current ||
      !image.current ||
      !eyebrow.current ||
      !heading.current ||
      !underline.current ||
      !paragraph.current ||
      !stats.current
    ) {
      return;
    }

    // Respects the user's OS-level motion preference: skip the entrance
    // animation entirely and leave every element in the fully-visible state
    // it already has from initial render (stat numbers included, since the
    // JSX renders their final text by default — nothing to reset here).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const sectionEl = section.current;
    const imageEl = image.current;
    const statsEl = stats.current;
    const contentEls = [eyebrow.current, heading.current, underline.current, paragraph.current];
    const buttonEls = (buttons.current ?? []).filter((el): el is HTMLElement => !!el);
    const numberEls = statValues.current ?? [];

    const ctx = gsap.context(() => {
      gsap.set(contentEls, { opacity: 0, y: 24 });
      gsap.set(statsEl, { opacity: 0, y: 20 });
      gsap.set(buttonEls, { opacity: 0, y: 16 });
      numberEls.forEach((el) => {
        if (el) el.textContent = '0';
      });

      // Scrubbed, reversible, independent of the entrance timeline below —
      // fromTo (not a manual gsap.set + tween) so its "from" state is only
      // ever applied via the scrollTrigger itself, correctly initializing to
      // whatever progress the current scroll position implies on load
      // rather than always forcing "hidden" even if already scrolled past.
      gsap.fromTo(
        imageEl,
        supportsClipPath ? { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 } : { opacity: 0, x: -30 },
        {
          ...(supportsClipPath ? { clipPath: 'inset(0% 0% 0% 0%)' } : { x: 0 }),
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionEl,
            start: IMAGE_SCRUB_START,
            end: IMAGE_SCRUB_END,
            scrub: IMAGE_SCRUB,
          },
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top 75%',
          once: true,
          scrub: false,
        },
      });

      tl.addLabel('contentReveal', 0.15).to(
        contentEls,
        { opacity: 1, y: 0, duration: CONTENT_DURATION, ease: EASE, stagger: CONTENT_STAGGER },
        'contentReveal'
      );

      tl.addLabel('statsReveal').to(
        statsEl,
        { opacity: 1, y: 0, duration: STATS_DURATION, ease: EASE },
        'statsReveal'
      );

      tl.addLabel('countUp').add(() => {
        numberEls.forEach((el, i) => {
          const target = statTargets[i];
          if (!el || !target) return;
          const proxy = { val: 0 };
          gsap.to(proxy, {
            val: target.to,
            duration: COUNT_DURATION,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = `${target.prefix ?? ''}${Math.round(proxy.val)}${target.suffix ?? ''}`;
            },
          });
        });
      }, 'countUp');

      tl.addLabel('buttonsReveal').to(
        buttonEls,
        { opacity: 1, y: 0, duration: BUTTON_DURATION, ease: EASE, stagger: BUTTON_STAGGER },
        'buttonsReveal'
      );
    }, sectionEl);

    return () => ctx.revert();
  }, [refs, statTargets]);
};

export default useFranchiseReveal;
