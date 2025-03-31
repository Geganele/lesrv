
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useAuthCheck = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth error:", error);
          setAuthError("Authentication error. Please try logging in again.");
          return;
        }
        
        if (!data.session) {
          console.log("No session found");
          setAuthError("You need to be logged in to manage therapists");
          setIsAdmin(false);
          return;
        }
        
        // Check if the email matches admin email
        const userEmail = data.session.user.email;
        console.log("User email:", userEmail);
        const isAdminUser = userEmail === 'admin@example.com';
        console.log("Is admin:", isAdminUser);
        
        if (!isAdminUser) {
          setAuthError("You need admin privileges to manage therapists");
          setIsAdmin(false);
        } else {
          setAuthError(null);
          setIsAdmin(true);
          console.log("Admin authenticated successfully");
        }
      } catch (err) {
        console.error("Error in auth check:", err);
        setAuthError("An unexpected error occurred during authentication check");
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      if (event === 'SIGNED_OUT') {
        setAuthError("You need to be logged in to manage therapists");
        setIsAdmin(false);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // Recheck admin status when auth state changes
        checkAdminAuth();
      }
    });
    
    return () => subscription.unsubscribe();
  }, [toast]);

  return { authError, isAdmin, loading };
};
