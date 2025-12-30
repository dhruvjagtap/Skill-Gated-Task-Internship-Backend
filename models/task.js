const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,

    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },

    requiredSkills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill'
    }],

    payout: Number,
    duration: Number,

    status: {
        type: String,
        enum: ['PENDING', 'OPEN', 'IN_PROGRESS', 'SUBMITTED', 'APPROVED', 'REJECTED'],
        default: 'PENDING'
    }
}, { timestamps: true });


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;