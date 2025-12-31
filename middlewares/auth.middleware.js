const { getUser } = require('../services/auth.service');

function checkAuth(req, res, next) {
    const token = req.cookies?.uid;
    req.user = null;
    if (!token) {
        return res.redirect('/auth/login');
    }
    const user = getUser(token);
    if (!user) {
        return res.redirect('/auth/login');
    }
    req.user = user;
    return next();
}

function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/login');

        if (!roles.includes(req.user.role)) return res.status(403).end('Access denied');

        return next();
    }
}

module.exports = {
    checkAuth,
    restrictTo
};