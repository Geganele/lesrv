
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import type { Property } from "@/data/tools";
import { useAuthCheck } from "./hooks/useAuthCheck";
import BasicDetailsSection from "./sections/BasicDetailsSection";
import ImagesSection from "./sections/ImagesSection";
import TagsSection from "./sections/TagsSection";
import ContactSection from "./sections/ContactSection";
import FeaturedToggle from "./sections/FeaturedToggle";

interface TherapistFormProps {
  editingTherapist?: Property;
  onSaved?: () => void;
}

const TherapistForm = ({ editingTherapist, onSaved }: TherapistFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    logo: '',
    images: [] as string[],
    rating: 0,
    reviews: 0,
    pricing: '',
    description: '',
    tags: [] as string[],
    category: '',
    featured: false,
    visit_url: '',
    agent_name: '',
    agent_title: ''
  });
  const { toast } = useToast();
  const { authError } = useAuthCheck();

  useEffect(() => {
    if (editingTherapist) {
      setFormData({
        id: editingTherapist.id,
        name: editingTherapist.name,
        logo: editingTherapist.logo,
        images: editingTherapist.images || [],
        rating: editingTherapist.rating,
        reviews: editingTherapist.reviews,
        pricing: editingTherapist.pricing,
        description: editingTherapist.description,
        tags: editingTherapist.tags || [],
        category: editingTherapist.category,
        featured: editingTherapist.featured,
        visit_url: editingTherapist.visitUrl,
        agent_name: editingTherapist.agent?.name || '',
        agent_title: editingTherapist.agent?.title || ''
      });
    }
  }, [editingTherapist]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, featured: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First verify the user is still authenticated as admin
      const { data: authData } = await supabase.auth.getSession();
      
      if (!authData.session) {
        throw new Error("You must be logged in to save therapists");
      }
      
      if (authData.session.user.email !== 'admin@example.com') {
        throw new Error("You need admin privileges to save therapists");
      }

      // Convert form data to match the database schema
      const therapistData = {
        name: formData.name,
        logo: formData.logo,
        images: formData.images,
        rating: Number(formData.rating),
        reviews: Number(formData.reviews),
        pricing: formData.pricing,
        description: formData.description,
        tags: formData.tags,
        category: formData.category,
        featured: formData.featured,
        visit_url: formData.visit_url,
        agent_name: formData.agent_name,
        agent_title: formData.agent_title
      };

      console.log("Attempting to save therapist with data:", therapistData);
      console.log("Current user:", authData.session.user.email);

      let response;
      if (editingTherapist) {
        response = await supabase
          .from('therapists')
          .update(therapistData)
          .eq('id', editingTherapist.id);
      } else {
        response = await supabase
          .from('therapists')
          .insert(therapistData);
      }

      if (response.error) {
        console.error("Supabase error:", response.error);
        throw response.error;
      }

      toast({
        title: "Success",
        description: editingTherapist ? "Therapist updated successfully" : "Therapist created successfully",
      });

      // Reset form if not editing
      if (!editingTherapist) {
        setFormData({
          id: '',
          name: '',
          logo: '',
          images: [],
          rating: 0,
          reviews: 0,
          pricing: '',
          description: '',
          tags: [],
          category: '',
          featured: false,
          visit_url: '',
          agent_name: '',
          agent_title: ''
        });
      }

      if (onSaved) {
        onSaved();
      }
    } catch (error) {
      console.error("Error saving therapist:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save therapist. Please make sure you're logged in as admin.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = (image: string) => {
    if (image.trim() && !formData.images.includes(image)) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, image]
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleRemoveTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingTherapist ? 'Edit Therapist' : 'Add New Therapist'}</CardTitle>
      </CardHeader>
      <CardContent>
        {authError && (
          <Alert className="mb-4 bg-red-50 border-red-200">
            <Info className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-600">
              {authError}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <BasicDetailsSection 
            formData={formData}
            handleChange={handleChange}
          />
          
          <ImagesSection
            formData={formData}
            onAddImage={handleAddImage}
            onRemoveImage={handleRemoveImage}
          />
          
          <TagsSection
            formData={formData}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
          />
          
          <ContactSection
            formData={formData}
            handleChange={handleChange}
          />
          
          <FeaturedToggle
            featured={formData.featured}
            onToggle={handleSwitchChange}
          />

          <Button type="submit" className="w-full" disabled={loading || !!authError}>
            {loading ? "Saving..." : (editingTherapist ? "Update Therapist" : "Add Therapist")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TherapistForm;
