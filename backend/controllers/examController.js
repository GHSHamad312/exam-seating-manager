const Exam = require('../models/Exam');

exports.createExam = async (req, res) => {
    try {
        const { exam_id, subject, exam_date, exam_time } = req.body;
        if (!exam_id || !subject || !exam_date || !exam_time) return res.status(400).json({ error: 'All fields required' });
        const existing = await Exam.getById(exam_id);
        if (existing) return res.status(409).json({ error: 'Exam id exists' });
        await Exam.create({ exam_id, subject, exam_date, exam_time });
        res.status(201).json({ message: 'Exam created', exam: { exam_id, subject, exam_date, exam_time } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating exam' });
    }
};

exports.getAllExams = async (req, res) => {
    try {
        const exams = await Exam.getAll();
        res.status(200).json({ count: exams.length, exams });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving exams' });
    }
};

exports.getExamById = async (req, res) => {
    try {
        const { exam_id } = req.params;
        const exam = await Exam.getById(exam_id);
        if (!exam) return res.status(404).json({ error: 'Exam not found' });
        res.status(200).json({ exam });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving exam' });
    }
};

exports.updateExamById = async (req, res) => {
    try {
        const { exam_id } = req.params;
        const { subject, exam_date, exam_time } = req.body;
        const exam = await Exam.getById(exam_id);
        if (!exam) return res.status(404).json({ error: 'Exam not found' });
        await Exam.updateById(exam_id, { subject, exam_date, exam_time });
        res.status(200).json({ message: 'Exam updated', exam: { exam_id, subject, exam_date, exam_time } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating exam' });
    }
};

exports.deleteExamById = async (req, res) => {
    try {
        const { exam_id } = req.params;
        const exam = await Exam.getById(exam_id);
        if (!exam) return res.status(404).json({ error: 'Exam not found' });
        await Exam.deleteById(exam_id);
        res.status(200).json({ message: 'Exam deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting exam' });
    }
};
