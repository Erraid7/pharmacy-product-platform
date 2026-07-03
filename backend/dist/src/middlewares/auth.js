import { verifyToken } from '../config/jwt.js';
export async function authMiddleware(req, res, next) {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const payload = verifyToken(token);
        if (!payload) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
        req.user = payload;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}
export async function adminMiddleware(req, res, next) {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden - Admin access required' });
    }
    next();
}
//# sourceMappingURL=auth.js.map