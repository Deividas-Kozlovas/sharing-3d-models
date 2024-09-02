const express = require('express');
const { body } = require('express-validator');
const path = require('path'); // Import path module
const registerController = require('../controllers/registerController');

const router = express.Router();

// Route for user registration form
router.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/registration/registration.html'));
});

// Define the registration route with validation
router.post(
    '/submit-registration',
    [
        // Validate inputs
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('repeatPassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),
    ],
    registerController.registerUser
);

module.exports = router;
