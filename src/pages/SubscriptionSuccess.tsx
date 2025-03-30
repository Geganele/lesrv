
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const SubscriptionSuccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const updateSubscriptionStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate('/auth');
          return;
        }

        // Check if user already has a subscription record
        const { data: existingSubscription } = await supabase
          .from('subscriptions')
          .select('id')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .maybeSingle();

        // If no active subscription, create one
        if (!existingSubscription) {
          const { error } = await supabase.from('subscriptions').insert({
            user_id: user.id,
            status: 'active',
            subscription_type: 'premium',
            // Expire date is handled by Stripe, we just store status here
          });

          if (error) throw error;
        }

        toast({
          title: "Subscription Activated",
          description: "Your premium subscription is now active!",
        });
      } catch (error) {
        console.error("Error updating subscription:", error);
        toast({
          title: "Error",
          description: "There was a problem activating your subscription. Please contact support.",
          variant: "destructive",
        });
      }
    };

    updateSubscriptionStatus();
  }, [navigate, toast]);

  return (
    <div className="container max-w-lg mx-auto py-16 px-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold">Subscription Successful!</h1>
        
        <p className="text-gray-600">
          Your premium subscription has been activated. You can now access all premium features including leaving reviews for therapists.
        </p>
        
        <div className="pt-4">
          <Button onClick={() => navigate('/')} className="w-full">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
