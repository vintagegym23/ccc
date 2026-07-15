import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Compass, Clock, Sparkles, AlertCircle } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.fullName.trim() && formData.email.trim() && formData.message.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          subject: 'general',
          message: ''
        });
      }, 5000);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  return (
    <div id="contact-page" className="pt-20 bg-brand-sand min-h-screen pb-24">
      {/* 1. HERO HEADER */}
      <section
        id="contact-hero"
        className="relative py-24 bg-cover bg-center text-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(42, 26, 15, 0.5), rgba(42, 26, 15, 0.75)), url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1600')`,
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-brand-cream z-10 space-y-4">
          <span className="font-mono text-xs tracking-[0.25em] text-brand-accent uppercase block font-semibold">
            ESTATE CORRESPONDENCE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Let's Connect
          </h1>
          <p className="text-sm sm:text-base text-brand-cream/85 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the ultimate coffee sanctuary. Drop by our corporate headquarters, request bespoke wedding beans, or ask about our franchise opportunities.
          </p>
        </div>
      </section>

      {/* 2. CONTACT DETAILS & FORM GRID */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Office info & Visit Us card */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-10 text-left"
          >
            <div className="space-y-3">
              <span className="font-mono text-xs tracking-widest text-brand-accent uppercase font-bold">DIRECTORY</span>
              <h2 className="font-serif text-3xl font-bold text-brand-dark">Our Offices</h2>
              <div className="w-12 h-[2px] bg-brand-accent"></div>
            </div>

            <div className="space-y-6">
              {/* Corporate HQ */}
              <div className="space-y-2">
                <span className="font-mono text-[9px] tracking-widest text-[#9E653F] font-bold uppercase block">CORPORATE HEADQUARTERS</span>
                <h3 className="font-serif text-lg font-bold text-brand-dark">Oat &amp; Bean Coffee Ltd.</h3>
                <p className="text-sm text-brand-dark/75 leading-relaxed font-light">
                  Heritage Mansion, 4th Floor, Lavelle Road, Bangalore, KA – 560001
                </p>
                <p className="text-xs text-brand-dark/55 flex items-center gap-1.5 font-semibold pt-1">
                  <Phone className="w-3.5 h-3.5 text-brand-accent" />
                  +91 (80) 4209 1102
                </p>
              </div>

              {/* Emails block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-brand-dark/5">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] tracking-widest text-brand-dark/40 block font-bold">GENERAL INQUIRIES</span>
                  <a
                    id="email-general"
                    href="mailto:hello@oatandbean.com"
                    className="font-serif text-sm font-bold text-brand-accent hover:text-brand-dark transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    hello@oatandbean.com
                  </a>
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-[9px] tracking-widest text-brand-dark/40 block font-bold">FRANCHISE SUPPORT</span>
                  <a
                    id="email-franchise"
                    href="mailto:expansion@oatandbean.com"
                    className="font-serif text-sm font-bold text-brand-accent hover:text-brand-dark transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    expansion@oatandbean.com
                  </a>
                </div>
              </div>
            </div>

            {/* Visit Us Appointment Card */}
            <div className="p-6 bg-brand-cream/35 rounded-lg border border-brand-cream/60 space-y-4">
              <span className="font-mono text-[9px] tracking-widest text-[#9E653F] font-bold uppercase block">CHIKMAGALUR SANCTUARY</span>
              <h4 className="font-serif text-base font-bold text-brand-dark">Heritage Estate (By Appointment Only)</h4>
              <p className="text-xs text-brand-dark/70 font-light leading-relaxed">
                Mullayanagiri Valley Road, Chikmagalur Sourcing Hub. Experience our plantation soil, cardamom canopies, and private micro-roastery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-brand-dark/5 text-xs text-brand-dark/70 font-light">
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-accent" />
                  Mon – Fri: 10:00 AM – 04:00 PM
                </p>
                <p className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-brand-accent" />
                  Estate Slow-Roast Bar
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Custom Floating Contact Form */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="lg:col-span-7 bg-brand-cream/35 p-8 sm:p-10 rounded-lg border border-brand-cream shadow-xl text-left space-y-6"
          >
            <div className="space-y-2">
              <span className="font-mono text-[9px] tracking-widest text-brand-accent uppercase font-bold">CORRESPONDENCE PORTAL</span>
              <h3 className="font-serif text-2xl font-bold text-brand-dark">Send a Message</h3>
              <p className="text-xs text-brand-dark/65 font-light">Enter your inquiries. Our communications officer will respond within 24 hours.</p>
            </div>

            {submitted ? (
              <div className="bg-brand-dark text-brand-sand p-8 rounded-lg text-center space-y-4 border border-brand-accent">
                <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center mx-auto text-brand-sand">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold">Message Delivered Successfully</h4>
                <p className="text-xs text-brand-sand/75 leading-relaxed max-w-sm mx-auto font-light">
                  Thank you for corresponding with Oat &amp; Bean. Your dispatch has been successfully routed to our customer experience team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-widest text-brand-dark/60 uppercase font-semibold block">FULL NAME</label>
                    <input
                      id="contact-fullName"
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleFormChange}
                      placeholder="Jane Doe"
                      className="w-full bg-brand-sand border border-brand-dark/15 rounded-sm p-3.5 text-xs text-brand-dark focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-widest text-brand-dark/60 uppercase font-semibold block">EMAIL ADDRESS</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="jane@example.com"
                      className="w-full bg-brand-sand border border-brand-dark/15 rounded-sm p-3.5 text-xs text-brand-dark focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-widest text-brand-dark/60 uppercase font-semibold block">SUBJECT MATTER</label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    className="w-full bg-brand-sand border border-brand-dark/15 rounded-sm p-3.5 text-xs text-brand-dark focus:outline-none focus:border-brand-accent appearance-none cursor-pointer"
                  >
                    <option value="general">General Inquiries &amp; Correspondence</option>
                    <option value="custom-wedding">Custom Wedding / Bulk Event Roasts</option>
                    <option value="wholesale">Wholesale Bean Supply Partner</option>
                    <option value="careers">Careers &amp; Roastery Apprenticeships</option>
                    <option value="other">Other Sourcing Enquiries</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-widest text-brand-dark/60 uppercase font-semibold block">MESSAGE / PROPOSAL</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Provide detailed context regarding your wedding plans, store needs, or wholesale volumes."
                    className="w-full bg-brand-sand border border-brand-dark/15 rounded-sm p-3.5 text-xs text-brand-dark focus:outline-none focus:border-brand-accent resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="w-full bg-brand-accent hover:bg-brand-brown-dark text-brand-sand py-4 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    SEND MESSAGE
                  </button>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </section>

      {/* 3. MAP COORDINATES WIDGET */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
        <div className="bg-brand-cream/35 rounded-lg border border-brand-cream/80 overflow-hidden shadow-md p-6 sm:p-10 text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="font-mono text-[9px] tracking-widest text-brand-accent uppercase font-bold">SPATIAL INDEX</span>
            <h3 className="font-serif text-2xl font-bold text-brand-dark">Our Headquarters Siting</h3>
            <p className="text-xs text-brand-dark/60 font-light">Directing coordinate vectors between Lavelle Road corporate HQ and our Chikmagalur canopy farms.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-left">
            {/* HQ Box */}
            <div className="p-6 bg-brand-sand rounded-lg border border-brand-cream flex items-start gap-4">
              <MapPin className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <h4 className="font-serif font-bold text-brand-dark text-sm">Corporate Siting (Bangalore)</h4>
                <p className="text-xs text-brand-dark/65 font-light">Lavelle Road, Richmond Town, Bangalore. Coordinates: 12.9716° N, 77.5946° E.</p>
              </div>
            </div>

            {/* Estate Box */}
            <div className="p-6 bg-brand-sand rounded-lg border border-brand-cream flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#8E9F88] flex-shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <h4 className="font-serif font-bold text-brand-dark text-sm">Primary Plantation (Chikmagalur)</h4>
                <p className="text-xs text-brand-dark/65 font-light">Baba Budangiri Highlands Sourcing Hub. Coordinates: 13.3161° N, 75.7720° E.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
