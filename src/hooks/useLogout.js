import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API = process.env.REACT_APP_API_URL;
const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // Clear local storage (client-side user info)
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');

      // Log out from the server (withCredentials enabled globally)
      await axios.post(`${API}logout`);

      // Optional: remove token from Axios default headers
      delete axios.defaults.headers.common['Authorization'];

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/login');
    }
  };

  return logout;
};

export default useLogout;
