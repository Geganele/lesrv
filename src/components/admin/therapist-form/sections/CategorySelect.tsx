
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const categories = [
  "Deep Tissue Massage",
  "Swedish Massage",
  "Hot Stone Massage",
  "Sports Massage",
  "Aromatherapy Massage",
  "Prenatal Massage",
  "Thai Massage",
  "Reflexology",
  "Shiatsu",
  "Chair Massage"
];

const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="category">Category</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="category">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelect;
