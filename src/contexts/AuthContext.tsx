import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from '../config/axios';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<User, 'name' | 'phone'>> & { password?: string }) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });


  const login = async (email: string, password: string) => {
    const response = await axiosInstance.post('/api/auth/login', { email, password });
    const { token, user: userData } = response.data;
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);

    setTimeout(() => {
      if (userData.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard';
      }
    }, 100);
  };

  const register = async (data: RegisterData) => {
    const response = await axiosInstance.post('/api/auth/register', data);
    const { token, user: userData } = response.data;
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);

    setTimeout(() => {
      if (userData.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard';
      }
    }, 100);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  const updateProfile = async (data: Partial<Pick<User, 'name' | 'phone'>> & { password?: string }) => {
    // Update local user state (and persist to localStorage)
    // In a real app this would call the backend API
    const updated = { ...user, ...data } as User;
    // Remove password from stored user object
    const { password: _pw, ...safeUser } = updated as any;
    localStorage.setItem('user', JSON.stringify(safeUser));
    setUser(safeUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};