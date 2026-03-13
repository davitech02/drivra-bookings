import { useState, useEffect } from 'react';
import { Booking } from '../../../../mocks/bookings';
import axios from '../../../../config/axios';

interface PaymentLinkModalProps {
  booking: Booking;
  onClose: () => void;
}

const PaymentLinkModal = ({ booking, onClose }: PaymentLinkModalProps) => {
  const [paymentLink, setPaymentLink] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    generatePaymentLink();
  }, []);

  const generatePaymentLink = async () => {
    try {
      const response = await axios.post('/api/payments/generate-link', {
        booking_id: booking.id,
      });

      if (response.data.success) {
        setPaymentLink(response.data.payment_link);
      }
    } catch (error) {
      console.error('Failed to generate payment link:', error);
      setPaymentLink(`${window.location.origin}/checkout/${booking.id}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(paymentLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Payment Required - Booking ${booking.bookingRef}`);
    const body = encodeURIComponent(
      `Hello ${booking.hostName},\n\nYour booking has been confirmed! Please complete your payment using the link below:\n\n${paymentLink}\n\nBooking Details:\n- Property: ${booking.propertyTitle}\n- Location: ${booking.propertyLocation}\n- Check-in: ${booking.checkIn}\n- Check-out: ${booking.checkOut}\n- Guests: ${booking.guests}\n- Total Amount: $${booking.totalPrice.toLocaleString()}\n\nThank you for choosing Drivra Bookings!\n\nBest regards,\nDrivra Bookings Team`
    );
    window.open(`mailto:${booking.hostEmail}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Payment Link</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Booking Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Booking Ref:</span>
              <span className="font-medium text-slate-900">{booking.bookingRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Property:</span>
              <span className="font-medium text-slate-900">{booking.propertyTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Guest:</span>
              <span className="font-medium text-slate-900">{booking.hostName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Email:</span>
              <span className="font-medium text-slate-900">{booking.hostEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Check-in:</span>
              <span className="font-medium text-slate-900">{booking.checkIn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Check-out:</span>
              <span className="font-medium text-slate-900">{booking.checkOut}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200">
              <span className="text-slate-900 font-semibold">Total Amount:</span>
              <span className="font-bold text-slate-900">
                ${booking.totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <i className="ri-information-line text-lg text-blue-600 mt-0.5"></i>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Payment Link</h4>
              <p className="text-xs text-blue-700 mb-3">
                Share this link with the guest to complete payment:
              </p>
              {isLoading ? (
                <div className="bg-white rounded-lg p-3 border border-blue-200 flex items-center justify-center">
                  <i className="ri-loader-4-line animate-spin text-blue-600 text-xl"></i>
                </div>
              ) : (
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <p className="text-xs text-slate-700 break-all font-mono">{paymentLink}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCopyLink}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className={`${isCopied ? 'ri-check-line' : 'ri-file-copy-line'} text-base`}></i>
            {isCopied ? 'Copied!' : 'Copy Link'}
          </button>
          <button
            onClick={handleSendEmail}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="ri-mail-send-line text-base"></i>
            Send via Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentLinkModal;