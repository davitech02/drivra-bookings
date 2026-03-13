import { Link } from 'react-router-dom';
import { Booking, BookingStatus } from '../../../mocks/bookings';

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
  onReview?: (id: string) => void;
}

const statusConfig: Record<BookingStatus, { label: string; bg: string; text: string; icon: string }> = {
  confirmed: { label: 'Confirmed', bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'ri-checkbox-circle-fill' },
  pending:   { label: 'Pending',   bg: 'bg-amber-50',   text: 'text-amber-700',   icon: 'ri-time-fill' },
  completed: { label: 'Completed', bg: 'bg-slate-100',  text: 'text-slate-600',   icon: 'ri-check-double-fill' },
  cancelled: { label: 'Cancelled', bg: 'bg-red-50',     text: 'text-red-600',     icon: 'ri-close-circle-fill' },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function BookingCard({ booking, onCancel, onReview }: BookingCardProps) {
  const status = statusConfig[booking.status];

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBEB] overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-52 h-44 sm:h-auto flex-shrink-0 relative">
          <img
            src={booking.propertyImage}
            alt={booking.propertyTitle}
            className="w-full h-full object-cover object-top"
          />
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium text-[#222222] px-2 py-1 rounded-full">
            {booking.propertyTitle}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-between gap-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}>
                  <i className={`${status.icon} text-xs`}></i>
                  {status.label}
                </span>
              </div>
              <h3 className="text-base font-semibold text-[#222222] leading-snug">{booking.propertyTitle}</h3>
              <p className="text-sm text-[#717171] flex items-center gap-1 mt-0.5">
                <i className="ri-map-pin-line text-xs"></i>
                {booking.propertyLocation}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-[#222222]">${booking.totalPrice.toLocaleString()}</p>
              <p className="text-xs text-[#717171]">{booking.nights} nights</p>
            </div>
          </div>

          {/* Dates & Guests */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#555555]">
            <span className="flex items-center gap-1.5">
              <i className="ri-calendar-check-line text-[#FF385C]"></i>
              <span className="font-medium">Check-in:</span> {formatDate(booking.checkIn)}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="ri-calendar-line text-[#FF385C]"></i>
              <span className="font-medium">Check-out:</span> {formatDate(booking.checkOut)}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="ri-group-line text-[#FF385C]"></i>
              {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
            </span>
          </div>

          {/* Host & Ref */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-[#F0F0F0]">
            <div className="flex items-center gap-2">
              <img
                src={booking.hostAvatar}
                alt={booking.hostName}
                className="w-7 h-7 rounded-full object-cover object-top"
              />
              <span className="text-xs text-[#717171]">Hosted by <span className="font-medium text-[#222222]">{booking.hostName}</span></span>
            </div>
            <span className="text-xs text-[#AAAAAA] font-mono">Ref: {booking.bookingRef}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to={`/properties/${booking.propertyId}`}
              className="text-xs font-medium text-[#FF385C] border border-[#FF385C] px-3 py-1.5 rounded-lg hover:bg-[#FF385C] hover:text-white transition-all cursor-pointer whitespace-nowrap"
            >
              View Property
            </Link>
            {booking.status === 'confirmed' || booking.status === 'pending' ? (
              <button
                onClick={() => onCancel?.(booking.id)}
                className="text-xs font-medium text-[#717171] border border-[#DDDDDD] px-3 py-1.5 rounded-lg hover:border-red-400 hover:text-red-500 transition-all cursor-pointer whitespace-nowrap"
              >
                Cancel Booking
              </button>
            ) : null}
            {booking.status === 'completed' && (
              <button
                onClick={() => onReview?.(booking.id)}
                className="text-xs font-medium text-[#717171] border border-[#DDDDDD] px-3 py-1.5 rounded-lg hover:bg-[#F7F7F7] transition-all cursor-pointer whitespace-nowrap"
              >
                <i className="ri-star-line mr-1"></i>Leave a Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
