const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.post('/new-activity', (req, res) => {
    controllers.newActivityController.addActivity(req.body, res);
  });

router.get('/activities/:hobby', (req, res) => {
    controllers.getActivitiesByHobby.getActivitiesByHobby(req, res);
})

module.exports = router;