"use strict";
const Models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

require("dotenv").config();

const userLogin = async (req, res) => {
  
  const { username, password } = req;
  console.log('first log');

  try {
    // Find the user by the provided username
    const user = await Models.UsersModel.findOne({ where: { username: username }, });
    console.log(2)
    // If the user is not found, respond with an error message
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(3)

    // If the password is invalid, respond with an error message
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Password is valid, generate and return an access token
    const accessToken = generateAccessToken(username);
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
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
  userLogin,
};
