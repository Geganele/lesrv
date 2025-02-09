import { MapPin } from "lucide-react";

export type Property = {
  id: string;
  name: string;
  logo: string;
  images: string[];
  rating: number;
  reviews: number;
  pricing: string;
  description: string;
  tags: string[];
  category: string;
  featured: boolean;
  dealUrl?: string;
  visitUrl: string;
  bookmarks: number;
  agent: {
    name: string;
    title: string;
  };
};

export const cities = [
  { name: "Maseru", icon: MapPin },
  { name: "Teyateyaneng", icon: MapPin },
  { name: "Mafeteng", icon: MapPin },
  { name: "Mohale's Hoek", icon: MapPin },
  { name: "Quthing", icon: MapPin },
  { name: "Qacha's Nek", icon: MapPin },
  { name: "Thaba-Tseka", icon: MapPin },
  { name: "Mokhotlong", icon: MapPin },
  { name: "Butha-Buthe", icon: MapPin },
  { name: "Leribe", icon: MapPin },
];

export const properties: Property[] = [
  {
    id: "1",
    name: "Healing Touch Spa",
    logo: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2",
    images: [
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1"
    ],
    rating: 4.8,
    reviews: 15,
    pricing: "R 350/hr",
    description: "Expert Swedish and deep tissue massage therapy with aromatherapy options",
    tags: ["swedish", "deep-tissue", "aromatherapy"],
    category: "Maseru",
    featured: true,
    visitUrl: "tel:+26657123456",
    bookmarks: 128,
    agent: {
      name: "Sarah Johnson",
      title: "Licensed Massage Therapist"
    }
  },
  {
    id: "2",
    name: "Serenity Wellness Center",
    logo: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef"
    ],
    rating: 4.9,
    reviews: 23,
    pricing: "R 400/hr",
    description: "Therapeutic massage combining traditional and modern techniques",
    tags: ["therapeutic", "sports", "relaxation"],
    category: "Maseru",
    featured: true,
    visitUrl: "tel:+26657123457",
    bookmarks: 95,
    agent: {
      name: "Maria Thompson",
      title: "Certified Massage Practitioner"
    }
  },
  {
    id: "3",
    name: "Mountain View Massage",
    logo: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1",
    images: [
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1"
    ],
    rating: 4.7,
    reviews: 18,
    pricing: "R 375/hr",
    description: "Specializing in sports massage and injury recovery therapy",
    tags: ["sports", "therapeutic", "recovery"],
    category: "Mafeteng",
    featured: false,
    visitUrl: "tel:+26657123458",
    bookmarks: 82,
    agent: {
      name: "David Chen",
      title: "Sports Massage Specialist"
    }
  },
  {
    id: "4",
    name: "Peaceful Paradise Spa",
    logo: "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef"
    ],
    rating: 4.6,
    reviews: 12,
    pricing: "R 450/hr",
    description: "Luxury spa experience with hot stone and aromatherapy treatments",
    tags: ["hot-stone", "luxury", "aromatherapy"],
    category: "Quthing",
    featured: true,
    visitUrl: "tel:+26657123459",
    bookmarks: 110,
    agent: {
      name: "Emily Parker",
      title: "Spa Therapy Expert"
    }
  },
  {
    id: "5",
    name: "Zen Massage Studio",
    logo: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c",
    images: [
      "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c"
    ],
    rating: 4.8,
    reviews: 20,
    pricing: "R 380/hr",
    description: "Traditional Thai massage and reflexology treatments",
    tags: ["thai", "reflexology", "traditional"],
    category: "Qacha's Nek",
    featured: true,
    visitUrl: "tel:+26657123460",
    bookmarks: 95,
    agent: {
      name: "Lisa Wong",
      title: "Thai Massage Specialist"
    }
  }
];
