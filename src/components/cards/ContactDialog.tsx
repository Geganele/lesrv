
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, User } from "lucide-react";
import type { Property } from "@/data/tools";

interface ContactDialogProps {
  tool: Property;
  onButtonClick: (e: React.MouseEvent) => void;
}

export const ContactDialog = ({ tool, onButtonClick }: ContactDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="default"
          onClick={onButtonClick}
        >
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
  );
};
