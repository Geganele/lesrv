
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Info, AlertCircle } from "lucide-react";
import type { Property } from "@/data/tools";
import { useAuthCheck } from "./hooks/useAuthCheck";
import BasicDetailsSection from "./sections/BasicDetailsSection";
import ImagesSection from "./sections/ImagesSection";
import TagsSection from "./sections/TagsSection";
import ContactSection from "./sections/ContactSection";
import FeaturedToggle from "./sections/FeaturedToggle";
import CategorySelect from "./sections/CategorySelect";
import PricingSelect from "./sections/PricingSelect";

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
    rating: 4.5,
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
  const { authError, isAdmin, loading: authLoading } = useAuthCheck();

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

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, featured: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isAdmin) {
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

      console.log("Saving therapist data:", therapistData);

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
          rating: 4.5,
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

  if (authLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{editingTherapist ? 'Edit Therapist' : 'Add New Therapist'}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Checking authentication...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingTherapist ? 'Edit Therapist' : 'Add New Therapist'}</CardTitle>
      </CardHeader>
      <CardContent>
        {authError && (
          <Alert className="mb-4 bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-600">
              {authError}
            </AlertDescription>
          </Alert>
        )}

        {!authError && !isAdmin && (
          <Alert className="mb-4 bg-yellow-50 border-yellow-200">
            <Info className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-600">
              Admin verification in progress. If you're admin@example.com, you should get access soon.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <BasicDetailsSection 
            formData={{
              name: formData.name,
              description: formData.description,
              rating: formData.rating,
              reviews: formData.reviews
            }}
            handleChange={handleChange}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CategorySelect 
              value={formData.category}
              onChange={(value) => handleFieldChange('category', value)}
            />
            
            <PricingSelect
              value={formData.pricing}
              onChange={(value) => handleFieldChange('pricing', value)}
            />
          </div>
          
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

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !!authError || !isAdmin}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {editingTherapist ? "Updating..." : "Saving..."}
              </>
            ) : (
              editingTherapist ? "Update Therapist" : "Add Therapist"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TherapistForm;
