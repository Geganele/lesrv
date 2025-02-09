
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import PropertyCard from "@/components/ToolCard";
import { properties } from "@/data/tools";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
      <h1 className="text-4xl font-bold mb-8">Lesotho Property Listings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </aside>
        
        <main className="lg:col-span-3">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          {featuredProperties.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Featured Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredProperties.map((property) => (
                  <PropertyCard key={property.id} tool={property} />
                ))}
              </div>
            </>
          )}
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">All Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularProperties.map((property) => (
              <PropertyCard key={property.id} tool={property} />
            ))}
          </div>
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No properties found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
