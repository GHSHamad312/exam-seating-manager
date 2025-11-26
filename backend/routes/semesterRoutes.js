const express = require('express');
const router = express.Router();
const semesterController = require('../controllers/semesterController');

// Create a new semester
router.post('/', semesterController.createSemester);

// Get all semesters
router.get('/', semesterController.getAllSemesters);

// Get a specific semester
router.get('/:id', semesterController.getSemesterById);

// Update a semester
router.put('/:id', semesterController.updateSemester);

// Delete a semester
router.delete('/:id', semesterController.deleteSemester);

// Search semesters
router.get('/search/query', semesterController.searchSemesters);

module.exports = router;
