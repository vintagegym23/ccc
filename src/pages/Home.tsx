import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Leaf, Users, CheckCircle2, ChevronRight, Sparkles, Droplet, Coffee } from 'lucide-react';
import { ActivePage } from '../types';
import Hero from '../components/Hero';
import Loader from '../components/Loader';
import usePreloader from '../hooks/usePreloader';
import useLenis from '../hooks/useLenis';

interface HomeProps {
  setActivePage: (page: ActivePage) => void;
}

export default function Home({ setActivePage }: HomeProps) {
  const { progress, isLoaded, frames } = usePreloader();
  const [showLoader, setShowLoader] = useState(true);
  useLenis();

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
    <div id="home-page" className="pt-20">
      {/* 1. HERO SECTION */}
      {showLoader && (
        <Loader
          progress={progress}
          isLoaded={isLoaded}
          onComplete={() => setShowLoader(false)}
        />
      )}
      <Hero frames={frames} isLoaded={isLoaded} />

      {/* 2. LEGACY STEEPED IN LEGEND */}
      <section id="legacy-section" className="py-24 bg-brand-sand px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left side: Farmer Image with Quote Badge */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="relative lg:col-span-7"
            >
              <div className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-[1.2] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1200"
                  alt="Traditional coffee grower examining red coffee cherries in hand"
                  className="w-full h-full object-cover filter contrast-[1.02] saturate-95"
                />
              </div>
              
              {/* Overlay Quote Box */}
              <div className="absolute -bottom-6 -right-2 sm:right-6 max-w-[280px] sm:max-w-xs bg-[#9E653F] text-brand-sand p-6 sm:p-8 rounded-sm shadow-xl border border-brand-cream/10 z-10">
                <p className="font-serif italic text-base sm:text-lg leading-relaxed text-brand-sand">
                  "Tradition is the soil in which innovation grows."
                </p>
                <div className="mt-4 pt-4 border-t border-brand-cream/20 flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-widest uppercase text-brand-cream/70 font-semibold">
                    — MASTER ROASTER
                  </span>
                  <Sparkles className="w-4 h-4 text-brand-cream/50" />
                </div>
              </div>
            </motion.div>

            {/* Right side: Storytelling Text */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-6 lg:pl-6"
            >
              <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-semibold">
                OUR HERITAGE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-dark leading-tight">
                A Legacy Steeped <br /> in Legend
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
          </div>
        </div>
      </section>

      {/* 3. OUR VALUES (OUR ETERNAL COMMITMENT) */}
      <section id="values-section" className="py-24 bg-brand-cream/45 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="bg-brand-brown-dark text-brand-sand p-8 rounded-lg shadow-lg flex flex-col justify-between border border-brand-dark/10 h-80 hover:shadow-xl transition-shadow group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-sand/10 flex items-center justify-center text-brand-sand/90 group-hover:scale-105 transition-transform duration-300">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold tracking-wide">
                  Uncompromising Quality
                </h3>
                <p className="text-xs sm:text-sm text-brand-sand/80 leading-relaxed font-light">
                  Every batch is meticulously evaluated. Only the top 1% of beans earn the Oat & Bean seal, ensuring an unparalleled experience in every single sip.
                </p>
              </div>
              <div className="pt-4 border-t border-brand-sand/10 flex justify-between items-center text-[10px] tracking-wider uppercase font-semibold text-brand-sand/60">
                <span>ESTATE GRADING</span>
                <CheckCircle2 className="w-4 h-4 text-brand-accent" />
              </div>
            </motion.div>

            {/* Card 2: Authentic Roots */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="bg-brand-card-light text-brand-dark p-8 rounded-lg shadow-md flex flex-col justify-between border border-brand-dark/5 h-80 hover:shadow-lg transition-shadow group"
            >
              <div className="space-y-4">
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
              <div className="pt-4 border-t border-brand-dark/5 flex justify-between items-center text-[10px] tracking-wider uppercase font-semibold text-brand-dark/50">
                <span>DIRECT TRADE</span>
                <div className="w-2 h-2 rounded-full bg-[#9E653F]"></div>
              </div>
            </motion.div>

            {/* Card 3: Community Growth */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="bg-brand-sage/90 text-brand-dark p-8 rounded-lg shadow-md flex flex-col justify-between border border-brand-dark/5 h-80 hover:shadow-lg transition-shadow group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-brand-dark group-hover:scale-105 transition-transform duration-300">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold tracking-wide">
                  Community Growth
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/85 leading-relaxed font-light">
                  Success is shared. A portion of every roast goes back into highland infrastructure, coffee picker health clinics, and sustainable agricultural training.
                </p>
              </div>
              <div className="pt-4 border-t border-brand-dark/10 flex justify-between items-center text-[10px] tracking-wider uppercase font-semibold text-brand-dark/60">
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
                  <span className="font-serif text-2xl font-bold text-brand-accent/40 font-mono">
                    01
                  </span>
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
                  <span className="font-serif text-2xl font-bold text-brand-accent/40 font-mono">
                    02
                  </span>
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
                  <span className="font-serif text-2xl font-bold text-brand-accent/40 font-mono">
                    03
                  </span>
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

      {/* 5. BE PART OF OUR JOURNEY (CTA) */}
      <section
        id="cta-section"
        className="relative py-24 bg-cover bg-center overflow-hidden flex items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(42, 26, 15, 0.8), rgba(42, 26, 15, 0.5)), url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1600')`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center text-brand-cream relative z-10 space-y-6">
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
            <p className="text-sm sm:text-base text-brand-cream/85 max-w-2xl mx-auto leading-relaxed font-light">
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
                className="w-full sm:w-auto border border-brand-cream/30 hover:border-brand-cream bg-white/5 hover:bg-white/10 text-brand-cream px-8 py-3.5 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 backdrop-blur-xs cursor-pointer"
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
