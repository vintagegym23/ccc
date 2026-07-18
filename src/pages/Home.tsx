import { useLayoutEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Award, Leaf, Users, CheckCircle2, ChevronRight, Sparkles, Droplet, Coffee } from 'lucide-react';
import { ActivePage } from '../types';
import Hero from '../components/Hero';
// Cup travel animation temporarily disabled — component kept for later reuse.
// import HeroCupTravel from '../components/HeroCupTravel';
import Loader from '../components/Loader';
// Liquid wipe temporarily disabled — component kept for later reuse, just not placed here for now.
// import LiquidWipeTransition from '../components/LiquidWipeTransition';
import ColorFlowOverlay from '../components/ColorFlowOverlay';
import FranchiseHighlight from '../components/FranchiseHighlight';
import HeritageFrameSequence from '../components/HeritageFrameSequence';
import OurFranchises from '../components/OurFranchises';
import usePreloader from '../hooks/usePreloader';
import useLenis from '../hooks/useLenis';

// Matches Tailwind's `md` — same cutoff useImageSequence.ts uses for its
// mobile-only zoom, and the same one this file's own mobile-only nav-height
// padding must match to stay in sync with it.
const MOBILE_BREAKPOINT = 768;
// Slightly less than the navbar's full height, so Hero starts just under it
// with a touch of intentional overlap rather than a hairline-exact seam.
// useImageSequence.ts mirrors this same ratio for its ScrollTrigger offset.
const NAV_HEIGHT_RATIO = 0.9;

interface HomeProps {
  setActivePage: (page: ActivePage) => void;
}

export default function Home({ setActivePage }: HomeProps) {
  const { progress, isLoaded, frames } = usePreloader();
  const [showLoader, setShowLoader] = useState(true);
  const [navHeight, setNavHeight] = useState(0);
  useLenis();

  // Mobile-only: reserve the fixed navbar's real rendered height as padding
  // so Hero starts right below it instead of behind it. Desktop stays flush
  // (0) — Hero fills right behind the transparent nav there, unchanged from
  // before. useLayoutEffect (not useEffect) so this is measured/applied
  // before the first paint the user can see — in practice the Loader's
  // opaque overlay covers this anyway, but no reason to risk a flash.
  // useImageSequence reads this same #main-navbar element (with the same
  // mobile-only check) to offset its ScrollTrigger start by the identical
  // amount, so the pin still engages at scroll 0 instead of requiring the
  // user to scroll past this gap first.
  useLayoutEffect(() => {
    const measure = () => {
      const nav = document.getElementById('main-navbar');
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setNavHeight(nav && isMobile ? nav.offsetHeight * NAV_HEIGHT_RATIO : 0);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const handleCTA = (pageId: ActivePage) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  return (
    <div id="home-page" style={{ paddingTop: navHeight }}>
      {/* 1. HERO SECTION */}
      {showLoader && (
        <Loader
          progress={progress}
          isLoaded={isLoaded}
          onComplete={() => setShowLoader(false)}
        />
      )}
      <Hero frames={frames} isLoaded={isLoaded} />
      {/* <HeroCupTravel /> */}

      {/* 2. LEGACY STEEPED IN LEGEND */}
      <section id="legacy-section" className="relative z-10 pt-24 pb-10 md:py-24 bg-brand-sand px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-16 items-center">
            {/* Left side: Storytelling Text */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="lg:col-span-7 lg:order-1 space-y-6 lg:pr-6"
            >
              <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-semibold">
                OUR HERITAGE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-dark leading-tight">
                A Legacy Steeped <br /> in Legend
                {/* Color-flow source: these 3 diamonds are where the color
                    journey begins (see ColorFlowOverlay) — colored by
                    default, each drains into its matching franchise
                    mini-card on scroll toward that section, which then
                    drains into its matching Our Values card, which then
                    drains into its matching Elevating the Senses circle.
                    One continuous chain. Inline right after "Legend" (same
                    pattern as the hero's inline cup after "COFFEE CAFE"),
                    not a separate row below the heading. */}
                <span className="inline-flex items-center gap-2 align-middle ml-3" aria-hidden="true">
                  <span
                    id="heritage-diamond-locations"
                    className="relative inline-block w-4 h-4 rotate-45 overflow-hidden border border-[#5C3A21]/30"
                  >
                    <span className="color-drain-layer absolute inset-0 block" style={{ backgroundColor: '#5C3A21' }} />
                  </span>
                  <span
                    id="heritage-diamond-direct-trade"
                    className="relative inline-block w-4 h-4 rotate-45 overflow-hidden border border-brand-dark/20"
                  >
                    <span className="color-drain-layer absolute inset-0 block" style={{ backgroundColor: '#EFECE6' }} />
                  </span>
                  <span
                    id="heritage-diamond-profit-margin"
                    className="relative inline-block w-4 h-4 rotate-45 overflow-hidden border border-[#8E9F88]/40"
                  >
                    <span className="color-drain-layer absolute inset-0 block" style={{ backgroundColor: '#8E9F88' }} />
                  </span>
                </span>
              </h2>

              <div className="w-16 h-[2px] bg-brand-accent my-4"></div>

              <p className="text-sm sm:text-base text-brand-dark/80 leading-relaxed font-light">
                Our journey began generations ago, in the hidden valleys where the air is thin and the coffee cherries ripen slowly. Each bean tells a story of patience, of families dedicated to the craft of cultivation, and a relentless pursuit of the perfect roast.
              </p>
              <p className="text-sm sm:text-base text-brand-dark/80 leading-relaxed font-light">
                We don't just sell coffee; we preserve a way of life that values the sensory ritual of preparation as much as the final taste. Our master roasters honor this legacy by examining every small batch by hand.
              </p>
              <div className="pt-4">
                <button
                  id="legacy-read-story-btn"
                  onClick={() => handleCTA('about-us')}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-brand-accent hover:text-brand-dark uppercase border-b border-brand-accent pb-1 transition-all duration-300 group cursor-pointer"
                >
                  READ OUR FULL STORY
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Right side: scroll-scrubbed coffee_frames sequence (see
                HeritageFrameSequence) — this div's aspect ratio governs the
                canvas's rendered size at each breakpoint. */}
            <div
              id="legacy-visual-slot"
              className="relative lg:col-span-5 lg:order-2 aspect-[2/1] sm:aspect-[16/11] lg:aspect-[1.2]"
            >
              <HeritageFrameSequence />
            </div>
          </div>
        </div>

        {/* Mid-section splash photo — temporarily disabled.
        <img
          src="/section mid.png"
          alt=""
          aria-hidden="true"
          className="block absolute right-0 top-[86%] -translate-y-1/2 w-[92vw] md:top-auto md:bottom-0 md:translate-y-[32%] md:w-[70vw] h-auto object-contain z-0 pointer-events-none select-none drop-shadow-xl"
        />
        */}

        {/* Resting spot for the traveling Hero cup — temporarily disabled
            along with HeroCupTravel above.
        <img
          id="legacy-cup-target"
          src="/cup.png"
          alt=""
          aria-hidden="true"
          className="absolute top-[88%] right-[26%] md:top-[60%] md:right-[22%] -translate-y-1/2 translate-x-1/2 rotate-[-30deg] w-40 sm:w-56 md:w-72 lg:w-96 h-auto opacity-0 z-20 pointer-events-none select-none drop-shadow-xl"
        />
        */}
      </section>

      {/* <LiquidWipeTransition /> */}
      <ColorFlowOverlay />

      {/* 2.5 FRANCHISE HIGHLIGHT */}
      <FranchiseHighlight onNavigate={handleCTA} />

      {/* 3. OUR VALUES (OUR ETERNAL COMMITMENT) */}
      <section id="values-section" className="py-10 md:py-24 bg-brand-cream/45 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-mono text-xs tracking-[0.25em] text-brand-accent uppercase font-semibold">
              OUR VALUES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark">
              Our Eternal Commitment
            </h2>
            <p className="text-sm text-brand-dark/70 font-light">
              We stand firm on values that respect our environment, our growers, and your high standard of taste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Uncompromising Quality */}
            <motion.div
              id="value-card-1"
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="relative overflow-hidden bg-brand-sand p-8 rounded-lg shadow-lg flex flex-col justify-between border border-brand-dark/10 h-80 hover:shadow-xl transition-shadow group"
            >
              {/* Color-flow drain layer: slides down and out, revealing the neutral card beneath */}
              <div className="color-drain-layer absolute inset-0 bg-brand-brown-dark pointer-events-none">
                <svg className="absolute -bottom-px left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0,6 C25,-2 75,14 100,6 L100,12 L0,12 Z" fill="#5C3A21" />
                </svg>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-105 transition-transform duration-300">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="drain-text font-serif text-xl font-bold tracking-wide" style={{ color: '#2A1A0F' }}>
                  Uncompromising Quality
                </h3>
                <p className="drain-text text-xs sm:text-sm leading-relaxed font-light" style={{ color: '#2A1A0F' }}>
                  Every batch is meticulously evaluated. Only the top 1% of beans earn the Chikmagalur Coffee Cafe seal, ensuring an unparalleled experience in every single sip.
                </p>
              </div>
              <div className="relative z-10 pt-4 border-t border-brand-dark/10 flex justify-between items-center text-[10px] tracking-wider uppercase font-semibold">
                <span className="drain-text" style={{ color: '#2A1A0F' }}>ESTATE GRADING</span>
                <CheckCircle2 className="w-4 h-4 text-brand-accent" />
              </div>
            </motion.div>

            {/* Card 2: Authentic Roots */}
            <motion.div
              id="value-card-2"
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="relative overflow-hidden bg-brand-sand text-brand-dark p-8 rounded-lg shadow-md flex flex-col justify-between border border-brand-dark/5 h-80 hover:shadow-lg transition-shadow group"
            >
              <div className="color-drain-layer absolute inset-0 bg-brand-card-light pointer-events-none">
                <svg className="absolute -bottom-px left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0,6 C25,-2 75,14 100,6 L100,12 L0,12 Z" fill="#EFECE6" />
                </svg>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-105 transition-transform duration-300">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold tracking-wide">
                  Authentic Roots
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/70 leading-relaxed font-light">
                  We believe in direct relationships with our farmers. By cutting out the middleman, we ensure ethical, traceable sourcing and true origin transparency.
                </p>
              </div>
              <div className="relative z-10 pt-4 border-t border-brand-dark/5 flex justify-between items-center text-[10px] tracking-wider uppercase font-semibold text-brand-dark/50">
                <span>DIRECT TRADE</span>
                <div className="w-2 h-2 rounded-full bg-[#9E653F]"></div>
              </div>
            </motion.div>

            {/* Card 3: Community Growth */}
            <motion.div
              id="value-card-3"
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="relative overflow-hidden bg-brand-sand text-brand-dark p-8 rounded-lg shadow-md flex flex-col justify-between border border-brand-dark/5 h-80 hover:shadow-lg transition-shadow group"
            >
              <div className="color-drain-layer absolute inset-0 bg-brand-sage/90 pointer-events-none">
                <svg className="absolute -bottom-px left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0,6 C25,-2 75,14 100,6 L100,12 L0,12 Z" fill="#8E9F88" />
                </svg>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-105 transition-transform duration-300">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold tracking-wide">
                  Community Growth
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/85 leading-relaxed font-light">
                  Success is shared. A portion of every roast goes back into highland infrastructure, coffee picker health clinics, and sustainable agricultural training.
                </p>
              </div>
              <div className="relative z-10 pt-4 border-t border-brand-dark/10 flex justify-between items-center text-[10px] tracking-wider uppercase font-semibold text-brand-dark/60">
                <span>SOCIAL IMPACT</span>
                <div className="w-2 h-2 rounded-full bg-[#1C0D02]"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. ELEVATING THE SENSES */}
      <section id="senses-section" className="py-24 bg-brand-sand px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side: Senses steps */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-semibold">
                  SENSORY STUDY
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-dark leading-tight">
                  Elevating the Senses
                </h2>
                <div className="w-16 h-[2px] bg-brand-accent"></div>
              </div>

              <div className="space-y-8 pt-4">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div id="senses-circle-1" className="relative w-14 h-14 flex-shrink-0 rounded-full overflow-hidden border-2 border-[#5C3A21]/30 bg-brand-sand">
                    <div className="circle-fill-layer absolute inset-0 bg-brand-brown-dark pointer-events-none">
                      <svg className="absolute -top-px left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0,6 C25,-2 75,14 100,6 L100,12 L0,12 Z" fill="#5C3A21" />
                      </svg>
                    </div>
                    <span className="circle-fill-text relative z-10 w-full h-full flex items-center justify-center font-serif text-base font-bold" style={{ color: '#2A1A0F' }}>
                      01
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-semibold text-brand-dark">
                      The Ritual of Preparation
                    </h3>
                    <p className="text-sm text-brand-dark/70 font-light leading-relaxed">
                      We educate our patrons on the precise art of the pour-over, honoring the chemistry of water quality, temperature, and fresh grind profiles.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div id="senses-circle-2" className="relative w-14 h-14 flex-shrink-0 rounded-full overflow-hidden border-2 border-brand-dark/10 bg-brand-sand">
                    <div className="circle-fill-layer absolute inset-0 bg-brand-card-light pointer-events-none">
                      <svg className="absolute -top-px left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0,6 C25,-2 75,14 100,6 L100,12 L0,12 Z" fill="#EFECE6" />
                      </svg>
                    </div>
                    <span className="relative z-10 w-full h-full flex items-center justify-center font-serif text-base font-bold text-brand-dark">
                      02
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-semibold text-brand-dark">
                      Sensory Immersion
                    </h3>
                    <p className="text-sm text-brand-dark/70 font-light leading-relaxed">
                      Our custom micro-roasting profiles are designed to highlight the unique, original terroir of each estate—from crisp citrus acidity to dark chocolate barks.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div id="senses-circle-3" className="relative w-14 h-14 flex-shrink-0 rounded-full overflow-hidden border-2 border-[#8E9F88]/40 bg-brand-sand">
                    <div className="circle-fill-layer absolute inset-0 bg-brand-sage pointer-events-none">
                      <svg className="absolute -top-px left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0,6 C25,-2 75,14 100,6 L100,12 L0,12 Z" fill="#8E9F88" />
                      </svg>
                    </div>
                    <span className="relative z-10 w-full h-full flex items-center justify-center font-serif text-base font-bold text-brand-dark">
                      03
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-semibold text-brand-dark">
                      Tailored Palettes
                    </h3>
                    <p className="text-sm text-brand-dark/70 font-light leading-relaxed">
                      Exclusive subscriptions offer a curated journey through seasonal micro-lots, custom roasted to adapt to your evolving coffee palette.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Image Collage Layout */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-12 gap-4 h-[550px]"
            >
              {/* Image 1: Tall vertical pour-over */}
              <div className="col-span-7 h-full rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"
                  alt="Siphon or V60 pour over brewing coffee"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="col-span-5 flex flex-col gap-4 h-full">
                {/* Image 2: Beans top square */}
                <div className="h-1/2 rounded-lg overflow-hidden shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600"
                    alt="Pile of fresh coffee beans"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Image 3: Roaster bottom square */}
                <div className="h-1/2 rounded-lg overflow-hidden shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=600"
                    alt="Artisanal drum roaster"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4.5 OUR FRANCHISES */}
      <OurFranchises onNavigate={handleCTA} />

      {/* 5. BE PART OF OUR JOURNEY (CTA) */}
      <section
        id="cta-section"
        className="relative py-24 bg-brand-cream/45 overflow-hidden flex items-center"
      >
        <div className="max-w-4xl mx-auto px-4 text-center text-brand-dark relative z-10 space-y-6">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Be Part of Our Journey
            </h2>
            <p className="text-sm sm:text-base text-brand-dark/80 max-w-2xl mx-auto leading-relaxed font-light">
              Join our exclusive circle of connoisseurs and receive monthly dispatches, specialty brewing recipes, and private access to our most remote estate harvests.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="cta-join-guild-btn"
                onClick={() => handleCTA('contact')}
                className="w-full sm:w-auto bg-brand-accent hover:bg-brand-brown-dark text-brand-sand px-8 py-3.5 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer"
              >
                JOIN THE GUILD
              </button>
              <button
                id="cta-view-collections-btn"
                onClick={() => handleCTA('products')}
                className="w-full sm:w-auto border border-brand-dark/20 hover:border-brand-dark text-brand-dark px-8 py-3.5 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-brand-cream/25 cursor-pointer"
              >
                VIEW COLLECTIONS
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
