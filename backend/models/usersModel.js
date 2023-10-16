const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
const bcrypt = require("bcrypt");

class UserModel extends Model {
  async validPassword(password) {
    console.log("Input Password:", password);
    console.log("Stored Hashed Password:", this.password);
    const isPasswordValid = await bcrypt.compare(password, this.password);
    console.log("Password Validity:", isPasswordValid);
    return isPasswordValid;
  }
}  

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
        type: DataTypes.STRING(600),
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
