const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentProfile',
        required: true
    },

    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED'],
        default: 'PENDING'
    },

    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // ADMIN
    }
}, { timestamps: true });


const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;