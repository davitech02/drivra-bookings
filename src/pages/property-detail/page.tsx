import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import ImageGallery from './components/ImageGallery';
import PropertyInfo from './components/PropertyInfo';
import BookingPanel from './components/BookingPanel';
import Reviews from './components/Reviews';
import { getPropertyById } from '../../utils/propertyStorage';

export default function PropertyDetail() {
  const { id } = useParams();
  const [showGallery, setShowGallery] = useState(false);
  const propertyDetails = getPropertyById(id);

  const fallbackGalleryImages = [
    propertyDetails?.image ?? '',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1505691723518-36a2fbabd7c5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  ];

  const galleryImages =
    propertyDetails?.images && propertyDetails.images.length >= 4
      ? propertyDetails.images
      : [
          ...(propertyDetails?.images ?? []),
          propertyDetails?.image ?? '',
          ...fallbackGalleryImages,
        ]
          .filter(Boolean)
          .slice(0, 4);
  if (!propertyDetails) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#222222] mb-4">Property not found</h1>
          <p className="text-gray-600 mb-6">The property you are looking for does not exist or has been removed.</p>
          <Link to="/properties" className="px-6 py-3 bg-[#FF385C] text-white rounded-xl font-semibold hover:bg-[#E31C5F] transition-all">
            Browse Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6">
            <h1
              className="text-3xl md:text-4xl font-bold text-[#222222] mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {propertyDetails.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <i className="ri-star-fill text-[#FF385C]"></i>
                <span className="font-semibold text-[#222222]">{propertyDetails.rating}</span>
                <span className="text-[#717171]">({propertyDetails.reviews} reviews)</span>
              </div>
              <span className="text-[#717171]">•</span>
              <div className="flex items-center gap-1 text-[#717171]">
                <i className="ri-map-pin-line"></i>
                <span>{propertyDetails.location}</span>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <ImageGallery
            images={galleryImages}
            onViewAll={() => setShowGallery(true)}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <PropertyInfo property={propertyDetails} />
              <Reviews />
            </div>

            <div className="lg:col-span-1">
              <BookingPanel property={propertyDetails} />
            </div>
          </div>
        </div>
      </div>

      {showGallery && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all cursor-pointer z-10"
          >
            <i className="ri-close-line text-2xl text-white"></i>
          </button>
          <div className="max-w-6xl w-full px-4">
            <div className="grid grid-cols-1 gap-4 max-h-screen overflow-y-auto py-20">
              {galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full rounded-2xl"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}