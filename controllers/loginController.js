// controllers/loginController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.loginUser = async (req, res) => {
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

        // Redirect to home page or dashboard
        res.redirect('/dashboard'); // Adjust to your desired route
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
