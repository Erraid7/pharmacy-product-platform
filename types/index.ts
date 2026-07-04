// types/index.ts
export type UserRole = 'worker' | 'admin';

export interface User {
  _id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  status: 'needed' | 'ordered';
  createdBy: {
    _id: string;
    email: string;
  };
  orderedBy?: {
    _id: string;
    email: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContext {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
