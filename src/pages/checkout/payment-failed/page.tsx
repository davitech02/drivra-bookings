import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';

export default function PaymentFailedPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);

  // Mock failure data - in production, fetch from API
  const [failureData] = useState({
    bookingReference: `DRV-${bookingId?.toUpperCase()}-2024`,
    property: {
      name: 'Luxury Beachfront Villa',
      location: 'Lagos, Nigeria',
    },
    checkIn: '2024-03-15',
    checkOut: '2024-03-17',
    guests: 2,
    totalAmount: 240.00,
    currency: 'USD',
    failureReason: 'Insufficient funds',
    errorCode: 'PAYMENT_DECLINED',
    timestamp: new Date().toLocaleString(),
  });

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setShowAnimation(true), 100);
  }, []);

  const handleTryAgain = () => {
    // Return to payment step with same booking data
    navigate(`/checkout/${bookingId}?step=3`);
  };

  const handleChangeMethod = () => {
    // Return to guest details step to change payment method
    navigate(`/checkout/${bookingId}?step=2`);
  };

  const handleContactSupport = () => {
    navigate('/contact');
  };

  const currencySymbol = failureData.currency === 'USD' ? '$' : failureData.currency === 'EUR' ? '€' : '£';

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Failure Animation & Message */}
          <div className="text-center mb-8">
            {/* Animated X Icon */}
            <div className="flex justify-center mb-6">
              <div className={`w-24 h-24 rounded-full bg-[#EF4444] flex items-center justify-center transition-all duration-500 ${showAnimation ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <i className="ri-close-line text-5xl text-white animate-pulse"></i>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-bold text-[#222222] mb-3">
              Payment Failed
            </h1>
            
            {/* Subtext */}
            <p className="text-lg text-[#717171]">
              We couldn't process your payment. Please try again or use a different payment method.
            </p>
          </div>

          {/* Error Details Card */}
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border-2 border-[#EF4444]/20">
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-[#E5E5E5]">
              <div className="w-12 h-12 bg-[#EF4444]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-error-warning-line text-2xl text-[#EF4444]"></i>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#222222] mb-2">
                  Payment Declined
                </h3>
                <p className="text-[#717171] mb-2">
                  <span className="font-semibold text-[#222222]">Reason:</span> {failureData.failureReason}
                </p>
                <p className="text-sm text-[#717171]">
                  <span className="font-semibold text-[#222222]">Error Code:</span> {failureData.errorCode}
                </p>
                <p className="text-sm text-[#717171]">
                  <span className="font-semibold text-[#222222]">Time:</span> {failureData.timestamp}
                </p>
              </div>
            </div>

            {/* Booking Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#717171] mb-1">Property</p>
                  <p className="font-semibold text-[#222222]">{failureData.property.name}</p>
                  <p className="text-sm text-[#717171] flex items-center gap-1">
                    <i className="ri-map-pin-line"></i>
                    {failureData.property.location}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#717171] mb-1">Check-in</p>
                  <p className="font-semibold text-[#222222]">{failureData.checkIn}</p>
                </div>

                <div>
                  <p className="text-sm text-[#717171] mb-1">Check-out</p>
                  <p className="font-semibold text-[#222222]">{failureData.checkOut}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#717171] mb-1">Guests</p>
                  <p className="font-semibold text-[#222222]">
                    {failureData.guests} {failureData.guests === 1 ? 'guest' : 'guests'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#717171] mb-1">Amount Attempted</p>
                  <p className="text-2xl font-bold text-[#222222]">
                    {currencySymbol}{failureData.totalAmount.toFixed(2)} {failureData.currency}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[#EF4444] text-sm">
                  <i className="ri-close-circle-fill"></i>
                  <span className="font-semibold">Payment Not Processed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              type="button"
              onClick={handleTryAgain}
              className="flex-1 bg-[#FF385C] text-white font-semibold py-4 px-6 rounded-xl hover:bg-[#E31C5F] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i className="ri-refresh-line text-xl"></i>
              Try Again
            </button>

            <button
              type="button"
              onClick={handleChangeMethod}
              className="flex-1 bg-white text-[#222222] font-semibold py-4 px-6 rounded-xl border-2 border-[#E5E5E5] hover:border-[#FF385C] hover:text-[#FF385C] transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i className="ri-bank-card-line text-xl"></i>
              Change Payment Method
            </button>

            <button
              type="button"
              onClick={handleContactSupport}
              className="flex-1 bg-white text-[#222222] font-semibold py-4 px-6 rounded-xl border-2 border-[#E5E5E5] hover:border-[#222222] transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i className="ri-customer-service-2-line text-xl"></i>
              Contact Support
            </button>
          </div>

          {/* Common Reasons Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#222222] mb-6 text-center">
              Common Reasons for Payment Failure
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Reason 1 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-[#717171]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-wallet-3-line text-3xl text-[#717171]"></i>
                </div>
                <h3 className="font-bold text-lg text-[#222222] mb-2 text-center">
                  Insufficient Funds
                </h3>
                <p className="text-sm text-[#717171] text-center">
                  Your card may not have enough balance. Please check your account or try a different card.
                </p>
              </div>

              {/* Reason 2 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-[#717171]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-shield-cross-line text-3xl text-[#717171]"></i>
                </div>
                <h3 className="font-bold text-lg text-[#222222] mb-2 text-center">
                  Card Declined
                </h3>
                <p className="text-sm text-[#717171] text-center">
                  Your bank may have declined the transaction. Contact your bank or try another payment method.
                </p>
              </div>

              {/* Reason 3 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-[#717171]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-information-line text-3xl text-[#717171]"></i>
                </div>
                <h3 className="font-bold text-lg text-[#222222] mb-2 text-center">
                  Incorrect Details
                </h3>
                <p className="text-sm text-[#717171] text-center">
                  Card number, CVV, or expiry date may be incorrect. Double-check your payment information.
                </p>
              </div>
            </div>
          </div>

          {/* Help Notice */}
          <div className="bg-[#FEF3C7] rounded-xl shadow-md p-6 border-2 border-[#FCD34D]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#F59E0B] rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-lightbulb-line text-2xl text-white"></i>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#222222] mb-2">
                  Need Help?
                </h3>
                <p className="text-[#717171] mb-3">
                  Our support team is available 24/7 to assist you with payment issues. We can help you complete your booking.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[#FF385C] font-semibold hover:underline whitespace-nowrap"
                  >
                    <i className="ri-mail-line text-xl"></i>
                    Email Support
                  </a>
                  <span className="hidden sm:inline text-[#717171]">|</span>
                  <a
                    href="tel:+1234567890"
                    className="inline-flex items-center gap-2 text-[#FF385C] font-semibold hover:underline whitespace-nowrap"
                  >
                    <i className="ri-phone-line text-xl"></i>
                    Call Us: +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}