interface FilterSidebarProps {
  filters: {
    type: string;
    minPrice: number;
    maxPrice: number;
    rating: number;
    amenities: string[];
    city: string;
  };
  setFilters: (filters: any) => void;
}

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const propertyTypes = ['apartment', 'house', 'villa'];
  const amenitiesList = ['WiFi', 'Pool', 'Kitchen', 'Parking', 'Air Conditioning', 'Gym'];

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    setFilters({ ...filters, amenities: newAmenities });
  };

  return (
    <div className="lg:w-80 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#222222]">Filters</h3>
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
            className="text-sm text-[#FF385C] hover:text-[#E31C5F] font-medium cursor-pointer"
          >
            Clear all
          </button>
        </div>

        {/* Property Type */}
        <div className="mb-6 pb-6 border-b border-[#EBEBEB]">
          <h4 className="text-sm font-semibold text-[#222222] mb-3">Property Type</h4>
          <div className="space-y-2">
            {propertyTypes.map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="type"
                  checked={filters.type === type}
                  onChange={() => setFilters({ ...filters, type })}
                  className="w-4 h-4 text-[#FF385C] cursor-pointer"
                />
                <span className="text-sm text-[#222222] capitalize group-hover:text-[#FF385C] transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6 pb-6 border-b border-[#EBEBEB]">
          <h4 className="text-sm font-semibold text-[#222222] mb-3">Price Range</h4>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-[#717171] mb-1 block">Min Price: ${filters.minPrice}</label>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                className="w-full cursor-pointer"
              />
            </div>
            <div>
              <label className="text-xs text-[#717171] mb-1 block">Max Price: ${filters.maxPrice}</label>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                className="w-full cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6 pb-6 border-b border-[#EBEBEB]">
          <h4 className="text-sm font-semibold text-[#222222] mb-3">Minimum Rating</h4>
          <div className="flex items-center gap-2">
            {[4, 4.5, 4.8, 4.9].map((rating) => (
              <button
                key={rating}
                onClick={() => setFilters({ ...filters, rating })}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  filters.rating === rating
                    ? 'bg-[#FF385C] text-white'
                    : 'bg-[#F7F7F7] text-[#222222] hover:bg-[#EBEBEB]'
                }`}
              >
                {rating}+
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h4 className="text-sm font-semibold text-[#222222] mb-3">Amenities</h4>
          <div className="space-y-2">
            {amenitiesList.map((amenity) => (
              <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className="w-4 h-4 text-[#FF385C] rounded cursor-pointer"
                />
                <span className="text-sm text-[#222222] group-hover:text-[#FF385C] transition-colors">
                  {amenity}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}