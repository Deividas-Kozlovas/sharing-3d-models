// controllers/registerController.js
const User = require('../models/User');
const { validationResult } = require('express-validator');

// controllers/registerController.js
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
    console.log('registerUser route hit'); // Log to check if the route is hit

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Invalid input', details: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        return res.json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// registerController.js
exports.checkEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ error: 'User already exists' });
        }
        return res.json({ success: true });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};
