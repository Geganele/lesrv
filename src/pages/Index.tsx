
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import TagFilter from "@/components/TagFilter";
import PropertyCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Property } from "@/data/tools";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
          
          // Extract unique tags
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Professional Massage Services
        </h1>
        {session ? (
          <Button onClick={handleSignOut} variant="outline" className="shadow-sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        ) : (
          <Button onClick={() => navigate('/auth')} className="shadow-sm">
            Sign In
          </Button>
        )}
      </div>
      
      <div className="space-y-6 mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="md:col-span-2">
            <TagFilter
              selectedTags={selectedTags}
              onTagSelect={handleTagSelect}
              availableTags={availableTags}
            />
          </div>
        </div>
      </div>
      
      <main>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse space-y-4">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
              <div className="h-48 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        ) : (
          <>
            {featuredProperties.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Featured Therapists</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredProperties.map((property) => (
                    <PropertyCard key={property.id} tool={property} />
                  ))}
                </div>
              </>
            )}
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">All Massage Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularProperties.map((property) => (
                <PropertyCard key={property.id} tool={property} />
              ))}
            </div>
            
            {filteredProperties.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500">No massage services found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
