const Models = require('../models');

const getUserID = async (req, res) => {
  const { username } = req.params;
  console.log('logging the username on server side:', username)
  try {
    const user = await Models.UsersModel.findOne({ where:{username: req.params.username }});
    
    if (user) {
      res.json({ user_id: user.user_id });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getUserID,
};
