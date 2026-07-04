'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'pharmaflow_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get<User>('/api/auth/me');

      setUser(data);
      setError(null);

      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
    } catch (err: any) {
      setUser(null);
      localStorage.removeItem(USER_STORAGE_KEY);

      if (err?.response?.status !== 401) {
        setError(
          err?.response?.data?.error ??
            err?.response?.data?.message ??
            'Unable to verify your session.'
        );
      }
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<User> => {
      try {
        setError(null);

        const response = await api.post('/api/auth/login', {
          email,
          password,
        });

        /**
         * The backend sets the HttpOnly cookie.
         * We immediately fetch /me to ensure the cookie
         * is accepted and the authenticated user is loaded.
         */

        const me = await api.get<User>('/api/auth/me');

        setUser(me.data);

        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(me.data));

        return me.data;
      } catch (err: any) {
        setUser(null);
        localStorage.removeItem(USER_STORAGE_KEY);

        const message =
          err?.response?.data?.error ??
          err?.response?.data?.message ??
          'Login failed.';

        setError(message);

        throw new Error(message);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (_) {
      // ignore backend logout errors
    }

    localStorage.removeItem(USER_STORAGE_KEY);

    setUser(null);
    setError(null);

    router.replace('/login');
    router.refresh();
  }, [router]);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        await refreshUser();
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, [refreshUser]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      error,
      login,
      logout,
      refreshUser,
      clearError,
    }),
    [
      user,
      isLoading,
      error,
      login,
      logout,
      refreshUser,
      clearError,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}