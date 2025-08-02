import { supabase } from '@/lib/supabase';
import type { Project } from '@/types';
import type {
  ProjectCreationPayload,
  ProjectUpdatePayload,
} from '@/types/projects.types';
import type { User } from '@supabase/supabase-js';

const getProjects = async (user_id: User['id']) => {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*, clients(*)')
    .eq('user_id', user_id);
  if (error) {
    throw error;
  }
  return projects as Project[];
};

const getProject = async (user_id: User['id'], project_id: Project['id']) => {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*, clients(*)')
    .eq('user_id', user_id)
    .eq('id', project_id)
    .single();
  if (error) {
    throw error;
  }
  return projects as Project;
};

const createProject = async (
  user_id: User['id'],
  data: ProjectCreationPayload
) => {
  const { data: projects, error } = await supabase
    .from('projects')
    .insert(data)
    .eq('user_id', user_id)
    .select('*');
  if (error) {
    throw error;
  }
  return projects as Project[];
};

const editProject = async (
  id: Project['id'],
  user_id: User['id'],
  data: ProjectUpdatePayload
) => {
  const { data: project, error } = await supabase
    .from('projects')
    .update({
      ...data,
      user_id,
    })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw error;
  }
  return project as Project;
};

const deleteProject = async (project_id: Project['id']) => {
  const { data, error } = await supabase
    .from('projects')
    .delete()
    .eq('id', project_id);
  if (error) {
    throw error;
  }
  return data;
};
export { getProjects, createProject, editProject, deleteProject, getProject };
