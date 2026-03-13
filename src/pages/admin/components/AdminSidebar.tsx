import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Overview', icon: 'ri-dashboard-line' },
    { path: '/admin/properties', label: 'Properties', icon: 'ri-building-line' },
    { path: '/admin/bookings', label: 'Bookings', icon: 'ri-calendar-check-line' },
    { path: '/admin/payments', label: 'Payments', icon: 'ri-secure-payment-line' },
    { path: '/admin/users', label: 'Users', icon: 'ri-user-line' },
    { path: '/admin/contact-messages', label: 'Contact Messages', icon: 'ri-message-line' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#222222] text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://public.readdy.ai/ai/img_res/0317cfbc-2bed-4be0-9de9-7bc37ff0b08b.png"
            alt="Drivra Bookings"
            className="h-10 w-auto"
          />
          <span className="text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
            Drivra Admin
          </span>
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#FF385C] text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <i className={`${item.icon} text-xl`}></i>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-white/50 text-center">
          Admin Panel v1.0
        </div>
      </div>
    </aside>
  );
}