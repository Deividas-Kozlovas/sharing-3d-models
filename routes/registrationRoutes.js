const express = require('express');
const { body, validationResult } = require('express-validator');
const path = require('path');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Route for registration form
router.get('/registration', (req, res) => {
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
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).send('User already exists');
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({ email, password: hashedPassword });
            await newUser.save();

            // Create a session
            req.session.userId = newUser._id;

            // Redirect to the dashboard
            res.redirect('/dashboard');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
