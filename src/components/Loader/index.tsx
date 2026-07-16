import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  progress: number;
  isLoaded: boolean;
  onComplete: () => void;
}

const Loader = ({ progress, isLoaded, onComplete }: LoaderProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded || !rootRef.current) return;
    gsap.to(rootRef.current, {
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      ease: 'power2.inOut',
      onComplete,
    });
  }, [isLoaded, onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] bg-brand-sand flex flex-col items-center justify-center select-none"
    >
      <p className="text-brand-accent/80 text-[10px] tracking-[0.45em] uppercase mb-14">
        Chikmagalur Coffee Cafe
      </p>

      <div className="relative w-52 h-px bg-brand-dark/10 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-brand-accent transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-brand-dark/40 text-[10px] mt-5 tabular-nums tracking-widest">
        {String(progress).padStart(3, '0')}
      </p>
    </div>
  );
};

export default Loader;
