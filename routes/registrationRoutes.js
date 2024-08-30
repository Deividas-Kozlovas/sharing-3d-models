const express = require('express');
const mongoose = require('mongoose');

module.exports = (User) => {
  const router = express.Router();

  // Handle POST request to /submit-registration
  router.post('/submit-registration', async (req, res) => {
    const { email, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
      return res.status(400).send('Passwords do not match!');
    }

    try {
      // Save form data to MongoDB
      const newUser = new User({
        email: email,
        password: password
      });

      await newUser.save(); // Use async/await to handle saving
      res.send('Form submitted successfully!');
    } catch (err) {
      console.error(err); // Log the error
      res.status(500).send('Error saving data!');
    }
  });

  return router;
};
