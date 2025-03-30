import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MESSAGES from '../lang/en.js'
const API = process.env.REACT_APP_API_URL;
const STRINGS = MESSAGES.LOGIN;

const Login = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API}login`, formData,
                { withCredentials: true ,
                headers: {'Content-Type': 'application/json'}
        });

        console.log('API Response:', res.data);  // 👀 Confirm response data

            const { id, email, role } = res.data;

            if (!id || !role) {
                console.error('Missing data in API response:', res.data);
                setError('Unexpected server response. Please try again.');
                return;
            }

            // Store user data in localStorage (token assumed to be stored in cookie)
            localStorage.setItem('userId', id);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userRole', JSON.stringify(role));

            // Redirect based on role
            if (role === 'admin') {
                console.log('Navigation to /admin');
                navigate('/admin');
            } else {
                console.log('Navigating to /index');
                navigate('/index');
            }
        } catch (err) {
            console.error('Error:', err.response ? err.response.data : err);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
            <div className="card shadow rounded p-4 w-100" style={{ maxWidth: '400px' }}>
                <div className="card-header text-center">
                    <h4>{STRINGS.login}</h4>
                </div>
    
                <div className="card-body">
                    {error && <p className="alert alert-danger">{error}</p>}
    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">{STRINGS.email}</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder={STRINGS.enterEmail}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
    
                        <div className="mb-3">
                            <label className="form-label">{STRINGS.password}</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder={STRINGS.enterPassword}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
    
                        <button type="submit" className="btn btn-primary w-100">
                            {STRINGS.login}
                        </button>
    
                        <p className="mt-3 text-center">
                            {STRINGS.noAccount} <Link to="/register">{STRINGS.registerHere}</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
    
};

export default Login;
