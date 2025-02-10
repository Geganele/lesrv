
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  availableTags: string[];
}

const TagFilter = ({ selectedTags, onTagSelect, availableTags }: TagFilterProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-4">Massage Types</h2>
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
              "border hover:bg-gray-50",
              selectedTags.includes(tag)
                ? "bg-primary text-white hover:bg-primary/90 border-primary"
                : "bg-white text-gray-700 border-gray-200"
            )}
          >
            <span className="flex items-center gap-1">
              {selectedTags.includes(tag) && <Check className="h-3 w-3" />}
              {tag}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
