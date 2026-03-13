import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import CreateBookingModal from './components/CreateBookingModal';
import PaymentLinkModal from './components/PaymentLinkModal';
import { Booking, BookingStatus, mockBookings } from '../../../mocks/bookings';

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBookingForLink, setSelectedBookingForLink] = useState<Booking | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.hostName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    setDeleteConfirm(null);
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'completed': return 'bg-slate-100 text-slate-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Bookings Management</h1>
            <p className="text-sm text-slate-600 mt-1">Manage all property bookings and generate payment links</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#FF385C] text-white text-sm font-medium rounded-lg hover:bg-[#E31C5F] transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-add-line text-base"></i>
            Create Booking
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { label: 'Total Bookings', value: stats.total, icon: 'ri-calendar-line', color: 'bg-slate-100 text-slate-600' },
            { label: 'Confirmed', value: stats.confirmed, icon: 'ri-checkbox-circle-line', color: 'bg-emerald-100 text-emerald-600' },
            { label: 'Pending', value: stats.pending, icon: 'ri-time-line', color: 'bg-amber-100 text-amber-600' },
            { label: 'Completed', value: stats.completed, icon: 'ri-check-double-line', color: 'bg-slate-100 text-slate-600' },
            { label: 'Cancelled', value: stats.cancelled, icon: 'ri-close-circle-line', color: 'bg-red-100 text-red-600' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-600 font-medium">{s.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${s.color.split(' ')[1]}`}>{s.value}</p>
                </div>
                <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center`}>
                  <i className={`${s.icon} text-lg`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  type="text"
                  placeholder="Search by booking ref, property, or guest name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['all', 'confirmed', 'pending', 'completed', 'cancelled'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    statusFilter === s ? 'bg-[#FF385C] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)} ({s === 'all' ? stats.total : stats[s as keyof typeof stats]})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Booking Ref', 'Property', 'Guest', 'Check-in', 'Check-out', 'Guests', 'Total', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-900">{booking.bookingRef}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={booking.propertyImage} alt={booking.propertyTitle} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{booking.propertyTitle}</p>
                          <p className="text-xs text-slate-600">{booking.propertyLocation}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img src={booking.hostAvatar} alt={booking.hostName} className="w-8 h-8 rounded-full" />
                        <p className="text-sm text-slate-900">{booking.hostName}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3"><p className="text-sm text-slate-900">{booking.checkIn}</p></td>
                    <td className="px-4 py-3"><p className="text-sm text-slate-900">{booking.checkOut}</p></td>
                    <td className="px-4 py-3"><p className="text-sm text-slate-900">{booking.guests}</p></td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">R {booking.totalPrice.toLocaleString()}</p>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value as BookingStatus)}
                        className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer border-0 outline-none ${getStatusColor(booking.status)}`}
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedBookingForLink(booking)}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Generate Payment Link"
                        >
                          <i className="ri-link text-base"></i>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(booking.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Booking"
                        >
                          <i className="ri-delete-bin-line text-base"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredBookings.length === 0 && (
            <div className="py-12 text-center">
              <i className="ri-calendar-line text-4xl text-slate-300 mb-3"></i>
              <p className="text-sm text-slate-600">No bookings found</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-alert-line text-2xl text-red-600"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Booking?</h3>
            <p className="text-sm text-gray-600 text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap">Cancel</button>
              <button onClick={() => handleDeleteBooking(deleteConfirm)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 cursor-pointer whitespace-nowrap">Delete</button>
            </div>
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <CreateBookingModal
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={(newBooking) => {
            setBookings((prev) => [newBooking, ...prev]);
            setIsCreateModalOpen(false);
          }}
        />
      )}

      {selectedBookingForLink && (
        <PaymentLinkModal
          booking={selectedBookingForLink}
          onClose={() => setSelectedBookingForLink(null)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminBookings;
