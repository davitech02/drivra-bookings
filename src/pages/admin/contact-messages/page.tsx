import AdminLayout from '../components/AdminLayout';
import { mockContactMessages } from '../../../mocks/contact-messages';

export default function AdminContactMessagesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
            <p className="text-gray-600 mt-1">Manage user inquiries and support tickets</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['ID', 'Name', 'Email', 'Subject', 'Status', 'Date'].map((header) => (
                    <th key={header} className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockContactMessages.map((message) => (
                  <tr key={message.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{message.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{message.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{message.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{message.subject}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          message.status === 'unread'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {message.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{message.date}</td>
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
