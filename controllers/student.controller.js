const StudentProfile = require('../models/student_profile');

async function completeProfile(req, res) {
    console.log('HIT completeProfile');

    const user = req.user;
    const { university, degree, yearOfStudy } = req.body;

    console.log('USER:', user);
    console.log('BODY:', req.body);

    try {
        if (!user || user.role.toUpperCase() !== 'STUDENT') {
            console.log('FAILED ROLE CHECK');
            return res.redirect('/auth/login');
        }

        if (!university || !degree || !yearOfStudy) {
            console.log('FAILED BODY CHECK');
            return res.redirect('/student/dashboard');
        }

        const profile = await StudentProfile.create({
            userId: user.id,
            university,
            degree,
            yearOfStudy
        });

        console.log('PROFILE CREATED:', profile._id);

        return res.render('/student/dashboard', {
            user,
            profileComplete: true,
            profile,
            layout: 'layouts/dashboard',
            title: 'Student Dashboard'
        });

    } catch (error) {
        console.error('CREATE ERROR:', error);
        return res.redirect('/student/dashboard');
    }
}


module.exports = {
    completeProfile
};
