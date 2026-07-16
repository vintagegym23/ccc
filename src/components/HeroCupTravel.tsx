import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TRAVEL_ROTATION = -30; // degrees — tilts left as it travels
const LANDING_FADE = 0.12; // fraction of progress spent crossfading into the resting cup
const GROWTH_END = 0.85; // scale finishes growing here, then holds flat through the landing fade
const MOBILE_BREAKPOINT = 768; // matches Tailwind's `md` — same cutoff #legacy-cup-target's CSS uses

// Must mirror #legacy-cup-target's top-[%]/right-[%] in Home.tsx exactly at
// each breakpoint — that element's CSS position and this live travel target
// are two independent descriptions of the same landing spot, and any
// mismatch between them reproduces the earlier "shrink/jump at landing" bug
// (see the size-matching comment further down) on whichever breakpoint they
// disagree on.
const getLandingFractions = () =>
  window.innerWidth < MOBILE_BREAKPOINT
    ? { top: 0.88, rightInset: 0.26 }
    : { top: 0.6, rightInset: 0.22 };

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeInOut = gsap.parseEase('power2.inOut');

/**
 * Sends the Hero's coffee cup on a scroll-scrubbed journey into the Our
 * Heritage section, taking over the *instant* the original inline cup
 * (Hero.tsx, #hero-cup-source) starts to disappear — this component force-
 * hides that original the moment its own trigger activates and shows the
 * traveling clone at full opacity in the same breath, so there's never a
 * moment with both visible: it reads as one cup that starts moving, not two
 * overlapping. The original is restored to normal (letting useImageSequence
 * govern it again) if the user scrolls back up above the trigger's start.
 *
 * The original can't physically travel itself — it's trapped inside Hero's
 * pinned, overflow-hidden stage. So this renders a separate `position: fixed`
 * cup, sized to match the original's actual on-screen box at handoff time,
 * that travels/grows/rotates via transforms only, then crossfades into a
 * resting cup already sitting (invisible until then) inside Our Heritage — a
 * normal absolutely-positioned child of that section, so once "landed" it
 * scrolls away naturally with Heritage and can never drift into Our Values.
 * Position, size and rotation all finish settling before the landing
 * crossfade begins, so the crossfade is opacity-only — no jump or
 * shrink-while-fading from position/size still catching up mid-fade.
 *
 * Source/target positions and sizes are read from live getBoundingClientRect
 * calls rather than hardcoded, so this holds up across screen sizes without
 * separate responsive breakpoints.
 */
const HeroCupTravel = () => {
  const cupRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const heroWrapper = document.getElementById('hero-wrapper');
    const cupSource = document.getElementById('hero-cup-source');
    const legacySection = document.getElementById('legacy-section');
    const restingCup = document.getElementById('legacy-cup-target');
    const cup = cupRef.current;
    if (!heroWrapper || !cupSource || !legacySection || !restingCup || !cup) return;

    const ctx = gsap.context(() => {
      // Base render size = the original inline cup's actual current box
      // (both dimensions, so its aspect ratio carries over exactly) — this
      // is "the size of that cup" next to CAFE, measured rather than guessed.
      // A one-time layout write, not a per-frame one; growth from here on is
      // done with `scale` alone.
      const sourceBox = cupSource.getBoundingClientRect();
      const sourceWidth = sourceBox.width;
      gsap.set(cup, {
        width: sourceBox.width,
        height: sourceBox.height,
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
        rotation: 0,
        scale: 1,
      });
      gsap.set(restingCup, { autoAlpha: 0 });

      ScrollTrigger.create({
        // Aligned with roughly when Hero's own chapter text/cup naturally
        // start fading out (useImageSequence's fade-out window, near the
        // very end of Hero's pin) — travel takes over at that exact instant.
        trigger: heroWrapper,
        start: 'bottom 110%',
        endTrigger: legacySection,
        end: 'top top',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;

          if (p <= 0) {
            // below the handoff point: original cup is governed normally by
            // useImageSequence again, traveling clone stays fully hidden
            gsap.set(cupSource, { autoAlpha: 1 });
            gsap.set(cup, { autoAlpha: 0 });
            gsap.set(restingCup, { autoAlpha: 0 });
            return;
          }

          // past the handoff point: original is force-hidden regardless of
          // whatever useImageSequence's own fade would otherwise show
          gsap.set(cupSource, { autoAlpha: 0 });

          if (p >= 1) {
            gsap.set(cup, { autoAlpha: 0 });
            gsap.set(restingCup, { autoAlpha: 1 });
            return;
          }

          const sourceRect = cupSource.getBoundingClientRect();
          const targetRect = legacySection.getBoundingClientRect();
          // offsetWidth, not getBoundingClientRect().width — the resting cup
          // is rotated -30deg, and getBoundingClientRect() on a rotated
          // element returns its *rotated bounding box* (visibly larger than
          // its actual local width). Scaling toward that inflated number,
          // then rotating the clone on top, compounded the inflation twice —
          // so the clone was visibly larger than the resting cup right at
          // the handoff, reading as a shrink once it faded into the
          // (correctly-sized) resting cup. offsetWidth ignores transforms
          // entirely and gives the true local width to scale toward.
          const targetWidth = restingCup.offsetWidth;
          const startX = sourceRect.left + sourceRect.width / 2;
          const startY = sourceRect.top + sourceRect.height / 2;
          // right side of Heritage, landing fraction depends on breakpoint
          // (see getLandingFractions) since the grid stacks below md
          const { top: topFraction, rightInset } = getLandingFractions();
          const endX = targetRect.right - Math.max(64, targetRect.width * rightInset);
          const endY = targetRect.top + targetRect.height * topFraction;

          // x, y, scale and rotation all settle together by GROWTH_END, then
          // hold completely flat through the landing crossfade below — if
          // position kept drifting while opacity was fading, the traveling
          // cup would visibly lag a few pixels behind the (already static)
          // resting cup, reading as a "jump"/double image during the fade.
          // Locking everything early means the crossfade is opacity-only:
          // both cups sit in the exact same spot the whole time it fades.
          const t = easeInOut(clamp01(p / GROWTH_END));
          const x = gsap.utils.interpolate(startX, endX, t);
          const y = gsap.utils.interpolate(startY, endY, t);
          const scale = gsap.utils.interpolate(1, targetWidth / sourceWidth, t);
          const rotation = gsap.utils.interpolate(0, TRAVEL_ROTATION, t);

          // full opacity the instant it takes over (no fade-in — that's the
          // point, a clean swap with the original); fades out only at the
          // very end, handing off to the resting cup
          const fadeOut = clamp01((p - (1 - LANDING_FADE)) / LANDING_FADE);
          const alpha = 1 - fadeOut;

          gsap.set(cup, { x, y, scale, rotation, autoAlpha: alpha });
          gsap.set(restingCup, { autoAlpha: fadeOut });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <img
      ref={cupRef}
      src="/cup.png"
      alt=""
      aria-hidden="true"
      className="fixed top-0 left-0 z-30 pointer-events-none select-none"
    />
  );
};

export default HeroCupTravel;
