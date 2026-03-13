interface FinalOrderSummaryProps {
  propertyImage: string;
  propertyName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  pricePerNight: number;
  nights: number;
  taxRate: number;
  serviceCharge: number;
  currency: string;
}

export default function FinalOrderSummary({
  propertyImage,
  propertyName,
  location,
  checkIn,
  checkOut,
  guests,
  pricePerNight,
  nights,
  taxRate,
  serviceCharge,
  currency,
}: FinalOrderSummaryProps) {
  const subtotal = pricePerNight * nights;
  const tax = subtotal * taxRate;
  const total = subtotal + tax + serviceCharge;

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
      {/* Property Image */}
      <div className="mb-4">
        <img
          src={propertyImage}
          alt={propertyName}
          className="w-full h-48 object-cover rounded-xl"
        />
      </div>

      {/* Property Details */}
      <div className="mb-6 pb-6 border-b border-[#E5E5E5]">
        <h3 className="font-bold text-lg text-[#222222] mb-1">{propertyName}</h3>
        <p className="text-sm text-[#717171] flex items-center gap-1">
          <i className="ri-map-pin-line"></i>
          {location}
        </p>
      </div>

      {/* Booking Details */}
      <div className="mb-6 pb-6 border-b border-[#E5E5E5] space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#717171]">Check-in</span>
          <span className="font-semibold text-[#222222]">{checkIn}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#717171]">Check-out</span>
          <span className="font-semibold text-[#222222]">{checkOut}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#717171]">Guests</span>
          <span className="font-semibold text-[#222222]">{guests} {guests === 1 ? 'guest' : 'guests'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#717171]">Nights</span>
          <span className="font-semibold text-[#222222]">{nights} {nights === 1 ? 'night' : 'nights'}</span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#717171]">
            {currencySymbol}{pricePerNight.toFixed(2)} × {nights} {nights === 1 ? 'night' : 'nights'}
          </span>
          <span className="text-[#222222]">{currencySymbol}{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#717171]">Taxes & fees ({(taxRate * 100).toFixed(0)}%)</span>
          <span className="text-[#222222]">{currencySymbol}{tax.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#717171]">Service charge</span>
          <span className="text-[#222222]">{currencySymbol}{serviceCharge.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="pt-4 border-t-2 border-[#E5E5E5] mb-6">
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-[#222222]">Total</span>
          <span className="font-bold text-2xl text-[#FF385C]">
            {currencySymbol}{total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Need Help Link */}
      <div className="text-center">
        <a
          href="/contact"
          className="text-[#FF385C] text-sm font-semibold hover:underline inline-flex items-center gap-1 whitespace-nowrap"
        >
          <i className="ri-customer-service-2-line"></i>
          Need help?
        </a>
      </div>
    </div>
  );
}