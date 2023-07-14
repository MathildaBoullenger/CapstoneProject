const { DataTypes } = require('sequelize');
const UserModel = require('./usersModel');
const ActivityModel = require('./activitiesModel');
const ParticipantsModel = require('./participantsModel');
// Import other models as needed
const dbConnect = require('../dbConnect');
const sequelizeInstance = dbConnect.Sequelize;

UserModel.hasMany(ActivityModel, { foreignKey: 'user_id' });
ActivityModel.belongsTo(UserModel, { foreignKey: 'user_id' });

ActivityModel.hasMany(ParticipantsModel, { foreignKey: 'activity_id' });
ParticipantsModel.belongsTo(ActivityModel, { foreignKey: 'activity_id' });

UserModel.hasMany(ParticipantsModel, { foreignKey: 'user_id' });
ParticipantsModel.belongsTo(UserModel, { foreignKey: 'user_id' });

module.exports = {
    sequelizeInstance,
    UserModel,
    ActivityModel,
    ParticipantsModel,
    // Export other models as needed
  };