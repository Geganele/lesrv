
import { Button } from "@/components/ui/button";
import { cities } from "@/data/tools";
import { MapPin } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="sticky top-4 space-y-2">
      <h2 className="text-xl font-semibold mb-4">Cities</h2>
      {cities.map((city) => (
        <Button
          key={city.name}
          variant={selectedCategory === city.name ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectCategory(city.name)}
        >
          <MapPin className="mr-2 h-4 w-4" />
          {city.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
