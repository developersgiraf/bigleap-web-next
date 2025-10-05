"use client";

import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import styles from './login.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (!result.success) {
        // Show user-friendly error messages
        let errorMessage = result.error;
        
        if (result.error.includes('auth/configuration-not-found')) {
          errorMessage = 'Authentication not configured. Please contact administrator.';
        } else if (result.error.includes('auth/user-not-found')) {
          errorMessage = 'No account found with this email address.';
        } else if (result.error.includes('auth/wrong-password')) {
          errorMessage = 'Invalid password. Please try again.';
        } else if (result.error.includes('auth/invalid-email')) {
          errorMessage = 'Please enter a valid email address.';
        } else if (result.error.includes('auth/too-many-requests')) {
          errorMessage = 'Too many failed attempts. Please try again later.';
        }
        
        setError(errorMessage);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
    
    setLoading(false);
  };



  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1>BigLeap Admin</h1>
          <p>Sign in to manage your website</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
          
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className={styles.footer}>
          <p>© 2025 BigLeap. All rights reserved.</p>
          
          <div className={styles.adminInfo}>
            <p>🔒 <strong>Admin Access Only</strong></p>
            <p>Only authorized BigLeap team members can access this dashboard.</p>
          </div>
          
          {/* Temporary logout link for testing */}
          <button 
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.reload();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#999',
              fontSize: '0.8rem',
              textDecoration: 'underline',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Clear Session (for testing)
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;