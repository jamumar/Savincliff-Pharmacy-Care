import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '@/api/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    async function initAuth() {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoadingAuth(false);
        setIsLoadingPublicSettings(false);
        return;
      }

      try {
        const response = await apiClient.get('auth/me/');
        setUser(response.data);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setAuthError(error);
      } finally {
        setIsLoadingAuth(false);
        setIsLoadingPublicSettings(false);
      }
    }
    initAuth();
  }, []);

  const login = (userData, accessToken, refreshToken) => {
    localStorage.setItem('token', accessToken);
    if (refreshToken) localStorage.setItem('refresh', refreshToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
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
