import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

function CategoryFilter({ selectedCategory, onCategorySelect }: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Get all distinct categories from therapists
        const { data, error } = await supabase
          .from('therapists')
          .select('category')
          .not('category', 'is', null);
        
        if (error) throw error;
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(
          data.map(item => item.category).filter(Boolean) as string[]
        ));
        
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading || categories.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <h4 className="text-sm font-semibold mb-2">Category</h4>
      <RadioGroup defaultValue={selectedCategory || ""} onValueChange={(value) => onCategorySelect(value === "" ? null : value)}>
        <div className="flex flex-wrap gap-2">
          <RadioGroupItem value="" id="category-all" className="sr-only" />
          <Label htmlFor="category-all" className="cursor-pointer px-3 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition-colors">
            All
          </Label>
          {categories.map((category) => (
            <div key={category}>
              <RadioGroupItem value={category} id={`category-${category}`} className="sr-only" />
              <Label htmlFor={`category-${category}`} className="cursor-pointer px-3 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition-colors">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

export default CategoryFilter;
