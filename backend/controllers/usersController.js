"use strict"
const Models = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

  const registerUser = async (req, res) => {
    console.log('register user request:', req)

    const { username, email, password } = req;
    console.log('first log')
    try {
  
     // Validate input data
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
      }
  
      // Check if the username or email is already registered
      console.log(1)
      const existingUser = await Models.UsersModel.findOne({
        where: {
          [Op.or]: [{ username: username }, { email: email}],
        },
      });
      console.log(2)
  
      if (existingUser) {
        return res.status(400).json({ error: 'Username or email is already registered.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      console.log('log before adding user')
      // Create a new user record

      await Models.UsersModel.sync()

      const newUser = await Models.UsersModel.create({
        username,
        email,
        password: hashedPassword,
      });
      console.log('log after adding user')
  
      // Return a success response
      return res.status(201).json({ message: 'Registration successful!', user: newUser });
    } catch (error) {
      console.error('Registration failed:', error);
      return res.status(500).json({ error: 'Registration failed. Please try again later.' });
    }
  };

  module.exports = {
    registerUser
  };