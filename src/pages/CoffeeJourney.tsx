import { useRef } from 'react';
import { motion } from 'motion/react';
import { Leaf, Flame, Droplet, Coffee, ArrowRight, Sparkles, Check } from 'lucide-react';
import { ActivePage } from '../types';
import useJourneyProgress from '../hooks/useJourneyProgress';
import useNavbarHeight from '../hooks/useNavbarHeight';

interface CoffeeJourneyProps {
  setActivePage: (page: ActivePage) => void;
}

export default function CoffeeJourney({ setActivePage }: CoffeeJourneyProps) {
  const navWrapperRef = useRef<HTMLDivElement | null>(null);
  const journeyWrapperRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const navbarHeight = useNavbarHeight();
  const { activeStep, setActiveStep, isPinned, navHeight } = useJourneyProgress(
    navWrapperRef,
    journeyWrapperRef,
    sectionRefs,
    lineRefs,
    navbarHeight
  );

  const steps = [
    { id: 1, label: 'SELECTION', icon: Leaf },
    { id: 2, label: 'ROASTING', icon: Flame },
    { id: 3, label: 'BREWING', icon: Droplet },
    { id: 4, label: 'THE CUP', icon: Coffee },
  ];

  const handleTabClick = (stepId: number, elementId: string) => {
    setActiveStep(stepId);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

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
    <div id="coffee-journey-page" className="pt-20 bg-brand-sand">
      {/* 1. HEADER & INTRO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto space-y-6">
        <span className="font-mono text-xs tracking-[0.25em] text-brand-accent uppercase block font-semibold">
          THE ESTATE RESERVE
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-brand-dark">
          From the Bean to Your <br className="hidden sm:inline" /> Morning Cup.
        </h1>
        <p className="text-sm sm:text-base text-brand-dark/70 max-w-2xl mx-auto font-light leading-relaxed">
          Experience the meticulous journey of our artisanal coffee, harvested in the sun-drenched highlands of Chikmagalur and delivered fresh to your door.
        </p>
      </section>

      {/* Nav pins while this region (nav + all 4 sections) is in view. Pinning is done
          manually (not CSS sticky) because an app-wide ancestor sets overflow-x-hidden,
          which disables position:sticky for all descendants. */}
      <div className="relative">
        {/* Reserves the nav's own footprint only while it's pinned, so removing it from
            flow never shifts the sections below. */}
        <div style={{ height: isPinned ? navHeight : 0 }} aria-hidden="true" />
        {/* Meticulous Steps Selector */}
        <div
          ref={navWrapperRef}
          className={`z-20 bg-brand-sand pt-6 pb-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 ${
            isPinned ? 'fixed inset-x-0' : 'relative'
          }`}
          style={isPinned ? { top: navbarHeight } : undefined}
        >
          <div className="relative flex justify-between items-center">
            {/* Progress Bar background, segmented per connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 z-0 flex">
              {[0, 1, 2].map((segment) => (
                <div key={segment} className="relative flex-1 h-full bg-brand-dark/10 overflow-hidden">
                  <div
                    ref={(el) => { lineRefs.current[segment] = el; }}
                    className="absolute inset-y-0 left-0 w-full bg-[#9E653F] origin-left"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </div>
              ))}
            </div>

            {steps.map((step) => {
              const StepIcon = step.icon;
              const isSelected = activeStep >= step.id;
              return (
                <button
                  id={`journey-step-btn-${step.id}`}
                  key={step.id}
                  onClick={() => handleTabClick(step.id, `journey-step-section-${step.id}`)}
                  className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#9E653F] border-[#9E653F] text-brand-sand scale-110 shadow-md'
                        : 'bg-brand-sand border-brand-dark/15 text-brand-dark/50 group-hover:border-brand-accent/50 group-hover:text-brand-accent'
                    }`}
                  >
                    <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span
                    className={`font-mono text-[9px] sm:text-xs tracking-wider transition-colors font-semibold ${
                      isSelected ? 'text-brand-dark' : 'text-brand-dark/40 group-hover:text-brand-dark/80'
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      {/* 2. JOURNEY STEPS TIMELINE (ALTERNATING BLOCKS) */}
      <div ref={journeyWrapperRef} className="space-y-32 pb-32">
        {/* STEP 1: CAREFUL SELECTION */}
        <section
          id="journey-step-section-1"
          ref={(el) => { sectionRefs.current[0] = el; }}
          className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Image with Origin overlay */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="lg:col-span-6 relative"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1000"
                  alt="Harvesting coffee cherries"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Origin badge card */}
              <div className="absolute bottom-6 left-6 bg-brand-dark/95 backdrop-blur-xs text-brand-sand p-5 rounded-sm shadow-lg max-w-[240px] border border-white/10">
                <span className="font-mono text-[8px] tracking-[0.25em] text-brand-accent uppercase block font-semibold mb-1">
                  ORIGIN
                </span>
                <p className="font-serif text-lg font-bold">
                  Chikmagalur Highlands
                </p>
                <p className="text-[11px] text-brand-cream/60 font-light mt-1">
                  Elevations: 3,800 ft – 4,500 ft
                </p>
              </div>
            </motion.div>

            {/* Right Column: Step Text content */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl font-extrabold text-brand-accent/30">01</span>
                <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">SELECTION</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
                Careful Selection
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/80 leading-relaxed font-light">
                Our journey begins in the mist-covered, ancestral estates of Chikmagalur. We hand-pick only the most vibrant red cherries, ensuring that every bean meets our uncompromising standards for ripeness and high sugar content.
              </p>
              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-3 text-sm text-brand-dark/80">
                  <div className="w-5 h-5 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Shade-grown under native forest canopy, enhancing biodiversity.</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-brand-dark/80">
                  <div className="w-5 h-5 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>100% Manual harvest to guarantee that underripe beans never enter our lot.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* STEP 2: ARTISAN ROASTING */}
        <section
          id="journey-step-section-2"
          ref={(el) => { sectionRefs.current[1] = el; }}
          className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Step Text content */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-6 order-2 lg:order-1"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl font-extrabold text-brand-accent/30">02</span>
                <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">ROASTING</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
                Artisan Roasting
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/80 leading-relaxed font-light">
                Once slow-dried in the highland breeze, the green beans are transferred to our micro-roastery. We roast in small, tailored batches, monitoring temperature curves and crack intervals with surgical precision to unlock subtle flavor notes of buttery caramel, nuts, and chocolate.
              </p>
              <div className="p-4 bg-brand-cream/60 rounded-sm inline-flex items-center gap-4 border border-brand-dark/5 max-w-sm">
                <Flame className="w-8 h-8 text-brand-accent" />
                <div>
                  <span className="text-[10px] tracking-widest text-brand-dark/50 uppercase block font-semibold">CURRENT ROAST STYLE</span>
                  <span className="font-serif font-bold text-brand-dark text-sm">Estate Gold (Medium Roast)</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Image with Profile overlay */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="lg:col-span-6 relative order-1 lg:order-2"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=1000"
                  alt="Micro roasting machine beans"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Roast Profile badge card */}
              <div className="absolute bottom-6 right-6 bg-[#9E653F] text-brand-sand p-5 rounded-sm shadow-lg max-w-[240px]">
                <span className="font-mono text-[8px] tracking-[0.25em] text-brand-sand/70 uppercase block font-semibold mb-1">
                  ESTATE GOLD
                </span>
                <p className="font-serif text-lg font-bold italic">
                  Medium Roast
                </p>
                <p className="text-[11px] text-brand-sand/70 font-light mt-1">
                  Balanced body, hazelnut and cocoa notes, sweet clean finish.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STEP 3: MASTERFUL BREWING */}
        <section
          id="journey-step-section-3"
          ref={(el) => { sectionRefs.current[2] = el; }}
          className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Image */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="lg:col-span-6"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=1000"
                  alt="V60 master pour-over"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right Column: Step Text content */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl font-extrabold text-brand-accent/30">03</span>
                <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">BREWING</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
                Masterful Brewing
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/80 leading-relaxed font-light">
                The final, critical transformation occurs inside the brew chamber. We recommend our slow pour-over method (such as V60 or Chemex) to respect the bean’s lengthy journey, allowing the delicate volatile oils and fruit acids to bloom fully.
              </p>
              <div className="pt-4">
                <button
                  id="view-brew-guides-btn"
                  onClick={() => handleCTA('products')}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-brand-accent hover:text-brand-dark uppercase border-b border-brand-accent pb-1 transition-all group cursor-pointer"
                >
                  VIEW BREW GUIDES
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STEP 4: THE PERFECT CUP */}
        <section
          id="journey-step-section-4"
          ref={(el) => { sectionRefs.current[3] = el; }}
          className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Step Text content */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-6 order-2 lg:order-1"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl font-extrabold text-brand-accent/30">04</span>
                <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">THE PERFECT CUP</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
                The Perfect Cup
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/80 leading-relaxed font-light">
                Your daily ritual is complete. A rich, steaming symphony of floral fragrance, velvety texture, and lingering taste that honors the hills of Chikmagalur and the hands that nurtured every single bean.
              </p>
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button
                  id="shop-estate-reserve-btn"
                  onClick={() => handleCTA('products')}
                  className="bg-[#9E653F] hover:bg-brand-brown-dark text-brand-sand px-8 py-3.5 rounded-sm text-xs font-bold tracking-widest uppercase transition-all shadow-md cursor-pointer"
                >
                  SHOP ESTATE RESERVE
                </button>
                <button
                  id="our-story-btn"
                  onClick={() => handleCTA('about-us')}
                  className="border border-brand-dark/20 hover:border-brand-dark text-brand-dark px-8 py-3.5 rounded-sm text-xs font-bold tracking-widest uppercase transition-all hover:bg-brand-cream/25 cursor-pointer"
                >
                  OUR STORY
                </button>
              </div>
            </motion.div>

            {/* Right Column: Image */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="lg:col-span-6 order-1 lg:order-2"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=1000"
                  alt="A perfect latte coffee cup next to delicate flowers"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}
