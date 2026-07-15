import { Globe, Instagram, Mail, MapPin, Phone, ChevronRight } from 'lucide-react';
import { ActivePage } from '../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (pageId: ActivePage) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#1C0D02] text-brand-cream/80 border-t border-brand-dark/25 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-12 border-b border-brand-cream/10">
          {/* Brand/About Column */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-serif text-xl font-bold tracking-widest text-brand-cream">
              CHIKMAGALUR <span className="text-brand-accent">COFFEE</span> CAFE
            </h3>
            <p className="font-mono text-[9px] tracking-[0.25em] text-brand-accent uppercase -mt-2">
              Founded by Divya Gopinath
            </p>
            <p className="max-w-md text-sm leading-relaxed text-brand-cream/60 pt-2">
              Ethically sourced, artisanal coffee grown in the heart of Karnataka. We maintain a sacred farm-to-cup commitment to quality, biodiversity, and the centuries-old ritual of heritage brewing in the Western Ghats.
            </p>
            <div className="space-y-2 pt-2 text-xs text-brand-cream/60">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-accent flex-shrink-0 mt-0.5" />
                <span>B42, 4th/5th Floor, Road No. 3, Above Vision Express, MLA Colony, Jubilee Hills, Hyderabad, Telangana – 500033</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" />
                <span>+91 91003 65391 &middot; +91 62814 60353</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" />
                <span>support@chikmagalurcoffeecafe.com</span>
              </p>
            </div>
            <div className="flex space-x-4 pt-4">
              <a
                id="social-globe"
                href="#"
                className="w-9 h-9 rounded-full bg-brand-cream/5 flex items-center justify-center text-brand-cream/70 hover:text-brand-accent hover:bg-brand-cream/10 transition-all duration-300 border border-brand-cream/10"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                id="social-instagram"
                href="#"
                className="w-9 h-9 rounded-full bg-brand-cream/5 flex items-center justify-center text-brand-cream/70 hover:text-brand-accent hover:bg-brand-cream/10 transition-all duration-300 border border-brand-cream/10"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                id="social-mail"
                href="#"
                className="w-9 h-9 rounded-full bg-brand-cream/5 flex items-center justify-center text-brand-cream/70 hover:text-brand-accent hover:bg-brand-cream/10 transition-all duration-300 border border-brand-cream/10"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-brand-cream uppercase">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-link-home"
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-brand-accent transition-colors flex items-center group cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 mr-1.5" />
                  Home Sanctuary
                </button>
              </li>
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => handleLinkClick('about-us')}
                  className="hover:text-brand-accent transition-colors flex items-center group cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 mr-1.5" />
                  Our Heritage
                </button>
              </li>
              <li>
                <button
                  id="footer-link-journey"
                  onClick={() => handleLinkClick('coffee-journey')}
                  className="hover:text-brand-accent transition-colors flex items-center group cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 mr-1.5" />
                  Coffee Journey
                </button>
              </li>
              <li>
                <button
                  id="footer-link-products"
                  onClick={() => handleLinkClick('products')}
                  className="hover:text-brand-accent transition-colors flex items-center group cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 mr-1.5" />
                  Curated Collections
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Corporate Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-brand-cream uppercase">
              LEGAL & PARTNERS
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-link-franchise"
                  onClick={() => handleLinkClick('franchise')}
                  className="hover:text-brand-accent transition-colors flex items-center group cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 mr-1.5" />
                  Franchise Partnerships
                </button>
              </li>
              <li>
                <button
                  id="footer-link-locations"
                  onClick={() => handleLinkClick('locations')}
                  className="hover:text-brand-accent transition-colors flex items-center group cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 mr-1.5" />
                  Sanctuary Outlets
                </button>
              </li>
              <li>
                <button
                  id="footer-link-privacy"
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-brand-accent transition-colors flex items-center group cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 mr-1.5" />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  id="footer-link-terms"
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-brand-accent transition-colors flex items-center group cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 mr-1.5" />
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-xs text-brand-cream/40 space-y-4 md:space-y-0">
          <p id="copyright-text">
            &copy; {currentYear} Chikmagalur Coffee Cafe. All Rights Reserved. Ethical &amp; Shade-Grown.
          </p>
          <p id="origin-statement" className="font-serif italic text-brand-accent">
            Handcrafted with devotion in the Western Ghats of Karnataka
          </p>
        </div>
      </div>
    </footer>
  );
}
