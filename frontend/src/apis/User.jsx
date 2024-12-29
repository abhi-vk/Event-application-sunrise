import { toast } from 'react-toastify';
import { handleApiRes, handleApiErr } from '../auth/apiUtils';

const baseURL = import.meta.env.VITE_API_BASE_URL;

// User Login API
export const userLoginApi = async (userData, navigate) => {
    try {
        const response = await fetch(`${baseURL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.status === 200) {
            const data = await response.json();
            const { status, token } = data;  // Assuming 'data' contains { status, token }

            if (status === 'success') {
                // Save token in localStorage
                localStorage.setItem('authToken', token);
                return token;  // Return token for further use if needed
            } else {
                handleApiRes(data);  // Handles error response if status isn't 'success'
            }
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        handleApiErr(error, navigate);  // Handles errors from the API call
    }
};

// User Register API
export const userRegisterApi = async (userData, navigate) => {
    try {
        const response = await fetch(`${baseURL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.status === 200) {
            const data = await response.json();
            const { status, msg } = data;

            if (status === 'success') {
                toast.success(msg);  // Display success message
                return true;
            } else {
                handleApiRes(data);  // Handles error response
            }
        } else {
            throw new Error('Registration failed');
        }
    } catch (error) {
        handleApiErr(error, navigate);  // Handles errors from the API call
    }
};

// User Update API
export const userUpdateApi = async (userData, navigate) => {
    const token = localStorage.getItem('authToken');  // Get token from localStorage

    if (!token) {
        toast.error('Authorization token is missing');
        navigate('/login');  // Redirect to login if token is not available
        return;
    }

    try {
        const response = await fetch(`${baseURL}/user/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,  // Send token in the Authorization header
            },
            body: JSON.stringify(userData),
        });

        if (response.status === 200) {
            const data = await response.json();
            const { status, msg } = data;

            if (status === 'success') {
                toast.success(msg);  // Display success message
                return true;
            } else {
                handleApiRes(data);  // Handles error response
            }
        } else {
            throw new Error('Update failed');
        }
    } catch (error) {
        handleApiErr(error, navigate);  // Handles errors from the API call
    }
};

// User Dashboard API
export const userDashboardApi = async (navigate) => {
    const token = localStorage.getItem('authToken');  // Get token from localStorage

    if (!token) {
        navigate('/login');  // Redirect if no token found
        return;
    }

    try {
        const response = await fetch(`${baseURL}/user/dashboard`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,  // Send token in the Authorization header
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            const { status, user } = data;  // Assuming 'data' contains { status, user }

            // Only handle errors if the status is not 'success'
            if (status === 'success' && user) {
                return user;  // Return the user data
            } else {
                console.error('API Response Error:', data);
                handleApiRes(data);  // Handles error response
            }
        } else {
            throw new Error('Failed to fetch dashboard data');
        }
    } catch (error) {
        handleApiErr(error, navigate);  // Handles errors from the API call
    }
};
