
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Subscription {
  id: string;
  user_id: string;
  user_email: string;
  status: string;
  subscription_type: string;
  created_at: string;
  expire_at: string | null;
}

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*, profiles(email)')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (data) {
          // Format the data for display
          const formattedSubscriptions: Subscription[] = data.map((sub: any) => ({
            id: sub.id,
            user_id: sub.user_id,
            user_email: sub.profiles?.email || 'Unknown',
            status: sub.status,
            subscription_type: sub.subscription_type,
            created_at: new Date(sub.created_at).toLocaleString(),
            expire_at: sub.expire_at ? new Date(sub.expire_at).toLocaleString() : null
          }));
          
          setSubscriptions(formattedSubscriptions);
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        toast({
          title: "Error",
          description: "Failed to load subscription data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Management</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin h-6 w-6 border-t-2 border-primary rounded-full"></div>
          </div>
        ) : (
          <>
            {subscriptions.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No subscriptions found. Users can subscribe to the premium plan from the main site.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell>{subscription.user_email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{subscription.subscription_type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            subscription.status === 'active' ? 'bg-green-100 text-green-800' : 
                            subscription.status === 'canceled' ? 'bg-amber-100 text-amber-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {subscription.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{subscription.created_at}</TableCell>
                        <TableCell>{subscription.expire_at || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionList;
