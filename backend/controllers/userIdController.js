const Models = require('../models');

const getUserData = async (req, res) => {
  const { username } = req.params;
  console.log('logging the username on server side:', username);

  try {
    const user = await Models.UsersModel.findOne({ where: { username } });

    if (user) {
      // Extract the relevant user information
      const { user_id, pic, bio, facebook } = user;
      console.log('info from backend:', pic, bio, facebook)

      // Return the user information in the response
      res.json({
        user_id,
        profilePicture: pic,
        bio,
        facebookAccount: facebook,
        // Add other user information here...
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getUserData,
};
