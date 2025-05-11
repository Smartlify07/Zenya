import { getUser } from '@/lib/auth.actions';
import { type User } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

export type AuthContextType = {
  user: User | undefined;
  isAuthenticated: boolean;
  updateUser: (data: User) => void;
  loading: boolean;
};
const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isAuthenticated: false,
  updateUser: () => {},
  loading: true,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user?.id;

  const updateUser = (data: User) => {
    setUser(data);
  };
  useEffect(() => {
    const handleGetUser = async () => {
      const user = await getUser();
      setUser(user?.data?.user ?? undefined);
      setLoading(false);
    };
    handleGetUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
