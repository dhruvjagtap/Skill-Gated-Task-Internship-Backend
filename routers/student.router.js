const express = require('express');
const router = express.Router();
const { completeProfile } = require('../controllers/student.controller');
const { checkAuth, restrictTo } = require('../middlewares/auth.middleware');

router.post('/complete-profile', checkAuth, restrictTo(['STUDENT']), completeProfile);

module.exports = router;