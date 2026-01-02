const OrganizationProfile = require('../models/organization_profile');

async function attachOrganizationProfile(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const profile = await OrganizationProfile.findOne({
            userId: req.user._id
        });

        if (!profile) {
            return res.status(404).json({
                message: 'Organization profile not found. Please create profile first.'
            });
        }

        if (!profile.isVerified) {
            return res.status(403).json({
                message: 'Organization profile is not verified'
            });
        }

        req.organizationProfile = profile;
        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    attachOrganizationProfile
};
