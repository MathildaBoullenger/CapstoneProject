const { DataTypes, Model } = require('sequelize');
const dbConnect = require('../dbConnect'); 
const sequelizeInstance = dbConnect.Sequelize;
const UsersModel = require("./usersModel")

class ActivityModel extends Model {}

ActivityModel.init(
  {
    activity_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Name of the referenced table
        key: 'user_id' // Primary key in the referenced table
      }
    },
    hobby:{
    type: DataTypes.STRING,
    allowNull: false
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeInstance,
    modelName: "activities", //use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

ActivityModel.belongsTo(UsersModel, { foreignKey: "user_id" });

module.exports = ActivityModel;
