import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const openLogin = () => {
    setAuthModalMode('login');
    setAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthModalMode('signup');
    setAuthModalOpen(true);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 cursor-pointer">
              <img
                src="https://public.readdy.ai/ai/img_res/0317cfbc-2bed-4be0-9de9-7bc37ff0b08b.png"
                alt="Drivra Bookings"
                className="h-10 w-auto"
              />
              <span className={`text-xl font-bold ${isScrolled ? 'text-[#222222]' : 'text-white'}`} style={{ fontFamily: 'Playfair Display, serif' }}>
                Drivra Bookings
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className={`text-sm font-medium hover:text-[#FF385C] transition-colors cursor-pointer ${
                  isScrolled ? 'text-[#222222]' : 'text-white'
                }`}
              >
                Home
              </Link>
              <Link
                to="/properties"
                className={`text-sm font-medium hover:text-[#FF385C] transition-colors cursor-pointer ${
                  isScrolled ? 'text-[#222222]' : 'text-white'
                }`}
              >
                Properties
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium hover:text-[#FF385C] transition-colors cursor-pointer ${
                  isScrolled ? 'text-[#222222]' : 'text-white'
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`text-sm font-medium hover:text-[#FF385C] transition-colors cursor-pointer ${
                  isScrolled ? 'text-[#222222]' : 'text-white'
                }`}
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className={`text-sm font-medium hover:text-[#FF385C] transition-colors cursor-pointer ${
                  isScrolled ? 'text-[#222222]' : 'text-white'
                }`}
              >
                FAQ
              </Link>
              <Link
                to="/terms"
                className={`text-sm font-medium hover:text-[#FF385C] transition-colors cursor-pointer ${
                  isScrolled ? 'text-[#222222]' : 'text-white'
                }`}
              >
                Terms &amp; Conditions
              </Link>
              {isAuthenticated && user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`text-sm font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FF385C]/10 hover:bg-[#FF385C]/20 transition-colors cursor-pointer ${
                    isScrolled ? 'text-[#FF385C]' : 'text-white border border-white/30'
                  }`}
                >
                  <i className="ri-shield-user-line text-base"></i>
                  Admin
                </Link>
              )}
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 hover:shadow-md transition-all cursor-pointer ${
                      isScrolled ? 'border-[#DDDDDD] bg-white' : 'border-white/30 bg-white/10'
                    }`}
                  >
                    <i className={`ri-menu-line text-lg ${isScrolled ? 'text-[#222222]' : 'text-white'}`}></i>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isScrolled ? 'bg-[#717171]' : 'bg-white/20'}`}>
                      <i className={`ri-user-line ${isScrolled ? 'text-white' : 'text-white'}`}></i>
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg py-2 border border-[#DDDDDD]">
                      <div className="px-4 py-3 border-b border-[#EBEBEB]">
                        <p className="text-sm font-semibold text-[#222222]">{user?.name}</p>
                        <p className="text-xs text-[#717171]">{user?.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-[#222222] hover:bg-[#F7F7F7] cursor-pointer"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Bookings
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-[#222222] hover:bg-[#F7F7F7] cursor-pointer"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-[#222222] hover:bg-[#F7F7F7] cursor-pointer"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile Settings
                      </Link>
                      <hr className="my-2 border-[#EBEBEB]" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-[#222222] hover:bg-[#F7F7F7] cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={openLogin}
                    className={`px-5 py-2 text-sm font-medium rounded-xl hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap ${
                      isScrolled ? 'text-[#222222]' : 'text-white'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={openSignup}
                    className="px-5 py-2 text-sm font-medium bg-[#FF385C] text-white rounded-xl hover:bg-[#E31C5F] transition-all cursor-pointer whitespace-nowrap"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authModalMode}
      />
    </>
  );
}
