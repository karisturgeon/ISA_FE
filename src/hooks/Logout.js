import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const logout = async () => {
    // Clear client-side storage
    // TODO: CAN DELETE THIS WHEN AUTH UPDATED
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');

    // TODO: UPDATE ENDPOINT WHEN CREATED
    await axios.get('https://oceaan-pendharkar.com/api/v1/isa-be/ISA_BE/logout', 
        { withCredentials: true });

    // Redirect to login
    navigate('/login');
};
