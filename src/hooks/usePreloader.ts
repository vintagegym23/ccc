import { useState, useEffect, useRef } from 'react';
import { TOTAL_FRAMES, getFrameUrl } from '../utils/preloadFrames';

const usePreloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const frames = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let loaded = 0;
    const images = new Array<HTMLImageElement>(TOTAL_FRAMES);

    const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image();
      img.src = getFrameUrl(i + 1);
      return new Promise<void>((resolve) => {
        img.onload = img.onerror = () => {
          images[i] = img;
          loaded++;
          setProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
          resolve();
        };
      });
    });

    void Promise.all(promises).then(() => {
      frames.current = images;
      setIsLoaded(true);
    });
  }, []);

  return { progress, isLoaded, frames };
};

export default usePreloader;
