// controllers/gradeController.js
const gradeService = require('../services/gradeService');

exports.createGrade = async (req, res) => {
  try {
    const grade = await gradeService.createGrade(req.body);
    res.status(201).json(grade);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllGrades = async (req, res) => {
  try {
    const grades = await gradeService.getAllGrades();
    res.json(grades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGradeById = async (req, res) => {
  try {
    const grade = await gradeService.getGradeById(req.params.id);
    res.json(grade);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateGrade = async (req, res) => {
  try {
    const grade = await gradeService.updateGrade(req.params.id, req.body);
    res.json(grade);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteGrade = async (req, res) => {
  try {
    await gradeService.deleteGrade(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};