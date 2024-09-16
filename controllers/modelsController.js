const Model = require('../models/Model'); // Ensure this path is correct
const path = require('path');

exports.getModelListPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/modelsList/modelsList.html'));
};

exports.getAllModels = async (req, res) => {
    try {
        const models = await Model.find();
        res.json(models);
    } catch (error) {
        console.error('Error fetching models:', error);
        res.status(500).json({ error: 'Failed to fetch models' });
    }
};

exports.addModel = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const newModel = new Model({
        fileName: req.file.originalname,
        filePath: req.file.path,
        uploadDate: new Date(),
    });

    newModel.save()
        .then(() => res.json({ message: 'File uploaded successfully!', file: req.file }))
        .catch(err => {
            console.error('Error saving model:', err);
            res.status(500).json({ error: 'Failed to save model' });
        });
};
