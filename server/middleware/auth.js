const jwt = require("jsonwebtoken");
require("dotenv").config();

// Utility to validate token
const validateToken = (req, res, requiredRoles = []) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    const user = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
    if (!requiredRoles.includes(user.role)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    return user; // Return user if valid
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token has expired" });
    }
    return res.status(403).json({ message: "Invalid token" });
  }
};

// Middleware for all users
const authToken = (req, res, next) => {
  const user = validateToken(req, res, ["user", "admin"]);
  if (!user) return; // Stop if token is invalid
  req.user = user;
  next();
};

// Middleware for admin only
const authTokenAdmin = (req, res, next) => {
  const user = validateToken(req, res, ["admin"]);
  if (!user) return; // Stop if token is invalid
  req.user = user;
  next();
};

module.exports = { authToken, authTokenAdmin };
