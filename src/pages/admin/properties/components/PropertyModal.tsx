import { useState, useEffect } from 'react';

interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  images?: string[];
  type: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  amenities: string[];
  status: 'active' | 'inactive';
}

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onSave: (property: Property) => void;
}

const PROPERTY_TYPES = [
  'Apartment',
  'House',
  'Villa',
  'Condo',
  'Studio',
  'Loft',
  'Townhouse',
  'Cottage'
];

const AMENITIES_LIST = [
  'WiFi',
  'Kitchen',
  'Air Conditioning',
  'Heating',
  'Parking',
  'Pool',
  'Gym',
  'TV',
  'Washer',
  'Dryer',
  'Balcony',
  'Garden',
  'Hot Tub',
  'BBQ Grill',
  'Fireplace',
  'Workspace',
  'Pet Friendly',
  'Smoking Allowed'
];

export default function PropertyModal({ property, onClose, onSave }: PropertyModalProps) {
  const [formData, setFormData] = useState<Property>({
    id: property?.id || '',
    name: property?.name || '',
    location: property?.location || '',
    price: property?.price || 0,
    rating: property?.rating || 0,
    image: property?.image || '',
    images: property?.images || [''],
    type: property?.type || 'Apartment',
    guests: property?.guests || 1,
    bedrooms: property?.bedrooms || 1,
    bathrooms: property?.bathrooms || 1,
    description: property?.description || '',
    amenities: property?.amenities || [],
    status: property?.status || 'active'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (field: keyof Property, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...(formData.images || [''])];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages, image: newImages[0] }));
  };

  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...(prev.images || ['']), ''] }));
  };

  const removeImageField = (index: number) => {
    const newImages = (formData.images || ['']).filter((_, i) => i !== index);
    setFormData(prev => ({ 
      ...prev, 
      images: newImages.length > 0 ? newImages : [''],
      image: newImages[0] || ''
    }));
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter(a => a !== amenity)
      : [...formData.amenities, amenity];
    setFormData(prev => ({ ...prev, amenities: newAmenities }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Property name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.image.trim()) newErrors.image = 'At least one image is required';
    if (!formData.type) newErrors.type = 'Property type is required';
    if (formData.guests < 1) newErrors.guests = 'Must accommodate at least 1 guest';
    if (formData.bedrooms < 1) newErrors.bedrooms = 'Must have at least 1 bedroom';
    if (formData.bathrooms < 1) newErrors.bathrooms = 'Must have at least 1 bathroom';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {property ? 'Edit Property' : 'Add New Property'}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl text-gray-600"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Luxury Beachfront Villa"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Cape Town, South Africa"
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] ${
                      errors.type ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {PROPERTY_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price per Night (R) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange('price', Number(e.target.value))}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 1200"
                    min="0"
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rating (Optional)
                  </label>
                  <input
                    type="number"
                    value={formData.rating}
                    onChange={(e) => handleChange('rating', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
                    placeholder="e.g., 4.8"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Capacity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Capacity</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Guests *
                  </label>
                  <input
                    type="number"
                    value={formData.guests}
                    onChange={(e) => handleChange('guests', Number(e.target.value))}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] ${
                      errors.guests ? 'border-red-500' : 'border-gray-300'
                    }`}
                    min="1"
                  />
                  {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bedrooms *
                  </label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => handleChange('bedrooms', Number(e.target.value))}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] ${
                      errors.bedrooms ? 'border-red-500' : 'border-gray-300'
                    }`}
                    min="1"
                  />
                  {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bathrooms *
                  </label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => handleChange('bathrooms', Number(e.target.value))}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] ${
                      errors.bathrooms ? 'border-red-500' : 'border-gray-300'
                    }`}
                    min="1"
                  />
                  {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>}
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Images</h3>
              <div className="space-y-3">
                {(formData.images || ['']).map((image, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] ${
                          index === 0 && errors.image ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter image URL"
                      />
                      {index === 0 && errors.image && (
                        <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                      )}
                    </div>
                    {image && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-300">
                        <img src={image} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    {(formData.images || ['']).length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors cursor-pointer"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-[#FF385C] font-semibold flex items-center gap-2 hover:text-[#E31C5F] transition-colors cursor-pointer"
                >
                  <i className="ri-add-line text-xl"></i>
                  Add Another Image
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={4}
                placeholder="Describe the property, its features, and what makes it special..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {AMENITIES_LIST.map(amenity => (
                  <label
                    key={amenity}
                    className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="w-5 h-5 text-[#FF385C] rounded focus:ring-[#FF385C] cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-[#FF385C] text-white rounded-lg font-semibold hover:bg-[#E31C5F] transition-colors whitespace-nowrap cursor-pointer"
          >
            {property ? 'Update Property' : 'Add Property'}
          </button>
        </div>
      </div>
    </div>
  );
}