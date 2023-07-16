const Models = require("../models");

const getParticipant = async (req, res) => {
    const { user_id } = req.params;
    
    try {
      const user = await Models.ParticipantsModel.findAll({ where:{ user_id: user_id }});
      console.log('participants request:', req.params.user_id)
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = {
    getParticipant,
  };