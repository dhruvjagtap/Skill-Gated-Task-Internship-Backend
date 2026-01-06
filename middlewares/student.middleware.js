const StudentProfile = require('../models/student_profile');

async function attachStudentProfile(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const profile = await StudentProfile.findOne({
            userId: req.user.id
        });

        if (!profile) {
            return res.status(404).json({
                message: 'Student profile not found. Please create profile first.'
            });
        }

        if (profile.isSuspended) {
            return res.status(403).json({
                message: 'Student profile is suspended'
            });
        }

        req.profile = profile;
        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    attachStudentProfile
};

module.exports = {
    attachStudentProfile
};
