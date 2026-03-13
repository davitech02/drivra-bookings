import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import StatsBar from './components/StatsBar';
import BookingCard from './components/BookingCard';
import EditProfileModal from './components/EditProfileModal';
import { mockBookings, Booking, BookingStatus } from '../../mocks/bookings';

type TabType = 'all' | 'upcoming' | 'past';

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterStatus, setFilterStatus] = useState<BookingStatus | 'all'>('all');
  const [cancelTarget, setCancelTarget] = useState<string | null>(null);
  const [reviewTarget, setReviewTarget] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      // Simulate brief load then use mock data
      const timer = setTimeout(() => {
        setBookings(mockBookings);
        setIsLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <i className="ri-lock-line text-6xl text-gray-300 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to view your dashboard</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const tabs: { key: TabType; label: string }[] = [
    { key: 'all', label: 'All Bookings' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'past', label: 'Past' },
  ];

  function isUpcoming(booking: Booking) {
    return new Date(booking.checkIn) >= new Date() && booking.status !== 'cancelled';
  }

  function isPast(booking: Booking) {
    return new Date(booking.checkOut) < new Date() || booking.status === 'cancelled' || booking.status === 'completed';
  }

  const filtered = bookings.filter((b) => {
    const tabMatch =
      activeTab === 'all' ||
      (activeTab === 'upcoming' && isUpcoming(b)) ||
      (activeTab === 'past' && isPast(b));
    const statusMatch = filterStatus === 'all' || b.status === filterStatus;
    return tabMatch && statusMatch;
  });

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  const handleCancel = (id: string) => setCancelTarget(id);

  const confirmCancel = () => {
    if (!cancelTarget) return;
    setBookings((prev) =>
      prev.map((b) => (b.id === cancelTarget ? { ...b, status: 'cancelled' } : b))
    );
    setCancelTarget(null);
  };

  const handleReview = (id: string) => {
    setReviewTarget(id);
    setReviewRating(0);
    setReviewText('');
    setReviewSubmitted(false);
  };

  const submitReview = () => {
    if (reviewRating === 0) return;
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewTarget(null);
      setReviewSubmitted(false);
    }, 1800);
  };

  const cancelBooking = bookings.find((b) => b.id === cancelTarget);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8]">
          <div className="text-center">
            <i className="ri-loader-4-line text-5xl text-gray-400 animate-spin"></i>
            <p className="text-gray-600 mt-4">Loading your bookings...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#222222] to-[#3a3a3a] pt-32 pb-12 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#FF385C] flex items-center justify-center flex-shrink-0">
              <i className="ri-user-fill text-white text-2xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                Welcome back, {user?.name?.split(' ')[0] || 'Guest'}!
              </h1>
              <p className="text-sm text-white/60 mt-0.5">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => setShowEditProfile(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-edit-line text-base"></i>
            Edit Profile
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <StatsBar {...stats} />

        {/* Tabs + Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center bg-white border border-[#EBEBEB] rounded-full p-1 gap-1 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-[#222222] text-white shadow-sm'
                    : 'text-[#717171] hover:text-[#222222]'
                }`}
              >
                {tab.label}
                {tab.key === 'upcoming' && (
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-[#F0F0F0] text-[#555]'}`}>
                    {bookings.filter(isUpcoming).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as BookingStatus | 'all')}
            className="text-sm border border-[#DDDDDD] rounded-xl px-4 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#FF385C] cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Booking List */}
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={handleCancel}
                onReview={handleReview}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#EBEBEB] py-20 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-[#F7F7F7] rounded-full">
              <i className="ri-calendar-2-line text-3xl text-[#CCCCCC]"></i>
            </div>
            <p className="text-base font-semibold text-[#222222]">No bookings found</p>
            <p className="text-sm text-[#717171]">Try a different tab or filter, or explore new properties.</p>
            <a
              href="/properties"
              className="mt-2 px-6 py-2.5 bg-[#FF385C] text-white text-sm font-medium rounded-xl hover:bg-[#E31C5F] transition-colors cursor-pointer whitespace-nowrap"
            >
              Browse Properties
            </a>
          </div>
        )}
      </div>

      <Footer />

      <EditProfileModal isOpen={showEditProfile} onClose={() => setShowEditProfile(false)} />

      {/* Cancel Confirmation Modal */}
      {cancelTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setCancelTarget(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 flex items-center justify-center bg-red-50 rounded-full mx-auto mb-5">
              <i className="ri-error-warning-line text-2xl text-red-500"></i>
            </div>
            <h2 className="text-lg font-bold text-[#222222] text-center mb-2">Cancel Booking?</h2>
            <p className="text-sm text-[#717171] text-center mb-1">You are about to cancel your booking for</p>
            <p className="text-sm font-semibold text-[#222222] text-center mb-6">{cancelBooking?.propertyTitle}</p>
            <p className="text-xs text-[#AAAAAA] text-center mb-6">
              Please review our <a href="/refund-policy" className="text-[#FF385C] underline">Refund Policy</a> before cancelling.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setCancelTarget(null)} className="flex-1 py-3 border border-[#DDDDDD] rounded-xl text-sm font-medium text-[#222222] hover:bg-[#F7F7F7] transition-colors cursor-pointer whitespace-nowrap">Keep Booking</button>
              <button onClick={confirmCancel} className="flex-1 py-3 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setReviewTarget(null)}>
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {reviewSubmitted ? (
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="w-16 h-16 flex items-center justify-center bg-emerald-50 rounded-full">
                  <i className="ri-checkbox-circle-fill text-3xl text-emerald-500"></i>
                </div>
                <p className="text-base font-semibold text-[#222222]">Review Submitted!</p>
                <p className="text-sm text-[#717171]">Thank you for your feedback.</p>
              </div>
            ) : (
              <>
                <button onClick={() => setReviewTarget(null)} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F0F0F0] cursor-pointer">
                  <i className="ri-close-line text-lg text-[#717171]"></i>
                </button>
                <h2 className="text-lg font-bold text-[#222222] mb-1">Leave a Review</h2>
                <p className="text-sm text-[#717171] mb-6">{bookings.find((b) => b.id === reviewTarget)?.propertyTitle}</p>
                <div className="flex items-center gap-2 mb-5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onMouseEnter={() => setReviewHover(star)} onMouseLeave={() => setReviewHover(0)} onClick={() => setReviewRating(star)} className="cursor-pointer">
                      <i className={`ri-star-${(reviewHover || reviewRating) >= star ? 'fill' : 'line'} text-3xl ${(reviewHover || reviewRating) >= star ? 'text-amber-400' : 'text-[#DDDDDD]'} transition-colors`}></i>
                    </button>
                  ))}
                  {reviewRating > 0 && (
                    <span className="text-sm text-[#717171] ml-2">{['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][reviewRating]}</span>
                  )}
                </div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value.slice(0, 500))}
                  placeholder="Share your experience with this property..."
                  rows={4}
                  className="w-full border border-[#DDDDDD] rounded-xl px-4 py-3 text-sm text-[#222222] placeholder-[#AAAAAA] focus:outline-none focus:border-[#FF385C] resize-none mb-1"
                />
                <p className="text-xs text-[#AAAAAA] text-right mb-5">{reviewText.length}/500</p>
                <button
                  onClick={submitReview}
                  disabled={reviewRating === 0}
                  className="w-full py-3 bg-[#FF385C] text-white rounded-xl text-sm font-semibold hover:bg-[#E31C5F] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  Submit Review
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
