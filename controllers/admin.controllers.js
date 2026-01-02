const Skill = require('../models/skill');
const OrganizationProfile = require('../models/organization_profile');
const Task = require('../models/task');
const Submission = require('../models/submission');


async function getPendingSkills(req, res) {
    try {
        const skills = await Skill.find({ status: 'PENDING' })
            .populate('studentId', 'userId')
            .populate('skillId', 'name category');

        return res.status(200).json({
            count: skills.length,
            skills
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function approveSkill(req, res) {
    try {
        const { skillId } = req.params;

        const skill = await Skill.findOneAndUpdate(
            { _id: skillId, status: 'PENDING' },
            {
                status: 'APPROVED',
                verifiedBy: req.user._id,
                verifiedAt: new Date(),
                rejectionReason: null
            },
            { new: true }
        );

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found or already processed' });
        }

        return res.status(200).json({
            message: 'Skill approved successfully',
            skill
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function rejectSkill(req, res) {
    try {
        const { skillId } = req.params;
        const { rejectionReason } = req.body;

        if (!rejectionReason) {
            return res.status(400).json({ message: 'Rejection reason required' });
        }

        const skill = await Skill.findOneAndUpdate(
            { _id: skillId, status: 'PENDING' },
            {
                status: 'REJECTED',
                verifiedBy: req.user._id,
                verifiedAt: new Date(),
                rejectionReason
            },
            { new: true }
        );

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found or already processed' });
        }

        return res.status(200).json({
            message: 'Skill rejected',
            skill
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function getPendingOrganizations(req, res) {
    try {
        const orgs = await OrganizationProfile.find({
            verificationStatus: 'PENDING'
        });

        return res.status(200).json({
            count: orgs.length,
            organizations: orgs
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function approveOrganization(req, res) {
    try {
        const { organizationId } = req.params;

        const organization = await OrganizationProfile.findOneAndUpdate(
            { _id: organizationId, verificationStatus: 'PENDING' },
            {
                verificationStatus: 'APPROVED',
                isVerified: true,
                verifiedAt: new Date(),
                rejectionReason: null
            },
            { new: true }
        );

        if (!organization) {
            return res.status(404).json({ message: 'Organization not found or already processed' });
        }

        return res.status(200).json({
            message: 'Organization approved',
            organization
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}



async function rejectOrganization(req, res) {
    try {
        const { organizationId } = req.params;
        const { rejectionReason } = req.body;

        const organization = await OrganizationProfile.findOneAndUpdate(
            { _id: organizationId, verificationStatus: 'PENDING' },
            {
                verificationStatus: 'REJECTED',
                isVerified: false,
                rejectionReason,
                verifiedAt: new Date()
            },
            { new: true }
        );

        if (!organization) {
            return res.status(404).json({ message: 'Organization not found or already processed' });
        }

        return res.status(200).json({
            message: 'Organization rejected',
            organization
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function getPendingTasks(req, res) {
    try {
        const tasks = await Task.find({ status: 'PENDING' })
            .populate('organizationId', 'userId');

        return res.status(200).json({
            count: tasks.length,
            tasks
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function approveTask(req, res) {
    try {
        const { taskId } = req.params;

        const task = await Task.findOneAndUpdate(
            { _id: taskId, status: 'PENDING' },
            {
                status: 'OPEN',
                verifiedBy: req.user._id,
                verifiedAt: new Date(),
                rejectionReason: null
            },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found or already processed' });
        }

        return res.status(200).json({
            message: 'Task approved',
            task
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function rejectTask(req, res) {
    try {
        const { taskId } = req.params;
        const { rejectionReason } = req.body;

        const task = await Task.findOneAndUpdate(
            { _id: taskId, status: 'PENDING' },
            {
                status: 'REJECTED',
                verifiedBy: req.user._id,
                rejectionReason
            },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found or already processed' });
        }

        return res.status(200).json({
            message: 'Task rejected',
            task
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function overrideSubmission(req, res) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const { submissionId } = req.params;
        const { action } = req.body;

        const submission = await Submission.findById(submissionId).session(session);
        if (!submission) throw new Error('Submission not found');

        const task = await Task.findById(submission.taskId).session(session);
        if (!task) throw new Error('Task not found');

        submission.status = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
        submission.reviewedBy = req.user._id;

        task.status = submission.status;

        await submission.save({ session });
        await task.save({ session });

        await StudentProfile.findByIdAndUpdate(
            submission.studentId,
            {
                $inc: {
                    activeTaskCount: -1,
                    completedTaskCount: action === 'APPROVE' ? 1 : 0
                }
            },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: `Submission overridden by admin`
        });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        console.error(err);
        return res.status(400).json({
            message: err.message || 'Override failed'
        });
    }
}


module.exports = {
    getPendingSkills,
    approveSkill,
    rejectSkill,
    getPendingOrganizations,
    approveOrganization,
    rejectOrganization,
    getPendingTasks,
    approveTask,
    rejectTask,
    overrideSubmission
};

// Student
// POST /student/tasks/:taskId/submit

// Organization
// PATCH /organization/submissions/:submissionId/review

// Admin (override)
// PATCH /admin/submissions/:submissionId/override