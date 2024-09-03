// routes/homeRoutes.js
const express = require('express');
const path = require('path'); // Import the path module
const router = express.Router();

// Define your home route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;