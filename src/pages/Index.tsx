
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Property } from "@/data/tools";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import FilterSection from "@/components/FilterSection";
import TherapistListings from "@/components/TherapistListings";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [session, setSession] = useState<any>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('therapists')
          .select('*');
        
        if (error) {
          toast({
            title: "Error",
            description: "Failed to load therapists",
            variant: "destructive",
          });
          return;
        }

        if (data) {
          const formattedData: Property[] = data.map(therapist => ({
            id: therapist.id,
            name: therapist.name,
            logo: therapist.logo || '',
            images: therapist.images || [],
            rating: therapist.rating || 0,
            reviews: therapist.reviews || 0,
            pricing: session ? therapist.pricing : 'Sign in to view pricing',
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
          setProperties(formattedData);
          
          const allTags = new Set<string>();
          formattedData.forEach(therapist => {
            therapist.tags.forEach(tag => allTags.add(tag));
          });
          setAvailableTags(Array.from(allTags));
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, [session, toast]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || property.category === selectedCategory;
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => property.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  const featuredProperties = filteredProperties.filter(property => property.featured);
  const regularProperties = filteredProperties.filter(property => !property.featured);

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Header session={session} onSignOut={handleSignOut} />
      
      <FilterSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
        availableTags={availableTags}
      />
      
      <main>
        <TherapistListings
          loading={loading}
          featuredProperties={featuredProperties}
          regularProperties={regularProperties}
          filteredProperties={filteredProperties}
        />
      </main>
    </div>
  );
};

export default Index;
