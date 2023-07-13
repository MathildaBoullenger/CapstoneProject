const Models = require("../models");

const joinActivity = async (req, res) => {
  const { user_id, activity_id } = req;

  try {
    // Check if the user is already joined to the activity
    const existingParticipant = await Models.ParticipantsModel.findOne({
      where: { user_id: user_id, activity_id: activity_id },
    });

    if (existingParticipant) {
      // User is already joined to the activity, return an error response
      return res.status(400).json({ message: "User already joined to this activity" });
    }

    // Create a new entry in the "participants" table
    await Models.ParticipantsModel.create({
      user_id,
      activity_id,
      isJoined: true,
    });

    // Return a success response
    res.status(200).json({ message: "Activity joined successfully!" });
  } catch (error) {
    console.error("Error joining activity:", error);
    res.status(500).json({ message: "Failed to join activity. Please try again." });
  }
};

module.exports = {
  joinActivity,
};
