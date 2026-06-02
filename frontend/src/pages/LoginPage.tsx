import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Invalid credentials');
      const data = await response.json();
      login(data.access_token);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-md mb-6 text-sm">
          <p className="font-semibold mb-2 border-b border-blue-200 pb-1">Evaluator Access:</p>
          <div className="flex justify-between mt-2">
            <button 
              type="button" 
              onClick={() => { setEmail('admin@utn.edu.ar'); setPassword('admin123'); }}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Fill ADMIN
            </button>
            <button 
              type="button" 
              onClick={() => { setEmail('user@utn.edu.ar'); setPassword('user123'); }}
              className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
            >
              Fill USER
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;