
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
  const [error, setError] = useState<string | null>(null);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [retryCount, setRetryCount] = useState(0);
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
        setError(null);
        
        console.log(`Fetching therapists from Supabase... (Attempt ${retryCount + 1})`);
        
        const { data, error } = await supabase
          .from('therapists')
          .select('*')
          .timeout(10000); // Adding timeout for better error handling
        
        if (error) {
          console.error("Supabase error:", error);
          throw new Error(`Failed to load therapists: ${error.message}`);
        }

        console.log("Therapists data received:", data);
        
        if (!data || data.length === 0) {
          // Check if it's likely a new database without data
          const isTableEmpty = await checkIfTableIsEmpty();
          
          if (isTableEmpty) {
            // Only show this if not retrying too many times
            if (retryCount < 3) {
              await seedDemoData(); // Seed demo data for better user experience
              setRetryCount(prev => prev + 1);
              return; // Will trigger a re-fetch via the retryCount dependency
            } else {
              throw new Error("No therapists found in the database. Please add therapists via the admin panel.");
            }
          }
        }
        
        if (data) {
          const formattedData: Property[] = data.map(therapist => ({
            id: therapist.id,
            name: therapist.name || 'Unnamed Therapist',
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
          
          // Extract all unique tags
          const allTags = new Set<string>();
          formattedData.forEach(therapist => {
            therapist.tags.forEach(tag => allTags.add(tag));
          });
          setAvailableTags(Array.from(allTags));
          
          // Reset error state if we successfully got data
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching therapists:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const checkIfTableIsEmpty = async () => {
      try {
        const { count, error } = await supabase
          .from('therapists')
          .select('*', { count: 'exact', head: true });
        
        if (error) throw error;
        return count === 0;
      } catch (err) {
        console.error("Error checking table:", err);
        return false;
      }
    };

    const seedDemoData = async () => {
      try {
        console.log("Seeding demo data...");
        const demoTherapists = [
          {
            name: "Relaxing Hands Massage",
            logo: "https://via.placeholder.com/150",
            images: ["https://via.placeholder.com/500x300", "https://via.placeholder.com/500x300"],
            rating: 4.5,
            reviews: 28,
            pricing: "R350 - R600",
            description: "Specializing in deep tissue and relaxation massage therapies.",
            tags: ["Deep Tissue", "Relaxation", "Swedish"],
            category: "Johannesburg",
            featured: true,
            visit_url: "#",
            bookmarks: 15,
            agent_name: "Sarah Johnson",
            agent_title: "Head Therapist"
          },
          {
            name: "Wellness Massage Studio",
            logo: "https://via.placeholder.com/150",
            images: ["https://via.placeholder.com/500x300", "https://via.placeholder.com/500x300"],
            rating: 4.2,
            reviews: 17,
            pricing: "R300 - R550",
            description: "Holistic massage approach focusing on full body wellness.",
            tags: ["Holistic", "Aromatherapy", "Hot Stone"],
            category: "Cape Town",
            featured: false,
            visit_url: "#",
            bookmarks: 8,
            agent_name: "David Smith",
            agent_title: "Senior Therapist"
          }
        ];
        
        const { error } = await supabase
          .from('therapists')
          .insert(demoTherapists);
        
        if (error) throw error;
        console.log("Demo data seeded successfully");
        
        // Show a toast notification
        toast({
          title: "Demo Data Added",
          description: "Sample therapist data has been added for demonstration purposes.",
        });
      } catch (err) {
        console.error("Error seeding demo data:", err);
      }
    };

    fetchTherapists();
  }, [session, toast, retryCount]);

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

  const isAdmin = session?.user?.email === 'admin@example.com'; // Simple admin check, enhance this based on your auth setup

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Header session={session} onSignOut={handleSignOut} isAdmin={isAdmin} />
      
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
          error={error}
          featuredProperties={featuredProperties}
          regularProperties={regularProperties}
          filteredProperties={filteredProperties}
        />
      </main>
    </div>
  );
};

export default Index;
