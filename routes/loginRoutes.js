const express = require('express');
const { body, validationResult } = require('express-validator');
const path = require('path');
const loginController = require('../controllers/loginController');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

// Route for login form
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login/login.html'));
});

// Route to handle login form submission
router.post(
    '/submit-login',
    [
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).send('User not found');
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).send('Invalid credentials');
            }

            // Create session
            req.session.userId = user._id;
            res.redirect('/dashboard'); // Redirect to a protected route or dashboard
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
