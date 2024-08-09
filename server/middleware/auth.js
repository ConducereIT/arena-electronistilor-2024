const jwt = require("jsonwebtoken");
require("dotenv").config();

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    if (user.role != "user" && user.role != "admin") return res.sendStatus(403);
    req.user = user;

    next();
  });
};

const authTokenAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    if (user.role != "admin") return res.sendStatus(403);
    req.user = user;

    next();
  });
};

module.exports = { authToken, authTokenAdmin };
