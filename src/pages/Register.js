import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MESSAGES from '../lang/en.js';

const STRINGS = MESSAGES.REGISTER;

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
            const res = await axios.post('https://oceaan-pendharkar.com/api/v1/isa-be/ISA_BE/register', formData,
                {
                    withCredentials: false,
                    headers: { 'Content-Type': 'application/json' }
                }
            );


            console.log('API Response:', res.data);  // Confirm response data

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
            console.error('Error:', err.response ? err.response.data : err);
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);  // Display backend error message
            } else {
                setError(STRINGS.fail);
            }
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
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
                    {STRINGS.register}
                </button>

                <p className="mt-3">
                    {STRINGS.haveAccount} <Link to="/login">{STRINGS.login}</Link>
                </p>
            </form>
        </div>
    );



};

export default Register;