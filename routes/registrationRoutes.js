// routes/registrationRoutes.js
const express = require('express');
const { body } = require('express-validator');
const path = require('path');
const router = express.Router();
const registerController = require('../controllers/registerController');

// Route for registration form
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/registration/registration.html'));
});

// Handle registration form submission
router.post(
    '/submit-registration',
    [
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('repeatPassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),
    ],
    registerController.registerUser
);

// Handle email check
router.post('/check-email', (req, res, next) => {
    console.log('check-email route hit');
    next();
}, registerController.checkEmail);

module.exports = router;
