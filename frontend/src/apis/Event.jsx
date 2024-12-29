import { toast } from 'react-toastify';
import { handleApiRes, handleApiErr } from '../auth/apiUtils';

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Create Event API
export const createEventApi = async (eventData, navigate) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        toast.error('Authorization required. Please log in.');
        navigate('/login');
        return;
    }

    try {
        const response = await fetch(`${baseURL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(eventData),
        });

        if (response.status === 201) {
            const data = await response.json();
            toast.success(data.msg || 'Event created successfully!');
            return data.data; // Return the created event
        } else {
            handleApiRes(await response.json());
        }
    } catch (error) {
        handleApiErr(error, navigate);
    }
};

// Get User Events API
export const getUserEventsApi = async (navigate) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        toast.error('Authorization required. Please log in.');
        navigate('/login');
        return [];
    }

    try {
        const response = await fetch(`${baseURL}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            return data.data; // Return the list of user events
        } else {
            handleApiRes(await response.json());
        }
    } catch (error) {
        handleApiErr(error, navigate);
    }
};

// Update Event API
export const updateEventApi = async (eventId, eventData, navigate) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        toast.error('Authorization required. Please log in.');
        navigate('/login');
        return;
    }

    try {
        const response = await fetch(`${baseURL}/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(eventData),
        });

        if (response.status === 200) {
            const data = await response.json();
            toast.success(data.msg || 'Event updated successfully!');
            return data.data; // Return the updated event
        } else {
            handleApiRes(await response.json());
        }
    } catch (error) {
        handleApiErr(error, navigate);
    }
};

// Delete Event API
export const deleteEventApi = async (eventId, navigate) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        toast.error('Authorization required. Please log in.');
        navigate('/login');
        return;
    }

    try {
        const response = await fetch(`${baseURL}/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            toast.success(data.msg || 'Event deleted successfully!');
        } else {
            handleApiRes(await response.json());
        }
    } catch (error) {
        handleApiErr(error, navigate);
    }
};
