
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
  { name: "Johannesburg", icon: MapPin },
  { name: "Cape Town", icon: MapPin },
  { name: "Durban", icon: MapPin },
  { name: "Pretoria", icon: MapPin },
  { name: "Port Elizabeth", icon: MapPin },
  { name: "Bloemfontein", icon: MapPin },
  { name: "East London", icon: MapPin },
  { name: "Kimberley", icon: MapPin },
  { name: "Nelspruit", icon: MapPin },
  { name: "Polokwane", icon: MapPin },
];
