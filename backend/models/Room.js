const pool = require('../config/database');

// Adapted to diagram: rooms identified by `room_number`, have `room_name`, `capacity`, `availability` (tinyint)
class Room {
    // data: {room_number, room_name, capacity, roomcol, availability}
    static async create(data) {
        const { room_number, room_name, capacity, availability } = data;
        const query = 'INSERT INTO rooms (room_number, room_name, capacity, availability) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(query, [room_number, room_name, capacity, availability]);
        return result;
    }

    static async getAll() {
        const query = 'SELECT room_number, room_name, capacity, roomcol, availability FROM rooms ORDER BY room_number ASC';
        const [rows] = await pool.query(query);
        return rows;
    }

    static async getByNumber(room_number) {
        const query = 'SELECT room_number, room_name, capacity, roomcol, availability FROM rooms WHERE room_number = ?';
        const [rows] = await pool.query(query, [room_number]);
        return rows[0];
    }

    static async updateByNumber(old_room_number, data) {
        const { room_number: new_room_number, room_name, capacity, roomcol, availability } = data;
        if (new_room_number && new_room_number !== old_room_number) {
            const query = 'UPDATE rooms SET room_number = ?, room_name = ?, capacity = ?, roomcol = ?, availability = ? WHERE room_number = ?';
            const [result] = await pool.query(query, [new_room_number, room_name, capacity, roomcol || 8, availability, old_room_number]);
            return result;
        } else {
            const query = 'UPDATE rooms SET room_name = ?, capacity = ?, roomcol = ?, availability = ? WHERE room_number = ?';
            const [result] = await pool.query(query, [room_name, capacity, roomcol || 8, availability, old_room_number]);
            return result;
        }
    }

    static async deleteByNumber(room_number) {
        const query = 'DELETE FROM rooms WHERE room_number = ?';
        const [result] = await pool.query(query, [room_number]);
        return result;
    }

    static async search(searchTerm) {
        const query = 'SELECT room_number, room_name, capacity, roomcol, availability FROM rooms WHERE room_name LIKE ? OR room_number LIKE ?';
        const searchPattern = `%${searchTerm}%`;
        const [rows] = await pool.query(query, [searchPattern, searchPattern]);
        return rows;
    }

    static async getAvailable() {
        const query = 'SELECT room_number, room_name, capacity, roomcol, availability FROM rooms WHERE availability = 1 ORDER BY capacity DESC';
        const [rows] = await pool.query(query);
        return rows;
    }
}

module.exports = Room;
