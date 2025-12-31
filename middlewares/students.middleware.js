const StudentProfile = require('../models/student_profile');
async function attachStudentProfile(req, res, next) {
    try {
        if (!req.user) return next();

        const profile = await StudentProfile.findOne({
            user: req.user._id
        });

        req.profile = profile;
        return next();
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = {
    attachStudentProfile
};