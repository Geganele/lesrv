
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Bookmark, MapPin, Phone, User } from "lucide-react";
import type { Property } from "@/data/tools";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PropertyCardProps {
  tool: Property;
}

const PropertyCard = ({ tool }: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:animate-card-hover">
      <div className="relative">
        <img 
          src={tool.logo} 
          alt={tool.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white rounded-full p-2">
            <Bookmark className="h-5 w-5" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{tool.name}</h3>
            <p className="text-lg font-bold text-primary mt-2">{tool.pricing}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-3">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">{tool.category}</span>
        </div>
        
        <p className="mt-4 text-gray-600">{tool.description}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{tool.agent.name}</p>
              <p className="text-sm text-gray-500">{tool.agent.title}</p>
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
  );
};

export default PropertyCard;
