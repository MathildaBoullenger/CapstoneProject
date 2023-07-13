const Models = require("../models");

const getJoinedActivities = async (req, res) => {
  const { user_id } = req.query;

  try {
    // Retrieve the joined activities of the user from the Participants Model
    const joinedActivities = await Models.ParticipantsModel.findAll({
      where: { user_id: req.params.user_id },
      include: [
        {
          model: Models.ActivitiesModel,
          include: [Models.UsersModel],
        },
      ],
    });

    console.log('joinedActivities:', joinedActivities); // Add this line for debugging

    // Convert joinedActivities to a plain JavaScript object or array
    const joinedActivitiesData = joinedActivities.map(item => item.toJSON());

    // Extract user data from the joined activities
    const userData = joinedActivitiesData.map(activity => activity.activity.user);

    // Return both user data and joined activities as a response
    res.status(200).json({ userData, joinedActivities: joinedActivitiesData });
  } catch (error) {
    console.error("Error retrieving joined activities:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve joined activities. Please try again." });
  }
};

module.exports = {
  getJoinedActivities,
};
