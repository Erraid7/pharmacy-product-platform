import { login, getUserById } from '../services/authService.js';
import { loginSchema } from '../validators/schemas.js';
export async function loginController(req, res, next) {
    try {
        const validation = loginSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                error: validation.error.issues[0]?.message || 'Invalid input'
            });
        }
        const { token, user } = await login(validation.data);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.json({ token, user });
    }
    catch (error) {
        next(error);
    }
}
export async function logoutController(req, res) {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
}
export async function meController(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const user = await getUserById(req.user.userId);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=authController.js.map