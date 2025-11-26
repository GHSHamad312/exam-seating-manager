const express = require('express');
const router = express.Router();
const seatingPlanController = require('../controllers/seatingPlanController');

// Generate a new seating plan
router.post('/generate', seatingPlanController.generateSeatingPlan);

// Get all seating plans
router.get('/', seatingPlanController.getAllSeatingPlans);

// Get seating plans by semester
router.get('/semester/:semesterId', seatingPlanController.getSeatingPlansBySemester);

// Get a specific seating plan
router.get('/:id', seatingPlanController.getSeatingPlanById);

// Delete a seating plan
router.delete('/:id', seatingPlanController.deleteSeatingPlan);

module.exports = router;
