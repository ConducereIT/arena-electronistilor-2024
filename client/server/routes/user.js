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
const { authTokenAdmin, authToken } = require("../middleware/auth");

// Create a new user
router.post("/", authTokenAdmin, createNewUser);

// Get all users
router.get("/", authTokenAdmin, getAllUsers);

// Get one user
router.get("/:id", authTokenAdmin, getUserById);

// Update one user
router.patch("/:id", authTokenAdmin, updateUserById);

// Delete one user
router.delete("/:id", authTokenAdmin, deleteUserById);

router.post("/login", loginUser);

router.post("/register", registerUser);

router.put("/check", authToken, checkToken);

module.exports = router;
