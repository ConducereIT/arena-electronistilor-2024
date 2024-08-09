const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {
  createNewUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  loginUser,
  registerUser,
  updateUserById,
  getAllUsersB,
  loginUserB,
  checkToken,
} = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authenticateToken");

// Create a new user
router.post("/", createNewUser);

// Get all users
router.get("/", getAllUsers);

// Get one user
router.get("/:id", getUserById);

// Update one user
router.patch("/:id", updateUserById);

// Delete one user
router.delete("/:id", deleteUserById);

router.post("/login", loginUser);

router.post("/register", registerUser);

router.put("/check", authenticateToken, checkToken);

module.exports = router;
