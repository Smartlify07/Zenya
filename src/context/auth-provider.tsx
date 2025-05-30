// src/contexts/AuthContext.tsx
import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import { type User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase'; // Your Supabase client instance

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  updateUser: (data: User | null) => void;
  loading: boolean; // True while the initial auth state is being determined
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  updateUser: () => {},
  loading: true,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user?.id;

  const updateUser = useCallback((data: User | null) => {
    setUser(data);
  }, []);

  useEffect(() => {
    const getInitialUser = async () => {
      try {
        const {
          data: { user: supabaseUser },
        } = await supabase.auth.getUser();
        setUser(supabaseUser);
      } catch (error) {
        console.error('Error fetching initial user in AuthProvider:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getInitialUser();

    // Listen for auth state changes (login, logout, token refresh, etc.)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Auth context must be used in the auth provider');
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
