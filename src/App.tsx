import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import CoffeeJourney from './pages/CoffeeJourney';
import Products from './pages/Products';
import Locations from './pages/Locations';
import Franchise from './pages/Franchise';
import ContactUs from './pages/ContactUs';
import { ActivePage } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'about-us':
        return <AboutUs />;
      case 'coffee-journey':
        return <CoffeeJourney setActivePage={setActivePage} />;
      case 'products':
        return <Products />;
      case 'locations':
        return <Locations />;
      case 'franchise':
        return <Franchise />;
      case 'contact':
        return <ContactUs />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-sand text-brand-dark flex flex-col justify-between font-sans selection:bg-brand-accent/20 selection:text-brand-dark overflow-x-hidden antialiased">
      {/* Premium Navigation Header */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Page Area with Route Animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shared Aesthetic Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

