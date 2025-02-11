
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, MapPin, User } from "lucide-react";
import type { Property } from "@/data/tools";

interface BioDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tool: Property;
}

export const BioDialog = ({ isOpen, onOpenChange, tool }: BioDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5" />
            {tool.agent.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
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
  );
};
