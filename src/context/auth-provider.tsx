import { getUser } from '@/lib/auth.actions';
import { redirect } from '@tanstack/react-router';
import { type User } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  updateUser: (data: User | null) => void;
  loading: boolean;
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
  console.log(user, loading);

  const updateUser = (data: User | null) => {
    setUser(data);
  };
  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const user = await getUser();
        console.log(user);
        setUser(user?.data?.user ?? null);
      } catch (error) {
        console.error('Failed to get user:', error);
        redirect({ to: '/login' }); // optional, you can keep this here too
      } finally {
        setLoading(false);
      }
    };

    handleGetUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
