const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connexion");

class Role extends Model {}

Role.init(
  {
    id_role: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    access_level: DataTypes.INTEGER,
  },
  {
    sequelize: sequelize,
    modelName: "role",
    timestamps: false,
  }
);

module.exports = Role;
