const StudentProfile = require('../models/student_profile');
const MasterSkill = require('../models/master_skill');
const Skill = require('../models/skill');
const Task = require('../models/task');
const Application = require('../models/application');
const Submission = require('../models/submission');

async function createProfile(req, res) {
    try {
        const { university, degree, yearOfStudy } = req.body;
        const userId = req.user._id;

        const existing = await StudentProfile.findOne({ userId });
        if (existing) {
            return res.status(400).json({ message: 'Profile already exists' });
        }

        const profile = await StudentProfile.create({
            userId,
            university,
            degree,
            yearOfStudy
        });

        return res.status(201).json({
            message: 'Profile created successfully',
            profile
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function requestSkillVerification(req, res) {
    try {
        const { skillId, proof } = req.body;
        const studentProfileId = req.profile._id;

        const masterSkill = await MasterSkill.findById(skillId);
        if (!masterSkill || !masterSkill.isActive) {
            return res.status(404).json({ message: 'Skill not found or inactive' });
        }

        const existing = await Skill.findOne({
            studentId: studentProfileId,
            skillId
        });

        if (existing) {
            return res.status(400).json({ message: 'Skill already requested' });
        }

        await Skill.create({
            studentId: studentProfileId,
            skillId,
            proof,
            status: 'PENDING'
        });

        return res.status(201).json({
            message: 'Skill verification request submitted'
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function applyForTask(req, res) {
    try {
        const { taskId } = req.params;
        const profile = req.profile;
        const studentId = profile._id;

        if (profile.isSuspended) {
            return res.status(403).json({ message: 'Your account is suspended' });
        }

        const task = await Task.findOne({
            _id: taskId,
            status: 'OPEN'
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or not open' });
        }

        // ---- Academic Protection Rules ----
        if (profile.activeTaskCount >= 2) {
            return res.status(403).json({ message: 'Active task limit reached' });
        }

        if (profile.weeklyTaskCount >= 5) {
            return res.status(403).json({ message: 'Weekly task limit exceeded' });
        }

        // ---- Skill Gate Check ----
        // const approvedSkills = await Skill.find({
        //     studentId,
        //     status: 'APPROVED'
        // }).select('skillId');

        // const approvedSkillIds = approvedSkills.map(s =>
        //     s.skillId.toString()
        // );

        // const hasAllSkills = task.requiredSkills.every(skillId =>
        //     approvedSkillIds.includes(skillId.toString())
        // );

        // if (!hasAllSkills) {
        //     return res.status(403).json({
        //         message: 'You do not meet the required skill criteria'
        //     });
        // }

        const approvedCount = await Skill.countDocuments({
            studentId,
            status: 'APPROVED',
            skillId: { $in: task.requiredSkills }
        });

        if (approvedCount !== task.requiredSkills.length) {
            return res.status(403).json({ message: 'Missing required skills' });
        }


        // ---- Prevent Duplicate Applications ----
        const existingApplication = await Application.findOne({
            taskId,
            studentId
        });

        if (existingApplication) {
            return res.status(400).json({
                message: 'You have already applied for this task'
            });
        }

        await Application.create({
            taskId,
            studentId,
            status: 'APPLIED'
        });

        return res.status(201).json({
            message: 'Successfully applied for task'
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// GET  /student/tasks/applied

async function getAppliedTasks(req, res) {
    try {
        const studentId = req.profile._id;

        const applications = await Application.find({ studentId })
            .populate('taskId', 'title status payout durationInDays')
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


// POST /student/tasks/:taskId/submit

async function submitTask(req, res) {
    try {
        const { taskId } = req.params;
        const { submissionLink } = req.body;
        const studentId = req.profile._id;

        const task = await Task.findOne({
            _id: taskId,
            assignedStudent: studentId,
            status: 'IN_PROGRESS'
        });

        if (!task) {
            return res.status(404).json({
                message: 'Task not assigned to you or not in progress'
            });
        }

        const existingSubmission = await Submission.findOne({
            taskId,
            studentId
        });

        if (existingSubmission) {
            return res.status(400).json({
                message: 'You have already submitted this task'
            });
        }

        const submission = await Submission.create({
            taskId,
            studentId,
            content: submissionLink
        });

        task.status = 'SUBMITTED';
        await task.save();

        return res.status(200).json({
            message: 'Task submitted successfully',
            submission
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    createProfile,
    requestSkillVerification,
    applyForTask,
    getAppliedTasks,
    submitTask
};

