const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.ObjectId,
    }
});

module.exports = mongoose.model('Event', eventSchema);