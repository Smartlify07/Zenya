import {
  createProject,
  deleteProject,
  editProject,
  getProject,
  getProjects,
} from '@/api/projects.api';
import type { Project } from '@/types';
import type {
  ProjectCreationVariables,
  ProjectUpdateVariables,
} from '@/types/projects.types';
import type { User } from '@supabase/supabase-js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetProjects = (user_id: User['id']) => {
  return useQuery({
    queryFn: () => getProjects(user_id!),
    queryKey: ['projects'],
    enabled: !!user_id!,
  });
};

export const useGetProjectById = (
  user_id: User['id'],
  project_id: Project['id']
) =>
  useQuery({
    queryFn: () => getProject(user_id, project_id),
    queryKey: ['projects', project_id],
  });

export const useCreateProject = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ data, user_id }: ProjectCreationVariables) => {
      return createProject(user_id, { ...data, user_id });
    },

    onMutate: async ({ data }: ProjectCreationVariables) => {
      await query.cancelQueries({ queryKey: ['projects'] });

      const previousProjects = query.getQueryData(['projects']);

      query.setQueryData(['projects'], (oldProjects: Project[]) => {
        if (!oldProjects) {
          return [data];
        }
        return [...oldProjects, data];
      });

      return { previousProjects };
    },

    onError: (err, __, context) => {
      query.setQueryData(['projects'], context?.previousProjects);
      console.error('Error from Supabase:', err);
      throw new Error(
        `Failed to create project: ${err.message || 'Unknown error'}`
      );
    },

    onSettled: (_, error) => {
      if (error) {
        console.error(error);
      }

      query.invalidateQueries({
        queryKey: ['projects'],
      });
    },
  });
};

export const useEditProject = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ data, user_id }: ProjectUpdateVariables) => {
      return editProject(data?.id!, user_id, data);
    },

    onMutate: async ({ data }: ProjectUpdateVariables) => {
      await query.cancelQueries({ queryKey: ['projects', data.id] });

      const previousProjects = query.getQueryData(['projects', data.id]);

      query.setQueryData(['projects', data.id], data);

      return { previousProjects, data };
    },

    onError: (err, __, context) => {
      query.setQueryData(
        ['projects', context?.data.id],
        context?.previousProjects
      );
      console.error('Error from Supabase:', err);
      throw new Error(
        `Failed to update project: ${err.message || 'Unknown error'}`
      );
    },

    onSettled: (_, error, __, context) => {
      if (error) {
        console.error(error);
      }
      query.invalidateQueries({
        queryKey: ['projects', context?.data.id],
      });
    },
  });
};

export const useDeleteProject = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,

    onMutate: async (project_id: Project['id']) => {
      await query.cancelQueries({ queryKey: ['projects'] });

      const previousProjects = query.getQueryData(['projects']);

      query.setQueryData(['projects'], (oldprojects: Project[]) => {
        const list = oldprojects
          ? oldprojects.filter((project) => project.id !== project_id)
          : [];
        return list;
      });

      return { previousProjects };
    },

    onError: (err, __, context) => {
      query.setQueryData(['projects'], context?.previousProjects);
      console.error('Error from Supabase:', err);
      throw new Error(
        `Failed to delete project: ${err.message || 'Unknown error'}`
      );
    },

    onSettled: () => {
      query.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
