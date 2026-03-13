import { useNavigate } from 'react-router-dom';
import { destinations } from '../../../mocks/properties';

export default function PopularDestinations() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#222222] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Popular Destinations
          </h2>
          <p className="text-lg text-[#717171] max-w-2xl mx-auto">
            Explore the most sought-after cities for your next adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={index}
              onClick={() => navigate(`/properties?city=${destination.name}`)}
              className="relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
            >
              <div className="w-full h-full">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {destination.name}
                </h3>
                <p className="text-sm text-white/90 mb-2">{destination.country}</p>
                <p className="text-sm text-white/80">{destination.properties} properties</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}