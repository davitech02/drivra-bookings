import { useNavigate } from 'react-router-dom';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/properties/${property.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
    >
      <div className="relative h-56 w-full overflow-hidden">
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
  );
}