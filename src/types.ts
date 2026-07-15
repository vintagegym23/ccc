export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'traditional' | 'limited' | 'coldbrew' | 'accessories';
  tag?: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  initials: string;
}

export interface Outlet {
  id: string;
  name: string;
  location: string;
  hours: string;
  image: string;
  coordinates: { lat: number; lng: number };
}

export interface FranchiseModel {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

export interface MenuHighlight {
  id: string;
  title: string;
  description: string;
  image: string;
}

export type ActivePage = 'home' | 'coffee-journey' | 'products' | 'locations' | 'franchise' | 'about-us' | 'contact';
