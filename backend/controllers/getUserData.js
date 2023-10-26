const express = require('express');
const router = express.Router();

// Import any necessary middleware and modules
const passport = require('passport');

const getUserData = (req, res) => {
 if (passport.authenticate("local")) {
    // Access user data from the session
    const userData = req.user;

    // Respond with the user data as JSON
    res.json(userData);
  } else {
    // Handle the case where the user is not authenticated
    res.status(401).json({ message: 'Unauthorized access' });
  }   
}

module.exports = {
    getUserData,
  };