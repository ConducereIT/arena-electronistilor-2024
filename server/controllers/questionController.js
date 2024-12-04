const Question = require("../models/question");

const createNewQuestion = async (req, res) => {
  try {
    const question = await Question.create({
      question: req.body.question,
      answers: req.body.answers,
    });
    return res.status(201).json(question);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    return res.status(200).json(question);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateQuestionById = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    if (req.body.question != null) question.question = req.body.question;
    if (req.body.answers != null) question.answers = req.body.answers;

    const updatedQuestion = await question.save();
    return res.status(202).json(updatedQuestion);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const deleteQuestionById = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    await question.destroy();
    return res.status(200).json({ message: "Question deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createNewQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
};
