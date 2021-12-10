const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connexion");

class User extends Model {}

User.init(
  {
    user_uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    id_role: DataTypes.INTEGER,
  },
  {
    sequelize: sequelize,
    modelName: "user",
    timestamps: false,
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
  }
);

module.exports = User;
