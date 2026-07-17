import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PAIRS = [
  { diamondId: 'heritage-diamond-locations', statCardId: 'franchise-stat-card-locations', cardId: 'value-card-1', circleId: 'senses-circle-1', color: '#5C3A21' }, // brand-brown-dark
  { diamondId: 'heritage-diamond-direct-trade', statCardId: 'franchise-stat-card-direct-trade', cardId: 'value-card-2', circleId: 'senses-circle-2', color: '#EFECE6' }, // brand-card-light
  { diamondId: 'heritage-diamond-profit-margin', statCardId: 'franchise-stat-card-profit-margin', cardId: 'value-card-3', circleId: 'senses-circle-3', color: '#8E9F88' }, // brand-sage
] as const;

const NEUTRAL_TEXT = '#2A1A0F'; // brand-dark
const LIGHT_TEXT = '#FAF6F0'; // brand-sand

// Orb sizes (px) at each stage of its journey — spawn small, travel while
// shrinking, then a quick shrink-and-expand as it merges into the target.
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
// merge/fade) is confined to 0 -> TRAVEL_PHASE_END, and the fill/drain of the
// destination is confined to TRAVEL_PHASE_END -> 1. Every orb finishes its
// whole journey (including fading out) at exactly TRAVEL_PHASE_END, and every
// fill starts there too — same boundary for both, so there's no gap where the
// orb has already vanished but the fill hasn't started yet. All three legs
// below reuse this exact same rhythm so the whole chain reads as one
// continuous system rather than three unrelated ones.
const TRAVEL_PHASE_END = 0.8;
const TRAVEL_START_STAGGER = 0.04; // per-item stagger, applied only to when travel *starts*
const SOURCE_DRAIN_WINDOW = 0.4; // fraction of progress the *source's* own color drain spans
const SOURCE_DRAIN_STAGGER = 0.02;

// Leg 1 (mini-cards -> value-cards) is compressed into the first 60% of its
// trigger's progress (which spans exactly one viewport height, top-bottom ->
// top-top — so 60% lands while Our Values' top edge is still only a bit past
// the vertical middle of the screen) instead of stretching across the full
// range. Same rhythm as leg 2, just scaled down by LEG1_SPEED so the handoff
// finishes early and the colored value-cards then sit untouched (no further
// tweening) for the remaining 40% of scroll, instead of only just landing
// right as the user leaves for Elevating the Senses.
const LEG1_SPEED = 0.6;
const LEG1_FILL_END = LEG1_SPEED;
const LEG1_TRAVEL_PHASE_END = TRAVEL_PHASE_END * LEG1_SPEED;
const LEG1_SOURCE_DRAIN_WINDOW = SOURCE_DRAIN_WINDOW * LEG1_SPEED;
const LEG1_TRAVEL_START_STAGGER = TRAVEL_START_STAGGER * LEG1_SPEED;
const LEG1_SOURCE_DRAIN_STAGGER = SOURCE_DRAIN_STAGGER * LEG1_SPEED;

// Leg 0 (diamonds -> mini-cards) travels further — the diamonds sit near the
// top of Our Heritage while the mini-cards sit low in the franchise section
// — so it's paced slower than leg 1: orb travel fills the first 60% of
// progress (instead of 48%), and the mini-card's own fill is stretched
// across 60% -> 80% (instead of a narrow window ending at 60%) so it reads
// as the color visibly arriving from above and filling in, rather than
// snapping in almost as soon as the orb lands.
const LEG0_TRAVEL_PHASE_END = 0.6;
const LEG0_FILL_END = 0.8;
const LEG0_SCALE = LEG0_TRAVEL_PHASE_END / TRAVEL_PHASE_END;
const LEG0_SOURCE_DRAIN_WINDOW = SOURCE_DRAIN_WINDOW * LEG0_SCALE;
const LEG0_TRAVEL_START_STAGGER = TRAVEL_START_STAGGER * LEG0_SCALE;
const LEG0_SOURCE_DRAIN_STAGGER = SOURCE_DRAIN_STAGGER * LEG0_SCALE;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const mapRange = (p: number, start: number, end: number) => clamp01((p - start) / (end - start));
const easeOut = gsap.parseEase('power2.out');
const easeInOut = gsap.parseEase('power1.inOut');
const cubicPoint = (t: number, p0: number, p1: number, p2: number, p3: number) => {
  const mt = 1 - t;
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
};

// Bezier-travels one orb from sourceEl to destEl, sized/shrunk/merged
// according to orbP (see phase constants above). Shared by all three legs —
// the only difference between them is which elements are passed in.
const travelOrb = (orb: HTMLDivElement | null, orbP: number, index: number, sourceEl: HTMLElement, destEl: HTMLElement) => {
  if (!orb) return;

  if (orbP <= 0 || orbP >= 1) {
    gsap.set(orb, { autoAlpha: 0 });
    return;
  }

  const sourceRect = sourceEl.getBoundingClientRect();
  const destRect = destEl.getBoundingClientRect();
  const startX = sourceRect.left + sourceRect.width / 2;
  const startY = sourceRect.bottom - 14; // center-bottom area of the source
  const endX = destRect.left + destRect.width / 2;
  const endY = destRect.top + destRect.height / 2;

  // Phase 2: condense into an orb at the source, scaling/fading in
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
    const drift = (index % 2 === 0 ? 1 : -1) * (40 + Math.abs(dx) * 0.25);
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

  // Phase 5: merge — align on the destination, dip, then expand and fade
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

interface FlowNode {
  diamond: HTMLElement;
  diamondDrain: HTMLElement;
  statCard: HTMLElement;
  statDrain: HTMLElement;
  statDrainText: NodeListOf<HTMLElement>;
  card: HTMLElement;
  drain: HTMLElement;
  drainText: NodeListOf<HTMLElement>;
  circle: HTMLElement;
  fill: HTMLElement;
  fillText: NodeListOf<HTMLElement>;
}

/**
 * Ties four things together, in scroll order, as one continuous color
 * journey: the "Our Heritage" diamonds -> the franchise stat mini-cards ->
 * the "Our Values" cards -> the "Elevating the Senses" numbered circles.
 * Every stage uses the exact same drain/fill mechanic (a
 * `.color-drain-layer` that recedes on a source, grows on a destination) so
 * the whole chain reads as one continuous system rather than separate
 * animations.
 *
 * Leg 0 (diamonds -> mini-cards): as the user scrolls from Our Heritage into
 * the franchise section, each diamond's color drains away and condenses into
 * a small orb that bezier-travels down into its matching stat mini-card,
 * which fills with that color on arrival. The diamonds are the true origin
 * of the chain — always colored at rest, nothing feeds into them.
 *
 * Leg 1 (mini-cards -> cards): the same handoff, one section later — each
 * mini-card (now colored via leg 0) drains that color onward into its
 * matching Our Values card. Mini-cards and value-cards both start neutral
 * (bg-brand-sand) at rest, only becoming colored once fed by the leg before
 * them — that's also the resting state a viewer arrives at each section
 * with, assuming they scrolled normally rather than deep-linking in.
 *
 * Leg 2 (cards -> circles), unchanged from before: as the user continues
 * scrolling from Our Values into Elevating the Senses, each card's color
 * drains away in the same fashion into its matching numbered circle.
 *
 * All three legs are plain scroll-scrubbed ScrollTriggers (no `once`), so
 * scrolling back up reverses any leg for free.
 */
const ColorFlowOverlay = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const diamondOrbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberOrbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardOrbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const franchiseSection = document.getElementById('franchise-highlight-section');
    const valuesSection = document.getElementById('values-section');
    const sensesSection = document.getElementById('senses-section');
    if (!franchiseSection || !valuesSection || !sensesSection) return;

    const nodes: FlowNode[] = [];
    for (const { diamondId, statCardId, cardId, circleId } of PAIRS) {
      const diamond = document.getElementById(diamondId);
      const statCard = document.getElementById(statCardId);
      const card = document.getElementById(cardId);
      const circle = document.getElementById(circleId);
      const diamondDrain = diamond?.querySelector<HTMLElement>('.color-drain-layer') ?? null;
      const statDrain = statCard?.querySelector<HTMLElement>('.color-drain-layer') ?? null;
      const drain = card?.querySelector<HTMLElement>('.color-drain-layer') ?? null;
      const fill = circle?.querySelector<HTMLElement>('.circle-fill-layer') ?? null;
      if (!diamond || !diamondDrain || !statCard || !statDrain || !card || !circle || !drain || !fill) return;
      nodes.push({
        diamond,
        diamondDrain,
        statCard,
        statDrain,
        statDrainText: statCard.querySelectorAll<HTMLElement>('.drain-text'),
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
        // Diamonds rest fully colored — they're the true origin of the
        // chain. Mini-cards and value-cards rest neutral until fed by the
        // leg before them; circles rest empty until leg 2 fills them.
        gsap.set(n.diamondDrain, { yPercent: 0 });
        gsap.set(n.statDrain, { yPercent: 100 });
        gsap.set(n.drain, { yPercent: 100 });
        gsap.set(n.fill, { yPercent: 100 });
      });
      // orbs are centered on their (x, y) translation regardless of size
      gsap.set([...diamondOrbRefs.current, ...numberOrbRefs.current, ...cardOrbRefs.current], {
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
      });

      // Leg 0: heritage diamonds -> franchise mini-cards (slower timing —
      // see LEG0_TRAVEL_PHASE_END/LEG0_FILL_END above)
      const updateSpawn = (progress: number) => {
        nodes.forEach((n, i) => {
          const drainP = mapRange(
            progress,
            i * LEG0_SOURCE_DRAIN_STAGGER,
            LEG0_SOURCE_DRAIN_WINDOW + i * LEG0_SOURCE_DRAIN_STAGGER
          );
          gsap.set(n.diamondDrain, { yPercent: drainP * 100 });

          const orbP = mapRange(progress, i * LEG0_TRAVEL_START_STAGGER, LEG0_TRAVEL_PHASE_END);
          travelOrb(diamondOrbRefs.current[i], orbP, i, n.diamond, n.statCard);

          const fillP = mapRange(progress, LEG0_TRAVEL_PHASE_END, LEG0_FILL_END);
          gsap.set(n.statDrain, { yPercent: 100 - fillP * 100 });
          n.statDrainText.forEach((el) => {
            gsap.set(el, { color: gsap.utils.interpolate(NEUTRAL_TEXT, LIGHT_TEXT, fillP) });
          });
        });
      };

      // Leg 1: franchise mini-cards -> value cards (compressed timing — see
      // LEG1_SPEED above)
      const updateArrival = (progress: number) => {
        nodes.forEach((n, i) => {
          // The mini-card's own color drains away early — mirrors how the
          // value-card drains away early in leg 2 below.
          const drainP = mapRange(
            progress,
            i * LEG1_SOURCE_DRAIN_STAGGER,
            LEG1_SOURCE_DRAIN_WINDOW + i * LEG1_SOURCE_DRAIN_STAGGER
          );
          gsap.set(n.statDrain, { yPercent: drainP * 100 });
          n.statDrainText.forEach((el) => {
            gsap.set(el, { color: gsap.utils.interpolate(LIGHT_TEXT, NEUTRAL_TEXT, drainP) });
          });

          // Orb travel: mini-card -> value-card
          const orbP = mapRange(progress, i * LEG1_TRAVEL_START_STAGGER, LEG1_TRAVEL_PHASE_END);
          travelOrb(numberOrbRefs.current[i], orbP, i, n.statCard, n.card);

          // Value-card fills with color once the orb lands, fully filled by
          // LEG1_FILL_END — then simply holds, fully colored, for the rest
          // of the scroll through Our Values.
          const fillP = mapRange(progress, LEG1_TRAVEL_PHASE_END, LEG1_FILL_END);
          gsap.set(n.drain, { yPercent: 100 - fillP * 100 });
          n.drainText.forEach((el) => {
            gsap.set(el, { color: gsap.utils.interpolate(NEUTRAL_TEXT, LIGHT_TEXT, fillP) });
          });
        });
      };

      // Leg 2: value cards -> senses circles (unchanged behavior from before)
      const updateDeparture = (progress: number) => {
        nodes.forEach((n, i) => {
          const drainP = mapRange(progress, i * SOURCE_DRAIN_STAGGER, SOURCE_DRAIN_WINDOW + i * SOURCE_DRAIN_STAGGER);
          gsap.set(n.drain, { yPercent: drainP * 100 });
          n.drainText.forEach((el) => {
            gsap.set(el, { color: gsap.utils.interpolate(LIGHT_TEXT, NEUTRAL_TEXT, drainP) });
          });

          const orbP = mapRange(progress, i * TRAVEL_START_STAGGER, TRAVEL_PHASE_END);
          travelOrb(cardOrbRefs.current[i], orbP, i, n.card, n.circle);

          const fillP = mapRange(progress, TRAVEL_PHASE_END, 1);
          gsap.set(n.fill, { yPercent: 100 - fillP * 100 });
          n.fillText.forEach((el) => {
            gsap.set(el, { color: gsap.utils.interpolate(NEUTRAL_TEXT, LIGHT_TEXT, fillP) });
          });
        });
      };

      // Leg 0 trigger: paced across the handoff between Our Heritage leaving
      // and the franchise section arriving.
      ScrollTrigger.create({
        trigger: franchiseSection,
        start: 'top bottom',
        end: 'top top',
        scrub: 1.5,
        onUpdate: (self) => updateSpawn(self.progress),
      });

      // Leg 1 trigger: paced across the handoff between the franchise
      // section leaving and Our Values arriving.
      ScrollTrigger.create({
        trigger: valuesSection,
        start: 'top bottom',
        end: 'top top',
        scrub: 1.5,
        onUpdate: (self) => updateArrival(self.progress),
      });

      // Leg 2 trigger: unchanged — paced across Our Values leaving and
      // Elevating the Senses arriving.
      ScrollTrigger.create({
        trigger: sensesSection,
        start: 'top bottom',
        end: 'top top',
        scrub: 1.5,
        onUpdate: (self) => updateDeparture(self.progress),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-40" aria-hidden="true">
      {PAIRS.map((pair, i) => (
        <div
          key={`diamond-orb-${pair.cardId}`}
          ref={(el) => { diamondOrbRefs.current[i] = el; }}
          className="absolute top-0 left-0 rounded-full"
          style={{
            backgroundColor: pair.color,
            boxShadow: `0 0 26px 5px ${pair.color}66`,
            filter: 'blur(0.6px)',
          }}
        />
      ))}
      {PAIRS.map((pair, i) => (
        <div
          key={`number-orb-${pair.cardId}`}
          ref={(el) => { numberOrbRefs.current[i] = el; }}
          className="absolute top-0 left-0 rounded-full"
          style={{
            backgroundColor: pair.color,
            boxShadow: `0 0 26px 5px ${pair.color}66`,
            filter: 'blur(0.6px)',
          }}
        />
      ))}
      {PAIRS.map((pair, i) => (
        <div
          key={`card-orb-${pair.cardId}`}
          ref={(el) => { cardOrbRefs.current[i] = el; }}
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
