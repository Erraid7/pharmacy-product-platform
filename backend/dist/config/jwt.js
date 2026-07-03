import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production';
export function generateToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: '7d' });
}
export function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    }
    catch (error) {
        return null;
    }
}
//# sourceMappingURL=jwt.js.map