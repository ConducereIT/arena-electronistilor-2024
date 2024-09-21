const express = require("express");
const {
  createNewQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
} = require("../controllers/questionController");
const { authToken } = require("../middleware/auth");
const router = express.Router();

router.get("/", authToken, getAllQuestions);

router.post("/", authToken, createNewQuestion);

router.get("/:id", authToken, getQuestionById);

router.patch("/:id", authToken, updateQuestionById);

router.delete("/:id", authToken, deleteQuestionById);

module.exports = router;
