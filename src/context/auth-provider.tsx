import { getUser } from '@/lib/auth.actions';
import type { User } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: User | null;
};
const AuthContext = createContext<AuthContextType>({
  user: null,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const handleGetUser = async () => {
      const user = await getUser();
      setUser(user?.data?.user ?? null);
    };
    handleGetUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
