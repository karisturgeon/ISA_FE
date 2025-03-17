import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
                const res = await axios.post('https://oceaan-pendharkar.com/isa-be/ISA_BE/register', formData,
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
    
    
            console.log('API Response:', res.data);  // 👀 Confirm response data
    
                const { id, email } = res.data;
    
                if (!id || !email) {
                    console.error('Missing data in API response:', res.data);
                    setError('Unexpected server response. Please try again.');
                    return;
                }
    
                localStorage.setItem('userId', id);
                localStorage.setItem('userEmail', email);
    

                    console.log('Navigating to /index');
                    navigate('/index');
                
            } catch (err) {
                console.error('Error:', err.response ? err.response.data : err);
                if (err.response && err.response.data && err.response.data.error) {
                    setError(err.response.data.error);  // Display backend error message
                } else {
                    setError('Registration failed. Please try again.');
                }
            }
        };
    
        return (
            <div className="container">
                <h2>Register</h2>
                {error && <p className="alert alert-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
    
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
    
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
    
                    <p className="mt-3">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                    <link></link>
                </form>
            </div>
        );


    
};

export default Register;