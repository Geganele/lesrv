
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import TagFilter from "@/components/TagFilter";

interface FilterSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  availableTags: string[];
}

const FilterSection = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  selectedTags,
  onTagSelect,
  availableTags,
}: FilterSectionProps) => {
  return (
    <div className="space-y-6 mb-8">
      <SearchBar value={searchQuery} onChange={onSearchChange} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={onCategorySelect}
        />
        <div className="md:col-span-2">
          <TagFilter
            selectedTags={selectedTags}
            onTagSelect={onTagSelect}
            availableTags={availableTags}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
