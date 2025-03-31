
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TagsSectionProps {
  formData: {
    tags: string[];
  };
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
}

const predefinedTags = [
  "Relaxation",
  "Pain relief",
  "Therapeutic",
  "Wellness",
  "Couples",
  "Stress relief",
  "Recovery",
  "Prenatal",
  "Deep tissue",
  "Swedish",
  "Sports",
  "Luxury",
  "Medical",
  "Spa",
  "Certified"
];

const TagsSection: React.FC<TagsSectionProps> = ({ formData, onAddTag, onRemoveTag }) => {
  const [customTag, setCustomTag] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const handleAddCustomTag = () => {
    if (customTag.trim()) {
      onAddTag(customTag.trim());
      setCustomTag('');
    }
  };

  const handleAddPredefinedTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      onAddTag(tag);
      setSelectedTag('');
    }
  };

  return (
    <div className="space-y-4">
      <Label>Tags</Label>
      
      <div className="space-y-2">
        <Label htmlFor="predefined-tags" className="text-sm text-muted-foreground">Add from common tags</Label>
        <div className="flex gap-2">
          <Select value={selectedTag} onValueChange={(value) => {
            setSelectedTag(value);
            handleAddPredefinedTag(value);
          }}>
            <SelectTrigger id="predefined-tags" className="flex-1">
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              {predefinedTags
                .filter(tag => !formData.tags.includes(tag))
                .map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="custom-tag" className="text-sm text-muted-foreground">Or add a custom tag</Label>
        <div className="flex gap-2">
          <Input
            id="custom-tag"
            placeholder="Enter a custom tag"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCustomTag();
              }
            }}
          />
          <Button 
            type="button" 
            onClick={handleAddCustomTag}
            size="sm"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-2">
        {formData.tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {tag}
            <button
              type="button"
              onClick={() => onRemoveTag(index)}
              className="text-slate-500 hover:text-slate-700 rounded-full"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove</span>
            </button>
          </Badge>
        ))}
        {formData.tags.length === 0 && (
          <div className="text-sm text-muted-foreground">No tags added yet</div>
        )}
      </div>
    </div>
  );
};

export default TagsSection;
