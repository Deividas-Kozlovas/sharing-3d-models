const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true, // File name is required
    },
    filePath: {
        type: String,
        required: true, // File path where the STL file is stored
    },
    uploadDate: {
        type: Date,
        default: Date.now, // Automatically sets the upload date
    }
});

// Create and export the Mongoose model
module.exports = mongoose.model('Model', modelSchema);
