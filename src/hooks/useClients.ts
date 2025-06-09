import { fetchClients } from '@/api/supabase/clients';
import { useQuery } from '@tanstack/react-query';

export const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    staleTime: 5000,
    queryFn: async () => {
      const res = await fetchClients();
      return res;
    },
  });
};
