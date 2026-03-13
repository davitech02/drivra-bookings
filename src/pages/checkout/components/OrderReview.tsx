import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Property {
  id: string;
  name: string;
  location: string;
  image: string;
  type: string;
  pricePerNight: number;
}

interface OrderReviewProps {
  property: Property;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  cancellationPolicy: string;
  pricePerNight: number;
  taxRate: number;
  serviceCharge: number;
  currency: string;
  onCurrencyChange: (currency: string) => void;
  onContinue: () => void;
}

export default function OrderReview({
  property,
  checkIn,
  checkOut,
  guests,
  nights,
  cancellationPolicy,
  pricePerNight,
  taxRate,
  serviceCharge,
  currency,
  onCurrencyChange,
  onContinue,
}: OrderReviewProps) {
  const [specialRequests, setSpecialRequests] = useState('');

  const subtotal = pricePerNight * nights;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes + serviceCharge;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getCancellationDate = () => {
    const checkInDate = new Date(checkIn);
    const cancellationDate = new Date(checkInDate);
    cancellationDate.setDate(cancellationDate.getDate() - 7);
    return cancellationDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT COLUMN - Order Details */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-[#222222] mb-6">Order Details</h2>

          <div className="flex gap-6 mb-6">
            <img
              src={property.image}
              alt={property.name}
              className="w-32 h-32 object-cover rounded-xl flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#222222] mb-2">{property.name}</h3>
              <p className="text-[#717171] mb-2 flex items-center gap-2">
                <i className="ri-map-pin-line"></i>
                {property.location}
              </p>
              <p className="text-[#222222] font-medium">{property.type}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-sm text-[#717171] mb-1">Check-in</p>
                <p className="text-[#222222] font-semibold flex items-center gap-2">
                  <i className="ri-calendar-line text-[#FF385C]"></i>
                  {formatDate(checkIn)}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#717171] mb-1">Check-out</p>
                <p className="text-[#222222] font-semibold flex items-center gap-2">
                  <i className="ri-calendar-line text-[#FF385C]"></i>
                  {formatDate(checkOut)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-[#717171] mb-1">Number of Nights</p>
                <p className="text-[#222222] font-semibold">
                  {nights} {nights === 1 ? 'night' : 'nights'}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#717171] mb-1">Number of Guests</p>
                <p className="text-[#222222] font-semibold flex items-center gap-2">
                  <i className="ri-user-line text-[#FF385C]"></i>
                  {guests} {guests === 1 ? 'guest' : 'guests'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <i className="ri-shield-check-line text-2xl text-green-600"></i>
              <div>
                <p className="font-semibold text-green-800">Free Cancellation</p>
                <p className="text-sm text-green-700">
                  Cancel before {getCancellationDate()} for a full refund
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <label className="block text-[#222222] font-semibold mb-3">
              Special Requests{' '}
              <span className="text-[#717171] font-normal">(Optional)</span>
            </label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any special requests or requirements? (e.g., early check-in, extra pillows, dietary restrictions)"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent resize-none text-sm"
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-[#717171] mt-2">
              {specialRequests.length}/500 characters
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - Price Summary (Sticky) */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
          <h3 className="text-xl font-bold text-[#222222] mb-6">Order Summary</h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-[#222222]">
              <span>${pricePerNight} × {nights} nights</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#222222]">
              <span>Taxes &amp; fees (10%)</span>
              <span className="font-semibold">${taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#222222]">
              <span>Service charge</span>
              <span className="font-semibold">${serviceCharge.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-[#222222] text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-[#FF385C]">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-[#717171] mb-2">Currency</label>
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent text-sm cursor-pointer"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="NGN">NGN - Nigerian Naira</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>

          <button
            onClick={onContinue}
            className="w-full bg-[#FF385C] text-white py-4 rounded-xl font-semibold hover:bg-[#E31C47] transition-colors mb-6 whitespace-nowrap cursor-pointer"
          >
            Continue to Guest Details
          </button>

          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center text-center">
                <i className="ri-lock-line text-2xl text-[#FF385C] mb-2"></i>
                <p className="text-xs text-[#717171] font-medium">Secure Payment</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <i className="ri-shield-check-line text-2xl text-[#FF385C] mb-2"></i>
                <p className="text-xs text-[#717171] font-medium">Verified Listings</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <i className="ri-customer-service-2-line text-2xl text-[#FF385C] mb-2"></i>
                <p className="text-xs text-[#717171] font-medium">24/7 Support</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <i className="ri-refund-2-line text-2xl text-[#FF385C] mb-2"></i>
                <p className="text-xs text-[#717171] font-medium">Easy Refunds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
