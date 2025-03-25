import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LOGIN from '../lang/en.js'
import MESSAGES from '../lang/en.js'

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
            const res = await axios.post('https://oceaan-pendharkar.com/api/v1/isa-be/ISA_BE/login', formData,
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
        <div className="container">
            <h2>{LOGIN.login}</h2>
            {error && <p className="alert alert-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>{STRINGS.email}</label>
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
                    <label>{STRINGS.password}</label>
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

                <button type="submit" className="btn btn-primary">
                    {STRINGS.login}
                </button>

                <p className="mt-3">
                    {STRINGS.noAccount} <Link to="/register">{STRINGS.registerHere}</Link>
                </p>
                <link></link>
            </form>
        </div>
    );
};

export default Login;
