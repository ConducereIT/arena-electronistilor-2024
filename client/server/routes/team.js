const express = require("express");

const { authTokenAdmin } = require("../middleware/auth");
const {
  getAllTeams,
  createNewTeam,
  getTeamById,
  updateTeamById,
  deleteTeamById,
} = require("../controllers/teamsController");
const router = express.Router();

router.get("/", authTokenAdmin, getAllTeams);

router.post("/", authTokenAdmin, createNewTeam);

router.get("/:id", authTokenAdmin, getTeamById);

router.patch("/:id", authTokenAdmin, updateTeamById);

router.delete("/:id", authTokenAdmin, deleteTeamById);

module.exports = router;
