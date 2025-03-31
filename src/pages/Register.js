//ChatGPT was used to assist with this file
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MESSAGES from '../lang/en.js';

const STRINGS = MESSAGES.REGISTER;
const API = process.env.REACT_APP_API_URL;

const Register = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API}register`, formData,
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            // console.log('API Response:', res.data);  // Confirm response data

            const { id, email } = res.data;

            if (!id || !email) {
                console.error('Missing data in API response:', res.data);
                setError(STRINGS.serverFail);
                return;
            }

            localStorage.setItem('userId', id);
            localStorage.setItem('userEmail', email);

            navigate('/login');

        } catch (err) {
            const status = err.response?.status || '';
            const message = err.response?.data.error || STRINGS.fail;
            console.error(`Register (${status}):`, err.response?.data || err);
            setError(`${STRINGS.error} ${status}: ${message}`);
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
            <div className="card shadow rounded p-4 w-100" style={{ maxWidth: '400px' }}>
                <div className="card-header text-center">
                    <h4>{STRINGS.register}</h4>
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
                            {STRINGS.register}
                        </button>

                        <p className="mt-3 text-center">
                            {STRINGS.haveAccount} <Link to="/login">{STRINGS.login}</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );



};

export default Register;