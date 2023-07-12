const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class UserModel extends Model {}
//Sequelize will create this table if it doesn't exist on startup
UserModel.init(
  {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pic: {
        type: DataTypes.STRING,
        allowNull: true
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true
      },
      facebook: {
        type: DataTypes.STRING,
        allowNull: true
      },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "users", //use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = UserModel;
