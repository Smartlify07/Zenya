import { fetchProjects } from '@/api/supabase/projects';
import { useAuth } from '@/context/auth-provider';
import { useQuery } from '@tanstack/react-query';

export const useProjects = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['projects'],

    queryFn: async () => {
      const res = await fetchProjects(user?.id!);
      return res;
    },
  });
};
