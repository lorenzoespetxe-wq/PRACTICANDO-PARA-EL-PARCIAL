import { createContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { type JwtPayload } from '../models/Auth';

interface AuthContextType {
  token: string | null;
  rol: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  rol: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [rol, setRol] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setRol(decoded.rol);
      } catch {
        setRol(null);
      }
    } else {
      setRol(null);
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isAuthenticated = (): boolean => {
    if (!token) return false;
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp < Date.now() / 1000) {
        logout();
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ token, rol, isAuthenticated: isAuthenticated(), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};