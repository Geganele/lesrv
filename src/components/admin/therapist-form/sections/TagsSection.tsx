
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface TagsSectionProps {
  formData: {
    tags: string[];
  };
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
}

const TagsSection = ({ formData, onAddTag, onRemoveTag }: TagsSectionProps) => {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag)) {
      onAddTag(newTag);
      setNewTag('');
    }
  };

  return (
    <div className="space-y-2">
      <Label>Tags</Label>
      <div className="flex space-x-2">
        <Input 
          value={newTag} 
          onChange={(e) => setNewTag(e.target.value)} 
          placeholder="Enter tag (e.g., swedish, deep-tissue)" 
        />
        <Button type="button" onClick={handleAddTag} variant="secondary">Add</Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {formData.tags.map((tag, index) => (
          <div key={index} className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full">
            <span className="text-blue-600 text-sm">#{tag}</span>
            <button 
              type="button" 
              onClick={() => onRemoveTag(index)} 
              className="text-blue-400 hover:text-blue-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsSection;
