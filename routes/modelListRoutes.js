const express = require('express');
const path = require('path');
const modelController = require('../controllers/modelsController'); // Ensure this path is correct
const router = express.Router();

// Serve the static HTML page
router.get('/', modelController.getModelListPage);

// Endpoint to get all models
router.get('/all', modelController.getAllModels);

module.exports = router;
