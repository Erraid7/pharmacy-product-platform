export type UserRole = 'worker' | 'admin';

export interface User {
  _id?: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Product {
  _id?: string;
  name: string;
  status: 'needed' | 'ordered';
  createdBy: string; // User ID
  orderedBy?: string | null; // User ID who marked as ordered
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthRequest {
  email: string;
  password: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}
