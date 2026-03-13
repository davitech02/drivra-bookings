import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import FilterSidebar from './components/FilterSidebar';
import PropertyCard from './components/PropertyCard';
import PropertySkeleton from './components/PropertySkeleton';
import { getAllProperties } from '../../utils/propertyStorage';

export default function Properties() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState(getAllProperties());
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    minPrice: 0,
    maxPrice: 1000,
    rating: 0,
    amenities: [] as string[],
    city: searchParams.get('city') || '',
  });

  useEffect(() => {
    // Simulate a brief loading state then load properties (including ones added in admin)
    const timer = setTimeout(() => {
      setProperties(getAllProperties());
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const filteredProperties = properties.filter((p: any) => {
    if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) return false;
    if (filters.type && p.type !== filters.type) return false;
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
    if (filters.rating > 0 && p.rating < filters.rating) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F7F7F7]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1
              className="text-4xl font-bold text-[#222222] mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {filters.city ? `Properties in ${filters.city}` : 'All Properties'}
            </h1>
            <p className="text-lg text-[#717171]">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} available
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <FilterSidebar filters={filters} setFilters={setFilters} />

            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <PropertySkeleton key={i} />
                  ))}
                </div>
              ) : filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property: any) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-24 h-24 flex items-center justify-center bg-[#F7F7F7] rounded-full mx-auto mb-6">
                    <i className="ri-home-smile-line text-5xl text-[#717171]"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-[#222222] mb-3">No properties found</h3>
                  <p className="text-[#717171] mb-6">
                    Try adjusting your filters to see more results
                  </p>
                  <button
                    onClick={() =>
                      setFilters({
                        type: '',
                        minPrice: 0,
                        maxPrice: 1000,
                        rating: 0,
                        amenities: [],
                        city: '',
                      })
                    }
                    className="px-6 py-3 bg-[#FF385C] text-white rounded-xl font-semibold hover:bg-[#E31C5F] transition-all cursor-pointer whitespace-nowrap"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
