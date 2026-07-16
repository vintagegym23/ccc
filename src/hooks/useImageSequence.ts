import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { drawFrame } from '../utils/drawFrame';
import { TOTAL_FRAMES } from '../utils/preloadFrames';

gsap.registerPlugin(ScrollTrigger);

// How much of total scroll progress to spend fading each chapter in/out
const FADE = 0.04;

// Mobile viewports are narrow/tall, so the canvas's "cover" fit crops the
// hero frames much harder than on desktop. Zoom out below the `md`
// breakpoint (matches the rest of the codebase's mobile cutoff) so more of
// the composition stays visible; desktop is completely untouched (zoom 1).
const MOBILE_BREAKPOINT = 768;
const MOBILE_ZOOM = 0.95;
const getZoom = () => (window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_ZOOM : 1);

// Matches Home.tsx's NAV_HEIGHT_RATIO — the wrapper there is padded by 90%
// of the navbar's height on mobile, so this offset must match that same
// fraction, not the full navbar height, or the pin would engage slightly
// before/after the padding actually ends.
const NAV_HEIGHT_RATIO = 0.9;

const CHAPTER_RANGES = [
  { start: 1, end: 60 },
  { start: 61, end: 120 },
  { start: 121, end: 190 },
  { start: 191, end: 240 },
  { start: 241, end: 270 },
] as const;

interface Props {
  wrapperRef: RefObject<HTMLDivElement | null>;
  stageRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  chapterRefs: RefObject<(HTMLDivElement | null)[]>;
  frames: RefObject<HTMLImageElement[]>;
  isLoaded: boolean;
  onLeave?: () => void;
  onEnterBack?: () => void;
}

const useImageSequence = ({
  wrapperRef,
  stageRef,
  canvasRef,
  chapterRefs,
  frames,
  isLoaded,
  onLeave,
  onEnterBack,
}: Props) => {
  useEffect(() => {
    if (!isLoaded || !wrapperRef.current || !stageRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    let currentFrame = -1;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      if (currentFrame >= 0 && frames.current[currentFrame]) {
        drawFrame(canvas, frames.current[currentFrame], getZoom());
      }
    };

    resizeCanvas();

    if (frames.current[0]) {
      currentFrame = 0;
      drawFrame(canvas, frames.current[0], getZoom());
    }

    window.addEventListener('resize', resizeCanvas);

    // Mobile-only: Home.tsx reserves the fixed navbar's real height as
    // padding above the wrapper there (so Hero starts right below it, not
    // behind it) — reading the same #main-navbar element here, gated by the
    // same mobile check, and folding its height into "start" keeps the pin
    // engaging at scroll 0 despite that offset, instead of requiring the
    // user to first scroll past the gap before the frame animation begins.
    // Desktop stays 0 (unaffected) since Home.tsx never adds that padding there.
    const navHeight = window.innerWidth < MOBILE_BREAKPOINT
      ? (document.getElementById('main-navbar')?.offsetHeight ?? 0) * NAV_HEIGHT_RATIO
      : 0;

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: `top top+=${navHeight}`,
      end: 'bottom bottom',
      pin: stageRef.current,
      scrub: 1,
      onLeave,
      onEnterBack,
      onUpdate: (self) => {
        const p = self.progress;
        const frameIdx = Math.min(
          TOTAL_FRAMES - 1,
          Math.round(p * (TOTAL_FRAMES - 1))
        );

        if (frameIdx !== currentFrame && frames.current[frameIdx]) {
          currentFrame = frameIdx;
          drawFrame(canvas, frames.current[frameIdx], getZoom());
        }

        // Drive chapter text opacity / position from scroll progress
        CHAPTER_RANGES.forEach((ch, i) => {
          const el = chapterRefs.current?.[i];
          if (!el) return;

          const chStart = (ch.start - 1) / TOTAL_FRAMES;
          const chEnd = ch.end / TOTAL_FRAMES;

          let opacity: number;
          let y: number;
          let blur: number;

          if (p < chStart || p > chEnd) {
            opacity = 0;
            y = p < chStart ? 24 : -24;
            blur = 8;
          } else if (p < chStart + FADE) {
            const t = (p - chStart) / FADE;
            opacity = t;
            y = 24 * (1 - t);
            blur = 8 * (1 - t);
          } else if (p > chEnd - FADE) {
            const t = (p - (chEnd - FADE)) / FADE;
            opacity = 1 - t;
            y = -24 * t;
            blur = 8 * t;
          } else {
            opacity = 1;
            y = 0;
            blur = 0;
          }

          gsap.set(el, { opacity, y, filter: `blur(${blur.toFixed(2)}px)` });
        });
      },
    });

    return () => {
      st.kill();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isLoaded, wrapperRef, stageRef, canvasRef, chapterRefs, frames, onLeave, onEnterBack]);
};

export default useImageSequence;
