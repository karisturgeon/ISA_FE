import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import MESSAGES from '../lang/en';

const STRINGS = MESSAGES.PROTECTEDROUTE;
/**
 * Protects routes using the users role
 * redirects to login in user isn't logged in
 * redirects to unauthorized if user isn't the specified user
 * @param children this is a special prop in React that represents the
 * nested elements passed between the opening and closing tags of the component
 * @param role this is the role (admin/user) of the logged in user 
 * @returns the children (route given)
 */
// const ProtectedRoute = ({ children, role }) => {
//     const storedRole = JSON.parse(localStorage.getItem('userRole'));
//     const userId = localStorage.getItem('userId');

//     if (!userId) return <Navigate to="/login" />;
//     if (role && role !== storedRole) return <Navigate to="/unauthorized" />;

//     return children;
// };

const ProtectedRoute = ({ children, requiredRole }) => {
    const [status, setStatus] = useState('loading');  


    useEffect(() => {
        const checkRole = async () => {
            try {
                const response = await axios.get('/api/v1/auth/role', { withCredentials: true });
                const { role } = response.data;

                if (role === requiredRole) {
                    setStatus('authorized');
                } else {
                    setStatus('unauthorized');
                }
            } catch {
               setStatus('unauthenticated');
            }
        };

        checkRole();
    }, [requiredRole]);


    if (status === 'loading') return <p>{STRINGS.loading}</p>;

    if (status === 'unauthenticated') return <Navigate to="/login" />;
    
    if (status === 'unauthorized') return <Navigate to="/unauthorized" />;

    return children;
};

export default ProtectedRoute;
