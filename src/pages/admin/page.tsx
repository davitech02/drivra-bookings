import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import VisitorsChart from './components/VisitorsChart';
import { adminStats, recentBookings } from '../../mocks/admin-stats';

export default function AdminOverviewPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Properties</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{adminStats.totalProperties}</p>
            </div>
            <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
              <i className="ri-building-line text-2xl text-rose-500"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{adminStats.totalBookings}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-calendar-check-line text-2xl text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Registered Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{adminStats.registeredUsers}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-line text-2xl text-amber-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">R{adminStats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-2xl text-emerald-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Visitors Chart */}
      <VisitorsChart />

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/admin/properties"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#FF385C] hover:bg-red-50 transition-all group"
          >
            <div className="w-10 h-10 bg-[#FF385C] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="ri-add-line text-xl text-white"></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Add Property</p>
              <p className="text-xs text-gray-500">List new accommodation</p>
            </div>
          </Link>

          <Link
            to="/admin/bookings"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#FF385C] hover:bg-red-50 transition-all group"
          >
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="ri-calendar-check-line text-xl text-white"></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Create Booking</p>
              <p className="text-xs text-gray-500">Reserve for a guest</p>
            </div>
          </Link>

          <Link
            to="/admin/bookings"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#FF385C] hover:bg-red-50 transition-all group"
          >
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="ri-link text-xl text-white"></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Payment Link</p>
              <p className="text-xs text-gray-500">Generate checkout link</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Recent Bookings</h3>
          <Link
            to="/admin/bookings"
            className="text-sm text-[#FF385C] hover:text-[#E31C5F] font-medium whitespace-nowrap"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Booking Ref</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Check-in</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{booking.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{booking.propertyName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{booking.guestName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">
                      {new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">R{booking.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700'
                      : booking.status === 'pending' ? 'bg-amber-100 text-amber-700'
                      : booking.status === 'completed' ? 'bg-gray-100 text-gray-700'
                      : 'bg-red-100 text-red-700'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}
