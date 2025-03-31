
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TherapistForm } from "@/components/admin/therapist-form";
import TherapistsList from "@/components/admin/TherapistsList";
import SubscriptionList from "@/components/admin/SubscriptionList";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft, Info, Shield, User, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [refreshingAuth, setRefreshingAuth] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkAuth = async (forceRefresh = false) => {
    try {
      setLoading(true);
      if (forceRefresh) {
        setRefreshingAuth(true);
      }

      // Get current session
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Auth check error:", error);
        throw error;
      }

      console.log("Auth session data:", data);
      setSession(data.session);
      setAdminEmail(data.session?.user?.email || null);
      
      // If no session, redirect to auth
      if (!data.session) {
        setAuthError("Please log in to access the admin dashboard");
        navigate('/auth');
        return;
      }

      // Log token contents for debugging
      if (data.session) {
        try {
          const tokenParts = data.session.access_token.split('.');
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log("JWT payload:", payload);
        } catch (e) {
          console.error("Error parsing JWT:", e);
        }
      }
      
      // Admin check - email based for this demo
      if (data.session?.user?.email === 'admin@example.com') {
        setIsAdmin(true);
        setAuthError(null);
        console.log("Admin authenticated successfully:", data.session.user.email);
      } else {
        setIsAdmin(false);
        setAuthError("You need admin privileges to access this page");
        console.log("Not admin:", data.session?.user?.email);
        
        // If logged in but not admin, show message but don't redirect
        toast({
          title: "Access Restricted",
          description: "Only admin users can access this dashboard fully",
          variant: "destructive",
        });
      }
      
      // Optional refresh token
      if (forceRefresh) {
        const { error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError) {
          console.error("Token refresh error:", refreshError);
        } else {
          console.log("Auth token refreshed successfully");
          toast({
            title: "Authentication Refreshed",
            description: "Your authentication has been updated",
          });
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
      toast({
        title: "Authentication Error",
        description: "There was a problem checking your credentials",
        variant: "destructive",
      });
      navigate('/auth');
    } finally {
      setLoading(false);
      setRefreshingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        
        if (!session) {
          navigate('/auth');
        } else if (session.user.email === 'admin@example.com') {
          setIsAdmin(true);
          setAuthError(null);
          setAdminEmail(session.user.email);
        } else {
          setIsAdmin(false);
          setAuthError("You need admin privileges to access this page");
          setAdminEmail(session.user.email);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/auth');
      toast({
        title: "Signed out successfully",
        description: "You have been logged out",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign Out Error",
        description: "There was a problem signing out",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshAuth = () => {
    checkAuth(true);
  };

  if (loading && !refreshingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full"></div>
      </div>
    );
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
        <div className="flex items-center gap-4">
          {adminEmail && (
            <div className="flex items-center bg-slate-100 px-3 py-1 rounded-full text-sm">
              <User className="h-4 w-4 mr-2 text-slate-600" />
              <span className="text-slate-700">
                {adminEmail}
              </span>
              {isAdmin && (
                <Shield className="h-4 w-4 ml-2 text-green-600" />
              )}
            </div>
          )}
          <Button 
            onClick={handleRefreshAuth} 
            variant="outline" 
            size="sm" 
            disabled={refreshingAuth}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshingAuth ? 'animate-spin' : ''}`} />
            Refresh Auth
          </Button>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {authError ? (
        <Alert className="mb-6 bg-red-50 border-red-200">
          <Info className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-600">
            {authError}
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Admin email: admin@example.com {!isAdmin ? "- Register this email to access admin features." : "- You are logged in as admin."}
          </AlertDescription>
        </Alert>
      )}

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
