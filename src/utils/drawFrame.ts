export const drawFrame = (
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  zoom: number = 1
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

  // zoom < 1 shrinks the "cover" rect uniformly (still centered), showing
  // more of the frame instead of cropping in so tightly — used on mobile,
  // where a narrow/tall canvas ratio otherwise crops the composition hard.
  drawW *= zoom;
  drawH *= zoom;

  const drawX = (W - drawW) / 2;
  // At zoom 1 "cover" always guarantees drawH >= H, so this is always <= 0
  // (i.e. cropped, centered, unchanged from before). Zooming out can push
  // drawH below H on portrait/mobile canvases, opening an actual vertical
  // gap — anchor that case to the top (drawY 0) instead of centering it, so
  // the whole gap lands at the bottom, inside the region the dark
  // bottom-up gradient overlay (see Hero.tsx) already darkens for text
  // legibility, rather than also opening a bare gap at the top.
  const drawY = drawH >= H ? (H - drawH) / 2 : 0;

  // Fill first (not just clearRect) so a zoomed-out frame that no longer
  // fully covers the canvas leaves a clean, intentional letterbox instead
  // of exposing whatever's behind the transparent canvas. Matches
  // brand-sand (the Our Heritage section right below the Hero) rather than
  // black, so the gap — which lands at the bottom, see drawY below — reads
  // as a seamless preview of the next section instead of a stray black bar.
  ctx.fillStyle = '#FAF6F0';
  ctx.fillRect(0, 0, W, H);
  ctx.drawImage(img, drawX, drawY, drawW, drawH);

  // Dark gradient for chapter-text legibility, baked in here (rather than a
  // separate full-height CSS layer over the canvas) and anchored to the
  // drawn image's own bottom edge/height — not the canvas's. A zoomed-out
  // mobile frame's letterbox sits below the image, and a canvas-height-based
  // gradient would still hit its darkest (55% black) stop down there,
  // tinting the sand letterbox gray instead of leaving it a clean match for
  // the section below. At zoom 1 (desktop, and mobile before any letterbox
  // opens) the image bottom always equals H, so this is pixel-identical to
  // the old fixed gradient.
  const imgBottom = drawY + drawH;
  const gradTop = Math.max(0, imgBottom - drawH * 0.5);
  const gradient = ctx.createLinearGradient(0, gradTop, 0, imgBottom);
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, gradTop, W, imgBottom - gradTop);
};
