import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, MapPin, Check, Trees, Award, Heart, HelpCircle, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { menuHighlights, reviews } from '../data';

export default function AboutUs() {
  const [activeReview, setActiveReview] = useState(0);

  const steps = [
    { id: 1, title: 'Coffee Farms', desc: 'Chikmagalur hills, shade-grown under canopy.' },
    { id: 2, title: 'Handpicked', desc: 'Only red cherries selected manually by growers.' },
    { id: 3, title: 'Slow Dried', desc: 'Highland sun breezes dried on brick patios.' },
    { id: 4, title: 'Micro Roasted', desc: 'Batches tailored curves by roasting master.' },
    { id: 5, title: 'Strict Grading', desc: 'Only top 1% beans score the heritage grade.' },
    { id: 6, title: 'Savor Cup', desc: 'Savor the original Indian heritage cup.' }
  ];

  const differences = [
    { id: 'd1', title: 'Direct Farm Sourcing', desc: 'Transparent agreements directly with coffee growers, securing fair pricing and raw traceability.' },
    { id: 'd2', title: 'Complete Quality Control', desc: 'From the nursery seedlings, canopy pruning, sun-drying to small drum roasters.' },
    { id: 'd3', title: 'Sustainable Canopy Farming', desc: 'Grown under jungle canopies, preserving the native home of cardamom, pepper, and wildlife.' },
    { id: 'd4', title: 'AA Premium Beans', desc: 'Only premium grades, peaberry, and specialty beans are selected for our artisanal profiles.' },
    { id: 'd5', title: 'Micro-Roasted Daily', desc: 'Roasted in small batches every morning and dispatched directly to maintain absolute peak freshness.' },
    { id: 'd6', title: 'Mindful Brewing Ritual', desc: 'Slow coffee bars, stoneware vessels, and master-brewing guides to slow down and reflect.' }
  ];

  const handleNextReview = () => {
    setActiveReview((prev) => (prev + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  return (
    <div id="about-us-page" className="pt-20 bg-brand-sand min-h-screen">
      {/* 1. HERO HEADER */}
      <section
        id="about-hero"
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(42, 26, 15, 0.4), rgba(42, 26, 15, 0.8)), url('https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1600')`,
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center text-brand-cream z-10 space-y-6">
          <span className="font-mono text-xs tracking-[0.3em] text-brand-accent uppercase block font-semibold">
            ESTATE ORIGINS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            Chikmagalur Coffee: <br /> From Farm to Cup.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-brand-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the rich heritage of Indian coffee, cultivated in the misty hills of Karnataka. Hand-selected cherries, slow roasted to perfection, delivered directly to your door.
          </p>
        </div>
      </section>

      {/* 2. LEGACY STEEPED IN EVERY BEAN */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">SINCE 1670</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark leading-tight">
              A Legacy Steeped in Every Bean
            </h2>
            <div className="w-16 h-[2px] bg-brand-accent"></div>
            <p className="text-sm sm:text-base text-brand-dark/75 leading-relaxed font-light">
              For generations, the hills of Chikmagalur have nurtured coffee plants under native forest canopies. This unique shade-grown microclimate allows the cherries to mature slowly, absorbing the essence of wild spices, mountain soil, and seasonal rains.
            </p>
            <p className="text-sm sm:text-base text-brand-dark/75 leading-relaxed font-light">
              According to legend, Baba Budan smuggled seven magical coffee seeds from Yemen in the 17th century, planting them in these very hills. Today, we carry that flame of devotion, refining the harvest process to bring you coffee that honors this legendary terroir.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=1000"
                alt="Chikmagalur coffee sack package on plantation farm"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-[#FAF6F0] text-brand-dark font-mono text-[9px] tracking-wider uppercase font-bold py-1 px-3 rounded-sm shadow-md flex items-center gap-1.5">
                <Trees className="w-3.5 h-3.5 text-brand-accent" />
                SHADE-GROWN ORIGINAL
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. THE JOURNEY (6-STEP TIMELINE) */}
      <section className="py-24 bg-brand-cream/35 border-y border-brand-cream/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">THE PROCESS</span>
            <h2 className="font-serif text-3xl font-bold text-brand-dark">The Journey</h2>
            <p className="text-sm text-brand-dark/65 font-light">The strict, step-by-step ritual that defines our farm-to-cup promise.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {steps.map((step, idx) => (
              <div
                id={`journey-step-timeline-${step.id}`}
                key={step.id}
                className="bg-brand-sand p-6 rounded-lg border border-brand-cream relative flex flex-col justify-between h-44 hover:shadow-md transition-shadow group"
              >
                <div className="space-y-2">
                  <span className="font-serif text-xl font-bold text-brand-accent/30 font-mono group-hover:text-brand-accent/50 transition-colors">0{step.id}</span>
                  <h3 className="font-serif text-base font-bold text-brand-dark">{step.title}</h3>
                  <p className="text-[11px] text-brand-dark/70 font-light leading-relaxed">{step.desc}</p>
                </div>
                {idx < 5 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-brand-dark/15 z-20"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CRAFTED FOR CONNOISSEURS (OUR MENU HIGHLIGHTS) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">OUR CRAFT</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">Crafted for Connoisseurs</h2>
          <p className="text-sm text-brand-dark/65 font-light">Exploring the distinct pillars of our premium coffee café service.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {menuHighlights.map((hl) => (
            <div
              id={`highlight-item-${hl.id}`}
              key={hl.id}
              className="bg-brand-cream/35 rounded-lg overflow-hidden border border-brand-cream flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
            >
              <div className="aspect-[1.2] overflow-hidden">
                <img
                  src={hl.image}
                  alt={hl.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-grow space-y-2 flex flex-col justify-between text-left">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-base font-bold text-brand-dark group-hover:text-brand-accent transition-colors">
                    {hl.title}
                  </h3>
                  <p className="text-[11px] text-brand-dark/70 font-light leading-relaxed">
                    {hl.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. THE CHIKMAGALUR DIFFERENCE */}
      <section className="py-24 bg-[#2A1A0F] text-brand-cream px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">THE BLUEPRINT</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">The Chikmagalur Difference</h2>
            <p className="text-sm text-brand-cream/60 font-light">How we achieve unparalleled excellence compared to commercial chains.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differences.map((diff) => (
              <div
                id={`difference-${diff.id}`}
                key={diff.id}
                className="bg-white/5 border border-white/5 p-8 rounded-lg hover:bg-white/10 transition-colors duration-300 relative group flex flex-col justify-between text-left"
              >
                <div className="space-y-3">
                  <h3 className="font-serif text-lg font-bold text-brand-cream group-hover:text-brand-accent transition-colors">
                    {diff.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-cream/70 font-light leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-[10px] text-brand-accent font-semibold tracking-widest">
                  <span>CERTIFIED ORIGINAL</span>
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SLIDER */}
      <section className="py-24 bg-brand-sand px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">REVIEWS &amp; CORRESPONDENCE</span>
          <h2 className="font-serif text-3xl font-bold text-brand-dark">Appreciation from Patrons</h2>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto mt-2"></div>
        </div>

        <div className="bg-brand-cream/35 p-8 sm:p-12 rounded-lg border border-brand-cream/60 shadow-md relative min-h-[250px] flex flex-col justify-between">
          <Quote className="absolute top-6 right-8 w-12 h-12 text-brand-dark/5" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 text-left"
            >
              <div className="flex text-amber-500 gap-1">
                {[...Array(reviews[activeReview].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                ))}
              </div>
              <p className="font-serif italic text-base sm:text-lg text-brand-dark/85 leading-relaxed">
                "{reviews[activeReview].content}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-brand-dark/5">
                <div className="w-10 h-10 rounded-full bg-brand-brown-dark text-brand-sand flex items-center justify-center font-mono text-xs font-bold">
                  {reviews[activeReview].initials}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-brand-dark text-sm">{reviews[activeReview].name}</h4>
                  <p className="text-[10px] tracking-wider text-brand-dark/50 uppercase font-semibold">{reviews[activeReview].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              id="prev-review-btn"
              onClick={handlePrevReview}
              className="p-2.5 rounded-full border border-brand-dark/10 hover:border-brand-accent text-brand-dark hover:text-brand-accent transition-colors bg-brand-sand cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="next-review-btn"
              onClick={handleNextReview}
              className="p-2.5 rounded-full border border-brand-dark/10 hover:border-brand-accent text-brand-dark hover:text-brand-accent transition-colors bg-brand-sand cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. FLAGSHIP OUTLET CONTACT */}
      <section className="py-20 bg-brand-cream/45 px-4 sm:px-6 lg:px-8 border-t border-brand-cream">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">VISIT US</span>
          <h2 className="font-serif text-3xl font-bold text-brand-dark">The Indiranagar Flagship</h2>
          <p className="text-sm text-brand-dark/70 max-w-lg mx-auto font-light leading-relaxed">
            Come visit our serene flagship sanctuary. Crafted in raw teakwood, stone water tables, and slow pour-over bars.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-brand-dark/75 pt-2">
            <p className="flex items-center gap-2 font-semibold">
              <MapPin className="w-4 h-4 text-brand-accent" />
              12th Main Rd, Indiranagar, Bengaluru
            </p>
            <p className="flex items-center gap-2 font-semibold">
              <Star className="w-4 h-4 text-brand-accent" />
              Hours: 07:00 AM – 11:00 PM Daily
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
