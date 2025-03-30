
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ImagesSectionProps {
  formData: {
    logo: string;
    images: string[];
  };
  onAddImage: (image: string) => void;
  onRemoveImage: (index: number) => void;
}

const ImagesSection = ({ formData, onAddImage, onRemoveImage }: ImagesSectionProps) => {
  const [newImage, setNewImage] = useState('');

  const handleAddImage = () => {
    if (newImage.trim() && !formData.images.includes(newImage)) {
      onAddImage(newImage);
      setNewImage('');
    }
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="logo">Logo URL</Label>
        <Input 
          id="logo" 
          name="logo" 
          value={formData.logo} 
          placeholder="URL to logo image"
        />
      </div>

      <div className="space-y-2">
        <Label>Images</Label>
        <div className="flex space-x-2">
          <Input 
            value={newImage} 
            onChange={(e) => setNewImage(e.target.value)} 
            placeholder="Enter image URL" 
          />
          <Button type="button" onClick={handleAddImage} variant="secondary">Add</Button>
        </div>
        <div className="mt-2 space-y-2">
          {formData.images.map((image, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="text-sm truncate flex-1">{image}</span>
              <Button 
                type="button" 
                onClick={() => onRemoveImage(index)} 
                variant="destructive" 
                size="sm"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImagesSection;
