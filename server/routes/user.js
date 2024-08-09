const express = require("express");
const router = express.Router();
const {
  createNewUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  loginUser,
  registerUser,
  updateUserById,
  checkToken,
} = require("../controllers/userController");
const {
  authenticateToken,
  authenticateTokenAdmin,
} = require("../middleware/authenticate");

// Create a new user
router.post("/", authenticateTokenAdmin, createNewUser);

// Get all users
router.get("/", authenticateTokenAdmin, getAllUsers);

// Get one user
router.get("/:id", authenticateTokenAdmin, getUserById);

// Update one user
router.patch("/:id", authenticateTokenAdmin, updateUserById);

// Delete one user
router.delete("/:id", authenticateTokenAdmin, deleteUserById);

router.post("/login", loginUser);

router.post("/register", registerUser);

router.put("/check", authenticateToken, checkToken);

module.exports = router;
