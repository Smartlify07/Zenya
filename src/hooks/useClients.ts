import { fetchClients } from '@/api/supabase/clients';
import { useAuth } from '@/context/auth-provider';
import { useQuery } from '@tanstack/react-query';

export const useClients = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['clients'],
    staleTime: 5000,
    queryFn: async () => {
      const res = await fetchClients(user?.id!);
      return res;
    },
  });
};
