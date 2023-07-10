"use strict";
const UsersModel = require("./usersModel");
const ActivitiesModel = require("./activitiesModel");
const ParticipantsModel = require("./participantsModel");

async function init() {
  await UsersModel.sync();
  await ActivitiesModel.sync(); //sync the model
  await ParticipantsModel.sync();
}

init();

module.exports = {
  UsersModel,
  ActivitiesModel,
  ParticipantsModel,
};
