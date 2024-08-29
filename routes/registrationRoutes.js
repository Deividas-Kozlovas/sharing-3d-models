const express = require('express');

module.exports = (User) => {
  const router = express.Router();

  // Handle POST request to /submit-registration
  router.post('/submit-registration', (req, res) => {
    const { email, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
      return res.status(400).send('Passwords do not match!');
    }

    // Save form data to MongoDB
    const newUser = new User({
      email: email,
      password: password
    });

    newUser.save((err) => {
      if (err) {
        return res.status(500).send('Error saving data!');
      }
      res.send('Form submitted successfully!');
    });
  });

  return router;
};
