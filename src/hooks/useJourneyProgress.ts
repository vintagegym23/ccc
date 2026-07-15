import { useEffect, useState, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives the Coffee Journey scroll timeline: pins the nav while the sections
 * wrapper is in view, scrubs each connecting line's fill to the scroll
 * position of the section it precedes, and activates milestones cumulatively
 * (in reverse when scrolling up) as each line finishes filling.
 *
 * Pinning is done manually (isPinned + a same-height placeholder in the
 * component) rather than via CSS `position: sticky` or GSAP's `pin: true`:
 * an app-wide ancestor has `overflow-x-hidden`, which disables `sticky` for
 * every descendant, and GSAP's pin inserts a spacer sized to the full pin
 * distance — which, sitting right above the sections it reveals, pushes them
 * down by that same distance and makes the pin release before the sections
 * even scroll into view. A placeholder fixed to the nav's own height carries
 * no such feedback loop.
 */
const useJourneyProgress = (
  navRef: RefObject<HTMLDivElement | null>,
  wrapperRef: RefObject<HTMLDivElement | null>,
  sectionRefs: RefObject<(HTMLElement | null)[]>,
  lineRefs: RefObject<(HTMLDivElement | null)[]>,
  stickyTop: number
) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isPinned, setIsPinned] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const update = () => setNavHeight(nav.offsetHeight);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [navRef]);

  useEffect(() => {
    const sections = sectionRefs.current;
    const lines = lineRefs.current;

    if (!wrapperRef.current || !navHeight || sections.some((s) => !s) || lines.some((l) => !l)) {
      return;
    }

    const offset = stickyTop + navHeight;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: `top ${stickyTop}`,
        end: `bottom ${offset}`,
        onUpdate: (self) => {
          // If the content after the wrapper (e.g. the footer) is too short to let
          // the page scroll as far as the natural release point, the page hits its
          // scroll ceiling first. Force-release the pin there so it can't linger
          // fixed over the footer.
          const atPageBottom =
            window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
          setIsPinned(self.isActive && !atPageBottom);
        },
      });

      lines.forEach((line, i) => {
        const section = sections[i];
        if (!line || !section) return;

        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: `top ${offset}`,
              end: `bottom ${offset}`,
              scrub: true,
            },
          }
        );

        ScrollTrigger.create({
          trigger: section,
          start: `top ${offset}`,
          end: `bottom ${offset}`,
          onLeave: () => setActiveStep(i + 2),
          onEnterBack: () => setActiveStep(i + 1),
        });
      });
    });

    return () => ctx.revert();
  }, [wrapperRef, sectionRefs, lineRefs, stickyTop, navHeight]);

  return { activeStep, setActiveStep, isPinned, navHeight };
};

export default useJourneyProgress;
