import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register' | 'signup';
}

type Step = 'phone' | 'email' | 'login' | 'register';

const COUNTRY_CODES = [
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Ghana', code: '+233', flag: '🇬🇭' },
  { name: 'Kenya', code: '+254', flag: '🇰🇪' },
  { name: 'South Africa', code: '+27', flag: '🇿🇦' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'India', code: '+91', flag: '🇮🇳' },
];

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const initialStep = defaultMode === 'signup' ? 'register' : defaultMode;
  const [step, setStep] = useState<Step>(initialStep === 'register' ? 'register' : 'phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { login, register } = useAuth();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(loginData.email, loginData.password);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await register({
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password,
      });
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Email may already exist.');
    } finally {
      setLoading(false);
    }
  };

  const resetToPhone = () => {
    setStep('phone');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl relative overflow-visible">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <button
            onClick={step !== 'phone' ? resetToPhone : onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {step !== 'phone' ? (
              <i className="ri-arrow-left-line text-lg text-gray-700"></i>
            ) : (
              <i className="ri-close-line text-lg text-gray-700"></i>
            )}
          </button>
          <h2 className="text-base font-semibold text-[#222222]">Log in or sign up to book</h2>
          <div className="w-8" />
        </div>

        <div className="px-5 py-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* STEP: Phone */}
          {step === 'phone' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#222222]">Welcome to StayEase</h3>

              {/* Country Code Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-t-xl bg-white hover:border-gray-400 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{selectedCountry.flag}</span>
                    <span className="text-sm text-[#222222] font-medium">
                      {selectedCountry.name} ({selectedCountry.code})
                    </span>
                  </div>
                  <i className={`ri-arrow-down-s-line text-gray-500 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`}></i>
                </button>

                {showCountryDropdown && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 border-t-0 rounded-b-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                    {COUNTRY_CODES.map((country) => (
                      <button
                        key={`${country.name}-${country.code}`}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country);
                          setShowCountryDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer text-left"
                      >
                        <span>{country.flag}</span>
                        <span className="text-sm text-[#222222]">{country.name}</span>
                        <span className="text-sm text-gray-500 ml-auto">{country.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Phone Input */}
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone number"
                className="w-full px-4 py-3 border border-gray-300 border-t-0 rounded-b-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C] text-sm text-[#222222] placeholder-gray-400 -mt-4"
              />

              <p className="text-xs text-gray-500 leading-relaxed">
                We'll call or text you to confirm your number. Standard message and data rates apply.{' '}
                <a href="/privacy" className="underline cursor-pointer">Privacy Policy</a>
              </p>

              {/* Continue Button */}
              <button
                type="button"
                onClick={() => setStep('login')}
                className="w-full bg-gradient-to-r from-[#E61E4D] to-[#E31C5F] text-white py-3.5 rounded-xl font-semibold text-sm hover:from-[#D1184A] hover:to-[#C91857] transition-all cursor-pointer whitespace-nowrap"
              >
                Continue
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs text-gray-500">or</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  title="Continue with Facebook"
                >
                  <i className="ri-facebook-fill text-[#1877F2] text-xl"></i>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  title="Continue with Google"
                  onClick={() => setStep('login')}
                >
                  <i className="ri-google-fill text-[#EA4335] text-xl"></i>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  title="Continue with Apple"
                >
                  <i className="ri-apple-fill text-[#222222] text-xl"></i>
                </button>
              </div>

              {/* Continue with Email */}
              <button
                type="button"
                onClick={() => setStep('email')}
                className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-sm font-medium text-[#222222]"
              >
                <i className="ri-mail-line text-lg"></i>
                Continue with email
              </button>
            </div>
          )}

          {/* STEP: Email choice (login or register) */}
          {step === 'email' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#222222]">Continue with email</h3>
              <p className="text-sm text-gray-500">Choose how you'd like to proceed</p>
              <button
                type="button"
                onClick={() => setStep('login')}
                className="w-full py-3.5 border border-gray-300 rounded-xl text-sm font-semibold text-[#222222] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Sign in to existing account
              </button>
              <button
                type="button"
                onClick={() => setStep('register')}
                className="w-full bg-gradient-to-r from-[#E61E4D] to-[#E31C5F] text-white py-3.5 rounded-xl font-semibold text-sm hover:from-[#D1184A] hover:to-[#C91857] transition-all cursor-pointer whitespace-nowrap"
              >
                Create new account
              </button>
            </div>
          )}

          {/* STEP: Login */}
          {step === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <h3 className="text-xl font-semibold text-[#222222]">Sign in</h3>

              <div className="space-y-0">
                <div className="relative">
                  <label className="absolute top-2 left-4 text-xs text-gray-500 font-medium">Email</label>
                  <input
                    type="email"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="w-full px-4 pt-7 pb-3 border border-gray-300 rounded-t-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C] text-sm text-[#222222]"
                    placeholder="Email address"
                  />
                </div>
                <div className="relative">
                  <label className="absolute top-2 left-4 text-xs text-gray-500 font-medium">Password</label>
                  <input
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full px-4 pt-7 pb-3 border border-gray-300 border-t-0 rounded-b-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C] text-sm text-[#222222]"
                    placeholder="Password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#E61E4D] to-[#E31C5F] text-white py-3.5 rounded-xl font-semibold text-sm hover:from-[#D1184A] hover:to-[#C91857] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
              >
                {loading ? 'Signing in...' : 'Continue'}
              </button>

              <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setStep('register'); setError(''); }}
                  className="text-[#222222] font-semibold underline cursor-pointer"
                >
                  Sign up
                </button>
              </p>
            </form>
          )}

          {/* STEP: Register */}
          {step === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <h3 className="text-xl font-semibold text-[#222222]">Create account</h3>

              <div className="space-y-0">
                <div className="relative">
                  <label className="absolute top-2 left-4 text-xs text-gray-500 font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    className="w-full px-4 pt-7 pb-3 border border-gray-300 rounded-t-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C] text-sm text-[#222222]"
                    placeholder="Your full name"
                  />
                </div>
                <div className="relative">
                  <label className="absolute top-2 left-4 text-xs text-gray-500 font-medium">Email</label>
                  <input
                    type="email"
                    required
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="w-full px-4 pt-7 pb-3 border border-gray-300 border-t-0 focus:outline-none focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C] text-sm text-[#222222]"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="relative">
                  <label className="absolute top-2 left-4 text-xs text-gray-500 font-medium">Phone</label>
                  <input
                    type="tel"
                    required
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    className="w-full px-4 pt-7 pb-3 border border-gray-300 border-t-0 focus:outline-none focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C] text-sm text-[#222222]"
                    placeholder="+234 800 000 0000"
                  />
                </div>
                <div className="relative">
                  <label className="absolute top-2 left-4 text-xs text-gray-500 font-medium">Password</label>
                  <input
                    type="password"
                    required
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    className="w-full px-4 pt-7 pb-3 border border-gray-300 border-t-0 focus:outline-none focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C] text-sm text-[#222222]"
                    placeholder="Min. 6 characters"
                  />
                </div>
                <div className="relative">
                  <label className="absolute top-2 left-4 text-xs text-gray-500 font-medium">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    className="w-full px-4 pt-7 pb-3 border border-gray-300 border-t-0 rounded-b-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C] text-sm text-[#222222]"
                    placeholder="Repeat password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#E61E4D] to-[#E31C5F] text-white py-3.5 rounded-xl font-semibold text-sm hover:from-[#D1184A] hover:to-[#C91857] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
              >
                {loading ? 'Creating account...' : 'Agree and continue'}
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setStep('login'); setError(''); }}
                  className="text-[#222222] font-semibold underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
