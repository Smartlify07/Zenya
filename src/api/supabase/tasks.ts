import { supabase } from '@/lib/supabase';
import type { Client, Project, Task } from '@/types';
import type { PostgrestResponse, User } from '@supabase/supabase-js';

export type TaskWithProject = Task & {
  projects: Project;
};
export const fetchTasks = async () => {
  const { data, error } = await supabase.from('tasks').select('*');

  return { data, error };
};

export const fetchTasksForClient = async (
  client_id: string,
  user_id: string
): Promise<{
  data: Task[] | null;
  error: PostgrestResponse<Task>['error'];
}> => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('client_id', client_id)
    .eq('user_id', user_id);

  if (error) {
    console.error('Error fetching projects by IDs:', error);
    return { data: null, error };
  }

  return { data: data as Task[], error: null };
};

export const fetchTasksWithRelatedProject = async (
  client_id: string,
  user_id: string
) => {
  const { data, error } = await supabase
    .from('tasks')
    .select(`*, projects(*)`)
    .eq('user_id', user_id)
    .eq('client_id', client_id);
  if (error) {
    console.error('Error fetching projects by IDs:', error);
    return { data: null, error };
  }

  return {
    data: data as TaskWithProject[],
    error: null,
  };
};

export const updateTask = async (
  taskData: Omit<Partial<Task>, 'id'>,
  user_id: User['id'],
  client_id: Client['id'],
  task_id: Task['id']
) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ ...taskData })
    .eq('user_id', user_id)
    .eq('id', task_id)
    .eq('client_id', client_id);

  if (error) {
    console.error(error);
    throw error;
  }
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
