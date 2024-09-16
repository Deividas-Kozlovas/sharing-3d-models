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
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Store the file metadata in MongoDB
        const newModel = new Model({
            fileName: req.file.originalname,
            filePath: req.file.path
        });

        await newModel.save(); // Save model metadata to the database

        res.status(201).json({ message: 'File uploaded successfully!' });
    } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

module.exports = router;
