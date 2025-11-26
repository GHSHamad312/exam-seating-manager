const Semester = require('../models/Semester');

exports.createSemester = async (req, res) => {
    try {
        const { name, startDate, endDate } = req.body;

        if (!name || !startDate || !endDate) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const result = await Semester.create({ name, startDate, endDate });
        res.status(201).json({ 
            message: 'Semester created successfully', 
            id: result.insertId,
            semester: { id: result.insertId, name, startDate, endDate }
        });
    } catch (error) {
        console.error('Error creating semester:', error);
        res.status(500).json({ error: 'Error creating semester' });
    }
};

exports.getAllSemesters = async (req, res) => {
    try {
        const semesters = await Semester.getAll();
        res.status(200).json({ 
            message: 'Semesters retrieved successfully', 
            count: semesters.length,
            semesters 
        });
    } catch (error) {
        console.error('Error retrieving semesters:', error);
        res.status(500).json({ error: 'Error retrieving semesters' });
    }
};

exports.getSemesterById = async (req, res) => {
    try {
        const { id } = req.params;
        const semester = await Semester.getById(id);

        if (!semester) {
            return res.status(404).json({ error: 'Semester not found' });
        }

        res.status(200).json({ message: 'Semester retrieved successfully', semester });
    } catch (error) {
        console.error('Error retrieving semester:', error);
        res.status(500).json({ error: 'Error retrieving semester' });
    }
};

exports.updateSemester = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, startDate, endDate } = req.body;

        if (!name || !startDate || !endDate) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const semester = await Semester.getById(id);
        if (!semester) {
            return res.status(404).json({ error: 'Semester not found' });
        }

        await Semester.update(id, { name, startDate, endDate });
        res.status(200).json({ 
            message: 'Semester updated successfully',
            semester: { id, name, startDate, endDate }
        });
    } catch (error) {
        console.error('Error updating semester:', error);
        res.status(500).json({ error: 'Error updating semester' });
    }
};

exports.deleteSemester = async (req, res) => {
    try {
        const { id } = req.params;
        
        const semester = await Semester.getById(id);
        if (!semester) {
            return res.status(404).json({ error: 'Semester not found' });
        }

        await Semester.delete(id);
        res.status(200).json({ message: 'Semester deleted successfully' });
    } catch (error) {
        console.error('Error deleting semester:', error);
        res.status(500).json({ error: 'Error deleting semester' });
    }
};

exports.searchSemesters = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const semesters = await Semester.search(query);
        res.status(200).json({ 
            message: 'Search completed', 
            count: semesters.length,
            semesters 
        });
    } catch (error) {
        console.error('Error searching semesters:', error);
        res.status(500).json({ error: 'Error searching semesters' });
    }
};
