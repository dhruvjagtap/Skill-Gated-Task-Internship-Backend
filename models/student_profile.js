const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    degree: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    yearOfStudy: {
        type: String,
        required: true
    },
    activeTaskCount: {
        type: Number,
        default: 0
    },
    weeklyTaskCount: {
        type: Number,
        default: 0
    },
    completedTaskCount: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);

module.exports = StudentProfile;