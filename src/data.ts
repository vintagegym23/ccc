import { Product, Review, Outlet, FranchiseModel, MenuHighlight } from './types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Peaberry Heritage',
    description: 'Rare single-origin peaberry beans known for their intense flavor, smooth body, and vibrant, fruity aroma.',
    price: 850,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
    category: 'traditional',
    tag: 'HERITAGE'
  },
  {
    id: 'p2',
    name: 'Malabar Monsoon',
    description: 'A unique process where beans are exposed to moisture-laden monsoon winds, yielding a rich, spicy flavor with low acidity.',
    price: 720,
    image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&q=80&w=600',
    category: 'traditional',
    tag: 'MONSOON MALABAR'
  },
  {
    id: 'p3',
    name: 'Signature Filter',
    description: 'The classic South Indian filter coffee experience, perfectly balanced with a rich dark chocolate note and subtle hazelnut undertones.',
    price: 550,
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600',
    category: 'traditional'
  },
  {
    id: 'p4',
    name: 'Elephant Hills Reserve',
    description: 'Grown at 4,500 ft, this micro-lot espresso roast has exceptional complex tasting notes of wild berries and deep cocoa.',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=600',
    category: 'limited',
    tag: 'EXCLUSIVE'
  },
  {
    id: 'p5',
    name: 'Baba Budangiri Estate',
    description: 'From the birthplace of Indian coffee, a shade-grown, hand-picked masterwork with clean citrus acidity and caramel finish.',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1580933187691-11d2f2d93e18?auto=format&fit=crop&q=80&w=600',
    category: 'limited',
    tag: 'LIMITED RUN'
  },
  {
    id: 'p6',
    name: 'Signature Cold Brew Kit',
    description: 'Everything you need to steep delicious, low-acid cold brew at home. Includes our specialized mesh bottle and pre-ground beans.',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
    category: 'coldbrew'
  },
  {
    id: 'p7',
    name: 'Handcrafted Ceramic Dripper',
    description: 'Custom stoneware V60 dripper made by local artisans. Offers excellent heat retention for the perfect, clean pour-over.',
    price: 1150,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
    category: 'accessories'
  },
  {
    id: 'p8',
    name: 'Traditional Brass Filter Set',
    description: 'Solid heavy-gauge brass South Indian filter coffee maker. Recreate the timeless brass drip ritual with pure vintage style.',
    price: 890,
    image: 'https://images.unsplash.com/photo-1572119139630-613b6300d8bc?auto=format&fit=crop&q=80&w=600',
    category: 'accessories'
  }
];

export const coldBrews = [
  {
    id: 'cb1',
    name: 'Mocha Cold Brew',
    description: 'Steeped for 18 hours with organic cacao nibs and a dash of chicory.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cb2',
    name: 'Signature Black',
    description: 'Pure, crisp, and naturally sweet cold brew made from single-origin highland beans.',
    price: 240,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=400'
  }
];

export const artisanalSnacks = [
  {
    id: 'sn1',
    name: 'Salted Caramel Biscotti',
    description: 'Traditional double-baked biscuit with rich sea-salt caramel chunks. Perfect for dipping.',
    price: 180,
    highlight: 'BAKED DAILY'
  },
  {
    id: 'sn2',
    name: 'Cacao Almond Bark',
    description: '70% dark single-origin chocolate with roasted estate almonds and sea salt.',
    price: 220,
    highlight: '70% DARK'
  },
  {
    id: 'sn3',
    name: 'Honey Glazed Macadamias',
    description: 'Premium macadamia nuts lightly glazed with forest honey, harvested from our estate canopy.',
    price: 350,
    highlight: 'ESTATE SOURCED'
  }
];

export const outlets: Outlet[] = [
  {
    id: 'o1',
    name: 'The Estate House, Bangalore',
    location: 'Indiranagar • Open until 11 PM',
    hours: 'Mon – Sun: 07:00 AM – 11:00 PM',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=1000',
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: 'o2',
    name: 'Fort Sanctuary, Mumbai',
    location: 'Kala Ghoda • Open until 10 PM',
    hours: 'Mon – Sun: 08:00 AM – 10:00 PM',
    image: 'https://images.unsplash.com/photo-1508766917616-d22f3f1eea14?auto=format&fit=crop&q=80&w=1000',
    coordinates: { lat: 18.9220, lng: 72.8347 }
  },
  {
    id: 'o3',
    name: 'The Origin Lab, Chikmagalur',
    location: 'Mullayanagiri • Open until 6 PM',
    hours: 'Mon – Sun: 07:00 AM – 06:00 PM',
    image: 'https://images.unsplash.com/photo-1525648122249-c7d1ad04cc6f?auto=format&fit=crop&q=80&w=1000',
    coordinates: { lat: 13.3161, lng: 75.7720 }
  }
];

export const franchiseModels: FranchiseModel[] = [
  {
    id: 'fm1',
    title: 'Signature Cafe',
    description: 'Full-scale immersive experience with curated food pairings, custom brew bars, and guest brewing workshops. Designed for high-street flagship areas.',
    features: ['1200 - 2000 sq ft footprint', 'Premium full espresso & manual brew bar', 'Full hot kitchen integration', 'In-house roasting showcase'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fm2',
    title: 'Express Hub',
    description: 'Sleek, high-efficiency kiosks perfect for premium corporate offices, luxury business parks, and active travel terminals. Tailored for rapid transit and on-the-go quality.',
    features: ['250 - 500 sq ft footprint', 'Automated and manual standard brews', 'Curated grab-and-go food pairing', 'High footfall optimization'],
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fm3',
    title: 'Heritage Corner',
    description: 'Boutique shop-in-shop concept focused on premium retail beans, specialty coffee accessories, and artisanal quick-service espresso pulling.',
    features: ['100 - 200 sq ft footprint', 'Premium retail bean showcase', 'Manual brewing gear & espresso pulling', 'Add-on to existing high-end retail/lifestyle spaces'],
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800'
  }
];

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Sophia Miller',
    role: 'Coffee Connoisseur',
    content: 'The most authentic coffee experience I\'ve had outside of a private estate. You can truly taste the deep, rich soil of Chikmagalur and the care in every single sip. The slow roasting brings out notes I\'ve never found elsewhere.',
    rating: 5,
    initials: 'SM'
  },
  {
    id: 'r2',
    name: 'Rahul James',
    role: 'Daily Guest',
    content: 'Their Signature Blend is a masterpiece. Balanced, rich, and incredibly smooth. It has become my absolute morning ritual. The cafe design itself is a gorgeous, quiet sanctuary away from the chaos of the city.',
    rating: 5,
    initials: 'RJ'
  },
  {
    id: 'r3',
    name: 'Elena Kostic',
    role: 'Sustainability Advocate',
    content: 'The absolute commitment to direct, ethical trade and shade-grown farming is what brought me to Oat & Bean, but the incredible quality and deep flavor profile of the roast is what keeps me coming back every single week.',
    rating: 5,
    initials: 'EK'
  }
];

export const menuHighlights: MenuHighlight[] = [
  {
    id: 'mh1',
    title: 'Specialty Coffee',
    description: 'Single-origin beans curated for discerning palates. Sourced directly and roasted light-medium to preserve original terroir characteristics.',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'mh2',
    title: 'Signature Blends',
    description: 'Balanced profiles roasted in-house daily. Seamless blends of Arabica and fine Robusta that carry notes of chocolate, caramel, and warm spices.',
    image: 'https://images.unsplash.com/photo-1580933187691-11d2f2d93e18?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'mh3',
    title: 'Daily Roasting',
    description: 'Freshness you can smell the moment you walk in. We micro-roast in small batches every single morning to ensure unmatched clarity in every cup.',
    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'mh4',
    title: 'Café Experience',
    description: 'A sanctuary for coffee lovers to pause, reflect, and savor. Slow bar experience, beautiful raw stoneware, and acoustic ambiance.',
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'mh5',
    title: 'Farm Direct',
    description: 'Authentic beans sourced directly from our own hills. No middlemen, ensuring absolute transparency, maximum freshness, and higher farmer wages.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600'
  }
];
