
import { Card } from "@/components/ui/card";
import { Bookmark, MapPin } from "lucide-react"; // Added MapPin import
import type { Property } from "@/data/tools";
import { useState } from "react";
import { ImageGallery } from "./cards/ImageGallery";
import { ImageGalleryDialog } from "./cards/ImageGalleryDialog";
import { BioDialog } from "./cards/BioDialog";
import { ContactDialog } from "./cards/ContactDialog";

interface PropertyCardProps {
  tool: Property;
}

const PropertyCard = ({ tool }: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isBioOpen, setIsBioOpen] = useState(false);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === tool.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? tool.images.length - 1 : prev - 1
    );
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:animate-card-hover bg-white">
      <div className="relative">
        <div 
          onClick={() => setIsGalleryOpen(true)}
          className="cursor-pointer"
        >
          <ImageGallery
            images={tool.images}
            currentIndex={currentImageIndex}
            onPrevious={previousImage}
            onNext={nextImage}
            altText={tool.agent.name}
          />
          <div className="absolute top-4 right-4">
            <button className="bg-white rounded-full p-2 hover:bg-gray-50 transition-colors">
              <Bookmark className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsBioOpen(true)}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{tool.agent.name}</h3>
            <p className="text-lg font-bold text-primary mt-2">{tool.pricing}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-3">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">{tool.category}</span>
        </div>
        
        <p className="mt-4 text-gray-600 line-clamp-2">{tool.description}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{tool.agent.title}</p>
            </div>
            <ContactDialog 
              tool={tool}
              onButtonClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      </div>

      <ImageGalleryDialog
        isOpen={isGalleryOpen}
        onOpenChange={setIsGalleryOpen}
        images={tool.images}
        currentIndex={currentImageIndex}
        onPrevious={previousImage}
        onNext={nextImage}
        altText={tool.agent.name}
      />

      <BioDialog
        isOpen={isBioOpen}
        onOpenChange={setIsBioOpen}
        tool={tool}
      />
    </Card>
  );
};

export default PropertyCard;
