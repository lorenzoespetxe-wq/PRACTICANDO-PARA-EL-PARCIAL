import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated, rol } = useContext(AuthContext);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (rol !== 'ADMIN') return <Navigate to="/" replace />; // Redirect standard users to base dashboard

  return <Outlet />;
};

export default AdminRoute;