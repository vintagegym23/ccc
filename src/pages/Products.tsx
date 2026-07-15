import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight, Sparkles, CheckCircle, Info, Mail } from 'lucide-react';
import { products, coldBrews, artisanalSnacks } from '../data';
import { Product } from '../types';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartCount, setCartCount] = useState<number>(0);
  const [addedProduct, setAddedProduct] = useState<string | null>(null);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const categories = [
    { id: 'all', label: 'ALL COLLECTIONS' },
    { id: 'traditional', label: 'TRADITIONAL COFFEE' },
    { id: 'limited', label: 'LIMITED EDITIONS' },
    { id: 'coldbrew', label: 'COLD BREW KITS' },
    { id: 'accessories', label: 'ACCESSORIES' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleAddToRitual = (productName: string) => {
    setCartCount(prev => prev + 1);
    setAddedProduct(productName);
    setTimeout(() => {
      setAddedProduct(null);
    }, 3000);
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setEmailSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setEmailSubscribed(false), 5000);
    }
  };

  return (
    <div id="products-page" className="pt-20 bg-brand-sand min-h-screen">
      {/* 1. HERO HEADER */}
      <section
        id="products-hero"
        className="relative py-24 bg-cover bg-center text-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(42, 26, 15, 0.5), rgba(42, 26, 15, 0.75)), url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1600')`,
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-brand-cream z-10 space-y-4">
          <span className="font-mono text-xs tracking-[0.25em] text-brand-accent uppercase block font-semibold">
            ESTATE RESERVE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Taste the Highlands
          </h1>
          <p className="text-sm sm:text-base text-brand-cream/85 max-w-2xl mx-auto font-light leading-relaxed">
            Every bean tells the story of the high-altitude soil it was raised in. Explore our meticulously hand-sorted, slow-roasted heritage collections.
          </p>
        </div>

        {/* Floating Cart Pill (Visual aid to show added items) */}
        <div className="absolute top-6 right-6 bg-brand-accent text-brand-sand px-4 py-2 rounded-full text-xs font-bold tracking-wider flex items-center gap-2 shadow-lg border border-white/15 z-20">
          <ShoppingBag className="w-4 h-4" />
          <span>MY RITUALS ({cartCount})</span>
        </div>
      </section>

      {/* SUCCESS TOAST */}
      <AnimatePresence>
        {addedProduct && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 bg-brand-dark text-brand-cream py-4 px-6 rounded-md shadow-2xl border border-brand-accent flex items-center gap-3 z-50 max-w-md"
          >
            <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0" />
            <div className="text-left">
              <p className="font-serif text-sm font-bold">Added to Daily Ritual</p>
              <p className="text-[11px] text-brand-cream/60">{addedProduct} was successfully added.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. FILTER TABS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-brand-cream/60">
        <div className="max-w-7xl mx-auto flex justify-center overflow-x-auto py-2">
          <div className="flex space-x-2 sm:space-x-4 border-b border-brand-dark/5 w-full justify-start md:justify-center">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  id={`cat-tab-${cat.id}`}
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`py-3 px-4 sm:px-6 text-[10px] sm:text-xs font-semibold tracking-widest transition-all duration-300 relative focus:outline-none whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-brand-dark'
                      : 'text-brand-dark/40 hover:text-brand-dark/80'
                  }`}
                >
                  {cat.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-accent"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATALOG GRID */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                id={`product-card-${product.id}`}
                key={product.id}
                className="bg-brand-cream/40 rounded-lg overflow-hidden border border-brand-cream/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Section with Tag */}
                <div className="relative aspect-square overflow-hidden bg-brand-cream/10">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.tag && (
                    <span className="absolute top-4 left-4 bg-[#9E653F] text-brand-sand text-[8px] sm:text-[9px] font-bold tracking-widest uppercase py-1 px-3 rounded-sm shadow-md">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-dark tracking-wide">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-dark/70 font-light leading-relaxed min-h-[60px]">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-dark/5 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] tracking-wider text-brand-dark/45 uppercase block font-semibold">PRICE</span>
                      <span className="font-mono text-base font-bold text-brand-dark">₹{product.price}</span>
                    </div>
                    <button
                      id={`add-ritual-btn-${product.id}`}
                      onClick={() => handleAddToRitual(product.name)}
                      className="bg-transparent border border-brand-accent/40 hover:border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-sand px-4 py-2.5 rounded-sm text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      ADD TO RITUAL
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 4. THE SEASONAL RESERVE (LIMITED AVAILABILITY BANNER) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative rounded-lg overflow-hidden py-24 px-8 sm:px-16 flex items-center bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(42, 26, 15, 0.85), rgba(42, 26, 15, 0.45)), url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1200')`,
            }}
          >
            <div className="absolute inset-0 bg-black/15"></div>
            <div className="relative z-10 max-w-xl space-y-6 text-brand-cream">
              <span className="bg-brand-accent/90 text-brand-sand text-[8px] sm:text-[9px] font-bold tracking-widest uppercase py-1 px-3 rounded-sm inline-block shadow-md">
                LIMITED AVAILABILITY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                The Seasonal Reserve
              </h2>
              <p className="text-sm text-brand-cream/85 leading-relaxed font-light">
                Hand-picked micro-lots sourced from the extreme high-altitude slopes of Baba Budangiri. Only 50 individually numbered canvas units are released each season.
              </p>
              <div className="pt-2">
                <button
                  id="explore-reserve-btn"
                  onClick={() => handleAddToRitual('The Seasonal Reserve')}
                  className="bg-brand-accent hover:bg-brand-brown-dark text-brand-sand px-8 py-3.5 rounded-sm text-xs font-bold tracking-widest uppercase transition-all shadow-md cursor-pointer"
                >
                  EXPLORE RESERVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COLD BREWS & ARTISANAL SNACKS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Cold Brews list */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex justify-between items-end border-b border-brand-dark/10 pb-4">
              <div>
                <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">HOUSE BREWS</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark mt-1">Cold Brew Bottles</h3>
              </div>
              <span className="text-xs font-bold tracking-wider text-brand-accent uppercase border-b border-brand-accent pb-0.5 cursor-pointer hover:text-brand-dark">
                VIEW ALL
              </span>
            </div>

            <div className="space-y-6">
              {coldBrews.map((brew) => (
                <div
                  id={`cold-brew-item-${brew.id}`}
                  key={brew.id}
                  className="flex items-center gap-6 p-4 rounded-lg bg-brand-cream/30 hover:bg-brand-cream/60 transition-all border border-transparent hover:border-brand-cream/85 group"
                >
                  <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-brand-cream/20 shadow-sm">
                    <img src={brew.image} alt={brew.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="flex-grow flex justify-between items-center">
                    <div className="space-y-1 max-w-sm">
                      <h4 className="font-serif text-base sm:text-lg font-bold text-brand-dark">{brew.name}</h4>
                      <p className="text-xs text-brand-dark/65 font-light">{brew.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-mono text-sm font-bold text-brand-dark block">₹{brew.price}</span>
                      <button
                        id={`add-cold-brew-${brew.id}`}
                        onClick={() => handleAddToRitual(brew.name)}
                        className="text-[10px] font-bold tracking-widest text-brand-accent hover:text-brand-dark uppercase mt-1 cursor-pointer"
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Artisanal Snacks Dark Card */}
          <div className="lg:col-span-5 bg-brand-brown-dark text-brand-sand p-8 rounded-lg shadow-xl border border-brand-dark/10 space-y-8">
            <div className="space-y-1">
              <span className="font-mono text-[10px] tracking-widest text-brand-accent uppercase font-semibold">FRESH PROVISIONS</span>
              <h3 className="font-serif text-2xl font-bold">Artisanal Snacks</h3>
              <p className="text-xs text-brand-sand/65 font-light">Hand-baked in our micro-kitchen daily to complement your cup.</p>
            </div>

            <div className="space-y-6">
              {artisanalSnacks.map((snack) => (
                <div
                  id={`snack-item-${snack.id}`}
                  key={snack.id}
                  className="border-b border-brand-sand/10 pb-4 last:border-0 last:pb-0 flex justify-between items-start gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-base font-bold text-brand-sand">{snack.name}</h4>
                      <span className="text-[7px] tracking-widest bg-brand-sand/15 text-brand-sand font-bold px-1.5 py-0.5 rounded-sm uppercase">
                        {snack.highlight}
                      </span>
                    </div>
                    <p className="text-xs text-brand-sand/70 font-light leading-relaxed">{snack.description}</p>
                  </div>
                  <span className="font-mono text-sm font-bold text-brand-accent text-right flex-shrink-0 pt-0.5">₹{snack.price}</span>
                </div>
              ))}
            </div>

            <button
              id="all-provisions-btn"
              onClick={() => handleAddToRitual('Artisanal Snacks Pack')}
              className="w-full border border-brand-sand/20 hover:border-brand-sand bg-white/5 hover:bg-white/10 text-brand-sand py-3 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer"
            >
              ALL PROVISIONS
            </button>
          </div>

        </div>
      </section>

      {/* 6. JOIN THE CIRCLE (NEWSLETTER) */}
      <section className="py-20 bg-brand-cream/60 px-4 sm:px-6 lg:px-8 border-t border-brand-cream">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent mx-auto">
            <Mail className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
            Join the Circle
          </h2>
          <p className="text-xs sm:text-sm text-brand-dark/70 max-w-xl mx-auto font-light leading-relaxed">
            Subscribe to receive exclusive access to micro-lot drops, seasonal crop reports, home brewing recipes, and private tasting gatherings.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto pt-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="newsletter-email-input"
                type="email"
                required
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-grow bg-brand-sand/80 border border-brand-dark/15 rounded-sm px-4 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-accent transition-colors"
              />
              <button
                id="newsletter-subscribe-btn"
                type="submit"
                className="bg-brand-accent hover:bg-brand-brown-dark text-brand-sand px-6 py-3 rounded-sm text-xs font-bold tracking-widest uppercase transition-all cursor-pointer whitespace-nowrap"
              >
                SUBSCRIBE
              </button>
            </div>
            
            {emailSubscribed && (
              <p className="text-xs text-[#9E653F] font-semibold mt-3 animate-fade-in">
                Thank you! You are now subscribed to the Circle.
              </p>
            )}
          </form>

          <p className="font-mono text-[9px] tracking-[0.2em] text-brand-dark/35 uppercase">
            RESPECTING YOUR INBOX SINCE 2024
          </p>
        </div>
      </section>
    </div>
  );
}
