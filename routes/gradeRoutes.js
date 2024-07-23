// routes/gradeRoutes.js
const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const { validateGrade, validateGradeUpdate } = require('../validations/gradeValidation');

router.post('/', validateGrade, gradeController.createGrade);
router.get('/', gradeController.getAllGrades);
router.get('/:id', gradeController.getGradeById);
router.put('/:id', validateGradeUpdate, gradeController.updateGrade);
router.delete('/:id', gradeController.deleteGrade);

module.exports = router;