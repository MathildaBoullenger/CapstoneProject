const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.post('/new-activity', (req, res) => {
    controllers.newActivityController.addActivity(req.body, res);
  });

router.get('/activities/:hobby', (req, res) => {
    controllers.getActivitiesByHobby.getActivitiesByHobby(req, res);
})

router.post('/join-activity', (req, res) => {
  controllers.joinActivityController.joinActivity(req.body, res);
})

router.post('/opt-out-activity', (req, res) => {
  controllers.optOutActivityController.optOutActivity(req.body, res);
})

router.get('/joined-activities/:user_id', (req, res) => {
  controllers.getJoinedActivitiesController.getJoinedActivities(req, res);
});

module.exports = router;