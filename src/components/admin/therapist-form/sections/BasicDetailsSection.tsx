
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BasicDetailsSectionProps {
  formData: {
    name: string;
    category: string;
    description: string;
    pricing: string;
    rating: number;
    reviews: number;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const BasicDetailsSection = ({ formData, handleChange }: BasicDetailsSectionProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Business Name</Label>
        <Input 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          placeholder="e.g., Healing Touch Spa"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Location</Label>
        <Input 
          id="category" 
          name="category" 
          value={formData.category} 
          onChange={handleChange} 
          required 
          placeholder="e.g., Johannesburg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
          placeholder="Brief description of services offered"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pricing">Pricing</Label>
        <Input 
          id="pricing" 
          name="pricing" 
          value={formData.pricing} 
          onChange={handleChange} 
          required 
          placeholder="e.g., R 350/hr"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <Input 
            id="rating" 
            name="rating" 
            type="number" 
            min="0" 
            max="5" 
            step="0.1" 
            value={formData.rating} 
            onChange={handleChange} 
            placeholder="0.0-5.0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reviews">Reviews Count</Label>
          <Input 
            id="reviews" 
            name="reviews" 
            type="number" 
            min="0" 
            value={formData.reviews} 
            onChange={handleChange} 
            placeholder="Number of reviews"
          />
        </div>
      </div>
    </>
  );
};

export default BasicDetailsSection;
