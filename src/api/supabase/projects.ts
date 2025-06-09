import { supabase } from '@/lib/supabase';
import type { Project } from '@/types';
import type { PostgrestResponse, User } from '@supabase/supabase-js';

export const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const fetchProjectById = async (id: string, user_id: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .eq('user_id', user_id)
    .single();
  return { data, error };
};

export const fetchProjectsByIds = async (
  projectIds: string[],
  user_id: string
): Promise<{
  data: Project[] | null;
  error: PostgrestResponse<Project>['error'];
}> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .in('id', projectIds)
    .eq('user_id', user_id);

  if (error) {
    console.error('Error fetching projects by IDs:', error);
    return { data: null, error };
  }

  return { data: data as Project[], error: null };
};

export const createProject = async (
  projectData: Omit<Project, 'id' | 'milestones'>,
  user_id: User['id']
) => {
  const { data, error } = await supabase
    .from('projects')
    .insert({ ...projectData, user_id });

  if (error) {
    console.error(error);
    throw error;
  }
  return { data, error };
};
