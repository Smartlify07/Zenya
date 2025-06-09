import { fetchProjects } from '@/api/supabase/projects';
import { useQuery } from '@tanstack/react-query';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetchProjects();
      return res;
    },
  });
};
