const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    organizationAddress: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
}, { timestamps: true });

const OrganizationProfile = mongoose.model('OrganizationProfile', organizationSchema);

module.exports = OrganizationProfile;