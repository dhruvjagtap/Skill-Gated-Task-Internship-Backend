// routers/static.router.js
const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    return res.render('auth/login');
});

router.get('/register/student', (req, res) => {
    res.render('auth/register', {
        role: 'Student',
        action: '/auth/student/register'
    });
});

router.get('/register/org', (req, res) => {
    res.render('auth/register', {
        role: 'Organization',
        action: '/auth/org/register'
    });
});


module.exports = router;