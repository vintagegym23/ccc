import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { drawFrame } from '../utils/drawFrame';
import { TOTAL_FRAMES } from '../utils/preloadFrames';

gsap.registerPlugin(ScrollTrigger);

// How much of total scroll progress to spend fading each chapter in/out
const FADE = 0.04;

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
        drawFrame(canvas, frames.current[currentFrame]);
      }
    };

    resizeCanvas();

    if (frames.current[0]) {
      currentFrame = 0;
      drawFrame(canvas, frames.current[0]);
    }

    window.addEventListener('resize', resizeCanvas);

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
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
          drawFrame(canvas, frames.current[frameIdx]);
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
