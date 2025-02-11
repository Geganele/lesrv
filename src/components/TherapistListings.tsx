
import PropertyCard from "@/components/ToolCard";
import type { Property } from "@/data/tools";

interface TherapistListingsProps {
  loading: boolean;
  featuredProperties: Property[];
  regularProperties: Property[];
  filteredProperties: Property[];
}

const TherapistListings = ({
  loading,
  featuredProperties,
  regularProperties,
  filteredProperties,
}: TherapistListingsProps) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-gray-200 rounded-lg"></div>
          <div className="h-48 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
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
      
      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No massage services found matching your criteria.</p>
        </div>
      )}
    </>
  );
};

export default TherapistListings;
