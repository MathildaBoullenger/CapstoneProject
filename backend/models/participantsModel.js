const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
const ActivityModel = require("./activitiesModel")

class ParticipantsModel extends Model {}
//Sequelize will create this table if it doesn't exist on startup
ParticipantsModel.init(
  {
    participant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Name of the referenced table
        key: "user_id", // Primary key in the referenced table
      },
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "activities", // Name of the referenced table
        key: "activity_id", // Primary key in the referenced table
      },
    },
    isJoined: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "participants", //use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = ParticipantsModel;
