
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SubscriptionDialog = ({ isOpen, onOpenChange }: SubscriptionDialogProps) => {
  const { toast } = useToast();

  const handleSubscribe = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "Please sign in to subscribe",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('manage-subscription', {
        body: { action: 'create', userId: user.id },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start subscription process",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-400" />
            Premium Subscription
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Premium Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Leave reviews for therapists</li>
              <li>• Access exclusive content</li>
              <li>• Priority support</li>
            </ul>
            <p className="mt-4 text-xl font-bold">R50/month</p>
          </div>

          <Button onClick={handleSubscribe} className="w-full">
            Subscribe Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
