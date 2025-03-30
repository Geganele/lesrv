
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TherapistForm from "@/components/admin/TherapistForm";
import TherapistsList from "@/components/admin/TherapistsList";
import SubscriptionList from "@/components/admin/SubscriptionList";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      
      // Admin check - email based for this demo
      if (data.session?.user?.email === 'admin@example.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        // If not admin, redirect to home
        if (data.session) {
          toast({
            title: "Access Denied",
            description: "You don't have admin privileges",
            variant: "destructive",
          });
          navigate('/');
        } else {
          navigate('/auth');
        }
      }
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (!session) {
          navigate('/auth');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Prevent flickering while redirecting
  }

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Site
          </Button>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <Button onClick={handleSignOut} variant="outline">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <Alert className="mb-6 bg-blue-50 border-blue-200">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Admin email: admin@example.com - Register this email to access admin features.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="therapists" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="therapists">Manage Therapists</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="therapists" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <TherapistForm />
            </div>
            <div className="lg:col-span-2">
              <TherapistsList />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="subscriptions">
          <SubscriptionList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
