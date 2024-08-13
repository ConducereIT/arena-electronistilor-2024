const Team = require("../models/team");

const createNewTeam = async (req, res) => {
  try {
    const team = await Team.create({
      name: req.body.name,
      score: req.body.score,
    });
    return res.status(201).json(team);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTeamById = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    return res.status(200).json(team);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateTeamById = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (req.body.name != null) team.name = req.body.name;
    if (req.body.score != null) team.score = req.body.score;

    const updatedTeam = await team.save();
    return res.status(202).json(updatedTeam);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const deleteTeamById = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });

    await team.destroy();
    return res.status(200).json({ message: "Team deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createNewTeam,
  getAllTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
};
