const express = require('express');
const router = express.Router();
const controller = require('../controllers/departmentController');

router.post('/', controller.createDepartment);
router.get('/', controller.getAllDepartments);
router.get('/:department_id', controller.getDepartmentById);
router.put('/:department_id', controller.updateDepartmentById);
router.delete('/:department_id', controller.deleteDepartmentById);

module.exports = router;
