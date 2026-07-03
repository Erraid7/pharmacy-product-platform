'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import api from './api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock credentials for demo (when backend isn't available)
const MOCK_CREDENTIALS: Record<string, { password: string; user: User }> = {
  'admin@pharmaflow.com': {
    password: 'admin123',
    user: { id: 'admin-1', email: 'admin@pharmaflow.com', role: 'admin' }
  },
  'worker1@pharmaflow.com': {
    password: 'worker123',
    user: { id: 'worker-1', email: 'worker1@pharmaflow.com', role: 'worker' }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on mount
  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await api.post('/api/auth/login', { email, password });
      setUser(response.data.user);
      localStorage.setItem('pharmaflow_user', JSON.stringify(response.data.user));
    } catch (err: any) {
      // Fallback to mock auth for demo purposes
      const mockUser = MOCK_CREDENTIALS[email];
      if (mockUser && mockUser.password === password) {
        setUser(mockUser.user);
        localStorage.setItem('pharmaflow_user', JSON.stringify(mockUser.user));
        return;
      }
      const errorMessage = err.response?.data?.error || 'Login failed';
      setError(errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.removeItem('pharmaflow_user');
    setUser(null);
    setError(null);
  };

  const refreshUser = async () => {
    try {
      const response = await api.get('/api/auth/me');
      setUser(response.data);
      setError(null);
    } catch (err) {
      // Check localStorage for mock auth session
      const storedUser = localStorage.getItem('pharmaflow_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
