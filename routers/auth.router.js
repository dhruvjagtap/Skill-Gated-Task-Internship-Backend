// routers/auth.router.js
const express = require('express');

const router = express.Router();

const { studentRegister, organizationRegister, createAdmin, login } = require('../controllers/auth.controller');

router.post('/student/register', studentRegister);
router.post('/org/register', organizationRegister);
router.post('/admin/create', createAdmin);

router.post('/login', login);

module.exports = router;