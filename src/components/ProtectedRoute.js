import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
    const storedRole = JSON.parse(localStorage.getItem('userRole'));
    const userId = localStorage.getItem('userId');

    if (!userId) return <Navigate to="/login" />;
    if (role && role !== storedRole) return <Navigate to="/unauthorized" />;

    return children;
};

export default ProtectedRoute;
