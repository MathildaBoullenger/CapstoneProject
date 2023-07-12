const Models = require('../models');

const getActivitiesByHobby = async (req, res) => {
  const { hobby } = req.params;
  console.log('request:', hobby)

  try {
    const activities = await Models.ActivitiesModel.findAll({ where:{hobby: req.params.hobby }});
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getActivitiesByHobby,
};






