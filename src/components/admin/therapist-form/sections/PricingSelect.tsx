
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PricingSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const pricingOptions = [
  "$30 - $50",
  "$50 - $70",
  "$70 - $100",
  "$100 - $150",
  "$150+",
  "Contact for pricing",
  "Free consultation"
];

const PricingSelect: React.FC<PricingSelectProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="pricing">Pricing</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="pricing">
          <SelectValue placeholder="Select pricing" />
        </SelectTrigger>
        <SelectContent>
          {pricingOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PricingSelect;
