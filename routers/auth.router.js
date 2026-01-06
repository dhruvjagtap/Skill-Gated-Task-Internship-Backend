const express = require('express');
const router = express.Router();

const {
    register,
    login,
    logout,
    me
} = require('../controllers/auth.controller');

const { requireAuth } = require('../middlewares/auth.middleware');

router.post('/student/register',
    (req, res, next) => {
        req.role = 'STUDENT';
        next();
    },
    register
);

router.post('/org/register',
    (req, res, next) => {
        req.role = 'ORGANIZATION';
        next();
    },
    register
);


router.post('/admin/create',
    (req, res, next) => {
        req.role = 'ADMIN';
        next();
    },
    register
);

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', requireAuth, me);

module.exports = router;
