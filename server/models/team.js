const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Team = sequelize.define("Team", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Team;
