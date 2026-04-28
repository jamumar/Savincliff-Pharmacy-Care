import React, { createContext, useContext, useState, useEffect } from 'react';
// import apiClient from '@/api/apiClient'; // Backend disconnected for prototype

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Mock auth: restore user from localStorage if present
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('mock_user');
      }
    }
    setIsLoadingAuth(false);
    setIsLoadingPublicSettings(false);
  }, []);

  const login = (userData, accessToken, refreshToken) => {
    // Store mock user data locally
    localStorage.setItem('mock_user', JSON.stringify(userData));
    if (accessToken) localStorage.setItem('token', accessToken);
    if (refreshToken) localStorage.setItem('refresh', refreshToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('mock_user');
    setUser(null);
  };
  const navigateToLogin = () => window.location.href = '/register';

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoadingAuth, 
      isLoadingPublicSettings, 
      authError,
      navigateToLogin 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
