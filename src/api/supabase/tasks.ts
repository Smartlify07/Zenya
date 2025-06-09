import { supabase } from '@/lib/supabase';
import type { Task } from '@/types';
import type { User } from '@supabase/supabase-js';

export const fetchTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  return { data, error };
};

export const createTask = async (
  taskData: Omit<Task, 'id' | 'milestones'>,
  user_id: User['id']
) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert({ ...taskData, user_id });

  if (error) {
    console.error(error);
    throw error;
  }
  return { data, error };
};
