import { fetchTasks } from '@/api/supabase/tasks';
import { useQuery } from '@tanstack/react-query';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await fetchTasks();
      return res;
    },
  });
};
