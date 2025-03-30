
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAuthCheck = () => {
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        setAuthError("You need to be logged in to manage therapists");
      } else if (data.session.user.email !== 'admin@example.com') {
        setAuthError("You need admin privileges to manage therapists");
      } else {
        setAuthError(null);
      }
    };
    
    checkAdminAuth();
  }, []);

  return { authError };
};
