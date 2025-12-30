const bcrypt = require('bcrypt');
const User = require('../models/user');
const { setUser, registerUser } = require('../services/auth.service');

async function studentRegister(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).render('auth/register', { role: 'Student', error: 'All fields are required' });

    try {
        const user = await User.findOne({ email });

        if (user) return res.status(400).render('auth/register', { role: 'Student', action: '/auth/student/register', error: 'User already exists' });

        await registerUser({
            name,
            email,
            password,
            role: 'STUDENT'
        })

        return res.redirect('/student/dashboard');
    } catch (error) {
        console.error(error);
        return res.status(500).render('auth/register', { role: 'Student', action: '/auth/student/register', error: 'Internal server error' });
    }
}

async function organizationRegister(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).render('auth/register', { role: 'Organization', action: '/auth/sorg/register', error: 'All fields are required' });

    try {
        const user = await User.findOne({ email });

        if (user) return res.status(400).render('auth/register', { role: 'Organization', action: '/auth/sorg/register', error: 'User already exists' });

        await registerUser({
            name,
            email,
            password,
            role: 'ORGANIZATION'
        })

        return res.redirect('/org/dashboard');
    } catch (error) {
        return res.status(500).render('auth/register', { role: 'Organization', action: '/auth/sorg/register', error: 'Internal server error' });
    }
}

async function createAdmin(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).render('auth/register', { role: 'Admin', error: 'All fields are required' });

    try {
        const user = await User.findOne({ email });

        if (user) return res.status(400).render('auth/register', { role: 'Admin', error: 'User already exists' });
        await registerUser({
            name,
            email,
            password,
            role: 'ADMIN'
        })

        return res.redirect('/admin/dashboard');
    } catch (error) {
        return res.status(500).render('auth/register', { role: 'Admin', error: 'Internal server error' });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).render('auth/login', { error: 'All fields are required' });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).render('auth/login', { error: 'User not found' });
        }

        if (user.status === 'SUSPENDED') {
            return res.status(403).render('auth/login', { error: 'Account suspended' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).render('auth/login', { error: 'Invalid credentials' });
        }

        const token = setUser(user)
        res.cookie('uid', token, { httpOnly: true });

        switch (user.role) {
            case 'STUDENT':
                return res.status(200).redirect('/student/dashboard');
            case 'ORGANIZATION':
                return res.status(200).redirect('/org/dashboard');
            case 'ADMIN':
                return res.status(200).redirect('/admin/dashboard');
            default:
                return res.status(400).render('auth/login', { error: 'Invalid user role' });
        }

    } catch (error) {
        res.status(500).render('auth/login', { error: 'Internal server error' });
    }
}

module.exports = {
    studentRegister,
    organizationRegister,
    createAdmin,
    login
};