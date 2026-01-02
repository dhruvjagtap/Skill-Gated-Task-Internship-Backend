const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentProfile',
        required: true
    },
    skillId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MasterSkill',
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED'],
        default: 'PENDING'
    },
    proof: {
        type: String,
        required: true
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // ADMIN
    },
    verifiedAt: Date,

    rejectionReason: String
}, { timestamps: true });
skillSchema.index({ studentId: 1, skillId: 1 }, { unique: true });
const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;