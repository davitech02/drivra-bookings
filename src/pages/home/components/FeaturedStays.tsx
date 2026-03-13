import { useNavigate } from 'react-router-dom';
import { featuredProperties } from '../../../mocks/properties';

export default function FeaturedStays() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#222222] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Featured Stays
          </h2>
          <p className="text-lg text-[#717171] max-w-2xl mx-auto">
            Handpicked properties offering exceptional experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              onClick={() => navigate(`/properties/${property.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    <i className="ri-star-fill text-[#FF385C] text-sm"></i>
                    <span className="text-sm font-semibold text-[#222222]">{property.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#222222] mb-2 line-clamp-1">
                  {property.title}
                </h3>
                <p className="text-sm text-[#717171] mb-3 flex items-center gap-1">
                  <i className="ri-map-pin-line"></i>
                  {property.location}
                </p>

                <div className="flex items-center gap-4 text-xs text-[#717171] mb-4">
                  <span className="flex items-center gap-1">
                    <i className="ri-user-line"></i>
                    {property.guests} guests
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-hotel-bed-line"></i>
                    {property.bedrooms} beds
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-shower-line"></i>
                    {property.bathrooms} baths
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#EBEBEB]">
                  <div>
                    <span className="text-xl font-bold text-[#222222]">${property.price}</span>
                    <span className="text-sm text-[#717171]"> / night</span>
                  </div>
                  <span className="text-xs text-[#717171]">{property.reviews} reviews</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/properties')}
            className="px-8 py-3 bg-[#FF385C] text-white rounded-xl font-semibold hover:bg-[#E31C5F] transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
}