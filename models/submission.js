const mongooose = require('mongoose');

const submissionSchema = new mongoose.Schema({
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

    content: { type: String, required: true },

    status: {
        type: String,
        enum: ['SUBMITTED', 'APPROVED', 'REJECTED'],
        default: 'SUBMITTED'
    },

    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // ORG or ADMIN
    }
}, { timestamps: true });

const Submission = mongooose.model('Submission', submissionSchema);
module.exports = Submission;