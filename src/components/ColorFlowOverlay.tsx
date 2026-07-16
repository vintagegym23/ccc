import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PAIRS = [
  { cardId: 'value-card-1', circleId: 'senses-circle-1', color: '#5C3A21' }, // brand-brown-dark
  { cardId: 'value-card-2', circleId: 'senses-circle-2', color: '#EFECE6' }, // brand-card-light
  { cardId: 'value-card-3', circleId: 'senses-circle-3', color: '#8E9F88' }, // brand-sage
] as const;

const NEUTRAL_TEXT = '#2A1A0F'; // brand-dark
const LIGHT_TEXT = '#FAF6F0'; // brand-sand

// Orb sizes (px) at each stage of its journey — spawn small, travel while
// shrinking, then a quick shrink-and-expand as it merges into the circle.
const ORB_TRAVEL_START_SIZE = 52;
const ORB_TRAVEL_END_SIZE = 16;
const ORB_MERGE_DIP_SIZE = 10;
const ORB_MERGE_EXPAND_SIZE = 100;

// Sub-phase boundaries within a single orb's 0→1 progress (orbP, not raw
// ScrollTrigger progress — see TRAVEL_PHASE_END below for that mapping).
const SPAWN_END = 0.1;
const TRAVEL_END = 0.75;
const MERGE_DIP_END = 0.35; // fraction *within* the merge phase (0.75 -> 1)

// Global gate, in raw ScrollTrigger progress: travel (spawn + bezier flight +
// merge/fade) is confined to 0 -> TRAVEL_PHASE_END, and the circle fill is
// confined to TRAVEL_PHASE_END -> 1. Every orb finishes its whole journey
// (including fading out) at exactly TRAVEL_PHASE_END, and every fill starts
// there too — same boundary for both, so there's no gap where the orb has
// already vanished but the fill hasn't started yet.
const TRAVEL_PHASE_END = 0.8;
const TRAVEL_START_STAGGER = 0.04; // per-card stagger, applied only to when travel *starts*

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const mapRange = (p: number, start: number, end: number) => clamp01((p - start) / (end - start));
const easeOut = gsap.parseEase('power2.out');
const easeInOut = gsap.parseEase('power1.inOut');
const cubicPoint = (t: number, p0: number, p1: number, p2: number, p3: number) => {
  const mt = 1 - t;
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
};

interface FlowNode {
  card: HTMLElement;
  drain: HTMLElement;
  drainText: NodeListOf<HTMLElement>;
  circle: HTMLElement;
  fill: HTMLElement;
  fillText: NodeListOf<HTMLElement>;
}

/**
 * Ties the "Our Values" cards to the "Elevating the Senses" numbered circles:
 * as the user scrolls from one section to the other, each card's color drains
 * away (a layer slides down and out, revealing the neutral card beneath)
 * while its essence condenses into a small glowing orb that travels — via a
 * live-recomputed cubic bezier, not a straight line — down into its matching
 * circle, shrinking as it goes and merging into the circle on arrival, which
 * fills from the bottom up in parallel. One scrubbed ScrollTrigger drives
 * every sub-animation off a single progress value, so scrolling back up
 * reverses the whole sequence for free — no separate reverse logic needed.
 *
 * The bezier control points are recomputed every scrub tick from the card's
 * and circle's *current* on-screen positions, which is why this uses manual
 * cubic-bezier math rather than GSAP's MotionPathPlugin: MotionPath expects a
 * fixed path handed to a duration-based tween, and re-building/killing a
 * tween every frame to chase a moving target would fight the scrub instead
 * of driving smoothly off it.
 *
 * Renders only a fixed overlay holding the three orbs; the card/circle
 * layers themselves live in Home.tsx and are found here by id, the same
 * pattern used by LiquidWipeTransition.
 */
const ColorFlowOverlay = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const valuesSection = document.getElementById('values-section');
    const sensesSection = document.getElementById('senses-section');
    if (!valuesSection || !sensesSection) return;

    const nodes: FlowNode[] = [];
    for (const { cardId, circleId } of PAIRS) {
      const card = document.getElementById(cardId);
      const circle = document.getElementById(circleId);
      const drain = card?.querySelector<HTMLElement>('.color-drain-layer') ?? null;
      const fill = circle?.querySelector<HTMLElement>('.circle-fill-layer') ?? null;
      if (!card || !circle || !drain || !fill) return;
      nodes.push({
        card,
        drain,
        drainText: card.querySelectorAll<HTMLElement>('.drain-text'),
        circle,
        fill,
        fillText: circle.querySelectorAll<HTMLElement>('.circle-fill-text'),
      });
    }

    const ctx = gsap.context(() => {
      nodes.forEach((n) => {
        gsap.set(n.drain, { yPercent: 0 });
        gsap.set(n.fill, { yPercent: 100 });
      });
      // orbs are centered on their (x, y) translation regardless of size
      gsap.set(orbRefs.current, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

      // Drives the orb through spawn -> bezier travel -> merge/fade. Confined
      // entirely to the 0 -> TRAVEL_PHASE_END window of raw progress (see
      // `orbP` in update() below) — by the time orbP reaches 1, the orb has
      // fully faded out, and that's also exactly when the circle fill (a
      // separate, independent progress value) starts. Same boundary for
      // both, by construction, so there's no gap between "orb gone" and
      // "fill starts" for the illusion-of-popping bug to sneak back in.
      const updateOrb = (i: number, n: FlowNode, orbP: number) => {
        const orb = orbRefs.current[i];
        if (!orb) return;

        if (orbP <= 0 || orbP >= 1) {
          gsap.set(orb, { autoAlpha: 0 });
          return;
        }

        const cardRect = n.card.getBoundingClientRect();
        const circleRect = n.circle.getBoundingClientRect();
        const startX = cardRect.left + cardRect.width / 2;
        const startY = cardRect.bottom - 14; // center-bottom area of the card
        const endX = circleRect.left + circleRect.width / 2;
        const endY = circleRect.top + circleRect.height / 2;

        // Phase 2: condense into an orb at the card, scaling/fading in
        if (orbP < SPAWN_END) {
          const t = easeOut(orbP / SPAWN_END);
          gsap.set(orb, {
            x: startX,
            y: startY,
            width: ORB_TRAVEL_START_SIZE * t,
            height: ORB_TRAVEL_START_SIZE * t,
            autoAlpha: t,
          });
          return;
        }

        // Phase 3 + 4: organic bezier travel while shrinking
        if (orbP < TRAVEL_END) {
          const t = easeInOut(mapRange(orbP, SPAWN_END, TRAVEL_END));
          const dx = endX - startX;
          const dy = endY - startY;
          // control points drift to one side for a natural, non-linear arc —
          // alternates per index so neighboring orbs don't travel identically
          const drift = (i % 2 === 0 ? 1 : -1) * (40 + Math.abs(dx) * 0.25);
          const c1x = startX + dx * 0.25 + drift;
          const c1y = startY + dy * 0.3;
          const c2x = startX + dx * 0.7 - drift * 0.6;
          const c2y = startY + dy * 0.8;

          const x = cubicPoint(t, startX, c1x, c2x, endX);
          const y = cubicPoint(t, startY, c1y, c2y, endY);
          const size = gsap.utils.interpolate(ORB_TRAVEL_START_SIZE, ORB_TRAVEL_END_SIZE, t);

          gsap.set(orb, { x, y, width: size, height: size, autoAlpha: 1 });
          return;
        }

        // Phase 5: merge — align on the circle, dip, then expand and fade
        const mergeT = mapRange(orbP, TRAVEL_END, 1);
        let size: number;
        let alpha = 1;
        if (mergeT < MERGE_DIP_END) {
          size = gsap.utils.interpolate(ORB_TRAVEL_END_SIZE, ORB_MERGE_DIP_SIZE, mergeT / MERGE_DIP_END);
        } else {
          const growT = easeOut(mapRange(mergeT, MERGE_DIP_END, 1));
          size = gsap.utils.interpolate(ORB_MERGE_DIP_SIZE, ORB_MERGE_EXPAND_SIZE, growT);
          // stay solid through the expand, then dissolve quickly at the very end
          alpha = 1 - Math.max(0, (growT - 0.6) / 0.4);
        }

        gsap.set(orb, { x: endX, y: endY, width: size, height: size, autoAlpha: alpha });
      };

      const update = (progress: number) => {
        nodes.forEach((n, i) => {
          // Drain rides along with the travel phase — its own small window,
          // safely inside 0 -> TRAVEL_PHASE_END, needs no special handling.
          const drainP = mapRange(progress, 0 + i * 0.02, 0.4 + i * 0.02);
          gsap.set(n.drain, { yPercent: drainP * 100 });
          n.drainText.forEach((el) => {
            gsap.set(el, { color: gsap.utils.interpolate(LIGHT_TEXT, NEUTRAL_TEXT, drainP) });
          });

          // Travel: 0 -> TRAVEL_PHASE_END (80%) of raw progress. Only the
          // *start* is staggered per card — every orb still finishes (and
          // fades out) at exactly TRAVEL_PHASE_END, never later.
          const orbP = mapRange(progress, i * TRAVEL_START_STAGGER, TRAVEL_PHASE_END);
          updateOrb(i, n, orbP);

          // Fill: TRAVEL_PHASE_END -> 1 (the final 20%) of raw progress, the
          // same window for every card — no filling before 80%, and every
          // circle locks at 100% exactly when the ScrollTrigger reaches 1.
          const fillP = mapRange(progress, TRAVEL_PHASE_END, 1);
          gsap.set(n.fill, { yPercent: 100 - fillP * 100 });
          n.fillText.forEach((el) => {
            gsap.set(el, { color: gsap.utils.interpolate(NEUTRAL_TEXT, LIGHT_TEXT, fillP) });
          });
        });
      };

      // Single-section, full-scroll trigger: starts the moment the senses
      // section begins entering from the bottom (cards are still visible
      // just above it, a natural point for the sequence to begin) and ends
      // only once the section has scrolled all the way to its final resting
      // position at the top of the viewport — so progress is paced across
      // the section's *entire* scroll distance instead of a narrow sliver.
      ScrollTrigger.create({
        trigger: sensesSection,
        start: 'top bottom',
        end: 'top top',
        scrub: 1.5,
        onUpdate: (self) => update(self.progress),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-40" aria-hidden="true">
      {PAIRS.map((pair, i) => (
        <div
          key={pair.cardId}
          ref={(el) => { orbRefs.current[i] = el; }}
          className="absolute top-0 left-0 rounded-full"
          style={{
            backgroundColor: pair.color,
            boxShadow: `0 0 26px 5px ${pair.color}66`,
            filter: 'blur(0.6px)',
          }}
        />
      ))}
    </div>
  );
};

export default ColorFlowOverlay;
