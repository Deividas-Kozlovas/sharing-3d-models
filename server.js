// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, JS, etc.) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB (use your correct MongoDB URL)
mongoose.connect('mongodb://localhost:27017/registrationDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Import and use routes for registration
const registrationRoutes = require('./routes/registerRouter');
app.use('/', registrationRoutes); // Routes for user registration

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
