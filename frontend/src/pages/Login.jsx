import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLoginApi } from "../apis/User";
import { toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();
    
    const [input, setInput] = useState({ email: "", password: "" });
    const [error, setError] = useState({ email: "", password: "" });

    const userLogin = async () => {
        const token = await userLoginApi(input, navigate);
        if (token) {
            toast.success("Login successful!");
            localStorage.setItem('authToken', token);
            navigate('/'); // Redirect to homepage
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (e) => {
        e.preventDefault();

        let isError = false;
        setError({ email: "", password: "" });

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
            }
        });

        if (!isError) userLogin();
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: '400px' }}>
                <h3 className="text-center mb-4">Login</h3>
                <form onSubmit={validateForm}>
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

                    {/* Submit Button */}
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Log In
                        </button>
                    </div>
                </form>

                <div className="text-center mt-3">
                    <span>
                        Don't have an account? <Link to="/register">Register now</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Login;
