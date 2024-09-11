const express = require('express');
const { body } = require('express-validator');
const path = require('path');
const router = express.Router();
const modelsController = require('../controllers/modelsController');

router.post(
    'upload-model',modelsController
);

module.exports = router;