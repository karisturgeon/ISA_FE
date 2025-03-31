import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MESSAGES from '../lang/en';
const STRINGS = MESSAGES.LOGOUT;
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
      alert("Logout Successful")
      // Redirect to login page
      navigate('/login');
    } catch (error) {

      const status = error.response?.status || '';
      const message = error.response?.data.error || STRINGS.fail;
      alert(`${STRINGS.fail} \n${status} ${message}`)
      navigate('/login');
    }
  };

  return logout;
};

export default useLogout;
