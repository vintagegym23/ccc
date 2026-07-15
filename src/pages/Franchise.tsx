import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, TrendingUp, Handshake, CheckCircle2, FileText, ChevronRight, MessageSquare, Quote, Sparkles } from 'lucide-react';
import { franchiseModels } from '../data';

export default function Franchise() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    city: '',
    model: 'signature',
    capital: '20L-50L',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [brochureEmail, setBrochureEmail] = useState('');
  const [brochureSent, setBrochureSent] = useState(false);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.fullName.trim() && formData.email.trim() && formData.city.trim()) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          city: '',
          model: 'signature',
          capital: '20L-50L',
          message: ''
        });
      }, 5000);
    }
  };

  const handleBrochureSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (brochureEmail.trim()) {
      setBrochureSent(true);
      setBrochureEmail('');
      setTimeout(() => setBrochureSent(false), 5000);
    }
  };

  const whyPartner = [
    {
      id: 'wp1',
      title: 'Estate Direct Supply',
      description: 'A flawless, direct supply chain. We bypass volatile open commodity markets to supply our franchise partners with consistently grade-A coffee direct from our private canopy estates.',
      icon: Award
    },
    {
      id: 'wp2',
      title: 'Heritage Brand Power',
      description: 'CCC is synonymous with premium coffee luxury. Leverage an established reputation, gorgeous identity system, and organic marketing that attracts discerning coffee guests from day one.',
      icon: Handshake
    },
    {
      id: 'wp3',
      title: 'Proven Unit Economics',
      description: 'High retail margins, small real estate footprints, and meticulously optimized barista workflows result in highly optimized startup costs, rapid payback, and strong store cash flow.',
      icon: TrendingUp
    },
    {
      id: 'wp4',
      title: 'End-to-End Operational Support',
      description: 'Bespoke interior architectural planning, signature recipes, professional baristas training via our CCC Academy, and targeted grand opening digital marketing campaigns.',
      icon: CheckCircle2
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  return (
    <div id="franchise-page" className="pt-20 bg-brand-sand min-h-screen pb-24">
      {/* 1. HERO HEADER */}
      <section
        id="franchise-hero"
        className="relative py-28 bg-cover bg-center text-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(42, 26, 15, 0.5), rgba(42, 26, 15, 0.75)), url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1600')`,
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-brand-cream z-10 space-y-6">
          <span className="font-mono text-xs tracking-[0.25em] text-brand-accent uppercase block font-semibold">
            PARTNERSHIP OPPORTUNITIES
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Grow with the Heritage <br /> of Chikmagalur
          </h1>
          <p className="text-sm sm:text-base text-brand-cream/85 max-w-2xl mx-auto font-light leading-relaxed">
            Become a cornerstone of your city's coffee renaissance. Oat &amp; Bean offers a proven, highly profitable business model backed by generational heritage, direct sourcing, and architectural design.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              id="hero-enquire-form-link"
              href="#franchise-inquiry-section"
              className="w-full sm:w-auto bg-brand-accent hover:bg-brand-brown-dark text-brand-sand px-8 py-3.5 rounded-sm text-xs font-bold tracking-widest uppercase transition-all shadow-md text-center"
            >
              EXPLORE OPPORTUNITIES
            </a>
            <a
              id="hero-brochure-modal-btn"
              href="#download-brochure-section"
              className="w-full sm:w-auto border border-brand-cream/40 hover:border-brand-cream bg-white/5 hover:bg-white/10 text-brand-cream px-8 py-3.5 rounded-sm text-xs font-bold tracking-widest uppercase transition-all text-center"
            >
              DOWNLOAD BROCHURE
            </a>
          </div>
        </div>
      </section>

      {/* 2. WHY PARTNER WITH CCC */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">THE CCC ADVANTAGE</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">Why Partner with CCC?</h2>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {whyPartner.map((item) => {
            const Icon = item.icon;
            return (
              <div
                id={`advantage-${item.id}`}
                key={item.id}
                className="bg-brand-cream/35 p-8 rounded-lg border border-brand-cream/80 hover:border-brand-accent/30 hover:shadow-lg transition-all duration-300 flex items-start gap-6 group"
              >
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-brand-dark group-hover:text-[#9E653F] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-dark/70 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. THE FRANCHISE MODELS */}
      <section className="py-24 bg-brand-cream/45 px-4 sm:px-6 lg:px-8 border-y border-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">FRANCHISE FOOTPRINTS</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">Our Franchise Formats</h2>
            <p className="text-sm text-brand-dark/65 font-light">Choose a model tailored to your target territory, demographics, and local spacing layout.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {franchiseModels.map((model) => (
              <div
                id={`model-card-${model.id}`}
                key={model.id}
                className="bg-brand-sand rounded-lg overflow-hidden border border-brand-cream/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl font-bold text-brand-dark">{model.title}</h3>
                    <p className="text-xs sm:text-sm text-brand-dark/70 font-light leading-relaxed min-h-[72px]">
                      {model.description}
                    </p>
                    <div className="space-y-2 pt-2">
                      <span className="font-mono text-[9px] tracking-widest text-brand-accent font-bold uppercase block">KEY SPECIFICATIONS:</span>
                      <ul className="space-y-1.5">
                        {model.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-brand-dark/75">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-brand-dark/5">
                    <a
                      id={`learn-more-model-${model.id}`}
                      href="#franchise-inquiry-section"
                      className="w-full bg-[#FAF6F0] hover:bg-brand-accent text-brand-dark hover:text-brand-sand border border-brand-dark/10 hover:border-brand-accent py-2.5 rounded-sm text-[10px] font-bold tracking-widest uppercase transition-all duration-300 text-center block"
                    >
                      REQUEST FINANCIAL SHEETS
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BROCHURE & ENQUIRY GRID */}
      <section
        id="franchise-inquiry-section"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Timeline Process & Reviews */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">THE ROADMAP</span>
              <h2 className="font-serif text-3xl font-bold text-brand-dark">Begin Your Journey</h2>
              <p className="text-sm text-brand-dark/70 font-light leading-relaxed">
                We maintain an extremely rigorous selection process to ensure absolute alignment on aesthetic and agricultural values.
              </p>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-8 relative">
              <div className="absolute left-[15px] top-4 bottom-4 w-[1px] bg-brand-dark/10 z-0"></div>
              
              <div className="flex gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-brand-accent text-brand-sand font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                  01
                </div>
                <div className="space-y-1 pt-0.5">
                  <h4 className="font-serif text-base font-bold text-brand-dark">Initial Enquire</h4>
                  <p className="text-xs text-brand-dark/65 font-light leading-relaxed">
                    Submit your background, preferred territory coordinates, and liquid capital details via the partnership form.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-brand-brown-dark text-brand-sand font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                  02
                </div>
                <div className="space-y-1 pt-0.5">
                  <h4 className="font-serif text-base font-bold text-brand-dark">Discovery Session</h4>
                  <p className="text-xs text-brand-dark/65 font-light leading-relaxed">
                    Meet with our brand directors to review site demographics, layout plans, structural ROI forecasts, and standard contracts.
                  </p>
                </div>
              </div>
            </div>

            {/* Review Box */}
            <div className="p-6 bg-brand-cream/50 rounded-lg border border-brand-cream relative space-y-4">
              <Quote className="absolute top-4 right-6 w-10 h-10 text-brand-dark/5" />
              <p className="font-serif italic text-sm text-brand-dark/80 leading-relaxed">
                "Partnering with Oat &amp; Bean was the most rewarding venture of my professional life. The corporate design support, intensive CCC training academy, and direct estate bean quality made our Indiranagar flagship café a sensational success from week one."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-[#9E653F] text-brand-sand flex items-center justify-center font-mono text-xs font-bold">
                  AM
                </div>
                <div>
                  <h5 className="font-serif font-bold text-brand-dark text-sm">Aditya Mehta</h5>
                  <p className="text-[10px] tracking-wider text-brand-dark/55 uppercase font-semibold">Indiranagar Franchise Partner</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Inquiry Form */}
          <div className="lg:col-span-7 bg-brand-cream/35 p-8 sm:p-10 rounded-lg border border-brand-cream shadow-xl text-left space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[9px] tracking-widest text-brand-accent uppercase font-bold">SECURE PORTAL</span>
              <h3 className="font-serif text-2xl font-bold text-brand-dark">Partnership Inquiry Form</h3>
              <p className="text-xs text-brand-dark/60 font-light">Submit your proposal below. Our expansion committee reviews entries weekly.</p>
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-brand-dark text-brand-sand p-8 rounded-lg text-center space-y-4 border border-brand-accent"
              >
                <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center mx-auto text-brand-sand">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <h4 className="font-serif text-xl font-bold">Application Received Successfully</h4>
                <p className="text-xs text-brand-sand/75 leading-relaxed max-w-sm mx-auto font-light">
                  Thank you for your interest in cultivating coffee heritage. Our development team has safely logged your coordinates and will reach out via email within 3 business days.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-widest text-brand-dark/60 uppercase font-semibold block">FULL NAME</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleFormChange}
                      placeholder="Jane Doe"
                      className="w-full bg-brand-sand border border-brand-dark/15 rounded-sm p-3 text-xs text-brand-dark focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-widest text-brand-dark/60 uppercase font-semibold block">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="jane@example.com"
                      className="w-full bg-brand-sand border border-brand-dark/15 rounded-sm p-3 text-xs text-brand-dark focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-widest text-brand-dark/60 uppercase font-semibold block">PROPOSED CITY &amp; STATE</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleFormChange}
                      placeholder="Pune, Maharashtra"
                      className="w-full bg-brand-sand border border-brand-dark/15 rounded-sm p-3 text-xs text-brand-dark focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-widest text-brand-dark/60 uppercase font-semibold block">PREFERRED MODEL</label>
                    <select
                      name="model"
                      value={formData.model}
                      onChange={handleFormChange}
                      className="w-full bg-brand-sand border border-brand-dark/15 rounded-sm p-3 text-xs text-brand-dark focus:outline-none focus:border-brand-accent appearance-none cursor-pointer"
                    >
                      <option value="signature">Signature Cafe (1200 - 2000 sq ft)</option>
                      <option value="express">Express Hub (250 - 500 sq ft)</option>
                      <option value="heritage">Heritage Corner (100 - 200 sq ft)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] tracking-widest text-brand-dark/60 uppercase font-semibold block">LIQUID CAPITAL ALLOCATION</label>
                  <select
                    name="capital"
                    value={formData.capital}
                    onChange={handleFormChange}
                    className="w-full bg-brand-sand border border-brand-dark/15 rounded-sm p-3 text-xs text-brand-dark focus:outline-none focus:border-brand-accent appearance-none cursor-pointer"
                  >
                    <option value="20L-50L">₹20 Lakhs – ₹50 Lakhs INR</option>
                    <option value="50L-1Cr">₹50 Lakhs – ₹1 Crore INR</option>
                    <option value="1Cr+">Over ₹1 Crore INR</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] tracking-widest text-brand-dark/60 uppercase font-semibold block">PROPOSAL BACKGROUND</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Describe your hospitality background, location access, and why you wish to introduce Oat &amp; Bean."
                    className="w-full bg-brand-sand border border-brand-dark/15 rounded-sm p-3 text-xs text-brand-dark focus:outline-none focus:border-brand-accent resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    id="submit-franchise-inquiry-btn"
                    type="submit"
                    className="w-full bg-brand-accent hover:bg-brand-brown-dark text-brand-sand py-4 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer"
                  >
                    SUBMIT PARTNERSHIP APPLICATION
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 5. DOWNLOAD BROCHURE SECTION */}
      <section
        id="download-brochure-section"
        className="py-16 bg-brand-brown-dark text-brand-sand text-center max-w-5xl mx-auto rounded-lg px-4 sm:px-6 lg:px-8 shadow-xl border border-brand-dark/10 scroll-mt-24"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="w-12 h-12 rounded-full bg-brand-sand/10 flex items-center justify-center text-brand-accent mx-auto">
            <FileText className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-brand-cream">
            Download Partnership Brochure
          </h2>
          <p className="text-xs sm:text-sm text-brand-cream/70 font-light leading-relaxed">
            Gain immediate access to full model breakdowns, detailed ROI financial matrices, corporate royalty rates, interior design specs, and support schedules.
          </p>

          <form onSubmit={handleBrochureSubmit} className="max-w-md mx-auto pt-2 flex flex-col sm:flex-row gap-3">
            <input
              id="brochure-email-input"
              type="email"
              required
              placeholder="Enter your email address"
              value={brochureEmail}
              onChange={(e) => setBrochureEmail(e.target.value)}
              className="flex-grow bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-xs text-brand-cream placeholder-brand-cream/40 focus:outline-none focus:border-brand-accent"
            />
            <button
              id="brochure-download-btn"
              type="submit"
              className="bg-brand-accent hover:bg-brand-sand text-brand-sand hover:text-brand-dark px-6 py-3 rounded-sm text-xs font-bold tracking-widest uppercase transition-all cursor-pointer whitespace-nowrap"
            >
              SEND BROCHURE
            </button>
          </form>

          {brochureSent && (
            <p className="text-xs text-brand-accent font-semibold flex items-center justify-center gap-1.5 animate-fade-in">
              <Sparkles className="w-4 h-4 text-brand-accent" />
              Brochure sent successfully to your inbox! Check promotions/spam if missing.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
