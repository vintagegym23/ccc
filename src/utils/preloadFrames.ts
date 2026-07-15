export const TOTAL_FRAMES = 270;

export const getFrameUrl = (index: number): string =>
  `/frames/${String(index).padStart(4, '0')}.webp`;
