import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface BookingPanelProps {
  property: any;
}

export default function BookingPanel({ property }: BookingPanelProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const nights = calculateNights();
  const subtotal = nights * property.price;
  const serviceFee = subtotal * 0.1;
  const total = subtotal + serviceFee;

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    navigate(`/checkout/${property.id}?step=1&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  return (
    <div className="sticky top-24">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#EBEBEB]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-2xl font-bold text-[#222222]">${property.price}</span>
            <span className="text-sm text-[#717171]"> / night</span>
          </div>
          <div className="flex items-center gap-1">
            <i className="ri-star-fill text-[#FF385C]"></i>
            <span className="text-sm font-semibold text-[#222222]">{property.rating}</span>
            <span className="text-sm text-[#717171]">({property.reviews})</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-2">
            <div className="border border-[#DDDDDD] rounded-lg p-3">
              <label className="block text-xs font-semibold text-[#222222] mb-1">Check-in</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-sm text-[#222222] focus:outline-none cursor-pointer"
              />
            </div>
            <div className="border border-[#DDDDDD] rounded-lg p-3">
              <label className="block text-xs font-semibold text-[#222222] mb-1">Check-out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-sm text-[#222222] focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          <div className="border border-[#DDDDDD] rounded-lg p-3">
            <label className="block text-xs font-semibold text-[#222222] mb-1">Guests</label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#222222]">{guests} guests</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-[#DDDDDD] hover:border-[#222222] transition-colors cursor-pointer"
                >
                  <i className="ri-subtract-line text-[#222222]"></i>
                </button>
                <button
                  onClick={() => setGuests(Math.min(property.guests, guests + 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-[#DDDDDD] hover:border-[#222222] transition-colors cursor-pointer"
                >
                  <i className="ri-add-line text-[#222222]"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleReserve}
          className="w-full py-4 bg-[#FF385C] text-white rounded-xl font-semibold hover:bg-[#E31C5F] transition-all hover:scale-105 cursor-pointer whitespace-nowrap mb-4"
        >
          Reserve
        </button>

        <p className="text-xs text-center text-[#717171] mb-6">You won't be charged yet</p>

        {nights > 0 && (
          <div className="space-y-3 pt-6 border-t border-[#EBEBEB]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#717171]">
                ${property.price} × {nights} nights
              </span>
              <span className="text-[#222222] font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#717171]">Service fee</span>
              <span className="text-[#222222] font-semibold">${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-base font-bold pt-3 border-t border-[#EBEBEB]">
              <span className="text-[#222222]">Total</span>
              <span className="text-[#222222]">${total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 bg-[#FFF4F6] rounded-2xl p-4 border border-[#FFE0E6]">
        <div className="flex items-start gap-3">
          <i className="ri-shield-check-line text-[#FF385C] text-xl"></i>
          <div>
            <p className="text-sm font-semibold text-[#222222] mb-1">Secure Booking</p>
            <p className="text-xs text-[#717171]">
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}