const mongoose = require('mongoose');

const connectToMongoDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectToMongoDB;