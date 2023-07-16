const Models = require("../models");

const getActivitiesByHobby = async (req, res) => {
  const { hobby } = req.params;
  console.log('request:', hobby)

  try {
    const activities = await Models.ActivitiesModel.findAll({
      where: { hobby: req.params.hobby },
      include: [
        {
          model: Models.UsersModel,
          attributes: ["user_id", "username", "email"],
        },
      ],
    });

    // Convert the activities data to JSON format
    const activitiesData = activities.map((activity) => activity.toJSON());

    // Now each activity object will have nested User data directly accessible as 'User'
    res.json(activitiesData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getActivitiesByHobby,
};
