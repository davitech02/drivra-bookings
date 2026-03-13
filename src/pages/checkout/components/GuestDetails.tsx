import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface GuestDetailsProps {
  property: {
    id: string;
    name: string;
    location: string;
    price?: number;
  };
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  currency: string;
  onContinue: (info: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    specialRequests: string;
  }, method: 'flutterwave' | 'interswitch') => void;
}

export default function GuestDetails({
  property,
  checkIn,
  checkOut,
  guests,
  total,
  currency,
  onContinue,
}: GuestDetailsProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    numberOfGuests: guests.toString(),
    specialRequests: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'flutterwave' | 'interswitch' | ''>('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const countries = [
    'Nigeria', 'South Africa', 'Kenya', 'Ghana', 'Egypt',
    'United States', 'United Kingdom', 'Canada', 'Australia',
    'United Arab Emirates', 'France', 'Germany', 'Spain', 'Italy'
  ].sort();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.numberOfGuests) newErrors.numberOfGuests = 'Number of guests is required';
    if (!paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
    if (!agreedToTerms) newErrors.terms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onContinue(
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          specialRequests: formData.specialRequests,
        },
        paymentMethod as 'flutterwave' | 'interswitch'
      );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT COLUMN - Guest Information Form */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-2xl font-bold text-[#222222]">Guest Information</h2>
            <p className="text-sm text-[#717171] mt-1">Please provide your details for the booking</p>
          </div>

          {/* Personal Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-[#222222] mb-2">
                First Name <span className="text-[#FF385C]">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent text-sm ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#222222] mb-2">
                Last Name <span className="text-[#FF385C]">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent text-sm ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#222222] mb-2">
                Email Address <span className="text-[#FF385C]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent text-sm ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#222222] mb-2">
                Phone Number <span className="text-[#FF385C]">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent text-sm ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+234 800 000 0000"
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-[#222222] mb-2">
                Country/Region <span className="text-[#FF385C]">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent text-sm cursor-pointer ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select your country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && (
                <p className="text-xs text-red-500 mt-1">{errors.country}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#222222] mb-2">
                Number of Guests <span className="text-[#FF385C]">*</span>
              </label>
              <input
                type="number"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleInputChange}
                min="1"
                max="20"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent text-sm ${
                  errors.numberOfGuests ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.numberOfGuests && (
                <p className="text-xs text-red-500 mt-1">{errors.numberOfGuests}</p>
              )}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-[#222222] mb-2">
              Special Requests <span className="text-[#717171] font-normal">(Optional)</span>
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              placeholder="Any additional requests or requirements?"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent resize-none text-sm"
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-[#717171] mt-2">
              {formData.specialRequests.length}/500 characters
            </p>
          </div>

          {/* Payment Method Selection */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-[#222222] mb-4">Select Payment Method</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Flutterwave Card */}
              <div
                onClick={() => {
                  setPaymentMethod('flutterwave');
                  if (errors.paymentMethod) {
                    setErrors(prev => ({ ...prev, paymentMethod: '' }));
                  }
                }}
                className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg ${
                  paymentMethod === 'flutterwave'
                    ? 'border-[#FF385C] bg-[#FFF5F7]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {paymentMethod === 'flutterwave' && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-[#FF385C] rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white text-sm"></i>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#FEB72C] rounded-lg flex items-center justify-center">
                    <i className="ri-bank-card-line text-2xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#222222]">Flutterwave</h4>
                  </div>
                </div>
                <p className="text-sm text-[#717171]">Cards, Bank Transfer, USSD</p>
              </div>

              {/* Interswitch Card */}
              <div
                onClick={() => {
                  setPaymentMethod('interswitch');
                  if (errors.paymentMethod) {
                    setErrors(prev => ({ ...prev, paymentMethod: '' }));
                  }
                }}
                className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg ${
                  paymentMethod === 'interswitch'
                    ? 'border-[#FF385C] bg-[#FFF5F7]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {paymentMethod === 'interswitch' && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-[#FF385C] rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white text-sm"></i>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#D32F2F] rounded-lg flex items-center justify-center">
                    <i className="ri-secure-payment-line text-2xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#222222]">Interswitch</h4>
                  </div>
                </div>
                <p className="text-sm text-[#717171]">Cards & Bank Transfer</p>
              </div>
            </div>

            {errors.paymentMethod && (
              <p className="text-sm text-red-500 mb-4">{errors.paymentMethod}</p>
            )}

            {/* Terms & Conditions Checkbox */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    if (errors.terms) {
                      setErrors(prev => ({ ...prev, terms: '' }));
                    }
                  }}
                  className="mt-1 w-5 h-5 text-[#FF385C] border-gray-300 rounded focus:ring-[#FF385C] cursor-pointer"
                />
                <span className="text-sm text-[#222222]">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTermsModal(true);
                    }}
                    className="text-[#FF385C] font-semibold hover:underline"
                  >
                    Terms & Conditions
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTermsModal(true);
                    }}
                    className="text-[#FF385C] font-semibold hover:underline"
                  >
                    Refund Policy
                  </button>
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-red-500 mt-2 ml-8">{errors.terms}</p>
              )}
            </div>

            <button
              onClick={handleContinue}
              disabled={!agreedToTerms}
              className={`w-full py-4 rounded-xl font-semibold transition-colors whitespace-nowrap ${
                agreedToTerms
                  ? 'bg-[#FF385C] text-white hover:bg-[#E31C47] cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - Collapsed Order Summary (Sticky) */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
          <h3 className="text-lg font-bold text-[#222222] mb-4">Order Summary</h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-[#222222] mb-1">{property.name}</p>
              <p className="text-sm text-[#717171]">{property.location}</p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#717171]">Check-in</span>
                <span className="text-[#222222] font-medium">{formatDate(checkIn)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#717171]">Check-out</span>
                <span className="text-[#222222] font-medium">{formatDate(checkOut)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#717171]">Guests</span>
                <span className="text-[#222222] font-medium">{guests}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg">
                <span className="font-bold text-[#222222]">Total</span>
                <span className="font-bold text-[#FF385C]">{currency} {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-[#717171]">
              <i className="ri-information-line text-[#FF385C]"></i>
              <span>Your booking is protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#222222]">Terms & Conditions</h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-2xl text-[#717171]"></i>
              </button>
            </div>
            
            <div className="prose prose-sm text-[#222222] space-y-4">
              <p>By making a booking with Drivra Bookings, you agree to the following terms:</p>
              
              <h4 className="font-bold mt-4">Booking Policy</h4>
              <p>All bookings are subject to availability and confirmation. Payment must be completed to secure your reservation.</p>
              
              <h4 className="font-bold mt-4">Cancellation Policy</h4>
              <p>Free cancellation is available up to 7 days before check-in. Cancellations made within 7 days of check-in may incur charges.</p>
              
              <h4 className="font-bold mt-4">Refund Policy</h4>
              <p>Refunds for eligible cancellations will be processed within 5-10 business days to the original payment method.</p>
              
              <h4 className="font-bold mt-4">Guest Responsibilities</h4>
              <p>Guests are responsible for any damages to the property during their stay. Additional charges may apply for violations of property rules.</p>
            </div>

            <button
              onClick={() => setShowTermsModal(false)}
              className="w-full mt-6 bg-[#FF385C] text-white py-3 rounded-xl font-semibold hover:bg-[#E31C47] transition-colors whitespace-nowrap cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}