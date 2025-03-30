
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const SubscriptionCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-lg mx-auto py-16 px-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-amber-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold">Subscription Cancelled</h1>
        
        <p className="text-gray-600">
          Your subscription process was cancelled. No payment was processed. You can subscribe at any time to access premium features.
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

export default SubscriptionCancel;
