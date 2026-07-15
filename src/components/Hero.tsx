import { useRef, type RefObject } from 'react';
import useImageSequence from '../hooks/useImageSequence';

const CHAPTER_DATA = [
  { heading: 'THE ART OF\nSLOW ROASTING', sub: 'Crafted with passion.' },
  { heading: 'AUTHENTIC ROOTS', sub: 'Every bean tells a story.' },
  { heading: 'PRECISION', sub: 'Roasted to perfection.' },
  { heading: 'ELEVATING\nTHE SENSES', sub: 'Every sip matters.' },
  { heading: 'OAT & BEAN', sub: 'Explore Our Story' },
] as const;

interface HeroProps {
  frames: RefObject<HTMLImageElement[]>;
  isLoaded: boolean;
  onLeave?: () => void;
  onEnterBack?: () => void;
}

const Hero = ({ frames, isLoaded, onLeave, onEnterBack }: HeroProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useImageSequence({
    wrapperRef,
    stageRef,
    canvasRef,
    chapterRefs,
    frames,
    isLoaded,
    onLeave,
    onEnterBack,
  });

  return (
    // Scroll-length container: defines total scroll distance (normal document flow, not pinned itself)
    <div ref={wrapperRef} className="relative w-full" style={{ height: '400vh' }}>
      {/* Pinned stage: the actual viewport-height visual layer GSAP pins in place */}
      <div ref={stageRef} className="relative w-full h-screen overflow-hidden">
        {/* Canvas — sized via useImageSequence */}
        <canvas ref={canvasRef} className="absolute top-0 left-0 block" />

        {/* Dark gradient at bottom for text legibility */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 50%)',
          }}
        />

        {/* Chapter text overlay */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {CHAPTER_DATA.map((ch, i) => (
            <div
              key={i}
              ref={(el) => {
                chapterRefs.current[i] = el;
              }}
              className="absolute bottom-20 left-10 md:left-20 opacity-0"
            >
              <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase mb-4">
                Chikmagalur Coffee Co.
              </p>
              <h1
                className="text-white font-light leading-none mb-4"
                style={{
                  fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
                  letterSpacing: '-0.02em',
                  whiteSpace: 'pre-line',
                }}
              >
                {ch.heading}
              </h1>
              <p className="text-white/50 text-sm md:text-base font-light tracking-widest">
                {ch.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        {isLoaded && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
            <p className="text-white/25 text-[9px] tracking-[0.4em] uppercase mb-1">
              Scroll
            </p>
            <div className="w-px h-10 bg-white/15 overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 h-4 bg-white/50 scroll-hint-bar" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
