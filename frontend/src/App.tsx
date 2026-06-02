import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import LoginPage from './pages/LoginPage';

const BlankDashboard = () => (
  <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">User Dashboard</h1>
    <p className="text-gray-600">Standard user components go here.</p>
  </div>
);

const AdminDashboard = () => (
  <div className="min-h-screen bg-red-50 p-8 flex flex-col items-center justify-center">
    <h1 className="text-3xl font-bold text-red-800 mb-4">Admin Panel</h1>
    <p className="text-red-600">Elevated components and settings go here.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Accessible by BOTH Admin and User */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<BlankDashboard />} />
          </Route>

          {/* Accessible ONLY by Admin */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;