import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Coffee } from 'lucide-react';
import { ActivePage } from '../types';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about-us', label: 'HERITAGE' },
    { id: 'coffee-journey', label: 'COFFEE JOURNEY' },
    { id: 'products', label: 'PRODUCTS' },
    { id: 'locations', label: 'LOCATIONS' },
    { id: 'franchise', label: 'FRANCHISE' },
    { id: 'contact', label: 'CONTACT US' },
  ] as const;

  const handleNavClick = (pageId: ActivePage) => {
    setActivePage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-brand-sand/90 backdrop-blur-md py-4 shadow-sm border-brand-cream/60'
          : 'bg-brand-sand/50 backdrop-blur-sm py-5 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Brand Logo */}
          <button
            id="brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex flex-col items-start focus:outline-none group cursor-pointer text-left"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-brand-dark flex items-center gap-2">
              OAT <span className="text-brand-accent">&</span> BEAN
            </span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-brand-accent/80 font-medium uppercase mt-0.5">
              Chikmagalur Coffee Co.
            </span>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-xs font-semibold tracking-widest transition-colors duration-200 focus:outline-none cursor-pointer ${
                    isActive
                      ? 'text-brand-dark'
                      : 'text-brand-dark/60 hover:text-brand-accent'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Enquire Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button
              id="enquire-button-desktop"
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-block bg-brand-accent text-brand-sand hover:bg-brand-brown-dark px-6 py-2.5 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-[1px] active:translate-y-0 cursor-pointer"
            >
              ENQUIRE
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-brand-dark hover:text-brand-accent transition-colors duration-200 focus:outline-none rounded-md hover:bg-brand-cream/50 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-brand-sand border-b border-brand-cream/80 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2 max-w-lg mx-auto">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    id={`mobile-nav-item-${item.id}`}
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-4 py-3 text-sm font-bold tracking-wider rounded-md transition-colors ${
                      isActive
                        ? 'bg-brand-cream text-brand-dark border-l-4 border-brand-accent pl-3'
                        : 'text-brand-dark/70 hover:bg-brand-cream/30 hover:text-brand-dark'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-4 px-4">
                <button
                  id="enquire-button-mobile"
                  onClick={() => handleNavClick('contact')}
                  className="w-full bg-brand-accent text-brand-sand hover:bg-brand-brown-dark py-3 rounded-md text-xs font-bold tracking-widest uppercase transition-all text-center"
                >
                  ENQUIRE NOW
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
