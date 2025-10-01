"use client";

import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import styles from './login.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();

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

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await loginWithGoogle();
      
      if (!result.success) {
        let errorMessage = result.error;
        
        if (result.error.includes('Access denied')) {
          errorMessage = `❌ ${result.error}\n\nOnly authorized BigLeap administrators can access this dashboard.`;
        } else if (result.error.includes('auth/popup-closed-by-user')) {
          errorMessage = 'Sign-in was cancelled.';
        } else if (result.error.includes('auth/popup-blocked')) {
          errorMessage = 'Popup was blocked. Please allow popups and try again.';
        } else if (result.error.includes('auth/configuration-not-found')) {
          errorMessage = 'Google Sign-In not configured. Please contact administrator.';
        }
        
        setError(errorMessage);
      }
    } catch (error) {
      setError('Something went wrong with Google Sign-In. Please try again.');
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
          
          {/* Google Sign-In Button */}
          <button 
            type="button"
            onClick={handleGoogleSignIn}
            className={styles.googleButton}
            disabled={loading}
          >
            <svg className={styles.googleIcon} viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div className={styles.divider}>
            <span>or</span>
          </div>
          
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
            {loading ? 'Signing in...' : 'Sign In with Email'}
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