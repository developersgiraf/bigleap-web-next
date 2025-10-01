"use client";

import { useAuth } from '../../../contexts/AuthContext';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';

const AdminPage = () => {
  const { user, loading } = useAuth();

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
