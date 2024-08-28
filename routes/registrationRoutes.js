const express = require('express');
const router = express.Router();

// Handle POST request to /submit-registration
router.post('/submit-registration', (req, res) => {
    const { email, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.status(400).send('Passwords do not match!');
    }

    // Process form data (e.g., save to database)
    console.log('Email:', email);
    console.log('Password:', password);
    res.send('Form submitted successfully!');
});

module.exports = router;
