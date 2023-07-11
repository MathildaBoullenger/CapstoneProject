const Models = require("../models");
//const upload = require('../controllers/multerConfig')

const saveProfile = async (req, res) => {
  try {
    const { bio, username, password } = req.body;
    console.log('first log in image/bio:', req.body);
    const { path: profilePicturePath, originalname: profilePictureName } = req.file;
    console.log('second log in image/bio:', req.file);

    console.log("profilePicturePath:", profilePicturePath);
    console.log("profilePictureName:", profilePictureName);
    console.log("bio:", bio);
    console.log("username:", username);
    console.log("password:", password);

    // Perform database operations to save the form data
    {/*await Models.UsersModel.update(
      { pic: profilePicturePath, bio: bio },
      { where: { username, password } }
    );*/}

    Models.UsersModel.sequelize.sync().then(async () => {
    const user = await Models.UsersModel.findOne({ where: { username, password } });
    if (user) {
      console.log('try adding to database:', user)
      user.pic = profilePictureName;
      console.log('new user pic:', user.pic)
      user.bio = bio;
      console.log('new user bio:', user.bio)
      await user.save();
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
