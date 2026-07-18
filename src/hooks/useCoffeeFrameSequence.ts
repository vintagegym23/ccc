import { useEffect, useRef, useState, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 74;
const getFrameUrl = (index: number): string =>
  `/coffee_frames/frame_${String(index).padStart(4, '0')}.webp`;

// Plain "cover" fit — no zoom/letterbox/gradient logic like drawFrame.ts
// (Hero's version), since this is a small decorative visual with a fixed,
// reasonable aspect ratio rather than a full-bleed background behind text.
const drawCoverFrame = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
  const ctx = canvas.getContext('2d');
  if (!ctx || !img.naturalWidth) return;

  const W = canvas.width;
  const H = canvas.height;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = W / H;

  let drawW: number, drawH: number;
  if (imgRatio > canvasRatio) {
    drawH = H;
    drawW = H * imgRatio;
  } else {
    drawW = W;
    drawH = W / imgRatio;
  }
  const drawX = (W - drawW) / 2;
  const drawY = (H - drawH) / 2;

  ctx.clearRect(0, 0, W, H);
  ctx.drawImage(img, drawX, drawY, drawW, drawH);
};

/**
 * Drives a small, non-pinned scroll-scrubbed frame sequence into a canvas —
 * the coffee_frames sequence for the empty visual slot beside "A Legacy
 * Steeped in Legend". Unlike Hero's useImageSequence, this doesn't pin the
 * page: it just scrubs frames 0->73 as the container naturally scrolls from
 * entering the bottom of the viewport to exiting the top, so it reads as a
 * self-contained inline visual rather than a full-screen takeover.
 *
 * Frames are preloaded independently of the main page Loader (usePreloader/
 * TOTAL_FRAMES=270 is Hero-specific) since this is a below-the-fold, lower-
 * priority visual that shouldn't delay first paint.
 */
const useCoffeeFrameSequence = (
  containerRef: RefObject<HTMLDivElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>
) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const framesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let cancelled = false;
    const images = new Array<HTMLImageElement>(TOTAL_FRAMES);

    const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image();
      img.src = getFrameUrl(i + 1);
      return new Promise<void>((resolve) => {
        img.onload = img.onerror = () => {
          images[i] = img;
          resolve();
        };
      });
    });

    void Promise.all(promises).then(() => {
      if (cancelled) return;
      framesRef.current = images;
      setIsLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    let currentFrame = -1;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      if (currentFrame >= 0 && framesRef.current[currentFrame]) {
        drawCoverFrame(canvas, framesRef.current[currentFrame]);
      }
    };

    resizeCanvas();
    if (framesRef.current[0]) {
      currentFrame = 0;
      drawCoverFrame(canvas, framesRef.current[0]);
    }

    window.addEventListener('resize', resizeCanvas);

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.round(self.progress * (TOTAL_FRAMES - 1)));
        if (frameIdx !== currentFrame && framesRef.current[frameIdx]) {
          currentFrame = frameIdx;
          drawCoverFrame(canvas, framesRef.current[frameIdx]);
        }
      },
    });

    return () => {
      st.kill();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isLoaded, containerRef, canvasRef]);

  return { isLoaded };
};

export default useCoffeeFrameSequence;
