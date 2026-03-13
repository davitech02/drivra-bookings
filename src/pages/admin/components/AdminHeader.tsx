import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-[#EBEBEB] flex items-center justify-between px-8 z-10">
      <div>
        <h2 className="text-lg font-semibold text-[#222222]">Admin Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#FF385C] flex items-center justify-center">
            <i className="ri-user-line text-white text-lg"></i>
          </div>
          <div>
            <div className="text-sm font-medium text-[#222222]">{user?.name || 'Admin'}</div>
            <div className="text-xs text-[#717171]">{user?.email}</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="ml-4 px-4 py-2 text-sm text-[#717171] hover:text-[#FF385C] transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
        >
          <i className="ri-logout-box-line"></i>
          Logout
        </button>
      </div>
    </header>
  );
}