"use strict"
const Models = require("../models");

const addActivity = async (req, res) => {
    console.log('register user request:', req)

    const { activity, location, time, hobby, user_id } = req;
    console.log('first log')
    try {
  
     // Validate input data
      if (!activity || !location || !time) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
      }

      await Models.ActivitiesModel.sync()

      const newActivity = await Models.ActivitiesModel.create({
        activity,
        location,
        time,
        hobby, 
        user_id
      });
      console.log('log after adding activity')
  
      // Return a success response
      return res.status(201).json({ message: 'Activity added successfully!', newActivity });
    } catch (error) {
      console.error('Registration failed:', error);
      return res.status(500).json({ error: 'Activity not added. Please try again later.' });
    }
  };

  module.exports = {
    addActivity
  };