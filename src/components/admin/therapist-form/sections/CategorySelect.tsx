
import { useState, useEffect } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const PREDEFINED_LOCATIONS = [
  "Johannesburg",
  "Cape Town",
  "Durban",
  "Pretoria",
  "Port Elizabeth",
  "Bloemfontein",
  "East London",
  "Nelspruit",
  "Kimberley",
  "Polokwane"
];

const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  const [locations, setLocations] = useState<string[]>(PREDEFINED_LOCATIONS);
  
  useEffect(() => {
    // Try to fetch locations from the database if available
    const fetchLocations = async () => {
      try {
        const { data, error } = await supabase
          .from('locations')
          .select('name')
          .order('name');
        
        if (!error && data && data.length > 0) {
          setLocations(data.map(loc => loc.name));
        }
      } catch (err) {
        console.error("Error fetching locations:", err);
        // Fall back to predefined locations
      }
    };
    
    fetchLocations();
  }, []);

  return (
    <div className="space-y-2">
      <Label htmlFor="category">Location</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id="category">
          <SelectValue placeholder="Select a location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelect;
