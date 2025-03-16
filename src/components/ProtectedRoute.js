import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem('accessToken');
    const userRole = JSON.parse(localStorage.getItem('userRole'));

    if (!token) return <Navigate to="/login" />;
    if (role && role !== userRole) return <Navigate to="/unauthorized" />;

    return children;
};

export default ProtectedRoute;
