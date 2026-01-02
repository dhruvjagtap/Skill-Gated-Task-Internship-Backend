const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,

    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrganizationProfile',
        required: true
    },

    requiredSkills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MasterSkill'
    }],

    payout: {
        type: Number,
        required: true
    },

    durationInDays: {
        type: Number,
        required: true
    },

    applicants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    },

    assignedStudent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentProfile'
    },

    status: {
        type: String,
        enum: [
            'PENDING',     // admin review
            'OPEN',        // students can apply
            'IN_PROGRESS', // assigned
            'SUBMITTED',   // student submitted
            'APPROVED',
            'REJECTED'
        ],
        default: 'PENDING'
    },

    rejectionReason: String,

    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Admin
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;