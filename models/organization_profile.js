const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    organizationName: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    verifiedAt: Date,

    verificationStatus: {
        type: String,
        enum: ['PENDING', 'VERIFIED', 'REJECTED'],
        default: 'PENDING'
    },

    isVerified: {
        type: Boolean,
        default: false
    },
    rejectionReason: String
}, { timestamps: true });

const OrganizationProfile = mongoose.model('OrganizationProfile', organizationSchema);

module.exports = OrganizationProfile;