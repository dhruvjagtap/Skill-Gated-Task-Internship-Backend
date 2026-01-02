const express = require('express');
const router = express.Router();

const { requireAuth, restrictTo } = require('../middlewares/auth.middleware');
const { attachOrganizationProfile } = require('../middlewares/organization.middleware');

const {
    createOrganizationProfile,
    createTask,
    getApplicantsForTask,
    acceptApplication,
    rejectApplication
} = require('../controllers/org.controller');

// All organization routes:
//  - require auth
//  - require ORGANIZATION role
router.use(requireAuth, restrictTo(['ORGANIZATION']));

// Create organization profile
router.post('/profile', createOrganizationProfile);

// Create task
router.post(
    '/tasks',
    attachOrganizationProfile,
    createTask
);

// Get applicants for a task
router.get(
    '/tasks/:taskId/applicants',
    attachOrganizationProfile,
    getApplicantsForTask
);

// Accept application (assign student → IN_PROGRESS)
router.post(
    '/tasks/:taskId/applications/:applicationId/accept',
    attachOrganizationProfile,
    acceptApplication
);

// Reject application
router.post(
    '/applications/:applicationId/reject',
    attachOrganizationProfile,
    rejectApplication
);

// Review Submitted application
router.patch(
    '/submissions/:submissionId/review',
    attachOrganizationProfile,
    reviewSubmission
);


module.exports = router;
