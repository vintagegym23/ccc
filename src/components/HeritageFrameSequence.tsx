import { useRef } from 'react';
import useCoffeeFrameSequence from '../hooks/useCoffeeFrameSequence';

/**
 * Fills the empty visual slot beside "A Legacy Steeped in Legend" with a
 * scroll-scrubbed coffee_frames sequence (see useCoffeeFrameSequence).
 */
const HeritageFrameSequence = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isLoaded } = useCoffeeFrameSequence(containerRef, canvasRef);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden rounded-lg shadow-md">
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full block transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default HeritageFrameSequence;
