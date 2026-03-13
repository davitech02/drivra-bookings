import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../config/axios';

interface PaymentPanelProps {
  bookingId: string;
  paymentMethod: 'flutterwave' | 'interswitch';
  totalAmount: number;
  currency: string;
  onChangeMethod: () => void;
}

export default function PaymentPanel({
  bookingId,
  paymentMethod,
  totalAmount,
  currency,
  onChangeMethod,
}: PaymentPanelProps) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const paymentMethodDetails = {
    flutterwave: {
      name: 'Flutterwave',
      logo: 'https://readdy.ai/api/search-image?query=flutterwave%20payment%20gateway%20logo%20icon%20yellow%20and%20black%20simple%20clean%20white%20background%20professional%20fintech%20branding&width=120&height=60&seq=flutterwave-logo-001&orientation=landscape',
    },
    interswitch: {
      name: 'Interswitch',
      logo: 'https://readdy.ai/api/search-image?query=interswitch%20payment%20gateway%20logo%20icon%20red%20and%20white%20simple%20clean%20white%20background%20professional%20fintech%20branding&width=120&height=60&seq=interswitch-logo-001&orientation=landscape',
    },
  };

  const selectedMethod = paymentMethodDetails[paymentMethod];

  const handleProceedToPayment = async () => {
    setIsProcessing(true);
    setError('');

    try {
      // Get guest details from localStorage (saved during checkout)
      const guestDetails = localStorage.getItem('guestDetails');
      const guest = guestDetails ? JSON.parse(guestDetails) : {};

      // Call backend to initiate Flutterwave payment
      const response = await axios.post('/api/payments/initiate', {
        booking_id: bookingId,
        customer_name: guest.name || 'Guest',
        customer_email: guest.email || 'guest@example.com',
        customer_phone: guest.phone || '+1234567890',
      });

      if (response.data.success && response.data.payment_url) {
        // Redirect to Flutterwave hosted payment page
        window.location.href = response.data.payment_url;
      } else {
        setError('Failed to initiate payment. Please try again.');
        setIsProcessing(false);
      }
    } catch (err: any) {
      console.error('Payment initiation error:', err);
      setError(err.response?.data?.error || 'Payment initiation failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    navigate(`/checkout/${bookingId}?step=2`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-[#222222] mb-6">
        Complete Your Payment
      </h2>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <i className="ri-error-warning-line text-lg text-red-600 mt-0.5"></i>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Selected Payment Method */}
      <div className="mb-8">
        <div className="flex items-center justify-between p-4 border-2 border-[#E5E5E5] rounded-xl">
          <div className="flex items-center gap-4">
            <img
              src={selectedMethod.logo}
              alt={selectedMethod.name}
              className="w-24 h-12 object-contain"
            />
            <div>
              <p className="font-semibold text-[#222222]">{selectedMethod.name}</p>
              <p className="text-sm text-[#717171]">Selected payment method</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onChangeMethod}
            className="text-[#FF385C] font-semibold hover:underline whitespace-nowrap"
          >
            Change
          </button>
        </div>
      </div>

      {/* Amount Due */}
      <div className="mb-8 text-center py-6 bg-[#F7F7F7] rounded-xl">
        <p className="text-sm text-[#717171] mb-2">Amount Due</p>
        <p className="text-4xl font-bold text-[#222222]">
          {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'}
          {totalAmount.toFixed(2)} {currency}
        </p>
      </div>

      {/* Security Notice */}
      <div className="mb-6 p-4 bg-[#F0F0F0] rounded-lg flex items-center gap-3">
        <i className="ri-lock-line text-xl text-[#717171]"></i>
        <p className="text-sm text-[#717171]">
          Your payment is encrypted and secured by SSL
        </p>
      </div>

      {/* Proceed to Payment Button */}
      <button
        type="button"
        onClick={handleProceedToPayment}
        disabled={isProcessing}
        className="w-full bg-[#FF385C] text-white font-semibold py-4 rounded-xl hover:bg-[#E31C5F] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 mb-4 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <i className="ri-loader-4-line animate-spin text-xl"></i>
            Processing...
          </>
        ) : (
          <>
            <i className="ri-lock-line text-xl"></i>
            Proceed to Secure Payment
          </>
        )}
      </button>

      {/* Accepted Payment Cards */}
      <div className="mb-6">
        <p className="text-xs text-[#717171] text-center mb-3">We accept</p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-8 bg-white border border-[#E5E5E5] rounded flex items-center justify-center">
            <i className="ri-visa-line text-2xl text-[#1A1F71]"></i>
          </div>
          <div className="w-12 h-8 bg-white border border-[#E5E5E5] rounded flex items-center justify-center">
            <i className="ri-mastercard-line text-2xl text-[#EB001B]"></i>
          </div>
          <div className="w-12 h-8 bg-white border border-[#E5E5E5] rounded flex items-center justify-center text-xs font-bold text-[#00425F]">
            VERVE
          </div>
        </div>
      </div>

      {/* Cancel Link */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleCancel}
          className="text-[#717171] text-sm hover:text-[#222222] hover:underline whitespace-nowrap"
        >
          Cancel and go back
        </button>
      </div>
    </div>
  );
}