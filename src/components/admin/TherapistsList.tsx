import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TherapistForm from "./TherapistForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import type { Property } from "@/data/tools";

const TherapistsList = () => {
  const [therapists, setTherapists] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTherapist, setEditingTherapist] = useState<Property | undefined>(undefined);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchTherapists = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('therapists')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        const formattedData: Property[] = data.map(therapist => ({
          id: therapist.id,
          name: therapist.name || 'Unnamed Therapist',
          logo: therapist.logo || '',
          images: therapist.images || [],
          rating: therapist.rating || 0,
          reviews: therapist.reviews || 0,
          pricing: therapist.pricing || '',
          description: therapist.description || '',
          tags: therapist.tags || [],
          category: therapist.category || '',
          featured: therapist.featured || false,
          visitUrl: therapist.visit_url || '',
          bookmarks: therapist.bookmarks || 0,
          agent: {
            name: therapist.agent_name || '',
            title: therapist.agent_title || ''
          }
        }));
        
        setTherapists(formattedData);
      }
    } catch (error) {
      console.error("Error fetching therapists:", error);
      toast({
        title: "Error",
        description: "Failed to load therapists",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTherapists();
  }, [toast]);

  const handleEdit = (therapist: Property) => {
    setEditingTherapist(therapist);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('therapists')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Therapist deleted successfully",
      });
      
      // Refresh the list
      fetchTherapists();
    } catch (error) {
      console.error("Error deleting therapist:", error);
      toast({
        title: "Error",
        description: "Failed to delete therapist",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Therapist Listings</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin h-6 w-6 border-t-2 border-primary rounded-full"></div>
          </div>
        ) : (
          <>
            {therapists.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No therapists found. Add your first therapist using the form.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {therapists.map((therapist) => (
                      <TableRow key={therapist.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            {therapist.logo && (
                              <img 
                                src={therapist.logo} 
                                alt={therapist.name} 
                                className="h-8 w-8 rounded-full object-cover"
                              />
                            )}
                            <span>{therapist.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{therapist.category}</TableCell>
                        <TableCell>
                          {therapist.featured && (
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                                Featured
                              </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(therapist)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete {therapist.name}. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(therapist.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Therapist</DialogTitle>
            </DialogHeader>
            <TherapistForm 
              editingTherapist={editingTherapist} 
              onSaved={() => {
                setIsEditDialogOpen(false);
                fetchTherapists();
              }} 
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TherapistsList;
