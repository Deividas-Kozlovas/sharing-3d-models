const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/registrationDB');

// Define a schema and model for registration data
const registrationSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Register the model with Mongoose
const User = mongoose.model('User', registrationSchema);

// Import and use routes for registration
const registrationRoutes = require('./routes/registrationRoutes');
app.use('/', registrationRoutes(User)); // Pass the User model to the routes

// Serve the main HTML page (optional if you have other routes)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
