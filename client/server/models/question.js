const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Question = sequelize.define("Question", {
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answers: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
});

// Sync with database
sequelize
  .sync()
  .then(() => console.log("Question table created"))
  .catch((err) => console.log("Error: " + err));

module.exports = Question;
