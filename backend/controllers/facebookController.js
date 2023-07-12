const Models = require("../models");

const addFacebook = async (req, res) => {
    try {
      const { username, facebookAccount } = req.body;
  
      const user = await Models.UsersModel.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user's Facebook account
      user.facebook = facebookAccount;
      await user.save();
  
      return res.status(200).json({ message: 'Facebook account added successfully' });
    } catch (error) {
      console.error('Error saving Facebook account:', error);
      return res.status(500).json({ message: 'Failed to save Facebook account' });
    }
  };

  module.exports = {
    addFacebook,
  };