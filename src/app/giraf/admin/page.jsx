"use client";

import { useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';

const AdminPage = () => {
  const { user, loading, logout } = useAuth();

  // Handle quick logout from URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('logout') === 'true') {
      logout();
      // Clean up URL
      window.history.replaceState({}, '', '/giraf/admin');
    }
  }, [logout]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  return user ? <AdminDashboard /> : <LoginForm />;
};

export default AdminPage;
