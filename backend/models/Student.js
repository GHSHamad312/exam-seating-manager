const pool = require('../config/database');

// Adapted to database diagram: students table keyed by `cms`, with semester_id and department_id
class Student {
    // data: {cms, name, semester_id, department_id}
    static async create(data) {
        const { cms, name, semester_id, department_id } = data;
        const query = 'INSERT INTO students (cms, name, semester_id, department_id) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(query, [cms, name, semester_id, department_id]);
        return result;
    }

    static async getAll() {
        const query = 'SELECT cms, name, semester_id, department_id FROM students ORDER BY name ASC';
        const [rows] = await pool.query(query);
        return rows;
    }

    static async getByCMS(cms) {
        const query = 'SELECT cms, name, semester_id, department_id FROM students WHERE cms = ?';
        const [rows] = await pool.query(query, [cms]);
        return rows[0];
    }

    static async updateByCMS(cms, data) {
        const { name, semester_id, department_id } = data;
        const query = 'UPDATE students SET name = ?, semester_id = ?, department_id = ? WHERE cms = ?';
        const [result] = await pool.query(query, [name, semester_id, department_id, cms]);
        return result;
    }

    static async deleteByCMS(cms) {
        const query = 'DELETE FROM students WHERE cms = ?';
        const [result] = await pool.query(query, [cms]);
        return result;
    }

    static async search(searchTerm) {
        const query = 'SELECT cms, name, semester_id, department_id FROM students WHERE name LIKE ? OR cms LIKE ?';
        const searchPattern = `%${searchTerm}%`;
        const [rows] = await pool.query(query, [searchPattern, searchPattern]);
        return rows;
    }
}

module.exports = Student;
