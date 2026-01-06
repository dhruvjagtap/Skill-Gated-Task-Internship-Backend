const express = require('express');
const router = express.Router();

const {
    getPendingSkills,
    approveSkill,
    rejectSkill,
    getPendingOrganizations,
    approveOrganization,
    rejectOrganization,
    getPendingTasks,
    approveTask,
    rejectTask,
    overrideSubmission,
    createMasterSkill
} = require('../controllers/admin.controller');

const { requireAuth, restrictTo } = require('../middlewares/auth.middleware');

// All admin routes
router.use(requireAuth, restrictTo(['ADMIN']));

// Skill verification
router.get('/skills', getPendingSkills);
router.patch('/skills/:skillId/approve', approveSkill);
router.patch('/skills/:skillId/reject', rejectSkill);

// Organization verification
router.get('/organizations', getPendingOrganizations);
router.patch('/organizations/:organizationId/approve', approveOrganization);
router.patch('/organizations/:organizationId/reject', rejectOrganization);

// Task verification
router.get('/tasks', getPendingTasks);
router.patch('/tasks/:taskId/approve', approveTask);
router.patch('/tasks/:taskId/reject', rejectTask);

// Admin override submission
router.patch('/submissions/:submissionId/override', overrideSubmission);

router.post(
    '/master-skills',
    requireAuth,
    restrictTo(['ADMIN']),
    createMasterSkill
);


module.exports = router;
