import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userDashboardApi } from '../apis/User';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const userData = await userDashboardApi(navigate);
            if (userData) {
                setUser(userData);
            }
        } catch (error) {
            toast.error('Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            fetchUserData();
        } else {
            setLoading(false);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        toast.success('Logged out successfully.');
        setUser(null);
        navigate('/login');
    };

    if (loading) {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <i className="bi bi-calendar3"></i> Event Application
                    </Link>
                    <div className="ml-auto">
                        <span className="navbar-text">Loading...</span>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <i className="bi bi-calendar3"></i> Event Application
                </Link>

                <div className="ml-auto">
                    {user ? (
                        <>
                            <span className="navbar-text me-3">
                                Hello, {user.username}
                            </span>
                            <button className="btn btn-outline-light" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
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
