// routes/loginRoutes.js
const express = require('express');
const { body } = require('express-validator');
const path = require('path');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Route for login form
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login/login.html'));
});

// Handle login form submission using the controller
router.post(
    '/submit-login',
    [
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    loginController.loginUser // Calls the controller method for handling login
);

module.exports = router;
