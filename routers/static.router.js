const express = require('express');
const router = express.Router();
const StudentProfile = require('../models/student_profile');
const { restrictTo, requireAuth } = require('../middlewares/auth.middleware');
const { attachStudentProfile } = require('../middlewares/student.middleware');

// Auth pages
router.get('/auth/login', (req, res) => {
    res.render('auth/login', {
        layout: false,
    });
});

router.get('/auth/register/student', (req, res) => {
    res.render('auth/register', {
        role: 'Student',
        action: '/auth/student/register',
        layout: false,
    });
});

router.get('/auth/register/org', (req, res) => {
    res.render('auth/register', {
        role: 'Organization',
        action: '/auth/org/register',
        layout: false,
    });
});

// Student dashboard
router.get('/student/dashboard', requireAuth, restrictTo(['STUDENT']), attachStudentProfile, async (req, res) => {
    try {
        const user = req.user;

        const profile = await StudentProfile.findOne({
            userId: user.id
        });

        if (!profile) {
            return res.render('dashboard/student', {
                user,
                profileComplete: false,
                layout: 'layouts/dashboard',
                title: 'Student Dashboard'
            });
        }

        return res.render('dashboard/student', {
            user,
            profileComplete: true,
            profile,
            layout: 'layouts/dashboard',
            title: 'Student Dashboard'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}
);

module.exports = router;
