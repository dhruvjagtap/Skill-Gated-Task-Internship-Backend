const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentProfile',
        required: true
    },

    status: {
        type: String,
        enum: ['APPLIED', 'ACCEPTED', 'REJECTED'],
        default: 'APPLIED'
    },

    appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

applicationSchema.index({ taskId: 1, studentId: 1 }, { unique: true });


const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;