import AdminLayout from '../components/AdminLayout';
import { mockPayments } from '../../../mocks/admin-payments';

export default function AdminPaymentsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
            <p className="text-gray-600 mt-1">Track payment status and history</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['ID', 'Booking Ref', 'Status', 'Amount', 'Method', 'Date'].map((header) => (
                    <th key={header} className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{payment.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{payment.bookingRef}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          payment.status === 'successful'
                            ? 'bg-green-100 text-green-700'
                            : payment.status === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      R{payment.amount.toLocaleString()} {payment.currency}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{payment.method}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{payment.date}</td>
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
