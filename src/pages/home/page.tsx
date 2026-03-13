import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import SearchBar from './components/SearchBar';
import FeaturedStays from './components/FeaturedStays';
import PopularDestinations from './components/PopularDestinations';
import HowItWorks from './components/HowItWorks';
import TrustStats from './components/TrustStats';

const heroImages = [
  'https://readdy.ai/api/search-image?query=luxury%20tropical%20beach%20resort%20with%20palm%20trees%20and%20infinity%20pool%20at%20sunset%2C%20pristine%20white%20sand%2C%20turquoise%20ocean%2C%20modern%20architecture%2C%20professional%20travel%20photography%2C%20clean%20simple%20background%2C%20warm%20golden%20hour%20lighting%2C%20paradise%20destination%20atmosphere&width=1920&height=1080&seq=hero1&orientation=landscape',
  'https://readdy.ai/api/search-image?query=modern%20luxury%20hotel%20interior%20lobby%20with%20high%20ceilings%2C%20elegant%20furniture%2C%20marble%20floors%2C%20large%20windows%20with%20city%20view%2C%20professional%20interior%20photography%2C%20clean%20simple%20background%2C%20sophisticated%20ambient%20lighting%2C%20five%20star%20hotel%20atmosphere&width=1920&height=1080&seq=hero2&orientation=landscape',
  'https://readdy.ai/api/search-image?query=cozy%20mountain%20cabin%20retreat%20with%20wooden%20deck%2C%20forest%20landscape%2C%20misty%20mountains%20background%2C%20warm%20interior%20lighting%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background%2C%20peaceful%20evening%20atmosphere%2C%20inviting%20getaway%20destination&width=1920&height=1080&seq=hero3&orientation=landscape',
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F7]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
          </div>
        ))}

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="text-center mb-12">
            <h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Find Your Perfect Stay
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Discover unique homes, hotels, and experiences around the world
            </p>
          </div>

          <SearchBar />

          <div className="mt-16 flex items-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">10,000+</p>
              <p className="text-sm text-white/80">Properties</p>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">50,000+</p>
              <p className="text-sm text-white/80">Happy Guests</p>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">150+</p>
              <p className="text-sm text-white/80">Cities</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all cursor-pointer animate-bounce"
          >
            <i className="ri-arrow-down-line text-2xl text-white"></i>
          </button>
        </div>
      </section>

      <FeaturedStays />
      <PopularDestinations />
      <HowItWorks />
      <TrustStats />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#FF385C] to-[#E31C5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of travelers who have found their perfect stay with Drivra Bookings
          </p>
          <button
            onClick={() => navigate('/properties')}
            className="px-10 py-4 bg-white text-[#FF385C] rounded-xl font-semibold text-lg hover:bg-[#F7F7F7] hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
          >
            Explore Properties
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}