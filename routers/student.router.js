const express = require('express');
const router = express.Router();

const {
    createProfile,
    requestSkillVerification,
    applyForTask,
    getAppliedTasks,
    submitTask
} = require('../controllers/student.controller');

const { requireAuth, restrictTo } = require('../middlewares/auth.middleware');
const { attachStudentProfile } = require('../middlewares/student.middleware');


//  All student routes:
//  - require authentication
//  - require STUDENT role
router.use(requireAuth, restrictTo(['STUDENT']));

// Profile
router.post('/profile', createProfile);

//  Skill verification
router.post(
    '/skills',
    attachStudentProfile,
    requestSkillVerification
);

//  Task application
router.post(
    '/tasks/:taskId/apply',
    attachStudentProfile,
    applyForTask
);

//  Get applied tasks

router.get(
    '/tasks/applied',
    attachStudentProfile,
    getAppliedTasks
);

//  Submit task
router.post(
    '/tasks/:taskId/submit',
    attachStudentProfile,
    submitTask
);

module.exports = router;
