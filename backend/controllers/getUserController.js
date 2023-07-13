const Models = require("../models");

const getUser = async (req, res) => {
    const { user_id } = req.params;
    
    try {
      const user = await Models.UsersModel.findAll({ where:{ user_id: user_id }});
      console.log('request:', req.params.user_id)
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = {
    getUser,
  };
  