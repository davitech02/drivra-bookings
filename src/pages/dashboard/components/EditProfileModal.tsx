import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'info' | 'password';

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [infoData, setInfoData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  if (!isOpen) return null;

  const handleInfoSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!infoData.name.trim()) {
      setError('Full name is required.');
      return;
    }
    setSaving(true);
    try {
      await updateProfile({ name: infoData.name.trim(), phone: infoData.phone.trim() });
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setSaving(true);
    try {
      await updateProfile({ password: passwordData.newPassword });
      setSuccess('Password updated successfully!');
      setPasswordData({ newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to update password. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EBEBEB]">
          <h2 className="text-base font-semibold text-[#222222]">Edit Profile</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-lg text-gray-600"></i>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-6 pt-5 pb-0">
          <div className="flex items-center bg-[#F5F5F5] rounded-full p-1 gap-1">
            {(['info', 'password'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setError(''); setSuccess(''); }}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-white text-[#222222] shadow-sm'
                    : 'text-[#717171] hover:text-[#222222]'
                }`}
              >
                {tab === 'info' ? 'Personal Info' : 'Change Password'}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Feedback */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
              <i className="ri-error-warning-line text-base flex-shrink-0"></i>
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm flex items-center gap-2">
              <i className="ri-checkbox-circle-line text-base flex-shrink-0"></i>
              {success}
            </div>
          )}

          {/* Personal Info Tab */}
          {activeTab === 'info' && (
            <form onSubmit={handleInfoSave} className="space-y-4">
              {/* Avatar placeholder */}
              <div className="flex items-center gap-4 mb-2">
                <div className="w-14 h-14 rounded-full bg-[#FF385C] flex items-center justify-center flex-shrink-0">
                  <i className="ri-user-fill text-white text-2xl"></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#222222]">{user?.name || 'Your Name'}</p>
                  <p className="text-xs text-[#717171]">{user?.email}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#717171] mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={infoData.name}
                  onChange={(e) => setInfoData({ ...infoData, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl text-sm text-[#222222] placeholder-[#AAAAAA] focus:outline-none focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/20 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#717171] mb-1.5">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-4 py-3 border border-[#EBEBEB] rounded-xl text-sm text-[#AAAAAA] bg-[#F7F7F7] cursor-not-allowed"
                />
                <p className="text-xs text-[#AAAAAA] mt-1">Email cannot be changed.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#717171] mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={infoData.phone}
                  onChange={(e) => setInfoData({ ...infoData, phone: e.target.value })}
                  placeholder="Your phone number (e.g. +234 800 000 0000)"
                  className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl text-sm text-[#222222] placeholder-[#AAAAAA] focus:outline-none focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/20 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-[#E61E4D] to-[#E31C5F] text-white py-3.5 rounded-xl font-semibold text-sm hover:from-[#D1184A] hover:to-[#C91857] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap mt-2"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}

          {/* Change Password Tab */}
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#717171] mb-1.5">New Password</label>
                <input
                  type="password"
                  required
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl text-sm text-[#222222] placeholder-[#AAAAAA] focus:outline-none focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/20 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#717171] mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  placeholder="Repeat your new password"
                  className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl text-sm text-[#222222] placeholder-[#AAAAAA] focus:outline-none focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/20 transition-colors"
                />
              </div>

              <ul className="text-xs text-[#AAAAAA] space-y-1 pl-1">
                <li className={`flex items-center gap-1.5 ${passwordData.newPassword.length >= 6 ? 'text-emerald-600' : ''}`}>
                  <i className={`${passwordData.newPassword.length >= 6 ? 'ri-checkbox-circle-fill text-emerald-500' : 'ri-checkbox-blank-circle-line'}`}></i>
                  At least 6 characters
                </li>
                <li className={`flex items-center gap-1.5 ${passwordData.newPassword && passwordData.newPassword === passwordData.confirmPassword ? 'text-emerald-600' : ''}`}>
                  <i className={`${passwordData.newPassword && passwordData.newPassword === passwordData.confirmPassword ? 'ri-checkbox-circle-fill text-emerald-500' : 'ri-checkbox-blank-circle-line'}`}></i>
                  Passwords match
                </li>
              </ul>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-[#E61E4D] to-[#E31C5F] text-white py-3.5 rounded-xl font-semibold text-sm hover:from-[#D1184A] hover:to-[#C91857] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap mt-2"
              >
                {saving ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
