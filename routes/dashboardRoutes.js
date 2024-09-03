// routes/dashboardRoutes.js
const express = require('express');
const path = require('path');
const router = express.Router();

// Serve the dashboard page
router.get('/', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }
    res.sendFile(path.join(__dirname, '../public/dashboard/dashboard.html'));
});

module.exports = router;
