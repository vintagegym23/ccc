import { useMemo, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { ActivePage } from '../types';
import useFranchiseReveal, { type FranchiseRevealRefs } from '../hooks/useFranchiseReveal';

interface FranchiseHighlightProps {
  onNavigate: (page: ActivePage) => void;
}

interface Stat {
  id: string;
  label: string;
  prefix: string;
  suffix: string;
  to: number;
  // Matches the corresponding value-card's (and heritage diamond's) color
  // 1:1 (see ColorFlowOverlay's PAIRS) — the mini-card rests neutral and is
  // filled with this color by the matching heritage diamond on scroll into
  // this section, then drains that same color onward into the matching
  // value-card on scroll toward Our Values. One continuous chain.
  color: string;
  // Only the darkest color (matching value-card 1) needs light text for
  // contrast — same rule already used for the value cards themselves.
  lightText: boolean;
}

const STATS: Stat[] = [
  { id: 'locations', label: 'Locations', prefix: '', suffix: '+', to: 3, color: '#5C3A21', lightText: true },
  { id: 'direct-trade', label: 'Direct Trade', prefix: '', suffix: '%', to: 100, color: '#EFECE6', lightText: false },
  { id: 'profit-margin', label: 'Profit Margin', prefix: '50-', suffix: '%', to: 70, color: '#8E9F88', lightText: false },
];

const NEUTRAL_TEXT = '#2A1A0F';

const FranchiseHighlight = ({ onNavigate }: FranchiseHighlightProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const underlineRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const statValueRefs = useRef<(HTMLElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLElement | null)[]>([]);

  const refs: FranchiseRevealRefs = useMemo(
    () => ({
      section: sectionRef,
      image: imageRef,
      eyebrow: eyebrowRef,
      heading: headingRef,
      underline: underlineRef,
      paragraph: paragraphRef,
      stats: statsRef,
      statValues: statValueRefs,
      buttons: buttonRefs,
    }),
    []
  );

  const statTargets = useMemo(
    () => STATS.map((s) => ({ to: s.to, prefix: s.prefix, suffix: s.suffix })),
    []
  );

  useFranchiseReveal(refs, statTargets);

  return (
    <section
      id="franchise-highlight-section"
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-brand-cream via-brand-sand to-brand-accent/15 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: outlet photo — real cutout, no card frame, floated directly
              on the section's warm backdrop with a soft grounding shadow. */}
          <div className="lg:col-span-6 lg:order-1 relative flex justify-center">
            <div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-brand-dark/25 rounded-full blur-2xl"
              aria-hidden="true"
            />
            <img
              ref={imageRef}
              src="/image of outlet.png"
              alt="Chikmagalur Coffee Cafe outlet storefront"
              className="relative w-full max-w-md lg:max-w-none h-auto drop-shadow-2xl select-none"
            />
          </div>

          {/* Right: copy, stats, CTA */}
          <div className="lg:col-span-6 lg:order-2 space-y-6">
            <span
              ref={eyebrowRef}
              className="font-mono text-xs tracking-widest text-brand-accent uppercase font-semibold block"
            >
              PARTNERSHIP OPPORTUNITIES
            </span>
            <h2 ref={headingRef} className="font-serif text-brand-dark leading-tight">
              <span className="block text-2xl sm:text-3xl font-normal text-brand-dark/70">
                Join the
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Chikmagalur Coffee Cafe Family
              </span>
            </h2>
            <div ref={underlineRef} className="w-16 h-[2px] bg-brand-accent"></div>
            <p
              ref={paragraphRef}
              className="text-sm sm:text-base text-brand-dark/75 leading-relaxed font-light max-w-xl"
            >
              Are you passionate about coffee? Own a piece of Chikmagalur's misty estates — direct-trade beans, generations of roasting heritage, and a proven café model built for real profitability. Now is your chance to bring that legacy to your city.
            </p>

            <div ref={statsRef} className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 max-w-lg">
              {STATS.map((stat, i) => (
                <div
                  key={stat.id}
                  id={`franchise-stat-card-${stat.id}`}
                  className="relative overflow-hidden bg-brand-sand rounded-lg border border-brand-dark/10 shadow-sm px-3 py-4 sm:px-4 sm:py-5 text-center"
                >
                  {/* Color-flow drain layer: starts hidden (neutral card),
                      filled by ColorFlowOverlay as the matching heritage
                      diamond's color arrives, then drains away again as that
                      same color continues on into the matching Our Values
                      card — same mechanic the value cards themselves use. */}
                  <div
                    className="color-drain-layer absolute inset-0 pointer-events-none"
                    style={{ backgroundColor: stat.color }}
                  />
                  <div className="relative z-10">
                    {/* .drain-text is only applied when this card's color is
                        dark enough to need light text — matches Our Values'
                        card 1, the only value-card that swaps text color at
                        all (cards 2/3 stay plain dark text always, since
                        their lighter colors keep dark text legible either
                        way). ColorFlowOverlay only queries `.drain-text`, so
                        cards 2/3 are simply never touched by it. */}
                    <p
                      id={`franchise-stat-${stat.id}`}
                      ref={(el) => {
                        statValueRefs.current[i] = el;
                      }}
                      className={`font-serif text-xl sm:text-2xl md:text-3xl font-bold ${stat.lightText ? 'drain-text' : 'text-brand-dark'}`}
                      style={stat.lightText ? { color: NEUTRAL_TEXT } : undefined}
                    >
                      {stat.prefix}
                      {stat.to}
                      {stat.suffix}
                    </p>
                    <p
                      className={`text-[9px] sm:text-[10px] tracking-widest uppercase mt-1 ${stat.lightText ? 'drain-text' : 'text-brand-dark/60'}`}
                      style={stat.lightText ? { color: NEUTRAL_TEXT } : undefined}
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                id="franchise-highlight-enquire-btn"
                ref={(el) => {
                  buttonRefs.current[0] = el;
                }}
                onClick={() => onNavigate('franchise')}
                className="inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-brown-dark text-brand-sand px-8 py-3.5 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer"
              >
                Enquire Now
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                id="franchise-highlight-learn-more-btn"
                ref={(el) => {
                  buttonRefs.current[1] = el;
                }}
                onClick={() => onNavigate('franchise')}
                className="inline-flex items-center justify-center gap-2 border border-brand-dark/20 hover:border-brand-dark text-brand-dark px-8 py-3.5 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-brand-cream/40 cursor-pointer"
              >
                View Franchise Models
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseHighlight;
