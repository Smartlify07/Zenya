import { AuthContext } from '@/context/auth-provider';
import { useContext } from 'react';

export const useAuth = () => {
  const { user, updateUser, loading } = useContext(AuthContext);
  const isAuthenticated = !!user?.id;

  return { user, isAuthenticated, updateUser, loading };
};
