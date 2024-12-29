import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userRegisterApi } from "../apis/User";
import { toast } from "react-toastify";

function Register() {
    const navigate = useNavigate();

    const [input, setInput] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState({ username: "", email: "", password: "", confirmPassword: "" });

    const userRegister = async () => {
        const success = await userRegisterApi(input, navigate);
        if (success) {
            toast.success("Registration successful! Please log in.");
            navigate('/login');
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (e) => {
        e.preventDefault();

        let isError = false;
        setError({ username: "", email: "", password: "", confirmPassword: "" });

        Object.keys(input).forEach((key) => {
            const value = input[key];
            if (!value.trim()) {
                isError = true;
                setError((prev) => ({ ...prev, [key]: "This field is required" }));
            } else if (key === 'email' && !validateEmail(value)) {
                isError = true;
                setError((prev) => ({ ...prev, [key]: "Enter a valid email address" }));
            } else if (key === 'password' && value.trim().length < 6) {
                isError = true;
                setError((prev) => ({ ...prev, [key]: "Password must be at least 6 characters long" }));
            } else if (key === 'confirmPassword' && value !== input.password) {
                isError = true;
                setError((prev) => ({ ...prev, [key]: "Passwords do not match" }));
            }
        });

        if (!isError) userRegister();
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: '400px' }}>
                <h3 className="text-center mb-4">Register</h3>
                <form onSubmit={validateForm}>
                    {/* Username Field */}
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-person"></i>
                            </span>
                            <input
                                type="text"
                                className={`form-control ${error.username ? 'is-invalid' : ''}`}
                                id="username"
                                value={input.username}
                                onChange={(e) => setInput({ ...input, username: e.target.value })}
                                placeholder="Enter a username"
                            />
                            {error.username && <div className="invalid-feedback">{error.username}</div>}
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-envelope"></i>
                            </span>
                            <input
                                type="email"
                                className={`form-control ${error.email ? 'is-invalid' : ''}`}
                                id="email"
                                value={input.email}
                                onChange={(e) => setInput({ ...input, email: e.target.value })}
                                placeholder="Enter your email"
                            />
                            {error.email && <div className="invalid-feedback">{error.email}</div>}
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-lock"></i>
                            </span>
                            <input
                                type="password"
                                className={`form-control ${error.password ? 'is-invalid' : ''}`}
                                id="password"
                                value={input.password}
                                onChange={(e) => setInput({ ...input, password: e.target.value })}
                                placeholder="Enter your password"
                            />
                            {error.password && <div className="invalid-feedback">{error.password}</div>}
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-lock-fill"></i>
                            </span>
                            <input
                                type="password"
                                className={`form-control ${error.confirmPassword ? 'is-invalid' : ''}`}
                                id="confirmPassword"
                                value={input.confirmPassword}
                                onChange={(e) => setInput({ ...input, confirmPassword: e.target.value })}
                                placeholder="Confirm your password"
                            />
                            {error.confirmPassword && (
                                <div className="invalid-feedback">{error.confirmPassword}</div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="text-center mt-3">
                    <span>
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Register;
