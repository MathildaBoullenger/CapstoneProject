const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const upload = require("../controllers/multerConfig");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Models = require("../models");
const secretKey = "secretKey";

router.post("/login", async (req, res) => {
  console.log("login", req.body);

  try {
    const { username, password } = req.body;

    // josh: check passwords match first
    const user = await Models.UsersModel.findOne({where: { username } }); // Assuming you have a method to find the user by username in your model

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await user.validPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If the password is valid, generate a token
    const token = jwt.sign({ id: user.username }, secretKey); // Sign the token with your secret key
    console.log("Generated token:", token);

    res.json({ user, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
})

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("request header in backend", token)
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token." });
  }
};

router.get("/verify-token", verifyToken, (req, res) => {
  res.json({ valid: true });
  //console.log('json response from verify token', res.json)
});


/*router.post("/register", (req, res) => {
  controllers.registrationsController.registerUser(req.body, res);
});*/

router.get(
  "/usersId/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controllers.userIdController.getUserData(req, res);
  }
);

/*router.post("/login-token", (req, res) => {
  controllers.loginController.userLogin(req.body, res);
});*/

router.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  upload.single("profilePicture"),
  (req, res) => {
    controllers.imageBioController.saveProfile(req, res);
  }
);

router.post(
  "/facebook",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controllers.facebookController.addFacebook(req, res);
  }
);

router.get(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controllers.getUserController.getUser(req, res);
  }
);

router.get(
  "/images/:imageName",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controllers.imagesController.getImage(req, res);
  }
);

router.get(
  "/participant/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controllers.participantController.getParticipant(req, res);
  }
);

router.post(
  "/update-pic",
  passport.authenticate("jwt", { session: false }),
  upload.single("profilePicture"),
  (req, res) => {
    controllers.updateProfileController.updatePic(req, res);
  }
);

router.post(
  "/update-bio",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controllers.updateProfileController.updateBio(req, res);
  }
);

router.post(
  "/update-facebook",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    controllers.updateProfileController.updateFacebook(req, res);
  }
);

{
  /*
router.post('/api/images', (req, res) => {
  controllers.imagesController.uploadImage(req, res);
});
*/
}

module.exports = router;
