import { Building, MapPin, Home, Store, Warehouse, Castle } from "lucide-react";

export type Property = {
  id: string;
  name: string;
  logo: string;
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
    name: "Luxury Villa in Maseru West",
    logo: "https://placehold.co/400x300",
    rating: 4.8,
    reviews: 15,
    pricing: "M 2,500,000",
    description: "Modern 4 bedroom villa with panoramic mountain views",
    tags: ["luxury", "residential", "pool"],
    category: "Maseru",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 128,
    agent: {
      name: "Thabo Mokoena",
      title: "Senior Property Consultant"
    }
  },
  {
    id: "2",
    name: "Commercial Space in CBD",
    logo: "https://placehold.co/400x300",
    rating: 4.5,
    reviews: 8,
    pricing: "M 1,800,000",
    description: "Prime retail space in Maseru's business district",
    tags: ["commercial", "retail", "central"],
    category: "Maseru",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 95,
    agent: {
      name: "Lineo Motseki",
      title: "Commercial Property Specialist"
    }
  },
  {
    id: "3",
    name: "Residential Apartment in Mafeteng",
    logo: "https://placehold.co/400x300",
    rating: 4.7,
    reviews: 10,
    pricing: "M 1,500,000",
    description: "3 bedroom apartment with city views",
    tags: ["residential", "apartment", "city"],
    category: "Mafeteng",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 56,
    agent: {
      name: "Nokuthula Mokganyazi",
      title: "Residential Property Manager"
    }
  },
  {
    id: "4",
    name: "Commercial Office in Quthing",
    logo: "https://placehold.co/400x300",
    rating: 4.6,
    reviews: 12,
    pricing: "M 2,000,000",
    description: "10,000 sqm office space in Quthing",
    tags: ["commercial", "office", "large"],
    category: "Quthing",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 128,
    agent: {
      name: "Mpho Mokganyazi",
      title: "Commercial Property Manager"
    }
  },
  {
    id: "5",
    name: "Warehouse in Qacha's Nek",
    logo: "https://placehold.co/400x300",
    rating: 4.4,
    reviews: 9,
    pricing: "M 1,200,000",
    description: "10,000 sqm warehouse with storage facilities",
    tags: ["warehouse", "storage", "large"],
    category: "Qacha's Nek",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 83,
    agent: {
      name: "Nokuthula Mokganyazi",
      title: "Warehouse Manager"
    }
  },
  {
    id: "6",
    name: "Residential Apartment in Thaba-Tseka",
    logo: "https://placehold.co/400x300",
    rating: 4.9,
    reviews: 14,
    pricing: "M 1,700,000",
    description: "4 bedroom apartment with mountain views",
    tags: ["residential", "apartment", "mountain"],
    category: "Thaba-Tseka",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 145,
    agent: {
      name: "Mpho Mokganyazi",
      title: "Residential Property Manager"
    }
  },
  {
    id: "7",
    name: "Commercial Office in Mokhotlong",
    logo: "https://placehold.co/400x300",
    rating: 4.8,
    reviews: 11,
    pricing: "M 1,600,000",
    description: "5,000 sqm office space in Mokhotlong",
    tags: ["commercial", "office", "medium"],
    category: "Mokhotlong",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 97,
    agent: {
      name: "Nokuthula Mokganyazi",
      title: "Commercial Property Manager"
    }
  },
  {
    id: "8",
    name: "Warehouse in Butha-Buthe",
    logo: "https://placehold.co/400x300",
    rating: 4.7,
    reviews: 13,
    pricing: "M 1,300,000",
    description: "8,000 sqm warehouse with storage facilities",
    tags: ["warehouse", "storage", "medium"],
    category: "Butha-Buthe",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 134,
    agent: {
      name: "Mpho Mokganyazi",
      title: "Warehouse Manager"
    }
  },
  {
    id: "9",
    name: "Residential Apartment in Leribe",
    logo: "https://placehold.co/400x300",
    rating: 4.6,
    reviews: 15,
    pricing: "M 1,400,000",
    description: "3 bedroom apartment with city views",
    tags: ["residential", "apartment", "city"],
    category: "Leribe",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 108,
    agent: {
      name: "Nokuthula Mokganyazi",
      title: "Residential Property Manager"
    }
  },
  {
    id: "10",
    name: "Commercial Office in Maseru East",
    logo: "https://placehold.co/400x300",
    rating: 4.5,
    reviews: 12,
    pricing: "M 1,900,000",
    description: "12,000 sqm office space in Maseru's east",
    tags: ["commercial", "office", "large"],
    category: "Maseru",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 142,
    agent: {
      name: "Mpho Mokganyazi",
      title: "Commercial Property Manager"
    }
  },
  {
    id: "11",
    name: "Warehouse in Quthing West",
    logo: "https://placehold.co/400x300",
    rating: 4.4,
    reviews: 10,
    pricing: "M 1,100,000",
    description: "6,000 sqm warehouse with storage facilities",
    tags: ["warehouse", "storage", "medium"],
    category: "Quthing",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 156,
    agent: {
      name: "Nokuthula Mokganyazi",
      title: "Warehouse Manager"
    }
  },
  {
    id: "12",
    name: "Residential Apartment in Mafeteng East",
    logo: "https://placehold.co/400x300",
    rating: 4.9,
    reviews: 16,
    pricing: "M 1,800,000",
    description: "4 bedroom apartment with city views",
    tags: ["residential", "apartment", "city"],
    category: "Mafeteng",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 167,
    agent: {
      name: "Mpho Mokganyazi",
      title: "Residential Property Manager"
    }
  },
  {
    id: "13",
    name: "Commercial Office in Qacha's Nek East",
    logo: "https://placehold.co/400x300",
    rating: 4.8,
    reviews: 13,
    pricing: "M 2,100,000",
    description: "15,000 sqm office space in Qacha's Nek's east",
    tags: ["commercial", "office", "large"],
    category: "Qacha's Nek",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 189,
    agent: {
      name: "Nokuthula Mokganyazi",
      title: "Commercial Property Manager"
    }
  },
  {
    id: "14",
    name: "Warehouse in Thaba-Tseka West",
    logo: "https://placehold.co/400x300",
    rating: 4.7,
    reviews: 11,
    pricing: "M 1,000,000",
    description: "7,000 sqm warehouse with storage facilities",
    tags: ["warehouse", "storage", "medium"],
    category: "Thaba-Tseka",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 198,
    agent: {
      name: "Mpho Mokganyazi",
      title: "Warehouse Manager"
    }
  },
  {
    id: "15",
    name: "Residential Apartment in Mokhotlong East",
    logo: "https://placehold.co/400x300",
    rating: 4.6,
    reviews: 14,
    pricing: "M 1,500,000",
    description: "3 bedroom apartment with city views",
    tags: ["residential", "apartment", "city"],
    category: "Mokhotlong",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 201,
    agent: {
      name: "Nokuthula Mokganyazi",
      title: "Residential Property Manager"
    }
  },
  {
    id: "16",
    name: "Commercial Office in Butha-Buthe East",
    logo: "https://placehold.co/400x300",
    rating: 4.5,
    reviews: 12,
    pricing: "M 1,700,000",
    description: "10,000 sqm office space in Butha-Buthe's east",
    tags: ["commercial", "office", "large"],
    category: "Butha-Buthe",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 212,
    agent: {
      name: "Mpho Mokganyazi",
      title: "Commercial Property Manager"
    }
  },
  {
    id: "17",
    name: "Warehouse in Leribe West",
    logo: "https://placehold.co/400x300",
    rating: 4.4,
    reviews: 10,
    pricing: "M 1,200,000",
    description: "8,000 sqm warehouse with storage facilities",
    tags: ["warehouse", "storage", "medium"],
    category: "Leribe",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 223,
    agent: {
      name: "Nokuthula Mokganyazi",
      title: "Warehouse Manager"
    }
  },
  {
    id: "18",
    name: "Residential Apartment in Maseru North",
    logo: "https://placehold.co/400x300",
    rating: 4.9,
    reviews: 16,
    pricing: "M 2,000,000",
    description: "4 bedroom apartment with city views",
    tags: ["residential", "apartment", "city"],
    category: "Maseru",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 234,
    agent: {
      name: "Mpho Mokganyazi",
      title: "Residential Property Manager"
    }
  },
  {
    id: "19",
    name: "Commercial Office in Quthing North",
    logo: "https://placehold.co/400x300",
    rating: 4.8,
    reviews: 13,
    pricing: "M 1,800,000",
    description: "12,000 sqm office space in Quthing's north",
    tags: ["commercial", "office", "large"],
    category: "Quthing",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 256,
    agent: {
      name: "Nokuthula Mokganyazi",
      title: "Commercial Property Manager"
    }
  },
  {
    id: "20",
    name: "Warehouse in Qacha's Nek North",
    logo: "https://placehold.co/400x300",
    rating: 4.7,
    reviews: 11,
    pricing: "M 1,500,000",
    description: "10,000 sqm warehouse with storage facilities",
    tags: ["warehouse", "storage", "medium"],
    category: "Qacha's Nek",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 267,
    agent: {
      name: "Mpho Mokganyazi",
      title: "Warehouse Manager"
    }
  },
  {
    id: "21",
    name: "Residential Apartment in Thaba-Tseka North",
    logo: "https://placehold.co/400x300",
    rating: 4.6,
    reviews: 14,
    pricing: "M 1,600,000",
    description: "3 bedroom apartment with city views",
    tags: ["residential", "apartment", "city"],
    category: "Thaba-Tseka",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 278,
    agent: {
      name: "Nokuthula Mokganyazi",
      title: "Residential Property Manager"
    }
  },
  {
    id: "22",
    name: "Commercial Office in Mokhotlong North",
    logo: "https://placehold.co/400x300",
    rating: 4.5,
    reviews: 12,
    pricing: "M 1,700,000",
    description: "5,000 sqm office space in Mokhotlong's north",
    tags: ["commercial", "office", "medium"],
    category: "Mokhotlong",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 289,
    agent: {
      name: "Mpho Mokganyazi",
      title: "Commercial Property Manager"
    }
  },
  {
    id: "23",
    name: "Warehouse in Butha-Buthe North",
    logo: "https://placehold.co/400x300",
    rating: 4.4,
    reviews: 10,
    pricing: "M 1,400,000",
    description: "8,000 sqm warehouse with storage facilities",
    tags: ["warehouse", "storage", "medium"],
    category: "Butha-Buthe",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 298,
    agent: {
      name: "Nokuthula Mokganyazi",
      title: "Warehouse Manager"
    }
  },
  {
    id: "24",
    name: "Residential Apartment in Leribe North",
    logo: "https://placehold.co/400x300",
    rating: 4.3,
    reviews: 12,
    pricing: "M 1,300,000",
    description: "3 bedroom apartment with city views",
    tags: ["residential", "apartment", "city"],
    category: "Leribe",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 307,
    agent: {
      name: "Mpho Mokganyazi",
      title: "Residential Property Manager"
    }
  },
  {
    id: "25",
    name: "Commercial Office in Maseru South",
    logo: "https://placehold.co/400x300",
    rating: 4.8,
    reviews: 16,
    pricing: "M 2,100,000",
    description: "12,000 sqm office space in Maseru's south",
    tags: ["commercial", "office", "large"],
    category: "Maseru",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 316,
    agent: {
      name: "Nokuthula Mokganyazi",
      title: "Commercial Property Manager"
    }
  },
  {
    id: "26",
    name: "Warehouse in Quthing South",
    logo: "https://placehold.co/400x300",
    rating: 4.7,
    reviews: 13,
    pricing: "M 1,900,000",
    description: "10,000 sqm warehouse with storage facilities",
    tags: ["warehouse", "storage", "medium"],
    category: "Quthing",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 325,
    agent: {
      name: "Mpho Mokganyazi",
      title: "Warehouse Manager"
    }
  },
  {
    id: "27",
    name: "Residential Apartment in Mafeteng South",
    logo: "https://placehold.co/400x300",
    rating: 4.6,
    reviews: 11,
    pricing: "M 1,800,000",
    description: "4 bedroom apartment with city views",
    tags: ["residential", "apartment", "city"],
    category: "Mafeteng",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 334,
    agent: {
      name: "Nokuthula Mokganyazi",
      title: "Residential Property Manager"
    }
  },
  {
    id: "28",
    name: "Commercial Office in Qacha's Nek South",
    logo: "https://placehold.co/400x300",
    rating: 4.5,
    reviews: 14,
    pricing: "M 2,000,000",
    description: "15,000 sqm office space in Qacha's Nek's south",
    tags: ["commercial", "office", "large"],
    category: "Qacha's Nek",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 343,
    agent: {
      name: "Mpho Mokganyazi",
      title: "Commercial Property Manager"
    }
  },
  {
    id: "29",
    name: "Warehouse in Thaba-Tseka South",
    logo: "https://placehold.co/400x300",
    rating: 4.4,
    reviews: 10,
    pricing: "M 1,700,000",
    description: "8,000 sqm warehouse with storage facilities",
    tags: ["warehouse", "storage", "medium"],
    category: "Thaba-Tseka",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 352,
    agent: {
      name: "Nokuthula Mokganyazi",
      title: "Warehouse Manager"
    }
  },
  {
    id: "30",
    name: "Residential Apartment in Mokhotlong South",
    logo: "https://placehold.co/400x300",
    rating: 4.3,
    reviews: 12,
    pricing: "M 1,600,000",
    description: "3 bedroom apartment with city views",
    tags: ["residential", "apartment", "city"],
    category: "Mokhotlong",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 361,
    agent: {
      name: "Mpho Mokganyazi",
      title: "Residential Property Manager"
    }
  },
  {
    id: "31",
    name: "Commercial Office in Butha-Buthe South",
    logo: "https://placehold.co/400x300",
    rating: 4.2,
    reviews: 11,
    pricing: "M 1,500,000",
    description: "10,000 sqm office space in Butha-Buthe's south",
    tags: ["commercial", "office", "medium"],
    category: "Butha-Buthe",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 370,
    agent: {
      name: "Nokuthula Mokganyazi",
      title: "Commercial Property Manager"
    }
  },
  {
    id: "32",
    name: "Warehouse in Leribe South",
    logo: "https://placehold.co/400x300",
    rating: 4.1,
    reviews: 13,
    pricing: "M 1,400,000",
    description: "8,000 sqm warehouse with storage facilities",
    tags: ["warehouse", "storage", "medium"],
    category: "Leribe",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 379,
    agent: {
      name: "Mpho Mokganyazi",
      title: "Warehouse Manager"
    }
  }
];
