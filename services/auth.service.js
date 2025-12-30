const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const SECRET_KEY = 'skillgatedsecretkey';

async function registerUser({ name, email, password, role }) {
    hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashPassword,
        role
    });

    return user;
}

function setUser(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
    }, SECRET_KEY,)
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser, getUser, registerUser
}