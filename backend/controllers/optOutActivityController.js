const Models = require("../models");

const optOutActivity = async (req, res) => {
  const { user_id, activity_id } = req;

  try {
    // Update the participant entry in the "participants" table and set isJoined to false
    const participant = await Models.ParticipantsModel.findOne({
      where: { user_id, activity_id },
    });

    if (!participant) {
      return res
        .status(400)
        .json({ message: "Participant not found for user and activity" });
    }

    // Update the isJoined column to false
    await participant.update({ isJoined: false });

    // Return a success response
    res.status(200).json({ message: "Opted out of activity successfully!" });
  } catch (error) {
    console.error("Error opting out of activity:", error);
    res
      .status(500)
      .json({ message: "Failed to opt out of activity. Please try again." });
  }
};

module.exports = {
  optOutActivity,
};
