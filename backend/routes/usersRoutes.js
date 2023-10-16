const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const upload = require('../controllers/multerConfig');
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;


router.post('/login', passport.authenticate('local', {
  successRedirect: '/', // Replace with your desired success route
  failureRedirect: '/login',    // Replace with your login page route
  //failureFlash: true            // Optional for displaying flash messages
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login'); // Replace with your login page route
});

/*router.post("/register", (req, res) => {
  controllers.registrationsController.registerUser(req.body, res);
});*/

router.get("/usersId/:username", passport.authenticate("local"), (req, res) => {
  controllers.userIdController.getUserData(req, res);
});

/*router.post("/login-token", (req, res) => {
  controllers.loginController.userLogin(req.body, res);
});*/

router.post('/profile', passport.authenticate("local"), upload.single('profilePicture'), (req, res) => {
  controllers.imageBioController.saveProfile(req, res);
});

router.post('/facebook', passport.authenticate("local"), (req, res) => {
  controllers.facebookController.addFacebook(req, res);
});

router.get('/user/:userId', passport.authenticate("local"), (req, res) => {
  controllers.getUserController.getUser(req, res);
});

router.get('/images/:imageName',passport.authenticate("local"), (req, res) => {
  controllers.imagesController.getImage(req, res);
});

router.get('/participant/:user_id',passport.authenticate("local"), (req, res) => {
  controllers.participantController.getParticipant(req, res);
});

router.post("/update-pic", passport.authenticate("local"), upload.single('profilePicture'), (req, res) => {
  controllers.updateProfileController.updatePic(req, res);
});

router.post("/update-bio", passport.authenticate("local"), (req, res) => {
  controllers.updateProfileController.updateBio(req, res);
});

router.post("/update-facebook", passport.authenticate("local"),(req, res) => {
  controllers.updateProfileController.updateFacebook(req, res);
});

{/*
router.post('/api/images', (req, res) => {
  controllers.imagesController.uploadImage(req, res);
});
*/}

module.exports = router;
