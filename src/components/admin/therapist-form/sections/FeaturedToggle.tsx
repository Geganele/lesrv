
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface FeaturedToggleProps {
  featured: boolean;
  onToggle: (checked: boolean) => void;
}

const FeaturedToggle = ({ featured, onToggle }: FeaturedToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch 
        id="featured"
        checked={featured}
        onCheckedChange={onToggle}
      />
      <Label htmlFor="featured">Featured Therapist</Label>
    </div>
  );
};

export default FeaturedToggle;
