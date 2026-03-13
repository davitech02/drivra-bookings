import { useState } from 'react';
import { allProperties } from '../../../../mocks/properties';
import { Booking } from '../../../../mocks/bookings';

interface CreateBookingModalProps {
  onClose: () => void;
  onSuccess: (booking: Booking) => void;
}

const CreateBookingModal = ({ onClose, onSuccess }: CreateBookingModalProps) => {
  const properties = allProperties;

  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    propertyId: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPaymentLink, setShowPaymentLink] = useState(false);
  const [generatedBooking, setGeneratedBooking] = useState<Booking | null>(null);

  const selectedProperty = properties.find((p) => p.id === formData.propertyId);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.guestName.trim()) newErrors.guestName = 'Guest name is required';
    if (!formData.guestEmail.trim()) newErrors.guestEmail = 'Email is required';
    if (formData.guestEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.guestEmail))
      newErrors.guestEmail = 'Invalid email format';
    if (!formData.guestPhone.trim()) newErrors.guestPhone = 'Phone number is required';
    if (!formData.propertyId) newErrors.propertyId = 'Please select a property';
    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required';
    if (formData.guests < 1) newErrors.guests = 'At least 1 guest required';
    if (formData.checkIn && formData.checkOut) {
      if (new Date(formData.checkOut) <= new Date(formData.checkIn))
        newErrors.checkOut = 'Check-out must be after check-in';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const diff = new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const calculateTotal = () => {
    if (!selectedProperty) return 0;
    return selectedProperty.price * calculateNights();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const ref = `DRVB${String(Date.now()).slice(-6)}`;
    const nights = calculateNights();
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      bookingRef: ref,
      propertyId: formData.propertyId,
      propertyTitle: selectedProperty?.title || '',
      propertyLocation: selectedProperty?.location || '',
      propertyImage: selectedProperty?.image || '',
      hostName: formData.guestName,
      hostEmail: formData.guestEmail,
      hostPhone: formData.guestPhone,
      hostAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.guestName)}&background=random`,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests,
      totalPrice: calculateTotal(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      nights,
    };

    setGeneratedBooking(newBooking);
    setShowPaymentLink(true);
  };

  const handleCopyLink = async () => {
    if (!generatedBooking) return;
    const paymentLink = `${window.location.origin}/checkout/${generatedBooking.id}?prefill=true&guestEmail=${encodeURIComponent(generatedBooking.hostEmail)}&guestPhone=${encodeURIComponent(generatedBooking.hostPhone)}&checkIn=${generatedBooking.checkIn}&checkOut=${generatedBooking.checkOut}&guests=${generatedBooking.guests}`;
    try {
      await navigator.clipboard.writeText(paymentLink);
    } catch {
      // fallback: do nothing
    }
  };

  const handleFinish = () => {
    if (generatedBooking) onSuccess(generatedBooking);
  };

  /* Payment Link Screen */
  if (showPaymentLink && generatedBooking) {
    const paymentLink = `${window.location.origin}/checkout/${generatedBooking.id}?prefill=true&guestEmail=${encodeURIComponent(generatedBooking.hostEmail)}&guestPhone=${encodeURIComponent(generatedBooking.hostPhone)}&checkIn=${generatedBooking.checkIn}&checkOut=${generatedBooking.checkOut}&guests=${generatedBooking.guests}`;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-3xl text-emerald-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Created Successfully!</h2>
            <p className="text-sm text-slate-600">Booking reference: <span className="font-semibold">{generatedBooking.bookingRef}</span></p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              {[
                ['Property', generatedBooking.propertyTitle],
                ['Guest', generatedBooking.hostName],
                ['Check-in', generatedBooking.checkIn],
                ['Check-out', generatedBooking.checkOut],
                ['Guests', String(generatedBooking.guests)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-slate-600">{label}:</span>
                  <span className="font-medium text-slate-900">{value}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-slate-200">
                <span className="text-slate-900 font-semibold">Total Amount:</span>
                <span className="font-bold text-slate-900">R {generatedBooking.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-semibold text-slate-900 mb-2">Payment Link</h4>
            <p className="text-xs text-slate-600 mb-3">Copy and send this link to the guest to complete payment:</p>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <p className="text-xs text-slate-700 break-all font-mono">{paymentLink}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-file-copy-line text-base"></i>
              Copy Payment Link
            </button>
            <button
              onClick={handleFinish}
              className="flex-1 px-4 py-2.5 bg-[#FF385C] text-white text-sm font-medium rounded-lg hover:bg-[#E31C5F] transition-colors whitespace-nowrap cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* Main Form */
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Create New Booking</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Guest Info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Guest Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Guest Name <span className="text-red-500">*</span></label>
                <input type="text" value={formData.guestName} onChange={(e) => setFormData({ ...formData, guestName: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent" placeholder="Enter guest full name" />
                {errors.guestName && <p className="text-xs text-red-600 mt-1">{errors.guestName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                <input type="email" value={formData.guestEmail} onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent" placeholder="guest@example.com" />
                {errors.guestEmail && <p className="text-xs text-red-600 mt-1">{errors.guestEmail}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" value={formData.guestPhone} onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent" placeholder="+234 800 000 0000" />
                {errors.guestPhone && <p className="text-xs text-red-600 mt-1">{errors.guestPhone}</p>}
              </div>
            </div>
          </div>

          {/* Property */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Property Details</h3>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Property <span className="text-red-500">*</span></label>
            <select value={formData.propertyId} onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent cursor-pointer">
              <option value="">Choose a property</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>{p.title} - {p.location} (R {p.price}/night)</option>
              ))}
            </select>
            {errors.propertyId && <p className="text-xs text-red-600 mt-1">{errors.propertyId}</p>}

            {selectedProperty && (
              <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex gap-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-900">{selectedProperty.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{selectedProperty.location}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
                      <span>{selectedProperty.guests} guests</span>
                      <span>•</span>
                      <span>{selectedProperty.bedrooms} bedrooms</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-900">R {selectedProperty.price}/night</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dates */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Booking Dates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Check-in Date <span className="text-red-500">*</span></label>
                <input type="date" value={formData.checkIn} onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })} min={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent cursor-pointer" />
                {errors.checkIn && <p className="text-xs text-red-600 mt-1">{errors.checkIn}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Check-out Date <span className="text-red-500">*</span></label>
                <input type="date" value={formData.checkOut} onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })} min={formData.checkIn || new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent cursor-pointer" />
                {errors.checkOut && <p className="text-xs text-red-600 mt-1">{errors.checkOut}</p>}
              </div>
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Number of Guests <span className="text-red-500">*</span></label>
            <input type="number" value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })} min="1" max={selectedProperty?.guests || 10} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent" />
            {errors.guests && <p className="text-xs text-red-600 mt-1">{errors.guests}</p>}
          </div>

          {/* Price Summary */}
          {selectedProperty && formData.checkIn && formData.checkOut && calculateNights() > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-emerald-900 mb-2">Price Breakdown</h4>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-700">
                  <span>R {selectedProperty.price} × {calculateNights()} nights</span>
                  <span>R {(selectedProperty.price * calculateNights()).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-emerald-200">
                  <span>Total Amount</span>
                  <span>R {calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap cursor-pointer">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-[#FF385C] text-white text-sm font-medium rounded-lg hover:bg-[#E31C5F] transition-colors whitespace-nowrap cursor-pointer">Create Booking &amp; Generate Link</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookingModal;
