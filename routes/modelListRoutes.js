const express = require('express');
const { body } = require('express-validator');
const path = require('path');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Route for login form
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/modelList/modelListRoutes.html'));
});


module.exports = router;
