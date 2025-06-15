import { fetchTasks } from '@/api/supabase/tasks';
import { useAuth } from '@/context/auth-provider';
import { useQuery } from '@tanstack/react-query';

export const useTasks = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await fetchTasks(user?.id!);
      return res;
    },
  });
};
