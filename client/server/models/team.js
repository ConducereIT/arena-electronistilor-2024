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

// Sync with database
sequelize
  .sync()
  .then(() => console.log("Team table created"))
  .catch((err) => console.log("Error: " + err));

module.exports = Team;
