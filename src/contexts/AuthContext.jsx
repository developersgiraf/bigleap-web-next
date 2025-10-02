"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { validateAdminAccess } from '../lib/adminAuth';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
      return;
    }

    if (session?.user) {
      // Validate admin access for NextAuth session
      const validation = validateAdminAccess(session.user);
      if (validation.isValid) {
        setUser(session.user);
      } else {
        // User is not an admin, sign them out
        signOut();
        setUser(null);
        console.warn(validation.message);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [session, status]);

  const login = async (email, password) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        return { success: false, error: result.error };
      }

      // Get the updated session to validate admin access
      const updatedSession = await getSession();
      if (updatedSession?.user) {
        const validation = validateAdminAccess(updatedSession.user);
        if (!validation.isValid) {
          await signOut();
          return { success: false, error: validation.message };
        }
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signIn('google', { redirect: false });
      
      if (result?.error) {
        return { success: false, error: result.error };
      }

      // Get the updated session to validate admin access
      const updatedSession = await getSession();
      if (updatedSession?.user) {
        const validation = validateAdminAccess(updatedSession.user);
        if (!validation.isValid) {
          await signOut();
          return { success: false, error: validation.message };
        }
      }
      
      return { success: true, user: updatedSession?.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut();
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