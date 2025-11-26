const pool = require('../config/database');

class SeatingPlan {
    static async create(data) {
        const { semester_id, room_number, studentIds } = data;
        const query = 'INSERT INTO seating_plans (semester_id, room_number, studentIds, createdAt) VALUES (?, ?, ?, NOW())';
        const [result] = await pool.query(query, [semester_id, room_number, JSON.stringify(studentIds)]);
        return result;
    }

    static async getAll() {
        const query = 'SELECT * FROM seating_plans ORDER BY createdAt DESC';
        const [rows] = await pool.query(query);
        return rows;
    }

    static async getById(id) {
        const query = 'SELECT * FROM seating_plans WHERE id = ?';
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    }

    static async getBySemester(semester_id) {
        const query = 'SELECT * FROM seating_plans WHERE semester_id = ? ORDER BY createdAt DESC';
        const [rows] = await pool.query(query, [semester_id]);
        return rows;
    }

    static async delete(id) {
        const query = 'DELETE FROM seating_plans WHERE id = ?';
        const [result] = await pool.query(query, [id]);
        return result;
    }

    static async updateRoomNumber(oldRoomNumber, newRoomNumber) {
        const query = 'UPDATE seating_plans SET room_number = ? WHERE room_number = ?';
        const [result] = await pool.query(query, [newRoomNumber, oldRoomNumber]);
        return result;
    }
}

module.exports = SeatingPlan;
