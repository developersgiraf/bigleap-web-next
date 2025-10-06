"use client";

import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession({
    // Only required for admin pages - don't refresh on window focus
    required: false,
    refetchOnWindowFocus: false
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
      return;
    }

    if (session?.user) {
      setUser(session.user);
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

      // Don't manually call getSession - let useSession handle it
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    user,
    login,
    logout,
    loading
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};