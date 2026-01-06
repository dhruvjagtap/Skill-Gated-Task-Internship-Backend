const bcrypt = require('bcrypt');
const User = require('../models/user');
const { setUser } = require('../services/auth.service');

async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        const role = req.role;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user.status === 'INACTIVE') {
            return res.status(403).json({ message: 'Account is INACTIVE' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = setUser(user);

        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false, // true in production (HTTPS)
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        // req.headers.authorization?.split(' ')[1];

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


async function logout(req, res) {
    res.clearCookie('access_token');
    return res.status(200).json({ message: 'Logged out successfully' });
}

async function me(req, res) {
    return res.status(200).json({
        user: req.user
    });
}

module.exports = {
    register,
    login,
    me,
    logout,
};