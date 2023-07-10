const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.post('/register', (req, res) => {
    controllers.usersController.registerUser(req.body, res);
  });

module.exports = router;
