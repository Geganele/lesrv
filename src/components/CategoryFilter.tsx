
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

interface Location {
  id: string;
  name: string;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  const { data: locations, isLoading } = useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Location[];
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        <h2 className="text-xl font-semibold mb-4">Locations</h2>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-32 bg-gray-200 animate-pulse rounded-md"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-4">Locations</h2>
      <div className="flex flex-wrap gap-2">
        {locations?.map((location) => (
          <Button
            key={location.id}
            variant={selectedCategory === location.name ? "default" : "ghost"}
            className="flex-grow sm:flex-grow-0"
            onClick={() => onSelectCategory(location.name)}
          >
            <MapPin className="mr-2 h-4 w-4" />
            {location.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
