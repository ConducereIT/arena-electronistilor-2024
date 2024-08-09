const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const sequelize = require("./config");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Test DB connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

// Routes
const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

// Start server
if (process.env.NODE_ENV === "dev") {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports.handler = serverless(app);
