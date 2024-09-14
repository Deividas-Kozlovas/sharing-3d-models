const express = require('express');
const router = express.Router();
const multer = require('multer');
const Model = require('../models/Model'); // Import the Model schema

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// POST route for file uploads
router.post('/upload-model', upload.single('modelFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create a new document in the Model collection
    try {
        const newModel = new Model({
            fileName: req.file.originalname, // Original file name from the user
            filePath: req.file.path, // Path where multer saved the file
        });

        // Save the model information in the database
        await newModel.save();

        res.json({ message: 'File uploaded and saved to the database successfully!' });
    } catch (error) {
        console.error('Error saving file data:', error);
        res.status(500).json({ error: 'Error saving file data to the database' });
    }
});

module.exports = router;
