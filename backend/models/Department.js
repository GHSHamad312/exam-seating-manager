const pool = require('../config/database');

class Department {
    static async create(data) {
        const { department_id, department_name } = data;
        const query = 'INSERT INTO departments (department_id, department_name) VALUES (?, ?)';
        const [result] = await pool.query(query, [department_id, department_name]);
        return result;
    }

    static async getAll() {
        const query = 'SELECT department_id, department_name FROM departments ORDER BY department_name ASC';
        const [rows] = await pool.query(query);
        return rows;
    }

    static async getById(department_id) {
        const query = 'SELECT department_id, department_name FROM departments WHERE department_id = ?';
        const [rows] = await pool.query(query, [department_id]);
        return rows[0];
    }

    static async updateById(department_id, data) {
        const { department_name } = data;
        const query = 'UPDATE departments SET department_name = ? WHERE department_id = ?';
        const [result] = await pool.query(query, [department_name, department_id]);
        return result;
    }

    static async deleteById(department_id) {
        const query = 'DELETE FROM departments WHERE department_id = ?';
        const [result] = await pool.query(query, [department_id]);
        return result;
    }
}

module.exports = Department;
