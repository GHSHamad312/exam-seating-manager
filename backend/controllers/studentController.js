const Student = require('../models/Student');

// Create a student (cms is primary identifier)
exports.createStudent = async (req, res) => {
    try {
        // accept either semester or semester_id, and department or department_id for compatibility with frontend
        const { cms, name } = req.body;
        const semester_id = req.body.semester_id || req.body.semester;
        const department_id = req.body.department_id || req.body.department;

        if (!cms || !name || !semester_id || !department_id) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingStudent = await Student.getByCMS(cms);
        if (existingStudent) return res.status(409).json({ error: 'Student with this CMS already exists' });

        await Student.create({ cms, name, semester_id, department_id });
        res.status(201).json({ message: 'Student created successfully', student: { cms, name, semester_id, department_id } });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Error creating student' });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.getAll();
        res.status(200).json({ message: 'Students retrieved successfully', count: students.length, students });
    } catch (error) {
        console.error('Error retrieving students:', error);
        res.status(500).json({ error: 'Error retrieving students' });
    }
};

exports.getStudentByCMS = async (req, res) => {
    try {
        const { cms } = req.params;
        const student = await Student.getByCMS(cms);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json({ message: 'Student retrieved successfully', student });
    } catch (error) {
        console.error('Error retrieving student:', error);
        res.status(500).json({ error: 'Error retrieving student' });
    }
};

exports.updateStudentByCMS = async (req, res) => {
    try {
        const { cms } = req.params;
            const { name } = req.body;
            const semester_id = req.body.semester_id || req.body.semester;
            const department_id = req.body.department_id || req.body.department;

            if (!name || !semester_id || !department_id) {
                return res.status(400).json({ error: 'All fields are required' });
            }

        const student = await Student.getByCMS(cms);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        await Student.updateByCMS(cms, { name, semester_id, department_id });
        res.status(200).json({ message: 'Student updated successfully', student: { cms, name, semester_id, department_id } });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Error updating student' });
    }
};

exports.deleteStudentByCMS = async (req, res) => {
    try {
        const { cms } = req.params;
        const student = await Student.getByCMS(cms);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        await Student.deleteByCMS(cms);
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Error deleting student' });
    }
};

exports.searchStudents = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ error: 'Search query is required' });

        const students = await Student.search(q);
        res.status(200).json({ message: 'Search completed', count: students.length, students });
    } catch (error) {
        console.error('Error searching students:', error);
        res.status(500).json({ error: 'Error searching students' });
    }
};
