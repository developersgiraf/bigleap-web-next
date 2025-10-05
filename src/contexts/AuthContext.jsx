"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';

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

      // Get the updated session
      const updatedSession = await getSession();
      
      return { success: true };
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
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};