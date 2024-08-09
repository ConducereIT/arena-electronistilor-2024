const express = require("express");
const {
  createNewQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
} = require("../controllers/questionController");
const { authenticateToken } = require("../middleware/authenticate");
const router = express.Router();

router.get("/", authenticateToken, getAllQuestions);

router.post("/", authenticateToken, createNewQuestion);

router.get("/:id", authenticateToken, getQuestionById);

router.patch("/:id", authenticateToken, updateQuestionById);

router.delete("/:id", authenticateToken, deleteQuestionById);

module.exports = router;
