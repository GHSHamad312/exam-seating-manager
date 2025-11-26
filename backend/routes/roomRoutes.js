const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Create a new room
router.post('/', roomController.createRoom);

// Get all rooms
router.get('/', roomController.getAllRooms);

// Get available rooms
router.get('/available', roomController.getAvailableRooms);

// Search rooms (use q query param)
router.get('/search', roomController.searchRooms);

// Get a specific room by room_number
router.get('/:room_number', roomController.getRoomByNumber);

// Update a room by room_number
router.put('/:room_number', roomController.updateRoomByNumber);

// Delete a room by room_number
router.delete('/:room_number', roomController.deleteRoomByNumber);

module.exports = router;
