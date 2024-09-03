const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/registrationDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Import routes
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registrationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Mount routes
app.use('/login', loginRoutes);  // Mount loginRoutes at /
app.use('/register', registerRoutes);  // Mount registerRoutes at /
app.use('/dashboard', dashboardRoutes); // Mount dashboardRoutes at /dashboard

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
