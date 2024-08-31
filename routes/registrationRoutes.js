// routes/registerRouter.js
const express = require('express');
const { body } = require('express-validator');
const registerController = require('../controllers/registerController');

const router = express.Router();

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
