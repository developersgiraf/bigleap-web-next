"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User 
} from 'firebase/auth';
import { validateAdminAccess } from '../lib/adminAuth';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Validate admin access
        const validation = validateAdminAccess(user);
        if (validation.isValid) {
          setUser(user);
        } else {
          // User is not an admin, sign them out
          await signOut(auth);
          setUser(null);
          console.warn(validation.message);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Validate admin access
      const validation = validateAdminAccess(result.user);
      if (!validation.isValid) {
        await signOut(auth);
        return { success: false, error: validation.message };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Validate admin access
      const validation = validateAdminAccess(result.user);
      if (!validation.isValid) {
        await signOut(auth);
        return { success: false, error: validation.message };
      }
      
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    login,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};