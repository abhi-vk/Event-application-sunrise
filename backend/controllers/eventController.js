const Event = require('../models/Event');

const createEvent = async (req, res, next) => {
    try {
        const { eventName, location } = req.body;
        const userId = req.user;

        if (!eventName || !location) {
            throw Object.assign(Error("Event name and location are required."), { code: 400 });
        }

        const newEvent = await Event.create({ eventName, location, userId });
        res.status(201).json({ status: "success", msg: "Event created successfully.", data: newEvent });
    } catch (err) {
        next(err);
    }
};



const getUserEvents = async (req, res, next) => {
    try {
        const userId = req.user;
        const events = await Event.find({ userId });
        res.status(200).json({ status: "success", data: events });
    } catch (err) {
        next(err);
    }
};

const updateEvent = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const { eventName, location } = req.body;
        const userId = req.user;

        const event = await Event.findOne({ _id: eventId, userId });

        if (!event) {
            throw Object.assign(Error("Event not found or unauthorized access."), { code: 404 });
        }

        if (eventName) event.eventName = eventName;
        if (location) event.location = location;

        await event.save();
        res.status(200).json({ status: "success", msg: "Event updated successfully.", data: event });
    } catch (err) {
        next(err);
    }
};

const deleteEvent = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const userId = req.user;

        const event = await Event.findOneAndDelete({ _id: eventId, userId });

        if (!event) {
            throw Object.assign(Error("Event not found or unauthorized access."), { code: 404 });
        }

        res.status(200).json({ status: "success", msg: "Event deleted successfully." });
    } catch (err) {
        next(err);
    }
};

module.exports = { createEvent, getUserEvents, updateEvent, deleteEvent };
