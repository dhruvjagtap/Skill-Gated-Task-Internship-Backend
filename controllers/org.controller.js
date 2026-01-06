const OrganizationProfile = require('../models/organization_profile');
const Task = require('../models/task');
const Application = require('../models/application');
const StudentProfile = require('../models/student_profile');
const Submission = require('../models/submission');
const mongoose = require('mongoose')

async function createOrganizationProfile(req, res) {
    try {
        const { description } = req.body;
        const userId = req.user.id;

        if (!description || description.length < 20) {
            return res.status(400).json({ message: 'Description too short' });
        }

        const existing = await OrganizationProfile.findOne({ userId });
        if (existing) {
            return res.status(400).json({ message: 'Profile already exists' });
        }

        console.log(existing);

        const profile = await OrganizationProfile.create({
            userId,
            description
        });

        return res.status(201).json({
            message: 'Organization profile created',
            profile
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function createTask(req, res) {
    try {
        const orgProfile = req.organizationProfile;
        const { title, description, requiredSkills, payout, durationInDays } = req.body;

        if (!orgProfile.isVerified) {
            return res.status(403).json({ message: 'Organization not verified' });
        }

        if (!title || !payout || !durationInDays || !Array.isArray(requiredSkills) || requiredSkills.length === 0) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const task = await Task.create({
            organizationId: orgProfile._id,
            title,
            description,
            requiredSkills,
            payout,
            durationInDays,
            status: 'PENDING' // admin approval required
        });

        return res.status(201).json({
            message: 'Task created, pending admin approval',
            taskId: task._id
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getApplicantsForTask(req, res) {
    try {
        const { taskId } = req.params;
        const orgId = req.organizationProfile._id;

        const task = await Task.findOne({
            _id: taskId,
            organizationId: orgId
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const applications = await Application.find({ taskId })
            .populate('studentId', 'userId')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            count: applications.length,
            applications
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// POST /org/tasks/:taskId/applications/:applicationId/accept

async function acceptApplication(req, res) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const { taskId, applicationId } = req.params;
        const orgId = req.organizationProfile._id;

        //  Lock task by status
        const task = await Task.findOne(
            {
                _id: taskId,
                organizationId: orgId,
                status: 'OPEN'
            }
        ).session(session);

        if (!task) {
            throw new Error('Task not found or already assigned');
        }

        //  Accept application
        const application = await Application.findOne(
            {
                _id: applicationId,
                taskId,
                status: 'APPLIED'
            }
        ).session(session);

        if (!application) {
            throw new Error('Application not found');
        }

        task.assignedStudent = application.studentId;
        task.status = 'IN_PROGRESS';

        application.status = 'ACCEPTED';

        await task.save({ session });
        await application.save({ session });

        //  Reject remaining applications
        await Application.updateMany(
            {
                taskId,
                _id: { $ne: applicationId },
                status: 'APPLIED'
            },
            { status: 'REJECTED' },
            { session }
        );

        //  Update student counters
        await StudentProfile.findByIdAndUpdate(
            application.studentId,
            {
                $inc: {
                    activeTaskCount: 1,
                    weeklyTaskCount: 1
                }
            },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: 'Student assigned. Task is now IN_PROGRESS'
        });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        console.error(err);
        return res.status(400).json({
            message: err.message || 'Failed to accept application'
        });
    }
}


// PATCH /organization/applications/:applicationId/reject

async function rejectApplication(req, res) {
    try {
        const { applicationId } = req.params;
        const orgId = req.organizationProfile._id;

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        const task = await Task.findOne({
            _id: application.taskId,
            organizationId: orgId
        });

        if (!task) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        application.status = 'REJECTED';
        await application.save();

        return res.status(200).json({
            message: 'Application rejected',
            application
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function reviewSubmission(req, res) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const { submissionId } = req.params;
        const { action } = req.body;
        const orgId = req.organizationProfile._id;

        const submission = await Submission.findById(submissionId).session(session);
        if (!submission) throw new Error('Submission not found');

        const task = await Task.findOne(
            {
                _id: submission.taskId,
                organizationId: orgId,
                status: 'SUBMITTED'
            }
        ).session(session);

        if (!task) throw new Error('Unauthorized or invalid task state');

        submission.status = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
        submission.reviewedBy = req.user.id;

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
            message: `Submission ${submission.status}`
        });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        console.error(err);
        return res.status(400).json({
            message: err.message || 'Failed to review submission'
        });
    }
}


module.exports = {
    createOrganizationProfile,
    createTask,
    getApplicantsForTask,
    acceptApplication,
    rejectApplication,
    reviewSubmission,
};
