
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Property } from "@/data/tools";

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
  const [newImage, setNewImage] = useState('');
  const [newTag, setNewTag] = useState('');
  const { toast } = useToast();

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

  const addImage = () => {
    if (newImage.trim() && !formData.images.includes(newImage)) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage]
      }));
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingTherapist ? 'Edit Therapist' : 'Add New Therapist'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Therapist Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="e.g., Healing Touch Spa"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Location</Label>
            <Input 
              id="category" 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required 
              placeholder="e.g., Johannesburg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
              placeholder="Brief description of services offered"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricing">Pricing</Label>
            <Input 
              id="pricing" 
              name="pricing" 
              value={formData.pricing} 
              onChange={handleChange} 
              required 
              placeholder="e.g., R 350/hr"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input 
                id="rating" 
                name="rating" 
                type="number" 
                min="0" 
                max="5" 
                step="0.1" 
                value={formData.rating} 
                onChange={handleChange} 
                placeholder="0.0-5.0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviews">Reviews Count</Label>
              <Input 
                id="reviews" 
                name="reviews" 
                type="number" 
                min="0" 
                value={formData.reviews} 
                onChange={handleChange} 
                placeholder="Number of reviews"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input 
              id="logo" 
              name="logo" 
              value={formData.logo} 
              onChange={handleChange} 
              placeholder="URL to logo image"
            />
          </div>

          <div className="space-y-2">
            <Label>Images</Label>
            <div className="flex space-x-2">
              <Input 
                value={newImage} 
                onChange={(e) => setNewImage(e.target.value)} 
                placeholder="Enter image URL" 
              />
              <Button type="button" onClick={addImage} variant="secondary">Add</Button>
            </div>
            <div className="mt-2 space-y-2">
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm truncate flex-1">{image}</span>
                  <Button 
                    type="button" 
                    onClick={() => removeImage(index)} 
                    variant="destructive" 
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex space-x-2">
              <Input 
                value={newTag} 
                onChange={(e) => setNewTag(e.target.value)} 
                placeholder="Enter tag (e.g., swedish, deep-tissue)" 
              />
              <Button type="button" onClick={addTag} variant="secondary">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full">
                  <span className="text-blue-600 text-sm">#{tag}</span>
                  <button 
                    type="button" 
                    onClick={() => removeTag(index)} 
                    className="text-blue-400 hover:text-blue-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="visit_url">Contact URL/Phone</Label>
            <Input 
              id="visit_url" 
              name="visit_url" 
              value={formData.visit_url} 
              onChange={handleChange} 
              placeholder="e.g., tel:+26657123456 or website URL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent_name">Therapist Name</Label>
            <Input 
              id="agent_name" 
              name="agent_name" 
              value={formData.agent_name} 
              onChange={handleChange} 
              placeholder="e.g., Sarah Johnson"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent_title">Therapist Title</Label>
            <Input 
              id="agent_title" 
              name="agent_title" 
              value={formData.agent_title} 
              onChange={handleChange} 
              placeholder="e.g., Licensed Massage Therapist"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch 
              id="featured"
              checked={formData.featured}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="featured">Featured Therapist</Label>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : (editingTherapist ? "Update Therapist" : "Add Therapist")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TherapistForm;
