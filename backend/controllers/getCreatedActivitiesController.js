const Models = require("../models");

const getUserActivities = async (req, res) => {
  const { user_id } = req.params;

  try {
    const activities = await Models.ActivitiesModel.findAll({
      where: { user_id: req.params.user_id },
      include: [
        {
          model: Models.ParticipantsModel,
          include: [Models.UsersModel],
        },
      ],
    });

    res.json(activities);
  } catch (error) {
    console.error("Error fetching user activities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUserActivities,
};
