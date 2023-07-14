const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const upload = require('../controllers/multerConfig');

router.post("/register", (req, res) => {
  controllers.registrationsController.registerUser(req.body, res);
});

router.get("/usersId/:username", (req, res) => {
  controllers.userIdController.getUserID(req, res);
});

router.post("/login-token", (req, res) => {
  controllers.loginController.userLogin(req.body, res);
});

router.post('/profile', upload.single('profilePicture'), (req, res) => {
  controllers.imagBioController.saveProfile(req, res);
});

router.post('/facebook', (req, res) => {
  controllers.facebookController.addFacebook(req, res);
});

router.get('/user/:userId', (req, res) => {
  controllers.getUserController.getUser(req, res);
});

router.get('/images/:imageName', (req, res) => {
  controllers.imagesController.getImage(req, res);
});

{/*
router.post('/api/images', (req, res) => {
  controllers.imagesController.uploadImage(req, res);
});
*/}

module.exports = router;
