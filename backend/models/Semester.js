const pool = require('../config/database');

class Semester {
    static async create(data) {
        const { name, startDate, endDate } = data;
        const query = 'INSERT INTO semesters (semester_id, name, startDate, endDate) VALUES (NULL, ?, ?, ?)';
        const [result] = await pool.query(query, [name, startDate, endDate]);
        return result;
    }

    static async getAll() {
        const query = `
            SELECT sem.*, COUNT(s.cms) AS student_count
            FROM semesters sem
            LEFT JOIN students s ON s.semester_id = sem.semester_id
            GROUP BY sem.semester_id
            ORDER BY sem.semester_id DESC
        `;
        const [rows] = await pool.query(query);
        return rows.map(r => ({ ...r, student_count: Number(r.student_count || 0) }));
    }

    static async getById(semester_id) {
        const query = `
            SELECT sem.*, COUNT(s.cms) AS student_count
            FROM semesters sem
            LEFT JOIN students s ON s.semester_id = sem.semester_id
            WHERE sem.semester_id = ?
            GROUP BY sem.semester_id
        `;
        const [rows] = await pool.query(query, [semester_id]);
        if (!rows || rows.length === 0) return null;
        const row = rows[0];
        row.student_count = Number(row.student_count || 0);
        return row;
    }

    static async update(semester_id, data) {
        const { name, startDate, endDate } = data;
        const query = 'UPDATE semesters SET name = ?, startDate = ?, endDate = ? WHERE semester_id = ?';
        const [result] = await pool.query(query, [name, startDate, endDate, semester_id]);
        return result;
    }

    static async delete(semester_id) {
        const query = 'DELETE FROM semesters WHERE semester_id = ?';
        const [result] = await pool.query(query, [semester_id]);
        return result;
    }

    static async search(searchTerm) {
        const query = 'SELECT * FROM semesters WHERE name LIKE ?';
        const searchPattern = `%${searchTerm}%`;
        const [rows] = await pool.query(query, [searchPattern]);
        return rows;
    }
}

module.exports = Semester;
