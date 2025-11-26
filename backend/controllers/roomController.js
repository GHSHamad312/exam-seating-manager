const Room = require('../models/Room');
const SeatingPlan = require('../models/SeatingPlan');

exports.createRoom = async (req, res) => {
    try {
        const { room_number, room_name, capacity, roomcol } = req.body;
        let { availability } = req.body;

        if (!room_number || !room_name || capacity === undefined || availability === undefined) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // normalize availability: accept boolean/number or strings ('Available'/'Occupied')
        if (typeof availability === 'string') {
            const a = availability.toLowerCase();
            availability = (a === 'available' || a === '1' || a === 'true') ? 1 : 0;
        } else {
            availability = availability ? 1 : 0;
        }

        const existingRoom = await Room.getByNumber(room_number);
        if (existingRoom) {
            return res.status(409).json({ error: 'Room with this number already exists' });
        }

        await Room.create({ room_number, room_name, capacity, roomcol, availability });
        res.status(201).json({ message: 'Room created successfully', room: { room_number, room_name, capacity, roomcol, availability } });
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ error: 'Error creating room' });
    }
};

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.getAll();
        res.status(200).json({ message: 'Rooms retrieved successfully', count: rooms.length, rooms });
    } catch (error) {
        console.error('Error retrieving rooms:', error);
        res.status(500).json({ error: 'Error retrieving rooms' });
    }
};

exports.getRoomByNumber = async (req, res) => {
    try {
        const { room_number } = req.params;
        const room = await Room.getByNumber(room_number);
        if (!room) return res.status(404).json({ error: 'Room not found' });
        res.status(200).json({ message: 'Room retrieved successfully', room });
    } catch (error) {
        console.error('Error retrieving room:', error);
        res.status(500).json({ error: 'Error retrieving room' });
    }
};

exports.updateRoomByNumber = async (req, res) => {
    try {
        const oldRoomNumber = req.params.room_number;
        const { room_number: newRoomNumber, room_name, capacity, roomcol } = req.body;
        let { availability } = req.body;

        if (!room_name || capacity === undefined || availability === undefined) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (typeof availability === 'string') {
            const a = availability.toLowerCase();
            availability = (a === 'available' || a === '1' || a === 'true') ? 1 : 0;
        } else {
            availability = availability ? 1 : 0;
        }

        const room = await Room.getByNumber(oldRoomNumber);
        if (!room) return res.status(404).json({ error: 'Room not found' });

        // If user wants to change the room identifier (room_number), ensure no conflict
        const targetRoomNumber = newRoomNumber || oldRoomNumber;
        if (targetRoomNumber !== oldRoomNumber) {
            const existing = await Room.getByNumber(targetRoomNumber);
            if (existing) return res.status(409).json({ error: 'Another room with the new number already exists' });
        }

        await Room.updateByNumber(oldRoomNumber, { room_number: targetRoomNumber, room_name, capacity, roomcol, availability });
        // If room_number changed, update any seating plan records referencing it
        if (targetRoomNumber !== oldRoomNumber) {
            try {
                await SeatingPlan.updateRoomNumber(oldRoomNumber, targetRoomNumber);
            } catch (e) {
                console.error('Warning: failed to update seating_plans room references:', e);
            }
        }

        res.status(200).json({ message: 'Room updated successfully', room: { room_number: targetRoomNumber, room_name, capacity, roomcol, availability } });
    } catch (error) {
        console.error('Error updating room:', error);
        res.status(500).json({ error: 'Error updating room' });
    }
};

exports.deleteRoomByNumber = async (req, res) => {
    try {
        const { room_number } = req.params;
        const room = await Room.getByNumber(room_number);
        if (!room) return res.status(404).json({ error: 'Room not found' });

        await Room.deleteByNumber(room_number);
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error('Error deleting room:', error);
        res.status(500).json({ error: 'Error deleting room' });
    }
};

exports.searchRooms = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ error: 'Search query is required' });
        const rooms = await Room.search(q);
        res.status(200).json({ message: 'Search completed', count: rooms.length, rooms });
    } catch (error) {
        console.error('Error searching rooms:', error);
        res.status(500).json({ error: 'Error searching rooms' });
    }
};

exports.getAvailableRooms = async (req, res) => {
    try {
        const rooms = await Room.getAvailable();
        res.status(200).json({ message: 'Available rooms retrieved successfully', count: rooms.length, rooms });
    } catch (error) {
        console.error('Error retrieving available rooms:', error);
        res.status(500).json({ error: 'Error retrieving available rooms' });
    }
};
