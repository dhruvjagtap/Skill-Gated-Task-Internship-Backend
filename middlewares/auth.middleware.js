const { getUser } = require('../services/auth.service');

function requireAuth(req, res, next) {
    try {
        const token = req.cookies?.access_token;

        if (!token) {
            return res.status(401).json({
                message: 'Authentication required'
            });
        }

        const user = getUser(token);

        if (!user) {
            return res.status(401).json({
                message: 'Invalid or expired token'
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }
}

function restrictTo(roles = []) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: 'Authentication required'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Access denied'
            });
        }

        next();
    };
}

module.exports = {
    requireAuth,
    restrictTo
};