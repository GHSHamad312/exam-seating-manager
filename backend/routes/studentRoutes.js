const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Create a new student
router.post('/', studentController.createStudent);

// Get all students
router.get('/', studentController.getAllStudents);

// Search students (use query param `q`)
router.get('/search', studentController.searchStudents);

// Get a specific student by CMS
router.get('/:cms', studentController.getStudentByCMS);

// Update a student by CMS
router.put('/:cms', studentController.updateStudentByCMS);

// Delete a student by CMS
router.delete('/:cms', studentController.deleteStudentByCMS);

module.exports = router;
