import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Search, Calendar, ChevronRight, Compass, Sparkles, MessageSquare, Clock, Globe } from 'lucide-react';
import { outlets } from '../data';
import { Outlet } from '../types';

export default function Locations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestCity, setSuggestCity] = useState('');
  const [suggestEmail, setSuggestEmail] = useState('');
  const [suggestSubmitted, setSuggestSubmitted] = useState(false);
  const [showSuggestForm, setShowSuggestForm] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(outlets[0]);

  const filteredOutlets = outlets.filter((outlet) =>
    outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    outlet.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSuggestSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (suggestCity.trim() && suggestEmail.trim()) {
      setSuggestSubmitted(true);
      setSuggestCity('');
      setSuggestEmail('');
      setTimeout(() => {
        setSuggestSubmitted(false);
        setShowSuggestForm(false);
      }, 4000);
    }
  };

  const upcomingLocations = [
    { id: 'ul1', city: 'Pune', area: 'Koregaon Park', timing: 'Winter 2024', bg: 'bg-[#DCDAD4]' },
    { id: 'ul2', city: 'Delhi', area: 'Chanakyapuri', timing: 'Spring 2025', bg: 'bg-[#E5DFD4]' },
    { id: 'ul3', city: 'Goa', area: 'Assagao Sanctuary', timing: 'Summer 2025', bg: 'bg-[#DCDAD4]' },
    { id: 'ul4', city: 'Hyderabad', area: 'Jubilee Hills', timing: 'Autumn 2025', bg: 'bg-[#E5DFD4]' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  return (
    <div id="locations-page" className="pt-20 bg-brand-sand min-h-screen pb-24">
      {/* 1. HERO SEARCH HEADER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2A1A0F] text-brand-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(158,101,63,0.35)_0%,transparent_100%]"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center space-y-6 z-10">
          <span className="font-mono text-xs tracking-[0.25em] text-brand-accent uppercase block font-semibold">
            FIND YOUR SANCTUARY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            Find Your Local CCC Sanctuary
          </h1>
          <p className="text-sm text-brand-cream/70 max-w-xl mx-auto font-light leading-relaxed">
            Every cup is a return to roots. Visit our carefully designed, serene spaces created to slow down time and celebrate specialty brewing.
          </p>

          {/* Search Bar Input */}
          <div className="max-w-md mx-auto pt-4 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-cream/40 w-4 h-4" />
            <input
              id="outlet-search-input"
              type="text"
              placeholder="Search by city (Bangalore, Mumbai...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-sm py-3.5 pl-12 pr-4 text-xs tracking-wider text-brand-cream placeholder-brand-cream/45 focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all uppercase font-semibold"
            />
          </div>
        </div>
      </section>

      {/* 2. OUTLETS CARDS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">CURRENT LOCATIONS</span>
          <h2 className="font-serif text-3xl font-bold text-brand-dark">Our Premium Outlets</h2>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto mt-2"></div>
        </div>

        {filteredOutlets.length === 0 ? (
          <div className="text-center py-12 bg-brand-cream/30 rounded-lg">
            <p className="text-sm text-brand-dark/50">No sanctuaries match your search query. Try "Bangalore" or "Mumbai".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredOutlets.map((outlet) => {
              const isSelected = selectedOutlet?.id === outlet.id;
              return (
                <div
                  id={`outlet-card-${outlet.id}`}
                  key={outlet.id}
                  onClick={() => setSelectedOutlet(outlet)}
                  className={`bg-brand-cream/35 rounded-lg overflow-hidden border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                    isSelected ? 'border-brand-accent ring-1 ring-brand-accent/50' : 'border-brand-cream/80 hover:shadow-lg'
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={outlet.image}
                      alt={outlet.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-brand-dark/85 backdrop-blur-xs text-brand-sand text-[9px] tracking-widest font-bold uppercase px-3 py-1.5 rounded-sm">
                      SPECIALTY BAR
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-bold text-brand-dark group-hover:text-brand-accent transition-colors">
                        {outlet.name}
                      </h3>
                      <p className="text-xs text-brand-dark/55 flex items-center gap-1.5 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                        {outlet.location}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-brand-dark/5 space-y-2 text-xs text-brand-dark/70 font-light">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-brand-dark/40" />
                        <span>{outlet.hours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Compass className="w-3.5 h-3.5 text-brand-dark/40" />
                        <span>Pour-over &amp; Espresso Rituals</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <button
                      id={`view-directions-${outlet.id}`}
                      className="w-full bg-[#FAF6F0] hover:bg-brand-accent text-brand-dark hover:text-brand-sand border border-brand-dark/10 hover:border-brand-accent py-2.5 rounded-sm text-[10px] font-bold tracking-widest uppercase transition-all duration-300"
                    >
                      GET DIRECTIONS
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. COFFEE FOOTPRINT & MAP (SVG) */}
      <section className="py-20 bg-brand-cream/45 px-4 sm:px-6 lg:px-8 border-y border-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left stats panel */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="space-y-3">
                <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">OUR ROOTS</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark leading-tight">
                  Our Coffee Footprint
                </h2>
                <div className="w-16 h-[2px] bg-brand-accent"></div>
              </div>
              <p className="text-sm text-brand-dark/70 leading-relaxed font-light">
                Our operations trace back to the pristine, high-altitude hills of Baba Budangiri in Chikmagalur—the birthplace of coffee in India. We direct-trade with over 120 family-owned micro-estates to source premium shade-grown beans.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-4 bg-brand-sand rounded-sm border border-brand-dark/5 shadow-xs">
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-dark block">120+</span>
                  <span className="font-mono text-[9px] tracking-widest text-brand-dark/50 uppercase font-semibold">Farmers Supported</span>
                </div>
                <div className="p-4 bg-brand-sand rounded-sm border border-brand-dark/5 shadow-xs">
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-dark block">100%</span>
                  <span className="font-mono text-[9px] tracking-widest text-brand-dark/50 uppercase font-semibold">Shade Canopies</span>
                </div>
                <div className="p-4 bg-brand-sand rounded-sm border border-brand-dark/5 shadow-xs col-span-2">
                  <span className="font-serif text-xl sm:text-2xl font-extrabold text-[#9E653F] block">Western Ghats</span>
                  <span className="font-mono text-[9px] tracking-widest text-brand-dark/50 uppercase font-semibold">Primary Terroir Sourcing</span>
                </div>
              </div>
            </motion.div>

            {/* Right Interactive SVG Map of Karnataka/Western India region */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="lg:col-span-7 bg-brand-sand p-6 sm:p-8 rounded-lg shadow-lg border border-brand-cream/80 relative flex flex-col items-center justify-center min-h-[400px]"
            >
              <div className="absolute top-4 left-6 text-left">
                <span className="font-mono text-[8px] tracking-[0.25em] text-brand-accent uppercase block font-semibold">SOUTH INDIAN HIGHLANDS</span>
                <p className="font-serif text-sm font-bold text-brand-dark">Direct Sourcing Map</p>
              </div>

              {/* Coffee Region Illustration map */}
              <svg className="w-full max-w-md aspect-[1.1] text-brand-dark/15" viewBox="0 0 400 360" fill="none" stroke="currentColor" strokeWidth="1.5">
                {/* Coastal outline line style */}
                <path d="M50,40 Q110,120 130,220 T200,340" strokeDasharray="3 3" />
                {/* Western Ghats forest zone shade path */}
                <path d="M120,60 Q140,160 160,250 T220,330" stroke="#96A88F" strokeWidth="16" strokeLinecap="round" opacity="0.3" />
                
                {/* Region Names */}
                <text x="210" y="325" fill="#2A1A0F" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="1">MUMBAI SANCTUARY</text>
                <text x="180" y="240" fill="#2A1A0F" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="1">CHIKMAGALUR ESTATES</text>
                <text x="220" y="165" fill="#2A1A0F" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="1">BANGALORE HQ</text>

                {/* Chikmagalur Sourcing Point */}
                <g className="cursor-pointer">
                  <circle cx="160" cy="245" r="14" fill="#8E9F88" fillOpacity="0.2" />
                  <circle cx="160" cy="245" r="7" fill="#8E9F88" />
                  <circle cx="160" cy="245" r="3" fill="#FAF6F0" />
                </g>

                {/* Bangalore Outlets */}
                <g className="cursor-pointer">
                  <circle cx="210" cy="170" r="12" fill="#9E653F" fillOpacity="0.2" />
                  <circle cx="210" cy="170" r="6" fill="#9E653F" />
                  <circle cx="210" cy="170" r="2" fill="#FAF6F0" />
                </g>

                {/* Mumbai Outlets */}
                <g className="cursor-pointer">
                  <circle cx="200" cy="320" r="12" fill="#2A1A0F" fillOpacity="0.2" />
                  <circle cx="200" cy="320" r="6" fill="#2A1A0F" />
                  <circle cx="200" cy="320" r="2" fill="#FAF6F0" />
                </g>

                {/* Connection lines */}
                <path d="M160,245 L210,170" stroke="#9E653F" strokeWidth="1" strokeDasharray="4 2" />
                <path d="M160,245 L200,320" stroke="#9E653F" strokeWidth="1" strokeDasharray="4 2" />
              </svg>

              <div className="absolute bottom-4 right-6 text-right">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-widest text-[#9E653F]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8E9F88] animate-pulse"></span>
                  BABA BUDANGIRI HILLS SOURCING
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. CULTIVATING NEW ROOTS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">CULTIVATING NEW ROOTS</span>
          <h2 className="font-serif text-3xl font-bold text-brand-dark">Sanctuaries on the Horizon</h2>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingLocations.map((loc) => (
            <div
              id={`upcoming-${loc.id}`}
              key={loc.id}
              className={`${loc.bg} text-brand-dark p-6 rounded-lg border border-brand-dark/5 flex flex-col justify-between h-48 hover:shadow-md transition-all group`}
            >
              <div className="space-y-2">
                <span className="font-mono text-[9px] tracking-widest text-brand-dark/40 uppercase block font-bold">UPCOMING OUTLET</span>
                <h3 className="font-serif text-2xl font-bold tracking-wide group-hover:text-[#9E653F] transition-colors">{loc.city}</h3>
                <p className="text-xs text-brand-dark/70 font-light">{loc.area}</p>
              </div>
              <div className="pt-4 border-t border-brand-dark/10 flex items-center justify-between text-[10px] tracking-widest font-bold text-brand-dark/60">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#9E653F]" />
                  {loc.timing}
                </span>
                <ChevronRight className="w-4 h-4 text-brand-dark/40 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SUGGEST A LOCATION CARD */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-brand-brown-dark text-brand-sand rounded-lg overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12 border border-brand-dark/10">
          <div className="md:col-span-5 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1572119139630-613b6300d8bc?auto=format&fit=crop&q=80&w=800')` }}>
          </div>
          <div className="md:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-center text-left">
            <span className="font-mono text-[10px] tracking-widest text-brand-accent uppercase font-semibold">GROW WITH US</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-cream">
              Want a CCC in your city?
            </h3>
            <p className="text-xs sm:text-sm text-brand-cream/80 font-light leading-relaxed">
              We are constantly seeking beautiful heritage spots, quiet street corners, and dynamic neighborhood hubs to introduce our slow-brewing sanctuaries. Tell us where we should land next.
            </p>

            {!showSuggestForm ? (
              <div className="pt-2">
                <button
                  id="suggest-form-toggle-btn"
                  onClick={() => setShowSuggestForm(true)}
                  className="bg-brand-accent hover:bg-brand-sand text-brand-sand hover:text-brand-dark px-6 py-3 rounded-sm text-xs font-bold tracking-widest uppercase transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  SUGGEST A LOCATION
                </button>
              </div>
            ) : (
              <form onSubmit={handleSuggestSubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    id="suggest-city-input"
                    type="text"
                    required
                    placeholder="E.g., Pune, Hyderabad..."
                    value={suggestCity}
                    onChange={(e) => setSuggestCity(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-xs tracking-wider uppercase font-semibold text-brand-cream placeholder-brand-cream/40 focus:outline-none focus:border-brand-accent"
                  />
                  <input
                    id="suggest-email-input"
                    type="email"
                    required
                    placeholder="Your email address"
                    value={suggestEmail}
                    onChange={(e) => setSuggestEmail(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-xs text-brand-cream placeholder-brand-cream/40 focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    id="suggest-submit-btn"
                    type="submit"
                    className="bg-brand-accent hover:bg-white text-brand-sand hover:text-brand-dark px-6 py-3 rounded-sm text-xs font-bold tracking-widest uppercase transition-all cursor-pointer flex-grow text-center"
                  >
                    SEND RECOMMENDATION
                  </button>
                  <button
                    id="suggest-cancel-btn"
                    type="button"
                    onClick={() => setShowSuggestForm(false)}
                    className="border border-white/10 hover:border-white text-brand-cream px-4 py-3 rounded-sm text-xs font-bold tracking-widest uppercase transition-all cursor-pointer"
                  >
                    CANCEL
                  </button>
                </div>

                {suggestSubmitted && (
                  <p className="text-xs text-brand-accent font-semibold flex items-center gap-1.5 animate-fade-in">
                    <Sparkles className="w-4 h-4 text-brand-accent" />
                    Recommendation received with gratitude! We will keep you notified.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
