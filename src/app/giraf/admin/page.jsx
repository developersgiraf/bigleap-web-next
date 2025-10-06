"use client";

import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../../../contexts/AuthContext';
import LoginForm from './components/auth/LoginForm';
import AdminDashboard from './components/AdminDashboard';

// Inner component that uses auth
const AdminPageContent = () => {
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

// Main component that provides auth context only for admin
const AdminPage = () => {
  return (
    <AuthProvider>
      <AdminPageContent />
    </AuthProvider>
  );
};

export default AdminPage;
