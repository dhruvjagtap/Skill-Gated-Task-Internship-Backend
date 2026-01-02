const mongoose = require('mongoose');

const masterSkillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    category: {
        type: String,
        enum: [
            'PROGRAMMING',
            'FRONTEND',
            'BACKEND',
            'DESIGN',
            'DEVOPS',
            'DATA',
            'MARKETING',
            'OTHER'
        ],
        required: true
    },

    description: {
        type: String
    },

    isActive: {
        type: Boolean,
        default: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // ADMIN
    }
}, { timestamps: true });

const MasterSkill = mongoose.model('MasterSkill', masterSkillSchema);
module.exports = MasterSkill;