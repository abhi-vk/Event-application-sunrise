import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEventApi, getUserEventsApi, updateEventApi, deleteEventApi } from '../apis/Event';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [eventForm, setEventForm] = useState({ eventName: '', location: '' });
    const [editEventId, setEditEventId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getUserEventsApi(navigate);
            if (data) setEvents(data);
        };
        fetchEvents();
    }, [navigate]);

    const handleSaveEvent = async () => {
        if (editEventId) {
            const updatedEvent = await updateEventApi(editEventId, eventForm, navigate);
            if (updatedEvent) {
                setEvents(events.map((event) => (event._id === editEventId ? updatedEvent : event)));
                toast.success('Event updated successfully!');
            }
        } else {
            const newEvent = await createEventApi(eventForm, navigate);
            if (newEvent) {
                setEvents([...events, newEvent]);
                toast.success('Event created successfully!');
            }
        }

        setEventForm({ eventName: '', location: '' });
        setEditEventId(null);
        setShowModal(false);
    };

    const handleEditEvent = (event) => {
        setEventForm({ eventName: event.eventName, location: event.location });
        setEditEventId(event._id);
        setShowModal(true);
    };

    const handleDeleteEvent = async (eventId) => {
        await deleteEventApi(eventId, navigate);
        setEvents(events.filter((event) => event._id !== eventId));
    };

    return (
        <>
        <Navbar/>
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Your Events</h2>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <i className="bi bi-plus-circle"></i> Create Event
                </button>
            </div>

            <div className="row">
                {events.map((event) => (
                    <div className="col-md-4 mb-4" key={event._id}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{event.eventName}</h5>
                                <p className="card-text">{event.location}</p>
                                <div className="d-flex justify-content-end">
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEditEvent(event)}
                                    >
                                        <i className="bi bi-pencil"></i> Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteEvent(event._id)}
                                    >
                                        <i className="bi bi-trash"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div
                    className="modal show d-block"
                    style={{ background: 'rgba(0, 0, 0, 0.5)' }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editEventId ? 'Edit Event' : 'Create Event'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEventForm({ eventName: '', location: '' });
                                        setEditEventId(null);
                                    }}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label>Event Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={eventForm.eventName}
                                        onChange={(e) =>
                                            setEventForm({ ...eventForm, eventName: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={eventForm.location}
                                        onChange={(e) =>
                                            setEventForm({ ...eventForm, location: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEventForm({ eventName: '', location: '' });
                                        setEditEventId(null);
                                    }}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSaveEvent}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default Home;
