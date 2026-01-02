const express = require('express');
const router = express.Router();

const {
    register,
    login,
    logout,
    me
} = require('../controllers/auth.controller');

const { requireAuth, restrictTo } = require('../middlewares/auth.middleware');

// POST /auth/student/register
// POST /auth/org/register
// POST /auth/admin/create   (protected, admin-only later)
// POST /auth/login
// POST /auth/logout
// GET  /auth/me


router.post('/student/register', register);
router.post('/org/register', register);

// Admin creation should be protected
router.post(
    '/admin/create',
    requireAuth,
    // restrictTo(['ADMIN']),
    register
);

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', requireAuth, me);

module.exports = router;
