const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const createNewUser = async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      role: req.body.role,
    });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const checkToken = async (req, res) => {
  try {
    return res.json(req.user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.body.email != null) user.email = req.body.email;
    if (req.body.name != null) user.name = req.body.name;
    if (req.body.password != null) user.password = req.body.password;
    if (req.body.role != null) user.role = req.body.role;

    const updatedUser = await user.save();
    return res.json(updatedUser);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    return res.json({ message: "User deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(404).json({ message: "Incorrect password" });
    const userPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const accesToken = jwt.sign(userPayload, process.env.ACCES_TOKEN_SECRET);
    return res.status(200).json({ accesToken: accesToken });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    if (!email || !password || !name)
      return res.status(400).json({ message: "All fields must be completed" });
    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid Email" });

    if (!validator.isStrongPassword(password))
      return res.status(400).json({ message: "Password not strong enough" });
    const exists = await User.findOne({
      where: { email: email },
    });
    if (exists)
      return res.status(400).json({ message: "Email already in use" });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      email: email,
      name: name,
      password: hash,
      role: "user",
    });
    const userPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const accesToken = jwt.sign(userPayload, process.env.ACCES_TOKEN_SECRET);
    return res.status(200).json({ accesToken: accesToken });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
  registerUser,
  checkToken,
};
