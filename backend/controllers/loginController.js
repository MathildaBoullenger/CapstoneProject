"use strict";
const passport = require("passport");
const jwt = require('jsonwebtoken');
require("dotenv").config();

// Your Passport.js local authentication middleware
const authenticateUser = (req, res, next) => {
  console.log('login controller req, res, next', req, res, next)
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // You can handle the user object here
    // For example, you can generate an access token and send a response
    const accessToken = generateAccessToken(user.username);
    return res.status(200).json({ accessToken });
  })(req, res, next);
};


function generateAccessToken(username) {
  const payload = {
    username: username
  };

  const secretKey = process.env.JWT_SECRET; // Replace with your secret key
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
}

module.exports = {
  authenticateUser,
};
