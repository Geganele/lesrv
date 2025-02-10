
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import PropertyCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Property } from "@/data/tools";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
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

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || property.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredProperties = filteredProperties.filter(property => property.featured);
  const regularProperties = filteredProperties.filter(property => !property.featured);

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Professional Massage Services</h1>
        {session ? (
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        ) : (
          <Button onClick={() => navigate('/auth')}>
            Sign In
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </aside>
        
        <main className="lg:col-span-3">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading therapists...</p>
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
    </div>
  );
};

export default Index;
