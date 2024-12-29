import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userDashboardApi } from '../apis/User';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [user, setUser] = useState(null); // Holds the logged-in user's info
    const [loading, setLoading] = useState(true); // Loading state to show while fetching user data
    const navigate = useNavigate();

    // Fetch user data from the User Dashboard API
    const fetchUserData = async () => {
        try {
            const userData = await userDashboardApi(navigate);
            if (userData) {
                setUser(userData); // Set the user data
            }
        } catch (error) {
            // Handle any error during the API call
            toast.error('Failed to fetch user data');
        } finally {
            setLoading(false); // Stop loading once the API call is complete
        }
    };

    useEffect(() => {
        // Check if there's a valid authToken in localStorage
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            fetchUserData(); // Fetch user data if the authToken exists
        } else {
            setLoading(false); // Stop loading if no authToken
        }
    }, [navigate]); // Only re-run when the component mounts

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Clear the token from localStorage
        toast.success('Logged out successfully.');
        setUser(null); // Reset the user state
        navigate('/login'); // Redirect to login
    };

    if (loading) {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <i className="bi bi-calendar3"></i> Event Application
                    </Link>
                    <div className="ml-auto">
                        {/* Show loading state */}
                        <span className="navbar-text">Loading...</span>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                {/* App Name */}
                <Link className="navbar-brand" to="/">
                    <i className="bi bi-calendar3"></i> Event Application
                </Link>

                <div className="ml-auto">
                    {user ? (
                        <>
                            {/* Logged-In View */}
                            <span className="navbar-text me-3">
                                Hello, {user.username}
                            </span>
                            <button className="btn btn-outline-light" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Guest View */}
                            <Link to="/login" className="btn btn-outline-light me-2">
                                Sign In
                            </Link>
                            <Link to="/register" className="btn btn-outline-light">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
