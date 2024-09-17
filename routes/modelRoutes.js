const express = require('express');
const multer = require('multer');
const path = require('path');
const Model = require('../models/Model');

const router = express.Router();

// Configure multer to store files in 'uploads' directory
const upload = multer({ dest: 'uploads/' });

// POST route to upload a model file
router.post('/upload-model', upload.single('modelFile'), async (req, res) => {
    try {
        // Check if the user is logged in
        const userId = req.session.userId; // Assuming the user's ID is stored in the session
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized. Please log in.' });
        }

        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Store the file metadata in MongoDB along with the userId
        const newModel = new Model({
            fileName: req.file.originalname,
            filePath: req.file.path,
            userId: userId, // Store the userId to associate the model with the logged-in user
            uploadDate: new Date()
        });

        await newModel.save(); // Save model metadata to the database

        res.status(201).json({ message: 'File uploaded successfully!' });
    } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

module.exports = router;
