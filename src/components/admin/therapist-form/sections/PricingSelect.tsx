
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface PricingSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const PRICING_OPTIONS = [
  "R 300/hr",
  "R 350/hr",
  "R 400/hr",
  "R 450/hr",
  "R 500/hr",
  "R 550/hr",
  "R 600/hr",
  "Custom"
];

const PricingSelect = ({ value, onChange }: PricingSelectProps) => {
  const [isCustom, setIsCustom] = useState(
    !PRICING_OPTIONS.includes(value) && value !== ""
  );
  
  const handleSelectChange = (selected: string) => {
    if (selected === "Custom") {
      setIsCustom(true);
      return;
    }
    
    setIsCustom(false);
    onChange(selected);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="pricing">Pricing</Label>
      <Select 
        value={isCustom ? "Custom" : value} 
        onValueChange={handleSelectChange}
      >
        <SelectTrigger id="pricing">
          <SelectValue placeholder="Select pricing" />
        </SelectTrigger>
        <SelectContent>
          {PRICING_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {isCustom && (
        <Input
          className="mt-2"
          placeholder="Enter custom pricing (e.g., R 375/hr)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default PricingSelect;
