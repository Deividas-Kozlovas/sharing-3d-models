const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redisClient = require('./redisClient');
const multer = require('multer');
const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session middleware
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/registrationDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Import routes
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registrationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const modelRoutes = require('./routes/modelRoutes');
const modelsListRoutes = require('./routes/modelListRoutes');

// Mount routes
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/model', modelRoutes); 
app.use('/model-list', modelsListRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
