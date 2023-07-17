const Models = require("../models");
const upload = require('../controllers/multerConfig')

const updatePic = async (req, res) => {
  try {
    const { profilePicture, user_id } = req.body;
    console.log('first log in update:', req.body);
    const { path: profilePicturePath, originalname: profilePictureName } = req.file;
    console.log('second log in update:', req.file);

    console.log("profilePicturePath:", profilePicturePath);
    console.log("profilePictureName:", profilePictureName);
    console.log("user id:", user_id);

    // Perform database operations to save the profile picture path
    await Models.UsersModel.update(
      { pic: profilePicturePath },
      { where: { user_id } }
    );

    res.status(200).json({ message: "Profile picture updated successfully." });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Failed to update profile picture." });
  }
};

const updateBio = async (req, res) => {
  try {
    const { bio, user_id } = req.body;

    // Perform database operations to update the user's bio
    await Models.UsersModel.update(
      { bio: bio },
      { where: { user_id } }
    );

    res.status(200).json({ message: "Bio updated successfully." });
  } catch (error) {
    console.error("Error updating bio:", error);
    res.status(500).json({ message: "Failed to update bio." });
  }
};

const updateFacebook = async (req, res) => {
  try {
    const { facebook, user_id } = req.body;

    // Perform database operations to update the user's bio
    await Models.UsersModel.update(
      { facebook: facebook },
      { where: { user_id } }
    );

    res.status(200).json({ message: "Facebook updated successfully." });
  } catch (error) {
    console.error("Error updating bio:", error);
    res.status(500).json({ message: "Failed to update bio." });
  }
};

module.exports = {
  updatePic,
  updateBio,
  updateFacebook
};


