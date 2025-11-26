const Department = require('../models/Department');

exports.createDepartment = async (req, res) => {
    try {
        const { department_id, department_name } = req.body;
        if (!department_id || !department_name) return res.status(400).json({ error: 'All fields required' });

        const existing = await Department.getById(department_id);
        if (existing) return res.status(409).json({ error: 'Department id already exists' });

        await Department.create({ department_id, department_name });
        res.status(201).json({ message: 'Department created', department: { department_id, department_name } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating department' });
    }
};

exports.getAllDepartments = async (req, res) => {
    try {
        const deps = await Department.getAll();
        res.status(200).json({ count: deps.length, departments: deps });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving departments' });
    }
};

exports.getDepartmentById = async (req, res) => {
    try {
        const { department_id } = req.params;
        const dep = await Department.getById(department_id);
        if (!dep) return res.status(404).json({ error: 'Department not found' });
        res.status(200).json({ department: dep });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving department' });
    }
};

exports.updateDepartmentById = async (req, res) => {
    try {
        const { department_id } = req.params;
        const { department_name } = req.body;
        if (!department_name) return res.status(400).json({ error: 'Name required' });

        const dep = await Department.getById(department_id);
        if (!dep) return res.status(404).json({ error: 'Department not found' });

        await Department.updateById(department_id, { department_name });
        res.status(200).json({ message: 'Department updated', department: { department_id, department_name } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating department' });
    }
};

exports.deleteDepartmentById = async (req, res) => {
    try {
        const { department_id } = req.params;
        const dep = await Department.getById(department_id);
        if (!dep) return res.status(404).json({ error: 'Department not found' });

        await Department.deleteById(department_id);
        res.status(200).json({ message: 'Department deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting department' });
    }
};
