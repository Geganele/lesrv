
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Bookmark, MapPin, Phone, User, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Property } from "@/data/tools";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PropertyCardProps {
  tool: Property;
}

const PropertyCard = ({ tool }: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

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
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:animate-card-hover bg-white">
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative cursor-pointer">
              <img 
                src={tool.images[currentImageIndex]} 
                alt={tool.agent.name} 
                className="w-full h-48 object-cover transition-opacity duration-300"
              />
              {tool.images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      previousImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {tool.images.map((_, index) => (
                      <div 
                        key={index}
                        className={`h-1.5 w-1.5 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              <div className="absolute top-4 right-4">
                <button className="bg-white rounded-full p-2 hover:bg-gray-50 transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
            </div>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <User className="h-5 w-5" />
                {tool.agent.name}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div className="aspect-video relative">
                <img
                  src={tool.images[currentImageIndex]}
                  alt={tool.agent.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                {tool.images.length > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{tool.rating}</span>
                    <span className="text-gray-500">({tool.reviews} reviews)</span>
                  </div>
                  <p className="text-lg font-bold text-primary">{tool.pricing}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-500">{tool.category}</span>
                </div>
                
                <p className="text-gray-600">{tool.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="pt-4 border-t">
                  <p className="font-semibold">{tool.agent.title}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <div className="p-6">
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default">
                    Contact
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {tool.agent.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <p className="text-gray-600">{tool.description}</p>
                      <div className="flex items-center gap-2 mt-4">
                        <Phone className="h-5 w-5 text-primary" />
                        <a href={tool.visitUrl} className="text-primary hover:underline">
                          {tool.visitUrl.replace('tel:', '')}
                        </a>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={isImageExpanded} onOpenChange={setIsImageExpanded}>
        <DialogContent className="sm:max-w-3xl p-0 bg-black/90">
          <button
            onClick={() => setIsImageExpanded(false)}
            className="absolute right-4 top-4 text-white hover:text-gray-300 transition-colors z-50"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative aspect-video">
            <img
              src={tool.images[currentImageIndex]}
              alt={tool.agent.name}
              className="w-full h-full object-contain"
            />
            {tool.images.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyCard;
