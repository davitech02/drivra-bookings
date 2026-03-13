import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';

export default function ConfirmationPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [showCheckmark, setShowCheckmark] = useState(false);

  // Mock booking data - in production, fetch from API
  const [bookingData] = useState({
    bookingReference: `DRV-${bookingId?.toUpperCase()}-2024`,
    email: 'guest@example.com',
    property: {
      name: 'Luxury Beachfront Villa',
      location: 'Lagos, Nigeria',
    },
    checkIn: '2024-03-15',
    checkOut: '2024-03-17',
    guests: 2,
    totalAmount: 240.00,
    currency: 'USD',
  });

  useEffect(() => {
    // Trigger checkmark animation after mount
    setTimeout(() => setShowCheckmark(true), 100);
  }, []);

  const handleDownloadReceipt = () => {
    // In production: GET /api/bookings/:id/receipt
    alert('Receipt download will be implemented with backend integration');
  };

  const handleViewBookings = () => {
    navigate('/dashboard');
  };

  const handleBackHome = () => {
    navigate('/');
  };

  const currencySymbol = bookingData.currency === 'USD' ? '$' : bookingData.currency === 'EUR' ? '€' : '£';

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Animation & Message */}
          <div className="text-center mb-8">
            {/* Animated Checkmark */}
            <div className="flex justify-center mb-6">
              <div className={`w-24 h-24 rounded-full bg-[#10B981] flex items-center justify-center transition-all duration-500 ${showCheckmark ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <i className="ri-check-line text-5xl text-white animate-bounce"></i>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-bold text-[#222222] mb-3">
              Booking Confirmed!
            </h1>
            
            {/* Subtext */}
            <p className="text-lg text-[#717171]">
              A confirmation has been sent to <span className="font-semibold text-[#222222]">{bookingData.email}</span>
            </p>
          </div>

          {/* Booking Reference Card */}
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border-2 border-[#E5E5E5]">
            <div className="text-center mb-6 pb-6 border-b border-[#E5E5E5]">
              <p className="text-sm text-[#717171] mb-2">Booking Reference</p>
              <p className="text-3xl font-bold text-[#FF385C] tracking-wider">
                {bookingData.bookingReference}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#717171] mb-1">Property</p>
                  <p className="font-semibold text-[#222222]">{bookingData.property.name}</p>
                  <p className="text-sm text-[#717171] flex items-center gap-1">
                    <i className="ri-map-pin-line"></i>
                    {bookingData.property.location}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#717171] mb-1">Check-in</p>
                  <p className="font-semibold text-[#222222]">{bookingData.checkIn}</p>
                </div>

                <div>
                  <p className="text-sm text-[#717171] mb-1">Check-out</p>
                  <p className="font-semibold text-[#222222]">{bookingData.checkOut}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#717171] mb-1">Guests</p>
                  <p className="font-semibold text-[#222222]">
                    {bookingData.guests} {bookingData.guests === 1 ? 'guest' : 'guests'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#717171] mb-1">Total Amount Paid</p>
                  <p className="text-2xl font-bold text-[#222222]">
                    {currencySymbol}{bookingData.totalAmount.toFixed(2)} {bookingData.currency}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[#10B981] text-sm">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span className="font-semibold">Payment Successful</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              type="button"
              onClick={handleDownloadReceipt}
              className="flex-1 bg-white text-[#222222] font-semibold py-4 px-6 rounded-xl border-2 border-[#E5E5E5] hover:border-[#FF385C] hover:text-[#FF385C] transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i className="ri-download-line text-xl"></i>
              Download Receipt
            </button>

            <button
              type="button"
              onClick={handleViewBookings}
              className="flex-1 bg-[#FF385C] text-white font-semibold py-4 px-6 rounded-xl hover:bg-[#E31C5F] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i className="ri-calendar-check-line text-xl"></i>
              View My Bookings
            </button>

            <button
              type="button"
              onClick={handleBackHome}
              className="flex-1 bg-white text-[#222222] font-semibold py-4 px-6 rounded-xl border-2 border-[#E5E5E5] hover:border-[#222222] transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i className="ri-home-line text-xl"></i>
              Back to Home
            </button>
          </div>

          {/* What's Next Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#222222] mb-6 text-center">
              What's Next?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-[#FF385C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-mail-line text-3xl text-[#FF385C]"></i>
                </div>
                <h3 className="font-bold text-lg text-[#222222] mb-2">
                  Check Your Email
                </h3>
                <p className="text-sm text-[#717171]">
                  We've sent you a detailed confirmation with all booking information and check-in instructions.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-[#FF385C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-luggage-cart-line text-3xl text-[#FF385C]"></i>
                </div>
                <h3 className="font-bold text-lg text-[#222222] mb-2">
                  Prepare for Check-in
                </h3>
                <p className="text-sm text-[#717171]">
                  Review the property rules and prepare your ID. Check-in time starts at 3:00 PM.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-[#FF385C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-message-3-line text-3xl text-[#FF385C]"></i>
                </div>
                <h3 className="font-bold text-lg text-[#222222] mb-2">
                  Contact Host
                </h3>
                <p className="text-sm text-[#717171]">
                  Have questions? You can message your host directly through your booking dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Support Notice */}
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-[#717171] mb-2">
              Need assistance with your booking?
            </p>
            <a
              href="/contact"
              className="text-[#FF385C] font-semibold hover:underline inline-flex items-center gap-2 whitespace-nowrap"
            >
              <i className="ri-customer-service-2-line text-xl"></i>
              Contact Our Support Team
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}