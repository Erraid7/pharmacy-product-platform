import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/index.js';

const secret = process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production';

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, secret) as JWTPayload;
  } catch (error) {
    return null;
  }
}
