import { supabase } from '@/lib/supabase';
import type { Client, Project, SupabaseFetchResult, Task } from '@/types';
import type { PostgrestResponse, User } from '@supabase/supabase-js';
import { fetchData, updateData } from './call-api';

export type TaskWithProject = Task & {
  projects: Project;
};

export type FetchResult = {
  data: Task[] | null;
  error: PostgrestResponse<Task>['error'];
};

export const fetchTasks = async (
  user_id: string,
  client_id?: string
): Promise<SupabaseFetchResult<Task[]>> => {
  let filters: {
    user_id: string;
    client_id?: string;
  } = {
    user_id,
  };
  if (client_id) {
    filters = { ...filters, client_id };
  }
  return fetchData({
    table: 'tasks',
    joins: ['projects', 'clients'],
    filters,
    single: false,
    order: true,
  });
};

export const updateTask = async (
  taskData: Omit<Partial<Task>, 'id'>,
  user_id: User['id'],
  client_id: Client['id'],
  task_id: Task['id']
) => {
  return updateData('tasks', taskData, user_id, {
    filters: {
      user_id,
      client_id,
      id: task_id,
    },
  });
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
