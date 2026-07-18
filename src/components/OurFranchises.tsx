import { useRef, type CSSProperties } from 'react';
import { Landmark, MapPin, Building2, Coffee, Users, ArrowRight } from 'lucide-react';
import { ActivePage } from '../types';
import useFranchiseMapSequence from '../hooks/useFranchiseMapSequence';

interface OurFranchisesProps {
  onNavigate: (page: ActivePage) => void;
}

interface FranchiseState {
  id: string;
  name: string;
  cityCount: number;
  cities: string[];
}

const STATES: FranchiseState[] = [
  {
    id: 'telangana',
    name: 'Telangana',
    cityCount: 8,
    cities: ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad', 'Siddipet', 'Khammam', 'Mahbubnagar', 'Adilabad'],
  },
  {
    id: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    cityCount: 6,
    cities: ['Vijayawada', 'Visakhapatnam', 'Guntur', 'Kurnool', 'Tirupati', 'Rajahmundry'],
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    cityCount: 4,
    cities: ['Bengaluru', 'Mysuru', 'Mangalore', 'Hubli'],
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    cityCount: 4,
    cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
  },
];

const STATS = [
  { icon: MapPin, value: '4', label: 'States' },
  { icon: Building2, value: '20+', label: 'Cities' },
  { icon: Coffee, value: '50+', label: 'Franchises' },
  { icon: Users, value: '10L+', label: 'Happy Customers' },
] as const;

// Card visual state per the design brief: active = scale 1.05/opacity 1/no
// blur/shadow; inactive (while some other card is active) = blurred, faded,
// slightly shrunk; and during intro/outro (activeIndex -1) every card is
// simply at rest, matching neither state.
const getCardStyle = (index: number, activeIndex: number): CSSProperties => {
  if (activeIndex === -1 || index === activeIndex) {
    return {
      opacity: 1,
      filter: 'blur(0px)',
      transform: index === activeIndex ? 'scale(1.05)' : 'scale(1)',
    };
  }
  return { opacity: 0.5, filter: 'blur(4px)', transform: 'scale(0.96)' };
};

const OurFranchises = ({ onNavigate }: OurFranchisesProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { isLoaded, activeIndex } = useFranchiseMapSequence({
    wrapperRef,
    stageRef,
    mapContainerRef,
    canvasRef,
  });

  return (
    <div id="our-franchises-wrapper" ref={wrapperRef} className="relative w-full" style={{ height: '350vh' }}>
      <div
        ref={stageRef}
        className="relative w-full h-screen overflow-hidden bg-brand-sand flex items-center py-6 sm:py-8 lg:py-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
            {/* Left: presence heading + state cards + stats */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-2 lg:mb-3">
                <span className="w-6 h-px bg-brand-accent" aria-hidden="true" />
                <span className="font-mono text-[10px] sm:text-xs tracking-widest text-brand-accent uppercase font-semibold">
                  Our Presence
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-5xl font-bold text-brand-dark mb-2 lg:mb-3 tracking-tight">
                Our Franchises
              </h2>
              <p className="hidden sm:block text-xs sm:text-sm text-brand-dark/70 leading-relaxed mb-3 lg:mb-6">
                Brewing happiness across India.
                <br />
                Explore our franchises in 4 states and 20+ cities.
              </p>

              <div className="border-t border-brand-dark/10 divide-y divide-brand-dark/10">
                {STATES.map((state, i) => (
                  <div
                    key={state.id}
                    className="flex items-start gap-3 sm:gap-4 py-2.5 sm:py-3 lg:py-4 transition-all duration-300 ease-out"
                    style={getCardStyle(i, activeIndex)}
                  >
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 lg:w-14 lg:h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-brand-cream text-brand-accent transition-shadow duration-300 ${
                        i === activeIndex ? 'shadow-md ring-2 ring-brand-accent/30' : ''
                      }`}
                    >
                      <Landmark className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif text-sm sm:text-base lg:text-lg font-bold text-brand-dark">
                          {state.name}
                        </h3>
                        <span className="text-[9px] sm:text-[10px] font-semibold tracking-wide bg-brand-cream text-brand-accent px-2 py-0.5 rounded-full whitespace-nowrap">
                          {state.cityCount} Cities
                        </span>
                      </div>
                      <p className="hidden sm:block text-[10px] sm:text-xs text-brand-dark/60 mt-1 leading-relaxed">
                        {state.cities.join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                id="our-franchises-explore-btn"
                onClick={() => onNavigate('locations')}
                className="mt-4 lg:mt-6 inline-flex items-center gap-2 border border-brand-dark/20 hover:border-brand-dark text-brand-dark px-5 sm:px-6 py-2.5 sm:py-3 rounded-sm text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-brand-cream/40 cursor-pointer"
              >
                Explore All Outlets
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mt-5 lg:mt-8 border border-brand-dark/10 rounded-lg p-3 lg:p-4 bg-white/40">
                {STATS.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="flex items-center gap-2">
                      <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-brand-accent flex-shrink-0" />
                      <div>
                        <p className="font-serif text-base lg:text-lg font-bold text-brand-dark leading-none">
                          {stat.value}
                        </p>
                        <p className="text-[9px] lg:text-[10px] text-brand-dark/60 uppercase tracking-wide">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: scroll-scrubbed india_frames map sequence */}
            <div
              ref={mapContainerRef}
              className="order-1 lg:order-2 relative w-full h-[32vh] sm:h-[40vh] lg:h-[70vh]"
            >
              <canvas
                ref={canvasRef}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFranchises;
