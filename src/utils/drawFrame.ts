export const drawFrame = (
  canvas: HTMLCanvasElement,
  img: HTMLImageElement
): void => {
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
