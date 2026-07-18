import { useEffect, useRef, useState, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Files on disk are 1-indexed frame_0001.webp .. frame_0120.webp. The design
// spec describes them as logical frames 0-120 (121 values) — logical frame N
// maps to file (N + 1), clamped to the last available file (120).
const TOTAL_FILES = 120;
const getFrameUrl = (fileIndex: number): string =>
  `/india_frames/frame_${String(fileIndex).padStart(4, '0')}.webp`;

// Piecewise-linear map from raw scroll progress (0-1) to a logical 0-120
// frame, exactly matching the spec's percentage -> frame-range table. A
// single global linear formula (progress * 120) would NOT land segment
// boundaries at these same percentages, since the segments aren't uniformly
// sized (e.g. Maharashtra spans 30 frames over a 20%-wide window, Telangana
// spans 23 frames over the same 20%-wide window).
const SEGMENTS = [
  { pStart: 0, pEnd: 0.15, fStart: 0, fEnd: 16 }, // intro
  { pStart: 0.15, pEnd: 0.35, fStart: 16, fEnd: 39 }, // Telangana
  { pStart: 0.35, pEnd: 0.5, fStart: 40, fEnd: 54 }, // Andhra Pradesh
  { pStart: 0.5, pEnd: 0.7, fStart: 55, fEnd: 75 }, // Karnataka
  { pStart: 0.7, pEnd: 0.9, fStart: 76, fEnd: 106 }, // Maharashtra
  { pStart: 0.9, pEnd: 1, fStart: 107, fEnd: 120 }, // outro
] as const;

const getFrameFileIndex = (progress: number): number => {
  const seg = SEGMENTS.find((s) => progress <= s.pEnd) ?? SEGMENTS[SEGMENTS.length - 1];
  const span = seg.pEnd - seg.pStart;
  const t = span <= 0 ? 1 : (progress - seg.pStart) / span;
  const logicalFrame = seg.fStart + t * (seg.fEnd - seg.fStart);
  return Math.min(TOTAL_FILES, Math.max(1, Math.round(logicalFrame) + 1));
};

// -1 = no card active (intro/outro), 0-3 = Telangana/Andhra/Karnataka/Maharashtra
export const getActiveCardIndex = (progress: number): number => {
  if (progress < 0.15) return -1;
  if (progress < 0.35) return 0;
  if (progress < 0.5) return 1;
  if (progress < 0.7) return 2;
  if (progress < 0.9) return 3;
  return -1;
};

// "Contain" fit (letterboxed, never cropped) — unlike the cover-fit helpers
// elsewhere on this page, cropping a map would cut off parts of the country.
const drawContainFrame = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
  const ctx = canvas.getContext('2d');
  if (!ctx || !img.naturalWidth) return;

  const W = canvas.width;
  const H = canvas.height;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = W / H;

  let drawW: number, drawH: number;
  if (imgRatio > canvasRatio) {
    drawW = W;
    drawH = W / imgRatio;
  } else {
    drawH = H;
    drawW = H * imgRatio;
  }
  const drawX = (W - drawW) / 2;
  const drawY = (H - drawH) / 2;

  ctx.clearRect(0, 0, W, H);
  ctx.drawImage(img, drawX, drawY, drawW, drawH);
};

interface Options {
  wrapperRef: RefObject<HTMLDivElement | null>; // tall scroll-length container (ScrollTrigger's trigger, not itself pinned)
  stageRef: RefObject<HTMLDivElement | null>; // h-screen content that gets pinned
  mapContainerRef: RefObject<HTMLDivElement | null>; // canvas's own parent — governs canvas render size
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

/**
 * Pins the Our Franchises section for one continuous scroll journey and
 * scrubs the india_frames map sequence across it, while also exposing which
 * state card (if any) should be in its "active" visual state at the current
 * scroll progress — both driven off the same single ScrollTrigger so they
 * can never drift out of sync with each other.
 */
const useFranchiseMapSequence = ({ wrapperRef, stageRef, mapContainerRef, canvasRef }: Options) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const framesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let cancelled = false;
    const images = new Array<HTMLImageElement>(TOTAL_FILES);

    const promises = Array.from({ length: TOTAL_FILES }, (_, i) => {
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
    if (!isLoaded || !wrapperRef.current || !stageRef.current || !mapContainerRef.current || !canvasRef.current) {
      return;
    }

    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    const mapContainer = mapContainerRef.current;
    const canvas = canvasRef.current;
    let currentFile = -1;

    const draw = (fileIndex: number) => {
      const img = framesRef.current[fileIndex - 1];
      if (img) drawContainFrame(canvas, img);
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = mapContainer.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      if (currentFile >= 1) draw(currentFile);
    };

    resizeCanvas();
    currentFile = 1;
    draw(1);
    window.addEventListener('resize', resizeCanvas);

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      pin: stage,
      scrub: 1,
      onUpdate: (self) => {
        const fileIndex = getFrameFileIndex(self.progress);
        if (fileIndex !== currentFile) {
          currentFile = fileIndex;
          draw(fileIndex);
        }
        setActiveIndex(getActiveCardIndex(self.progress));
      },
    });

    return () => {
      st.kill();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isLoaded, wrapperRef, stageRef, mapContainerRef, canvasRef]);

  return { isLoaded, activeIndex };
};

export default useFranchiseMapSequence;
