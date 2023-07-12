const Models = require("../models");
//const upload = require('../controllers/multerConfig')

const saveProfile = async (req, res) => {
  try {
    const { bio, username } = req.body;
    console.log('first log in image/bio:', req.body);
    const { path: profilePicturePath, originalname: profilePictureName } = req.file;
    console.log('second log in image/bio:', req.file);

    console.log("profilePicturePath:", profilePicturePath);
    console.log("profilePictureName:", profilePictureName);
    console.log("bio:", bio);
    console.log("username:", username);

    // Perform database operations to save the form data
    {/*await Models.UsersModel.update(
      { pic: profilePicturePath, bio: bio },
      { where: { username, password } }
    );*/}

    Models.UsersModel.sequelize.sync().then(async () => {
    const user = await Models.UsersModel.findOne({ where: { username } });
    if (user) {
      await Models.UsersModel.update(
        { pic: profilePicturePath, bio: bio },
        { where: { username } })
    }});

    res.status(200).json({ message: "Profile information saved successfully." });
  } catch (error) {
    console.error("Error saving profile information:", error);
    res.status(500).json({ message: "Failed to save profile information." });
  }
};

module.exports = {
  saveProfile,
};
