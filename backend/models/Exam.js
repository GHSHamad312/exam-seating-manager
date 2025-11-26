const pool = require('../config/database');

class Exam {
    static async create(data) {
        const { exam_id, subject, exam_date, exam_time } = data;
        const query = 'INSERT INTO exams (exam_id, subject, exam_date, exam_time) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(query, [exam_id, subject, exam_date, exam_time]);
        return result;
    }

    static async getAll() {
        const query = 'SELECT exam_id, subject, exam_date, exam_time FROM exams ORDER BY exam_date DESC';
        const [rows] = await pool.query(query);
        return rows;
    }

    static async getById(exam_id) {
        const query = 'SELECT exam_id, subject, exam_date, exam_time FROM exams WHERE exam_id = ?';
        const [rows] = await pool.query(query, [exam_id]);
        return rows[0];
    }

    static async updateById(exam_id, data) {
        const { subject, exam_date, exam_time } = data;
        const query = 'UPDATE exams SET subject = ?, exam_date = ?, exam_time = ? WHERE exam_id = ?';
        const [result] = await pool.query(query, [subject, exam_date, exam_time, exam_id]);
        return result;
    }

    static async deleteById(exam_id) {
        const query = 'DELETE FROM exams WHERE exam_id = ?';
        const [result] = await pool.query(query, [exam_id]);
        return result;
    }
}

module.exports = Exam;
