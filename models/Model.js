const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    userId: { // Reference the user who uploaded the model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    }
});

module.exports = mongoose.model('Model', modelSchema);
