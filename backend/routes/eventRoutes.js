const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');
const { createEvent, getUserEvents, updateEvent, deleteEvent } = require('../controllers/eventController');



// Protected Routes: Require token
router.post('/create', verifyToken, createEvent);
router.get('/user', verifyToken, getUserEvents);
router.put('/:eventId', verifyToken, updateEvent);
router.delete('/:eventId', verifyToken, deleteEvent);

module.exports = router;
