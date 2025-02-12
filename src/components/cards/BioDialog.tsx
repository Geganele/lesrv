
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, MapPin, User, Clock, Sparkles, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Property } from "@/data/tools";

interface BioDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tool: Property;
}

export const BioDialog = ({ isOpen, onOpenChange, tool }: BioDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5" />
            {tool.agent.name}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{tool.rating}</span>
              <span className="text-gray-500">({tool.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-500">{tool.category}</span>
            </div>
          </div>

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="hours">Working Hours</TabsTrigger>
              <TabsTrigger value="treatments">Treatments</TabsTrigger>
              <TabsTrigger value="ratings">Ratings</TabsTrigger>
              <TabsTrigger value="adult">Adult</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <div className="space-y-4">
                <p className="text-gray-600">{tool.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="text-sm px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hours" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Monday - Friday: 9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Saturday: 10:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Sunday: Closed</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="treatments" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Available Treatments</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-green-500" />
                      <span>Swedish Massage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-green-500" />
                      <span>Deep Tissue Massage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-green-500" />
                      <span>Aromatherapy Massage</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4">Pricing</h3>
                  <p className="text-lg font-bold text-primary">{tool.pricing}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ratings" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-lg">{tool.rating} out of 5</span>
                </div>
                <p className="text-gray-600">Based on {tool.reviews} customer reviews</p>
              </div>
            </TabsContent>

            <TabsContent value="adult" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-400" />
                  <span className="font-semibold">Adult Services Available</span>
                </div>
                <p className="text-gray-600">
                  Sign in to view detailed information about adult services and pricing.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-4 border-t">
            <p className="font-semibold">{tool.agent.title}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
