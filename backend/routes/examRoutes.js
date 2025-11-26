const express = require('express');
const router = express.Router();
const controller = require('../controllers/examController');

router.post('/', controller.createExam);
router.get('/', controller.getAllExams);
router.get('/:exam_id', controller.getExamById);
router.put('/:exam_id', controller.updateExamById);
router.delete('/:exam_id', controller.deleteExamById);

module.exports = router;
